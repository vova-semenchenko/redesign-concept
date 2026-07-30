import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function ExpertiseGrid({
  expertise,
}: {
  expertise: HomeContent["expertise"];
}) {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={expertise.heading} />
      <div className="mt-10 grid grid-cols-4 gap-6">
        {expertise.cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {card.standards.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
