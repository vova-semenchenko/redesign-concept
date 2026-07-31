import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/** Три стовпи, розділені вертикальними лініями сітки. */
export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  return (
    <Zone tone="paper" pad="md">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={approach.marker}
          title={approach.heading}
          className="sheet-main"
        />
        <ul className="divide-rule sheet-main grid grid-cols-3 divide-x">
          {approach.pillars.map((pillar) => (
            <li
              key={pillar.title}
              className="flex flex-col gap-4 px-8 first:pl-0"
            >
              <h3 className="type-subtitle text-heading">{pillar.title}</h3>
              <p className="type-body text-muted-foreground">
                {pillar.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Zone>
  );
}
