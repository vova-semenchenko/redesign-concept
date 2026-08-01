---
name: UAPP
description: An engineering drawing of a payment system, rendered as a marketing page.
colors:
  signal-ultramarine: "#011EFF"
  signal-ultramarine-pressed: "#0116BF"
  signal-ultramarine-dark-band: "#546BFF"
  drafting-ink: "#000F7D"
  graphite: "#374151"
  graphite-muted: "#6B7280"
  hairline: "#E5E7EB"
  paper: "#FFFFFF"
  paper-quiet: "#F9FAFB"
  engine-room: "#00073C"
  hairline-dark: "#1F2937"
  graphite-inverted: "#E5E7EB"
  graphite-inverted-muted: "#9CA3AF"
typography:
  display:
    fontFamily: "e-Ukraine Head, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2.75rem, 6vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "e-Ukraine Head, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.75rem, 3vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "e-Ukraine Head, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "e-Ukraine, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  label:
    fontFamily: "e-Ukraine, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.08em"
  figure:
    fontFamily: "e-Ukraine Head, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
rounded:
  none: "0"
  chip: "2px"
  pill: "9999px"
spacing:
  hair: "4px"
  tight: "8px"
  step: "16px"
  block: "32px"
  zone: "64px"
  band: "120px"
components:
  button-primary:
    backgroundColor: "{colors.signal-ultramarine}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.signal-ultramarine-pressed}"
    textColor: "{colors.paper}"
  button-quiet:
    textColor: "{colors.graphite}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "32px"
  input:
    textColor: "{colors.graphite}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 0"
  chip-index:
    backgroundColor: "{colors.drafting-ink}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.chip}"
    padding: "2px 6px"
---

# Design System: UAPP

<!-- Colors and type families are client mandate (docs/concept-research.md §1–4) and are not
     open for redesign. Layout, shapes, components and the illustration system are the
     designer's world, pinned by the user. Values marked provisional settle on first build. -->

## Overview

**Creative North Star: "The Drafting Table"**

The page reads as a technical drawing of a payment system, not as a brochure about one. Every decorative element earns its place by pretending to be functional: the column grid is visible, sections are closed by hairlines rather than by padding, diagrams carry leader lines and node labels, and construction guides stay on the sheet instead of being cleaned off before printing. Restraint is the argument — an audience that runs regulated money reads calm precision as competence and reads enthusiasm as risk.

Depth comes from atmosphere, not from elevation. The page alternates full-bleed bands between a deep **engine room** and a quiet **paper** surface, and that alternation — not shadow, not card stacking — is what creates rhythm and hierarchy at page scale. Inside a band, density stays low and vertical space is generous: one idea per band, whitespace as a status signal.

The strongest identity carrier is the illustration system: a single isometric projection shared by every object on the site, from a full hero schematic down to a 16px icon. Consistency of projection is what makes separate drawings read as one system, and it is the rule most easily lost and hardest to recover.

Confirmed rejections: gradients, glassmorphism, soft shadows, blob shapes, bold-weight display type, Title Case headlines, stock 3D, character illustration, auto-advancing carousels, and any neon or cyber register.

**Key Characteristics:**

- Exposed structure — visible column rules, dashed construction lines, section hairlines
- Dual-atmosphere band pacing between a dark engine room and a light paper surface
- Extreme type-scale contrast: oversized display against 11px annotation, middle sizes rare
- One saturated accent, defended by scarcity
- A single isometric projection across every drawn object, large or small
- Flat by conviction: no shadows anywhere, depth carried by tone and line

## Colors

A near-monochrome system of two neutral worlds and exactly one saturated voice.

### Primary

- **Signal Ultramarine** (`{colors.signal-ultramarine}`): the single saturated hue. Reserved for the filled face of the one solid illustration object per composition, the primary button, small live indicators inside diagrams, and rare UI marks such as a flagship tag. Never a background for a content region, never a color for running text.
- **Signal Ultramarine (pressed)** (`{colors.signal-ultramarine-pressed}`): pressed and hover state of the filled button only.
- **Signal Ultramarine (dark band)** (`{colors.signal-ultramarine-dark-band}`): the only accent step permitted as *text* on the engine-room surface, and only at display or label size. Its contrast on that ground sits at roughly 4.5:1, which is the floor, not a comfort margin.

