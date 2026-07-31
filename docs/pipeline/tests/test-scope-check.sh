#!/usr/bin/env bash
# Cases for scripts/scope-check — runs against a throwaway git repo.
. "$(dirname "$0")/lib.sh"

echo "test-scope-check:"

SCOPE="$PIPELINE_DIR/scripts/scope-check"
WORK="$(mktemp -d)"          # the fake repo
BRIEFS="$(mktemp -d)"        # briefs live OUTSIDE the repo, so they never
                             # appear in its diff and skew the result
trap 'rm -rf "$WORK" "$BRIEFS"' EXIT

git -C "$WORK" init -q
git -C "$WORK" config user.email test@example.com
git -C "$WORK" config user.name Test
mkdir -p "$WORK/src"
printf 'base\n' > "$WORK/src/keep.ts"
printf 'gone\n' > "$WORK/src/drop.ts"
git -C "$WORK" add -A
git -C "$WORK" commit -qm base
BASE="$(git -C "$WORK" rev-parse HEAD)"

cat > "$BRIEFS/brief.md" <<'BRIEF'
# Task 1 brief

**Files:**
- Create: `src/new.ts`
- Modify: `src/keep.ts:1-10`
- Delete: `src/drop.ts`
- Test: `tests/new.test.ts`
BRIEF

# --- in-scope diff, fully committed ------------------------------------------
printf 'new\n'     > "$WORK/src/new.ts"
printf 'changed\n' > "$WORK/src/keep.ts"
rm "$WORK/src/drop.ts"
mkdir -p "$WORK/tests"
printf 't\n' > "$WORK/tests/new.test.ts"
git -C "$WORK" add -A
git -C "$WORK" commit -qm inscope
HEAD_OK="$(git -C "$WORK" rev-parse HEAD)"

( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_OK" >/dev/null 2>&1 )
assert_eq_rc 0 "$?" "passes when every changed file is declared (create/modify/delete)"

# --- uncommitted work must not read as success -------------------------------
printf 'dirty\n' > "$WORK/src/keep.ts"
( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_OK" >/dev/null 2>&1 )
assert_eq_rc 1 "$?" "fails when the working tree has uncommitted changes"
OUT="$( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_OK" 2>&1 >/dev/null )"
assert_contains "$OUT" "uncommitted" "names uncommitted work as the reason"
git -C "$WORK" checkout -q -- src/keep.ts

# --- out-of-scope diff --------------------------------------------------------
printf 'stray\n' > "$WORK/src/stray.ts"
git -C "$WORK" add -A
git -C "$WORK" commit -qm stray
HEAD_BAD="$(git -C "$WORK" rev-parse HEAD)"

( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_BAD" >/dev/null 2>&1 )
assert_eq_rc 1 "$?" "fails when a file outside the brief changed"
OUT="$( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_BAD" 2>&1 >/dev/null )"
assert_contains "$OUT" "src/stray.ts" "names the offending file"

# --- a rename must show both sides -------------------------------------------
git -C "$WORK" mv src/keep.ts src/renamed.ts
git -C "$WORK" commit -qm rename
HEAD_RENAME="$(git -C "$WORK" rev-parse HEAD)"
OUT="$( cd "$WORK" && bash "$SCOPE" "$BRIEFS/brief.md" "$BASE" "$HEAD_RENAME" 2>&1 >/dev/null )"
assert_contains "$OUT" "src/renamed.ts" "a rename's new path is reported, not hidden"

# --- unusable brief / bad invocation ------------------------------------------
printf '# no files here\n' > "$BRIEFS/empty.md"
( cd "$WORK" && bash "$SCOPE" "$BRIEFS/empty.md" "$BASE" "$HEAD_OK" >/dev/null 2>&1 )
assert_eq_rc 64 "$?" "rejects a brief with no Files section"
bash "$SCOPE" >/dev/null 2>&1
assert_eq_rc 64 "$?" "rejects a call with no arguments"
( cd "$WORK" && bash "$SCOPE" /nonexistent/brief.md "$BASE" "$HEAD_OK" >/dev/null 2>&1 )
assert_eq_rc 64 "$?" "rejects a missing brief file"

summary
