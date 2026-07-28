# Frontend Setup (uapp-site) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Робочий каркас `uapp-site/` — Next.js + Tailwind v4 + shadcn/ui з токенами стайлгайду, контент-шаром і 12 секціями-заглушками, що збирається і проходить усі перевірки.

**Architecture:** App Router-застосунок у підкаталозі `uapp-site/` цього репо. Токени: примітиви стайлгайду в `@theme` → семантичні shadcn-змінні в `:root`/`.dark` (скоуп поверхні = обгортка секції). Контент — типізовані дані в `src/content/`, секції — тонка композиція shadcn-примітивів, hero-ефект — ізольований модуль з зафіксованим контрактом.

**Tech Stack:** Next.js (App Router, TypeScript), Tailwind CSS v4 (CSS-first, без `tailwind.config.js`), shadcn/ui (CLI, стиль new-york), ESLint (`next/core-web-vitals`), Prettier, npm.

## Global Constraints

- Спека: `docs/superpowers/specs/2026-07-28-frontend-setup-design.md` — джерело всіх рішень.
- Гілка: `feat/frontend-setup` від актуального `main`; коміти за Conventional Commits + трейлер `Co-Authored-By: Claude <model name> <noreply@anthropic.com>`.
- Перед кожним комітом: `npx tsc --noEmit` з каталогу `uapp-site/` — має бути чистим.
- **Кольори в компонентах — тільки семантичні токени** (`bg-background`, `text-foreground`, `bg-primary`, `border-border`, `text-heading`…). Примітиви `ultramarine-*`/`gray-*` дозволені лише у визначеннях токенів у `globals.css` і в декоративному шарі `src/hero-animation/`.
- shadcn-компоненти додаються **тільки** через `npx shadcn@latest add <name>` — не копіпастом.
- Контент сайту — англійською, це мандатний копірайт брифу §8: формулювання можна уточнювати, позиціонування/зміст — ні.
- Жодних авто-каруселей; showcase — інтерактивні таби.
- Шрифти не хардкодити: тільки через `--font-head`/`--font-body` (файлів e-Ukraine ще немає — фолбек-стек).
- Юніт-тестів на цьому етапі немає (рішення спеки §8) — верифікація через `tsc`, ESLint, `next build` і curl-перевірки рендеру.
- Усі шляхи нижче — відносно кореня репо `uapp-group/`, якщо не вказано інше.

---

### Task 1: Гілка + скафолд Next.js

**Files:**
- Create: `uapp-site/` (згенерований create-next-app: `package.json`, `tsconfig.json`, `eslint.config.mjs`, `next.config.ts`, `src/app/*`)
- Create: `uapp-site/src/styles/globals.css` (перенесення з `src/app/globals.css`)
- Create: `uapp-site/.prettierrc`
- Modify: `uapp-site/src/app/layout.tsx` (import globals, metadata)
- Modify: `uapp-site/src/app/page.tsx` (мінімальна сторінка)

**Interfaces:**
- Produces: робочий Next.js-застосунок; `src/styles/globals.css` — місце токенів для Task 3; alias `@/*` → `uapp-site/src/*`.

- [ ] **Step 1: Створити гілку від main**

```bash
git checkout main && git status --short   # чисте дерево
git checkout -b feat/frontend-setup
```

- [ ] **Step 2: Скафолд застосунку**

```bash
npx create-next-app@latest uapp-site --typescript --eslint --tailwind --app --src-dir --import-alias "@/*" --use-npm
```

На будь-які додаткові інтерактивні питання (Turbopack тощо) — приймати дефолт. Перевірити, що згенеровано Tailwind **v4** (у `package.json` — `"tailwindcss": "^4"`, у `src/app/globals.css` — `@import "tailwindcss";`, файлу `tailwind.config.*` немає).

