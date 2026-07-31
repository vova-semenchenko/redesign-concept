"use client";

import { Button } from "@/components/ui/button";
import { Marker, MarkerPair } from "@/components/ui/marker";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

/**
 * Продуктовий блок на темній зоні: ряд плоских табів, поділених
 * вертикальними хейрлайнами, з акцентним підкресленням, що переїжджає.
 * Мітка таба двочастинна — дія зверху, продукт знизу.
 */
export function SolutionsShowcase({
  solutions,
}: {
  solutions: HomeContent["solutions"];
}) {
  return (
    <Zone tone="ink" pad="lg" id="solutions">
      <div className="sheet-grid gap-y-14">
        <SectionHeading
          marker={solutions.marker}
          title={solutions.heading}
          className="sheet-main"
        />

        <Tabs defaultValue={solutions.cards[0].id} className="sheet-main">
          <TabsList>
            {solutions.cards.map((card) => (
              <TabsTrigger key={card.id} value={card.id}>
                <MarkerPair action={card.action} object={card.title} />
              </TabsTrigger>
            ))}
          </TabsList>

          {solutions.cards.map((card) => (
            <TabsContent
              key={card.id}
              value={card.id}
              className="grid grid-cols-8 gap-y-10 pt-14"
            >
              <div className="col-span-5 flex flex-col gap-6 pr-10">
                <div className="flex items-center gap-4">
                  <Marker tick={card.flagship}>{card.audience}</Marker>
                  {card.flagship ? (
                    <Marker className="text-accent-quiet">Flagship</Marker>
                  ) : null}
                </div>
                <p className="type-statement text-heading max-w-[34ch]">
                  {card.problem}
                </p>
                <div>
                  <Button asChild variant="quiet" size="sm">
                    <a href="#contact">Explore {card.title}</a>
                  </Button>
                </div>
              </div>

              <ul className="col-start-7 col-end-9 flex flex-col">
                {card.standards.map((standard) => (
                  <li
                    key={standard}
                    className="border-rule label-micro text-marker border-b py-4 first:border-t"
                  >
                    {standard}
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Zone>
  );
}
