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
    // Ховаємось і біля hero-кнопки, і біля форми: у фінальній смузі сабміт —
    // це та сама дія тим самим текстом, і дві пігулки в екрані знову були б
    // перевитратою акценту.
    const anchors = ["hero-cta", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (anchors.length === 0) {
      // Хедер без цих орієнтирів: показуємо CTA одразу після першого кадру.
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
        );
        setShown(visible.size === 0);
      },
      { rootMargin: "-72px 0px 0px 0px" },
    );
    anchors.forEach((a) => io.observe(a));
    return () => io.disconnect();
  }, []);

  return (
    <Button
      asChild
      variant="pill"
      size="pill"
      // Мітка мандатна й скороченню не підлягає, тож на вузькому екрані
      // стискаються поля кнопки, а не текст.
      // Нижче lg кнопки в шапці немає взагалі: прихована прозорістю, вона
      // все одно займала б місце й виштовхувала розкриття за край екрана.
      // Там головна дія живе всередині розкритого меню.
      className={`hidden shrink-0 px-5 transition-opacity duration-(--duration-state) ease-mech lg:inline-flex sm:px-7 ${
        shown ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      aria-hidden={!shown}
      tabIndex={shown ? undefined : -1}
    >
      <a href="#contact">{label}</a>
    </Button>
  );
}
