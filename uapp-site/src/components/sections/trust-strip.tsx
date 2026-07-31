import { Marker } from "@/components/ui/marker";
import { MetricRow } from "@/components/ui/metric-stat";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/** Смуга доказів одразу під героєм: самі цифри, без коментаря. */
export function TrustStrip({ trust }: { trust: HomeContent["trust"] }) {
  return (
    <Zone tone="ink" pad="band">
      <div className="sheet-grid items-end gap-y-8">
        <div className="col-span-2">
          <Marker>{trust.marker}</Marker>
        </div>
        <MetricRow metrics={trust.metrics} className="col-start-3 col-end-11" />
        <p className="label-micro text-marker col-start-11 col-end-13 min-w-0 pl-8 text-balance">
          {trust.certificationsNote}
        </p>
      </div>
    </Zone>
  );
}
