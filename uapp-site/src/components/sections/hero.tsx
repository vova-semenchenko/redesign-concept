import { Button } from "@/components/ui/button";
import { MetricRow } from "@/components/ui/metric-stat";
import { Container, Section } from "@/components/ui/section";
import { HeroVisual } from "@/components/hero-animation";
import type { HomeContent } from "@/content/types";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <Section id="top" zone="light" divider={false}>
      <Container className="grid grid-cols-12 items-center gap-x-8 pt-24">
        <div className="col-span-6">
          <h1 className="text-display">{hero.h1}</h1>
          <p className="mt-8 max-w-(--measure) text-lead text-muted-foreground">
            {hero.sub}
          </p>
          <div className="mt-10 flex items-center gap-4">
            <Button asChild variant="pill" size="hero">
              <a href="#contact">{hero.ctaPrimary}</a>
            </Button>
            <Button asChild variant="quiet" size="hero">
              <a href="#work">{hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>
        {/* Схема заїжджає в порожню бічну колонку — кадр обрізаний, не «в рамці» */}
        <div className="col-span-6 -mr-(--page-edge) pl-8">
          <HeroVisual />
        </div>
      </Container>
      <Container className="border-t border-rule py-12">
        <MetricRow metrics={hero.metrics} />
      </Container>
    </Section>
  );
}
