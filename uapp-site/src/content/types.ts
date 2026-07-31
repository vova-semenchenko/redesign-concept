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
  /** Дія в двочастинній мітці таба: «дієслово + об'єкт». */
  action: string;
  title: string;
  flagship?: boolean;
  audience: string;
  problem: string;
  /** Терміни, за якими читач упізнає свій світ. */
  standards: string[];
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

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface HomeContent {
  nav: { items: NavItem[]; cta: string };
  hero: {
    marker: string;
    h1: string;
    h1Alternatives: string[];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    metrics: Metric[];
    /** Підпис під сигнатурним ефектом — він і називає його схемою. */
    visualCaption: string;
  };
  /** Мандатний текст, розбитий на твердження і деталізацію — слова ті самі. */
  positioningBand: { marker: string; statement: string; detail: string };
  /** Смуга під героєм несе стандарти, а не повтор геройських цифр. */
  trust: { marker: string; standards: string[]; note: string };
  expertise: { marker: string; heading: string; cards: ExpertiseCard[] };
  solutions: { marker: string; heading: string; cards: SolutionCard[] };
  selectedWork: {
    marker: string;
    heading: string;
    description: string;
    ndaBadge: string;
    cases: CaseTeaser[];
  };
  aiLayer: {
    marker: string;
    heading: string;
    statement: string;
    layers: string[];
  };
  approach: {
    marker: string;
    heading: string;
    pillars: { title: string; description: string }[];
  };
  team: {
    marker: string;
    heading: string;
    description: string;
    roles: string[];
  };
  insights: {
    marker: string;
    heading: string;
    description: string;
    topics: { title: string; domain: string }[];
  };
  ctaStrip: { statement: string; action: string };
  finalCta: {
    marker: string;
    heading: string;
    microcopy: string[];
    submitLabel: string;
    successMessage: string;
    fields: {
      name: string;
      email: string;
      company: string;
      challenge: string;
      challengeHint: string;
    };
  };
  footer: {
    columns: FooterColumn[];
    legal: NavItem[];
    note: string;
  };
}
