#!/usr/bin/env bash
# Static validation of agents/*.md against the spec's role tables (§2, §3).
. "$(dirname "$0")/lib.sh"

echo "test-agent-defs:"

# field <file> <key> — value of a top-level frontmatter key.
# The key travels in the environment: a second perl argument would be taken
# as another input file.
field() {
  FIELD_KEY="$2" perl -0777 -ne '
    my ($fm) = /\A---\n(.*?)\n---/s or exit 1;
    my $k = $ENV{FIELD_KEY};
    for my $line (split /\n/, $fm) {
      if ($line =~ /^\Q$k\E:\s*(.*?)\s*$/) { print $1; exit 0 }
    }
    exit 1
  ' "$1" 2>/dev/null
}

# check_def <basename> <expected-name> <expected-model> <expected-tools>
check_def() {
  local base="$1" want_name="$2" want_model="$3" want_tools="$4"
  local f="$PIPELINE_DIR/agents/$base"

  if [ ! -f "$f" ]; then
    assert_eq_rc 0 1 "$base exists"
    return
  fi
  assert_eq_rc 0 0 "$base exists"

  assert_contains "$(field "$f" name)"  "$want_name"  "$base: name is $want_name"
  assert_contains "$(field "$f" model)" "$want_model" "$base: model is $want_model"

  local tools; tools="$(field "$f" tools)"
  assert_contains "$tools" "$want_tools" "$base: tools are $want_tools"

  [ -n "$(field "$f" description)" ]
  assert_true "$?" "$base: description present"

  # `Skill` is not a valid tools entry — skills attach via `skills:` or are
  # invoked at runtime without being listed.
  case "$tools" in
    *Skill*) assert_eq_rc 0 1 "$base: tools do not list Skill" ;;
    *)       assert_eq_rc 0 0 "$base: tools do not list Skill" ;;
  esac

  # impeccable is main-loop only (spec §5) — every definition must say so.
  grep -q 'impeccable' "$f"
  assert_true "$?" "$base: body forbids impeccable"

  # read-only roles must carry no writing tool
  case "$want_tools" in
    *Edit*|*Write*) ;;
    *)
      case "$tools" in
        *Edit*|*Write*|*NotebookEdit*)
          assert_eq_rc 0 1 "$base: read-only role carries no write tool" ;;
        *)
          assert_eq_rc 0 0 "$base: read-only role carries no write tool" ;;
      esac
      ;;
  esac

  # any preloaded skill must be model-invocable (disable-model-invocation
  # skills can be neither preloaded nor invoked by a subagent)
  local skills; skills="$(field "$f" skills)"
  if [ -n "$skills" ]; then
    local bad=0
    for s in $(printf '%s' "$skills" | tr -d '[],'); do
      local sk="$REPO_ROOT/.agents/skills/$s/SKILL.md"
      [ -f "$sk" ] || continue
      grep -q 'disable-model-invocation: *true' "$sk" && bad=1
    done
    assert_eq_rc 0 "$bad" "$base: preloaded skills are model-invocable"
  fi
}

check_def "requirements-validator.md" "requirements-validator" "sonnet" "Read, Grep, Glob, Agent"
check_def "plan-challenger.md"        "plan-challenger"        "opus"   "Read, Grep, Glob, Agent"

summary
