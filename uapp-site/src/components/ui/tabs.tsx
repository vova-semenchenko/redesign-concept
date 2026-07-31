"use client";

import * as React from "react";
import { Tabs as TabsPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

/**
 * Таби без капсул, фонів і контейнерів: ряд, розділений вертикальними
 * хейрлайнами, що стоїть на горизонтальному. Активний стан — акцентне
 * підкреслення, яке *переїжджає* між позиціями, а не перемикається.
 *
 * Radix лишається під сподом заради ролей, стрілок і roving tabindex.
 */

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [underline, setUnderline] = React.useState<{
    left: number;
    width: number;
  } | null>(null);

  React.useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const measure = () => {
      const active = list.querySelector<HTMLElement>(
        '[data-state="active"], [data-active]',
      );
      if (!active) return;
      setUnderline({ left: active.offsetLeft, width: active.offsetWidth });
    };

    measure();
    const attributes = new MutationObserver(measure);
    attributes.observe(list, {
      subtree: true,
      attributes: true,
      attributeFilter: ["data-state", "data-active"],
    });
    const size = new ResizeObserver(measure);
    size.observe(list);

    return () => {
      attributes.disconnect();
      size.disconnect();
    };
  }, []);

  return (
    <div className="relative">
      <TabsPrimitive.List
        ref={listRef}
        data-slot="tabs-list"
        className={cn(
          "divide-rule border-rule flex divide-x border-b",
          className,
        )}
        {...props}
      >
        {children}
      </TabsPrimitive.List>
      <div
        aria-hidden="true"
        className="bg-primary absolute bottom-0 h-0.5 transition-[left,width] duration-[var(--dur-move)] ease-[var(--ease-draft)] motion-reduce:transition-none"
        style={{
          left: underline?.left ?? 0,
          width: underline?.width ?? 0,
          opacity: underline ? 1 : 0,
        }}
      />
    </div>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "flex-1 px-6 py-5 text-left transition-colors duration-[var(--dur-state)]",
        "[&_.label-micro]:text-marker [&_.type-subtitle]:text-marker",
        "hover:[&_.type-subtitle]:text-heading",
        "data-[state=active]:[&_.type-subtitle]:text-heading data-[state=active]:[&_.label-micro]:text-accent-quiet",
        "first:pl-0",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
