#!/usr/bin/env bash
# install.sh [--target DIR] [--settings FILE] [--check]
#
# Syncs the tracked pipeline sources into .claude/, where the harness reads
# them. Copies, not symlinks: loading symlinked agent definitions is not a
# documented behaviour, and a copy plus a drift check is the safer bet.
#
#   --target DIR     install into DIR/.claude (default: the repo root)
#   --settings FILE  the settings file whose wiring to verify
#                    (default: <target>/.claude/settings.json)
#   --check          verify only: no copying; exit 1 on drift or missing wiring
#
# Re-run after editing anything under docs/pipeline/, then restart the session:
# the harness reads agent definitions and hooks at startup.
set -eu

PIPELINE_DIR="$(cd "$(dirname "$0")/.." && pwd)"
REPO_ROOT="$(cd "$PIPELINE_DIR/../.." && pwd)"

TARGET="$REPO_ROOT"
SETTINGS=""
CHECK_ONLY=0

while [ $# -gt 0 ]; do
  case "$1" in
    --target)   TARGET="$2"; shift 2 ;;
    --settings) SETTINGS="$2"; shift 2 ;;
    --check)    CHECK_ONLY=1; shift ;;
    *) echo "install: unknown argument: $1" >&2; exit 64 ;;
  esac
done

[ -n "$SETTINGS" ] || SETTINGS="$TARGET/.claude/settings.json"

AGENTS_DIR="$TARGET/.claude/agents"
HOOKS_DIR="$TARGET/.claude/hooks"

# --- collect the source -> destination pairs ---------------------------------
PAIRS=""
for f in "$PIPELINE_DIR"/agents/*.md; do
  [ -e "$f" ] || continue
  PAIRS="$PAIRS$f|$AGENTS_DIR/$(basename "$f")
"
done
PAIRS="$PAIRS$PIPELINE_DIR/hooks/agent-guard.sh|$HOOKS_DIR/agent-guard.sh
"

if [ "$CHECK_ONLY" -eq 0 ]; then
  mkdir -p "$AGENTS_DIR" "$HOOKS_DIR"
  chmod +x "$PIPELINE_DIR/hooks/agent-guard.sh" "$PIPELINE_DIR/scripts/install.sh"
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

[ "$CHECK_ONLY" -eq 0 ] && chmod +x "$HOOKS_DIR/agent-guard.sh"

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

# --- wiring (verified, never rewritten: it is local config) -------------------
if grep -q 'agent-guard.sh' "$SETTINGS" 2>/dev/null; then
  echo "install: settings wiring present ($SETTINGS)"
else
  cat >&2 <<MSG
install: WARNING — agent-guard is not wired in $SETTINGS
Add this entry to .hooks.PreToolUse, alongside the existing Bash/git-guard entry:

  {
    "matcher": "Edit|Write|MultiEdit|NotebookEdit",
    "hooks": [
      {
        "type": "command",
        "command": "bash \"\$CLAUDE_PROJECT_DIR/.claude/hooks/agent-guard.sh\""
      }
    ]
  }
MSG
  STATUS=1
fi

exit "$STATUS"
