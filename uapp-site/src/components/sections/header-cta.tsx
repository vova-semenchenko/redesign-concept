"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

/**
 * Липкий CTA хедера (бриф §6) з'являється лише тоді, коли головна кнопка
 * hero пішла з екрана.
 *
 * Причина не косметична: дві однакові пігулки в одному вікні — це рівно те,
 * що DESIGN.md називає перевитратою акценту (The Scarcity Rule). Кнопка в
 * хедері потрібна на всій довжині сторінки, але не в тому екрані, де вона
 * дублює саму себе.
 *
 * Стан ніколи не змінюється синхронно в тілі ефекту: і спостерігач, і
 * запасний шлях спрацьовують після паінту.
 */
export function HeaderCta({ label }: { label: string }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const anchor = document.getElementById("hero-cta");

    if (!anchor) {
      // Хедер без hero-кнопки: показуємо CTA одразу після першого кадру.
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(
      ([entry]) => setShown(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px" },
    );
    io.observe(anchor);
    return () => io.disconnect();
  }, []);

  return (
    <Button
      asChild
      variant="pill"
      size="pill"
      // Мітка мандатна й скороченню не підлягає, тож на вузькому екрані
      // стискаються поля кнопки, а не текст.
      className={`shrink-0 px-5 transition-opacity duration-(--duration-state) ease-mech sm:px-7 ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
    >
      <a href="#contact">{label}</a>
    </Button>
  );
}
