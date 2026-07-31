# Choreography

Motion is the argument the diagram makes about order. If the order is arbitrary, cut
the motion and ship the static graphic — it will communicate more.

## The five acts

Every diagram arc has the same shape. Total ≤6 s.

| Act | What happens | Budget |
|---|---|---|
| **1 Establish** | plate, regions, swimlane titles fade in — the stage, not the actors | 0–500 ms |
| **2 Build** | nodes enter in flow order, staggered | 0.4–2.2 s |
| **3 Connect** | edges draw source → destination, arrowheads pop on landing | 1.2–3.6 s |
| **4 Flow** | pulses travel the happy path; the one element that matters gets emphasis | 3.0–5.0 s |
| **5 Resolve** | everything at rest, full opacity, hold ≥800 ms, then idle loop (or nothing) | 5.0–6.0 s |

Acts overlap — act 3 for the first edge starts while act 2 is still placing the last
node. Sequential acts with hard boundaries read as a slideshow.

**Illustrations** use acts 1, 2 and 5 only: stage, elements in, then a permanent idle.
There is no "connect" and no story order — grouping order is depth order (back to front).

## Easing

Four curves cover everything. Define them as tokens; never use bare `ease`.

```css
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1);      /* entrances, arrowheads, most things */
--ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);     /* on-screen movement: line draw-on */
--ease-idle:   cubic-bezier(0.37, 0, 0.63, 1);      /* loops: symmetric, gentle */
```

Three curves, no fourth. Built-in `ease`/`ease-out` are too weak to read as intentional;
these are the strong variants.

- **Entrances are `ease-out`.** `ease-in` on an entrance delays exactly the moment the
  viewer is watching — a 300 ms `ease-in` *feels* slower than a 300 ms `ease-out`.
- **Draw-on is movement on screen, so `--ease-in-out`.** On a very long path
  (>500 viewBox units) the strong curve can read as a lurch — soften to
  `cubic-bezier(0.65, 0, 0.35, 1)` for that path only, and say why in a comment.
- **There is no pop/back curve.** Overshoot (`cubic-bezier(0.34, 1.56, …)`) reads as
  dated, and on a labeled element the label visibly wobbles. Arrowhead impact comes from
  the short duration (140 ms) and the scale step, on `--ease-out`. A playful illustration
  that genuinely wants bounce is a designer call, kept local to that graphic — never a
  token others inherit.
- **Linear** is correct for exactly one thing: a pulse traveling a path at constant speed.
- **Loops are symmetric in-out** or they look like a stutter.

## Timing

An explanatory graphic is the one place the "UI animations stay under 300 ms" rule does
not apply: the motion *is* the explanation, not feedback on an action the user took.
That exemption covers the arc only — anything the user triggers (hover on a node, a
replay button) is UI and obeys the 300 ms ceiling.

| Element | Duration | Notes |
|---|---|---|
| Region / plate | 400–500 ms | opacity only, no movement |
| Node entrance | 320–420 ms | opacity + `translateY(8px)` + `scale(0.97)` |
| Stagger step | 50–80 ms | ≥10 nodes → 40 ms and group them |
| Edge draw | 350–700 ms | ~1 ms per SVG unit of length, clamped |
| Arrowhead pop | 120–160 ms | `scale(0.8→1)`, starts at draw completion −40 ms |
| Pulse traversal | 900–1400 ms | linear; 2–3 reps then stop, or idle-gated |
| Emphasis (flagship node) | 500 ms | ring scale-out + opacity fade, once |
| End hold | ≥800 ms | nothing moves; this is where the diagram is read |

Never scale entrance movement with element size: a 300-unit region moving 8 px looks
right; moving 40 px looks broken.

## Node entrance — the canonical form

```css
.node__box {
  transform-box: fill-box;
  transform-origin: center;
}
.is-playing .node__box {
  animation: node-in 380ms var(--ease-out) both;
  animation-delay: calc(var(--i) * 70ms + 200ms);   /* 200ms = act 1 */
}
@keyframes node-in {
  from { opacity: 0; transform: translateY(8px) scale(0.97); }
  to   { opacity: 1; transform: none; }
}
```

- Never `scale(0)` → the element inflates from nothing and reads as a cartoon. Start at
  0.94–0.98.
- `both` fill so the pre-delay state is the `from` state and the post state sticks.
- The delay formula is the only place order lives — change `--i`, not the CSS.

## Edge draw + head landing

```css
.is-playing .edge {
  animation: edge-draw var(--edge-dur, 520ms) var(--ease-in-out) both;
  animation-delay: calc(var(--i) * 70ms + 700ms);
}
.is-playing .edge__head {
  animation: head-pop 140ms var(--ease-out) both;
  /* lands 40ms before the line finishes — overlap reads as impact */
  animation-delay: calc(var(--i) * 70ms + 700ms + var(--edge-dur, 520ms) - 40ms);
}
@keyframes edge-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes head-pop  { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: none; } }
```

