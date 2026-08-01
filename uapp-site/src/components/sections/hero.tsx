import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/band";
import { IndexChip, MicroLabel } from "@/components/ui/annotation";
import { MetricRow } from "@/components/ui/metric-stat";
import { HeroVisual, HERO_KEY } from "@/components/hero-animation";
import type { HomeContent } from "@/content/types";

/**
 * Перший екран — теза, а не шапка.
 *
 * Дві структурні зміни проти рекомендованого потоку брифу §6:
 *
 * — Метрики довіри закривають цю ж смугу підвальним правилом замість окремої
 *   trust-смуги нижче: два майже однакові набори тих самих цифр підряд
 *   читалися як повтор, а не як доказ.
 * — На вузькому екрані схема піднімається ВИЩЕ підзаголовка й кнопок. Бриф §7
 *   вимагає «вау»-ефект на першому екрані, а в мобільному стеку заголовок +
 *   абзац + дві кнопки зіштовхували схему за згин, де вона встигала догратися
 *   до того, як її взагалі побачать.
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
      <div className="flex flex-col gap-x-8 gap-y-12 lg:grid lg:grid-cols-12 lg:items-start">
        <h1 className="max-w-[14ch] font-head text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.95] font-normal tracking-[-0.03em] text-balance text-heading lg:col-span-5 lg:row-start-1">
          {hero.h1}
        </h1>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
          <HeroVisual />

          {/* Ключ креслення: літера в схемі й літера тут — одна адреса.
              Слова живуть у HTML, бо всередині viewBox вони стискалися б
              до ~5px на вузькому екрані. */}
          <ol className="mt-6 grid grid-cols-2 border-t border-rule sm:grid-cols-4">
            {HERO_KEY.map((k, i) => (
              <li
                key={k.mark}
                className={`hero-key-row flex items-center gap-3 border-rule py-4 ${
                  i % 2 === 1 ? "border-l pl-4" : ""
                } ${i >= 2 ? "border-t sm:border-t-0" : ""} ${
                  i > 0 ? "sm:border-l sm:pl-4" : ""
                }`}
                style={{ animationDelay: k.delay }}
              >
                <IndexChip>{k.mark}</IndexChip>
                <MicroLabel>{k.label}</MicroLabel>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-5 lg:row-start-2">
          <p className="max-w-[46ch] border-t border-rule pt-8 text-[0.9375rem] leading-[1.65] text-muted-foreground">
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
      </div>

      <MetricRow metrics={hero.metrics} className="mt-16" />
      <MicroLabel className="mt-6 block">{trustNote}</MicroLabel>
    </Container>
  );
}
