import { Marker } from "@/components/ui/marker";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Найвищий ризик порожніх слів на сторінці, тому блок мінімальний:
 * мандатне твердження на весь аркуш і чесно позначена прогалина —
 * перелік сертифікацій ще не наданий, і пунктир каже це прямо.
 */
export function AiLayer({ ai }: { ai: HomeContent["aiLayer"] }) {
  return (
    <Zone tone="ink" pad="md">
      <div className="sheet-grid gap-y-12">
        <div className="sheet-edge-start">
          <Marker tick>{ai.marker}</Marker>
        </div>
        <div className="sheet-main flex flex-col gap-10">
          <h2 className="type-title">{ai.heading}</h2>
          <p className="type-statement text-foreground max-w-[40ch]">
            {ai.statement}
          </p>
          <p className="border-rule-strong label-micro text-marker w-fit border border-dashed px-4 py-3">
            {ai.certificationsNote}
          </p>
        </div>
      </div>
    </Zone>
  );
}
