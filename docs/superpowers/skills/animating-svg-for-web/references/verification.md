# Verification

An animation you have not seen frame by frame is not verified. "It runs without errors"
and "it looked fine when I scrolled past" are not evidence — a diagram whose act 3 draws
an edge backwards, or whose last frame clips a label, passes both of those checks.

The web equivalent of a render pipeline's contact sheet is **freezing every animation at
a chosen timestamp and screenshotting**. It takes one line of JS.

## 1. Freeze at t

`document.getAnimations({ subtree: true })` returns CSS animations, transitions and WAAPI
animations alike. All of them are seekable.

```js
// Paste in DevTools, or run via page.evaluate. t in seconds.
function freezeAt(t) {
  document.getAnimations({ subtree: true }).forEach((a) => {
    a.pause();
    a.currentTime = t * 1000;   // delays are included, so t is timeline-absolute
  });
}
freezeAt(1.8);
```

Two gotchas:

- Animations that have not started yet (still inside `animation-delay`) exist only if the
  element is in the DOM and the animation is *applied*. Add the trigger class first:
  `document.querySelector(".flow-diagram").classList.add("is-playing")`, then freeze.
- `fill: both` / `forwards` is what makes a frozen pre-delay or post-end state render
  correctly. If a frozen frame looks wrong at t=0 or t=end, check the fill mode before
  suspecting the keyframes.

Optional dev hook, gated so it never ships behavior to production:

```tsx
useEffect(() => {
  if (process.env.NODE_ENV === "production") return;
  const t = new URLSearchParams(location.search).get("t");
  if (t == null) return;
  ref.current?.classList.add("is-playing");
  requestAnimationFrame(() => freezeAt(Number(t)));
}, []);
```

Then `/?t=1.8` is a reproducible frame anyone can open, including in a review comment.

## 2. Contact sheet

`scripts/contact-sheet.mjs` in this skill drives a headless browser over a list of
timestamps and writes one PNG per frame:

```bash
node scripts/contact-sheet.mjs \
  --url http://localhost:3000/ \
  --selector ".flow-diagram" \
  --at 0,0.6,1.4,2.4,3.6,5.0,6.0 \
  --out ./.motion-snapshots
```

Requires Playwright (`npx playwright install chromium`). Without it, do the same by hand
in DevTools for at least three timestamps — 0, mid-arc, final — and look at the images.

Then actually read the frames:

| Frame | What must be true |
|---|---|
| **t = 0** | resolved-but-not-yet-animated state is coherent; nothing half-drawn, no orphan arrowhead floating without its line |
| **mid-arc** | visible progression; the edges that have drawn are the ones whose nodes are already in |
| **final** | every node, edge, head, label at full opacity, nothing clipped by the viewBox, arrowheads touching their targets |
| **reduced motion** | complete diagram, identical to final |
| **no-JS** | complete diagram, identical to final |

## 3. Slow motion and frame-by-frame

Frozen frames catch *what*; slow motion catches *how*. Same API:

```js
// quarter speed — the arc plays over 24s instead of 6s
document.getAnimations({ subtree: true }).forEach((a) => (a.playbackRate = 0.25));
```

What only shows up slowed down:

- an arrowhead landing before or after its line, instead of on it
- two properties on one element drifting out of sync (opacity done, transform still going)
- a wrong `transform-origin` — the element visibly drifts sideways as it scales
- easing that starts or stops abruptly instead of settling
- the loop seam: a pulse teleporting at 100% → 0%

Then step the same arc frame by frame in the DevTools Animations panel; it also lists
every animation with its delay and duration, which is the fastest way to spot a stagger
formula that produced a delay you didn't intend.

Last: **look at it again the next day.** Fresh eyes catch timing you stopped seeing after
the twentieth replay. This is not optional politeness — it is the cheapest review pass
available.

## 4. The rest of the matrix

```bash
# reduced motion
npx playwright screenshot --url http://localhost:3000/ \
  --reduced-motion=reduce out-rm.png

# JS disabled (trigger never fires)
# Chrome DevTools → Cmd+Shift+P → "Disable JavaScript" → reload → screenshot
```

- **Themes:** both. Gradients and `currentColor` inheritance are where diagrams break. If
  a variant differs structurally rather than by color — a light-zone hatching layer, a
  second entity palette — it needs its own set of frames, not a spot check.
- **Geometry invariants:** in a system with a fixed construction (isometric axes, a grid
  module, a fixed stroke weight), verify the *rule*, not just the render: every transform
  in the file comes from the sanctioned set. See
  [isometric-line-art.md](isometric-line-art.md) §9 for that checklist.
- **Widths:** 1440 and 375. At 375 a 960-unit viewBox scales to 0.39× — recompute the
  ≥12px label floor and check nothing collides.
- **Layout shift:** the SVG has `viewBox` + CSS sizing, so CLS should be 0. Verify in
  Lighthouse or the Performance panel; a nonzero value means a missing aspect ratio.
- **Frame cost:** Performance panel, record the arc. Expect compositor-only work. Purple
  "Layout" or "Recalculate style" bars during the arc mean you animated a geometry
  property — go back to hard rule 3.
- **Loop gating:** scroll the diagram out of view and switch tabs, then confirm in the
  Performance panel (or Animations panel) that nothing is still ticking.
- **Accessible name:** the diagram exposes a name and (if informative) a description;
  DevTools → Accessibility pane. Decorative graphics must be `aria-hidden` *and* have
  their content available as text nearby.
- **Interactive states:** hover a node with the pointer, then on a touch device (or with
  device emulation) confirm the hover state does not stick after a tap. Enter a hover and
  leave it mid-animation — it must retarget, not restart.

## 5. Report

State, in the delivery message: arc length, trigger, the timestamps you verified, the
reduced-motion and no-JS results, and the payload delta (`0 kb` when you stayed on rung
1 — say so, it's a feature). If you skipped part of the matrix, say which part and why;
an unverified claim of "verified" is worse than an honest gap.
