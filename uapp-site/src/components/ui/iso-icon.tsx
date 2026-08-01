import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";
import { box, floorGrid, frame, orbit, standoff } from "@/lib/iso";

/**
 * Іконки — мініатюри того самого світу, а не окремий плоский набір: той
 * самий кут проєкції й та сама товщина лінії, що й у hero-схеми. Значення
 * будується модифікацією куба, не запозиченим символом.
 */
const F = frame(15, 24, 24);

/** Куб, центрований на початку координат: спільна основа всіх іконок. */
const unit = box({ x: -0.5, y: -0.5, z: -0.5, w: 1, d: 1, h: 1 }, F);

interface ShapeProps {
  /** Заливні грані замість контуру — один об'єкт на композицію. */
  filled?: boolean;
}

/** Три грані заливного об'єкта: пласке освітлення, без градієнта. */
function Faces({ of }: { of: ReturnType<typeof box> }) {
  return (
    <>
      <path d={of.left} data-iso-face="left" />
      <path d={of.right} data-iso-face="right" />
      <path d={of.top} data-iso-face="top" />
    </>
  );
}

function Module({ filled }: ShapeProps) {
  return filled ? <Faces of={unit} /> : <path d={unit.wire} />;
}

/** Наскрізна конструкція: видно приховані ребра — тобто видно, що всередині. */
function Audit() {
  return (
    <>
      <path d={unit.wire} />
      <path d={unit.hidden} data-iso-dash />
    </>
  );
}

/** Стос плит — шари рейок один над одним. */
function Stack() {
  const slabs = [-0.62, -0.18, 0.26].map((z) =>
    box({ x: -0.5, y: -0.5, z, w: 1, d: 1, h: 0.3 }, F),
  );
  return (
    <>
      {slabs.map((s, i) => (
        <path key={i} d={s.wire} />
      ))}
    </>
  );
}

/** Куб на орбіті — вузол, що працює в мережі. */
function Orbit({ filled }: ShapeProps) {
  const core = box({ x: -0.34, y: -0.34, z: -0.34, w: 0.68, d: 0.68, h: 0.68 }, F);
  const ring = orbit({ z: -0.34 }, 0.95, F);
  return (
    <>
      <ellipse {...ring} data-iso-dash />
      {filled ? <Faces of={core} /> : <path d={core.wire} />}
    </>
  );
}

/** Піднята кришка: захищений об'єм, відокремлений від основи. */
function Lift() {
  const base = box({ x: -0.5, y: -0.5, z: -0.7, w: 1, d: 1, h: 0.4 }, F);
  const lid = box({ x: -0.34, y: -0.34, z: 0.28, w: 0.68, d: 0.68, h: 0.3 }, F);
  return (
    <>
      <path d={base.wire} />
      <path d={standoff({ z: 0.28 }, -0.3, F)} data-iso-dash />
      <path d={lid.wire} />
    </>
  );
}

/** Сітка вузлів — розподілена система на спільній підлозі. */
function Mesh() {
  const cells = [
    { x: -0.72, y: -0.72 },
    { x: 0.06, y: -0.72 },
    { x: -0.72, y: 0.06 },
    { x: 0.06, y: 0.06 },
  ].map((c) => box({ ...c, z: -0.4, w: 0.66, d: 0.66, h: 0.5 }, F));
  return (
    <>
      <path d={floorGrid(F, { size: 1.1, step: 1.1, z: -0.4 })} data-iso-grid />
      {cells.map((c, i) => (
        <path key={i} d={c.wire} />
      ))}
    </>
  );
}

/* Типізація явна: форми без заливки оголошені без пропсів, і без цієї
   анотації JSX не дозволив би передати їм `filled`. */
const shapes: Record<string, (p: ShapeProps) => React.ReactElement> = {
  module: Module,
  audit: Audit,
  stack: Stack,
  orbit: Orbit,
  lift: Lift,
  mesh: Mesh,
};

export type IsoIconName =
  | "module"
  | "audit"
  | "stack"
  | "orbit"
  | "lift"
  | "mesh";

export function IsoIcon({
  name,
  size = 40,
  filled = false,
  className,
}: {
  name: IsoIconName;
  size?: number;
  /** Заливні грані. Дозволено рівно одному об'єкту в композиції. */
  filled?: boolean;
  className?: string;
}) {
  const Shape = shapes[name];
  return (
    <svg
      data-iso
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn("shrink-0", className)}
      // Іконка бере колір з контексту, на відміну від великих схем,
      // які тримають власну обводку.
      style={{ "--iso-stroke": "currentColor" } as CSSProperties}
    >
      <Shape filled={filled} />
    </svg>
  );
}
