"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MicroLabel } from "@/components/ui/micro-label";
import { Container, Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import type { HomeContent } from "@/content/types";

const fieldClass =
  "h-11 rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 text-base focus-visible:border-ring focus-visible:ring-0 dark:bg-transparent";

export function FinalCta({ cta }: { cta: HomeContent["finalCta"] }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="contact" zone="dark">
      <Container className="py-28">
        {/* Фінальний CTA — центрована композиція */}
        <div className="mx-auto max-w-2xl">
          {/* Крапка в кінці — той самий стилістичний маркер, що в H1 */}
          <h2 className="text-center text-title">{cta.heading}.</h2>

          {submitted ? (
            <p className="mt-12 text-center text-lead">{cta.successMessage}</p>
          ) : (
            <form
              className="mt-12 flex flex-col gap-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-3">
                  <Label htmlFor="name" asChild>
                    <MicroLabel>Name</MicroLabel>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className={fieldClass}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="email" asChild>
                    <MicroLabel>Work email</MicroLabel>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={fieldClass}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="company" asChild>
                  <MicroLabel>Company</MicroLabel>
                </Label>
                <Input
                  id="company"
                  name="company"
                  required
                  className={fieldClass}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="challenge" asChild>
                  <MicroLabel>Your challenge</MicroLabel>
                </Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  rows={4}
                  required
                  className="rounded-none border-x-0 border-t-0 border-b border-input bg-transparent px-0 text-base focus-visible:border-ring focus-visible:ring-0 dark:bg-transparent"
                />
              </div>
              <Button
                type="submit"
                variant="pill"
                size="hero"
                className="mt-2 self-start"
              >
                {cta.submitLabel}
              </Button>
            </form>
          )}

          <ul className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-rule pt-6">
            {cta.microcopy.map((line, i) => (
              <li key={line} className="flex items-center gap-4">
                {i === 0 ? null : (
                  <span aria-hidden="true" className="text-muted-foreground">
                    ·
                  </span>
                )}
                <MicroLabel>{line}</MicroLabel>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
