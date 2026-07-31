#!/usr/bin/env bash
# agent-guard.sh — PreToolUse hook for the file-writing tools.
#
# Rule order matters: DENY is evaluated first, for every target, before any
# allowance — including the temp-directory allowance. Nothing may launder a
# denied path.
#
#   1. Sources of truth are never edited by an agent (client brief, brand style
#      guide, voice & tone, research). Only the user changes those.
#   2. The pipeline's own machinery and agent definitions (docs/pipeline/**)
#      are never edited by an agent — a guard an agent can rewrite is not a
#      guard. Changing the pipeline is the user's action.
#   3. Writes are otherwise confined to allowlisted roots.
#
# Paths inside a git worktree (.worktrees/<name>/…, .claude/worktrees/<name>/…)
# are stripped to their in-repo equivalent before matching, because SDD always
# runs in a worktree and its writes are legitimate.
#
# Exit 2 blocks the tool call and feeds stderr back to the agent; 0 allows it.
#
# Wired in .claude/settings.json:
#   { "matcher": "Edit|Write|MultiEdit|NotebookEdit",
#     "hooks": [ { "type": "command",
#       "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-guard.sh\"" } ] }
#
# Accepted limitations (defense against a well-meaning agent, not a hostile
# adversary): writes performed through Bash (`cat >`, `sed -i`, `tee`) are not
# seen here — this hook matches the file-editing tools only, and git-guard.sh
# covers the git side. Without python3 the hook fails open and says so.

set -u

REPO="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"

# --- rule tables (the intended edit points) ----------------------------------
DENY_PATTERNS=(
  "docs/task/*"
  "docs/research/*"
  "docs/brand-style-guide.md"
  "docs/voice-and-tone.md"
  "docs/pipeline/*"
)
ALLOW_ROOTS=(
  "uapp-site"
  "docs/superpowers"
  ".superpowers"
)

INPUT="$(cat)"

# --- extract and normalize every target path ---------------------------------
# Prints one line per target: "REL <repo-relative>" or "ABS <absolute>".
TARGETS="$(printf '%s' "$INPUT" | python3 -c '
import json, os, sys
repo = os.path.realpath(sys.argv[1])
try:
    data = json.load(sys.stdin)
except Exception:
    sys.exit(3)
ti = data.get("tool_input") or {}
cands = []
for key in ("file_path", "notebook_path", "path"):
    v = ti.get(key)
    if isinstance(v, str) and v:
        cands.append(v)
for e in (ti.get("edits") or []):
    if isinstance(e, dict):
        v = e.get("file_path")
        if isinstance(v, str) and v:
            cands.append(v)
if not cands:
    sys.exit(4)
for p in cands:
    ap = p if os.path.isabs(p) else os.path.join(repo, p)
    # realpath, not normpath: a symlink must not launder a denied path, and a
    # symlinked repo root must still compare equal.
    ap = os.path.realpath(ap)
    if ap == repo or ap.startswith(repo + os.sep):
        print("REL " + os.path.relpath(ap, repo))
    else:
        print("ABS " + ap)
' "$REPO" 2>/dev/null)"
EXTRACT_RC=$?

if [ "$EXTRACT_RC" -ne 0 ] || [ -z "$TARGETS" ]; then
  echo "agent-guard: could not determine a target path — allowing (check hook health)" >&2
  exit 0
fi

deny() {
  echo "agent-guard: BLOCKED — $1" >&2
  echo "agent-guard: do not work around this block (no Bash rewrite, no rephrasing, no new path). Report it and let the user decide." >&2
  exit 2
}

# strip_worktree <rel-path> — echo the path as it would look in the main tree
strip_worktree() {
  case "$1" in
    .worktrees/*/*)        printf '%s' "${1#.worktrees/*/}" ;;
    .claude/worktrees/*/*) printf '%s' "${1#.claude/worktrees/*/}" ;;
    *)                     printf '%s' "$1" ;;
  esac
}

while IFS= read -r line; do
  [ -z "$line" ] && continue
  kind="${line%% *}"
  path="${line#* }"

  if [ "$kind" = "REL" ]; then
    path="$(strip_worktree "$path")"
  fi

  # rule 1+2 — deny table, before any allowance, for absolute paths too
  for pat in "${DENY_PATTERNS[@]}"; do
    case "$path" in
      $pat)
        case "$pat" in
          docs/pipeline/*) deny "$path belongs to the pipeline's own machinery (guards, scripts, agent definitions). Only the user changes the pipeline." ;;
          *)               deny "$path is a source of truth (client brief / brand style guide / voice & tone / research). Only the user edits it." ;;
        esac
        ;;
    esac
  done

  if [ "$kind" = "ABS" ]; then
    case "$path" in
      /tmp/*|/private/tmp/*|/var/tmp/*|/var/folders/*|/private/var/folders/*) continue ;;
      *) deny "write outside the repository: $path" ;;
    esac
  fi

  # rule 3 — allowlisted roots
  ok=0
  for root in "${ALLOW_ROOTS[@]}"; do
    case "$path" in
      "$root"|"$root"/*) ok=1; break ;;
    esac
  done
  [ "$ok" -eq 1 ] || deny "$path is outside the pipeline's write allowlist (${ALLOW_ROOTS[*]})."
done <<EOF
$TARGETS
EOF

exit 0
