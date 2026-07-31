---
name: UAPP
description: Technical blueprint for regulated finance — a visible engineering grid, hard-edged dark and light zones, and one rare ultramarine accent.
colors:
  ink: "#00073C"
  paper: "#F9FAFB"
  window: "#FFFFFF"
  accent: "#011EFF"
  accent-quiet: "#8091FF"
  ink-heading: "#000F7D"
  text-body-light: "#374151"
  text-muted-light: "#6B7280"
  rule-light: "#E5E7EB"
  text-body-dark: "#E5E7EB"
  text-muted-dark: "#9CA3AF"
  rule-dark: "rgb(255 255 255 / 0.10)"
  rule-dark-strong: "rgb(255 255 255 / 0.42)"
  destructive-dark: "#F87171"
typography:
  display:
    fontFamily: "e-Ukraine Head, system-ui, sans-serif"
    fontSize: "clamp(3.25rem, 5.6vw, 5.25rem)"
    fontWeight: 300
    lineHeight: 0.96
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "e-Ukraine Head, system-ui, sans-serif"
    fontSize: "clamp(2rem, 3.2vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.06
    letterSpacing: "-0.03em"
  title:
    fontFamily: "e-Ukraine Head, system-ui, sans-serif"
    fontSize: "2.125rem"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.025em"
  statement:
    fontFamily: "e-Ukraine Head, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 2.1vw, 1.9rem)"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  subtitle:
    fontFamily: "e-Ukraine, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "e-Ukraine, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "0em"
  body:
    fontFamily: "e-Ukraine, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0em"
  caption:
    fontFamily: "e-Ukraine, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0em"
  metric:
    fontFamily: "e-Ukraine Head, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 3.1vw, 3rem)"
    fontWeight: 300
    lineHeight: 1
    letterSpacing: "-0.02em"
    fontFeature: "tabular-nums"
  label:
    fontFamily: "e-Ukraine, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: "0.14em"
rounded:
  edge: "2px"
  pill: "9999px"
spacing:
  row: "40px"
  cell: "32px"
  band: "56px"
  zone: "96px"
  zone-lg: "128px"
  zone-fold: "96px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.window}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
    typography: "{typography.body}"
  button-primary-hover:
    backgroundColor: "#0116BF"
    textColor: "{colors.window}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.text-body-light}"
    rounded: "{rounded.edge}"
    padding: "0 20px"
    height: "36px"
  card-cell:
    backgroundColor: "transparent"
    textColor: "{colors.text-body-light}"
    rounded: "{rounded.edge}"
    padding: "32px 28px 36px"
  schematic-window:
    backgroundColor: "{colors.window}"
    textColor: "{colors.text-body-light}"
    rounded: "{rounded.edge}"
    padding: "20px"
---

# Design System: UAPP

## Overview

**Creative North Star: "The Engineering Blueprint"**

The site looks like a drawing sheet from the engineering office that builds payment systems.
Its structure is not hidden behind surfaces — it is drawn. Thin construction lines run the
full height of the page and continue through empty space; horizontal hairlines separate
sections and list rows instead of padding doing the work; small tracked uppercase markers
label regions the way a drawing labels its views. Nothing is decorated, everything is
dimensioned.

The page reads as a system seen through, which is the argument the company is making: these
are engineers you can hand a regulated payment flow to. Density is high in information and
low in ornament — the content column occupies roughly the middle two thirds of the sheet and
the outer columns stay deliberately empty, because margin is what a drawing has and a
brochure does not.

The one saturated colour on the sheet is ultramarine, and it is rationed. It fills the
primary action and the small indicators inside diagrams, and nothing else. Encountered
maybe four times on the whole page, it reads as an event each time.

Confirmed visual rejections, from the client brief: crypto aesthetics (neon, coins, cyber
glow), stock illustration and character art, soft pastel gradients, bento cards with large
radii, glass and blur surfaces, auto-rotating carousels, and aggressive motion.

**Key Characteristics:**

- The grid is visible and continuous — it is the identity, not a layout aid
- Hard-edged alternation of dark (ink) and light (paper) zones, never a gradient transition
- Hairlines instead of spacing to separate; empty outer columns instead of full-bleed
- One typeface family, hierarchy carried by weight and opacity rather than many sizes
- Saturated accent under 5% of any viewport
- Zero shadows, zero gradients, near-zero corner radius
- Discrete, mechanical motion — no springs, no bounce

