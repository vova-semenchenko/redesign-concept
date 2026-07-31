import { cn } from "@/lib/utils";

/**
 * Сигнатурний hero-візуал: ізометричний блюпринт «обидва береги» —
 * стос плит платіжних рейок ліворуч, вузлова топологія on-chain праворуч,
 * між ними єдиний заливний акцентний об'єкт (шар, який будує UAPP).
 *
 * Контракт модуля — див. README.md поруч. Кадр статичний: reduced-motion
 * задовольняється тривіально, pause-кнопка не потрібна. Рух по скролу
 * (поступове проявлення елементів) заїде сюди без зміни інтерфейсу.
 *
 * Геометрія: єдиний ізометричний кут 2:1 для всього сайту, той самий, що в
 * `IsoIcon`. Одиниця підлоги — K; екранні координати рахуються з (x, y, висота).
 */

const K = 28;
const FLOOR = 5;

const sx = (x: number, y: number) => (x - y) * K;
const sy = (x: number, y: number, lift = 0) => ((x + y) * K) / 2 - lift;

const DASH = "3 4";

/** Ромб-«верхня грань»: половина ширини w, половина висоти h = w / 2. */
const rhombus = (cx: number, cy: number, w: number) =>
  `M${cx} ${cy - w / 2} L${cx + w} ${cy} L${cx} ${cy + w / 2} L${cx - w} ${cy} Z`;

/** Дві видимі бічні грані плити висотою d. */
const sides = (cx: number, cy: number, w: number, d: number) => {
  const h = w / 2;
  return `M${cx - w} ${cy} V${cy + d} L${cx} ${cy + h + d} V${cy + h} M${cx + w} ${cy} V${cy + d} L${cx} ${cy + h + d}`;
};

const faceLeft = (cx: number, cy: number, w: number, d: number) =>
  `M${cx - w} ${cy} L${cx - w} ${cy + d} L${cx} ${cy + w / 2 + d} L${cx} ${cy + w / 2} Z`;

const faceRight = (cx: number, cy: number, w: number, d: number) =>
  `M${cx + w} ${cy} L${cx + w} ${cy + d} L${cx} ${cy + w / 2 + d} L${cx} ${cy + w / 2} Z`;

/* Три вузли композиції стоять на екранній горизонталі x + y = FLOOR */
const RAILS = { x: sx(0.7, 4.3), floor: sy(0.7, 4.3) };
const CORE = { x: sx(2.5, 2.5), floor: sy(2.5, 2.5) };
const CHAIN = { x: sx(4.3, 0.7), floor: sy(4.3, 0.7) };

const RAIL_SLABS = [-6, 12, 30];
const CORE_CY = -14;
const CHAIN_CY = 10;

const SATELLITES: [number, number][] = [
  [CHAIN.x - 48, 14],
  [CHAIN.x + 27, -6],
  [CHAIN.x + 27, 34],
];

function Floor() {
  const lines: string[] = [];
  for (let i = 0; i <= FLOOR; i += 1) {
    lines.push(
      `M${sx(i, 0)} ${sy(i, 0)} L${sx(i, FLOOR)} ${sy(i, FLOOR)}`,
      `M${sx(0, i)} ${sy(0, i)} L${sx(FLOOR, i)} ${sy(FLOOR, i)}`,
    );
  }
  return (
    <g className="text-rule-faint">
      {lines.map((d) => (
        <path key={d} data-iso="" d={d} />
      ))}
    </g>
  );
}

