import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Заголовок смуги у двох регістрах шкали. Середніх розмірів у системі
 * майже немає: ієрархія тримається на розриві між display і мікро-міткою
 * (DESIGN.md, The Missing-Middle Rule).
 */
const sizeClass = {
  display:
    "text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.03em] text-balance",
  headline:
    "text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] tracking-[-0.02em] text-balance",
} as const;

/**
 * Крапка в кінці твердження — стилістичний маркер системи. Її додає
 * розмітка, а не редагування тексту: мандатний копірайт брифу лишається
 * недоторканим у content-шарі.
 */
function withFullStop(text: string) {
  return /[.!?:]$/.test(text.trim()) ? text : `${text}.`;
}

interface SectionHeadingProps {
  title: string;
  /** Вступний абзац під заголовком. */
  lead?: ReactNode;
  size?: keyof typeof sizeClass;
  as?: "h1" | "h2" | "h3";
  /** Не додавати крапку — для заголовків, які є питанням або назвою. */
  bare?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  lead,
  size = "headline",
  as: Tag = "h2",
  bare = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn(className)}>
      <Tag
        className={cn("max-w-[22ch] font-head font-normal", sizeClass[size])}
      >
        {bare ? title : withFullStop(title)}
      </Tag>
      {lead ? (
        <p className="mt-6 max-w-[60ch] text-[0.9375rem] leading-[1.65] text-muted-foreground">
          {lead}
        </p>
      ) : null}
    </div>
  );
}
