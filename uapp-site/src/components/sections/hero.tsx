import { Button } from "@/components/ui/button";
import { Marker } from "@/components/ui/marker";
import { MetricStat } from "@/components/ui/metric-stat";
import { Rule } from "@/components/ui/rule";
import { Zone } from "@/components/ui/zone";
import { HeroVisual } from "@/components/hero-animation";
import type { HomeContent } from "@/content/types";

/**
 * Єдиний авторський момент сторінки: спершу згори вниз прокреслюються
 * конструкційні лінії, і вже в готову сітку сідає заголовок. Далі на
 * сторінці нічого не «з'являється» — рух живе тільки в станах.
 */
export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <Zone tone="ink" pad="lg" rules={false} className="overflow-hidden">
      <div
        aria-hidden="true"
        className="sheet pointer-events-none absolute inset-0"
      >
        <div className="rules-v draw-y" />
      </div>

      <div className="sheet-grid relative gap-y-16">
        <div className="sheet-main flex flex-col gap-8">
          <Marker className="settle" style={{ animationDelay: "240ms" }}>
            {hero.marker}
          </Marker>
          <h1
            className="type-display settle max-w-[16ch]"
            style={{ animationDelay: "320ms" }}
          >
            {hero.h1}
          </h1>
        </div>

        <div
          className="settle col-start-3 col-end-8 flex min-w-0 flex-col gap-10 pr-12"
          style={{ animationDelay: "440ms" }}
        >
          <p className="type-lead text-foreground">{hero.sub}</p>
          <div className="flex items-center gap-4">
            <Button asChild>
              <a href="#contact">{hero.ctaPrimary}</a>
            </Button>
            <Button asChild variant="quiet" size="sm">
              <a href="#work">{hero.ctaSecondary}</a>
            </Button>
          </div>
        </div>

        {/* Вікно свідомо виходить у праву порожню колонку — схема кадрується
            обрізано, як вклейка поверх аркуша, а не вписується в модуль */}
        <div
          className="settle col-start-8 col-end-13 min-w-0"
          style={{ animationDelay: "560ms" }}
        >
          <HeroVisual caption={hero.visualCaption} />
        </div>

        <div className="sheet-main flex flex-col gap-10">
          <Rule />
          <dl className="divide-rule grid grid-cols-4 divide-x">
            {hero.metrics.map((metric) => (
              <MetricStat
                key={metric.label}
                value={metric.value}
                label={metric.label}
                className="px-8 first:pl-0"
              />
            ))}
          </dl>
        </div>
      </div>
    </Zone>
  );
}