## Colors

A three-role model: a deep institutional navy, a cool near-white sheet, and one electric
ultramarine that is spent sparingly. Every value comes from the client brand book
(`docs/references-research.md`); nothing here was invented.

### Primary

- **Signal Ultramarine** (`#011EFF`): the only saturated colour on the page. Fills the
  primary pill button, the top hairline of the document, the fill of the single solid object
  inside a diagram, and small state indicators. Never used for body text, never as a
  background field, never on a dark surface as text.
- **Quiet Ultramarine** (`#8091FF`): the accent's only permitted text form, and only on ink
  zones. Ultramarine/400 was the brand book's nomination but lands at 4.49:1 on navy — one
  hundredth under AA for an 11px marker — so the system steps up to ultramarine/300.

### Neutral

- **Deep Navy Ink** (`#00073C`): the base of every dark zone — hero, solutions, the AI band,
  the final call to action, the footer. Chosen over pure black deliberately: black plus
  electric ultramarine drifts into crypto-cyber, navy reads as a bank.
- **Cool Paper** (`#F9FAFB`): the base of every light zone. Not pure white — white is
  reserved so that it can mean something.
- **Window White** (`#FFFFFF`): reserved for schematic panels, the "windows into the
  product". It is the only surface allowed to be pure white, which is why a schematic placed
  on an ink zone reads as a lit panel rather than a card.
- **Ink Heading** (`#000F7D`) for headings on paper; **Body Slate** (`#374151`) for body
  text on paper; **Muted Slate** (`#6B7280`) for captions and markers on paper.
- **Hairline Light** (`#E5E7EB`) and **Hairline Dark** (`rgb(255 255 255 / 0.10)`): the
  construction lines. Barely visible by design — legible as structure, never as decoration.
  Their strong step (`#D1D5DB` on paper, `rgb(255 255 255 / 0.42)` on ink) is not decoration
  either: it is the boundary of a control — an input underline, a quiet button — and so it
  stays at or above 3:1 against its ground.
- On ink zones text works in layers of transparency: white for headings, `#E5E7EB` for body,
  `#9CA3AF` for muted, and the hairline nearly dissolving into the ground.

### Named Rules

**The Five Percent Rule.** Ultramarine covers less than 5% of any viewport. If a screenshot
of the page shows more, an element is wrong, not the rule.

**The White Means Window Rule.** Pure white is never a page background. It appears only
inside a schematic panel, so white always signals "this is the product, seen through glass".

**The No Accent Text Rule.** `#011EFF` and darker ultramarine steps are never text on ink —
the contrast falls to about 2.5:1. On dark, the accent exists as fill, line and indicator only.

## Typography

**Display Font:** e-Ukraine Head (fallback: system-ui, sans-serif)
**Body Font:** e-Ukraine (fallback: system-ui, sans-serif)

Both are mandated by the client brand book; the WOFF2 builds are self-hosted from
`uapp-site/src/fonts` through `next/font/local`, in three head weights (300/400/500) and two
body weights (400/500). The source OTFs stay in `uapp-site/public/fonts` and do not ship.
There is no monospace in the system — technical character comes from the grid and the
markers, not from a code costume. Numerals are set with `font-variant-numeric: tabular-nums`
wherever they are compared.

**Character:** a geometric grotesque with a wide, calm skeleton. Set very large and very
light it reads as an architectural title block; set at 11px with wide tracking it reads as
a drawing annotation. The whole hierarchy is that one voice at two extremes.

### Hierarchy

- **Display** (300, `clamp(3.25rem, 5.6vw, 5.25rem)`, line-height 0.96, tracking -0.035em):
  the hero statement and the final call to action. Light weight at large size — mass without
  shouting.
- **Headline** (400, `clamp(2rem, 3.2vw, 3rem)`, line-height 1.06, tracking -0.03em): the
  positioning band and other full-width statements.
- **Title** (400, 2.125rem, line-height 1.12, tracking -0.025em): section headings.
- **Statement** (400, `clamp(1.5rem, 2.1vw, 1.9rem)`, line-height 1.3): the single assertion
  that opens a block — the positioning detail, a product's problem, the AI claim. Bigger than
  body, smaller than a section heading, so a block can have a voice without a second heading.
