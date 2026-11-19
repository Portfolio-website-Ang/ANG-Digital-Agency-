export type ServiceOption =
  | 'Website Design & Development'
  | 'SEO & Content Strategy'
  | 'Social Media Management'
  | 'Branding & Creative Design'
  | 'Performance Marketing'
  | 'Multiple Services / Strategy';

export const SERVICE_OPTIONS: ServiceOption[] = [
  'Website Design & Development',
  'SEO & Content Strategy',
  'Social Media Management',
  'Branding & Creative Design',
  'Performance Marketing',
  'Multiple Services / Strategy',
];

export type ServiceCategoryFilter = 'all' | 'digital' | 'growth' | 'brand';

export interface AgencyService {
  number: string;
  discipline: string;
  title: ServiceOption;
  category: Exclude<ServiceCategoryFilter, 'all'>;
  description: string;
  deliverables: string[];
  featured?: boolean;
}

export const AGENCY_SERVICES: AgencyService[] = [
  {
    number: '01',
    discipline: 'Digital Experience',
    title: 'Website Design & Development',
    category: 'digital',
    featured: true,
    description:
      'Responsive, intuitive websites designed to communicate your value clearly and guide visitors toward meaningful business action.',
    deliverables: [
      'UI/UX and responsive architecture',
      'Business and conversion landing pages',
      'Speed and usability optimization',
      'CMS setup and ongoing maintenance',
    ],
  },
  {
    number: '02',
    discipline: 'Organic Visibility',
    title: 'SEO & Content Strategy',
    category: 'growth',
    description:
      'Build long-term search visibility and connect your business with people actively looking for your solutions.',
    deliverables: [
      'Keyword and competitor research',
      'Technical and on-page SEO',
      'Local SEO optimization',
      'Content planning and optimization',
    ],
  },
  {
    number: '03',
    discipline: 'Community & Content',
    title: 'Social Media Management',
    category: 'brand',
    description:
      'Create a consistent social presence with relevant content, thoughtful planning, and active community engagement.',
    deliverables: [
      'Social media strategy',
      'Content calendars and copy',
      'Creative posts and short videos',
      'Engagement and monthly reporting',
    ],
  },
  {
    number: '04',
    discipline: 'Brand Identity',
    title: 'Branding & Creative Design',
    category: 'brand',
    description:
      'Develop a distinctive visual and verbal identity that makes your business recognizable and consistent across every channel.',
    deliverables: [
      'Brand strategy and positioning',
      'Logo and visual identity systems',
      'Comprehensive brand guidelines',
      'Digital and print collateral',
    ],
  },
  {
    number: '05',
    discipline: 'Paid Acquisition',
    title: 'Performance Marketing',
    category: 'growth',
    description:
      'Plan and optimize paid campaigns around defined audiences, measurable objectives, and disciplined budget allocation.',
    deliverables: [
      'Meta and Google Ads management',
      'Audience and funnel strategy',
      'Creative and copy testing',
      'Conversion tracking and reporting',
    ],
  },
];

export type WorkFilter = 'all' | 'web' | 'brand';

export interface ShowcaseProject {
  id: string;
  category: Exclude<WorkFilter, 'all'>;
  categoryLabel: string;
  title: string;
  subtitle: string;
  imagePath: string;
  imageAlt: string;
  summary: string;
  deliverables: string[];
  outcomeFocus: string;
  recommendedService: ServiceOption;
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: 'business-website-experience',
    category: 'web',
    categoryLabel: 'Website & Digital Experience',
    title: 'Business Website Experience',
    subtitle: 'Conversion-focused architecture for modern service brands',
    imagePath: '/src/assets/images/work_web_experience_1794854682847.jpg',
    imageAlt: 'Laptop displaying a structured corporate website interface on a minimalist travertine desk',
    summary:
      'A concept direction demonstrating how clear messaging hierarchy, structured service pathways, and fast responsive execution turn visitor attention into qualified enquiries.',
    deliverables: [
      'Information architecture & UX wireframes',
      'Responsive UI design system',
      'Lead capture & CRM-ready enquiry flow',
      'Core Web Vitals performance tuning',
    ],
    outcomeFocus: 'Clear positioning from landing hero to qualified consultation request',
    recommendedService: 'Website Design & Development',
  },
  {
    id: 'campaign-identity-direction',
    category: 'brand',
    categoryLabel: 'Branding & Campaign Creative',
    title: 'Campaign Identity Direction',
    subtitle: 'Cohesive visual language across digital and collateral touchpoints',
    imagePath: '/src/assets/images/work_brand_campaign_1794854682317.jpg',
    imageAlt: 'Editorial flat-lay of corporate brand identity stationery and tablet campaign mockup on dark slate',
    summary:
      'A visual concept demonstrating how a unified creative direction brings brand identity, campaign messaging, and cross-channel digital assets together seamlessly.',
    deliverables: [
      'Visual identity & typography system',
      'Campaign key visuals & copy framework',
      'Executive presentation & print stationery',
      'Social and paid media creative kit',
    ],
    outcomeFocus: 'Consistent brand recognition across web, social, and executive touchpoints',
    recommendedService: 'Branding & Creative Design',
  },
];

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description: 'Understand your business, audience, goals, and current digital position before prescribing tactics.',
  },
  {
    number: '02',
    title: 'Strategize',
    description: 'Define clear priorities, deliverables, timelines, and the right mix of channels for your stage.',
  },
  {
    number: '03',
    title: 'Execute',
    description: 'Design, build, launch, and coordinate the agreed digital work with consistent craft.',
  },
  {
    number: '04',
    title: 'Optimize',
    description: 'Review performance, learn from real evidence, and refine what comes next.',
  },
];

