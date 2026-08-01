import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/band";
import { MetricRow } from "@/components/ui/metric-stat";
import { MicroLabel } from "@/components/ui/annotation";
import { HeroVisual } from "@/components/hero-animation";
import type { HomeContent } from "@/content/types";

/**
 * Перший екран — теза, а не шапка.
 *
 * Структурна зміна проти рекомендованого потоку брифу §6: метрики довіри
 * закривають цю ж смугу підвальним правилом замість того, щоб їхати окремою
 * trust-смугою нижче. Бриф називає свій потік «рекомендованим базовим», а два
 * майже однакові набори цифр підряд читалися як повтор, а не як доказ.
 */
export function Hero({
  hero,
  trustNote,
}: {
  hero: HomeContent["hero"];
  trustNote: string;
}) {
  return (
    <Container>
      <div className="grid grid-cols-1 items-start gap-x-8 gap-y-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h1 className="max-w-[14ch] font-head text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-normal tracking-[-0.03em] text-balance text-heading">
            {hero.h1}
          </h1>

          <p className="mt-8 max-w-[46ch] border-t border-rule pt-8 text-[0.9375rem] leading-[1.65] text-muted-foreground">
            {hero.sub}
          </p>

          <div
            id="hero-cta"
            className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4"
          >
            <Button asChild variant="pill" size="pill">
              <a href="#contact">{hero.ctaPrimary}</a>
            </Button>
            <Button asChild variant="quiet" size="quiet">
              <a href="#work">{hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>

        {/* Схема займає дві третини — вона і є доказ, а не ілюстрація до нього. */}
        <div className="lg:col-span-7">
          <HeroVisual />
        </div>
      </div>

      <MetricRow metrics={hero.metrics} className="mt-16" />
      <MicroLabel className="mt-6 block">{trustNote}</MicroLabel>
    </Container>
  );
}
