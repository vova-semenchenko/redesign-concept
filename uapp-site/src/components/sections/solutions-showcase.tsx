"use client";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HomeContent } from "@/content/types";

export function SolutionsShowcase({
  solutions,
}: {
  solutions: HomeContent["solutions"];
}) {
  return (
    <section id="solutions" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={solutions.heading} />
      <Tabs defaultValue={solutions.cards[0].id} className="mt-10">
        <TabsList>
          {solutions.cards.map((card) => (
            <TabsTrigger key={card.id} value={card.id}>
              {card.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {solutions.cards.map((card) => (
          <TabsContent key={card.id} value={card.id} className="mt-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              {card.flagship ? <Badge>Flagship</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {card.audience}
            </p>
            <p className="mt-3 max-w-2xl">{card.problem}</p>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
