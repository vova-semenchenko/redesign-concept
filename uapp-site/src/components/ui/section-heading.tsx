import { cn } from "@/lib/utils";
import { MicroLabel } from "@/components/ui/micro-label";

interface SectionHeadingProps {
  /** Номер секції — дрібна мітка над заголовком (мікротипографіка блюпринта). */
  index?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  /** Крапка в кінці заголовка — стилістичний маркер твердження. */
  period?: boolean;
  align?: "start" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  period = true,
  align = "start",
  className,
}: SectionHeadingProps) {
  const dotted = period && !/[.?!]$/.test(title) ? `${title}.` : title;

  return (
    <div
      className={cn(
        align === "center" && "mx-auto max-w-(--measure) text-center",
        className,
      )}
    >
      {index || eyebrow ? (
        <div
          className={cn(
            "flex items-center gap-3",
            align === "center" && "justify-center",
          )}
        >
          {index ? <MicroLabel>{index}</MicroLabel> : null}
          <span aria-hidden="true" className="h-px w-8 bg-rule" />
          {eyebrow ? <MicroLabel>{eyebrow}</MicroLabel> : null}
        </div>
      ) : null}
      <h2 className={cn("text-title", (index || eyebrow) && "mt-5")}>
        {dotted}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-5 max-w-(--measure) text-lead text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
