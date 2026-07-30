# uapp-site

Prototype of the uapp.group home page: Next.js (App Router, TypeScript) + Tailwind CSS v4 + shadcn/ui. Requires Node >= 20.9.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build && npm run start` — production build and server
- `npm run typecheck && npm run lint` — checks before committing
- `npm run format` — Prettier over all files (`npm run format:check` to verify only)

## Structure

- `src/app/` — layout and the page
- `src/components/ui/` — shadcn components (added only via `npx shadcn@latest add`) plus custom primitives
- `src/components/sections/` — the 12 home-page sections (composition of primitives; colors — semantic tokens only)
- `src/components/hero-animation/` — isolated hero-effect module (contract in the module's README); the only place where primitive color tokens are allowed, and only for the decorative layer
- `src/content/` — mandated copy as typed data
- `src/lib/` — shared helpers (`cn`)
- `src/styles/globals.css` — brand tokens; source of truth for the values is `docs/brand-style-guide.md` at the repo root
- `public/` — static assets (logo)