### Neutral

- **Drafting Ink** (`{colors.drafting-ink}`): headings on the paper surface. Reads as ink rather than as black, which is what keeps the light bands from going stark.
- **Graphite** (`{colors.graphite}`) and **Graphite Muted** (`{colors.graphite-muted}`): body copy and captions on paper. Hierarchy inside a band is built by dropping contrast, not by changing hue.
- **Hairline** (`{colors.hairline}`): every rule, divider, column line and card border on the paper surface. This token does more structural work than any other in the system.
- **Paper** (`{colors.paper}`) and **Paper Quiet** (`{colors.paper-quiet}`): the two light grounds. `paper-quiet` distinguishes a subdued light band from a primary one.
- **Engine Room** (`{colors.engine-room}`): the dark band ground. It is a deep navy, not black — black plus electric ultramarine drifts straight into the crypto register the brief rules out.
- **Graphite Inverted** / **Graphite Inverted Muted** / **Hairline Dark** (`{colors.graphite-inverted}`, `{colors.graphite-inverted-muted}`, `{colors.hairline-dark}`): the mirrored text and rule ladder on the engine-room ground.

### Named Rules

**The Scarcity Rule.** If the accent appears more than once per viewport, it is overused. Target under 5% of screen area. Its rarity is the entire mechanism by which it reads as a signal.

**The Never-Text Rule.** The accent and every step darker than it are never used as text on the dark ground — contrast collapses to roughly 2.4–2.6:1. On dark bands the accent exists as fill, line, or graphic mass only; text stays on the white-to-graphite ladder. Mirrored on paper: `graphite-muted` is the lightest permissible text, and anything lighter is border or decoration.

**The Button-Does-Not-Invert Rule.** The filled button keeps the same accent ground and white label on both surfaces. This is a deliberate departure from the reference language, where the primary pill inverts per band; the brand mandate fixes this pair and it wins.

**The Two-Grounds Rule.** There are exactly two neutral worlds. The reference language asks for a *warm* off-white; the mandated palette contains no warm neutral (the client excluded the secondary hues outright), so the quiet light band is the cool `paper-quiet` and the base light band stays pure `paper`. Do not invent a warm tint to close this gap.

## Typography

**Display / Headline / Title / Figure:** e-Ukraine Head
**Body / Label:** e-Ukraine
**Mono:** none — tabular figures come from the body face, not from a second family.

**Character:** one geometric grotesque across the entire site. Personality comes from scale and spacing, never from mixing families. The pairing is the client's mandate; what the world contributes is how far apart the sizes are allowed to sit.

Both families are loaded and self-hosted through `next/font/local` in `src/app/layout.tsx`, which also generates the metric-adjusted fallback that keeps the swap from shifting layout. Only the two cuts this system uses are shipped — Regular (400) and Medium (500) per family, 168 KB of woff2 in total. The remaining supplied cuts (UltraLight, Thin, Light, Bold) are deliberately not bundled; adding one is a system decision, not a local override.

> **Still to verify:** the size, line-height and tracking values below were set against the system fallback and have not yet been re-tuned against the real faces on screen. Expect adjustment at the display end during the first build.

### Hierarchy

- **Display** (400, `clamp(2.75rem, 6vw, 5.5rem)`, 0.95): band-opening statements and the first-viewport headline. Regular-to-medium weight at enormous size — never bold.
- **Headline** (400, `clamp(1.75rem, 3vw, 2.75rem)`, 1.05): section openers inside a band.
- **Title** (500, 1.125rem, 1.3): the short bold term on the left of a definition row; card labels.
- **Figure** (400, `clamp(2rem, 4vw, 3.5rem)`, 1): statistics typeset as display material, with tabular figures and arrow glyphs for transformations.
- **Body** (400, 0.9375rem, 1.65): small, muted, generously leaded, and rarely wider than 60ch.
- **Label** (500, 0.6875rem, tracking 0.08em, uppercase): the engineering-annotation layer — diagram tags, stat captions, section numbers, nav eyebrows, quiet button text.

