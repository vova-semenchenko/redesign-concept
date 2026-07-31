import { Button } from "@/components/ui/button";
import { Marker } from "@/components/ui/marker";
import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Чотири комірки на дві колонки — три причини і, замість четвертої,
 * дія. Поділ навпіл лягає рівно на середню конструкційну лінію, чого
 * три рівні колонки на восьмиколонковому аркуші дати не можуть.
 */
export function Approach({
  approach,
  cta,
}: {
  approach: HomeContent["approach"];
  cta: HomeContent["ctaStrip"];
}) {
  return (
    <Zone tone="paper" pad="md">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={approach.marker}
          title={approach.heading}
          className="sheet-main"
        />
        <ul className="border-rule sheet-main grid grid-cols-8 border-t">
          {approach.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="border-rule col-span-4 flex flex-col gap-4 border-r border-b px-8 py-10 [&:nth-child(even)]:border-r-0 [&:nth-child(even)]:pr-0 [&:nth-child(odd)]:pl-0"
            >
              <h3 className="type-subtitle text-heading">{pillar.title}</h3>
              <p className="type-body text-foreground max-w-[46ch]">
                {pillar.description}
              </p>
            </li>
          ))}
          <li className="border-rule col-span-4 flex flex-col items-start gap-6 border-b px-8 py-10 [&:nth-child(odd)]:pl-0">
            <Marker tick>{cta.statement}</Marker>
            <Button asChild size="sm">
              <a href="#contact">{cta.action}</a>
            </Button>
          </li>
        </ul>
      </div>
    </Zone>
  );
}
