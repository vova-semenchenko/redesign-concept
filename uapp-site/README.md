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
  (`section` — zone + visible grid, `micro-label`, `metric-stat`, `iso-icon`, `iso-pipeline`, `cta-band`)
- `src/components/sections/` — page sections composed from primitives and content
- `src/components/hero-animation/` — isolated hero-effect module; its contract lives in the module's README
- `src/content/` — copy as typed data, kept separate from markup
- `src/lib/` — shared helpers (`cn`)
- `src/styles/globals.css` — the token layer: brand primitives and the semantic tokens built on them
- `public/` — static assets (logo)

## Code rules

- **Colors: semantic tokens only** (`bg-background`, `text-primary`, `border-border`, …) in all components. Raw hex values and primitive scales (`ultramarine-*`, `gray-*`) are allowed in exactly two places: token definitions in `globals.css` and the decorative layer of `hero-animation` (see its contract).
- **Token values are not invented here** — they come from `docs/brand-style-guide.md` at the repo root; `globals.css` mirrors it.
- **Layout goes through `Section` + `Container`**, never raw `mx-auto max-w-*`: the section owns the zone (`light` / `quiet` / `dark`), the through-going grid rules and the hairline boundary. Section spacing lives on the `Container` (`py-*`).
- **Zones, not a global theme**: dark sections carry `.dark` scoped to the section — the same page holds both surfaces at once.
- **Hairlines**: `border-rule` for dividers, `border-rule-faint` for grid lines. Section rhythm uses lines, not gaps.
- **Micro-typography** (labels, section numbers, diagram captions) goes through `MicroLabel` / `IndexChip`, not ad-hoc `text-xs uppercase`.
- **Illustrations**: one isometric system (2:1, contour-only, `data-iso`) shared by `IsoIcon`, `IsoPipeline` and the hero visual. One filled object per composition; everything else is outline. See `docs/design-style.md` §7.
- **The style direction itself** (grid, zone rhythm, typography scale, motion character) is documented in `docs/design-style.md` — a designer decision layered on top of the client-mandated tokens.
- **shadcn components are added via `npx shadcn@latest add`**, not written by hand.
- **Copy is data**: text lives in `src/content/`, components render it. Mandated copy is verified against the brief — see the working rules in the repo root `CLAUDE.md`.
