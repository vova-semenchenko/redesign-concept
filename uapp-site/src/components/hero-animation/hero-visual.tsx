import { cn } from "@/lib/utils";
import { box, floorGrid, frame, orbit, pt, standoff, type Pt } from "@/lib/iso";

/**
 * Сигнатурна схема першого екрана — «обидва береги» (бриф §7).
 *
 * Композиція будується на одній властивості проєкції: вісь моделі (1, −1, 0)
 * дає на екрані чисту горизонталь. Тому фіатний берег, платіж і ланцюговий
 * берег стоять на спільній осі, і перетин читається як рух зліва направо.
 *
 * Постановка — dissection plate: предмет тримає одну фіксовану позу, а шари
 * приходять по черзі й кожен засвічує свій рядок у ключі. Ключ живе поруч у
 * HTML (`HERO_KEY`), і це не косметика: підписи всередині viewBox на вузькому
 * екрані стискалися б до ~5px, а літера-маркер лишається читабельною завжди.
 *
 * Рух — один оркестрований момент на ~3.4 с, який програється раз і лишається
 * у завершеному стані. Автоанімація довша за 5 с зобов'язала б додати
 * pause-кнопку (WCAG SC 2.2.2). Кожен клас має завершений стан за
 * замовчуванням, тож reduced-motion і будь-який збій дають готову схему.
 */

const F = frame(44, 360, 214);
const FLOOR_Z = 0;

const fiatShore = box({ x: -3.2, y: 0.8, z: FLOOR_Z, w: 2.4, d: 2.4, h: 0.34 }, F);
const chainShore = box({ x: 0.8, y: -3.2, z: FLOOR_Z, w: 2.4, d: 2.4, h: 0.34 }, F);
const ledger = box({ x: -2.5, y: 1.5, z: 0.34, w: 1, d: 1, h: 0.55 }, F);
const wallet = box({ x: 1.5, y: -2.5, z: 0.34, w: 1, d: 1, h: 0.55 }, F);

/** Єдиний заливний об'єкт композиції — сам платіж. */
const payment = box({ x: -0.55, y: -0.55, z: 1.15, w: 1.1, d: 1.1, h: 1.1 }, F);
const complianceRing = orbit({ z: 1.15 }, 1.5, F);

const crossing: Pt[] = [
  pt({ x: -2, y: 2, z: 0.34 }, F),
  pt({ x: -1, y: 1, z: 1.05 }, F),
  pt({ x: 0, y: 0, z: 1.72 }, F),
  pt({ x: 1, y: -1, z: 1.05 }, F),
  pt({ x: 2, y: -2, z: 0.34 }, F),
];
const crossingPath = crossing
  .map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`)
  .join("");
const crossingLength = Math.round(
  crossing.reduce(
    (sum, p, i) =>
      i === 0
        ? 0
        : sum + Math.hypot(p[0] - crossing[i - 1][0], p[1] - crossing[i - 1][1]),
    0,
  ),
);

/**
 * Ключ креслення. Порядок = порядок появи шарів; літера в SVG і літера в
 * рядку ключа — та сама адреса, тому схему можна обговорювати словами.
 */
export const HERO_KEY = [
  { mark: "A", label: "ISO 20022 rails", delay: "0.3s" },
  { mark: "B", label: "Payment", delay: "0.85s" },
  { mark: "C", label: "Compliance", delay: "1.15s" },
  { mark: "D", label: "On-chain", delay: "0.55s" },
] as const;

/** Точки, до яких лідери ведуть літери-маркери. */
const marks: { mark: string; at: Pt; dx: number; dy: number }[] = [
  { mark: "A", at: pt({ x: -2, y: 2, z: 0.34 }, F), dx: -96, dy: -96 },
  { mark: "B", at: payment.anchor, dx: 0, dy: -62 },
  { mark: "C", at: pt({ x: 1.5, y: 1.5, z: 1.15 }, F), dx: 74, dy: 40 },
  { mark: "D", at: pt({ x: 2, y: -2, z: 0.34 }, F), dx: 96, dy: -96 },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      data-iso
      viewBox="0 0 720 430"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
      style={{ "--crossing-length": crossingLength } as React.CSSProperties}
    >
      <path
        d={floorGrid(F, { size: 4.4, step: 1.1, z: FLOOR_Z })}
        data-iso-grid
        className="hero-layer hero-layer-0"
      />

      {/* A — фіатний берег */}
      <g className="hero-layer hero-layer-1">
        <path d={fiatShore.wire} />
        <path d={ledger.wire} />
      </g>

      {/* D — ланцюговий берег */}
      <g className="hero-layer hero-layer-4">
        <path d={chainShore.wire} />
        <path d={wallet.wire} />
      </g>

      {/* C — кільце комплаєнсу: воно пояснює, чому шлях іде крізь центр */}
      <g className="hero-layer hero-layer-3">
        <ellipse {...complianceRing} data-iso-dash />
      </g>

      {/* B — платіж: єдиний заливний об'єкт, на пунктирній стійці */}
      <g className="hero-layer hero-layer-2">
        <path d={standoff({ z: 1.15 }, FLOOR_Z, F)} data-iso-dash />
        <path d={payment.left} data-iso-face="left" />
        <path d={payment.right} data-iso-face="right" />
        <path d={payment.top} data-iso-face="top" />
        <path d={payment.wire} stroke="var(--color-ultramarine-800)" />
      </g>

      {/* Перетин: розкривається один раз і лишається намальованим */}
      <path
        d={crossingPath}
        className="hero-trace"
        stroke="var(--color-ultramarine-600)"
        strokeWidth={1.5}
      />
      <path
        d={crossingPath}
        className="hero-head"
        stroke="var(--color-ultramarine-600)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Лідери до літер-маркерів */}
      <g className="hero-marks">
        {marks.map((m) => {
          const endX = m.at[0] + m.dx;
          const endY = m.at[1] + m.dy;
          return (
            <g key={m.mark}>
              <path
                d={`M${m.at[0]} ${m.at[1]}L${m.at[0]} ${endY}${
                  m.dx === 0 ? "" : `L${endX} ${endY}`
                }`}
                stroke="var(--muted-foreground)"
                data-iso-dash
              />
              <circle
                cx={m.at[0]}
                cy={m.at[1]}
                r={2.5}
                fill="var(--muted-foreground)"
                stroke="none"
              />
              <text
                x={endX}
                y={endY - 9}
                // Маркер тікає ВІД креслення, а не в нього.
                textAnchor={m.dx < 0 ? "end" : m.dx > 0 ? "start" : "middle"}
                fill="var(--heading)"
                stroke="none"
                className="font-head text-[19px] font-medium"
              >
                {m.mark}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
