# uapp-site

Прототип головної сторінки uapp.group: Next.js (App Router, TypeScript) + Tailwind CSS v4 + shadcn/ui.

## Команди

- `npm run dev` — дев-сервер (http://localhost:3000)
- `npm run build && npm run start` — прод-збірка і сервер
- `npm run typecheck && npm run lint` — перевірки перед комітом

## Структура

- `src/app/` — layout і сторінка
- `src/components/ui/` — shadcn-компоненти (додаються тільки через `npx shadcn@latest add`) + кастомні примітиви
- `src/components/sections/` — 12 секцій головної (композиція примітивів, кольори — тільки семантичні токени)
- `src/components/hero-animation/` — ізольований модуль hero-ефекту (контракт — у README модуля)
- `src/content/` — мандатний копірайт як типізовані дані
- `src/styles/globals.css` — токени бренду; джерело правди — `docs/brand-style-guide.md` у корені репозиторію
