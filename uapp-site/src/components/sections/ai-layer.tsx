import { Marker } from "@/components/ui/marker";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Найвищий ризик порожніх слів на сторінці, тому блок мінімальний:
 * мандатне твердження, а під ним — самі шари, у які воно розкладається,
 * рядками на лініях. Жодного епітета, який не називає місце в процесі.
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
          <ul className="border-rule grid grid-cols-8 border-t">
            {ai.layers.map((layer) => (
              <li
                key={layer}
                className="border-rule type-caption text-foreground col-span-2 border-r border-b px-6 py-7 first:pl-0 last:border-r-0"
              >
                {layer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Zone>
  );
}
