import { cn } from "@/lib/utils";

import { MicroLabel } from "@/components/ui/annotation";

export interface MetricItem {
  value: string;
  label: string;
}

/**
 * Цифри як заголовковий матеріал, а не як дрібний службовий текст: значення
 * набирається у figure-регістрі, підпис — мікро-міткою під ним, колонки
 * розділені вертикальними хейрлайнами.
 *
 * `data-figure` вмикає табулярні цифри — без них «170+» і «$1B+» не стають
 * у колонку (globals.css).
 */
export function MetricRow({
  metrics,
  className,
}: {
  metrics: MetricItem[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 border-t border-rule md:grid-cols-4",
        className,
      )}
    >
      {metrics.map((m, i) => (
        <div
          key={m.label}
          className={cn(
            "border-rule py-6 pr-6 pl-6 first:pl-0",
            // Ліва лінія розділяє колонки; на двох колонках вона потрібна
            // лише парним, інакше з'явиться зайва межа біля поля сторінки.
            i % 2 === 1 && "border-l",
            i % 2 === 0 && "md:border-l",
            i === 0 && "md:border-l-0",
            i >= 2 && "border-t md:border-t-0",
          )}
        >
          <dt
            data-figure
            className="font-head text-[clamp(2rem,4vw,3.5rem)] leading-none font-normal tracking-[-0.02em] text-heading"
          >
            {m.value}
          </dt>
          <MicroLabel as="dd" className="mt-3 block">
            {m.label}
          </MicroLabel>
        </div>
      ))}
    </dl>
  );
}
