#!/usr/bin/env bash
# Cases for scripts/install.sh — hermetic: installs into a temp target and
# verifies the copies there, never touching the live .claude/.
. "$(dirname "$0")/lib.sh"

echo "test-install:"

INSTALL="$PIPELINE_DIR/scripts/install.sh"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

TARGET="$WORK/target"
mkdir -p "$TARGET"

bash "$INSTALL" --target "$TARGET" >/dev/null 2>&1
assert_eq_rc 0 "$?" "installs into a target"

bash "$INSTALL" --target "$TARGET" >/dev/null 2>&1
assert_eq_rc 0 "$?" "is idempotent on a second run"

bash "$INSTALL" --target "$TARGET" --settings /dev/null >/dev/null 2>&1
assert_eq_rc 64 "$?" "rejects the removed --settings flag"

# every tracked definition present so far must be copied
MISSING=0
for f in "$PIPELINE_DIR"/agents/*.md; do
  [ -e "$f" ] || continue
  cmp -s "$f" "$TARGET/.claude/agents/$(basename "$f")" || MISSING=1
done
assert_eq_rc 0 "$MISSING" "every agents/*.md is copied byte-for-byte"

# --check must detect drift between source and installed copy
DRIFT_VICTIM="$(basename "$(ls "$PIPELINE_DIR"/agents/*.md | head -1)")"
printf '\ndrifted\n' >> "$TARGET/.claude/agents/$DRIFT_VICTIM"
bash "$INSTALL" --target "$TARGET" --check >/dev/null 2>&1
assert_eq_rc 1 "$?" "--check detects a drifted copy"
OUT="$(bash "$INSTALL" --target "$TARGET" --check 2>&1 >/dev/null)"
assert_contains "$OUT" "drift" "drift is named in the message"

bash "$INSTALL" --target "$TARGET" >/dev/null 2>&1
bash "$INSTALL" --target "$TARGET" --check >/dev/null 2>&1
assert_eq_rc 0 "$?" "re-installing repairs the drift"

# the tracked sources must carry their executable bit in git
BAD_MODE=0
for s in scripts/scope-check scripts/report-check scripts/install.sh; do
  [ -e "$PIPELINE_DIR/$s" ] || continue
  case "$(git -C "$REPO_ROOT" ls-files -s "docs/pipeline/$s" | awk '{print $1}')" in
    100755) ;;
    "")     ;;   # not committed yet — an earlier task's concern
    *)      BAD_MODE=1 ;;
  esac
done
assert_eq_rc 0 "$BAD_MODE" "committed scripts carry mode 100755"

summary
