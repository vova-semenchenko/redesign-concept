---
target: hero section with stat numbers
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 3
timestamp: 2026-07-31T18-26-09Z
slug: uapp-site-src-components-sections-hero-tsx
---
Method: dual-agent (A: a6c21f367a514f3ee · B: a2cec9ce563df096e)

Target: `uapp-site/src/components/sections/hero.tsx` + `ui/metric-stat.tsx` + `hero-animation/hero-visual.tsx`. Mode: Persuade.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | Hero is 944–973px tall at every width; at 1280×800 the viewport ends on empty navy with no content edge — the page can read as finished |
| 2 | Match System / Real World | 3 | Rail vocabulary is exact, but "Both sides · schematic" is internal brief-metaphor with no referent for a first-time reader |
| 3 | User Control and Freedom | 2 | The primary CTA teleports 7,205px with `scroll-behavior: auto` into another navy screen — reads as a reload |
| 4 | Consistency and Standards | 3 | Token discipline near-perfect, but the four metric values break the system's own alignment rule at every width |
| 5 | Error Prevention | 2 | At 1024px the schematic panel overlaps "See our work" (panel left 593 vs button right 600); the button row has no wrap |
| 6 | Recognition Rather Than Recall | 3 | "170+" and "15" appear twice within 300px — in the subhead and again in the metric row |
| 7 | Flexibility and Efficiency | n/a | A single-action hero has no novice/expert path to diverge |
| 8 | Aesthetic and Minimalist Design | 3 | Real restraint, but 74% of the first screen's light is spent on the lowest-value content |
| 9 | Error Recovery | 3 | No error surface in the hero; deducted only for the 1024 collision shipping as an unhandled layout error |
| 10 | Help and Documentation | n/a | A hero is not a documentation surface |
| **Total** | | **21/32** | **Acceptable (66%)** |

## Design Specificity Verdict

**LLM assessment.** The *composition* is authored — a neighbouring fintech cannot paste copy into this navy sheet and have it look like theirs. Six continuous construction lines, an 84px Display Light H1 breaking to exactly two lines, empty outer column pairs, zero shadow or radius. That part earns its keep.

The *metric row* is the generic agency trust template with one piece of real craft inside it: the dividers land exactly on the sheet's own construction lines (x = 524 / 756 / 988 at 1512), so the row is drawn by the grid rather than chromed onto it. But four equal columns of tenure / volume / geography / money is the quartet on every outsourcing landing page since 2014. Nothing in the row is a payments fact, and PRODUCT.md's evidence list (7+ chains, ISO 20022 message lifecycle, on-device ECDSA) never reaches the first screen. Brief §8 fixes the trust *line*, not the composition around it.

The *schematic* is authored in vocabulary and generic in form: a plain white rectangle. `.corner-ticks` draws 9px L-marks in `--rule-strong`, but `schematic.tsx:28` already puts a full border on the same 1px path, and on ink `rgb(255 255 255 / 0.42)` against a white fill is invisible — DESIGN.md's "crop marks frame a plate" ships as dead CSS.

And it says the wrong thing. Two mirrored columns, three items each, symmetric axis, accent dot dead-centre: the hero's largest visual element encodes **50/50 fiat:crypto parity**, when brief §11's first evaluation criterion is that banking-first — *not* 50/50 — reads from the first screen. The marker reinforces it: "Regulated fintech · payments · crypto", three equal tokens. Nothing at scanning size says banking-first.

**Deterministic scan.** CLI detector over the five hero markup files: **0 findings**, exit 0. Over `uapp-site/src`: 0 findings.

Both runs came with a caveat worth more than the result: `findDesignRoot()` walks up from the file and stops at the first project marker, which is `uapp-site/package.json` — and there is no DESIGN.md beside it. **The repo-root DESIGN.md is never read for any file under `uapp-site/`, so every `design-system-*` rule was silently inert.** Re-running with the files copied under a directory that carries DESIGN.md surfaced one real finding: `ui/button.tsx:39` — `xs: text-[0.75rem]` is off the type ramp. Not on the hero surface (it renders `default` and `sm`), but the ramp has a hole and the detector cannot see it in place.

**Visual overlays.** Injection succeeded — 75 overlay elements rendered with amber outlines and labels; the live server has since been stopped. 44 findings page-wide, 11 anchored inside the hero. Most are false positives against measurement: `gray-on-color` ×7 fires on the hex pairing, not the ratio (measured 7.55:1 and 15.48:1); `all-caps-body` fires on `.label-micro`, which is the system's single documented uppercase role; `cramped-padding` on the primary CTA is technically true (`padding-block: 0`) but the control uses a fixed 44px height against a 22.5px line box. `nested-cards` on the schematic could not be verified — the parent `<figure>` has no background or border. The `repeating-stripes-gradient` advisory on `body` is our construction lines, working as designed.

## Overall Impression

The hero is the most confident thing on the page and it is spending its confidence in the wrong place. Two independent assessments converge on one number: the white schematic panel is **73.9% of all bright pixels** in the first viewport, the metric row is **3.2%** — a 23:1 light budget in favour of six static nouns over the only checkable facts on the screen. And the four numbers that lost that argument are then pushed below the fold on the two most common laptop viewports.