function Capsule({
  x,
  y,
  index,
  label,
  leader,
}: {
  x: number;
  y: number;
  index: string;
  label: string;
  leader: string;
}) {
  /* чип 18 + відступ 8 + сам текст (кегль 8 із трекінгом 1 ≈ 6.6 на літеру) */
  const width = 34 + label.length * 6.6;
  return (
    <g>
      <path data-iso="" strokeDasharray={DASH} d={leader} />
      <rect x={x} y={y} width={width} height={18} data-iso="" />
      <rect x={x} y={y} width={18} height={18} className="fill-heading" />
      <text
        x={x + 9}
        y={y + 9}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="8"
        className="fill-background font-medium"
      >
        {index}
      </text>
      <text
        x={x + 26}
        y={y + 9}
        dominantBaseline="central"
        fontSize="8"
        letterSpacing="1"
        className="fill-muted-foreground uppercase"
      >
        {label}
      </text>
    </g>
  );
}

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="-150 -90 300 245"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full text-heading", className)}
    >
      <defs>
        {/* У світлій зоні площини позначаються діагональним штрихуванням, не заливкою */}
        <pattern
          id="uapp-hatch"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(30)"
        >
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="5"
            strokeWidth="1"
            className="stroke-heading/20"
          />
        </pattern>
      </defs>

      <Floor />

      {/* Стійки: об'єкти висять над сіткою, прив'язані до площини */}
      <g className="text-heading/35">
        <path
          data-iso=""
          strokeDasharray={DASH}
          d={`M${RAILS.x} 58 V${RAILS.floor}`}
        />
        <path
          data-iso=""
          strokeDasharray={DASH}
          d={`M${CORE.x} 26 V${CORE.floor}`}
        />
        <path
          data-iso=""
          strokeDasharray={DASH}
          d={`M${CHAIN.x} 34 V${CHAIN.floor}`}
        />
      </g>

      {/* 01 — платіжні рейки: стос плит, exploded view */}
      <g className="text-heading/80">
        {RAIL_SLABS.map((cy) => (
          <g key={cy}>
            <path d={faceLeft(RAILS.x, cy, 40, 8)} fill="url(#uapp-hatch)" />
            <path d={faceRight(RAILS.x, cy, 40, 8)} fill="url(#uapp-hatch)" />
            <path data-iso="" d={rhombus(RAILS.x, cy, 40)} />
            <path data-iso="" d={sides(RAILS.x, cy, 40, 8)} />
          </g>
        ))}
      </g>

      {/* 03 — on-chain: вузли на пунктирній орбіті */}
      <g className="text-heading/80">
        <ellipse
          data-iso=""
          strokeDasharray={DASH}
          cx={CHAIN.x}
          cy={CHAIN_CY + 4}
          rx="48"
          ry="24"
        />
        <path data-iso="" d={rhombus(CHAIN.x, CHAIN_CY, 20)} />
        <path data-iso="" d={sides(CHAIN.x, CHAIN_CY, 20, 14)} />
        {SATELLITES.map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <path data-iso="" d={rhombus(x, y, 10)} />
            <path data-iso="" d={sides(x, y, 10, 7)} />
          </g>
        ))}
      </g>

      {/* Зв'язки між берегами — пунктир з дрібними акцентними індикаторами */}
      <g className="text-heading/45">
        <path
          data-iso=""
          strokeDasharray={DASH}
          d={`M-61 12 L${CORE.x - 32} ${CORE_CY}`}
        />
        <path
          data-iso=""
          strokeDasharray={DASH}
          d={`M${CORE.x + 32} ${CORE_CY} L53 10`}
        />
      </g>
      <g className="fill-primary">
        <path d={rhombus(-46, -1, 5)} />
        <path d={rhombus(46, -2, 5)} />
      </g>

      {/* 02 — єдиний заливний об'єкт композиції: шар, який будує UAPP */}
      <g>
        <path d={rhombus(CORE.x, CORE_CY, 32)} className="fill-primary" />
        <path
          d={faceLeft(CORE.x, CORE_CY, 32, 24)}
          className="fill-iso-face-left"
        />
        <path
          d={faceRight(CORE.x, CORE_CY, 32, 24)}
          className="fill-iso-face-right"
        />
        {/* підпис на грані, з перспективою грані */}
        <text
          transform={`matrix(1 0.5 -1 0.5 ${CORE.x} ${CORE_CY})`}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="11"
          letterSpacing="1.6"
          className="fill-primary-foreground font-medium"
        >
          UAPP
        </text>
      </g>

      <Capsule
        x={-142}
        y={-74}
        index="01"
        label="Payment rails"
        leader={`M-116 -56 L${RAILS.x + 4} -18`}
      />
      <Capsule
        x={62}
        y={-62}
        index="02"
        label="On-chain"
        leader={`M86 -44 L${CHAIN.x + 20} -12`}
      />
    </svg>
  );
}
