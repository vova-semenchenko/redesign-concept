import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { MicroLabel } from "@/components/ui/annotation";

/**
 * Основний контентний патерн системи: короткий термін ліворуч, пояснення
 * праворуч, хейрлайн між рядками. Читається як специфікація, а не як сітка
 * однакових карток — саме та відмова, на якій тримається світ.
 */
export function DefinitionList({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <dl className={cn("border-b border-rule", className)}>{children}</dl>;
}

interface DefinitionRowProps {
  term: string;
  children: ReactNode;
  /** Дрібні технічні мітки під поясненням — стандарти, протоколи, мережі. */
  tags?: string[];
  /** Слот під ізометричну іконку зліва від терміна. */
  mark?: ReactNode;
  className?: string;
}

export function DefinitionRow({
  term,
  children,
  tags,
  mark,
  className,
}: DefinitionRowProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-x-8 gap-y-4 border-t border-rule py-8",
        "md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
        className,
      )}
    >
      <dt className="flex items-start gap-4">
        {mark ? <span className="mt-0.5 shrink-0">{mark}</span> : null}
        <span className="font-head text-[1.125rem] leading-[1.3] font-medium tracking-[-0.01em] text-heading">
          {term}
        </span>
      </dt>
      <dd className="min-w-0">
        <p className="max-w-[60ch] text-[0.9375rem] leading-[1.65] text-muted-foreground">
          {children}
        </p>
        {tags?.length ? (
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {tags.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="inline-block size-[3px] bg-primary"
                />
                <MicroLabel>{t}</MicroLabel>
              </li>
            ))}
          </ul>
        ) : null}
      </dd>
    </div>
  );
}