The single biggest opportunity is not a new element. It is reallocating what already exists: shrink the panel's claim on the eye, lift the metrics into the first screen, and break the diagram's symmetry so the composition says banking-first instead of contradicting it.

## What's Working

**The metric row's DOM order is correct and deliberately inverted for the eye.** `<dt>` before `<dd>`, reversed with `flex-col-reverse`. A screen reader hears "years in regulated finance: 8+" — the semantically correct term/definition order — while a sighted reader gets value-first. Most teams break `dl` semantics to get that visual. (It is also the direct cause of the baseline bug below, but the instinct was right.)

**Reduced motion is handled by construction, not by patching.** Every animation lives inside `@media (prefers-reduced-motion: no-preference)` with `both` fill, so the reduced-motion state *is* the natural DOM state and cannot drift as the page grows. Verified: h1 `opacity: 1`, `transform: none`, `animation-name: none`, `getAnimations()` empty. Combined with the hero-animation contract keeping H1, sub, CTA and metrics outside the module, the LCP and the evidence are both independent of an effect that hasn't shipped.

**Vocabulary discipline at scanning size.** SEPA Instant, ISO 20022, card programs, on-chain rails — zero adjectives, no banlist violations. For a buyer whose job is disqualification, this is the one thing on the screen actually doing the work.

## Priority Issues

**[P0] The proof numbers leave the first viewport on most laptops.**
Measured: fully visible at 1920×1080 and 1512×950 (39px clearance); **clipped at 1440×900**; **entirely below the fold at 1280×800 and 1024×768**. The direction contract in `page.tsx` promises "four metrics on a ruled row under a hairline" in the first viewport, and that promise breaks on three of five desktop sizes.
*Why it matters:* a Head of Payments gives you one screen, and the screen currently ends on empty navy instead of on your evidence.
*Fix:* reclaim the 150px dead band between the H1 (bottom y=404) and the sub column (top y=554) — `gap-y-16` → `gap-y-10` on the sheet grid in `hero.tsx:24` — and step this zone's padding below `pad="lg"`. Target hero height ≤ 800px.
*Suggested command:* `/impeccable layout`

**[P0] Three quarters of the hero's light buys six static nouns.**
The white panel is 73.9% of bright pixels; the metric row is 3.2%. What that light delivers is six labels with no verb, no number, no volume, no direction of flow. The dashed axis with one 8px diamond says "these two things are near each other", not "we move money between them".
*Why it matters:* the eye goes to the brightest thing first, and the brightest thing gives a shortlisting buyer nothing to qualify you with.
*Fix:* put a number inside the panel from PRODUCT.md's evidence list (a message count, a chain count, a settlement window), or shrink its footprint so the light reallocates to the H1 and the metrics. Either way remove the redundant `border` on `schematic.tsx:28` so the corner ticks actually read.
*Suggested command:* `/impeccable bolder`

**[P1] The hero's central visual asserts 50/50, contradicting the positioning it exists to prove.**
`hero-visual.tsx:5-8` (`SHORES`) — two mirrored columns, three items each, symmetric axis, centred accent. `home.ts` `hero.marker` — "Regulated fintech · payments · crypto", three equal tokens.
*Why it matters:* brief §11's first checklist item and PRODUCT.md's core claim both hinge on the deliberate tilt. A reader who sees parity concludes "half a crypto shop" — the exact disqualification the repositioning exists to prevent.
*Fix:* break the symmetry — five fiat rails against two on-chain, or give the fiat column the type weight and the accent — and rewrite the marker so banking leads by weight, not just word order.
*Suggested command:* `/impeccable clarify`

**[P1] The four numbers do not share a baseline at any width.**
`metric-stat.tsx:18` — `flex-col-reverse` bottom-aligns labels in a stretched grid cell, so values float at whatever height the label's line count leaves them. Measured stagger: 15.94px at 1512 and 1440, 16px at 1280, **32px across four levels at 1024**. Compounding it, `first:pl-0` gives cell 1 a 200px measure while cells 2–4 get 168px, so four peer items have three different measures. At 1024 two values also overflow: `170+` ends 1.5px past its own dividing rule, `$1B+` 2.5px past the content column edge.
*Why it matters:* this is a company selling engineering precision, on the one element whose job is to look precise, in a system whose identity is drawn alignment.
*Fix:* keep the DOM order. Give the `dd` a fixed block and let the `dt` wrap beneath it, or normalise the cell measure (drop `first:pl-0`, offset the whole `dl` instead).
*Suggested command:* `/impeccable layout`

**[P1] The construction lines stop 128px short of the hero's own edges.**
The hero passes `rules={false}` and renders its own overlay inside `Zone`'s inner `.sheet` wrapper, so `inset-0` resolves against the content box, not the section. Measured: section 973.4px tall, `.rules-v` 716.4px — **73.6% coverage**, versus 99.3–100% in every other zone on the page. The identity device is weakest in the one zone that carries the identity.
*Fix:* hoist the overlay to a direct child of `<section>` — give `Zone` a `drawRules` prop instead of `rules={false}` plus a hand-rolled duplicate in `hero.tsx:20-22`.
*Suggested command:* `/impeccable polish`

