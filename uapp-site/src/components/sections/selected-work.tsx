import { Button } from "@/components/ui/button";
import { MicroLabel } from "@/components/ui/micro-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import type { HomeContent } from "@/content/types";

export function SelectedWork({ work }: { work: HomeContent["selectedWork"] }) {
  return (
    <Section id="work" zone="quiet">
      <Container className="py-28">
        <SectionHeading index="03" title={work.heading} />

        {/* Картки розділені лініями сітки; остання комірка — CTA */}
        <div className="mt-16 grid grid-cols-3 border-t border-l border-rule">
          {work.cases.map((c, i) => (
            <article
              key={c.id}
              className="flex flex-col justify-between border-r border-b border-rule p-8"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <MicroLabel>{String(i + 1).padStart(2, "0")}</MicroLabel>
                  <MicroLabel className="text-right">
                    {work.ndaBadge}
                  </MicroLabel>
                </div>
                <h3 className="mt-8 font-head text-subtitle">
                  {c.clientProfile}
                </h3>
                <p className="mt-3 text-sm text-muted-foreground">
                  {c.domainLine}
                </p>
              </div>
              <p className="mt-10 border-t border-rule pt-5 text-sm font-medium text-heading">
                {c.factAnchor}
              </p>
            </article>
          ))}
          <div className="col-span-3 flex items-center justify-between gap-8 border-r border-b border-rule p-8">
            <p className="text-subtitle text-heading">{work.ctaCard.note}</p>
            <Button asChild variant="pill" size="lg">
              <a href="#contact">{work.ctaCard.cta}</a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
