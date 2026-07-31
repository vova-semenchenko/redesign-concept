---
name: animating-svg-for-web
description: Use when building or animating an SVG that ships inside a web page — architecture, flow, sequence or network diagrams, animated hero and explainer graphics, vector illustrations, mascots, animated icon sets — or when turning a static SVG / Figma export into in-page motion. Not for MP4/GIF export, data charts, or UI component micro-interactions.
---

# Animating SVG for the Web

## Overview

**The graphic is a readable document first and an animation second.** The resolved
state is the default state; motion is progressive enhancement layered on top. A
visitor who arrives with JavaScript disabled, with `prefers-reduced-motion: reduce`,
mid-scroll past the trigger, or with a screenshot tool must still see the finished
diagram — never an empty canvas waiting for a timeline.

Two artifact kinds, one pipeline:

| Kind | Elements | What motion carries |
|---|---|---|
| **Diagram** | nodes, edges, regions, labels | causality — what happens, in what order |
| **Illustration** | scene, character, objects | life — breathing, drift, parallax, reveal |

A diagram is choreographed once and resolves. An illustration resolves and then idles.

## When to Use

- "animate this diagram", "animated architecture / payment-flow / sequence diagram"
- an explainer graphic that has to teach a sequence on a landing page
- a hero illustration, mascot, or icon set that should feel alive
- a static SVG or Figma export that needs in-page motion
- **Not** for: video/GIF deliverables (that is a render pipeline, not this skill);
  data charts (use `dataviz`); UI component motion — buttons, sheets, popovers,
  page transitions (use `emil-design-eng`, review with `review-animations`).

Naming an effect you can't name: `animation-vocabulary`. Finding *where* motion is
missing: `find-animation-opportunities`.

## Should This Animate At All?

Answer before anything else — how often will the same person see this graphic?

| Frequency | Decision |
|---|---|
| Landing page, launch post, docs page read once | full arc |
| Marketing page a returning visitor sees weekly | shorter arc, no idle loop |
| In-product diagram opened tens of times a day | static; motion only on hover/tap, ≤300 ms |
| A view opened hundreds of times a day, or reached by keyboard | no animation at all |

Then name the purpose in one sentence. Valid purposes here: **explanation** (the motion
teaches the order), **state indication**, **preventing a jarring appearance**. "It looks
cool" on a graphic people see daily is not a purpose — ship it static.

If the order the elements enter in is arbitrary, there is no story to tell: cut the
motion and ship the static graphic. It will communicate more.

## Workflow

1. **Classify** — kind (diagram / illustration), frequency + purpose (above), canvas +
   aspect, arc length, trigger (in-view once / hover / scroll-scrubbed / idle), budget.
2. **Author the SVG against the semantic contract** — [references/svg-contract.md](references/svg-contract.md).
   Existing SVG or Figma export: normalize it to the contract *before* animating.
   Dense graph (≥10 nodes): lay out with Graphviz / Mermaid / ELK first, then rewrite
   the output to the contract — never animate generator output as-is.
3. **Pick the lowest rung of the motion ladder that works** (below).
4. **Choreograph the five acts** — [references/choreography.md](references/choreography.md):
   the narrative arc, timing and easing tables, per-diagram-type patterns, idle loops.
5. **Verify at frozen timestamps** — [references/verification.md](references/verification.md).
   You have not seen the animation until you have seen its frames.
6. **Deliver** — component + reduced-motion path + resolved default state. Report the
   arc length, the trigger, and the payload delta.

Working in an **isometric / axonometric line-art system** (single projection angle, uniform
hairlines, dashed technical guides, floor grid, exploded views, one filled accent)? Read
[references/isometric-line-art.md](references/isometric-line-art.md) before step 2 — it
supplies the axis math and overrides four rules that would otherwise break the projection.

