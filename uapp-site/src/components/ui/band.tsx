import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Смуга — одиниця композиції сторінки замість «секції».
 *
 * Смуга займає всю ширину, має власний ґрунт і **обривається лінією**, а не
 * відступом: `border-t` тут не декор, а межа зони. Дві сусідні смуги ніколи
 * не поділяють ґрунт (DESIGN.md, Layout).
 *
 * `engine` вішає клас `dark`, який перемикає семантичні токени в темну
 * колонку стайлгайду — тому всередині смуги компоненти не знають, на якому
 * ґрунті стоять, і не потребують окремих варіантів.
 */
type Ground = "paper" | "quiet" | "engine";

const groundClass: Record<Ground, string> = {
  paper: "bg-background",
  quiet: "bg-gray-50",
  engine: "dark bg-background",
};

interface BandProps {
  children: ReactNode;
  ground?: Ground;
  id?: string;
  /** Колонкові лінії. Вимикати лише там, де смуга сама є одним об'єктом. */
  rules?: boolean;
  /** Стиснений вертикальний ритм — для службових смуг на кшталт trust. */
  tight?: boolean;
  /** Прибрати верхню межу (перша смуга під хедером). */
  seamless?: boolean;
  className?: string;
}

export function Band({
  children,
  ground = "paper",
  id,
  rules = true,
  tight = false,
  seamless = false,
  className,
}: BandProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full",
        groundClass[ground],
        !seamless && "border-t border-rule",
        className,
      )}
      style={{
        paddingBlock: tight ? "var(--band-y-tight)" : "var(--band-y)",
      }}
    >
      {rules ? <GridRules /> : null}
      <div className="relative">{children}</div>
    </section>
  );
}

/**
 * Контейнер: максимум сторінки плюс порожні бічні поля. Поля навмисно
 * лишаються порожніми колонками — контент у них не заходить.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("mx-auto w-full", className)}
      style={{
        maxWidth: "var(--page-max)",
        paddingInline: "var(--page-edge)",
      }}
    >
      {children}
    </div>
  );
}

/**
 * Дванадцять наскрізних вертикальних ліній, кожна третя — пунктирна.
 * Вони проходять і крізь порожні зони: це кістяк аркуша, а не межі таблиці,
 * тому контраст мінімальний (`--rule-faint`).
 *
 * Лінії вирівняні по тому ж контейнеру, що й контент, інакше сітка
 * розійшлася б із набором.
 */
function GridRules() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div
        className="mx-auto h-full w-full"
        style={{
          maxWidth: "var(--page-max)",
          paddingInline: "var(--page-edge)",
        }}
      >
        <div className="grid h-full grid-cols-4 md:grid-cols-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "border-l border-rule-faint",
                i % 3 === 2 && "border-dashed",
                i >= 4 && "hidden md:block",
                // Права крайня лінія: на вузькому екрані видно перші чотири.
                i === 3 && "border-r md:border-r-0",
                i === 11 && "md:border-r",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
