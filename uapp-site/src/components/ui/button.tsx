import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Дві кнопки, і різниця між ними — форма.
 *
 * `default` — повна пігулка з насиченою заливкою: єдине кругле на аркуші
 * прямих кутів, тому очевидно, що саме тут натискають. Однакова на обох
 * поверхнях (мандат брендбуку: заливка #011EFF + білий текст).
 *
 * `quiet` — прямокутник у 2px із самим лише хейрлайном. Живе всередині
 * контенту («дослідити модуль»), ніколи не грає головну дію.
 *
 * Жодного підняття, масштабування чи тіні на hover: аркуш плаский.
 */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-body font-medium transition-colors duration-[var(--dur-state)] ease-[var(--ease-draft)] outline-none select-none disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-full hover:bg-ultramarine-700",
        quiet:
          "border-rule-strong text-foreground hover:border-heading hover:text-heading rounded-[2px] border",
        outline:
          "border-rule-strong text-foreground hover:border-heading hover:text-heading rounded-[2px] border",
        ghost: "text-marker hover:text-heading rounded-[2px]",
        link: "text-accent-quiet underline-offset-4 hover:underline",
        destructive:
          "text-destructive border-destructive/40 hover:border-destructive rounded-[2px] border",
      },
      size: {
        default: "h-11 px-7 text-[0.9375rem]",
        sm: "h-9 px-5 text-[0.8125rem]",
        lg: "h-12 px-8 text-base",
        xs: "h-7 px-3 text-[0.75rem]",
        icon: "size-11",
        "icon-sm": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