Copy-paste recipes for every step: [references/techniques.md](references/techniques.md).
Complete working reference implementation: [example/FlowDiagram.tsx](example/FlowDiagram.tsx)
+ [example/flow-diagram.css](example/flow-diagram.css).

## Motion Layer Ladder

Take the lowest rung that does the job. Each rung up costs payload and complexity you
must be able to defend out loud.

| Rung | Use when | Cost |
|---|---|---|
| **CSS keyframes + IntersectionObserver** | entrances, edge draw-on, pulses, idle loops — ~90% of diagrams and illustrations | 0 kb |
| **CSS transitions** | anything the user triggers repeatedly (hover, tap, toggle) — interruptible and retargetable, unlike keyframes | 0 kb |
| **Web Animations API** | you need JS control: dynamic sequencing, replay, offscreen pause, scrub, timeline read-out | 0 kb |
| **`motion` / framer-motion** | already in the project *and* motion is state-driven, interruptible, or shared-element | ~15–30 kb |
| **GSAP (+ plugins)** | genuinely needs a scrubbable master timeline, MotionPath along arbitrary paths, or shape morphing | ~70 kb — justify explicitly |

Rung 1 is not a compromise: CSS animations run off the main thread, so they stay smooth
while the page is still loading — exactly when a diagram animates. A JS timeline runs on
`requestAnimationFrame` and drops frames under that load. (`motion`'s `x`/`y`/`scale`
shorthands are not hardware-accelerated either; pass a full `transform` string.)

Rejected by default: Lottie / After Effects JSON, animated GIF, autoplaying video.
They cannot inherit design tokens, break in dark mode, and cost 10–100× the bytes of
the same motion in SVG. Use Lottie only when a designer hands you an AE file that
cannot be rebuilt.

## Hard Rules

1. **Resolved state is the default.** Animation classes and keyframes only apply after
   the trigger fires. No trigger → finished diagram. Never `opacity: 0` in the base
   style without a no-JS / reduced-motion path that restores it.
2. **Tokens only.** Colors come from CSS variables or `currentColor`; no hex literals,
   no hardcoded `font-family`. The graphic must survive a theme switch. When the light and
   dark variants differ *structurally* — solid fill becoming diagonal hatching, entities
   gaining muted colors — a token cannot carry that: ship both layers and toggle them by
   theme (see [references/isometric-line-art.md](references/isometric-line-art.md) §7).
3. **Animate `transform`, `opacity`, `stroke-dashoffset`, `offset-distance` only.**
   Never animate `x`/`y`/`cx`/`width`/`viewBox`/`filter` in a loop. In a system with one
   uniform stroke weight, `scale()` is off the table too — it changes apparent stroke
   width. Enter with opacity plus translation, and put `vector-effect="non-scaling-stroke"`
   on every stroked element.
4. **`transform-box: fill-box` + explicit `transform-origin` on every scaled or rotated
   SVG child.** Without it the origin is the SVG viewport corner and the element flies
   off. This is the single most common SVG animation bug.
5. **Never CSS-transform an element that carries a layout `transform` attribute** — CSS
   *replaces* the attribute, it does not compose. Animate an inner `<g>`.
6. **`prefers-reduced-motion: reduce` → gentler, not gone.** Movement, draw-on and loops
   are removed; a single 200 ms opacity cross-fade of the whole graphic stays, because
   opacity aids comprehension and doesn't cause motion sickness. A reduced-motion path
   that hides content is a bug.
7. **Arrowheads are separate elements, never `marker-end`** — a marker cannot pop after
   its line finishes drawing, and it inherits stroke state you don't want.
8. **Bounded loops, gated playback.** Idle loops start only after the arc resolves and
   pause when offscreen or the tab is hidden. Nothing large loops forever in view.
9. **Unique ids per instance.** Every `<defs>` id (gradient, clip, filter, mask) is
   prefixed with `useId()` or equivalent. Two instances on one page sharing a gradient
   id silently clobber each other.
