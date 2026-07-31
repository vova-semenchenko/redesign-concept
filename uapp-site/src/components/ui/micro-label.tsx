import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Мікротипографіка блюпринта: мітки, номери, підписи на схемах.
 * Дуже дрібний UPPERCASE з розрідженим трекінгом — за розд. 4 стилістики.
 */
export function MicroLabel({
  as: Tag = "span",
  tone = "muted",
  className,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  as?: "span" | "p" | "div" | "dt" | "li";
  tone?: "muted" | "strong" | "accent";
}) {
  return (
    <Tag
      data-slot="micro-label"
      className={cn(
        "text-micro font-medium uppercase",
        tone === "muted" && "text-muted-foreground",
        tone === "strong" && "text-heading",
        tone === "accent" && "text-accent",
        className,
      )}
      {...props}
    />
  );
}

/** Дрібний інвертований чип із номером — нумерація рядків, вузлів, стовпів. */
export function IndexChip({
  value,
  className,
}: {
  value: number | string;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-slot="micro-label"
      className={cn(
        "inline-flex h-5 min-w-5 items-center justify-center bg-heading px-1 text-micro font-medium text-background",
        className,
      )}
    >
      {typeof value === "number" ? String(value).padStart(2, "0") : value}
    </span>
  );
}
