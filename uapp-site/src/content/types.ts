export interface Metric {
  value: string;
  label: string;
}

export interface ExpertiseCard {
  title: string;
  description: string;
  standards: string[];
}

export interface SolutionCard {
  id: string;
  title: string;
  flagship?: boolean;
  audience: string;
  problem: string;
}

export interface CaseTeaser {
  id: string;
  clientProfile: string;
  domainLine: string;
  factAnchor: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HomeContent {
  nav: { items: NavItem[]; cta: string };
  hero: {
    h1: string;
    h1Alternatives: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: Metric[];
  };
  /**
   * Мандатний текст брифу §8, розбитий на два рівні ієрархії для верстки:
   * `lead + " " + body` дає рядок брифу слово в слово.
   */
  positioningBand: { lead: string; body: string };
  trust: { metrics: Metric[]; certificationsNote: string };
  expertise: { heading: string; cards: ExpertiseCard[] };
  solutions: { heading: string; cards: SolutionCard[] };
  selectedWork: {
    heading: string;
    ndaBadge: string;
    cases: CaseTeaser[];
    /** Остання комірка сітки кейсів — CTA замість картки. */
    ctaCard: { note: string; cta: string };
  };
  aiLayer: {
    heading: string;
    statement: string;
    /** Підписи вузлів схеми — узяті з мандатного statement, не нові твердження. */
    stages: string[];
    certificationsNote: string;
  };
  approach: {
    heading: string;
    pillars: { title: string; description: string }[];
  };
  team: { heading: string; description: string };
  insights: { heading: string; description: string };
  finalCta: {
    heading: string;
    microcopy: string[];
    submitLabel: string;
    successMessage: string;
  };
  footer: { legal: string; note: string };
}
