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
  positioningBand: string;
  trust: { metrics: Metric[]; certificationsNote: string };
  expertise: { heading: string; cards: ExpertiseCard[] };
  solutions: { heading: string; cards: SolutionCard[] };
  selectedWork: { heading: string; ndaBadge: string; cases: CaseTeaser[] };
  aiLayer: { heading: string; statement: string; certificationsNote: string };
  approach: {
    heading: string;
    pillars: { title: string; description: string }[];
  };
  /**
   * `roles` — ті самі три рольові родини, що вже названі в `description`,
   * винесені у структуру для набору. Жодних нових фактів: імен, кількості
   * людей і стажу клієнт не надавав, і вигадувати їх не можна.
   */
  team: { heading: string; description: string; roles: string[] };
  insights: { heading: string; description: string };
  finalCta: {
    heading: string;
    microcopy: string[];
    submitLabel: string;
    successMessage: string;
  };
}
