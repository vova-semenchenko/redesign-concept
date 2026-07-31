import { Marker } from "@/components/ui/marker";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Текстова пауза після щільного героя: одне мандатне твердження на весь
 * аркуш, без опису під ним. Мітка живе в лівій порожній колонці — там,
 * де на кресленні підписують вид.
 */
export function PositioningBand({
  band,
}: {
  band: HomeContent["positioningBand"];
}) {
  return (
    <Zone tone="paper" pad="lg">
      <div className="sheet-grid gap-y-10">
        <div className="sheet-edge-start">
          <Marker tick>{band.marker}</Marker>
        </div>
        <div className="sheet-main grid grid-cols-8 gap-y-8">
          <p className="type-headline text-heading col-span-8 max-w-[18ch]">
            {band.statement}
          </p>
          <p className="type-lead text-foreground col-span-5 col-start-3 pr-8">
            {band.detail}
          </p>
        </div>
      </div>
    </Zone>
  );
}
