# Techniques — copy-paste recipes

Rung 1 (CSS + IntersectionObserver) covers almost everything here. Rungs 2–4 appear
only where CSS genuinely cannot do the job.

## 1. Trigger: play once when in view

The gate is a single class on the root. Base styles = resolved diagram; the class adds
motion. That ordering is what makes no-JS safe.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Adds `playing` once the element is 25% visible; never removes it.
 * Note it fires under reduced motion too — CSS decides what motion means there
 * (a 200 ms cross-fade), JS only decides that idle loops never start.
 */
export function useInViewOnce<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlaying(true);
        io.disconnect();               // one-shot: no replay on re-scroll
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, playing };
}
```

```tsx
const { ref, playing } = useInViewOnce<SVGSVGElement>();
<svg ref={ref} className={`flow-diagram ${playing ? "is-playing" : ""}`}>
```

Threshold 0.25 for a full-width diagram; 0.4+ for a small one, so it doesn't play in the
last 3 px of the viewport. Fast scroll past it → no class → resolved diagram. Correct.

## 2. Stagger with one CSS variable

```css
.is-playing .node__box {
  animation: node-in 380ms var(--ease-out) both;
  animation-delay: calc(var(--i) * 70ms + 200ms);
}
```

`style="--i: 3"` in the markup. No JS loop, no per-element class, and reordering the
story is a one-attribute change.

Two constraints on the variable: it is **static per element** (set once in the markup),
and it lives on the animated element, not on an ancestor. Changing a CSS variable on a
parent recalculates styles for every descendant — fine once at mount, a per-frame cost if
you ever animate through it. Per-frame values go straight onto the element's `transform`.

Stagger is decorative: never gate reading or interaction on it finishing. Text beside the
diagram must be readable while the arc plays.

## 3. Draw a line without JS

```html
<path class="edge" pathLength="1" d="M320 270H520" />
```

```css
.edge { stroke-dasharray: 1; stroke-dashoffset: 1; vector-effect: non-scaling-stroke; }
.is-playing .edge { animation: edge-draw 520ms var(--ease-in-out) forwards; }
@keyframes edge-draw { to { stroke-dashoffset: 0; } }
```

`pathLength="1"` normalizes the path to one unit, so dasharray/dashoffset are fractions.
No `getTotalLength()`, no layout read, works on `<line>`, `<polyline>`, `<path>`.

## 4. Pulse traveling a path (CSS motion path)

```css
.pulse {
  offset-path: path("M320 270H520");   /* same d as the edge */
  offset-rotate: auto;                  /* drop for a circle */
  offset-distance: 0%;
  transform-box: fill-box;
}
.is-idle .pulse {
  animation: pulse-travel 1200ms linear infinite;
  animation-delay: var(--phase, 0ms);
}
@keyframes pulse-travel {
  from { offset-distance: 0%;   opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  to   { offset-distance: 100%; opacity: 0; }
}
```

The `d` is duplicated between edge and `offset-path` — keep them adjacent in the file
and generate both from one source when the geometry is computed. Fading at both ends
hides the teleport at loop boundaries.

Alternative when the path is dynamic: WAAPI with `offsetDistance`, or GSAP MotionPath
(rung 4) if you also need alignment to a moving target.

## 5. Scroll-scrubbed reveal (progressive enhancement)

```css
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .scrub .edge {
      animation: edge-draw 1s linear both;
      animation-timeline: view();
      animation-range: entry 25% cover 60%;
    }
  }
}
```

No fallback branch is needed: without support the base (resolved) styles apply. If the
scrub must work everywhere, that's rung 2 (`ScrollTimeline` polyfill) or rung 4 — and it
needs a real justification, because scroll-scrubbing takes control away from the reader.

## 6. Pause when offscreen or the tab is hidden

Required for any `infinite` animation.

```tsx
useEffect(() => {
  const el = ref.current;
  if (!el) return;

  const setIdle = (on: boolean) => el.classList.toggle("is-idle", on);
  let visible = false;

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    setIdle(visible && !document.hidden);
  }, { threshold: 0.1 });
  io.observe(el);

  const onVis = () => setIdle(visible && !document.hidden);
  document.addEventListener("visibilitychange", onVis);
  return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
}, []);
```

`content-visibility: auto` on the wrapper also lets the browser skip offscreen rendering
work — cheap win for a tall page full of diagrams.

## 7. Reduced motion: gentler, not gone

```css
@media (prefers-reduced-motion: reduce) {
  /* 1. reset broadly — a hand-picked list of selectors always leaks one keyframe */
  .flow-diagram *, .flow-diagram *::before, .flow-diagram *::after {
    animation: none !important;
    transition: none !important;
  }
  /* 2. re-add the one gentle thing: the graphic cross-fades in, nothing moves */
  .flow-diagram.is-playing { animation: fade-in 200ms ease both !important; }
}
```

Division of labor: **CSS** decides what motion means (movement out, opacity in), **JS**
decides only that idle loops never start (recipe 6 checks the media query, recipe 1 does
not). Removing the JS guard from the trigger is deliberate — it lets the cross-fade run
and keeps one code path for everyone.

Never let reduced motion remove information. If disabling the animations hides something,
the base styles were doing the hiding.

## 7b. Hover and tap on diagram parts

The arc is choreography; a hovered node is UI, so it follows UI rules.

```css
.node__box {
  transition: transform 180ms var(--ease-out), opacity 180ms var(--ease-out);
}
/* touch devices fire :hover on tap and the state sticks — gate it */
@media (hover: hover) and (pointer: fine) {
  .node:hover .node__box { transform: translateY(-2px); }
  .node:hover ~ .layer-labels .label { opacity: 1; }
}
```

- **Transitions, never keyframes**, for anything the user can trigger repeatedly: a
  transition retargets from the current value, a keyframe restarts from zero.
- **≤300 ms**, and asymmetric — the release snaps back faster than the enter.
- Never animate a state change that a keyboard user triggers dozens of times (stepping
  through a legend, toggling a layer): no animation at all there.

## 8. Replay control (rung 2, WAAPI)

When the design wants a "replay" affordance:

```ts
function replay(root: Element) {
  root.getAnimations({ subtree: true }).forEach((a) => {
    a.cancel();
    a.play();          // restarts with its original delay/fill
  });
}
```

`getAnimations({ subtree: true })` returns CSS animations too — that's why rung 2 rarely
means rewriting the choreography in JS. Keep the CSS keyframes, drive them from JS.

## 9. Camera-lite: focus one part of a big diagram

CSS cannot animate `viewBox`. Transform a camera group instead — and only for diagrams
that genuinely exceed ~8 nodes.

```html
<g id="camera"><!-- everything else lives in here --></g>
```

```ts
/** Zoom+center on a node's bbox, in viewBox units. */
function camFit(camera: SVGGElement, target: SVGGraphicsElement, vb: DOMRect, zoom = 1.4) {
  const b = target.getBBox();
  const cx = b.x + b.width / 2;
  const cy = b.y + b.height / 2;
  const tx = vb.width / 2 - cx * zoom;
  const ty = vb.height / 2 - cy * zoom;
  camera.animate(
    [{ transform: camera.style.transform || "none" },
     { transform: `translate(${tx}px, ${ty}px) scale(${zoom})` }],
    { duration: 700, easing: "cubic-bezier(0.22,1,0.36,1)", fill: "forwards" },
  );
}
```

Camera discipline: max 1.6× zoom, always return home (`translate(0,0) scale(1)`) before
the end hold, `vector-effect="non-scaling-stroke"` on every stroke inside `#camera`, and
labels checked for the ≥12px floor at 1× (they get *smaller* when the camera pulls back).

