"use client";

import { useState } from "react";

import { IsoIcon, type IsoIconName } from "@/components/ui/iso-icon";
import { Button } from "@/components/ui/button";
import { MicroLabel } from "@/components/ui/micro-label";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container, Section } from "@/components/ui/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HomeContent } from "@/content/types";

const icons: Record<string, IsoIconName> = {
  "embedded-crypto": "nodes",
  "iso20022-toolkit": "layers",
  "reconciliation-agent": "gate",
  "sca-signing": "shell",
};

export function SolutionsShowcase({
  solutions,
}: {
  solutions: HomeContent["solutions"];
}) {
  const [active, setActive] = useState(solutions.cards[0].id);
  const activeIndex = Math.max(
    0,
    solutions.cards.findIndex((c) => c.id === active),
  );
  const count = solutions.cards.length;

  return (
    <Section id="solutions" zone="dark">
      <Container className="py-28">
        <SectionHeading index="02" title={solutions.heading} />

        <Tabs value={active} onValueChange={setActive} className="mt-16">
          {/* Плоскі таби: без фонів і капсул, розділені вертикальними хейрлайнами */}
          <div className="relative border-y border-rule">
            <TabsList
              variant="line"
              className="grid h-auto! w-full gap-0 rounded-none p-0"
              style={{
                gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
              }}
            >
              {solutions.cards.map((card, i) => (
                <TabsTrigger
                  key={card.id}
                  value={card.id}
                  className={`h-auto flex-col items-start gap-2 rounded-none px-6 py-6 text-left whitespace-normal after:hidden data-active:bg-transparent data-active:text-heading dark:data-active:bg-transparent ${
                    i === 0 ? "" : "border-l border-rule"
                  }`}
                >
                  <MicroLabel>{String(i + 1).padStart(2, "0")}</MicroLabel>
                  <span className="font-head text-base leading-snug">
                    {card.title}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {/* Підкреслення переїжджає, а не перемикається стрибком */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px bg-heading transition-transform duration-state ease-mech"
              style={{
                width: `${100 / count}%`,
                transform: `translateX(${activeIndex * 100}%)`,
              }}
            />
          </div>

          {solutions.cards.map((card) => (
            <TabsContent
              key={card.id}
              value={card.id}
              className="grid grid-cols-12 items-start gap-x-8 pt-14"
            >
              <div className="col-span-7">
                <div className="flex items-center gap-4">
                  <h3 className="text-title">{card.title}</h3>
                  {card.flagship ? (
                    <MicroLabel tone="accent">Flagship</MicroLabel>
                  ) : null}
                </div>
                <MicroLabel as="p" className="mt-4">
                  {card.audience}
                </MicroLabel>
                <p className="mt-6 max-w-(--measure) text-lead text-muted-foreground">
                  {card.problem}
                </p>
                <Button variant="quiet" size="lg" className="mt-8">
                  Explore {card.title}
                </Button>
              </div>
              {/* Технічний контент в акуратному контейнері: пунктирна плита */}
              <div className="col-span-5 flex min-h-80 items-center justify-center border border-dashed border-rule bg-quiet">
                <IsoIcon
                  name={icons[card.id] ?? "layers"}
                  className="size-60 text-heading"
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
}
