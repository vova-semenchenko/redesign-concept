#!/usr/bin/env bash
# install.sh [--target DIR] [--check]
#
# Syncs the tracked agent definitions into .claude/agents/, where the harness
# reads them. Copies, not symlinks: loading symlinked agent definitions is not a
# documented behaviour, and a copy plus a drift check is the safer bet.
#
#   --target DIR     install into DIR/.claude (default: the repo root)
#   --check          verify only: no copying; exit 1 on drift
#
# Re-run after editing anything under docs/pipeline/agents/, then restart the
# session: the harness reads agent definitions at startup.
#
# Hooks are deliberately out of scope. The pipeline shipped a write-guard hook
# (agent-guard) and it was dropped on 2026-07-31 as more friction than value;
# git-guard remains, but it is hand-installed local config, not a pipeline
# artifact, so nothing here syncs or verifies hook wiring.
set -eu

PIPELINE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$PIPELINE_DIR/../.." && pwd)"

TARGET="$REPO_ROOT"
CHECK_ONLY=0

while [ $# -gt 0 ]; do
  case "$1" in
    --target)   TARGET="$2"; shift 2 ;;
    --check)    CHECK_ONLY=1; shift ;;
    *) echo "install: unknown argument: $1" >&2; exit 64 ;;
  esac
done

AGENTS_DIR="$TARGET/.claude/agents"

# --- collect the source -> destination pairs ---------------------------------
PAIRS=""
for f in "$PIPELINE_DIR"/agents/*.md; do
  [ -e "$f" ] || continue
  PAIRS="$PAIRS$f|$AGENTS_DIR/$(basename "$f")
"
done

if [ "$CHECK_ONLY" -eq 0 ]; then
  mkdir -p "$AGENTS_DIR"
  chmod +x "$PIPELINE_DIR/scripts/install.sh"
  for s in scope-check report-check; do
    [ -e "$PIPELINE_DIR/scripts/$s" ] && chmod +x "$PIPELINE_DIR/scripts/$s"
  done
fi

# --- copy (or verify) --------------------------------------------------------
COPIED=0
DRIFT=""
while IFS='|' read -r src dst; do
  [ -z "$src" ] && continue
  if [ "$CHECK_ONLY" -eq 0 ]; then
    cp "$src" "$dst"
    COPIED=$((COPIED + 1))
  fi
  cmp -s "$src" "$dst" || DRIFT="$DRIFT$dst
"
done <<EOF
$PAIRS
EOF

STATUS=0

if [ -n "$DRIFT" ]; then
  echo "install: drift — installed copies differ from the tracked source:" >&2
  printf '%s' "$DRIFT" | sed 's/^/  - /' >&2
  echo "install: re-run without --check to resync." >&2
  STATUS=1
elif [ "$CHECK_ONLY" -eq 0 ]; then
  echo "install: synced $COPIED file(s) into $TARGET/.claude/"
else
  echo "install: check — installed copies match the tracked source"
fi

exit "$STATUS"