- [ ] **Step 3: Перенести globals.css у src/styles/**

```bash
mkdir -p uapp-site/src/styles
git -C uapp-site mv src/app/globals.css src/styles/globals.css 2>/dev/null || mv uapp-site/src/app/globals.css uapp-site/src/styles/globals.css
```

У `uapp-site/src/app/layout.tsx` замінити import на:

```ts
import "@/styles/globals.css";
```

- [ ] **Step 4: Мінімальні layout і page**

`uapp-site/src/app/layout.tsx` (повністю):

```tsx
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "UAPP — Engineering for regulated finance",
  description:
    "Payments-grade engineering for banks and fintechs. Banking first, crypto where you need it.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-body antialiased">
        {children}
      </body>
    </html>
  );
}
```

`uapp-site/src/app/page.tsx` (повністю, тимчасово — замінюється в Task 7):

```tsx
export default function Home() {
  return <main className="p-8">uapp-site skeleton</main>;
}
```

(Класи `bg-background`/`text-foreground`/`font-body` запрацюють після Task 3 — до того Tailwind їх просто ігнорує як невідомі; збірку це не ламає.)

- [ ] **Step 5: Prettier**

```bash
cd uapp-site && npm i -D prettier
```

`uapp-site/.prettierrc` (повністю):

```json
{ "semi": true, "singleQuote": false, "trailingComma": "all" }
```

- [ ] **Step 6: Верифікація**

```bash
cd uapp-site && npx tsc --noEmit && npm run lint && npm run build
```

Expected: усі три команди без помилок; build друкує таблицю роутів з `/`.

- [ ] **Step 7: Commit**

```bash
git add uapp-site && git commit -m "feat(setup): скафолд Next.js-застосунку uapp-site (TS, Tailwind v4, App Router)"
```

---

### Task 2: shadcn init + базові компоненти

**Files:**
- Create: `uapp-site/components.json`, `uapp-site/src/lib/utils.ts`
- Create: `uapp-site/src/components/ui/{button,card,badge,tabs,input,textarea,select,label,form}.tsx`
- Modify: `uapp-site/src/styles/globals.css` (init допише свої змінні — перезаписуються в Task 3)

**Interfaces:**
- Consumes: скафолд з Task 1.
- Produces: `cn()` з `@/lib/utils`; компоненти `Button`, `Card`(+`CardHeader/CardTitle/CardDescription/CardContent`), `Badge`, `Tabs`(+`TabsList/TabsTrigger/TabsContent`), `Input`, `Textarea`, `Select`, `Label`, `Form` — імпортуються як `@/components/ui/<name>`.

- [ ] **Step 1: Ініціалізація shadcn**

```bash
cd uapp-site && npx shadcn@latest init
```

Відповіді на промпти: style — **new-york**; base color — **neutral** (значення все одно перезаписуються нашими токенами в Task 3); CSS variables — **yes**. Перевірити, що з'явилися `components.json` і `src/lib/utils.ts`, а в `globals.css` — блоки `:root`/`.dark`/`@theme inline`.

- [ ] **Step 2: Додати компоненти зі списку спеки**

```bash
cd uapp-site && npx shadcn@latest add button card badge tabs input textarea select label form
```

Expected: файли в `src/components/ui/`; у `package.json` з'явилися Radix-залежності (і `react-hook-form`/`zod` для form).

- [ ] **Step 3: Верифікація**

```bash
cd uapp-site && npx tsc --noEmit && npm run build
```

Expected: без помилок.

- [ ] **Step 4: Commit**

```bash
git add uapp-site && git commit -m "feat(setup): ініціалізувати shadcn/ui і додати базові компоненти через CLI"
```

---

### Task 3: Токен-шар у globals.css

**Files:**
- Modify: `uapp-site/src/styles/globals.css` (повний перезапис секції токенів)

**Interfaces:**
- Consumes: `globals.css` після shadcn init (Task 2) — зберегти `@import`-рядки і структурні блоки, які init додав (`@custom-variant dark`, base-layer), замінити **значення** змінних.
- Produces: утиліти `bg-background`, `text-foreground`, `text-heading`, `text-muted-foreground`, `bg-card`, `border-border`, `bg-primary`, `text-primary-foreground`, `ring-ring`, `font-head`, `font-body`; примітивні утиліти `*-ultramarine-*`, `*-gray-*` (тільки для hero-декору); клас `.dark` як скоуп темної поверхні.

- [ ] **Step 1: Записати токени**

Привести `uapp-site/src/styles/globals.css` до вигляду (зберігши зверху `@import "tailwindcss";` та інші `@import`/`@plugin`/`@custom-variant`-рядки, які додав shadcn init; якщо init згенерував кольори в oklch — повністю замінити його `:root`/`.dark`/`@theme inline` на блоки нижче):

```css
@import "tailwindcss";
/* (залишити тут інші @import/@plugin/@custom-variant рядки від shadcn init) */

/* ── Примітиви — 1:1 зі docs/brand-style-guide.md розд. 1 ── */
@theme {
  --color-ultramarine-50: #e6e8ff;
  --color-ultramarine-100: #cbd3ff;
  --color-ultramarine-200: #a8b5ff;
  --color-ultramarine-300: #8091ff;
  --color-ultramarine-400: #546bff;
  --color-ultramarine-500: #2944ff;
  --color-ultramarine-600: #011eff;
  --color-ultramarine-700: #0116bf;
  --color-ultramarine-800: #000f7d;
  --color-ultramarine-900: #00073c;
  --color-ultramarine-950: #000000;

  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
  --color-gray-950: #040816;

  /* Шрифти: e-Ukraine підключиться пізніше (ліцензія) — поки фолбек-стек */
  --font-head: system-ui, -apple-system, "Segoe UI", sans-serif;
  --font-body: system-ui, -apple-system, "Segoe UI", sans-serif;
}

