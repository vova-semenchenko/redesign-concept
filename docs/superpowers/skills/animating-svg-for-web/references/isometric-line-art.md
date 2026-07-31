# Isometric Line-Art Systems

For illustration systems built on a single axonometric angle, uniform hairline strokes,
abstract primitives (cubes, slabs, wireframe spheres, nodes), dashed technical guides, an
ultra-low-contrast floor grid, and exactly one solid-filled accent object per composition.

Everything in the main skill applies. This file covers what that style adds, and the four
places where the generic rules must bend.

## 1. One projection, one set of numbers

True isometric, axes at 30° from horizontal. Model space (x, y, z) → screen (sx, sy):

```
sx = 0.866 · (x − y)
sy = 0.5   · (x + y) − z
```

So the three unit directions on screen are:

| Axis | Screen vector | Reads as |
|---|---|---|
| **x** | `( 0.866,  0.5)` | into the scene, down-right |
| **y** | `(−0.866,  0.5)` | into the scene, down-left |
| **z** | `( 0, −1)` | up, off the floor |

Everything follows from those three vectors — including motion. A "slide in from the
left" is **not** `translateX`: it is a move along −x or +y.

```css
/* enter along the x axis by --d units */
@keyframes enter-x {
  from { transform: translate(calc(var(--d) * 0.866), calc(var(--d) * 0.5)); opacity: 0; }
  to   { transform: none; opacity: 1; }
}
/* enter along z (the canonical one: the object descends onto its grid position) */
@keyframes enter-z {
  from { transform: translateY(calc(var(--d) * -1px)); opacity: 0; }
  to   { transform: none; opacity: 1; }
}
```

`translateY` is legitimate here and nowhere else in the system: screen-vertical *is* the
z axis. Any other direction must be composed from the table above. A single axis-ignoring
`translateX(-12px)` breaks the projection for the whole page — the eye reads it as a
different scene.

If the system uses 2:1 "pixel" isometry (26.57°) instead, the vectors are `(1, 0.5)` and
`(−1, 0.5)`; substitute once, at the top of the stylesheet, and never mix the two.

## 2. Faces and skewed labels

The three face matrices, for `<g transform="matrix(…)">`:

| Face | Matrix |
|---|---|
| Top (x–y plane) | `matrix(0.866, 0.5, -0.866, 0.5, e, f)` |
| Right (x–z, faces lower-right) | `matrix(0.866, 0.5, 0, 1, e, f)` |
| Left (y–z, faces lower-left) | `matrix(0.866, -0.5, 0, 1, e, f)` |

Only `e`/`f` (the placement) change per instance. If a fourth matrix appears in the file,
something was eyeballed — fix it against this table.

Labels on faces are the one sanctioned exception to "text never lives inside a transformed
group":

- The skew matrix goes on a `<g>` that contains **only text**. That group is never
  animated — animate its parent, so the glyphs keep a stable rasterization.
- Legibility is measured on the *rendered* result, not the `font-size`: the vertical
  squash on top faces costs roughly half the apparent cap height. Measure the smallest
  label on screen at the design width and hold the ≥12px floor.
- Small UPPERCASE at a minimal size needs tracking (`letter-spacing: 0.04–0.08em`) or the
  skew closes the letterforms up.
- Capsule labels and numbered chips attached to leader lines stay **unskewed** — they are
  annotation, not geometry. They appear when their line finishes drawing (the arrowhead
  pattern from `choreography.md`).

## 3. Dashed lines: the draw-on conflict

Dashes are the style's vocabulary for orbits, links and extensions — and
`stroke-dasharray` is also the generic draw-on mechanism. One line cannot use both.

**Rule: a dashed line never carries `pathLength="1"`.** Normalizing the path to one unit
makes `stroke-dasharray: 6 6` mean six *path lengths* — the dashes vanish.

Draw a dashed line on with a **mask** whose stroke does the sweeping:

