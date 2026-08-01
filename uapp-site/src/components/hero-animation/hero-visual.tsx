import { cn } from "@/lib/utils";
import { box, floorGrid, frame, orbit, pt, standoff, type Pt } from "@/lib/iso";

/**
 * Сигнатурна схема першого екрана — «обидва береги» (бриф §7).
 *
 * Композиція будується на одній властивості проєкції: вісь моделі (1, −1, 0)
 * дає на екрані чисту горизонталь. Тому фіатний берег, платіж і ланцюговий
 * берег стоять на спільній осі, і перетин читається як рух зліва направо,
 * не потребуючи жодної підказки.
 *
 * Рух — один оркестрований момент на ~3.2 с, який програється раз і лишається
 * у завершеному стані. Це свідомо: автоанімація довша за 5 с зобов'язала б
 * додати pause-кнопку (WCAG SC 2.2.2), а розсипані ефекти суперечать системі.
 * `prefers-reduced-motion` глобально зводить тривалість до нуля, і кадр
 * одразу стає завершеним слідом — див. README.md поруч.
 */

const F = frame(44, 360, 214);
const FLOOR_Z = 0;

/** Два береги: плити на спільній осі, дзеркальні відносно центру. */
const fiatShore = box(
  { x: -3.2, y: 0.8, z: FLOOR_Z, w: 2.4, d: 2.4, h: 0.34 },
  F,
);
const chainShore = box(
  { x: 0.8, y: -3.2, z: FLOOR_Z, w: 2.4, d: 2.4, h: 0.34 },
  F,
);

/** Єдиний заливний об'єкт композиції — сам платіж. */
const payment = box({ x: -0.55, y: -0.55, z: 1.15, w: 1.1, d: 1.1, h: 1.1 }, F);

/** Супутники — каркасні, вони не сперечаються з акцентом. */
const ledger = box({ x: -2.5, y: 1.5, z: 0.34, w: 1, d: 1, h: 0.55 }, F);
const wallet = box({ x: 1.5, y: -2.5, z: 0.34, w: 1, d: 1, h: 0.55 }, F);

const complianceRing = orbit({ z: 1.15 }, 1.5, F);

/** Траєкторія перетину: берег → підйом крізь платіж → берег. */
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

/** Довжина ламаної — потрібна для dash-розкриття без вимірювання в DOM. */
const crossingLength = Math.round(
  crossing.reduce((sum, p, i) => {
    if (i === 0) return 0;
    const q = crossing[i - 1];
    return sum + Math.hypot(p[0] - q[0], p[1] - q[1]);
  }, 0),
);

/**
 * Лідери підняті настільки, щоб поличка з підписом виходила ВИЩЕ каркасних
 * супутників на берегах. Інакше підпис лягає просто на ребра коробки й
 * схема перестає читатися як креслення.
 */
const annotations: { at: Pt; dx: number; dy: number; text: string }[] = [
  { at: pt({ x: -2, y: 2, z: 0.34 }, F), dx: -104, dy: -104, text: "ISO 20022" },
  { at: payment.anchor, dx: 0, dy: -64, text: "compliance" },
  { at: pt({ x: 2, y: -2, z: 0.34 }, F), dx: 104, dy: -104, text: "on-chain" },
];

export function HeroVisual({ className }: { className?: string }) {
  return (
    <svg
      data-iso
      viewBox="0 0 720 430"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
      style={
        {
          "--crossing-length": crossingLength,
        } as React.CSSProperties
      }
    >
      {/* Підлога-креслення: об'єкти висять над нею на пунктирних стійках. */}
      <path d={floorGrid(F, { size: 4.4, step: 1.1, z: FLOOR_Z })} data-iso-grid />

      <path d={fiatShore.wire} />
      <path d={chainShore.wire} />
      <path d={ledger.wire} />
      <path d={wallet.wire} />

      {/* Кільце комплаєнсу оперізує платіж — воно ж пояснює, чому шлях
          проходить крізь центр, а не повз нього. */}
      <ellipse {...complianceRing} data-iso-dash />

      {/* Стійка від платежу до підлоги: глибина без жодної тіні. */}
      <path d={standoff({ z: 1.15 }, FLOOR_Z, F)} data-iso-dash />

      {/* Слід перетину: розкривається один раз і лишається намальованим. */}
      <path
        d={crossingPath}
        className="hero-trace"
        stroke="var(--color-ultramarine-600)"
        strokeWidth={1.5}
      />
      {/* Голова руху — короткий відрізок, що йде тією ж траєкторією. */}
      <path
        d={crossingPath}
        className="hero-head"
        stroke="var(--color-ultramarine-600)"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* Єдиний заливний об'єкт: три грані, пласке освітлення, без градієнта. */}
      <g className="hero-payment">
        <path d={payment.left} data-iso-face="left" />
        <path d={payment.right} data-iso-face="right" />
        <path d={payment.top} data-iso-face="top" />
        <path d={payment.wire} stroke="var(--color-ultramarine-800)" />
      </g>

      {/* Шар анотації: без нього це малюнок, а не схема. */}
      <g className="hero-annotations">
        {annotations.map((a) => {
          const dy = a.dy;
          const end = a.dx === 0 ? a.at[0] : a.at[0] + a.dx;
          return (
            <g key={a.text}>
              <path
                d={`M${a.at[0]} ${a.at[1]}L${a.at[0]} ${a.at[1] + dy}${
                  a.dx === 0 ? "" : `L${end} ${a.at[1] + dy}`
                }`}
                stroke="var(--muted-foreground)"
                data-iso-dash
              />
              <circle
                cx={a.at[0]}
                cy={a.at[1]}
                r={2.5}
                fill="var(--muted-foreground)"
                stroke="none"
              />
              <text
                x={a.dx < 0 ? end : a.dx > 0 ? end : a.at[0]}
                y={a.at[1] + dy - 8}
                textAnchor={a.dx < 0 ? "start" : a.dx > 0 ? "end" : "middle"}
                fill="var(--muted-foreground)"
                stroke="none"
                className="font-body text-[11px] font-medium tracking-[0.08em] uppercase"
              >
                {a.text}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