export const WORKING_PRINCIPLES = [
  {
    number: '01',
    title: 'Understand',
    description: 'Know the business and audience deeply.',
  },
  {
    number: '02',
    title: 'Create',
    description: 'Build with clarity and strategic intent.',
  },
  {
    number: '03',
    title: 'Activate',
    description: 'Launch the right digital actions.',
  },
  {
    number: '04',
    title: 'Improve',
    description: 'Learn, measure, and refine continuously.',
  },
];

export type FaqCategory = 'all' | 'process' | 'pricing' | 'timelines';

export interface FaqItem {
  id: string;
  number: string;
  category: Exclude<FaqCategory, 'all'>;
  categoryLabel: string;
  question: string;
  answer: string;
}

export const AGENCY_FAQS: FaqItem[] = [
  {
    id: 'faq-process-start',
    number: '01',
    category: 'process',
    categoryLabel: 'Process',
    question: 'How does an engagement with ANG Digital Agency begin?',
    answer:
      'Every project opens with our Discover and Strategize stages. We audit your existing digital channels, clarify your target audience and commercial goals, and deliver a written scope with defined milestones before production begins.',
  },
  {
    id: 'faq-pricing-structure',
    number: '02',
    category: 'pricing',
    categoryLabel: 'Pricing',
    question: 'How do you structure pricing for websites, branding, and marketing?',
    answer:
      'Fixed-scope deliverables such as website builds and brand identity systems are quoted as milestone-based project fees. Ongoing disciplines—including SEO, social media management, and performance marketing—operate on clear monthly retainers scaled to channel volume and deliverables.',
  },
  {
    id: 'faq-timelines-website',
    number: '03',
    category: 'timelines',
    categoryLabel: 'Timelines',
    question: 'How long does it take to design and launch a custom business website?',
    answer:
      'A focused marketing site or high-converting landing architecture typically launches in 3 to 5 weeks from discovery sign-off. Multi-page corporate platforms with custom integrations, CMS workflows, and SEO migration generally take 6 to 10 weeks.',
  },
  {
    id: 'faq-pricing-ad-spend',
    number: '04',
    category: 'pricing',
    categoryLabel: 'Pricing',
    question: 'Is paid media ad spend included in Performance Marketing fees?',
    answer:
      'No—your media budget is paid directly to Meta, Google, or LinkedIn from your own ad account so you retain complete ownership of historical data and billing. ANG charges a transparent management fee covering strategy, creative testing, and conversion reporting.',
  },
  {
    id: 'faq-process-collaboration',
    number: '05',
    category: 'process',
    categoryLabel: 'Process',
    question: 'How do reviews, revisions, and client approvals work during production?',
    answer:
      'Each milestone includes structured review checkpoints where your team inspects interactive prototypes, copy decks, or campaign previews. Consolidated feedback is incorporated within 48 business hours, and you can track brief progress directly inside the ANG Client Portal.',
  },
  {
    id: 'faq-timelines-seo',
    number: '06',
    category: 'timelines',
    categoryLabel: 'Timelines',
    question: 'When should we expect measurable results from SEO and Performance Marketing?',
    answer:
      'Paid acquisition campaigns begin generating test data and qualified leads within the first 7 to 14 days after launch, with optimization compounding over months two and three. Technical and content-led SEO builds lasting organic equity, typically showing measurable ranking and traffic gains within 90 to 120 days.',
  },
  {
    id: 'faq-pricing-bundled',
    number: '07',
    category: 'pricing',
    categoryLabel: 'Pricing',
    question: 'Can we bundle branding, web development, and launch marketing together?',
    answer:
      'Yes. Most growth-stage clients combine Brand Identity, Website Design & Development, and a 90-day Launch Marketing sprint into a unified roadmap. Bundling eliminates handoff delays between teams and carries preferred milestone packaging.',
  },
  {
    id: 'faq-process-ownership',
    number: '08',
    category: 'process',
    categoryLabel: 'Process',
    question: 'Do we retain full ownership of our website code, domain, and brand assets?',
    answer:
      'Yes, 100%. Upon milestone completion, your organization owns all source files, brand guidelines, domains, analytics properties, and ad accounts outright—with zero proprietary lock-in.',
  },
];