/* ── Семантика: світла поверхня (стайлгайд розд. 4, світла колонка) ── */
:root {
  --background: #ffffff;
  --foreground: var(--color-gray-700);
  --heading: var(--color-ultramarine-800);
  --card: #ffffff;
  --card-foreground: var(--color-gray-700);
  --popover: #ffffff;
  --popover-foreground: var(--color-gray-700);
  --primary: var(--color-ultramarine-600);
  --primary-foreground: #ffffff;
  --secondary: var(--color-gray-100);
  --secondary-foreground: var(--color-gray-700);
  --muted: var(--color-gray-100);
  --muted-foreground: var(--color-gray-500);
  --accent: var(--color-ultramarine-600);
  --accent-foreground: #ffffff;
  /* destructive не заданий брендбуком — дефолт shadcn до окремого рішення */
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: var(--color-gray-200);
  --input: var(--color-gray-200);
  --ring: var(--color-ultramarine-600);
  --radius: 0.5rem;
}

/* ── Семантика: темна поверхня — скоуп секції (стайлгайд розд. 4, темна колонка) ── */
.dark {
  --background: var(--color-ultramarine-900);
  --foreground: var(--color-gray-200);
  --heading: #ffffff;
  --card: var(--color-gray-900);
  --card-foreground: var(--color-gray-200);
  --popover: var(--color-gray-900);
  --popover-foreground: var(--color-gray-200);
  --primary: var(--color-ultramarine-600);
  --primary-foreground: #ffffff;
  --secondary: var(--color-gray-800);
  --secondary-foreground: var(--color-gray-200);
  --muted: var(--color-gray-900);
  --muted-foreground: var(--color-gray-400);
  /* accent на темному — ultramarine/400, ТІЛЬКИ великий текст/лейбли (стайлгайд) */
  --accent: var(--color-ultramarine-400);
  --accent-foreground: #ffffff;
  --destructive: #dc2626;
  --destructive-foreground: #ffffff;
  --border: var(--color-gray-800);
  --input: var(--color-gray-800);
  --ring: var(--color-ultramarine-600);
}

/* ── Міст семантики в утиліти Tailwind ── */
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-heading: var(--heading);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
  h1, h2, h3 {
    @apply font-head text-heading;
  }
}
```

- [ ] **Step 2: Верифікація значень проти стайлгайду**

Відкрити `docs/brand-style-guide.md` розд. 1 і 4 поруч із `globals.css` і звірити кожен hex примітивів та кожний рядок мапінгу семантики (світла/темна колонки). Розбіжність = помилка, виправити.

- [ ] **Step 3: Верифікація збірки**

```bash
cd uapp-site && npx tsc --noEmit && npm run build
```

Expected: без помилок.

- [ ] **Step 4: Commit**

```bash
git add uapp-site/src/styles/globals.css && git commit -m "feat(tokens): токени стайлгайду — примітиви @theme + семантика shadcn з .dark-скоупом"
```

---

### Task 4: Кастомні UI-примітиви (SectionHeading, MetricStat, Logo)

**Files:**
- Create: `uapp-site/src/components/ui/section-heading.tsx`
- Create: `uapp-site/src/components/ui/metric-stat.tsx`
- Create: `uapp-site/src/components/ui/logo.tsx`
- Create: `uapp-site/public/logo-uapp.svg` (копія з `assets/`)

**Interfaces:**
- Consumes: `cn()` з `@/lib/utils` (Task 2), токени (Task 3).
- Produces:
  - `SectionHeading({ eyebrow?: string; title: string; description?: string; className?: string })`
  - `MetricStat({ value: string; label: string; className?: string })`
  - `Logo({ className?: string })` — заливка через `currentColor` (біла/чорна залежно від поверхні задається класом споживача).

- [ ] **Step 1: Скопіювати лого (джерело правди лишається в assets/)**

```bash
cp assets/logo-uapp.svg uapp-site/public/logo-uapp.svg
```

- [ ] **Step 2: Написати компоненти**

`uapp-site/src/components/ui/section-heading.tsx` (повністю):

```tsx
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p className="mb-2 text-sm font-medium uppercase tracking-wide text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold">{title}</h2>
      {description ? (
        <p className="mt-4 text-lg text-foreground">{description}</p>
      ) : null}
    </div>
  );
}
```

`uapp-site/src/components/ui/metric-stat.tsx` (повністю):

```tsx
import { cn } from "@/lib/utils";

