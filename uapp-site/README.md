# uapp-site

Prototype of the uapp.group home page: Next.js (App Router, TypeScript) + Tailwind CSS v4 + shadcn/ui. Requires Node >= 20.9.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build && npm run start` — production build and server
- `npm run typecheck && npm run lint` — checks before committing
- `npm run format` — Prettier over all files (`npm run format:check` to verify only)

## Structure

- `src/app/` — App Router: layouts, pages, routing. `page.tsx` opens with the page's direction contract
- `src/components/ui/` — reusable UI primitives: shadcn components plus the blueprint layer (`zone`, `rule`, `marker`, `schematic`, `metric-stat`, `section-heading`)
- `src/components/sections/` — page sections composed from primitives and content
- `src/components/hero-animation/` — isolated hero-effect module; its contract lives in the module's README
- `src/content/` — copy as typed data, kept separate from markup
- `src/fonts/` — self-hosted e-Ukraine WOFF2 builds, wired through `next/font/local`
- `src/lib/` — shared helpers (`cn`)
- `src/styles/globals.css` — the token layer: brand primitives, semantic tokens, the blueprint layer and the type roles
- `public/` — static assets (logo); `public/fonts/` holds the source OTFs, which are not shipped

## The blueprint layer

The visual system is documented in the repo-root `DESIGN.md` (tokens are normative there). What matters when writing components here:

- **`<Zone>` owns a section.** It sets the surface (`tone="paper"` or `tone="ink"`, the latter scoping `.dark`), the vertical rhythm (`pad`), the closing hairline, and it draws the construction lines. Sections do not set their own background.
- **The sheet is 12 columns.** `.sheet-grid` lays them out; `.sheet-main` (columns 3–10) is where content lives, `.sheet-edge-start` / `.sheet-edge-end` are the deliberately empty outer pairs used for markers.
- **No column gaps.** Nested grids use padding on the cells instead, so every edge lands exactly on a construction line. Adding `gap-x-*` to a sheet grid breaks that alignment.
- **Type comes from roles, not literals.** `.type-display`, `.type-headline`, `.type-title`, `.type-statement`, `.type-subtitle`, `.type-lead`, `.type-body`, `.type-caption`, `.type-metric`, `.label-micro`. A literal `text-[…px]` in a component means a role is missing — add it to `globals.css` and to `DESIGN.md`.
- **`.label-micro` is the only uppercase in the system** (11px / 0.14em). There is no other uppercase size.
- **Motion is one authored moment.** The hero draws itself in; everywhere else motion belongs to states (`--dur-state`, `--dur-move`, `--ease-draft`). Entrance animations per section are out.

## Code rules

- **Colors: semantic tokens only** (`bg-background`, `text-primary`, `border-rule`, `text-marker`, `bg-window`, …) in all components. Raw hex values and primitive scales (`ultramarine-*`, `gray-*`) are allowed in exactly two places: token definitions in `globals.css` and the decorative layer of `hero-animation` (see its contract).
- **Token values are not invented here** — they come from `docs/references-research.md` at the repo root; `globals.css` mirrors it.
- **shadcn components are added via `npx shadcn@latest add`**, not written by hand; their variants may be restyled to the blueprint language afterwards.
- **Copy is data**: text lives in `src/content/`, components render it. Mandated copy is verified against the brief — see the working rules in the repo root `CLAUDE.md`.