10. **Legible at rest.** Labels ≥12px effective size after all scaling; add
    `vector-effect="non-scaling-stroke"` to anything inside a zooming group.
11. **Interactive states are UI, not choreography.** Hover/tap/toggle use CSS
    *transitions* (interruptible), stay ≤300 ms, snap back faster than they enter, and
    sit behind `@media (hover: hover) and (pointer: fine)`. Keyboard-driven state changes
    get no animation.

## Timing Budget

The arc is explanatory motion, so the "UI stays under 300 ms" rule does not bind it — the
motion *is* the content. It does bind everything the user triggers (rule 11).

| Thing | Value |
|---|---|
| Element entrance | 320–420 ms |
| Stagger between siblings | 50–80 ms (≥10 elements → 40 ms) |
| Edge draw-on | 350–700 ms, proportional to length |
| Arrowhead pop | 120–160 ms |
| Flow pulse | 900–1400 ms per traversal |
| **Full diagram arc** | **≤6 s**, hold ≥800 ms at the end |
| Illustration idle loop | 3–8 s per cycle, phases offset so nothing syncs |

Nobody waits 6 s to read a page. The arc is for the visitor who chooses to watch it;
everyone else gets the resolved diagram.

## Quality Gate

Fails any one of these → not done:

- [ ] Frame 0, mid-arc, and final frame each screenshot-verified and each legible.
- [ ] Entrance order tells the real story (flow order, never DOM order by accident).
- [ ] Edges draw source → destination; the arrowhead lands as the draw completes.
- [ ] Frames also reviewed in slow motion (0.2× `playbackRate`) — timing bugs are
      invisible at full speed.
- [ ] Reduced-motion snapshot shows the complete diagram, cross-faded, nothing moving.
- [ ] Interactive states (hover/tap) use transitions, are ≤300 ms, and are gated behind
      `(hover: hover) and (pointer: fine)`.
- [ ] JS-off / trigger-never-fires snapshot shows the complete diagram.
- [ ] Correct in both themes, and at 1440 px and 375 px width.
- [ ] No layout shift; nothing but compositor work in the frame timeline.
- [ ] Accessible name present (`role="img"` + `<title>`), or `aria-hidden` with the
      same information available as adjacent text.
- [ ] Offscreen and hidden-tab playback confirmed paused.
- [ ] Payload delta reported.

## Common Mistakes

| Mistake | Fix |
|---|---|
| Element scales from the canvas corner | `transform-box: fill-box; transform-origin: center` |
| CSS transform kills node placement | keep layout in an outer `<g transform>`, animate an inner `<g>` |
| `getTotalLength()` JS just to draw a line | `pathLength="1"` + `stroke-dasharray: 1` |
| Second instance on the page loses its gradient | prefix every `defs` id with `useId()` |
| Diagram invisible above the fold on a fast scroll | resolved state must be the base; trigger only *adds* motion |
| Loop keeps running offscreen, fans spin up | IntersectionObserver + `visibilitychange` gating |
| Reduced motion removes the animation *and* the content | reduced motion changes the transition, never the payload |
| Figma export animated as-is | normalize first: layer names, ids, tokens, flattened clips |
| Text inside a scaled group turns to mush | animate a sibling group; keep labels out of scaling transforms |

## Red Flags — Stop

- "I'll check how it looks after committing" → you have not seen the frames.
- "Reduced motion can just skip the reveal" → then the reveal was hiding content.
- "GSAP is easier" for a fade-and-stagger job → rung 1 does it for 0 kb.
- "The ids are fine, it's only used once" → components get reused.
- "The label still kind of reads at that scale" → measure it: ≥12px.
- "It's a hero, it should loop forever" → bounded, gated, or it's a battery bug.
- "It's an internal dashboard, but an animated diagram would be nice" → they open it
  daily; the arc becomes a tax they pay every time.
- "It felt right when I built it" → look again the next day, and in slow motion.
