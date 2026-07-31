import { cn } from "@/lib/utils";
import { MicroLabel } from "@/components/ui/micro-label";

/**
 * Ізометрична схема пайплайна: вузли-куби на пунктирній напрямній,
 * останній — заливний акцентом (єдиний заливний об'єкт композиції).
 * Кут проєкції той самий, що в `IsoIcon` та hero-схемі.
 */
export function IsoPipeline({
  stages,
  className,
}: {
  stages: string[];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-0", className)} role="presentation">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`,
        }}
      >
        {stages.map((stage, i) => {
          const last = i === stages.length - 1;
          return (
            <div
              key={stage}
              className={cn(
                "relative flex flex-col items-center gap-6 px-4 pt-10",
                i === 0 ? "" : "border-l border-rule",
              )}
            >
              {/* пунктирна напрямна між вузлами */}
              {last ? null : (
                <span
                  aria-hidden="true"
                  className="absolute top-16 left-1/2 h-0 w-full border-t border-dashed border-rule"
                />
              )}
              <svg
                viewBox="0 0 48 34"
                aria-hidden="true"
                focusable="false"
                className={cn(
                  "relative size-14",
                  last ? "text-primary" : "text-heading",
                )}
              >
                <path
                  data-iso={last ? undefined : ""}
                  className={last ? "fill-primary" : undefined}
                  d="M24 4 L42 13 L24 22 L6 13 Z"
                />
                <path
                  data-iso={last ? undefined : ""}
                  className={last ? "fill-iso-face-left" : undefined}
                  d="M6 13 V22 L24 31 V22 Z"
                />
                <path
                  data-iso={last ? undefined : ""}
                  className={last ? "fill-iso-face-right" : undefined}
                  d="M42 13 V22 L24 31 V22 Z"
                />
              </svg>
              <MicroLabel
                as="div"
                tone={last ? "strong" : "muted"}
                className="pb-10 text-center"
              >
                {stage}
              </MicroLabel>
            </div>
          );
        })}
      </div>
    </div>
  );
}
