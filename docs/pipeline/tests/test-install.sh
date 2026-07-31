#!/usr/bin/env bash
# Cases for scripts/install.sh — hermetic: installs into a temp target and
# checks wiring against fixtures, never touching the live .claude/.
. "$(dirname "$0")/lib.sh"

echo "test-install:"

INSTALL="$PIPELINE_DIR/scripts/install.sh"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

TARGET="$WORK/target"
mkdir -p "$TARGET"

cat > "$WORK/wired.json" <<'EOF'
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [ { "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/git-guard.sh\"" } ] },
      { "matcher": "Edit|Write|MultiEdit|NotebookEdit", "hooks": [ { "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-guard.sh\"" } ] }
    ]
  }
}
EOF
cat > "$WORK/unwired.json" <<'EOF'
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Bash", "hooks": [ { "type": "command", "command": "bash \"$CLAUDE_PROJECT_DIR/.claude/hooks/git-guard.sh\"" } ] }
    ]
  }
}
EOF

bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" >/dev/null 2>&1
assert_eq_rc 0 "$?" "installs into a target with wiring present"

bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" >/dev/null 2>&1
assert_eq_rc 0 "$?" "is idempotent on a second run"

bash "$INSTALL" --target "$TARGET" --settings "$WORK/unwired.json" >/dev/null 2>&1
assert_eq_rc 1 "$?" "reports missing wiring with exit 1"
OUT="$(bash "$INSTALL" --target "$TARGET" --settings "$WORK/unwired.json" 2>&1 >/dev/null)"
assert_contains "$OUT" "Edit|Write|MultiEdit|NotebookEdit" "prints the matcher the user must add"

[ -f "$TARGET/.claude/hooks/agent-guard.sh" ]
assert_true "$?" "the hook is copied into the target"
[ -x "$TARGET/.claude/hooks/agent-guard.sh" ]
assert_true "$?" "the copied hook is executable"

# every tracked definition present so far must be copied
MISSING=0
for f in "$PIPELINE_DIR"/agents/*.md; do
  [ -e "$f" ] || continue
  cmp -s "$f" "$TARGET/.claude/agents/$(basename "$f")" || MISSING=1
done
assert_eq_rc 0 "$MISSING" "every agents/*.md is copied byte-for-byte"

# --check must detect drift between source and installed copy
printf '\ndrifted\n' >> "$TARGET/.claude/hooks/agent-guard.sh"
bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" --check >/dev/null 2>&1
assert_eq_rc 1 "$?" "--check detects a drifted copy"
OUT="$(bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" --check 2>&1 >/dev/null)"
assert_contains "$OUT" "drift" "drift is named in the message"

bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" >/dev/null 2>&1
bash "$INSTALL" --target "$TARGET" --settings "$WORK/wired.json" --check >/dev/null 2>&1
assert_eq_rc 0 "$?" "re-installing repairs the drift"

# the tracked sources must carry their executable bit in git
BAD_MODE=0
for s in hooks/agent-guard.sh scripts/scope-check scripts/report-check scripts/install.sh; do
  [ -e "$PIPELINE_DIR/$s" ] || continue
  case "$(git -C "$REPO_ROOT" ls-files -s "docs/pipeline/$s" | awk '{print $1}')" in
    100755) ;;
    "")     ;;   # not committed yet — an earlier task's concern
    *)      BAD_MODE=1 ;;
  esac
done
assert_eq_rc 0 "$BAD_MODE" "committed scripts carry mode 100755"

summary
