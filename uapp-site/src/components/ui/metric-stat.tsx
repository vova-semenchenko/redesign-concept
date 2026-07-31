import { cn } from "@/lib/utils";
import { MicroLabel } from "@/components/ui/micro-label";
import type { Metric } from "@/content/types";

interface MetricStatProps {
  value: string;
  label: string;
  className?: string;
}

/** Велике значення зверху, дрібний приглушений підпис знизу. */
export function MetricStat({ value, label, className }: MetricStatProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <dt className="sr-only">{label}</dt>
      <dd
        data-slot="metric-value"
        className="font-head text-metric text-heading"
      >
        {value}
      </dd>
      <MicroLabel as="div" className="max-w-40">
        {label}
      </MicroLabel>
    </div>
  );
}

/** Колонки метрик, розділені вертикальними хейрлайнами (не відступами). */
export function MetricRow({
  metrics,
  className,
}: {
  metrics: Metric[];
  className?: string;
}) {
  return (
    <dl
      className={cn("grid", className)}
      style={{
        gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))`,
      }}
    >
      {metrics.map((m, i) => (
        <MetricStat
          key={m.label}
          value={m.value}
          label={m.label}
          className={cn("px-6", i === 0 ? "pl-0" : "border-l border-rule")}
        />
      ))}
    </dl>
  );
}