interface MetricStatProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricStat({ value, label, className }: MetricStatProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="text-3xl font-bold text-heading">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
```

`uapp-site/src/components/ui/logo.tsx` (повністю) — заливка через CSS-mask, щоб не залежати від внутрішньої структури SVG (вимога стайлгайду розд. 3: біла на темному, чорна на світлому):

```tsx
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span
      role="img"
      aria-label="UAPP"
      className={cn("inline-block h-6 w-24 bg-current", className)}
      style={{
        maskImage: "url(/logo-uapp.svg)",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        maskPosition: "left center",
        WebkitMaskImage: "url(/logo-uapp.svg)",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        WebkitMaskPosition: "left center",
      }}
    />
  );
}
```

Колір задається споживачем: `text-heading` на світлому дасть чорнило, у `.dark`-скоупі heading = білий — правило стайлгайду виконується автоматично. Якщо чиста чорна/біла заливка обов'язкова — споживач ставить `text-black` не потрібно: у скелеті достатньо `text-heading`; точний тон звірити на етапі дизайну.

- [ ] **Step 3: Верифікація**

```bash
cd uapp-site && npx tsc --noEmit && npm run lint
```

Expected: чисто.

- [ ] **Step 4: Commit**

```bash
git add uapp-site && git commit -m "feat(ui): кастомні примітиви SectionHeading, MetricStat, Logo за shadcn-патернами"
```

---

### Task 5: Контент-шар (мандатний копірайт як дані)

**Files:**
- Create: `uapp-site/src/content/types.ts`
- Create: `uapp-site/src/content/home.ts`

**Interfaces:**
- Consumes: нічого (чисті дані).
- Produces: `homeContent: HomeContent` з `@/content/home`; типи `HomeContent`, `Metric`, `ExpertiseCard`, `SolutionCard`, `CaseTeaser` з `@/content/types` — Task 7 споживає їх пропсами секцій.

- [ ] **Step 1: Типи**

`uapp-site/src/content/types.ts` (повністю):

```ts
export interface Metric {
  value: string;
  label: string;
}

export interface ExpertiseCard {
  title: string;
  description: string;
  standards: string[];
}

export interface SolutionCard {
  id: string;
  title: string;
  flagship?: boolean;
  audience: string;
  problem: string;
}