```html
<defs>
  <!-- id prefixed with useId() in a component -->
  <mask id="reveal-orbit-a" maskUnits="userSpaceOnUse">
    <path class="reveal" pathLength="1" d="M120 300L420 180"
          stroke="#fff" stroke-width="12" fill="none" />
  </mask>
</defs>
<path class="link" d="M120 300L420 180" mask="url(#reveal-orbit-a)" />
```

```css
.link   { fill: none; stroke: currentColor; stroke-width: 1.25; stroke-dasharray: 6 6;
          vector-effect: non-scaling-stroke; }
.reveal { stroke-dasharray: 1; stroke-dashoffset: 1; }
.is-playing .reveal { animation: edge-draw 520ms var(--ease-in-out) forwards; }
```

The mask stroke must be comfortably wider than the visible line (≥8× the stroke width) or
the sweep clips the dash caps. Masks composite, so cap them: a dozen is fine, a hundred is
a paint budget. For a bundle of links that appear together, mask the whole group with one
swept path instead of one mask per line.

**Marching ants** is the idle this vocabulary wants — a live connection, no new elements,
and it animates `stroke-dashoffset`, which is already on the allowed list:

```css
.is-idle .link--live { animation: ants 1.2s linear infinite; }
@keyframes ants { to { stroke-dashoffset: -12; } }   /* one full dash+gap period */
```

The offset delta must equal exactly one `dasharray` period (`6 6` → `12`), or the loop
visibly jumps. Negative offset moves the dashes along the path direction; flip the sign to
reverse the flow. Two or three live links per composition, never all of them.

## 4. Orbits and satellites

A circle of radius `r` on the floor plane projects to an **axis-aligned ellipse with
`rx / ry = √3 ≈ 1.732`** (`rx = 1.2247 r`, `ry = 0.7071 r`). Author the orbit as that
ellipse — anything else reads as a different projection.

```css
.satellite {
  offset-path: path("M-98 0a98 56.6 0 1 0 196 0a98 56.6 0 1 0 -196 0");
  offset-rotate: 0deg;     /* mandatory */
  offset-anchor: center;
  transform-box: fill-box;
}
.is-idle .satellite { animation: orbit 14s linear infinite; }
@keyframes orbit { to { offset-distance: 100%; } }
```

`offset-rotate: auto` (the generic default in `techniques.md` recipe 4) is wrong here: it
spins the satellite and drops it out of the isometric system. A cube keeps its orientation
all the way around the orbit; only a formless pulse may rotate.

**Occlusion.** SVG has no z-index, and a satellite must pass *behind* the central object
on the far half of the orbit. Draw two copies:

```
#objects-back    → satellite copy A (+ the far half of the orbit path)
#object-center   → the central object
#objects-front   → satellite copy B (+ the near half)
```

Both copies run the same orbit animation; each is visible for its half via a stepped
opacity keyframe (`0%–50% { opacity: 1 }` / `50.01%–100% { opacity: 0 }`, mirrored). Any
smooth cross-fade at the crossing point reads as a ghost — use a step.

Same principle for the dashed orbit line itself: split it into a far arc (behind, often at
lower opacity) and a near arc (in front).

## 5. Exploded view as choreography

The signature move of the style maps onto the five acts directly:

| Act | Exploded view |
|---|---|
| Establish | floor grid fades in; the vertical spine/axis draws upward |
| Build | slabs enter along z, **bottom-up**, staggered 60–80 ms — never top-down: the stack has to look like it was assembled |
| Connect | dashed leaders and orbit paths sweep (masked); chips and labels land |
| Flow | the accent object gets its solid fill, or the live link starts marching |
| Resolve | everything holds at the exploded offsets — the exploded state *is* the resolved state |

Two options for the vertical offsets, and you must pick one deliberately:

- **Assemble** — layers arrive at their exploded positions and stay. Explains structure,
  ends at rest. Default.
