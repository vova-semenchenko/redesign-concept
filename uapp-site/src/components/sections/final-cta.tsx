"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Marker } from "@/components/ui/marker";
import { Rule } from "@/components/ui/rule";
import { Textarea } from "@/components/ui/textarea";
import { Zone } from "@/components/ui/zone";
import type { HomeContent } from "@/content/types";

type FieldName = "name" | "email" | "company" | "challenge";

const EMPTY: Record<FieldName, string> = {
  name: "",
  email: "",
  company: "",
  challenge: "",
};

/** Помилка називає проблему і спосіб її виправити — без звинувачень. */
const MISSING: Record<FieldName, string> = {
  name: "Add your name so we know who's writing.",
  email: "Add a work email so we can reply.",
  company: "Add the company you're writing from.",
  challenge: "Tell us what you're building — one line is enough.",
};

function validate(field: FieldName, value: string) {
  if (!value.trim()) return MISSING[field];
  if (field === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
    return "Enter a work email, like name@company.com";
  }
  return "";
}

export function FinalCta({ cta }: { cta: HomeContent["finalCta"] }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const fields: Array<{
    name: FieldName;
    label: string;
    type?: string;
    span: string;
  }> = [
    { name: "name", label: cta.fields.name, span: "col-span-1" },
    {
      name: "email",
      label: cta.fields.email,
      type: "email",
      span: "col-span-1",
    },
    { name: "company", label: cta.fields.company, span: "col-span-2" },
  ];

  const setField = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const blur = (field: FieldName) => {
    setErrors((prev) => ({ ...prev, [field]: validate(field, values[field]) }));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const next: Partial<Record<FieldName, string>> = {
      name: validate("name", values.name),
      email: validate("email", values.email),
      company: validate("company", values.company),
      challenge: validate("challenge", values.challenge),
    };
    setErrors(next);
    if (Object.values(next).every((message) => !message)) setSubmitted(true);
  };

  return (
    <Zone tone="ink" pad="lg" id="contact">
      <div className="sheet-grid gap-y-16">
        <div className="sheet-edge-start">
          <Marker tick>{cta.marker}</Marker>
        </div>

        <div className="col-start-3 col-end-7 flex flex-col gap-8">
          <h2 className="type-display">{cta.heading}</h2>
          <ul className="flex flex-col gap-3">
            {cta.microcopy.map((line) => (
              <li key={line} className="type-body text-muted-foreground">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-start-8 col-end-12">
          {submitted ? (
            <div className="flex flex-col gap-6">
              <Rule />
              <p className="type-subtitle text-heading">{cta.successMessage}</p>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="flex flex-col gap-10">
              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={`flex flex-col gap-3 ${field.span}`}
                  >
                    <Label htmlFor={field.name}>{field.label}</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={field.type ?? "text"}
                      value={values[field.name]}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={
                        errors[field.name] ? `${field.name}-error` : undefined
                      }
                      onChange={(event) =>
                        setField(field.name, event.target.value)
                      }
                      onBlur={() => blur(field.name)}
                    />
                    {errors[field.name] ? (
                      <p
                        id={`${field.name}-error`}
                        className="text-destructive type-caption"
                      >
                        {errors[field.name]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="col-span-2 flex flex-col gap-3">
                  <Label htmlFor="challenge">{cta.fields.challenge}</Label>
                  <Textarea
                    id="challenge"
                    name="challenge"
                    rows={4}
                    placeholder={cta.fields.challengeHint}
                    value={values.challenge}
                    aria-invalid={Boolean(errors.challenge)}
                    aria-describedby={
                      errors.challenge ? "challenge-error" : undefined
                    }
                    onChange={(event) =>
                      setField("challenge", event.target.value)
                    }
                    onBlur={() => blur("challenge")}
                  />
                  {errors.challenge ? (
                    <p
                      id="challenge-error"
                      className="text-destructive type-caption"
                    >
                      {errors.challenge}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <Button type="submit">{cta.submitLabel}</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Zone>
  );
}
