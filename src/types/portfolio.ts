export interface LinkItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderData {
  brand: string;
  navItems: LinkItem[];
  themeButtonLabel: string;
  connectButton: {
    label: string;
    href: string;
  };
}

export interface HeroAction {
  id: string;
  label: string;
  href: string;
  variant: "primary" | "secondary";
}

export interface HeroData {
  sectionId: string;
  eyebrow: string;
  headingLines: string[];
  highlightWord: string;
  description: string;
  actions: HeroAction[];
  photo: {
    url: string;
    alt: string;
  };
  panel: {
    title: string;
    facts: {
      id: string;
      label: string;
      value: string;
    }[];
    focusTags: string[];
  };
  quotesOfDay: string[];
}

export interface ExpertiseData {
  sectionId: string;
  panelEyebrow: string;
  panelBody: string;
  titleEyebrow: string;
  title: string;
  columns: string[];
}

export interface StackListItem {
  id: string;
  label: string;
  status: string;
}

export interface CapabilityCard {
  id: string;
  title: string;
  items: {
    id: string;
    title: string;
    description: string;
  }[];
}

export interface StackData {
  sectionId: string;
  languageCardTitle: string;
  frameworkCardTitle: string;
  languages: StackListItem[];
  frameworks: StackListItem[];
  capabilityCards: CapabilityCard[];
}

export interface WorkItemData {
  id: string;
  badges: string[];
  categories: string[];
  title: string;
  description: string;
  bulletPoints: string[];
  tags: string;
  image: {
    url: string;
    alt: string;
  };
  detail: {
    challenge: string;
    solution: string;
    impact: string;
    links: {
      label: string;
      href: string;
    }[];
  };
}

export interface WorksData {
  sectionId: string;
  sectionTitle: string;
  sectionLabel: string;
  defaultWorkId: string;
  items: WorkItemData[];
}

export interface TimelineEntry {
  id: string;
  dateRange: string;
  role: string;
  company: string;
  description: string;
}

export interface TimelineData {
  eyebrow: string;
  entries: TimelineEntry[];
}

export interface CareerTimelineEntry {
  id: string;
  dateRange: string;
  role: string;
  organization: string;
  milestone: string;
  highlights: string[];
  technologies: string[];
}

export interface CareerTimelineData {
  sectionId: string;
  eyebrow: string;
  title: string;
  entries: CareerTimelineEntry[];
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  meta: string;
}

export interface HighlightsData {
  sectionId: string;
  eyebrow: string;
  title: string;
  items: HighlightItem[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatarLabel: string;
  rating: number;
}

export interface TestimonialsData {
  sectionId: string;
  eyebrow: string;
  title: string;
  items: TestimonialItem[];
}

export interface CtaData {
  eyebrow: string;
  title: string;
  description: string;
  email: {
    label: string;
    href: string;
  };
  action: {
    label: string;
    href: string;
  };
}

export interface ProfilesData {
  sectionId: string;
  sectionTitle: string;
  sectionDescription: string;
  links: LinkItem[];
}

export interface FooterData {
  brand: string;
  links: LinkItem[];
}

export interface PortfolioData {
  header: HeaderData;
  hero: HeroData;
  expertise: ExpertiseData;
  stack: StackData;
  works: WorksData;
  timeline: TimelineData;
  highlights: HighlightsData;
  testimonials: TestimonialsData;
  profiles: ProfilesData;
  cta: CtaData;
  footer: FooterData;
}
