"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MicroLabel } from "@/components/ui/annotation";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

/**
 * Поле — не коробка, а базова лінія з міткою над нею: форма на кресленні.
 * Фокус потовщує лінію й фарбує її акцентом; жодного світіння.
 *
 * Помилка називає, що саме не так і як це полагодити, і показується після
 * виходу з поля, а не під час набору (voice-and-tone §4). Слова invalid /
 * incorrect заборонені.
 *
 * Бекенду немає навмисно: PRODUCT.md фіксує доставку лідів як поза обсягом
 * цієї ітерації. Сабміт лишається клієнтським — це прототип форми, не її
 * інтеграція.
 */
interface FieldProps {
  id: string;
  label: string;
  type?: "text" | "email";
  placeholder?: string;
  multiline?: boolean;
  error?: string;
  onBlur: (value: string) => void;
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  multiline,
  error,
  onBlur,
}: FieldProps) {
  const base = cn(
    "w-full border-0 border-b bg-transparent px-0 py-3 text-[0.9375rem] leading-[1.65] text-foreground",
    // Без прозорості: /70 давало 4.15:1, а placeholder несе єдиний зразок
    // формату на всій формі.
    "placeholder:text-muted-foreground",
    "transition-colors duration-(--duration-state) ease-mech",
    "focus:border-b-2 focus:pb-[11px] focus:outline-none",
    // Фокус на темному ґрунті: primary дав би 2.4:1 і провалив SC 1.4.11 —
    // а форма стоїть саме на темній смузі. `--accent` там світлішає до
    // ultramarine/400 (≈4.7:1), як уже роблять таби.
    error
      ? "border-destructive focus:border-destructive"
      : "border-rule focus:border-accent",
  );

  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-body text-[0.6875rem] leading-[1.2] font-medium tracking-[0.08em] text-muted-foreground uppercase"
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          required
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          className={cn(base, "resize-y")}
          onBlur={(e) => onBlur(e.target.value)}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          placeholder={placeholder}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={error ? true : undefined}
          className={base}
          onBlur={(e) => onBlur(e.target.value)}
        />
      )}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-[0.9375rem] leading-[1.65] text-destructive"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

type Errors = Partial<Record<"name" | "email" | "company" | "challenge", string>>;

export function FinalCta({ cta }: { cta: HomeContent["finalCta"] }) {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  function check(field: keyof Errors, value: string): string | undefined {
    const v = value.trim();
    if (field === "email") {
      if (!v) return "Add a work email so we can reply.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))
        return "Enter a work email, like name@company.com";
      return undefined;
    }
    if (!v) {
      if (field === "challenge")
        return "Tell us what you are building, in a line or two.";
      if (field === "company") return "Add the company you are writing from.";
      return "Add your name so we know who is writing.";
    }
    return undefined;
  }

  function onBlur(field: keyof Errors) {
    return (value: string) =>
      setErrors((prev) => ({ ...prev, [field]: check(field, value) }));
  }

  return (
    <div id="contact" className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeading title={cta.heading} size="display" />
          <ul className="mt-10 border-t border-rule">
            {cta.microcopy.map((line) => (
              <li key={line} className="border-b border-rule py-4">
                <MicroLabel>{line}</MicroLabel>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {submitted ? (
            <p
              role="status"
              className="max-w-[22ch] font-head text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.05] font-normal tracking-[-0.02em] text-balance text-heading"
            >
              {cta.successMessage}
            </p>
          ) : (
            <form
              noValidate
              className="flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const next: Errors = {};
                (["name", "email", "company", "challenge"] as const).forEach(
                  (f) => {
                    const msg = check(f, String(data.get(f) ?? ""));
                    if (msg) next[f] = msg;
                  },
                );
                setErrors(next);
                const firstBad = (
                  ["name", "email", "company", "challenge"] as const
                ).find((f) => next[f]);
                if (firstBad) {
                  // Без цього натискання кнопки нічого не змінює для того,
                  // хто не бачить екрана: фокус лишався б на сабміті.
                  document.getElementById(firstBad)?.focus();
                  return;
                }
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <Field id="name" label="Name" error={errors.name} onBlur={onBlur("name")} />
                <Field
                  id="email"
                  label="Work email"
                  type="email"
                  placeholder="name@company.com"
                  error={errors.email}
                  onBlur={onBlur("email")}
                />
              </div>
              <Field
                id="company"
                label="Company"
                error={errors.company}
                onBlur={onBlur("company")}
              />
              <Field
                id="challenge"
                label="Your challenge"
                multiline
                error={errors.challenge}
                onBlur={onBlur("challenge")}
              />
              <Button type="submit" variant="pill" size="pill" className="self-start">
                {cta.submitLabel}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