## 10. Idle loop set for an illustration

```css
.is-idle .float        { animation: float 5.5s var(--ease-idle) infinite alternate; }
.is-idle .float--b     { animation-duration: 7.1s; animation-delay: 1.3s; }
.is-idle .float--c     { animation-duration: 6.3s; animation-delay: 2.9s; }
.is-idle .breathe      { animation: breathe 4s var(--ease-idle) infinite alternate; }
.is-idle .blink        { animation: blink 5.7s steps(1, end) infinite; }

@keyframes float   { to { transform: translateY(-6px); } }
@keyframes breathe { to { transform: scale(1.015); } }
@keyframes blink   { 0%, 96% { transform: scaleY(1); } 98% { transform: scaleY(0.1); } }
```

Every animated selector also needs `transform-box: fill-box; transform-origin: center`
(eye groups: `transform-origin: center` on the eye, or the lid slides sideways).

## 11. When to actually reach for GSAP

Legitimate: a master timeline you scrub from a slider or scroll position; MotionPath with
`align` to a moving element; MorphSVG between two shapes; ≥40 orchestrated steps where
CSS delay arithmetic becomes unmaintainable.

Before you do: a predetermined arc is exactly what CSS animations are best at, because
they run off the main thread. A JS timeline drives `requestAnimationFrame` on the main
thread and drops frames precisely when the page is busy loading — which is when the
diagram animates. Same trap in `motion`/framer-motion: the shorthand `x`/`y`/`scale`
props are not hardware-accelerated; pass a full `transform` string if you use them.

If you take rung 4, keep the discipline the CSS version enforced for free:

```ts
const tl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
tl.from("[data-region]", { opacity: 0, duration: 0.45 })
  .from("[data-node] .node__box", { opacity: 0, y: 8, scale: 0.97, stagger: 0.08 }, 0.2)
  .from(".edge", { drawSVG: "0%", duration: 0.52, stagger: 0.08 }, "-=0.2")
  .from(".edge__head", { opacity: 0, scale: 0.6, duration: 0.14, stagger: 0.08 }, "<0.3");
// play only on trigger, and honor the media query before creating the timeline
```

Load GSAP dynamically (`await import("gsap")`) so it stays out of the initial bundle,
and state the payload cost when you report the work.