export interface CaseTeaser {
  id: string;
  clientProfile: string;
  domainLine: string;
  factAnchor: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HomeContent {
  nav: { items: NavItem[]; cta: string };
  hero: {
    h1: string;
    h1Alternatives: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: Metric[];
  };
  positioningBand: string;
  trust: { metrics: Metric[]; certificationsNote: string };
  expertise: { heading: string; cards: ExpertiseCard[] };
  solutions: { heading: string; cards: SolutionCard[] };
  selectedWork: { heading: string; ndaBadge: string; cases: CaseTeaser[] };
  aiLayer: { heading: string; statement: string; certificationsNote: string };
  approach: { heading: string; pillars: { title: string; description: string }[] };
  team: { heading: string; description: string };
  insights: { heading: string; description: string };
  finalCta: {
    heading: string;
    microcopy: string[];
    submitLabel: string;
    successMessage: string;
  };
}
```

- [ ] **Step 2: Контент**

`uapp-site/src/content/home.ts` (повністю; джерело — бриф §8, формулювання уточнювані, зміст мандатний; AI-сертифікації та склад Trust-смуги — відкриті питання клієнта, тому тут нейтральні notes):

```ts
import type { HomeContent } from "./types";

export const homeContent: HomeContent = {
  nav: {
    items: [
      { label: "Expertise", href: "#expertise" },
      { label: "Solutions", href: "#solutions" },
      { label: "Case studies", href: "#work" },
      { label: "Team", href: "#team" },
      { label: "Insights", href: "#insights" },
    ],
    cta: "Describe your challenge",
  },
  hero: {
    h1: "Engineering for regulated finance.",
    h1Alternatives: [
      "We build the systems that move money.",
      "Payments-grade engineering. Crypto-fluent.",
    ],
    sub: "We design and ship payment rails, card programs and core integrations — with deep crypto and on-chain expertise where it counts. Banks and fintechs have trusted us across 170+ projects in 15 countries.",
    ctaPrimary: "Describe your challenge",
    ctaSecondary: "See our work",
    metrics: [
      { value: "8+", label: "years in regulated finance" },
      { value: "170+", label: "projects delivered" },
      { value: "15", label: "countries" },
      { value: "$1B+", label: "in clients' annual revenue" },
    ],
  },
  positioningBand:
    "Banking first, crypto where you need it. Eight years in regulated finance — ISO 20022, cards, SEPA, reconciliation and bank-grade security — and just as deeply in wallets, exchanges and on-chain compliance. One team, both sides.",
  trust: {
    metrics: [
      { value: "8+", label: "years" },
      { value: "170+", label: "projects" },
      { value: "15", label: "countries" },
      { value: "$1B+", label: "clients' annual revenue" },
    ],
    certificationsNote: "Security documentation available under NDA.",
  },
  expertise: {
    heading: "Expertise",
    cards: [
      {
        title: "Fintech & Payments",
        description:
          "Payment rails, card programs and core banking integrations built to bank-grade standards.",
        standards: ["ISO 20022", "SEPA Instant", "Card tokenization"],
      },
      {
        title: "Compliance & AML",
        description:
          "KYC/AML flows, transaction monitoring and regulatory reporting designed in from day one.",
        standards: ["PSD2 / SCA", "AML / KYC", "Regulatory reporting"],
      },
      {
        title: "Security",
        description:
          "Bank-grade security architecture, audit readiness and secure delivery across the stack.",
        standards: ["Secure SDLC", "Audit readiness", "On-device cryptography"],
      },
      {
        title: "Crypto & Web3",
        description:
          "Wallets, exchanges and on-chain compliance — deep crypto competence where you need it.",
        standards: ["Multi-chain wallets", "On-chain compliance", "Settlement webhooks"],
      },
    ],
  },
  solutions: {
    heading: "Solutions",
    cards: [
      {
        id: "embedded-crypto",
        title: "Embedded Crypto for Banks",
        flagship: true,
        audience: "Banks and EMIs adding regulated crypto services",
        problem:
          "Launch compliant crypto features inside your banking app without building the infrastructure yourself.",
      },
      {
        id: "iso20022-toolkit",
        title: "ISO 20022 Toolkit",
        audience: "Payment institutions migrating message flows",
        problem:
          "Model, validate and process ISO 20022 message lifecycles without reinventing the parser.",
      },
      {
        id: "reconciliation-agent",
        title: "Bank–Crypto Reconciliation Agent",
        audience: "Teams operating across fiat and on-chain ledgers",
        problem:
          "Reconcile transactions across banking and on-chain rails automatically.",
      },
      {
        id: "sca-signing",
        title: "SCA / Transaction Signing",
        audience: "Fintechs needing strong customer authentication",
        problem:
          "On-device transaction signing that meets SCA requirements without hurting UX.",
      },
    ],
  },
  selectedWork: {
    heading: "Selected work",
    ndaBadge: "Client withheld under NDA",
    cases: [
      {
        id: "sepa-instant",
        clientProfile: "EU-licensed payments institution",
        domainLine: "SEPA Instant — full ISO 20022 message lifecycle",
        factAnchor: "End-to-end SEPA Instant processing",
      },
      {
        id: "prepaid-cards",
        clientProfile: "US prepaid card program",
        domainLine: "Web & mobile — Mastercard tokenization, Apple/Google Pay, real-time KYC",
        factAnchor: "Card issuing across web and mobile",
      },
      {
        id: "debt-collection",
        clientProfile: "EU debt-collection & reconciliation platform",
        domainLine: "CAMT/ISO 20022 statements, multi-jurisdiction VAT",
        factAnchor: "Automated reconciliation at scale",
      },
      {
        id: "sca-secure-enclave",
        clientProfile: "Mobile transaction-signing (SCA)",
        domainLine: "On-device ECDSA in Secure Enclave",
        factAnchor: "Bank-grade signing on consumer devices",
      },
      {
        id: "embedded-crypto-bank",
        clientProfile: "Embedded crypto in a banking app",
        domainLine: "Regulated provider integration, settlement webhooks",
        factAnchor: "Crypto features inside a regulated bank",
      },
      {
        id: "multichain-wallet",
        clientProfile: "Multi-chain wallet & on-chain compliance",
        domainLine: "7+ networks supported",
        factAnchor: "Compliance-first wallet infrastructure",
      },
    ],
  },
  aiLayer: {
    heading: "AI across every layer",
    statement:
      "AI runs through how we work — from AI-assisted discovery and design-to-code to AI-augmented QA, and into the products we build for you.",
    certificationsNote: "Team AI certifications — list to be provided by the client.",
  },
  approach: {
    heading: "Why us",
    pillars: [
      {
        title: "Both sides of the bridge",
        description:
          "Banking-first depth with genuine crypto fluency — one team across fiat and on-chain.",
      },
      {
        title: "Regulated-grade",
        description:
          "Security, compliance and auditability built into the process, not bolted on.",
      },
      {
        title: "AI-native delivery",
        description:
          "AI-assisted, senior-reviewed — faster delivery without losing engineering control.",
      },
    ],
  },
  team: {
    heading: "The architects who'll work on your system",
    description:
      "A senior team of payments architects, security & compliance leads and on-chain systems engineers.",
  },
  insights: {
    heading: "Insights",
    description: "Engineering notes on ISO 20022, on-chain compliance and SCA.",
  },
  finalCta: {
    heading: "Describe your challenge",
    microcopy: [
      "We'll sign an NDA before any details.",
      "Response within one business day.",
    ],
    submitLabel: "Describe your challenge",
    successMessage: "Thanks — we'll get back to you within one business day.",
  },
};
```

- [ ] **Step 3: Верифікація**

```bash
cd uapp-site && npx tsc --noEmit
```

Expected: чисто (типи збігаються з даними).

- [ ] **Step 4: Commit**

```bash
git add uapp-site/src/content && git commit -m "feat(content): мандатний копірайт брифу §8 як типізований контент-шар"
```

---

### Task 6: Hero-модуль (плейсхолдер з контрактом)

**Files:**
- Create: `uapp-site/src/hero-animation/hero-visual.tsx`
- Create: `uapp-site/src/hero-animation/index.ts`
- Create: `uapp-site/src/hero-animation/README.md`

**Interfaces:**
- Consumes: токени (Task 3); `cn()`.
- Produces: `HeroVisual({ className?: string })` з `@/hero-animation` — Task 7 рендерить його в секції Hero. Контракт (обов'язковий для майбутньої реальної анімації): reduced-motion усередині, pause-кнопка при автогрі >5с, `aria-hidden` на декорі, H1/метрики живуть ПОЗА модулем.

- [ ] **Step 1: README контракту**

`uapp-site/src/hero-animation/README.md` (повністю):

```markdown
# hero-animation — ізольований модуль сигнатурного ефекту

Єдиний публічний експорт: `<HeroVisual className?>`. Поточна реалізація —
статичний плейсхолдер; реальний ефект (бриф §7) заїде сюди без зміни інтерфейсу.

## Контракт (обов'язковий для будь-якої реалізації)

1. `prefers-reduced-motion: reduce` → змістовний статичний кадр; WebGL/анімація
   не ініціалізується взагалі.
2. Автоанімація довше 5 с → видима pause-кнопка (доступна з клавіатури,
   з aria-label) — media-query сам не закриває WCAG SC 2.2.2.
3. ≤3 спалахи/сек (SC 2.3.1).
4. Декоративний шар — `aria-hidden="true"`; меседж дубльовано текстом зовні.
5. H1, sub, CTA і метрики рендеряться ПОЗА модулем — LCP не залежить від canvas.
6. Кольори: єдине місце в застосунку, де дозволені примітивні токени
   (`ultramarine-*`, `gray-*`) для заливок/ліній. Текст усередині модуля
   (якщо з'явиться) — тільки семантичні токени.
```

- [ ] **Step 2: Плейсхолдер**

`uapp-site/src/hero-animation/hero-visual.tsx` (повністю):

```tsx
import { cn } from "@/lib/utils";

/**
 * Статичний плейсхолдер сигнатурного hero-ефекту.
 * Контракт модуля — див. README.md поруч. Статичний кадр тривіально
 * задовольняє reduced-motion і не потребує pause-кнопки.
 */
export function HeroVisual({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-64 items-center justify-center rounded-lg border border-dashed border-ultramarine-300",
        className,
      )}
    >
      <span className="text-sm text-muted-foreground">
        hero signature effect — placeholder
      </span>
    </div>
  );
}
```

`uapp-site/src/hero-animation/index.ts` (повністю):

```ts
export { HeroVisual } from "./hero-visual";
```

- [ ] **Step 3: Верифікація**

```bash
cd uapp-site && npx tsc --noEmit && npm run lint
```

Expected: чисто.

- [ ] **Step 4: Commit**

```bash
git add uapp-site/src/hero-animation && git commit -m "feat(hero): ізольований hero-модуль — контракт у README + статичний плейсхолдер"
```

---

### Task 7: 12 секцій-заглушок + композиція сторінки

**Files:**
- Create: `uapp-site/src/components/sections/{header,hero,positioning-band,trust-strip,expertise-grid,solutions-showcase,selected-work,ai-layer,approach,team-teaser,insights-teaser,final-cta}.tsx`
- Modify: `uapp-site/src/app/page.tsx`

**Interfaces:**
- Consumes: `homeContent`/типи (Task 5), shadcn-компоненти (Task 2), примітиви (Task 4), `HeroVisual` (Task 6).
- Produces: сторінка `/` з 12 секціями. Темні поверхні: `PositioningBand` і `FinalCta` обгорнуті в `dark` — доказ механізму скоупу.

- [ ] **Step 1: Секції**

Кожна секція — server component (крім `FinalCta` і `SolutionsShowcase` — клієнтські: стан форми і таби). Скелет = довести потік даних і поверхні; візуальний дизайн — наступний етап.

`header.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import type { HomeContent } from "@/content/types";

