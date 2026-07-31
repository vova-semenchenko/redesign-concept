#!/usr/bin/env bash
# Cases for scripts/report-check.
. "$(dirname "$0")/lib.sh"

echo "test-report-check:"

RC_BIN="$PIPELINE_DIR/scripts/report-check"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

REAL_SHA="$(git -C "$REPO_ROOT" rev-parse --short HEAD)"

printf 'Status: DONE\nCommits: %s\n' "$REAL_SHA" > "$WORK/ok.md"
bash "$RC_BIN" "$WORK/ok.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 0 "$?" "accepts a valid status with a real commit"

printf 'Status: DONE_WITH_CONCERNS\nCommits: none\nConcerns: naming\n' > "$WORK/concerns.md"
bash "$RC_BIN" "$WORK/concerns.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 0 "$?" "accepts DONE_WITH_CONCERNS"

# Build output is full of digit-bearing hex that is NOT a commit: only the
# Commits: line may be scanned, or valid reports get rejected.
{
  printf 'Status: DONE\n'
  printf 'Commits: %s\n' "$REAL_SHA"
  printf 'Verification: next build produced chunk 4a2f8b1c and 20260731 assets in 1234567 ms\n'
} > "$WORK/buildoutput.md"
bash "$RC_BIN" "$WORK/buildoutput.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 0 "$?" "does not mistake build hashes or dates in prose for commits"

printf 'All finished, looks great.\n' > "$WORK/nostatus.md"
bash "$RC_BIN" "$WORK/nostatus.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 1 "$?" "rejects a report with no SDD status"

printf 'Status: DONE\nCommits: 1234567890abcdef\n' > "$WORK/fakesha.md"
bash "$RC_BIN" "$WORK/fakesha.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 1 "$?" "rejects a Commits: line citing a nonexistent commit"
OUT="$(bash "$RC_BIN" "$WORK/fakesha.md" "$REPO_ROOT" 2>&1 >/dev/null)"
assert_contains "$OUT" "1234567890abcdef" "names the phantom commit"

: > "$WORK/empty.md"
bash "$RC_BIN" "$WORK/empty.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 1 "$?" "rejects an empty report"

bash "$RC_BIN" "$WORK/missing.md" "$REPO_ROOT" >/dev/null 2>&1
assert_eq_rc 1 "$?" "rejects a missing report file"

bash "$RC_BIN" >/dev/null 2>&1
assert_eq_rc 64 "$?" "rejects a call with no arguments"

summary
