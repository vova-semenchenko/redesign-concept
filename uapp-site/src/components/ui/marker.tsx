import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Marker — анотація на кресленні. Єдиний uppercase у системі:
 * 11px, трекінг 0.14em, приглушений колір зони. Формула тексту —
 * «об'єкт + величина» («EXPERTISE · 4 DOMAINS»), не декоративний eyebrow.
 *
 * `tick` додає дрібний акцентний індикатор — це один із небагатьох
 * дозволених виходів насиченого кольору (стайлгайд: акцент рідко).
 */
export function Marker({
  tick = false,
  className,
  children,
  ...props
}: React.ComponentProps<"p"> & { tick?: boolean }) {
  return (
    <p
      className={cn(
        "label-micro text-marker flex items-center gap-2",
        className,
      )}
      {...props}
    >
      {tick ? (
        <span
          aria-hidden="true"
          className="bg-primary inline-block size-[5px]"
        />
      ) : null}
      {children}
    </p>
  );
}

/** Двочастинна мітка: дія зверху, об'єкт знизу приглушено. Мова табів. */
export function MarkerPair({
  action,
  object,
  className,
}: {
  action: string;
  object: string;
  className?: string;
}) {
  return (
    <span
      className={cn("flex flex-col items-start gap-1.5 text-left", className)}
    >
      <span className="label-micro text-marker">{action}</span>
      <span className="type-subtitle text-heading">{object}</span>
    </span>
  );
}
