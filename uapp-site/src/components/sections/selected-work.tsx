import { Marker } from "@/components/ui/marker";
import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Шість комірок аркуша, розділених його ж лініями, а не власними рамками.
 * Стриманість NDA тут — сама подача: профіль клієнта замість імені,
 * рейка й стандарт замість скріншота, один факт унизу комірки.
 */
export function SelectedWork({ work }: { work: HomeContent["selectedWork"] }) {
  return (
    <Zone tone="paper" pad="md" id="work">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={work.marker}
          title={work.heading}
          description={work.description}
          className="sheet-main"
        />

        <ul className="border-rule sheet-main grid grid-cols-8 border-t">
          {work.cases.map((item) => (
            <li
              key={item.id}
              className="border-rule hover:border-rule-strong group col-span-4 flex flex-col gap-5 border-r border-b px-8 pt-9 pb-10 transition-colors duration-[var(--dur-state)] [&:nth-child(even)]:border-r-0 [&:nth-child(even)]:pr-0 [&:nth-child(odd)]:pl-0"
            >
              <Marker>{work.ndaBadge}</Marker>
              <h3 className="type-subtitle text-heading">
                {item.clientProfile}
              </h3>
              <p className="type-body text-foreground flex-1">
                {item.domainLine}
              </p>
              <p className="border-rule group-hover:border-rule-strong text-heading type-caption border-t pt-4 font-medium transition-colors duration-[var(--dur-state)]">
                {item.factAnchor}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Zone>
  );
}
