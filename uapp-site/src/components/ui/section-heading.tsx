import { cn } from "@/lib/utils";
import { Marker } from "@/components/ui/marker";
import { Rule } from "@/components/ui/rule";

interface SectionHeadingProps {
  /** Мітка регіону: «об'єкт · величина», а не декоративний eyebrow. */
  marker: string;
  title: string;
  /** Приглушений опис праворуч — другий і останній рівень тексту в блоці. */
  description?: string;
  className?: string;
}

/**
 * Заголовок секції як заголовок виду на кресленні: мітка регіону,
 * твердження, і — коли є що додати — приглушений опис у правій половині.
 * Закінчується лінією, з якої починається вміст.
 */
export function SectionHeading({
  marker,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("flex flex-col gap-8", className)}>
      <Marker>{marker}</Marker>
      <div className="grid grid-cols-8 items-end gap-y-6">
        <h2 className="type-title col-span-5 pr-8">{title}</h2>
        {description ? (
          <p className="type-body text-muted-foreground col-span-3 pr-8">
            {description}
          </p>
        ) : null}
      </div>
      <Rule />
    </header>
  );
}
