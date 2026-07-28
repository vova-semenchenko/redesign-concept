import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={team.heading} description={team.description} />
    </section>
  );
}