- **Subtitle** (500, 1.0625rem, line-height 1.35): row and cell titles, set in the body face.
- **Lead** (400, 1.0625rem, line-height 1.65): the hero subheading, the one place body text
  is allowed to be larger.
- **Body** (400, 0.9375rem, line-height 1.7, measure 62–70ch): descriptions, always in the
  muted colour of the zone.
- **Caption** (400, 0.8125rem, line-height 1.5): footer links, the fact line in a case cell,
  form errors — secondary text that must still read comfortably.
- **Label** (500, 0.6875rem, uppercase, tracking 0.14em): region markers, table headers,
  diagram annotations, tab captions.
- **Metric** (300, `clamp(2.25rem, 3.1vw, 3rem)`, tabular-nums, tracking -0.02em): the
  figures in evidence rows. It scales because a fixed 48px pushes a four-glyph value past
  its own dividing rule once the column narrows.

### Named Rules

**The Two Level Rule.** Inside a single block there are only two type levels: one statement
at normal weight and one muted description. A third level means the block is doing two jobs.

**The Sentence Case Rule.** Everything is sentence case — headings, buttons, navigation.
Uppercase exists at exactly one size, 11px, and always with 0.14em tracking. There is no
uppercase in between.

**The Full Stop Rule.** Statement headings end in a period. It makes them read as assertions
rather than slogans. Single-word section headings (Expertise, Solutions) are markers, not
statements, and take no period.

## Layout

A 12-column sheet, maximum width 1440px, with 24px page gutters. The content occupies
columns 3–10; **the outer pairs (1–2 and 11–12) stay empty on purpose** and region markers,
annotations and the schematic's bleed live in them.

Nested grids never use a column gap. A cell separates itself with padding, so every edge in
the page lands exactly on a construction line — which also means a row of N cells only works
when 8 divides by N: two across (4+4) and four across (2+2+2+2) are the system's row shapes,
three across is not.

Six vertical construction lines are drawn at every second column boundary and run the full
height of every zone, including through empty space. They are painted per zone so they
inherit the zone's hairline colour, but their geometry is identical everywhere, so they read
as continuous from the top of the page to the bottom.

Horizontal hairlines close every zone. A zone never fades into the next one; it ends on a
line. Zone padding is 128px vertical for narrative zones, 96px for supporting ones, and
40–56px for bands (trust row, CTA strip).

Recurring layouts: a two-column row (label left, statement and muted description right) for
argument blocks; a three-across cell grid divided by grid lines rather than gaps, with the
last cell replaced by a call to action; a metrics row split by vertical rules; centred
composition for intro and closing zones, left-aligned for everything that carries content.

One zone type breaks the rhythm on purpose. A **fold zone** — currently the hero — is
budgeted to finish inside one laptop screen, because the evidence it carries is worthless
below the fold: it takes 96px of vertical padding instead of 128px, drops to 64px under
1200px, and separates its last group with a hairline rather than with space. Every other
zone keeps its air.

Desktop-first per the brief. Below 1024px the sheet collapses to a single content column,
the construction lines reduce from six to two, and the empty outer columns give up their
width — the grid thins out rather than disappearing.

**The Line Not Gap Rule.** When two things need separating, draw a hairline before you add
space. Space is what the sheet has left over, not the tool of first resort.

## Elevation & Depth

There are no shadows anywhere in this system, and no blur, glass or gradient. Depth is
carried by three devices: the zone (a hard change of ground colour), the line (a hairline
that says "different region"), and the window (pure white against paper or ink, which reads
as lit because nothing else on the page is that bright).

**The Flat Sheet Rule.** If an element needs to feel raised, it is wrong — give it a rule,
a ground change, or an empty column instead. A drawing has no shadows.

## Shapes

Rectangles with a 2px radius — effectively square, just short of harsh. The single exception
is the primary button, a full pill, and that contrast is the point: the one round thing on a
sheet of right angles is the thing you are meant to press.

Borders are always exactly 1px. Dashed 1px hairlines (`4 4` dash) mark what is projected,
connected or continued — orbits, links, planned regions — and solid hairlines mark what is
built. Corner ticks (9px L-shaped marks at panel corners) frame schematic windows the way
crop marks frame a plate.

## Components

### Buttons

- **Shape:** primary is a full pill (`9999px`); everything else is a 2px rectangle.
- **Primary:** ultramarine fill (`#011EFF`) with white text, 14px/28px padding, identical on
  both zones — the brand book fixes this pair, and the constancy is what makes the accent
  legible as "the action" wherever it appears.
