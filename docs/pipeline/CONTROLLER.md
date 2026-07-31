# Controller checklist

Read this before running the pipeline. It overrides stock skill behaviour where
they disagree.

## Review rhythm — overrides stock SDD

superpowers:subagent-driven-development reviews after **every** task. This
pipeline does not.

- **A plan with a scope of several tasks:** implement all of them, then run
  **one batch task-review** over the whole range
  (`review-package PLAN_FILE <scope-base> <HEAD>`). Fix rounds run after that
  single review, and SDD's round limit applies to the batch.
- **A single-task fix plan:** review immediately after the task, as stock SDD
  does.

Reason: spec decision 7. Per-task reviews on a multi-task UI plan spend more
rounds on ceremony than on defects.

## On every implementation seam

After a subagent returns and before you review, run both — a self-report is not
evidence:

```bash
bash docs/pipeline/scripts/report-check <REPORT_FILE> .
bash docs/pipeline/scripts/scope-check  <BRIEF_FILE> <BASE> <HEAD>
```

`report-check` fails → treat as `NEEDS_CONTEXT`. `scope-check` fails on
out-of-scope files → a fix round, or an explicit ruling written into the
ledger; it fails on an uncommitted tree → the work is not reviewable yet.
Never wave either one through silently.

## The two stops — and only these two

- **Checkpoint A, after the challenge panel.** Three parallel
  `plan-challenger` dispatches (`tech`, `brand`, `scope`), then you synthesize:
  update the plan and append a digest recording every finding as accepted (how)
  or rejected (why). The user approves the plan before implementation starts.
- **Checkpoint B, after the QA report.** One `qa-lead` dispatch returns one
  report. Show it to the user with the state of `npm run typecheck`,
  `npm run lint` and `next build`. **The user decides which findings get
  fixed.** No fix is dispatched before that decision. Approved fixes run at
  most 3 rounds of "fix → re-scoped `qa-lead`"; what does not converge goes
  back to the user.

Everything between and after these stops is continuous execution — do not check
in for permission.

## Role dispatch map

| Stage | Dispatch | Model |
|-------|----------|-------|
| 0 | `requirements-validator` on the draft spec | sonnet |
| 2 | `plan-challenger` ×3 (`tech`, `brand`, `scope`) | opus |
| 3 | `frontend-implementer` per task; `animation-engineer` for motion tasks | sonnet / opus |
| 4 | `qa-lead` once; it fans out `ui-qa` ×5 zones and `copy-guard` itself | sonnet |
| 5 | `frontend-implementer` / `animation-engineer` for the user's visual fixes | sonnet / opus |

Model tiers may be raised per dispatch (SDD's rule: a stuck fix round goes one
tier above the stuck implementer).

## What only you can do

- Invoke `impeccable` (`critique`, `audit`) — it is forbidden inside subagents.
- Edit `docs/pipeline/**`, `CLAUDE.md`, the root `README.md`, `.claude/**`:
  hook-blocked for agents, and for you too once the hook is live. Pipeline
  changes are the user's call — bring them a diff, do not self-modify.
- Keep the ledger and make the rulings. Nested agents decide *how* to do their
  job, never *what comes next*.
