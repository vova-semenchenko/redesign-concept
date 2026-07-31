#!/usr/bin/env bash
# lib.sh — assertion helpers for the pipeline's bash tests.
# No external framework: the repo has no bats and needs no new dependency.

PIPELINE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
REPO_ROOT="$(cd "$PIPELINE_DIR/../.." && pwd)"
export PIPELINE_DIR REPO_ROOT

_PASS=0
_FAIL=0

# assert_eq_rc <expected-rc> <actual-rc> <label>
assert_eq_rc() {
  if [ "$2" -eq "$1" ]; then
    _PASS=$((_PASS + 1)); printf '  ok   %s\n' "$3"
  else
    _FAIL=$((_FAIL + 1)); printf '  FAIL %s (exit %s, expected %s)\n' "$3" "$2" "$1"
  fi
}

# assert_true <rc> <label> — 0 passes, anything else fails
assert_true() {
  if [ "$1" -eq 0 ]; then
    _PASS=$((_PASS + 1)); printf '  ok   %s\n' "$2"
  else
    _FAIL=$((_FAIL + 1)); printf '  FAIL %s\n' "$2"
  fi
}

# assert_contains <haystack> <needle> <label>
assert_contains() {
  case "$1" in
    *"$2"*) _PASS=$((_PASS + 1)); printf '  ok   %s\n' "$3" ;;
    *)      _FAIL=$((_FAIL + 1)); printf '  FAIL %s (missing: %s)\n' "$3" "$2" ;;
  esac
}

summary() {
  printf '%s passed, %s failed\n' "$_PASS" "$_FAIL"
  [ "$_FAIL" -eq 0 ]
}
