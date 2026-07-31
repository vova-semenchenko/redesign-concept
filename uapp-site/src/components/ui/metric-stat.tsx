import { cn } from "@/lib/utils";

/**
 * Цифра без коментаря сильніша за цифру з коментарем: значення великим
 * світлим накресленням із табличними цифрами, підпис — 11px під ним.
 * Ніякої картки, іконки чи відсотка, якого метрика не заробила.
 */
export function MetricStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col-reverse gap-3", className)}>
      <dt className="label-micro text-marker">{label}</dt>
      <dd className="type-metric text-heading">{value}</dd>
    </div>
  );
}

/** Рядок метрик, поділений вертикальними лініями сітки. */
export function MetricRow({
  metrics,
  className,
}: {
  metrics: ReadonlyArray<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <dl className={cn("divide-rule grid grid-cols-4 divide-x", className)}>
      {metrics.map((metric) => (
        <MetricStat
          key={metric.label}
          value={metric.value}
          label={metric.label}
          className="px-8 first:pl-0"
        />
      ))}
    </dl>
  );
}
