# Спека: сетап frontend-проєкту uapp-site

> Дата: 2026-07-28 · Статус: затверджено в дискусії (brainstorming)
> Вхідні дані: [`docs/frontend-foundation.md`](../../frontend-foundation.md) ·
> [`docs/brand-style-guide.md`](../../brand-style-guide.md) ·
> [`docs/task/uapp-redesign-brief.md`](../../task/uapp-redesign-brief.md)

## Рішення, ухвалені користувачем

1. **Доля коду:** прототип виростає в продакшн-сайт uapp.group (lead-engine: решта сторінок, SEO, маршрут лідів) — стек одразу продакшновий.
2. **Фреймворк:** Next.js (App Router, TypeScript).
3. **Стилізація:** Tailwind CSS v4, CSS-first конфіг (`@theme` у `globals.css`, без `tailwind.config.js`).
4. **Бібліотека компонентів: shadcn/ui — обов'язкова.** Компоненти беремо спершу з shadcn; кольори в компонентах — тільки з семантичного рівня токенів.
5. **Розміщення:** підкаталог `uapp-site/` у цьому репозиторії (документи й код в одному контексті).

## 1. Стек і тулінг

- Next.js (App Router, TS), стартуємо як статичну сторінку.
- Tailwind CSS v4.
- **shadcn/ui через CLI:** `npx shadcn@latest init` (генерує `components.json`, `src/lib/utils.ts` з `cn()`, семантичні змінні в `globals.css`; стиль new-york). Додавання компонентів — тільки `npx shadcn@latest add <component>`, не копіпастом.
- **shadcn skill:** встановити офіційний скіл shadcn тим самим механізмом, що й vercel-react-best-practices (`npx skills add …`) — доступ агента до актуальних правил і реєстру компонентів при розробці. Точне джерело скіла верифікувати на кроці встановлення (skills.sh / GitHub-реєстр shadcn); якщо офіційного скіла немає — зафіксувати альтернативу (shadcn MCP: `npx shadcn@latest mcp init`).
- ESLint (`next/core-web-vitals`) + Prettier; `npx tsc --noEmit` — прекоміт-перевірка за правилами репо.
- npm, без воркспейсів.
- Hero-ефект: технологія (SVG / кінетична типографіка / WebGL) **не фіксується на сетапі** — залежить від обраного концепту анімації; структура його ізолює (розд. 5).

## 2. Структура каталогів

```
uapp-site/
├── components.json                  # конфіг shadcn CLI
├── public/
│   ├── fonts/                       # e-Ukraine — після з'ясування ліцензії
│   └── logo-uapp.svg                # копія; джерело правди — assets/logo-uapp.svg
├── src/
│   ├── app/                         # layout.tsx, page.tsx; пізніше api/lead, insights/
│   ├── components/
│   │   ├── ui/                      # shadcn-компоненти (CLI кладе сюди) + кастомні за тими ж патернами
│   │   └── sections/                # 12 секцій потоку брифу §6 — композиція з ui/
│   ├── hero-animation/              # ізольований модуль ефекту, власний README
│   ├── content/                     # home.ts + types.ts — мандатний копірайт як типізовані дані
│   ├── lib/utils.ts                 # cn()
│   └── styles/globals.css           # токени: примітиви @theme + семантика shadcn + .dark-скоуп
└── package.json
```

Обґрунтування проти альтернатив: colocation під `app/` нічого не дає з одним роутом і потребує міграції при рості до мультисторінкового сайту; Atomic Design — церемонія без виграшу для 12 секцій і ~8 примітивів.

## 3. Компонентна політика (shadcn-first)

- **Спершу shadcn:** `Button`, `Card`, `Badge`, `Tabs`, `Input`, `Textarea`, `Select`, `Form`, `NavigationMenu` — з реєстру через CLI.
- **Кастомні примітиви** — тільки для того, чого в shadcn немає: `MetricStat`, `SectionHeading`, `Logo`. Пишуться за правилами shadcn: cva-варіанти, `cn()`, Radix-примітиви за потреби, семантичні токени.
- **Секції** (`components/sections/`) — 12 компонентів за потоком брифу §6 (`Header`, `Hero`, `PositioningBand`, `TrustStrip`, `ExpertiseGrid`, `SolutionsShowcase`, `SelectedWork`, `AiLayer`, `Approach`, `TeamTeaser`, `InsightsTeaser`, `FinalCta`); власної стилізації мінімум — композиція примітивів.

## 4. Токен-шар (за правилами shadcn)

