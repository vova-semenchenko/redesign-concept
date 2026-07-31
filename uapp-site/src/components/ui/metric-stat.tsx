import { cn } from "@/lib/utils";

/**
 * Рядок метрик, поділений вертикальними лініями сітки.
 *
 * Значення стоять на спільній базовій лінії незалежно від того, скільки
 * рядків займе підпис: зовнішній `dl` задає дві доріжки, кожна комірка
 * успадковує їх через `grid-rows-subgrid`. DOM лишається `dt` → `dd`
 * (правильний порядок для скрінрідера), а `row-start` міняє їх місцями
 * для ока. Без subgrid значення все одно тримаються верху комірки.
 *
 * Цифра без коментаря сильніша за цифру з коментарем — ніякої картки,
 * іконки чи відсотка, якого метрика не заробила.
 */
export function MetricRow({
  metrics,
  className,
}: {
  metrics: ReadonlyArray<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "divide-rule grid grid-cols-4 grid-rows-[auto_auto] divide-x",
        className,
      )}
    >
      {metrics.map((metric) => (
        <div
          key={metric.label}
          className="row-span-2 grid grid-rows-subgrid gap-2.5 px-6 first:pl-0 last:pr-0"
        >
          <dt className="label-micro text-marker row-start-2">
            {metric.label}
          </dt>
          <dd className="type-metric text-heading row-start-1">
            {metric.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
