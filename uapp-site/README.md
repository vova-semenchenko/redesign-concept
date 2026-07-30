# uapp-site

Prototype of the uapp.group home page: Next.js (App Router, TypeScript) + Tailwind CSS v4 + shadcn/ui. Requires Node >= 20.9.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build && npm run start` — production build and server
- `npm run typecheck && npm run lint` — checks before committing
- `npm run format` — Prettier over all files (`npm run format:check` to verify only)

## Structure

- `src/app/` — App Router: layouts, pages, routing
- `src/components/ui/` — reusable UI primitives: shadcn components plus custom ones
- `src/components/sections/` — page sections composed from primitives and content
- `src/components/hero-animation/` — isolated hero-effect module; its contract lives in the module's README
- `src/content/` — copy as typed data, kept separate from markup
- `src/lib/` — shared helpers (`cn`)
- `src/styles/globals.css` — the token layer: brand primitives and the semantic tokens built on them
- `public/` — static assets (logo)

## Code rules

- **Colors: semantic tokens only** (`bg-background`, `text-primary`, `border-border`, …) in all components. Raw hex values and primitive scales (`ultramarine-*`, `gray-*`) are allowed in exactly two places: token definitions in `globals.css` and the decorative layer of `hero-animation` (see its contract).
- **Token values are not invented here** — they come from `docs/brand-style-guide.md` at the repo root; `globals.css` mirrors it.
- **shadcn components are added via `npx shadcn@latest add`**, not written by hand.
- **Copy is data**: text lives in `src/content/`, components render it. Mandated copy is verified against the brief — see the working rules in the repo root `CLAUDE.md`.