### Named Rules

**The Missing-Middle Rule.** Hierarchy is made from the gap between display and label. The sizes between them are used sparingly and never stacked three deep in one band; if a layout needs a fourth intermediate size, the layout is wrong.

**The Sentence-Case Rule.** Headlines are sentence case. Title Case and ALL CAPS never appear in display or headline roles; uppercase belongs to the label role alone.

**The Full-Stop Rule.** Large headings end in a period. It is a statement marker, and it is added by the heading component's markup, never by editing mandated copy.

## Layout

The grid is a visible material, not a service layer.

- **Column rules.** A 12-column grid runs vertically through every band, including through empty regions. Rules are drawn at the faintest legible contrast; every third is dashed to read as a construction guide rather than as a table border.
- **Empty outer columns.** The leftmost and rightmost columns stay empty as a page margin. Content never bleeds into them except for deliberate full-bleed illustration.
- **Bands, not sections.** The page is a sequence of full-width horizontal bands, each self-contained and each closed by a hairline. A band ends because a line says so, not because padding ran out. Dark and light alternate; two adjacent bands never share a ground.
- **Definition rows.** The primary content pattern: a short title term on the left, an explanatory paragraph on the right, a hairline between rows. It reads as a spec sheet.
- **Card grids.** Equal-height flat cells separated by grid lines rather than gaps. The final cell may break the pattern to carry a call to action.
- **Chapter breaks.** A band holding nothing but one huge centered display line, used to separate major movements of the page.
- **Sticky rail.** Inside long dark product passages, a left rail lists the entries with the active one marked while content scrolls at the right.
- **Rhythm.** More space above a heading than below it, one spacing rhythm throughout, and a dense passage always earns a quiet one.

> **Provisional:** the spacing scale in the frontmatter is the intended rhythm; exact band padding settles on first build.

### Named Rules

**The Visible-Bones Rule.** The grid must be legible in at least half the bands. If a screenshot of a band cannot be told apart from a generic content page with the type removed, the structure is not exposed enough.

## Elevation & Depth

There are no shadows in this system, at any elevation, in any state. Nothing floats, nothing lifts on hover, nothing carries a glow. Depth is produced by three means only: the tonal step between the two band grounds, hairline borders, and the isometric drawing itself — where hidden edges, dashed standoffs and an isometric floor grid do all the spatial work.

One controlled exception to flatness exists at the composition level: an embedded interface frame may overlap the boundary between two bands, so the frame reads as standing on the stage. The overlap is geometric, produced by position and by the band edge, and it still casts nothing.

### Named Rules

**The No-Shadow Rule.** `box-shadow` does not appear in this codebase. A finding that asks for a shadow to separate two surfaces is asking for the wrong fix; add a hairline or change the ground.

## Shapes

Rectilinear by default. Cards, cells, inputs, tabs, frames and diagram containers are pure rectangles with square corners; the form language belongs to a drawing sheet, and a radius reads as softness the subject cannot afford.

Two exceptions, both deliberate: the primary button is a full pill, which is what makes it the single most obviously interactive object on the page; and index chips carry a 2px radius so a number sitting inside a filled square does not read as a table cell.

Borders are always hairline weight. Strokes in illustration are uniform and non-scaling, so a diagram enlarged to hero size keeps exactly the line weight of a 16px icon.

## Components

### Buttons

- **Shape:** full pill for primary (`{rounded.pill}`); square for everything else (`{rounded.none}`).
- **Primary:** solid accent ground with a white label, identical on both surfaces. Verb-first, short.
- **Hover / Focus:** contrast shift only — the ground moves to the pressed step. No scale, no lift, no shadow. Focus is a visible offset ring on the accent, never removed.
- **Quiet:** no fill, no border, label-sized uppercase with a rule that reveals on hover. For in-content actions such as "Explore…", never for the primary action of a band.

### Cards / Containers

