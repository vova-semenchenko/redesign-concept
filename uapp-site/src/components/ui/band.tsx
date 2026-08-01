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
