import { SectionHeading } from "@/components/ui/section-heading";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/** Три теми нотаток, підписані доменом — рядки, а не картки. */
export function InsightsTeaser({
  insights,
}: {
  insights: HomeContent["insights"];
}) {
  return (
    <Zone tone="paper" pad="md" id="insights">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={insights.marker}
          title={insights.heading}
          description={insights.description}
          className="sheet-main"
        />
        <ul className="sheet-main">
          {insights.topics.map((topic) => (
            <li
              key={topic.title}
              className="border-rule grid grid-cols-8 items-baseline border-b py-7"
            >
              <span className="label-micro text-marker col-span-2 pr-8">
                {topic.domain}
              </span>
              <h3 className="type-subtitle text-heading col-span-6">
                {topic.title}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </Zone>
  );
}