- **Corner Style:** square (`{rounded.none}`).
- **Background:** the band's own ground; cards do not introduce a third surface.
- **Border:** hairline, and preferably shared with the neighbouring cell so the grid reads as ruled rather than as a row of boxes.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Internal Padding:** `{spacing.block}` with the label anchored bottom-left and the icon top-left.

### Inputs / Fields

- **Style:** no box. A field is a baseline rule with the label above it in the label role; the input sits on the rule like a form on a drawing.
- **Focus:** the baseline rule thickens and takes the accent. No glow.
- **Error:** the rule and the message take the error hue; the message states what to fix, never blames.

### Navigation

- **Style:** text-only, label-sized, sentence case, with the primary pill at the right end. Sticky and light; the header is a rule with contents, not a bar with a fill.
- **Active state:** an underline that *travels* between items rather than switching instantly.

### Tabs

Flat text labels divided by vertical hairlines, no capsules and no fills. The active indicator is a moving underline. Each label may carry a two-part form: index number above, name below.

### Statistics

Figure-sized numerals in a row divided by vertical hairlines, caption in the label role beneath. Tabular figures so columns align. Transformations are written as `A → B` and are typeset as headline material rather than as body text.

### Illustration System (signature)

The system's identity lives here. One vocabulary serves icons, diagrams and the hero.

- **One projection.** 2:1 isometric axonometry, identical angle for every object at every scale. Mixing in perspective or flat 2.5D breaks the system; this is the non-negotiable rule.
- **The cube is the atom.** Modules, products and layers are boxes or stacks of boxes. An icon's meaning comes from modifying the cube, not from importing a different symbol. Spheres and orbits appear only as network or global markers.
- **Line art by default.** Uniform non-scaling stroke, no fills, hidden edges drawn so construction stays visible.
- **One filled object per composition.** Exactly one object takes the accent fill with flat lighter and darker faces for volume — no gradients, no soft shading. Everything around it stays wireframe.
- **Annotation layer.** Dashed orbits, hairline leader lines, node dots, and small label chips attached to objects. A drawing without annotation is not finished.
- **Ground.** A faint isometric floor grid on dark bands, with objects standing above it on dashed standoffs. On light bands, planes are indicated by diagonal hatching rather than by solid fill.
- **Icons are miniatures.** Small isometric monoline icons share the projection and stroke weight of the large drawings; they are not a separate flat icon set, and they inherit color from context.

## Do's and Don'ts

### Do:

- **Do** keep one accent and defend its scarcity — under 5% of a viewport, and never behind a content region.
- **Do** draw every object at the same isometric angle and the same stroke weight, from hero schematic to 16px icon.
- **Do** show construction: column rules, dashed guides, leader lines, node labels, section numbers.
- **Do** alternate dark and light bands with a hard hairline edge between them.
- **Do** build hierarchy from the gap between display and label sizes, and from contrast steps, not from a ladder of intermediate sizes.
- **Do** typeset statistics as display material with tabular figures.
- **Do** keep motion mechanical and functional: slow float on hero objects, sequential reveal of annotations, contrast-shift hover. Reduced motion removes it entirely.

### Don't:

- **Don't** use gradients, glass, soft shadows, glow, blob shapes, or radii beyond the pill button and the 2px index chip.
- **Don't** set display or headline type in bold weight or Title Case.
- **Don't** let the accent become a background for a content region or a color for running text.
- **Don't** mix a second type family in, including a monospace for code or figures.
- **Don't** introduce multicolor. The reference language permits playful multi-hue cargo objects on light bands; the client's brand book excludes the secondary hues outright, so variation inside illustration comes from the ultramarine steps and the graphite ladder instead.
- **Don't** build a testimonial slider, a customer photo, or a partner logo wall. No such material exists and none may be fabricated — social proof carries through the mandated figures and the anonymous case entries.
- **Don't** present an invented product screenshot as real. Interface material inside a frame is authored diagram work in this illustration system and is labelled as illustrative.
- **Don't** add photography anywhere. The testimonial context that would license it does not exist on this site.
- **Don't** use theatrical motion: no parallax stacks, no scroll-jacking, no bounce or spring easing, no auto-advancing carousels.
