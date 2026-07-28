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

export function SelectedWork({ work }: { work: HomeContent["selectedWork"] }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={work.heading} />
      <div className="mt-10 grid grid-cols-3 gap-6">
        {work.cases.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <Badge variant="outline">{work.ndaBadge}</Badge>
              <CardTitle className="mt-3">{c.clientProfile}</CardTitle>
              <CardDescription>{c.domainLine}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-heading">{c.factAnchor}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