- **Примітиви** в `@theme`: `--color-ultramarine-50…950`, `--color-gray-50…950` — 1:1 зі стайлгайдом розд. 1.
- **Семантичний рівень — канонічні shadcn-змінні:** `--background`, `--foreground`, `--card`, `--card-foreground`, `--primary`, `--primary-foreground`, `--secondary`, `--muted`, `--muted-foreground`, `--accent`, `--accent-foreground`, `--destructive`, `--border`, `--input`, `--ring`. Одне розширення поверх канону: `--heading` («чорнило» заголовків зі стайлгайду ≠ body-текст; у shadcn такого токена немає).
- **Дві поверхні = shadcn-механізм dark mode скоупом секції:** `:root` — світла колонка таблиці стайлгайду розд. 4; клас `.dark` на обгортці темної секції перевизначає ті самі змінні. shadcn-компоненти стають коректними на темних секціях автоматично.
- **Мапінг стайлгайд → shadcn** (світла / темна поверхня):

  | Токен | Світла | Темна (`.dark`) |
  |---|---|---|
  | `background` | white | `ultramarine/900` `#00073C` |
  | `foreground` | `gray/700` | `gray/200` |
  | `heading` | `ultramarine/800` | white |
  | `muted-foreground` | `gray/500` | `gray/400` |
  | `border` / `input` | `gray/200` | `gray/800` |
  | `card` | white (+ border) | `gray/900` |
  | `primary` / `primary-foreground` | `ultramarine/600` / white | те саме (за стайлгайдом) |
  | `accent` (лінки, акцент-текст) | `ultramarine/600` | `ultramarine/400` — тільки великий текст/лейбли |
  | `ring` | `ultramarine/600` | `ultramarine/600` |

- **Жорстке правило: компоненти вживають кольори тільки з семантичного рівня** (`bg-background`, `text-foreground`, `bg-primary`, `border-border`…). Примітиви `ultramarine-*`/`gray-*` — лише у визначеннях семантичних змінних у `globals.css`. **Єдиний документований виняток:** декоративний шар `hero-animation/` (лінії/заливки ілюстрацій), якому стайлгайд розд. 4 явно дозволяє примітивні заливки; на текст виняток не поширюється.
- **Шрифти:** `--font-head` / `--font-body` через `next/font/local`; поки ліцензія e-Ukraine не з'ясована — фолбек-стек (system sans). Компоненти гарнітуру не хардкодять.

## 5. Hero-модуль

`src/hero-animation/` експортує один компонент `<HeroVisual />` із зафіксованим контрактом:

- сам обробляє `prefers-reduced-motion` → змістовний статичний кадр, WebGL не ініціалізується;
- автогра >5 с → видима pause-кнопка (клавіатура + aria-label) — WCAG SC 2.2.2;
- ≤3 спалахи/сек; декоративний шар `aria-hidden`;
- H1/метрики рендеряться поза модулем (LCP не залежить від canvas).

На етапі сетапу — статичний плейсхолдер, що вже реалізує контракт; реальний ефект заїде пізніше без зміни інтерфейсу.

## 6. Контент-шар

`src/content/home.ts` — типізований об'єкт з усім мандатним копірайтом брифу §8: hero (H1 + sub + CTA + 4 метрики), positioning band, 4 expertise-картки, 4 solutions, 6 кейсів, AI-блок, 3 стовпи approach, тексти форми. Секції отримують дані пропсами. Правки копірайту (зведення метрик, AI-сертифікації) — одна точка зміни.

## 7. Форма лідів

У прототипі — клієнтський стаб: shadcn `Form` (`Input`, `Textarea`, `Select`), 4–5 полів без телефону, валідація, стан «надіслано», нікуди не шле. NDA-мікрокопі з брифу. Коли клієнт дасть маршрут лідів — додається `app/api/lead/route.ts` без зміни UI.

## 8. Якість і процес

- Гілка `feat/frontend-setup` за git-воркфлоу репо; коміти за Conventional Commits.
- Перевірки: `npx tsc --noEmit` перед кожним комітом; ESLint; `next build` перед інтеграцією в `main`.
- Юніт/E2E-тестів на сетапі не заводимо (верстка прототипу) — Playwright додамо з появою логіки форми.
- Деплой (Vercel) — окреме рішення, сетап не блокує.

## Поза скоупом сетапу

Вибір hero-концепту й технології ефекту · реальні файли шрифтів (ліцензія) · маршрут лідів · адаптив/мобільна · сторінки крім Home · CMS для Insights.

## Критерії готовності сетапу

1. `uapp-site/` збирається (`next build`) і рендерить сторінку-каркас з 12 секціями-заглушками з контенту `home.ts`.
2. shadcn ініціалізований; хоча б `Button`, `Card`, `Tabs`, `Badge` додані через CLI і рендеряться коректно на світлій та темній (`.dark`) секціях без перевизначень.
3. Токени в `globals.css` збігаються зі стайлгайдом 1:1 (примітиви) і таблицею мапінгу вище (семантика).
4. shadcn skill встановлений і доступний агенту.
5. `tsc --noEmit` і ESLint чисті.