export type TestimonialFilter = 'all' | 'partner' | 'digital' | 'growth';

export interface ClientTestimonial {
  id: string;
  number: string;
  category: Exclude<TestimonialFilter, 'all'>;
  service: ServiceOption;
  engagementDuration: string;
  metricOutcome: string;
  quote: string;
  authorName: string;
  authorRole: string;
  organization: string;
  featured?: boolean;
}

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'al-nibras-group',
    number: '01',
    category: 'partner',
    service: 'Multiple Services / Strategy',
    engagementDuration: 'Strategic Alliance · 12 Months',
    metricOutcome: '+138% Qualified Enterprise Enquiries in 6 Months',
    featured: true,
    quote:
      'Before partnering with ANG Digital Agency, our digital touchpoints operated as disconnected regional brochures. ANG unified our brand positioning, rebuilt our web conversion architecture, and aligned paid acquisition around clear commercial KPIs—delivering +138% more qualified enterprise enquiries within six months.',
    authorName: 'Tariq Al-Mansoor',
    authorRole: 'Director of Digital Operations',
    organization: 'Al Nibras Group',
  },
  {
    id: 'kestrel-logistics',
    number: '02',
    category: 'digital',
    service: 'Website Design & Development',
    engagementDuration: 'Web & UX Rebuild · 5-Week Launch',
    metricOutcome: '2.4x Demo Request Conversion Rate Post-Launch',
    quote:
      'Our legacy site buried our core freight capabilities under dense technical menus. ANG restructured our messaging hierarchy and launched a faster responsive site in five weeks, lifting visitor-to-demo conversion by 2.4x in the first quarter.',
    authorName: 'Nadia Qureshi',
    authorRole: 'Head of Commercial Growth',
    organization: 'Kestrel Freight & Logistics',
  },
  {
    id: 'veridian-clinics',
    number: '03',
    category: 'growth',
    service: 'SEO & Content Strategy',
    engagementDuration: 'Organic & Local SEO · 6 Months',
    metricOutcome: '+165% Non-Branded Organic Search Bookings',
    quote:
      'We relied heavily on paid ads with rising cost-per-lead. ANG rebuilt our technical SEO foundation and launched structured service guides across four city locations, growing non-branded organic patient bookings by 165% over six months.',
    authorName: 'Dr. Omar Farooq',
    authorRole: 'Managing Partner',
    organization: 'Veridian Specialist Clinics',
  },
  {
    id: 'solis-architectural',
    number: '04',
    category: 'growth',
    service: 'Branding & Creative Design',
    engagementDuration: 'Identity & Campaign Kit · 8 Weeks',
    metricOutcome: '38% Faster Sales Proposal Turnaround',
    quote:
      'Entering regional commercial tenders required an authoritative visual identity. ANG delivered a complete brand system, digital guidelines, and executive pitch collateral that cut our proposal preparation time by 38% and elevated partner trust.',
    authorName: 'Hana Siddiqui',
    authorRole: 'Principal Architect',
    organization: 'Solis Architectural Studio',
  },
  {
    id: 'meridian-saas',
    number: '05',
    category: 'digital',
    service: 'Performance Marketing',
    engagementDuration: 'Paid Search & Meta · 90-Day Sprint',
    metricOutcome: '-31% Cost Per Qualified Lead in 90 Days',
    quote:
      'Previous campaigns generated high click volume but low-intent signups. ANG segmented our Google Search and Meta retargeting funnels with disciplined creative testing, reducing cost per qualified lead by 31% within 90 days.',
    authorName: 'Zainab Habib',
    authorRole: 'VP of Revenue',
    organization: 'Meridian Fleet Software',
  },
];

export const AGENCY_CONTACT = {
  brandName: 'ANG',
  fullName: 'ANG Digital Agency',
  partnerName: 'Al Nibras Group',
  website: 'https://www.angdigital.agency',
  websiteLabel: 'www.angdigital.agency',
  email: 'hello@angdigital.com',
  logoImage: '/assets/aistudio/file_00000000eb7c8208aae6fcd8c1b201a7_22b7b944.png',
  loginBannerImage: '/assets/aistudio/file_00000000da6c8208bb68ee961e5afbfc_c1ab178f.png',
  bannerImage: '/assets/aistudio/file_00000000da6c8208bb68ee961e5afbfc_c1ab178f.png',
  studioImage: '/src/assets/images/agency_studio_collab_1794854683435.jpg',
};
