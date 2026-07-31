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
 * Рамку тримають самі тики, а не суцільний бордер по тому ж контуру:
 * повна рамка з'їдала їх і залишала звичайну білу картку. `--tick`
 * прив'язує їх до палітри вікна, бо лінія зони на білому не видима.
 *
 * `frame="open"` drops the outer white rectangle: the wrapper carries no
 * background, no border, no corner ticks — it exists only to sit next to
 * a built surface elsewhere in the composition (see hero-visual.tsx's
 * `Shore`, which draws its own `corner-ticks` on just the white side).
 * Framing an object with no visible edge floats the marks in empty
 * space, so `open` mode never applies them here.
 *
 * Уся робота клієнта під NDA, тому будь-який інтерфейсний матеріал тут —
 * схема, а не скріншот, і підпис це називає прямо.
 */
export function SchematicWindow({
  caption,
  note,
  frame = "solid",
  className,
  children,
  ...props
}: React.ComponentProps<"figure"> & {
  caption: string;
  note?: string;
  frame?: "solid" | "open";
}) {
  return (
    <figure className={cn("flex flex-col gap-3", className)} {...props}>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
        <Marker tick>{caption}</Marker>
        {note ? <Marker className="text-marker/70">{note}</Marker> : null}
      </div>
      <div
        className={cn(
          "relative",
          frame === "solid" &&
            "corner-ticks bg-window text-window-foreground [--tick:var(--color-window-rule-strong)]",
        )}
      >
        {children}
      </div>
    </figure>
  );
}
