# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Senior decision-makers evaluating an engineering partner for regulated money movement. They read the site to answer one question: can this team be trusted with our payments stack?

- **Primary roles:** CTO / Head of Engineering · Head of Digital & Innovation · Head of Payments · Head of Compliance · CEO/founder at smaller fintechs.
- **Organizations:** mid-size banks, neobanks and EMIs · payment providers and PSPs · crypto exchanges and VASPs · fintech infrastructure providers.
- **Geography:** global, no regional focus.
- **What decides it for them:** regulated-grade security, compliance and audit · a proven track record even when anonymised · payments and banking depth with crypto as an added edge · speed and AI-native delivery.

They arrive skeptical and scan before they read. For this audience a simplified ISO 20022 description destroys trust rather than building it.

## Product Purpose

UAPP is a ~60-person engineering company with eight years in fintech and crypto. This project redesigns the uapp.group home page to move its positioning from "generalist outsourcing" to a focused **regulated fintech and payments team, banking-first, with crypto competence as an advantage** — AI-native throughout.

The reason for the change: simple work is going to AI, and spreading across everything no longer holds. The site must work as a scalable lead engine for the company — multi-channel inbound plus the credibility banks and partners require. Success is a visitor who recognises their own world on the first screen and describes their challenge. Not a business card.

## Positioning

**"Banking first, crypto where you need it."** Eight years in regulated finance — ISO 20022, cards, SEPA, reconciliation, bank-grade security — and equally deep in wallets, exchanges and on-chain compliance. One team, both sides of the bridge.

What a neighbouring shop cannot truthfully copy is the combination: banking-grade regulated depth *and* production crypto work, held by one team, with the banking side leading. The balance is deliberately not 50/50 — crypto is the edge, not the identity. Embedded Crypto for Banks is the flagship of the Solutions showcase and never the site's headline.

## Operating Context

- **Deliverable:** a high-fidelity prototype of the Home page, built as a Next.js app in `uapp-site/`.
- **Definition of done:** production-quality visual build. SEO configuration and the form's lead-delivery backend are explicitly out of scope — the form is UI only.
- **Iteration scope:** Home page only, in English, **responsive** (mobile and tablet included). This extends the brief's original desktop-first constraint.
- **Block flow:** the brief §6 recommends twelve blocks — header, hero, positioning band, trust strip, expertise, solutions showcase, selected work, AI layer, approach, team teaser, insights teaser, final CTA with form. Order and composition may be proposed differently; the flow is a baseline, not a mandate.
- **How variants are judged:** the evaluation checklist in brief §11 — banking-first legible from the first screen, signature hero animation with reduced-motion fallback, no crypto aesthetics or carousels, brand qualities present, mandated copy preserved, Embedded Crypto as flagship not headline, interactive showcase, anonymous cases, no FE/BE split, WCAG AA.

## Capabilities and Constraints

**Copy is governed, not authored.** Brief §8 fixes the content and message of the hero, positioning band, expertise cards, the six selected-work cases, the AI block and Approach. The brief (§1, §8, §11) defines three freedom levels — mandated (wording refinements only), editable (Solutions; the choice among three H1 options), free (microcopy, labels, form states). Forbidden: writing original copy for mandated blocks, replacing mandated copy wholesale, merging mandated messages, or adding facts and figures absent from the brief.

**Structural rules that cannot be traded away:**

- The hero must carry a signature "wow" animation expressing the money-movement / both-shores metaphor. It is a stated must-have, not an option. Not a content carousel; within a performance budget; a reduced-motion fallback is mandatory.
- The Solutions showcase is interactive tabs or cards — never an auto-advancing slider.
- The team is presented by domain roles only — no Frontend/Backend split.
- Case studies are anonymous under NDA. Non-fintech work appears only under "Other experience", never on Home.
- Avoid: crypto aesthetics (neon, coins, cyber), "we do everything" breadth, empty slogans, aggressive animation, stock clichés.

**Stack:** Next.js 16, React 19, Tailwind v4, shadcn/Radix, TypeScript. Checks before committing: `npm run typecheck && npm run lint` inside `uapp-site/`.

