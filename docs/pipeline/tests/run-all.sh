#!/usr/bin/env bash
# Runs every tests/test-*.sh; exits 1 if any suite fails.
cd "$(dirname "$0")" || exit 1

RC=0
for t in test-*.sh; do
  [ -f "$t" ] || continue
  bash "$t" || RC=1
  echo
done

if [ "$RC" -eq 0 ]; then
  echo "run-all: ALL SUITES PASSED"
else
  echo "run-all: FAILURES PRESENT" >&2
fi
exit "$RC"
