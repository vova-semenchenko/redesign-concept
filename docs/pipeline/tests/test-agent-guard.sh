#!/usr/bin/env bash
# Cases for hooks/agent-guard.sh (spec §3, layer 2).
. "$(dirname "$0")/lib.sh"

HOOK="$PIPELINE_DIR/hooks/agent-guard.sh"
echo "test-agent-guard:"

# Pin the repo root the hook reasons about, so results never depend on where
# this checkout physically lives (a real repo under /tmp must behave the same).
FAKE_REPO="$(mktemp -d)/repo"
mkdir -p "$FAKE_REPO"
trap 'rm -rf "$(dirname "$FAKE_REPO")"' EXIT

run_hook() {
  OUT="$(printf '%s' "$1" | CLAUDE_PROJECT_DIR="$FAKE_REPO" bash "$HOOK" 2>&1 >/dev/null)"
  RC=$?
}
edit_json() { printf '{"tool_name":"Edit","tool_input":{"file_path":"%s"}}' "$1"; }

# --- deny: sources of truth --------------------------------------------------
for p in \
  "docs/task/uapp-redesign-brief.md" \
  "docs/task/nested/extra.md" \
  "docs/research/01-current-site-audit.md" \
  "docs/brand-style-guide.md" \
  "docs/voice-and-tone.md"
do
  run_hook "$(edit_json "$p")"
  assert_eq_rc 2 "$RC" "denies source of truth: $p"
done
run_hook "$(edit_json "docs/voice-and-tone.md")"
assert_contains "$OUT" "source of truth" "deny message names the reason"

# --- deny: the pipeline's own machinery and definitions ----------------------
for p in \
  "docs/pipeline/hooks/agent-guard.sh" \
  "docs/pipeline/scripts/scope-check" \
  "docs/pipeline/tests/test-agent-guard.sh" \
  "docs/pipeline/agents/ui-qa.md" \
  "docs/pipeline/CONTROLLER.md"
do
  run_hook "$(edit_json "$p")"
  assert_eq_rc 2 "$RC" "denies pipeline machinery: $p"
done
run_hook "$(edit_json "docs/pipeline/agents/ui-qa.md")"
assert_contains "$OUT" "pipeline" "pipeline-deny message names the reason"

# --- allow: the work areas ---------------------------------------------------
for p in \
  "uapp-site/src/app/page.tsx" \
  "uapp-site/src/styles/globals.css" \
  "docs/superpowers/plans/2026-07-31-ui-subagent-pipeline.md" \
  "docs/superpowers/specs/new-design.md" \
  ".superpowers/sdd/plan/task-1-brief.md"
do
  run_hook "$(edit_json "$p")"
  assert_eq_rc 0 "$RC" "allows work area: $p"
done

# --- allow: inside a git worktree (SDD always runs in one) ------------------
for p in \
  ".worktrees/feat-x/uapp-site/src/app/page.tsx" \
  ".claude/worktrees/pipeline/uapp-site/src/app/page.tsx" \
  ".worktrees/feat-x/.superpowers/sdd/p/task-1-report.md"
do
  run_hook "$(edit_json "$p")"
  assert_eq_rc 0 "$RC" "allows worktree path: $p"
done
run_hook "$(edit_json ".worktrees/feat-x/docs/voice-and-tone.md")"
assert_eq_rc 2 "$RC" "deny still applies inside a worktree"

# --- deny: everything else ---------------------------------------------------
for p in \
  ".gitignore" \
  "CLAUDE.md" \
  "README.md" \
  ".claude/settings.json" \
  ".claude/hooks/agent-guard.sh" \
  "docs/frontend-foundation.md"
do
  run_hook "$(edit_json "$p")"
  assert_eq_rc 2 "$RC" "denies out-of-allowlist path: $p"
done

# --- traversal cannot launder a denied path ---------------------------------
run_hook "$(edit_json "docs/superpowers/../task/uapp-redesign-brief.md")"
assert_eq_rc 2 "$RC" "denies traversal into a source of truth"
run_hook "$(edit_json "uapp-site/../docs/pipeline/hooks/agent-guard.sh")"
assert_eq_rc 2 "$RC" "denies traversal into the pipeline machinery"

# --- absolute paths ----------------------------------------------------------
run_hook "$(edit_json "$FAKE_REPO/uapp-site/src/app/layout.tsx")"
assert_eq_rc 0 "$RC" "allows absolute in-scope path"
run_hook "$(edit_json "$FAKE_REPO/docs/voice-and-tone.md")"
assert_eq_rc 2 "$RC" "denies absolute source-of-truth path"
run_hook "$(edit_json "/etc/passwd")"
assert_eq_rc 2 "$RC" "denies an absolute path outside the repo"

# --- every write tool is covered --------------------------------------------
run_hook '{"tool_name":"Write","tool_input":{"file_path":"docs/voice-and-tone.md"}}'
assert_eq_rc 2 "$RC" "Write is covered"
run_hook '{"tool_name":"NotebookEdit","tool_input":{"file_path":"docs/task/x.ipynb"}}'
assert_eq_rc 2 "$RC" "NotebookEdit is covered (file_path)"
run_hook '{"tool_name":"NotebookEdit","tool_input":{"notebook_path":"docs/task/x.ipynb"}}'
assert_eq_rc 2 "$RC" "NotebookEdit is covered (legacy notebook_path)"
run_hook '{"tool_name":"MultiEdit","tool_input":{"file_path":"uapp-site/a.tsx","edits":[{"file_path":"docs/brand-style-guide.md"}]}}'
assert_eq_rc 2 "$RC" "a denied path in nested edits is caught"

# --- unparsable input fails open, loudly (documented limitation) ------------
run_hook 'not json at all'
assert_eq_rc 0 "$RC" "fails open on unparsable input"
assert_contains "$OUT" "could not determine" "fail-open says so on stderr"

summary