- **Explode** — layers start collapsed, then separate. Explains disassembly, and its
  resolved state must still be the exploded one (rule 1 of the main skill: no-JS shows the
  finished graphic, so the *base* CSS holds the exploded offsets and the animation starts
  from `translateY(collapsed)`).

Never animate the two directions back and forth in a loop. A breathing stack is the
distraction the amplitude limits exist to prevent.

## 6. The floor grid: do not animate it

Hairlines at 6–10% opacity are the most fragile thing on the page. A transform on them
lands strokes between device pixels and the whole grid shimmers and moirés — worse on
non-integer devicePixelRatio, worst mid-animation.

- **Opacity only.** Fade it in during act 1, then leave it alone.
- No transform, no scale, no parallax on the grid. If the composition needs depth motion,
  move the objects above it instead.
- Author it as a static `<pattern>` (two crossing sets of 30° lines) or a generated group;
  either is fine, but never animate `patternTransform`.
- `vector-effect: non-scaling-stroke` and an effective stroke ≥0.75px, or the grid
  disappears entirely on some displays and looks broken on others.

## 7. Light zones: a layer swap, not a token swap

When the light variant replaces solid fill with diagonal hatching, the two variants differ
in *structure*, so a color token cannot carry the change. Ship both layers and toggle:

```html
<g class="accent">
  <path class="accent__solid" d="…" />
  <path class="accent__hatch" d="…" fill={`url(#${hatch})`} />
</g>
```

```css
.accent__hatch { opacity: 0; }
:root[data-theme="light"] .accent__solid { opacity: 0; }
:root[data-theme="light"] .accent__hatch { opacity: 1; }
```

- **Never animate a pattern fill** — not its transform, not its geometry. Pattern
  repainting is expensive and janks; a drifting hatch also fights the technical-drawing
  register. If a transition between variants is wanted, cross-fade the two layers
  (150–200 ms opacity) and leave the pattern static.
- `currentColor` inside a `<pattern>` resolves against the pattern's own position in the
  tree, **not** the element that references it. Define the pattern inside the same SVG so
  it inherits the root `color`, and verify it in both themes rather than assuming.
- When the light variant introduces several muted entity colors, they are tokens on the
  entity's group — not per-shape literals, and not something the animation touches.

## 8. Stroke width is a constant, so don't scale

The style mandates one uniform hairline. `scale()` changes apparent stroke width, so the
generic `scale(0.97)` entrance quietly violates the visual system.

- `vector-effect="non-scaling-stroke"` on **every** stroked element in the system, not
  just inside camera groups.
- Entrances use **opacity + axis translation**, no scale. That is also the more honest
  read: an isometric object doesn't grow, it arrives.
- Emphasis is dim-the-rest (`opacity: 0.3` on everything else) or the accent fill landing
  — never a scale pulse, which reads as a stroke-weight flicker.
- Wireframe spheres and node graphs are dozens of stroked paths: introduce them with one
  **group fade**, not per-path draw-on. Sweep at most two paths per object, and only the
  ones that describe the silhouette.

## 9. Quality gate additions

On top of the main gate:

- [ ] Every face transform is one of the three canonical matrices; every motion vector is
      composed from the axis table. Grep `matrix(` and `translate(` and check them.
- [ ] Dashed lines carry no `pathLength="1"`; masked reveals confirmed at 0.25× speed.
- [ ] Marching-ants offset equals exactly one dash period (no jump at the loop seam).
- [ ] Satellites keep orientation through a full orbit; the behind/in-front swap is a
      step, verified frame-by-frame at the crossing.
- [ ] Grid: no transform anywhere in its animation; checked at 1× and 2× DPR for shimmer.
- [ ] Light-zone frames captured separately — hatching present, grid still visible,
      pattern colors correct.
- [ ] Smallest skewed label measured on screen ≥12px apparent cap height.
