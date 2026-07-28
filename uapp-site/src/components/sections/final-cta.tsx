"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { HomeContent } from "@/content/types";

export function FinalCta({ cta }: { cta: HomeContent["finalCta"] }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="dark bg-background py-20">
      <div className="mx-auto max-w-2xl px-6">
        <h2 className="text-3xl font-bold">{cta.heading}</h2>
        {submitted ? (
          <p className="mt-8 text-lg">{cta.successMessage}</p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Work email</Label>
                <Input id="email" name="email" type="email" required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" required />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="challenge">Your challenge</Label>
              <Textarea id="challenge" name="challenge" rows={4} required />
            </div>
            <Button type="submit" size="lg">
              {cta.submitLabel}
            </Button>
          </form>
        )}
        <ul className="mt-6 flex gap-6 text-sm text-muted-foreground">
          {cta.microcopy.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
