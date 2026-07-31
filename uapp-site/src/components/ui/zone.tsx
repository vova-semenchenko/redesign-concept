import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Zone — одна смуга аркуша.
 *
 * Дві поверхні: `paper` (світла) і `ink` (темна, вмикає скоуп `.dark`).
 * Кожна зона сама малює конструкційні лінії — геометрія в них однакова,
 * тому вертикалі читаються наскрізними через усю сторінку, включно з
 * порожніми ділянками. Зона завжди закінчується хейрлайном, ніколи —
 * розмиттям.
 */

const padding = {
  lg: "py-32",
  md: "py-24",
  band: "py-14",
  flush: "py-0",
} as const;

interface ZoneProps extends React.ComponentProps<"section"> {
  tone?: "paper" | "ink";
  pad?: keyof typeof padding;
  rules?: boolean;
  divider?: boolean;
}

export function Zone({
  tone = "paper",
  pad = "lg",
  rules = true,
  divider = true,
  className,
  children,
  ...props
}: ZoneProps) {
  return (
    <section
      data-tone={tone}
      className={cn(
        "relative isolate bg-background",
        tone === "ink" && "dark",
        padding[pad],
        divider && "border-b border-rule",
        className,
      )}
      {...props}
    >
      {rules ? (
        <div
          aria-hidden="true"
          className="sheet pointer-events-none absolute inset-0"
        >
          <div className="rules-v" />
        </div>
      ) : null}
      <div className="sheet relative">{children}</div>
    </section>
  );
}

/** 12-колонкова сітка аркуша. Контент за замовчуванням — колонки 3–10. */
export function Grid({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("sheet-grid", className)} {...props}>
      {children}
    </div>
  );
}
