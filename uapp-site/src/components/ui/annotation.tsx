import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Шар інженерної анотації.
 *
 * Це не «eyebrow над кожною секцією» — така граматика була б випадковою.
 * MicroLabel має рівно чотири роботи: підпис на схемі, підпис під цифрою,
 * запис у ключі креслення та мітка в навігації. Над заголовком смуги він
 * не ставиться.
 */
export function MicroLabel({
  children,
  as: Tag = "span",
  tone = "muted",
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  tone?: "muted" | "ink" | "accent";
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "font-body text-[0.6875rem] leading-[1.2] font-medium tracking-[0.08em] uppercase",
        tone === "muted" && "text-muted-foreground",
        tone === "ink" && "text-heading",
        // На темному ґрунті акцент як ТЕКСТ дає 2.4:1 — це рівно те, що
        // забороняє The Never-Text Rule. Там світлішаємо до ultramarine/400.
        tone === "accent" && "text-primary dark:text-accent",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * Нумерований чип. Ставиться тільки там, де номер справді до чогось
 * веде — запис ключа, до якого йде лідер-лінія, або таб. Порядкова
 * нумерація секцій «просто щоб було» тут заборонена.
 */
export function IndexChip({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-w-[1.6em] items-center justify-center bg-heading px-[0.35em] py-[0.1em]",
        // Розмір — задокументований label-регістр (DESIGN.md, chip-index);
        // компактність дає padding, а не окремий крок шкали.
        "font-body text-[0.6875rem] leading-[1.3] font-medium tracking-[0.08em] text-background",
        className,
      )}
      style={{ borderRadius: "var(--chip)" }}
    >
      {children}
    </span>
  );
}

/**
 * Хейрлайн-правило як самостійний елемент композиції — там, де межу треба
 * провести всередині смуги, а не між смугами.
 */
export function Rule({ className }: { className?: string }) {
  return <hr className={cn("border-0 border-t border-rule", className)} />;
}