Set `--edge-dur` per edge when lengths differ a lot; a short hop and a long haul drawing
in the same 520 ms have visibly different speeds and the eye reads the difference as
importance you didn't intend.

## Per-type patterns

### Architecture / cloud

Regions establish first (they are the mental model: which side is the bank, which side
is the network). Nodes build inside each region, region by region, not interleaved.
Edges cross regions last. Emphasis on the one component the page is selling — once, in
act 4, never a loop.

### Flow / process

Strict left-to-right or top-to-bottom in flow order. One pulse traverses the whole happy
path in act 4 so the viewer sees the route end to end. Error branches enter dimmed
(opacity 0.45) and are never animated — they are context, not story.

### Sequence

Lifelines draw top-down first (act 1). Then one message at a time, each in its travel
direction: request left→right solid, reply right→left dashed. The active message holds
exclusive focus — everything else dims to 0.3–0.4 — and activation bars grow as messages
land. Long sequences: don't animate 15 messages; split the diagram or animate 5 and let
the rest resolve.

### Network / topology

Center or gateway node first, then rings outward (`--i` = hop distance). Links draw
outward from the center. Idle: a slow traffic pulse on 2–3 links maximum, offset phases,
opacity ≤0.5.

### Concept illustration

No flow order — depth order, back to front, larger stagger (100–140 ms) because there is
no urgency. Then a permanent idle that never resolves to "done": that *is* the resolved
state.

## Idle loops (illustrations, and diagrams after act 5)

Rules that separate "alive" from "distracting":

- **Amplitude:** translate ≤6 px, rotate ≤2°, scale ≤1.02, opacity ≥0.6. If you notice
  the loop while reading the text next to it, halve it.
- **Period:** 3–8 s. Faster reads as nervous; slower reads as broken.
- **Phase offsets:** never the same delay twice. Use non-multiples — 0 s, 1.3 s, 2.9 s,
  4.1 s — or every element beats in unison like a heartbeat you can't unsee.
- **Count:** at most 3–4 looping elements per graphic, and no looping element larger
  than ~15% of the canvas.
- **Gated:** paused offscreen and on hidden tabs, and off entirely under reduced motion.

```css
.is-idle .cloud  { animation: drift 6.5s var(--ease-idle) infinite alternate; }
.is-idle .cloud--b { animation-delay: 1.3s; animation-duration: 7.8s; }
@keyframes drift { to { transform: translateX(6px) translateY(-3px); } }
```

Character motion, in order of payoff: breathing (scale 1.015 on the torso, 4 s),
blink (opacity or `scaleY` on the eye group, 120 ms every 4–7 s), secondary drift on
hair/cape lagging the body by 150–250 ms. Skip the mouth unless it's speaking.

## Interactive states (hover, tap, replay)

The arc is choreography; anything the user triggers is UI and plays by UI rules.

- **Transitions, not keyframes.** A hovered node can be entered and left faster than the
  animation runs. A transition retargets from the current value; a keyframe restarts from
  zero and stutters.
- **Gate hover behind capability**, or touch devices fire it on tap and the state sticks:

  ```css
  @media (hover: hover) and (pointer: fine) {
    .node:hover .node__box { transform: translateY(-2px); }
  }
  .node__box { transition: transform 180ms var(--ease-out); }
  ```
- **≤300 ms, and asymmetric.** Enter can take 180 ms; the release should snap back
  faster (~120 ms) — slow where the user is deciding, fast where the system responds.
- **A replay control never re-runs the arc from blank.** Cancel and replay the existing
  animations (techniques recipe 8); never remount the SVG.
- **Pointer-tracked parallax must be spring-smoothed.** Mapping pointer position straight
  onto a transform feels artificial because it has no momentum. Either a spring
  (`useSpring`, stiffness ~100 / damping ~10) or a plain
  `transition: transform 400ms var(--ease-out)` on the tracked group. Amplitude ≤8 px,
  and off entirely under reduced motion.

## Emphasis without motion sickness

The strongest technique is not moving the thing — it's dimming everything else.
`opacity: 0.3` on the rest of the diagram plus a 500 ms ring on the target reads louder
than any scale or shake, costs one animated property, and survives reduced motion as a
static dim.

## Reduced motion

Reduced motion means **fewer and gentler**, not zero. Opacity and color aid
comprehension and stay; movement, draw-on and loops go. Kill everything first, then
re-add the one gentle thing — a broad reset can't leak movement, a hand-picked list can:

```css
@media (prefers-reduced-motion: reduce) {
  .flow-diagram *,
  .flow-diagram *::before,
  .flow-diagram *::after {
    animation: none !important;
    transition: none !important;
  }
  /* the whole graphic cross-fades in once; nothing moves, nothing draws */
  .flow-diagram.is-playing {
    animation: fade-in 200ms ease both !important;
  }
}
```

This is why the trigger class is still applied under reduced motion, while the JS keeps
the *idle* class off: CSS decides what motion means, JS only decides that loops don't run.

If removing the animations leaves anything invisible, the base styles are wrong — fix the
base, don't add reduced-motion overrides to reveal content.
