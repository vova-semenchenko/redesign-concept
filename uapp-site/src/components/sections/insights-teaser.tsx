import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function InsightsTeaser({
  insights,
}: {
  insights: HomeContent["insights"];
}) {
  return (
    <Section id="insights" zone="light">
      <Container className="grid grid-cols-12 items-start gap-x-8 py-28">
        <SectionHeading
          index="07"
          title={insights.heading}
          className="col-span-7"
        />
        <p className="col-span-5 text-lead text-muted-foreground">
          {insights.description}
        </p>
      </Container>
    </Section>
  );
}
