import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function InsightsTeaser({ insights }: { insights: HomeContent["insights"] }) {
  return (
    <section id="insights" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={insights.heading} description={insights.description} />
    </section>
  );
}
