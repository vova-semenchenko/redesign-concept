import { cn } from "@/lib/utils";

/**
 * Ізометричні іконки, побудовані з того самого куба-примітива, що й великі
 * схеми: тільки контур, однакова товщина обводки (`data-iso` в globals.css),
 * монохром, без заливки. Метафора — модифікація куба, а не окремий символ.
 *
 * Кут проєкції єдиний для всього сайту: 2:1 (30°), кубик 28×20 у полі 48×48.
 */
export type IsoIconName = "layers" | "gate" | "shell" | "nodes";

const DASH = "2 3";

/** Плита-ромб зі товщиною `depth` — базовий примітив стосу. */
function slab(cy: number, depth: number) {
  return {
    top: `M24 ${cy - 7} L38 ${cy} L24 ${cy + 7} L10 ${cy} Z`,
    left: `M10 ${cy} V${cy + depth} L24 ${cy + 7 + depth} V${cy + 7}`,
    right: `M38 ${cy} V${cy + depth} L24 ${cy + 7 + depth}`,
  };
}

const CUBE = slab(18, 10);

function Layers() {
  return (
    <>
      {[10, 21, 32].map((cy) => {
        const s = slab(cy, 3);
        return (
          <g key={cy}>
            <path data-iso="" d={s.top} />
            <path data-iso="" d={s.left} />
            <path data-iso="" d={s.right} />
          </g>
        );
      })}
    </>
  );
}

function Gate() {
  return (
    <>
      <path data-iso="" d={CUBE.top} />
      <path data-iso="" d={CUBE.left} />
      <path data-iso="" d={CUBE.right} />
      {/* вісь-стійка до підлоги — куб «висить» над площиною */}
      <path data-iso="" strokeDasharray={DASH} d="M24 35 V37.5" />
      <path
        data-iso=""
        strokeDasharray={DASH}
        d="M24 37.5 L34 42 L24 46.5 L14 42 Z"
      />
    </>
  );
}

function Shell() {
  return (
    <>
      <path data-iso="" d={CUBE.top} />
      <path data-iso="" d={CUBE.left} />
      <path data-iso="" d={CUBE.right} />
      {/* ядро всередині оболонки, рознесене пунктиром — exploded view */}
      <path data-iso="" d="M24 15 L31 19 L24 23 L17 19 Z" />
      <path data-iso="" strokeDasharray={DASH} d="M17 19 L10 18" />
      <path data-iso="" strokeDasharray={DASH} d="M31 19 L38 18" />
      <path data-iso="" strokeDasharray={DASH} d="M24 23 V33" />
    </>
  );
}

function Nodes() {
  const satellites: [number, number][] = [
    [4, 24],
    [34, 15],
    [34, 33],
  ];
  return (
    <>
      <ellipse
        data-iso=""
        strokeDasharray={DASH}
        cx="24"
        cy="24"
        rx="20"
        ry="9"
      />
      <path data-iso="" d="M24 17 L31 21 L24 25 L17 21 Z" />
      <path data-iso="" d="M17 21 V26 L24 30 V25" />
      <path data-iso="" d="M31 21 V26 L24 30" />
      {satellites.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          data-iso=""
          d={`M${x} ${y - 2.5} L${x + 4} ${y} L${x} ${y + 2.5} L${x - 4} ${y} Z`}
        />
      ))}
    </>
  );
}

const shapes: Record<IsoIconName, () => React.JSX.Element> = {
  layers: Layers,
  gate: Gate,
  shell: Shell,
  nodes: Nodes,
};

export function IsoIcon({
  name,
  className,
}: {
  name: IsoIconName;
  className?: string;
}) {
  const Shape = shapes[name];
  return (
    <svg
      viewBox="0 0 48 48"
      aria-hidden="true"
      focusable="false"
      className={cn("size-10", className)}
    >
      <Shape />
    </svg>
  );
}
