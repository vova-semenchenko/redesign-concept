# UI Subagent Pipeline

Implementation of
[`../superpowers/specs/2026-07-30-ui-subagent-pipeline-design.md`](../superpowers/specs/2026-07-30-ui-subagent-pipeline-design.md).
Controller's own checklist: [`CONTROLLER.md`](CONTROLLER.md).

## Install

```bash
bash docs/pipeline/scripts/install.sh
```

Copies `agents/*.md` into `.claude/agents/`. Copies rather than symlinks:
loading symlinked agent definitions is not documented behaviour.

`.claude/` is gitignored — the tracked source here is the source of truth. After
editing anything under `docs/pipeline/agents/`, re-run `install.sh` **and restart
the session**: the harness reads agent definitions at startup. Check for drift
without copying:

```bash
bash docs/pipeline/scripts/install.sh --check
```

Requirements: `bash`, `git`, `perl` (frontmatter and brief parsing).

## Tests

```bash
bash docs/pipeline/tests/run-all.sh
```

Four suites: both contract scripts, the installer, and static validation of
every agent definition against the spec's role tables. They are
hermetic — the installer suite works in a temp directory and never touches the
live `.claude/`. Run before every commit into this directory.

## Roles

| Role | Model | Stage | What it does |
|------|-------|-------|--------------|
| `requirements-validator` | sonnet | 0 | Checks a draft spec against the brief, brand guide, voice-and-tone, foundation docs |
| `plan-challenger` | opus | 2 | Breaks the plan under one lens: `tech`, `brand`, `scope` |
| `frontend-implementer` | sonnet | 3, 5 | Implements one task (no motion); verifies mandated copy before changing it |
| `animation-engineer` | opus | 3, 5 | Owns all motion, including the brief's mandatory hero effect |
| `qa-lead` | sonnet | 4 | Fans out the QA zones, merges one report |
| `ui-qa` | sonnet | 4 | One zone: `brand-tokens`, `code-rules`, `ui-practices`, `motion`, `brief-criteria` |
| `copy-guard` | sonnet | 4 | Verifies text against brief §8 and the voice-and-tone §0 table |

## Running the pipeline

Orchestrated by the **main agent** — there is no separate conductor agent, and
nested agents never decide what comes next. Full checklist in
[`CONTROLLER.md`](CONTROLLER.md); the short version:

1. **Stage 0 — requirements.** `superpowers:brainstorming` dialogue → spec in
   `../superpowers/specs/`; dispatch `requirements-validator` before fixing it.
2. **Stage 1 — plan.** `superpowers:writing-plans` → file in
   `../superpowers/plans/`.
3. **Stage 2 — challenge.** Three parallel `plan-challenger` lenses, then a
   synthesis digest in the plan. **Checkpoint A: the user approves the plan.**
4. **Stage 3 — implementation.** `superpowers:subagent-driven-development` with
   `frontend-implementer` / `animation-engineer` on the implementer seam, and
   **one batch review after the whole scope** (not per task). Run
   `report-check` and `scope-check` on every seam.
5. **Stage 4 — QA.** One `qa-lead` dispatch. **Checkpoint B: the user approves
   the report** and decides what gets fixed; then at most 3 fix rounds.
6. **Stage 5 — visual check.** `npm run dev` in `uapp-site/`; the user looks.
   Fixes become tasks for the write roles, followed by a re-scoped QA round.
7. **Stage 6 — finish.** `superpowers:verification-before-completion`, then
   `superpowers:finishing-a-development-branch`. Integration into `main` only
   on the user's explicit request.

## Guardrails

| Layer | Mechanism | What it catches |
|-------|-----------|-----------------|
| 1 | `tools:` in each definition | Read-only roles get no **direct** write tools |
| 2 | `scripts/scope-check`, `scripts/report-check` | Silent scope creep, uncommitted work read as success, reports with no status or phantom commits |
| 3 | `ui-qa`, `copy-guard`, SDD's reviewers | Semantics: was the right thing built, and built well |

Layer 1 is honest about its limit: read-only roles hold no write tool, but they
may dispatch subagents, so "cannot write directly" is the guarantee — not
"cannot cause a write". Layer 2's `scope-check` is the backstop.

### The write guard that used to be layer 2

The pipeline shipped `hooks/agent-guard.sh`: a `PreToolUse` hook on the file
tools that denied edits to the sources of truth (`docs/task/**`,
`docs/brand-style-guide.md`, `docs/voice-and-tone.md`, `docs/research/**`) and to
`docs/pipeline/**`, and allowed writes only under `uapp-site/`,
`docs/superpowers/`, `.superpowers/`.

**Dropped on 2026-07-31.** The allowlist half generated most of the friction and
little of the value: it blocked installing a skill into `.claude/skills/`,
blocked its own policy files, and turned routine edits into commands handed back
to the user — while the deny half it was bundled with is already stated in
`CLAUDE.md` as the user's exclusive territory.

What this costs, stated plainly: nothing mechanically prevents an agent from
editing `docs/task/**`, the brand guide, voice-and-tone, `.claude/hooks/**` or
this file. Those boundaries now live in `CLAUDE.md` and
`.claude/rules/git-workflow.md` as instructions, which is a weaker layer than a
hook. If that turns out to matter, the deny table is the part worth reviving —
without `ALLOW_ROOTS`.

## Limitations

- Visual verification is the user's eyes only — screenshot automation
  (Playwright, MCP) is deliberately out of scope.
- No hook intercepts writes any more (see *The write guard that used to be layer
  2*); `git-guard.sh` still covers the git side, and it is hand-installed local
  config rather than a pipeline artifact.
- Layer 2 is run by the controller, not by a hook. Automating it via
  `SubagentStop` is an open question in the spec.
- `impeccable` is main-loop only: 2.9 MB, write-capable, and it installs its
  own `PostToolUse`/`Stop` hooks.
- Skills with `disable-model-invocation` (`review-animations`,
  `pick-ui-library`, `prototype`) cannot be invoked or preloaded by a subagent;
  roles read their files by path instead.

## Next step

Trial run on a real home-page task — acceptance criteria in the spec's §6. The
pipeline is built here; the trial proves it.
