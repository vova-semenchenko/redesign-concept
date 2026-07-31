# UAPP — Website Redesign

Redesign of the uapp.group home page: documentation lives in `docs/` (brief, research, client-mandated style tokens in `docs/brand-style-guide.md`, final logo `docs/research/assets/logo-uapp.svg`); the prototype is a Next.js app in `uapp-site/`.

## Commands (run inside `uapp-site/`)

- `npm run dev` — dev server (http://localhost:3000)
- `npm run typecheck && npm run lint` — checks before committing
- `npm run format` — Prettier over all files

## What this project is

UAPP is repositioning its site from "generalist outsourcing" to a focused **regulated fintech & payments (banking-first) team with crypto competence as an advantage**, AI-native throughout. The goal is a lead engine for a ~60-person company, not a business card.

## Document map

- `docs/task/uapp-redesign-brief.md` — full context: business goal, audience, positioning, block flow, mandated copy.
- `docs/research/` — `uapp-redesign-research.md` (consolidated index report) over the numbered `01-current-site-audit` … `05-brand-strategy-hypotheses`. Warning: `04-visual-redesign-concept.md` is obsolete — do not use its navy palette or IBM Plex; the client style guide is the mandate.
- `docs/brand-style-guide.md` — client-mandated tokens (colors/fonts/logo) and annotated visual references; in code they live as tokens in `uapp-site/src/styles/globals.css`.
- `docs/design-style.md` — the "technical blueprint" style direction (designer's decision layered on the mandated tokens): grid, zone rhythm, typography scale, components, isometric illustration system, motion character.
- `uapp-site/README.md` — prototype structure and code rules.
- `README.md` — entry point: document navigation plus the Figma concept link.

These documents change faster than this file — read them directly instead of restating them in CLAUDE.md.

## Current iteration scope

- Home page only, in English.
- Desktop-first.
- Deliverable: a high-fidelity prototype of the home page.

## Working rules (not obvious from code/docs)

- **Never rewrite mandated copy — and verify against the brief on every text change.** The client brief (§1, §8, §11) fixes the content and message of the hero, positioning band, expertise, case studies, and the AI block. Wording may be refined; positioning may not. Writing original copy for these blocks or globally replacing text is forbidden. Before changing any prototype text, determine the block's freedom level (mandated / editable / free) and, for mandated blocks, check against the verbatim brief text (§8) — the levels table and verification rule are in `docs/voice-and-tone.md` §0. Voice, tone, and microcopy for free blocks also follow `docs/voice-and-tone.md`.
- **Style decisions are mandated by the client's brand book — don't invent them.** The client provided brand book fragments (ultramarine palette, e-Ukraine Head/e-Ukraine fonts, logo); they are captured in `docs/brand-style-guide.md` as given tokens — the source of truth for token *values*. In code they are already materialized as the token layer in `uapp-site/src/styles/globals.css`; how components consume tokens is defined by the code rules in `uapp-site/README.md`. The full brand book doesn't exist yet: open items (font weights, webfont license, logo clearspace) are listed there — don't guess at them.
- **Embedded Crypto for Banks is the flagship product in the showcase, not the site's headline.** Don't undermine the banking-first identity.
- The team is presented by domain roles only — no "Frontend/Backend" split.
- Case studies are anonymous under NDA; non-fintech projects go only under "Other experience", never on the home page.