- **Hover / Focus:** hover deepens to `#0116BF` over 180ms; focus-visible draws a 2px ring
  in `--ring` at 3px offset. No lift, no scale, no shadow.
- **Quiet:** a 2px rectangle with a hairline border and no fill, 13px label, used inside
  content ("Explore ISO 20022 Toolkit"), never for the page's main action.

### Cells (in place of cards)

- **Corner Style:** 2px, but the corner is rarely visible — cells are separated by the grid's
  own lines, not by borders of their own.
- **Background:** none. A cell is a region of the sheet, not an object on it.
- **Border:** the shared hairline grid; a cell draws only the line it needs (right, bottom).
- **Internal Padding:** 32px top, 28px sides, 36px bottom — asymmetric, weighted to the base
  so the marker at the top and the statement sit high in the region.
- **Hover:** the cell's own hairline strengthens. Nothing moves, nothing appears.

### Schematic Window

The signature component: a pure-white panel with corner ticks, an 11px caption in the top
gutter, and hairline-ruled content inside. It is how the product is shown — always in the
light theme even when placed in an ink zone, cropped rather than fitted, and always labelled
as a schematic because all client work is under NDA.

### Tabs

Flat: no pill, no background, no container. Labels are two-part — a small uppercase action
above, the object below in the muted colour. Tabs are divided by vertical hairlines and sit
on a horizontal hairline; the active state is a 2px accent underline that **slides** to the
new position over 320ms rather than switching.

### Inputs

A hairline underline only — no box, no fill, no radius. The label sits above in 11px
uppercase. Focus thickens the underline to 2px and colours it accent; the field never glows.
Errors state the problem and the fix in 13px under the field, and the underline turns
`#DC2626`.

### Navigation

11px uppercase with 0.14em tracking, muted at rest, full ink on hover, with a 1px underline
drawn from the left over 180ms. The header is a hairline-bottomed strip with the logo in
column 1, navigation centred, and the pill CTA in column 12 — the two ends of the sheet.

### Metrics Row

Three or four figures split by full-height vertical rules, value in Display Light with
tabular numerals, label beneath in 11px uppercase muted. A metric never gets a card, an icon,
or a percentage sign it did not earn.

**The Shared Baseline Rule.** Values sit on one line whatever their labels do. The row owns
two grid tracks and each cell inherits them through `grid-rows-subgrid`, so a label that
wraps to two lines pushes nothing. `dt` stays before `dd` in the DOM — a screen reader hears
"projects: 170+" — and `row-start` swaps them for the eye. Bottom-aligning the pair with
`flex-col-reverse` is what produced a 32px stagger across four numbers, on the one element
whose whole job is to look precise.

## Do's and Don'ts

### Do:

- **Do** draw the six construction lines in every full zone, including through empty space —
  half the page must show the grid.
- **Do** keep the outer column pairs empty, and put markers and annotations there.
- **Do** split rows two or four across so their edges fall on construction lines.
- **Do** end a zone on a hairline and start the next one on a hard colour change.
- **Do** carry hierarchy with weight and opacity; two levels per block.
- **Do** set every uppercase label at 11px with 0.14em tracking, and nowhere else.
- **Do** use dashed hairlines for what is projected or connected, solid for what is built.
- **Do** keep motion discrete: `cubic-bezier(0.2, 0, 0, 1)`, 180ms for state, 320ms for
  transitions, 700ms for a line drawing itself in. One authored moment per page.
- **Do** label authored interface material as a schematic — client work is under NDA.

### Don't:

- **Don't** add a shadow, gradient, glass surface or radius above 2px (the pill excepted).
- **Don't** let ultramarine exceed 5% of a viewport, become body text, or appear as text on
  an ink zone.
- **Don't** use pure white as a page background — white means "window into the product".
- **Don't** separate things with space when a hairline would do it.
- **Don't** introduce a second typeface, a monospace, or an uppercase size other than 11px.
- **Don't** animate with springs, bounce, scale-up hovers or a repeated per-section entrance.
- **Don't** put an icon-plus-heading-plus-text card grid on the page as its structure; cells
  are regions of the sheet, divided by its lines.
- **Don't** fabricate client names, logos, screenshots, certifications or benchmarks — the
  absence is a fact of the product, not a gap to fill.