**[P2] The schematic's entire content is hidden from assistive tech, against its own contract.**
`hero-visual.tsx:28` wraps everything in `aria-hidden="true"`. The accessibility tree for a panel occupying 74% of the screen is one paragraph: "Both sides · schematic". `hero-animation/README.md` contract point 4 requires the decorative layer to be aria-hidden **and** the message duplicated as text outside the module — it isn't.
*Why it matters:* those six protocol strings are exactly what a compliance reviewer forwards the page to find.
*Fix:* move `aria-hidden` down to the dashed axis and the accent diamond only; leave the two lists in the tree with the shore names as headings.
*Suggested command:* `/impeccable harden`

## Persona Red Flags

**Priya — Head of Payments at a mid-size EMI, three vendors shortlisted** *(project-specific, from PRODUCT.md)*
Lands at 1440×900. Scans for one thing: has this team shipped my rail into production. Gets "SEPA Instant · ISO 20022 · Card programs" — her language — presented as one half of a perfect mirror against wallets and exchanges, which reads as "generalists who also do crypto". Looks for a number to anchor it and finds the metric row **cut off at the bottom of her screen**. Nothing in the first viewport says a regulated institution put this into production, and nothing says "under NDA" — so she cannot yet explain to her CTO why there are no client logos. Her forward to compliance is worse: no AML, no KYC, no PSD2, no SCA anywhere in the hero. Those words are one scroll down; the forward lands on the hero.

**Riley — deliberate stress tester**
At 1024 the white panel sits on top of the "See our work" button (593 vs 600 — the border is clipped). Tabs from the top and hits **three links with the identical accessible name "Describe your challenge"** in the first eight stops. Watches the load: the metric row is the only hero element without a `settle` class, so at 400ms the four numbers are at full opacity while the H1 is still fading — putting the baseline stagger on maximum display in the exact frame meant to prove mastery. Reads "$1B+ in clients' annual revenue" and asks whose revenue, which year, combined or peak — and finds no qualifier anywhere.

**Sam — accessibility-dependent**
The element occupying 74% of the screen announces four words. Every rail name is inside `aria-hidden`. The metric row reads correctly — `term: "years in regulated finance" / definition: "8+"` — until the fourth, which emits `term: "in clients' annual revenue"`: a term that is not a noun phrase, because the label starts with a preposition and only parses if you read the value first. No skip link; first tab stop is the nav. Focus rings are correct (2px `--ring`, 3px offset, 4.49:1 on ink) and reduced motion is genuinely honoured.

## Minor Observations

- **The primary pill's silhouette is 2.40:1 against the ink zone.** Text on it is 7.98:1, but the fill has `border-width: 0`, so the entire boundary of the page's main control sits under the 3:1 that WCAG 1.4.11 asks of non-text UI. The paper zones are fine; this is an ink-zone-only problem.
- **The metric dividers double the construction line instead of overprinting it** — the divider paints ~0.7px left of the line's optical centre, producing a 2px band across y=820–910. Sub-pixel, but visible as a slightly heavier rule in that row.
- **`170+` and `15` are stated twice within 300px** — once in the mandated subhead, once in the mandated trust line. Both are mandated; putting both in the same screen was not.
- **The sub column's right edge (x=872) is 116px from the nearest construction line** — exactly midway between 756 and 988. It is a 12-column boundary, not a drawn one, so the schematic's left edge floats.
- **`max-w-[16ch]` on the H1** (`hero.tsx:30`) is inert below ~1600px and is a literal where the README's own rules ask for a type role.
- **The accent diamond sits at the vertical centre of the dashed axis**, which lands it between "ISO 20022" and "Exchanges" — an arbitrary pairing a reader will try to interpret. If the one ultramarine object is spent, it should mark something.
- **Accent budget is healthy:** 1.325% of the viewport painted, well under the 5% rule, with zero accent used as text inside the hero.
- **No `scroll-padding-top`** despite a 66px sticky header. Harmless today because zone padding is 128px.
- **Detector blind spot to fix outside this critique:** `design-system-*` rules never fire for `uapp-site/**` because DESIGN.md sits at the repo root and `uapp-site/package.json` terminates the search. A symlink or a copy at `uapp-site/DESIGN.md` would re-arm them.

## Questions to Consider

1. **If you deleted the schematic and gave its 74% of the light to the four numbers, would this hero convert better?** The honest test is not "is the schematic good" — it's "is it worth 23× the evidence".
2. **What if the two shores were never meant to be symmetric?** The mirror is the most designerly thing in the hero and also the thing that contradicts the positioning most directly. What does the diagram look like when the composition itself says "not 50/50"?
3. **The metric row is the only element that doesn't participate in the page's one authored moment.** What if lines drew, headline settled, sub and CTA settled, and *then* the four numbers arrived last on a shared baseline — so the hero ends on evidence instead of trailing off below the fold?
