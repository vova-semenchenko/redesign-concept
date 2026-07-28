import { MetricStat } from "@/components/ui/metric-stat";
import type { HomeContent } from "@/content/types";

export function TrustStrip({ trust }: { trust: HomeContent["trust"] }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-10">
        {trust.metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
        <p className="text-sm text-muted-foreground">{trust.certificationsNote}</p>
      </div>
    </section>
  );
}
