# The Semantic SVG Contract

An SVG you can animate is not the same file as an SVG that merely looks right.
Motion needs named handles, one transform channel per element, and tokenized paint.
Normalize *before* choreographing — retrofitting the contract onto a live timeline is
where hours disappear.

## 1. Root element

```html
<svg
  viewBox="0 0 960 540"                    <!-- required: no width/height attrs -->
  role="img"                                <!-- informative graphic -->
  aria-labelledby="pf-title pf-desc"
  class="flow-diagram"
  preserveAspectRatio="xMidYMid meet"
>
  <title id="pf-title">Card payment authorization flow</title>
  <desc id="pf-desc">Merchant sends an authorization request through the gateway to
  the issuer; the issuer responds, then settlement runs in batch.</desc>
```

- Size in CSS (`width: 100%; height: auto`), never in attributes — otherwise it can't
  be responsive and can cause layout shift.
- Purely decorative graphic → `aria-hidden="true"` + `focusable="false"`, and the
  information must exist as adjacent text. An informative diagram may not be hidden.
- `<desc>` is where the *content* of the diagram lives for a screen reader. Write it as
  a sentence a person would say, not a node list.

## 2. Layer order

Paint order is document order. Fix it once, in this sequence:

```
<defs>            gradients, clips, filters, symbols — all ids prefixed
#bg               plate, grid, backdrop wash
#regions          zones / swimlanes / boundaries (bank, PSP, blockchain…)
#edges            connectors — lines only
#heads            arrowheads, as separate elements
#nodes            boxes, icons, chips
#labels           all text, on top and never inside a scaling group
#overlay          pulses, highlights, focus rings, HUD
```

Two consequences worth stating: edges never cover nodes, and labels never get scaled
by a node transform.

## 3. Naming: data attributes, not ids

Style and select by `class` + `data-*`. Reserve ids for `<defs>` references only.

```html
<g class="region" data-region="issuer">…</g>

<g class="node" data-node="gateway">
  <g class="node__box">…</g>          <!-- the animated inner wrapper -->
</g>

<path class="edge" data-edge="gateway→issuer"
      data-from="gateway" data-to="issuer" pathLength="1" d="M320 270H520" />
<path class="edge__head" data-head="gateway→issuer" d="M520 270l-10-6v12z" />
```

Why not ids: ids must be unique per *document*, and a React component is instantiated
many times per document. `data-node` survives reuse, reads in DevTools, and gives the
choreography a vocabulary (`[data-node="gateway"]`) that matches the domain.

**Ordering handle.** Give each element its narrative index inline so CSS can stagger
without a JS loop:

```html
<g class="node" data-node="merchant" style="--i: 0">
<g class="node" data-node="gateway"  style="--i: 1">
```

The index is *flow order*, not DOM order — and DOM order should match it, so the
document reads like the story too.

## 4. One transform channel per element

SVG has a `transform` attribute; CSS has a `transform` property. **CSS wins and
replaces the attribute entirely** — it does not compose. So:

```html
<!-- layout lives on the outer g; CSS must never touch it -->
<g class="node" data-node="gateway" transform="translate(320 210)">
  <!-- animation lives on the inner g -->
  <g class="node__box">
    <rect width="160" height="88" rx="12" />
  </g>
</g>
```

And every animated child needs its own origin, or it pivots around the SVG viewport's
top-left corner:

```css
.node__box,
.edge__head,
.pulse {
  transform-box: fill-box;
  transform-origin: center;
}
```

`transform-box: fill-box` makes `transform-origin: center` mean "center of this shape".
It is the fix for ~80% of "why did my icon fly off the canvas" bugs.

## 5. Edges: `pathLength="1"`

Set `pathLength="1"` on every drawable path. The browser then treats the path as one
unit long, so draw-on needs no `getTotalLength()` and no JS at all:

```css
.edge {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;   /* fully hidden */
  vector-effect: non-scaling-stroke;
}
.is-playing .edge { animation: edge-draw 520ms var(--ease-in-out) forwards; }
@keyframes edge-draw { to { stroke-dashoffset: 0; } }
```

Edges must be drawn in the direction the data flows: the path's `d` starts at the
source. A path authored backwards animates backwards, and nobody can tell you why the
diagram feels wrong.

