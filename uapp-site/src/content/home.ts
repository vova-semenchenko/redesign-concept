import type { HomeContent } from "./types";

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
    h1: "Engineering for regulated finance.",
    h1Alternatives: [
      "We build the systems that move money.",
      "Payments-grade engineering. Crypto-fluent.",
    ],
    sub: "We design and ship payment rails, card programs and core integrations — with deep crypto and on-chain expertise where it counts. Banks and fintechs have trusted us across 170+ projects in 15 countries.",
    ctaPrimary: "Describe your challenge",
    ctaSecondary: "See our work",
    metrics: [
      { value: "8+", label: "years in regulated finance" },
      { value: "170+", label: "projects delivered" },
      { value: "15", label: "countries" },
      { value: "$1B+", label: "in clients' annual revenue" },
    ],
  },
  positioningBand:
    "Banking first, crypto where you need it. Eight years in regulated finance — ISO 20022, cards, SEPA, reconciliation and bank-grade security — and just as deeply in wallets, exchanges and on-chain compliance. One team, both sides.",
  trust: {
    metrics: [
      { value: "8+", label: "years" },
      { value: "170+", label: "projects" },
      { value: "15", label: "countries" },
      { value: "$1B+", label: "clients' annual revenue" },
    ],
    certificationsNote: "Security documentation available under NDA.",
  },
  expertise: {
    heading: "Expertise",
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
    heading: "Solutions",
    cards: [
      {
        id: "embedded-crypto",
        title: "Embedded Crypto for Banks",
        flagship: true,
        audience: "Banks and EMIs adding regulated crypto services",
        problem:
          "Launch compliant crypto features inside your banking app without building the infrastructure yourself.",
      },
      {
        id: "iso20022-toolkit",
        title: "ISO 20022 Toolkit",
        audience: "Payment institutions migrating message flows",
        problem:
          "Model, validate and process ISO 20022 message lifecycles without reinventing the parser.",
      },
      {
        id: "reconciliation-agent",
        title: "Bank–Crypto Reconciliation Agent",
        audience: "Teams operating across fiat and on-chain ledgers",
        problem:
          "Reconcile transactions across banking and on-chain rails automatically.",
      },
      {
        id: "sca-signing",
        title: "SCA / Transaction Signing",
        audience: "Fintechs needing strong customer authentication",
        problem:
          "On-device transaction signing that meets SCA requirements without hurting UX.",
      },
    ],
  },
  selectedWork: {
    heading: "Selected work",
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
        factAnchor: "Automated reconciliation at scale",
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
    heading: "AI across every layer",
    statement:
      "AI runs through how we work — from AI-assisted discovery and design-to-code to AI-augmented QA, and into the products we build for you.",
    certificationsNote:
      "Team AI certifications — list to be provided by the client.",
  },
  approach: {
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
    heading: "The architects who'll work on your system",
    description:
      "A senior team of payments architects, security & compliance leads and on-chain systems engineers.",
    roles: [
      "Payments architects",
      "Security & compliance leads",
      "On-chain systems engineers",
    ],
  },
  insights: {
    heading: "Insights",
    description: "Engineering notes on ISO 20022, on-chain compliance and SCA.",
  },
  finalCta: {
    heading: "Describe your challenge",
    microcopy: [
      "We'll sign an NDA before any details.",
      "Response within one business day.",
    ],
    submitLabel: "Describe your challenge",
    successMessage: "Thanks — we'll get back to you within one business day.",
  },
};