**Undecided — all six of the brief's §11 open questions are still open as of 2026-08-01.** Future work records these as unknown rather than inventing them:

1. The list of the team's AI certifications for the AI block.
2. Partner logos for the trust strip, and whether permission to display them exists.
3. The "Describe your challenge" form: field set, and where leads go (CRM or email).
4. Performance budget as numbers — LCP, CLS, hero-effect weight.
5. Lead-engine success metrics — how inbound is measured after launch.
6. The current full version of the brand book.

## Brand Commitments

- **Name:** UAPP. **Logo:** `docs/research/assets/logo-uapp.svg` — the final mark; its shape is not to be altered. White on dark canvas, black on light.
- **Mandated tokens** (`docs/concept-research.md` §1–4, materialized in `uapp-site/src/styles/globals.css`): ultramarine as the single accent, gray as neutral, e-Ukraine Head for headings and e-Ukraine for body, and the semantic light/dark pairs with their computed contrast figures. Values come from the client's brand book and are not invented or adjusted.
- **Brand qualities:** institutional trust · engineering precision · premium feel · regulated-grade · AI-native.
- **Voice** (derived from the brief's §4 brand qualities): engineers you can trust with money · precision over promotion · calm confidence. Serious, formal-neutral, respectful, matter-of-fact. Sentence case everywhere. An anti-slop banlist governs vocabulary.
- **Fonts on hand:** both mandated families are in the repo as `.otf` sources under `uapp-site/public/fonts/`, in six cuts each (UltraLight, Thin, Light, Regular, Medium, Bold). Regular and Medium are converted to woff2 and wired into the app; the rest are unused.
- **Open brand items — do not guess:** which cuts are approved for production use, the webfont licence terms, and logo clearspace.

## Evidence on Hand

- **Figures usable verbatim** (brief §8): 8+ years · 170+ projects · 15 countries · $1B+ in clients' annual revenue.
- **Six anonymous case studies** with real technical substance: SEPA Instant with the ISO 20022 message lifecycle · a US prepaid card program with Mastercard tokenization, Apple/Google Pay and real-time KYC · an EU debt-collection and reconciliation platform (CAMT/ISO 20022, multi-jurisdiction VAT) · mobile transaction signing (SCA) with on-device ECDSA in the Secure Enclave · embedded crypto inside a banking app with settlement webhooks · a multi-chain wallet with on-chain compliance across 7+ networks.
- **Assets:** the final logo · 35 audit screenshots of the current site (`docs/research/screenshots/`) · five benchmark hero screenshots (`docs/research/assets/screenshots/`) · the Figma concept file linked from `README.md`.
- **Absences future work must not fabricate:** no named clients or client logos · no testimonials · no partner logos cleared for display · no AI certification names · no pricing · no uptime or SLA numbers.

## Product Principles

1. **Banking leads, crypto sharpens.** Every block reads banking-first. Crypto is the edge that makes the team unusual, never an equal half of the identity.
2. **Proof over adjectives.** A number, a standard or a protocol name replaces any claim that cannot be checked. A metric without commentary is stronger than a metric with one.
3. **Respect the expert reader.** Terminological precision beats simplification. The audience is senior, scanning, and insulted by explanation of the obvious.
4. **The mandate is a boundary, not a suggestion.** Copy content, brand tokens and the structural rules come from the brief and the brand book. Invention happens only where they leave room — and where they are silent, the gap is recorded, not filled.
5. **Restraint is the credibility signal.** Premium reads as calm and precise, not as effects. The one deliberate exception is the hero, and even there the frame is "premium and restrained, not a crypto firework".

## Accessibility & Inclusion

- **WCAG 2.1 AA** is the required standard (brief §9).
- A **reduced-motion fallback is mandatory** for the hero effect and for any motion added elsewhere.
- The semantic token table in `docs/concept-research.md` §4 carries computed contrast ratios and two hard rules that follow from them: ultramarine/600 and darker are never used as text on dark surfaces (contrast collapses to ~2.4–2.6:1), and gray/400 and lighter are never used as text on light surfaces.
