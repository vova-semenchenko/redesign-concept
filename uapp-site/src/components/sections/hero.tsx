import { Button } from "@/components/ui/button";
import { MetricStat } from "@/components/ui/metric-stat";
import { HeroVisual } from "@/hero-animation";
import type { HomeContent } from "@/content/types";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="max-w-3xl text-5xl font-bold">{hero.h1}</h1>
      <p className="mt-6 max-w-2xl text-lg">{hero.sub}</p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg">
          <a href="#contact">{hero.ctaPrimary}</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#work">{hero.ctaSecondary}</a>
        </Button>
      </div>
      <HeroVisual className="mt-12" />
      <dl className="mt-12 grid grid-cols-4 gap-8">
        {hero.metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
      </dl>
    </section>
  );
}
