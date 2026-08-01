import { cn } from "@/lib/utils";
import { box, floorGrid, frame, orbit, pt, seg, standoff, type Pt } from "@/lib/iso";

/**
 * Схеми продуктів для showcase.
 *
 * Кожен продукт має власне креслення. До цього всі, крім флагмана, малювали
 * один і той самий куб, а DESIGN.md сам пише, що малюнок без анотації не
 * завершений — тож тут у кожної схеми є підлога, рівно один заливний об'єкт
 * і два підписи з лідерами.
 *
 * Підписи ховаються нижче lg: у вузькій колонці текст усередині viewBox
 * стиснувся б до нечитабельного, і краще не мати підпису, ніж мати його
 * розміром у п'ять пікселів.
 */

const F = frame(38, 300, 176);
const Z = 0;

interface Mark {
  at: Pt;
  dx: number;
  dy: number;
  text: string;
}

function Marks({ marks }: { marks: Mark[] }) {
  return (
    <g className="hidden lg:block">
      {marks.map((m) => {
        const endX = m.at[0] + m.dx;
        const endY = m.at[1] + m.dy;
        return (
          <g key={m.text}>
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
              y={endY - 8}
              // Підпис тікає ВІД креслення: ліворуч — закінчується на кінці
              // полички, праворуч — від неї починається.
              textAnchor={m.dx < 0 ? "end" : m.dx > 0 ? "start" : "middle"}
              fill="var(--muted-foreground)"
              stroke="none"
              className="font-body text-[14px] font-medium tracking-[0.08em] uppercase"
            >
              {m.text}
            </text>
          </g>
        );
      })}
    </g>
  );
}

function Filled({ of }: { of: ReturnType<typeof box> }) {
  return (
    <>
      <path d={of.left} data-iso-face="left" />
      <path d={of.right} data-iso-face="right" />
      <path d={of.top} data-iso-face="top" />
      <path d={of.wire} stroke="var(--color-ultramarine-800)" />
    </>
  );
}

/** Крипто-модуль, вбудований у банківський застосунок. */
function EmbeddedCrypto() {
  const bank = box({ x: -2.2, y: -2.2, z: Z, w: 4.4, d: 4.4, h: 0.3 }, F);
  const module_ = box({ x: -0.6, y: -0.6, z: 0.3, w: 1.2, d: 1.2, h: 1.2 }, F);
  const ring = orbit({ z: 0.3 }, 1.7, F);
  return (
    <>
      <path d={floorGrid(F, { size: 3.3, step: 1.1, z: Z })} data-iso-grid />
      <path d={bank.wire} />
      <ellipse {...ring} data-iso-dash />
      <Filled of={module_} />
      <Marks
        marks={[
          { at: pt({ x: -2.2, y: 1, z: 0.3 }, F), dx: -70, dy: -54, text: "bank app" },
          { at: module_.anchor, dx: 70, dy: -52, text: "crypto module" },
        ]}
      />
    </>
  );
}

/** Життєвий цикл повідомлення: три щаблі й вантаж, що проходить крізь них. */
function MessageLifecycle() {
  const stages = [-2.2, -0.6, 1].map((x) =>
    box({ x, y: -0.8, z: Z, w: 1.2, d: 1.6, h: 0.36 }, F),
  );
  const payload = box({ x: -0.5, y: -0.5, z: 1.1, w: 1, d: 1, h: 1 }, F);
  return (
    <>
      <path d={floorGrid(F, { size: 3.3, step: 1.1, z: Z })} data-iso-grid />
      {stages.map((s, i) => (
        <path key={i} d={s.wire} />
      ))}
      <path
        d={seg({ x: -2.2, y: 0, z: 0.36 }, { x: 2.2, y: 0, z: 0.36 }, F)}
        data-iso-dash
      />
      <path d={standoff({ z: 1.1 }, 0.36, F)} data-iso-dash />
      <Filled of={payload} />
      <Marks
        marks={[
          { at: payload.anchor, dx: 0, dy: -56, text: "message" },
          { at: pt({ x: 1.6, y: 0, z: 0.36 }, F), dx: 62, dy: 44, text: "validator" },
        ]}
      />
    </>
  );
}

/** Дві відомості, що мусять зійтися: шари попарно зв'язані пунктиром. */
function Reconciliation() {
  const left = [0, 0.42, 0.84].map((z) =>
    box({ x: -2.6, y: 0.4, z, w: 1.5, d: 1.5, h: 0.34 }, F),
  );
  const right = [0, 0.42, 0.84].map((z) =>
    box({ x: 1.1, y: -2.1, z, w: 1.5, d: 1.5, h: 0.34 }, F),
  );
  const match = box({ x: -0.55, y: -0.55, z: 1.5, w: 1.1, d: 1.1, h: 0.5 }, F);
  return (
    <>
      <path d={floorGrid(F, { size: 3.3, step: 1.1, z: Z })} data-iso-grid />
      {left.map((s, i) => (
        <path key={`l${i}`} d={s.wire} />
      ))}
      {right.map((s, i) => (
        <path key={`r${i}`} d={s.wire} />
      ))}
      {[0.17, 0.59, 1.01].map((z, i) => (
        <path
          key={`m${i}`}
          d={seg({ x: -1.85, y: 1.15, z }, { x: 1.85, y: -1.35, z }, F)}
          data-iso-dash
        />
      ))}
      <Filled of={match} />
      <Marks
        marks={[
          { at: pt({ x: -1.85, y: 1.15, z: 1.02 }, F), dx: -66, dy: -50, text: "fiat ledger" },
          { at: pt({ x: 1.85, y: -1.35, z: 1.02 }, F), dx: 66, dy: -50, text: "on-chain" },
        ]}
      />
    </>
  );
}

/** Підпис на пристрої: ключ живе у відокремленому об'ємі над платою. */
function DeviceSigning() {
  const device = box({ x: -1.6, y: -1.6, z: Z, w: 3.2, d: 3.2, h: 0.28 }, F);
  const enclave = box({ x: -0.85, y: -0.85, z: 0.28, w: 1.7, d: 1.7, h: 0.5 }, F);
  const key = box({ x: -0.4, y: -0.4, z: 1.5, w: 0.8, d: 0.8, h: 0.8 }, F);
  return (
    <>
      <path d={floorGrid(F, { size: 3.3, step: 1.1, z: Z })} data-iso-grid />
      <path d={device.wire} />
      <path d={enclave.wire} />
      <path d={enclave.hidden} data-iso-dash />
      <path d={standoff({ z: 1.5 }, 0.78, F)} data-iso-dash />
      <Filled of={key} />
      <Marks
        marks={[
          { at: key.anchor, dx: 64, dy: -50, text: "signing key" },
          { at: pt({ x: -1.6, y: 0.8, z: 0.28 }, F), dx: -64, dy: 40, text: "secure enclave" },
        ]}
      />
    </>
  );
}

const drawings = {
  "embedded-crypto": EmbeddedCrypto,
  "iso20022-toolkit": MessageLifecycle,
  "reconciliation-agent": Reconciliation,
  "sca-signing": DeviceSigning,
} as const;

export function IsoSchematic({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const Drawing = drawings[id as keyof typeof drawings];
  if (!Drawing) return null;
  return (
    <svg
      data-iso
      viewBox="0 0 600 350"
      aria-hidden="true"
      focusable="false"
      className={cn("h-auto w-full", className)}
    >
      <Drawing />
    </svg>
  );
}
