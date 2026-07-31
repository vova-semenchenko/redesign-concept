/**
 * Reference implementation of the whole skill in one file: a four-node payment
 * authorization flow, animated on rung 1 (CSS + IntersectionObserver, 0 kb added).
 *
 * Demonstrates, in the order the skill's workflow introduces them:
 *   – the semantic SVG contract: layer order, data-* handles, --i order, pathLength="1"
 *   – layout on the outer <g transform>, animation on an inner <g>
 *   – useId() prefixing for every defs reference
 *   – in-view-once trigger + idle gating (offscreen / hidden tab)
 *   – reduced motion: CSS reduces the arc to a cross-fade, JS withholds the idle loop
 *   – hover state as a gated CSS transition, not a keyframe (see the stylesheet)
 *   – resolved state as the base style: no JS, no trigger, or reduce → finished diagram
 *
 * The markup is plain SVG — port to any framework by replacing useId/useEffect with
 * that framework's equivalents. The CSS is unchanged in every port.
 */
"use client";

import { useEffect, useId, useRef, useState } from "react";
import "./flow-diagram.css";

const NODES = [
  { key: "merchant", x: 40, label: "Merchant", sub: "checkout" },
  { key: "gateway", x: 280, label: "Gateway", sub: "3-D Secure" },
  { key: "network", x: 520, label: "Card network", sub: "routing" },
  { key: "issuer", x: 760, label: "Issuer", sub: "authorization" },
] as const;

const EDGES = [
  { key: "merchant→gateway", d: "M220 204H268", head: "M268 198L278 204L268 210Z" },
  { key: "gateway→network", d: "M460 204H508", head: "M508 198L518 204L508 210Z" },
  { key: "network→issuer", d: "M700 204H748", head: "M748 198L758 204L748 210Z" },
] as const;

/** The full route the authorization pulse travels in act 4. */
const ROUTE = "M220 204H748";

export function FlowDiagram() {
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;
  const wash = `${uid}-wash`; // every defs id is instance-scoped

  const ref = useRef<SVGSVGElement>(null);
  const [playing, setPlaying] = useState(false);

  // Trigger: play once, 25% visible. Fires under reduced motion too — the CSS turns
  // the arc into a single 200ms cross-fade there, so one code path serves everyone.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setPlaying(true);
        io.disconnect();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Idle loop gating: the pulse runs only while visible and the tab is in front.
  useEffect(() => {
    const el = ref.current;
    if (!el || !playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = true;
    const sync = () => el.classList.toggle("is-idle", visible && !document.hidden);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      sync();
    }, { threshold: 0.1 });
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      el.classList.remove("is-idle");
    };
  }, [playing]);

  return (
    <svg
      ref={ref}
      className={`flow-diagram${playing ? " is-playing" : ""}`}
      viewBox="0 0 960 420"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>Card payment authorization flow</title>
      <desc id={descId}>
        A checkout request travels from the merchant through the payment gateway and the
        card network to the issuing bank, which authorizes the payment.
      </desc>

      <defs>
        <linearGradient id={wash} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--diagram-wash-from)" />
          <stop offset="100%" stopColor="var(--diagram-wash-to)" />
        </linearGradient>
      </defs>

      {/* #bg */}
      <g className="layer-bg" aria-hidden="true">
        <rect x="0" y="0" width="960" height="420" fill={`url(#${wash})`} rx="16" />
      </g>

      {/* #regions — the stage (act 1) */}
      <g className="layer-regions">
        <g className="region" data-region="issuing">
          <rect x="500" y="96" width="440" height="216" rx="14" />
          <text className="region__title" x="520" y="126">
            Issuing side
          </text>
        </g>
      </g>

      {/* #edges — lines only (act 3) */}
      <g className="layer-edges">
        {EDGES.map((edge, i) => (
          <path
            key={edge.key}
            className="edge"
            data-edge={edge.key}
            style={{ "--i": i } as React.CSSProperties}
            pathLength="1"
            d={edge.d}
          />
        ))}
      </g>

      {/* #heads — separate elements so they can pop as the draw lands */}
      <g className="layer-heads">
        {EDGES.map((edge, i) => (
          <path
            key={edge.key}
            className="edge__head"
            data-head={edge.key}
            style={{ "--i": i } as React.CSSProperties}
            d={edge.head}
          />
        ))}
      </g>

      {/* #nodes — layout on the outer g, animation on the inner g (act 2) */}
      <g className="layer-nodes">
        {NODES.map((node, i) => (
          <g
            key={node.key}
            className="node"
            data-node={node.key}
            transform={`translate(${node.x} 160)`}
          >
            <g className="node__box" style={{ "--i": i } as React.CSSProperties}>
              <rect width="180" height="88" rx="12" />
            </g>
          </g>
        ))}
      </g>

      {/* #labels — on top, never inside a scaling group */}
      <g className="layer-labels">
        {NODES.map((node, i) => (
          <g key={node.key} className="label-group" style={{ "--i": i } as React.CSSProperties}>
            <text className="label" x={node.x + 90} y="198" textAnchor="middle">
              {node.label}
            </text>
            <text className="label label--sub" x={node.x + 90} y="222" textAnchor="middle">
              {node.sub}
            </text>
          </g>
        ))}
      </g>

      {/* #overlay — the flow pulse (act 4, then idle) */}
      <g className="layer-overlay" aria-hidden="true">
        <circle className="pulse" r="5" style={{ offsetPath: `path("${ROUTE}")` } as React.CSSProperties} />
      </g>
    </svg>
  );
}
