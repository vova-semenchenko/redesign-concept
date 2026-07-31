import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <Section id="team" zone="quiet">
      {/* Двоколонковий рядок: твердження ліворуч, приглушений опис праворуч */}
      <Container className="grid grid-cols-12 items-start gap-x-8 py-28">
        <SectionHeading
          index="06"
          title={team.heading}
          className="col-span-7"
        />
        <p className="col-span-5 text-lead text-muted-foreground">
          {team.description}
        </p>
      </Container>
    </Section>
  );
}
