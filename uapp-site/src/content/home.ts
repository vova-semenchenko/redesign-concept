import type { HomeContent } from "./types";

/**
 * Мандатний копірайт (бриф §8) — hero, positioning band, expertise-картки,
 * шість кейсів, AI-блок і три стовпи Approach — збережений за змістом;
 * правки тут допускаються лише точкові (пунктуація, регістр).
 *
 * Вільний шар — мітки регіонів, заголовки секцій, підписи, футер і стани
 * форми — написаний за docs/voice-and-tone.md.
 */
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
    marker: "Regulated fintech · payments · crypto",
    h1: "Engineering for regulated finance",
    h1Alternatives: [
      "We build the systems that move money",
      "Payments-grade engineering. Crypto-fluent",
    ],
    sub: "We design and ship payment rails, card programs and core integrations — with deep crypto and on-chain expertise where it counts. Banks and fintechs have trusted us across 170+ projects in 15 countries.",
    ctaPrimary: "Describe your challenge",
    ctaSecondary: "See our work",
    metrics: [
      { value: "8+", label: "years" },
      { value: "170+", label: "projects" },
      { value: "15", label: "countries" },
      { value: "$1B+", label: "client annual revenue" },
    ],
    visualCaption: "Both sides · schematic",
  },
  positioningBand: {
    marker: "Positioning",
    statement: "Banking first, crypto where you need it.",
    detail:
      "Eight years in regulated finance — ISO 20022, cards, SEPA, reconciliation and bank-grade security — and just as deeply in wallets, exchanges and on-chain compliance. One team, both sides.",
  },
  trust: {
    marker: "Standards we work to",
    standards: ["ISO 20022", "SEPA Instant", "PSD2 / SCA", "AML / KYC"],
    note: "Security documentation available under NDA.",
  },
  expertise: {
    marker: "Expertise · 4 domains",
    heading: "Four domains, banking-first",
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
        standards: [
          "Multi-chain wallets",
          "On-chain compliance",
          "Settlement webhooks",
        ],
      },
    ],
  },
  solutions: {
    marker: "Solutions · 4 products",
    heading: "Four products, one flagship",
    cards: [
      {
        id: "embedded-crypto",
        action: "Embed crypto",
        title: "Embedded Crypto for Banks",
        flagship: true,
        audience: "Banks and EMIs adding regulated crypto services",
        problem:
          "Launch compliant crypto features inside your banking app without building the infrastructure yourself.",
        standards: ["Regulated provider integration", "Settlement webhooks"],
      },
      {
        id: "iso20022-toolkit",
        action: "Process messages",
        title: "ISO 20022 Toolkit",
        audience: "Payment institutions migrating message flows",
        problem:
          "Model, validate and process ISO 20022 message lifecycles without reinventing the parser.",
        standards: [
          "Message validation",
          "Lifecycle modelling",
          "CAMT statements",
        ],
      },
      {
        id: "reconciliation-agent",
        action: "Reconcile ledgers",
        title: "Bank–Crypto Reconciliation Agent",
        audience: "Teams operating across fiat and on-chain ledgers",
        problem:
          "Reconcile transactions across banking and on-chain rails automatically.",
        standards: ["Fiat ledgers", "On-chain ledgers", "Automated matching"],
      },
      {
        id: "sca-signing",
        action: "Sign transactions",
        title: "SCA / Transaction Signing",
        audience: "Fintechs needing strong customer authentication",
        problem:
          "On-device transaction signing that meets SCA requirements without hurting UX.",
        standards: ["On-device ECDSA", "Secure Enclave", "PSD2 / SCA"],
      },
    ],
  },
  selectedWork: {
    marker: "Selected work · 6 engagements",
    heading: "Six engagements, clients withheld",
    description:
      "Every client here is under NDA. What we can show is the rail, the standard and what shipped.",
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
        domainLine:
          "Web & mobile — Mastercard tokenization, Apple/Google Pay, real-time KYC",
        factAnchor: "Card issuing across web and mobile",
      },
      {
        id: "debt-collection",
        clientProfile: "EU debt-collection & reconciliation platform",
        domainLine: "CAMT/ISO 20022 statements, multi-jurisdiction VAT",
        factAnchor: "Automated CAMT reconciliation",
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
    marker: "AI · delivery and product",
    heading: "AI across every layer",
    statement:
      "AI runs through how we work — from AI-assisted discovery and design-to-code to AI-augmented QA, and into the products we build for you.",
    layers: [
      "AI-assisted discovery",
      "Design-to-code",
      "AI-augmented QA",
      "The products we build for you",
    ],
  },
  approach: {
    marker: "Why us · 3 reasons",
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
    marker: "Team · senior only",
    heading: "The architects who'll work on your system",
    description:
      "A senior team of payments architects, security & compliance leads and on-chain systems engineers.",
    roles: [
      "Payments architects",
      "Security leads",
      "Compliance leads",
      "On-chain systems engineers",
    ],
  },
  insights: {
    marker: "Insights · 3 topics",
    heading: "Engineering notes",
    description: "Engineering notes on ISO 20022, on-chain compliance and SCA.",
    topics: [
      { title: "ISO 20022 message lifecycle", domain: "Payments" },
      { title: "On-chain compliance", domain: "Crypto" },
      { title: "SCA and transaction signing", domain: "Security" },
    ],
  },
  ctaStrip: {
    statement: "Every engagement starts with an NDA.",
    action: "Describe your challenge",
  },
  finalCta: {
    marker: "Contact",
    heading: "Describe your challenge",
    microcopy: [
      "We'll sign an NDA before any details.",
      "Response within one business day.",
    ],
    submitLabel: "Describe your challenge",
    successMessage: "Thanks — we'll get back to you within one business day.",
    fields: {
      name: "Name",
      email: "Work email",
      company: "Company",
      challenge: "Your challenge",
      challengeHint:
        "The rail, the standard, the deadline — whatever matters most.",
    },
  },
  footer: {
    columns: [
      {
        title: "Expertise",
        links: [
          { label: "Fintech & Payments", href: "#expertise" },
          { label: "Compliance & AML", href: "#expertise" },
          { label: "Security", href: "#expertise" },
          { label: "Crypto & Web3", href: "#expertise" },
        ],
      },
      {
        title: "Solutions",
        links: [
          { label: "Embedded Crypto for Banks", href: "#solutions" },
          { label: "ISO 20022 Toolkit", href: "#solutions" },
          { label: "Bank–Crypto Reconciliation Agent", href: "#solutions" },
          { label: "SCA / Transaction Signing", href: "#solutions" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Case studies", href: "#work" },
          { label: "Team", href: "#team" },
          { label: "Insights", href: "#insights" },
          { label: "Contact", href: "#contact" },
        ],
      },
    ],
    legal: [
      { label: "Privacy policy", href: "#" },
      { label: "Cookie policy", href: "#" },
    ],
    note: "Client work is under NDA.",
  },
};
