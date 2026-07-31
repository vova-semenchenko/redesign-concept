import * as React from "react";
import { cn } from "@/lib/utils";
import { Marker } from "@/components/ui/marker";

/**
 * SchematicWindow — «вікно в продукт».
 *
 * Єдина поверхня в системі, якій дозволено бути чисто білою: тому вікно
 * читається як підсвічена панель і на світлій зоні, і на темній. Завжди
 * у світлій темі, завжди в рамці з кутовими тиками, завжди підписане.
 *
 * Уся робота клієнта під NDA, тому будь-який інтерфейсний матеріал тут —
 * схема, а не скріншот, і підпис це називає прямо.
 */
export function SchematicWindow({
  caption,
  note,
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & { caption: string; note?: string }) {
  return (
    <figure className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <Marker tick>{caption}</Marker>
        {note ? <Marker className="text-marker/70">{note}</Marker> : null}
      </div>
      <div className="corner-ticks bg-window text-window-foreground border-rule-strong relative border">
        {children}
      </div>
    </figure>
  );
}