export function Header({ nav }: { nav: HomeContent["nav"] }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo className="text-heading" />
        <nav aria-label="Main">
          <ul className="flex items-center gap-6 text-sm">
            {nav.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-heading">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button asChild size="sm">
          <a href="#contact">{nav.cta}</a>
        </Button>
      </div>
    </header>
  );
}
```

`hero.tsx`:

```tsx
import { Button } from "@/components/ui/button";
import { MetricStat } from "@/components/ui/metric-stat";
import { HeroVisual } from "@/hero-animation";
import type { HomeContent } from "@/content/types";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="max-w-3xl text-5xl font-bold">{hero.h1}</h1>
      <p className="mt-6 max-w-2xl text-lg">{hero.sub}</p>
      <div className="mt-8 flex gap-4">
        <Button asChild size="lg">
          <a href="#contact">{hero.ctaPrimary}</a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href="#work">{hero.ctaSecondary}</a>
        </Button>
      </div>
      <HeroVisual className="mt-12" />
      <dl className="mt-12 grid grid-cols-4 gap-8">
        {hero.metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
      </dl>
    </section>
  );
}
```

`positioning-band.tsx` (перша темна поверхня — механізм `.dark`):

```tsx
import type { HomeContent } from "@/content/types";

export function PositioningBand({ text }: { text: HomeContent["positioningBand"] }) {
  return (
    <section className="dark bg-background py-16">
      <p className="mx-auto max-w-4xl px-6 text-2xl font-medium text-heading">
        {text}
      </p>
    </section>
  );
}
```

`trust-strip.tsx`:

```tsx
import { MetricStat } from "@/components/ui/metric-stat";
import type { HomeContent } from "@/content/types";

