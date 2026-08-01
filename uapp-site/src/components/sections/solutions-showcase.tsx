"use client";

import { useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/band";
import { IsoSchematic } from "@/components/ui/iso-schematic";
import { MicroLabel } from "@/components/ui/annotation";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Інтерактивні таби — вимога брифу (§8: «інтерактивні таби/картки, не
 * авто-слайдер»). Реалізовані вручну, а не стоковим примітивом: активний
 * стан має **переїжджати** підкресленням, а не перемикатися стрибком, і
 * мітка двочастинна — номер зверху, назва знизу.
 *
 * Клавіатура: стрілками між табами, як вимагає патерн WAI-ARIA Tabs.
 */
export function SolutionsShowcase({
  solutions,
}: {
  solutions: HomeContent["solutions"];
}) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cards = solutions.cards;

  function onKeyDown(e: React.KeyboardEvent) {
    const delta =
      e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : e.key === "Home" ? -active : e.key === "End" ? cards.length - 1 - active : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (active + delta + cards.length) % cards.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Container>
      <SectionHeading title={solutions.heading} className="mb-14" />

      <div
        role="tablist"
        aria-label={solutions.heading}
        onKeyDown={onKeyDown}
        className="relative grid grid-cols-2 border-t border-rule md:grid-cols-4"
      >
        {cards.map((card, i) => (
          <button
            key={card.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${i}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${i}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            className={cn(
              "group relative flex flex-col items-start gap-2 border-rule px-5 py-6 text-left",
              "border-l first:border-l-0 md:first:border-l-0",
              i === 2 && "border-l-0 md:border-l",
              i >= 2 && "border-t md:border-t-0",
              "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
              i === active &&
                "before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:bg-primary md:before:hidden",
            )}
          >
            <span className="flex w-full items-center justify-between gap-3">
              <MicroLabel tone={i === active ? "accent" : "muted"}>
                {String(i + 1).padStart(2, "0")}
              </MicroLabel>
              {card.flagship ? (
                <MicroLabel tone="accent">Flagship</MicroLabel>
              ) : null}
            </span>
            <span
              className={cn(
                "font-head text-[1.0625rem] leading-[1.25] font-medium tracking-[-0.01em] transition-colors",
                i === active ? "text-heading" : "text-muted-foreground",
              )}
            >
              {card.title}
            </span>
          </button>
        ))}

        {/* Підкреслення, що переїжджає — лише на широкому екрані, де таби
            стоять одним рядом. На двох рядах нижня смужка вказувала б не на
            той таб, тому там активність несе акцентна мітка й верхнє правило
            самої комірки. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-px left-0 hidden h-0.5 w-1/4 bg-primary transition-transform duration-(--duration-state) ease-mech md:block"
          style={{ transform: `translateX(${active * 100}%)` }}
        />
      </div>

      {cards.map((card, i) => (
        <div
          key={card.id}
          role="tabpanel"
          id={`${baseId}-panel-${i}`}
          aria-labelledby={`${baseId}-tab-${i}`}
          hidden={i !== active}
          className="border-t border-rule pt-12"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="max-w-[46ch] font-head text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.15] font-normal tracking-[-0.02em] text-balance text-heading">
                {card.problem}
              </p>
              <p className="mt-8 border-t border-rule pt-6">
                <MicroLabel>{card.audience}</MicroLabel>
              </p>
              {/* Мітка мусить називати справжній наслідок кліку: сторінок
                  продуктів не існує, лінк веде на форму — тож не «Explore»,
                  а розмова про продукт. */}
              <Button asChild variant="quiet" size="quiet" className="mt-8">
                <a href="#contact">Ask about {card.title}</a>
              </Button>
            </div>
            {/* Кожен продукт має власне креслення з підлогою, одним заливним
                об'єктом і підписами — раніше три з чотирьох малювали той
                самий куб без жодної анотації. */}
            <div className="lg:col-span-5">
              <IsoSchematic id={card.id} />
            </div>
          </div>
        </div>
      ))}
    </Container>
  );
}