Arrowheads are separate `.edge__head` elements so they can pop *after* the line lands.
`marker-end` cannot be independently animated — that's the whole reason for the rule.

## 6. Paint: tokens and `currentColor`

```css
.flow-diagram {
  color: var(--color-ink);                    /* currentColor for strokes/text */
  --diagram-accent: var(--color-accent);
  --diagram-surface: var(--color-surface-2);
}
.node__box rect { fill: var(--diagram-surface); stroke: currentColor; }
.node--flagship .node__box rect { stroke: var(--diagram-accent); }
```

- No hex literals anywhere in the markup. Strip `fill="#111"` from exports.
- Strokes: `currentColor` where the color is "the text color here", a token otherwise.
- One local alias layer (`--diagram-*`) keeps the component themeable without touching
  the global token names in twenty places.
- Gradients inherit nothing — if a gradient is unavoidable, define its stops from
  tokens via `stop-color="var(--…)"` and check both themes.

## 7. Text

```html
<text class="label" x="400" y="256" text-anchor="middle">Gateway</text>
```

- Labels live in `#labels`, never inside an animated or scaled group.
- Minimum **12px effective** size — i.e. after the `viewBox`-to-CSS scale factor. A
  16px label in a 960-wide viewBox rendered at 480 px is 8px on screen. Compute it.
- No `textLength`, no letter-spacing tricks to force fit; shorten the copy instead.
- Multi-line: separate `<text>` elements or `<tspan dy>`; SVG has no wrapping.
- Font from a token (`font-family: var(--font-sans)`), and check the label still fits
  when the webfont fails to load.

## 8. Normalizing an existing SVG or Figma export

Order matters — do these before writing a single keyframe:

1. **Rename layers in Figma first.** `node/gateway`, `edge/gateway-issuer`,
   `region/issuer`. Export with "Include id attribute"; you get names you can map
   mechanically instead of guessing at `Group 47`.
2. **Flatten decorative nesting.** Exports wrap everything in `<g clip-path>` chains;
   each one is a transform channel that will fight your animation. Keep the groups that
   carry meaning, drop the rest.
3. **Strip presentation attributes** (`fill`, `stroke`, `font-family`, `style`) and
   re-apply as classes + tokens.
4. **Add `data-*` handles, `--i` order, and `pathLength="1"`.**
5. **Split arrowheads** out of the edge paths.
6. **Run SVGO with `cleanupIds: false`** (and keep `data-*`), then diff the render.
7. **Report** what the export claimed vs. what the diagram actually shows — exports
   routinely lose dashes, gradients, and text baselines.

## 9. Dense graphs (≥10 nodes)

Hand-authoring coordinates stops scaling around ten nodes. Generate the *layout*, then
rewrite it to the contract:

```bash
# Graphviz for hierarchies / dependency graphs
dot -Tsvg flow.dot -o layout.svg
# Mermaid for sequence diagrams
npx @mermaid-js/mermaid-cli -i seq.mmd -o layout.svg
```

Keep the coordinates, discard the generator's markup: its ids are unstable, its groups
carry transforms, its styling is inline. And before you animate 20 nodes, ask whether
the page needs 20 — an unreadable diagram animates into an unreadable diagram.

## 10. React / Next.js specifics

```tsx
import { useId } from "react";

export function FlowDiagram() {
  const uid = useId();                       // ":r1:" — unique per instance
  const glow = `${uid}-glow`;
  return (
    <svg viewBox="0 0 960 540" role="img" aria-labelledby={`${uid}-t`}>
      <title id={`${uid}-t`}>Card payment authorization flow</title>
      <defs>
        <filter id={glow}>…</filter>
      </defs>
      <g filter={`url(#${glow})`}>…</g>
    </svg>
  );
}
```

- **Every `defs` id gets the `useId()` prefix**, and every reference uses the same
  variable. Duplicated ids across instances is a silent, layout-dependent bug.
- Inline the SVG as JSX (a `<img src="x.svg">` cannot be animated or tokenized).
- No `Math.random()` / `Date.now()` in render — hydration mismatch. Deterministic
  variation comes from the element index.
- Keep the SVG in a Server Component; only the trigger hook needs `"use client"`.
- Large diagram used once, below the fold → `next/dynamic` the client wrapper, but the
  markup itself stays server-rendered so the resolved state is in the HTML.