export function TrustStrip({ trust }: { trust: HomeContent["trust"] }) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-6 py-10">
        {trust.metrics.map((m) => (
          <MetricStat key={m.label} value={m.value} label={m.label} />
        ))}
        <p className="text-sm text-muted-foreground">{trust.certificationsNote}</p>
      </div>
    </section>
  );
}
```

`expertise-grid.tsx`:

```tsx
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function ExpertiseGrid({ expertise }: { expertise: HomeContent["expertise"] }) {
  return (
    <section id="expertise" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={expertise.heading} />
      <div className="mt-10 grid grid-cols-4 gap-6">
        {expertise.cards.map((card) => (
          <Card key={card.title}>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {card.standards.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

`solutions-showcase.tsx` (клієнтський — shadcn Tabs):

```tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { HomeContent } from "@/content/types";

export function SolutionsShowcase({ solutions }: { solutions: HomeContent["solutions"] }) {
  return (
    <section id="solutions" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={solutions.heading} />
      <Tabs defaultValue={solutions.cards[0].id} className="mt-10">
        <TabsList>
          {solutions.cards.map((card) => (
            <TabsTrigger key={card.id} value={card.id}>
              {card.title}
            </TabsTrigger>
          ))}
        </TabsList>
        {solutions.cards.map((card) => (
          <TabsContent key={card.id} value={card.id} className="mt-6">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              {card.flagship ? <Badge>Flagship</Badge> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{card.audience}</p>
            <p className="mt-3 max-w-2xl">{card.problem}</p>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}
```

`selected-work.tsx`:

```tsx
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function SelectedWork({ work }: { work: HomeContent["selectedWork"] }) {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={work.heading} />
      <div className="mt-10 grid grid-cols-3 gap-6">
        {work.cases.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <Badge variant="outline">{work.ndaBadge}</Badge>
              <CardTitle className="mt-3">{c.clientProfile}</CardTitle>
              <CardDescription>{c.domainLine}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-medium text-heading">{c.factAnchor}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
```

`ai-layer.tsx`:

```tsx
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function AiLayer({ ai }: { ai: HomeContent["aiLayer"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={ai.heading} description={ai.statement} />
      <p className="mt-6 text-sm text-muted-foreground">{ai.certificationsNote}</p>
    </section>
  );
}
```

`approach.tsx`:

```tsx
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function Approach({ approach }: { approach: HomeContent["approach"] }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={approach.heading} />
      <div className="mt-10 grid grid-cols-3 gap-8">
        {approach.pillars.map((p) => (
          <div key={p.title}>
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 text-foreground">{p.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

`team-teaser.tsx`:

```tsx
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function TeamTeaser({ team }: { team: HomeContent["team"] }) {
  return (
    <section id="team" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={team.heading} description={team.description} />
    </section>
  );
}
```

`insights-teaser.tsx`:

```tsx
import { SectionHeading } from "@/components/ui/section-heading";
import type { HomeContent } from "@/content/types";

export function InsightsTeaser({ insights }: { insights: HomeContent["insights"] }) {
  return (
    <section id="insights" className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading title={insights.heading} description={insights.description} />
    </section>
  );
}
```

`final-cta.tsx` (клієнтський, друга темна поверхня, стаб форми — нікуди не шле):

```tsx
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
```

- [ ] **Step 2: Композиція сторінки**

`uapp-site/src/app/page.tsx` (повністю):

```tsx
import { AiLayer } from "@/components/sections/ai-layer";
import { Approach } from "@/components/sections/approach";
import { ExpertiseGrid } from "@/components/sections/expertise-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { InsightsTeaser } from "@/components/sections/insights-teaser";
import { PositioningBand } from "@/components/sections/positioning-band";
import { SelectedWork } from "@/components/sections/selected-work";
import { SolutionsShowcase } from "@/components/sections/solutions-showcase";
import { TeamTeaser } from "@/components/sections/team-teaser";
import { TrustStrip } from "@/components/sections/trust-strip";
import { homeContent } from "@/content/home";

export default function Home() {
  return (
    <>
      <Header nav={homeContent.nav} />
      <main>
        <Hero hero={homeContent.hero} />
        <PositioningBand text={homeContent.positioningBand} />
        <TrustStrip trust={homeContent.trust} />
        <ExpertiseGrid expertise={homeContent.expertise} />
        <SolutionsShowcase solutions={homeContent.solutions} />
        <SelectedWork work={homeContent.selectedWork} />
        <AiLayer ai={homeContent.aiLayer} />
        <Approach approach={homeContent.approach} />
        <TeamTeaser team={homeContent.team} />
        <InsightsTeaser insights={homeContent.insights} />
        <FinalCta cta={homeContent.finalCta} />
      </main>
    </>
  );
}
```

- [ ] **Step 3: Верифікація збірки і рендеру**

```bash
cd uapp-site && npx tsc --noEmit && npm run lint && npm run build
npm run start &
sleep 3
curl -s http://localhost:3000 | grep -o "Engineering for regulated finance." | head -1
curl -s http://localhost:3000 | grep -o "Banking first, crypto where you need it" | head -1
curl -s http://localhost:3000 | grep -c "Client withheld under NDA"
kill %1
```

Expected: build чистий; перший grep друкує H1; другий — positioning band; третій — `6` (шість NDA-бейджів).

- [ ] **Step 4: Візуальна перевірка поверхонь**

Відкрити сторінку (dev або start) і переконатися: PositioningBand і FinalCta — темні (фон `#00073C`, білі заголовки), кнопки на обох поверхнях — однакова ultramarine-заливка з білим текстом, Tabs/Badge/Card читабельні на своїх поверхнях без локальних перевизначень кольору.

- [ ] **Step 5: Commit**

```bash
git add uapp-site && git commit -m "feat(sections): 12 секцій-заглушок потоку брифу і композиція головної"
```

---

### Task 8: shadcn skill для агента

**Files:**
- Modify: `.agents/skills/` + `skills-lock.json` (корінь репо — механізм `npx skills add`, як для vercel-react-best-practices)

**Interfaces:**
- Consumes: нічого з коду.
- Produces: доступний скіл shadcn у сесіях агента (критерій готовності №4 спеки).

- [ ] **Step 1: Верифікувати джерело і встановити**

Порядок пошуку офіційного джерела (спека вимагає верифікацію, не вгадування):

```bash
npx skills add shadcn-ui/ui 2>&1 | head -20   # спроба 1: основний репозиторій shadcn
```

Якщо скіла в репо немає — спроба 2: пошук у реєстрі `npx skills find shadcn` і встановлення знайденого офіційного (автор shadcn/vercel). Якщо офіційного скіла не існує — фолбек зі спеки: `cd uapp-site && npx shadcn@latest mcp init` (MCP-сервер реєстру замість скіла) і зафіксувати це відхилення в коміт-меседжі.

- [ ] **Step 2: Верифікація**

```bash
ls .agents/skills/ && git status --short
```

Expected: новий каталог скіла (або зміни MCP-конфігу) видимі; після перезавантаження скілів (`/reload-skills` користувачем) скіл з'являється в списку.

- [ ] **Step 3: Commit**

```bash
git add .agents skills-lock.json && git commit -m "chore(agent): встановити shadcn skill для доступу до реєстру компонентів"
```

(Якщо файли скілів лягли в інші шляхи — додати фактичні; якщо фолбек на MCP — закомітити фактично змінені конфіги.)

---

### Task 9: Фінальна верифікація критеріїв готовності

**Files:** нових немає — тільки перевірки.

- [ ] **Step 1: Прогнати критерії спеки**

```bash
cd uapp-site && npx tsc --noEmit && npm run lint && npm run build        # критерії 1, 5
ls src/components/ui/ | grep -E "button|card|tabs|badge"                  # критерій 2 (+ Step 4 Task 7 — поверхні)
```

Критерій 3 (токени 1:1 зі стайлгайдом) — повторна звірка `globals.css` проти `docs/brand-style-guide.md` розд. 1 і таблиці мапінгу спеки §4. Критерій 4 — скіл встановлений (Task 8).

- [ ] **Step 2: Звірити план проти спеки**

Пройтися по спеці розділ за розділом; кожна вимога має бути реалізована або явно значитися в «Поза скоупом». Розбіжності — виправити до інтеграції.

- [ ] **Step 3: Підсумковий репорт користувачу**

Без коміту (нічого не змінилось) — короткий репорт: що зроблено, які критерії пройдені, які відкриті питання лишилися (шрифти, маршрут лідів, hero-концепт). **Інтеграція в `main` — тільки на явний запит користувача** (git-воркфлоу репо).
