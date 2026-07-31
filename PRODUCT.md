# Product

<!-- impeccable:product-schema 1 -->

Source of truth for the facts below: `docs/task/uapp-redesign-brief.md` (client spec),
`docs/references-research.md` (client brand tokens), `docs/voice-and-tone.md` (copy mandate).
This file distills them; it does not replace them.

## Platform

web

## Users

Decision-makers evaluating an engineering partner for money-moving systems:
CTO / Head of Engineering, Head of Digital & Innovation, Head of Payments,
Head of Compliance, and — in smaller fintechs — the CEO or founder.

They arrive from search, referral, or outbound, on desktop, during a working day, usually
building a shortlist. The job they are doing is *disqualification*: proving in a few minutes
that this vendor lives inside regulated finance and can be trusted with production payment
flows. They read protocol names, numbers, and audit posture — not adjectives.

Segments: mid-size banks, neobanks and EMIs; payment institutions and PSPs; crypto
exchanges and VASPs; fintech infrastructure providers. Global, no geographic focus.

## Product Purpose

The site is a lead engine for a ~60-person engineering company, not a business card.
It repositions UAPP from generalist outsourcing to a focused **regulated fintech and
payments team, banking-first, with crypto competence as an edge**, AI-native throughout.

Success = a qualified inbound enquiry through "Describe your challenge", and a visitor who
can restate the positioning correctly after one visit.

Scope of this iteration: the home page only, in English, desktop-first.

## Positioning

Banking first, crypto where you need it. Eight years in regulated finance — ISO 20022,
cards, SEPA, reconciliation, bank-grade security — and equal depth in wallets, exchanges
and on-chain compliance. One team, both sides.

The claim a neighbouring vendor cannot truthfully copy is the *pairing*: fiat rails depth
and on-chain compliance depth in one team, with the balance deliberately tilted to banking.
Not 50/50, not "we do everything".

## Operating Context

The visitor evaluates in parallel with 2–4 competitors, often forwarding the page to a
colleague in compliance or security. Case evidence is under NDA and cannot name clients.
Procurement conversations turn on standards (ISO 20022, PSD2/SCA, AML/KYC), on audit
readiness, and on whether the team has shipped the exact rail in question.

## Capabilities and Constraints

- Home page block flow (brief §6, order may be proposed differently): header · hero ·
  positioning band · trust strip · expertise (4 domains) · solutions showcase · selected
  work · AI across every layer · approach / why us · team teaser · insights teaser ·
  final CTA with form.
- **Hero signature animation is a hard requirement** (brief §7): the metaphor is money in
  motion / both sides of the bridge. Restrained and premium, never a crypto firework, never
  a content carousel, `prefers-reduced-motion` fallback mandatory.
- Showcase must be interactive tabs or cards — never an auto-rotating slider.
- Team is presented by domain roles only; no Frontend/Backend split.
- Case studies are anonymous under NDA. Non-fintech work belongs to "Other experience",
  never on the home page.
- Embedded Crypto for Banks is the flagship *inside* the showcase, never the site headline.
- WCAG AA. Desktop-first; responsive adaptation is a later iteration.
- Performance budget is not specified numerically — an open client question.

## Brand Commitments

- **Colour and type are mandated by the client brand book**, captured in
  `docs/references-research.md`: ultramarine scale, gray scale, black and white. The two
  secondary colours (`#578ADA`, `#9A98FF`) were explicitly excluded.
- **Typefaces:** e-Ukraine Head for headings, e-Ukraine for body and UI. Font files are in
  the repository (source OTFs in `uapp-site/public/fonts/`, shipped WOFF2 in
  `uapp-site/src/fonts/`); the webfont licence question stays open.
- **Logo:** `docs/research/assets/logo-uapp.svg`, shape unchanged, white on dark surfaces
  and black on light ones.
- **Voice:** engineers you can trust with money · precision over promotion · calm
  confidence. Full chart and banlist in `docs/voice-and-tone.md`.
- **Copy mandate:** hero, positioning band, expertise cards, the six cases, the AI block and
  the Approach pillars are fixed in content and message; only targeted wording refinement is
  allowed. Solutions copy is editable; microcopy, labels and section framing are free.
- **Explicitly avoided:** crypto aesthetics (neon, coins, cyber), "we do everything",
  empty slogans, aggressive animation, stock clichés.

## Evidence on Hand

- Real and citable: 8+ years, 170+ projects, 15 countries, $1B+ in clients' annual revenue;
  six anonymised engagements with domain detail (SEPA Instant / ISO 20022 lifecycle;
  US prepaid card program with Mastercard tokenization and real-time KYC; EU debt-collection
  and reconciliation with CAMT and multi-jurisdiction VAT; on-device ECDSA in Secure Enclave
  for SCA; embedded crypto inside a banking app with settlement webhooks; multi-chain wallet
  and on-chain compliance across 7+ networks).
- Not available, must not be fabricated: client names and logos, partner logos and their
  usage permissions, product screenshots (all client work is under NDA), team AI
  certifications (the client will supply the list), team photographs, testimonials,
  pricing, uptime or benchmark figures.
- Any illustrative interface material authored for the page is synthetic and must be
  labelled as a schematic, never presented as a screenshot of client software.

## Product Principles

1. **Disqualification-proof over persuasion.** Every block answers "do these people live in
   my world?" with a checkable fact — a standard, a number, a rail — not a promise.
2. **Banking-first, crypto as the edge.** Crypto competence is shown as depth on the second
   shore, never as the identity of the company.
3. **Restraint is the trust signal.** In this category, loudness reads as risk; precision
   reads as competence.
4. **Show the mechanism, not the metaphor.** Diagrams, message flows and metrics beat
   abstract illustration and stock imagery.
5. **NDA discipline is part of the product.** Anonymity is presented as rigour, not as a gap.

## Accessibility & Inclusion

WCAG 2.1 AA. Motion honours `prefers-reduced-motion` with a meaningful static frame;
any auto-animation longer than five seconds needs a visible, keyboard-reachable pause
control (SC 2.2.2); no flashing above three per second; the hero heading and metrics render
independently of any decorative canvas.
