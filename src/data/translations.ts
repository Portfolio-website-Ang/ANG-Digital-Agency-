import { Language } from '../context/LanguageContext';
import {
  AGENCY_FAQS,
  AGENCY_SERVICES,
  CLIENT_TESTIMONIALS,
  FaqCategory,
  FaqItem,
  AgencyService,
  ClientTestimonial,
  PROCESS_STEPS,
  ProcessStep,
  ServiceCategoryFilter,
  ServiceOption,
  SHOWCASE_PROJECTS,
  ShowcaseProject,
  TestimonialFilter,
  WORKING_PRINCIPLES,
  WorkFilter,
} from './agencyData';

export interface TranslationBundle {
  meta: {
    title: string;
  };
  brand: {
    shortName: string;
    fullName: string;
    partnerName: string;
  };
  nav: {
    links: { label: string; href: string }[];
    clientPortal: string;
    clientLogin: string;
    openMenuAria: string;
    closeMenuAria: string;
    languageGroupAria: string;
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    partnerLabel: string;
    trustNote: string;
    cardPartnerPrefix: string;
    cardCapabilitiesCta: string;
    cardFooterLeft: string;
    capabilityStrip: string[];
  };
  approach: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  servicesSection: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    filterAria: string;
    filters: { id: ServiceCategoryFilter; label: string }[];
    coreCapabilityLabel: string;
    requestScope: string;
    planWithAi: string;
    customRoadmapTag: string;
    customRoadmapTitle: string;
    customRoadmapBody: string;
    customRoadmapCta: string;
    items: AgencyService[];
    serviceLabels: Record<ServiceOption, string>;
  };
  about: {
    studioFallbackTitle: string;
    workingPrincipleEyebrow: string;
    principles: { number: string; title: string; description: string }[];
    eyebrow: string;
    headline: string;
    paragraphOnePrefix: string;
    paragraphOneSuffix: string;
    paragraphTwo: string;
    pillars: { title: string; description: string }[];
  };
  faqSection: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    filterAria: string;
    filters: { id: FaqCategory; label: string }[];
    ctaTitle: string;
    ctaBody: string;
    ctaProposal: string;
    ctaAskAi: string;
    items: FaqItem[];
  };
  workSection: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    filterAria: string;
    filters: { id: WorkFilter; label: string }[];
    showcaseLabel: string;
    inspectDirection: string;
    closeModalAria: string;
    targetOutcome: string;
    includedDeliverables: string;
    askAiAboutThis: string;
    startSimilarProject: string;
    projects: ShowcaseProject[];
  };
  processSection: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    steps: ProcessStep[];
  };
  testimonialsSection: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    filterAria: string;
    filters: { id: TestimonialFilter; label: string }[];
    exploreScope: string;
    items: ClientTestimonial[];
  };
  assistant: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    suggestedPromptsLabel: string;
    starterPrompts: { label: string; prompt: string }[];
    savedThreadsLabel: string;
    newThread: string;
    savedAutoNote: string;
    guestLoginNote: string;
    clientLogin: string;
    headerTitle: string;
    deepModeSubtitle: string;
    fastModeSubtitle: string;
    modeAria: string;
    fastBriefLabel: string;
    deepStrategyLabel: string;
    loadingConversation: string;
    thinkingPlaceholder: string;
    copyPromptLabel: string;
    copyToBrief: string;
    inputAria: string;
    inputPlaceholder: string;
    send: string;
    welcomeMessage: string;
    newThreadMessage: string;
    externalPromptTemplate: (serviceLabel: string) => string;
    externalProjectTemplate: (title: string, categoryLabel: string) => string;
  };
  contact: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    directEmailLabel: string;
    allianceLabel: string;
    allianceValue: string;
    portalTitle: string;
    portalSignedInPrefix: string;
    portalGuestSubtitle: string;
    signOut: string;
    clientLogin: string;
    adminView: string;
    showMyBriefs: string;
    showAllBriefs: string;
    noSavedBriefs: string;
    guestPortalNote: string;
    statusLabel: string;
    statuses: Record<'submitted' | 'in_review' | 'archived', string>;
    archiveAria: string;
    deleteAria: string;
    formTitle: string;
    formRequiredNote: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    businessLabel: string;
    businessPlaceholder: string;
    serviceLabel: string;
    chooseService: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    submitting: string;
    submitButton: string;
    validationName: string;
    validationEmail: string;
    validationService: string;
    validationDetails: string;
    successSignedIn: (refId: string) => string;
    successGuest: (refId: string) => string;
  };
  loginModal: {
    closeAria: string;
    bannerCaptionTitle: string;
    portalSubtitle: string;
    title: string;
    description: string;
    connecting: string;
    continueGoogle: string;
    securityNote: string;
  };
  newsletter: {
    eyebrow: string;
    headline: string;
    subtitle: string;
    emailLabel: string;
    emailPlaceholder: string;
    note: string;
    subscribing: string;
    subscribed: string;
    subscribe: string;
    validationError: string;
    successSignedIn: (email: string, refId: string) => string;
    successGuest: (email: string, refId: string) => string;
  };
  footer: {
    taglinePrefix: string;
    summary: string;
    navAria: string;
    navLinks: { label: string; href: string }[];
    rights: string;
  };
  progressAria: string;
}

const EN_BUNDLE: TranslationBundle = {
  meta: {
    title: 'ANG Digital Agency — Strategy, Branding & Digital Growth',
  },
  brand: {
    shortName: 'ANG',
    fullName: 'ANG Digital Agency',
    partnerName: 'Al Nibras Group',
  },
  nav: {
    links: [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Our Work', href: '#work' },
      { label: 'Process', href: '#process' },
      { label: 'Strategy AI', href: '#assistant' },
    ],
    clientPortal: 'Client Portal',
    clientLogin: 'Client Login',
    openMenuAria: 'Open navigation menu',
    closeMenuAria: 'Close navigation menu',
    languageGroupAria: 'Select website language',
  },
  hero: {
    eyebrow: 'Strategy · Branding · Marketing · Development',
    headline: 'Elevating brands. Inspiring measurable growth.',
    subheadline:
      'We turn ambitious business goals into high-performing digital experiences. From strategy and brand identity to web architecture and paid acquisition, ANG helps your business move forward with clarity.',
    primaryCta: 'Schedule Discovery Call',
    secondaryCta: 'Consult Strategy AI',
    partnerLabel: 'Proud Partner of Al Nibras Group',
    trustNote: 'Built for measurable progress',
    cardPartnerPrefix: 'Strategic Partner of',
    cardCapabilitiesCta: 'Capabilities',
    cardFooterLeft: 'Clarity before execution',
    capabilityStrip: [
      'Web Design & Development',
      'SEO & Organic Growth',
      'Social Media Management',
      'Brand Identity',
      'Performance Marketing',
    ],
  },
  approach: {
    eyebrow: 'The ANG Approach',
    headline: 'Good marketing is more than being seen.',
    body: 'It is about being understood, trusted, and chosen. We bring your digital touchpoints together into one clear experience so every interaction has a purpose and every decision follows a measurable direction.',
  },
  servicesSection: {
    eyebrow: 'What We Do',
    headline: 'Digital services built for real business outcomes.',
    subtitle:
      'A connected set of capabilities designed to build credibility, attract qualified demand, and convert attention into revenue.',
    filterAria: 'Filter agency services',
    filters: [
      { id: 'all', label: 'All Services' },
      { id: 'digital', label: 'Digital & Web' },
      { id: 'growth', label: 'Growth & Paid' },
      { id: 'brand', label: 'Brand & Social' },
    ],
    coreCapabilityLabel: 'Core Capability',
    requestScope: 'Request Scope',
    planWithAi: 'Plan with Strategy AI',
    customRoadmapTag: 'Custom Roadmap',
    customRoadmapTitle: 'Need a complete digital growth plan?',
    customRoadmapBody:
      'Share where your business stands today and where you want to expand. We will sequence the exact priorities across web, search, brand, and acquisition.',
    customRoadmapCta: 'Discuss Your Goals',
    items: AGENCY_SERVICES,
    serviceLabels: {
      'Website Design & Development': 'Website Design & Development',
      'SEO & Content Strategy': 'SEO & Content Strategy',
      'Social Media Management': 'Social Media Management',
      'Branding & Creative Design': 'Branding & Creative Design',
      'Performance Marketing': 'Performance Marketing',
      'Multiple Services / Strategy': 'Multiple Services / Strategy',
    },
  },
  about: {
    studioFallbackTitle: 'ANG Strategy & Creative Studio',
    workingPrincipleEyebrow: 'The ANG Working Principle',
    principles: WORKING_PRINCIPLES,
    eyebrow: 'About ANG',
    headline: 'We connect creative thinking with practical business strategy.',
    paragraphOnePrefix:
      'ANG Digital Agency helps ambitious businesses build a stronger, more effective online presence. As a proud partner of',
    paragraphOneSuffix:
      'we combine executive strategy, creative execution, and performance channels to solve real commercial challenges.',
    paragraphTwo:
      'Our engagement always starts with listening. We study your audience, unit economics, and competitive position before recommending a roadmap—producing work tailored to your business rather than a one-size-fits-all template.',
    pillars: [
      {
        title: 'Clarity before execution',
        description:
          'Defined priorities and milestones before time and media budget are committed.',
      },
      {
        title: 'Creative work with a commercial role',
        description:
          'Every page, visual system, and campaign asset serves a clear conversion goal.',
      },
      {
        title: 'Transparent reporting and cadence',
        description:
          'Direct visibility into deliverables, testing outcomes, and next iterations.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'Client FAQ',
    headline: 'Clear answers on process, pricing, and timelines.',
    subtitle:
      'Everything prospective partners ask before kickoff—from discovery and milestone billing to launch timelines and asset ownership.',
    filterAria: 'Filter FAQ by topic',
    filters: [
      { id: 'all', label: 'All Questions' },
      { id: 'process', label: 'Process' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'timelines', label: 'Timelines' },
    ],
    ctaTitle: 'Have a custom scope or deadline?',
    ctaBody:
      'Share your target launch window and deliverables—we will prepare a tailored timeline and milestone estimate.',
    ctaProposal: 'Request Custom Proposal',
    ctaAskAi: 'Ask Strategy AI',
    items: AGENCY_FAQS,
  },
  workSection: {
    eyebrow: 'Selected Work',
    headline: 'Work that moves business forward.',
    subtitle:
      'Explore our signature project directions across web architecture and campaign identity systems.',
    filterAria: 'Filter showcase work',
    filters: [
      { id: 'all', label: 'All Work' },
      { id: 'web', label: 'Web Experience' },
      { id: 'brand', label: 'Brand & Campaign' },
    ],
    showcaseLabel: 'Concept Showcase',
    inspectDirection: 'Inspect Direction',
    closeModalAria: 'Close project detail modal',
    targetOutcome: 'Target Outcome',
    includedDeliverables: 'Included Deliverables',
    askAiAboutThis: 'Ask Strategy AI About This',
    startSimilarProject: 'Start Similar Project',
    projects: SHOWCASE_PROJECTS,
  },
  processSection: {
    eyebrow: 'How We Work',
    headline: 'A clear path from idea to impact.',
    subtitle:
      'A collaborative four-stage framework that keeps every deliverable aligned with your business objectives.',
    steps: PROCESS_STEPS,
  },
  testimonialsSection: {
    eyebrow: 'Partner & Client Reviews',
    headline: 'Trusted by strategic partners and growth-focused teams.',
    subtitle:
      'Verified outcomes from organizations working with ANG Digital Agency across web architecture, brand positioning, organic search, and paid acquisition.',
    filterAria: 'Filter client testimonials',
    filters: [
      { id: 'all', label: 'All Reviews' },
      { id: 'partner', label: 'Partner Alliance' },
      { id: 'digital', label: 'Web & Paid' },
      { id: 'growth', label: 'SEO & Brand' },
    ],
    exploreScope: 'Explore Similar Scope',
    items: CLIENT_TESTIMONIALS,
  },
  assistant: {
    eyebrow: 'ANG Strategy Consultant',
    headline: 'Explore your digital roadmap before committing budget.',
    subtitle:
      'Test campaign directions, website structure ideas, or channel splits with our multi-turn Gemini strategy assistant. Switch between Fast Brief for low-latency answers and Deep Strategy for high-thinking architectural planning.',
    suggestedPromptsLabel: 'Suggested Prompts',
    starterPrompts: [
      {
        label: '90-Day Launch Plan',
        prompt:
          'Build a practical 90-day digital launch roadmap for a B2B services brand combining web redesign, SEO, and LinkedIn demand.',
      },
      {
        label: 'Website Conversion Audit',
        prompt:
          'What sections and messaging hierarchy should a corporate website use to convert high-intent visitors into consultation calls?',
      },
      {
        label: 'Paid Acquisition Split',
        prompt:
          'How should a growing business split an initial monthly performance marketing budget between Google Search Ads and Meta Ads?',
      },
    ],
    savedThreadsLabel: 'Saved Strategy Threads',
    newThread: 'New Thread',
    savedAutoNote: 'Your consultation threads will save automatically to your client account.',
    guestLoginNote: 'Sign in with Google to save multi-turn strategy threads across visits.',
    clientLogin: 'Client Login',
    headerTitle: 'ANG Strategy Assistant',
    deepModeSubtitle: 'Deep Strategy · High Thinking',
    fastModeSubtitle: 'Fast Brief · Low-Latency Mode',
    modeAria: 'Select AI reasoning speed',
    fastBriefLabel: 'Fast Brief',
    deepStrategyLabel: 'Deep Strategy',
    loadingConversation: 'Loading saved conversation...',
    thinkingPlaceholder: 'Thinking through your strategy...',
    copyPromptLabel: 'Want our team to build this plan?',
    copyToBrief: 'Copy to Project Brief',
    inputAria: 'Ask the ANG Strategy Assistant',
    inputPlaceholder: 'Ask about web redesign, SEO, branding, or paid growth...',
    send: 'Send',
    welcomeMessage:
      'Welcome to ANG Digital Agency. Tell me about your business, audience, or growth goals. Switch between Fast Brief for instant guidance or Deep Strategy for multi-step campaign and architecture reasoning.',
    newThreadMessage:
      'Started a fresh consultation thread. Share your industry, current bottlenecks, or target service area to map out your next steps.',
    externalPromptTemplate: (serviceLabel) =>
      `Create a practical action plan and deliverable roadmap for ${serviceLabel} tailored to a growing company.`,
    externalProjectTemplate: (title, categoryLabel) =>
      `How can we adapt the "${title}" approach (${categoryLabel}) for our business?`,
  },
  contact: {
    eyebrow: 'Contact ANG',
    headline: 'Let’s talk about your next project.',
    subtitle:
      'Tell us about your business and what you want to achieve. We will review your goals and propose a clear, practical next step.',
    directEmailLabel: 'Direct Email',
    allianceLabel: 'Agency Domain & Alliance',
    allianceValue: 'www.angdigital.agency · Proud Partner of Al Nibras Group',
    portalTitle: 'Client Brief Portal',
    portalSignedInPrefix: 'Signed in as',
    portalGuestSubtitle: 'Sign in with Google to save and track enquiries',
    signOut: 'Sign Out',
    clientLogin: 'Client Login',
    adminView: 'Agency Admin View',
    showMyBriefs: 'Show My Briefs Only',
    showAllBriefs: 'Show All Client Briefs',
    noSavedBriefs:
      'No saved project briefs yet. Submit the form to store and track your project brief here.',
    guestPortalNote:
      'Sign in via the ANG Client Portal to save project briefs and track review updates in real time.',
    statusLabel: 'Status',
    statuses: {
      submitted: 'Submitted',
      in_review: 'In Review',
      archived: 'Archived',
    },
    archiveAria: 'Archive enquiry',
    deleteAria: 'Delete enquiry',
    formTitle: 'Tell us about your project',
    formRequiredNote: 'Fields marked * are required.',
    fullNameLabel: 'Full name *',
    fullNamePlaceholder: 'Your name',
    emailLabel: 'Email address *',
    emailPlaceholder: 'you@company.com',
    businessLabel: 'Business name',
    businessPlaceholder: 'Your organization',
    serviceLabel: 'Service needed *',
    chooseService: 'Choose a service',
    detailsLabel: 'Project details *',
    detailsPlaceholder: 'Tell us about your goals, challenges, and timeline...',
    submitting: 'Submitting Enquiry...',
    submitButton: 'Send Project Enquiry',
    validationName: 'Please enter your full name.',
    validationEmail: 'Please enter a valid email address.',
    validationService: 'Please select a service.',
    validationDetails: 'Please provide at least 10 characters of project details.',
    successSignedIn: (refId) =>
      `Brief ${refId} saved to your Client Portal and delivered to ANG Digital Agency.`,
    successGuest: (refId) =>
      `Brief ${refId} received by ANG Digital Agency. Our strategy team will review it shortly. Sign in with Google to track enquiries in your portal.`,
  },
  loginModal: {
    closeAria: 'Close client login',
    bannerCaptionTitle: 'Elevating Brands · Inspiring Growth',
    portalSubtitle: 'Client Strategy & Brief Portal',
    title: 'Sign in to your portal',
    description:
      'Access your submitted project briefs, monitor review progress, and resume saved multi-turn AI strategy consultations.',
    connecting: 'Connecting...',
    continueGoogle: 'Continue with Google',
    securityNote:
      'Protected by Google Sign-In and isolated client workspace rules for ANG Digital Agency.',
  },
  newsletter: {
    eyebrow: 'Industry Insights',
    headline: 'Stay ahead of digital strategy, SEO, and conversion shifts.',
    subtitle:
      'Receive practical monthly briefings from ANG Digital Agency covering web architecture, search visibility, creative systems, and paid acquisition.',
    emailLabel: 'Work email address',
    emailPlaceholder: 'you@company.com',
    note: 'One concise briefing each month · Unsubscribe anytime · No third-party list sharing',
    subscribing: 'Subscribing...',
    subscribed: 'Subscribed',
    subscribe: 'Subscribe',
    validationError: 'Please enter a valid email address (for example, name@company.com).',
    successSignedIn: (email, refId) =>
      `Subscribed ${email} (${refId}) and synced to your Client Portal.`,
    successGuest: (email, refId) =>
      `Subscribed ${email} (${refId}). Look out for monthly digital strategy insights from ANG Digital Agency.`,
  },
  footer: {
    taglinePrefix: 'Elevating brands, inspiring growth · Proud Partner of',
    summary:
      'Strategy, web architecture, SEO, branding, and performance marketing built around measurable commercial outcomes.',
    navAria: 'Footer navigation',
    navLinks: [
      { label: 'Services', href: '#services' },
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
      { label: 'Strategy AI', href: '#assistant' },
      { label: 'Contact', href: '#contact' },
    ],
    rights: 'ANG Digital Agency. All rights reserved.',
  },
  progressAria: 'Page reading progress',
};

const AR_BUNDLE: TranslationBundle = {
  meta: {
    title: 'وكالة ANG الرقمية — الاستراتيجية، الهوية التجارية والنمو الرقمي',
  },
  brand: {
    shortName: 'ANG',
    fullName: 'وكالة ANG الرقمية',
    partnerName: 'مجموعة النبراس',
  },
  nav: {
    links: [
      { label: 'الخدمات', href: '#services' },
      { label: 'من نحن', href: '#about' },
      { label: 'أعمالنا', href: '#work' },
      { label: 'منهجية العمل', href: '#process' },
      { label: 'مستشار الاستراتيجية', href: '#assistant' },
    ],
    clientPortal: 'بوابة العملاء',
    clientLogin: 'دخول العملاء',
    openMenuAria: 'فتح قائمة التنقل',
    closeMenuAria: 'إغلاق قائمة التنقل',
    languageGroupAria: 'اختيار لغة الموقع',
  },
  hero: {
    eyebrow: 'الاستراتيجية · الهوية التجارية · التسويق · التطوير',
    headline: 'نرتقي بالعلامات التجارية ونصنع نمواً رقمياً قابلاً للقياس.',
    subheadline:
      'نحوّل أهداف أعمالك الطموحة إلى تجارب رقمية عالية الأداء. من الاستراتيجية وبناء الهوية إلى هندسة المواقع والتسويق الأدائي، تمكّن ANG أعمالك من التقدّم بوضوح وثقة.',
    primaryCta: 'احجز جلسة استكشافية',
    secondaryCta: 'استشر الذكاء الاستراتيجي',
    partnerLabel: 'شريك معتمد لمجموعة النبراس',
    trustNote: 'مصمم لتحقيق نتائج ملموسة',
    cardPartnerPrefix: 'شريك استراتيجي لـ',
    cardCapabilitiesCta: 'القدرات',
    cardFooterLeft: 'الوضوح قبل التنفيذ',
    capabilityStrip: [
      'تصميم وتطوير المواقع',
      'تحسين محركات البحث والنمو العضوي',
      'إدارة منصات التواصل الاجتماعي',
      'بناء الهوية التجارية',
      'التسويق القائم على الأداء',
    ],
  },
  approach: {
    eyebrow: 'منهجية ANG',
    headline: 'التسويق الناجح يتجاوز مجرد الظهور.',
    body: 'بل يتمحور حول أن يفهمك جمهورك ويثق بك ويختارك. نوحّد كافة نقاط الاتصال الرقمية لعلامتك في تجربة متكاملة بحيث يحمل كل تفاعل هدفاً واضحاً وكل قرار يتبع مساراً قابلاً للقياس.',
  },
  servicesSection: {
    eyebrow: 'ماذا نقدم',
    headline: 'خدمات رقمية مصممة لنتائج أعمال حقيقية.',
    subtitle:
      'منظومة مترابطة من القدرات الرقمية لبناء المصداقية واستقطاب الطلب المؤهل وتحويل الاهتمام إلى عوائد مستدامة.',
    filterAria: 'تصفية خدمات الوكالة',
    filters: [
      { id: 'all', label: 'جميع الخدمات' },
      { id: 'digital', label: 'الويب والرقمنة' },
      { id: 'growth', label: 'النمو والإعلانات' },
      { id: 'brand', label: 'الهوية والتواصل' },
    ],
    coreCapabilityLabel: 'قدرة أساسية',
    requestScope: 'اطلب نطاق العمل',
    planWithAi: 'خطط مع مستشار AI',
    customRoadmapTag: 'خارطة طريق مخصصة',
    customRoadmapTitle: 'هل تحتاج إلى خطة نمو رقمي متكاملة؟',
    customRoadmapBody:
      'شاركنا وضع أعمالك الحالي ومناطق التوسع المستهدفة، وسنرتب الأولويات الدقيقة عبر الويب والبحث والهوية والاستحواذ.',
    customRoadmapCta: 'ناقش أهدافك',
    serviceLabels: {
      'Website Design & Development': 'تصميم وتطوير المواقع الإلكترونية',
      'SEO & Content Strategy': 'تحسين محركات البحث واستراتيجية المحتوى',
      'Social Media Management': 'إدارة منصات التواصل الاجتماعي',
      'Branding & Creative Design': 'بناء الهوية والتصميم الإبداعي',
      'Performance Marketing': 'التسويق القائم على الأداء',
      'Multiple Services / Strategy': 'خدمات متعددة / استراتيجية شاملة',
    },
    items: [
      {
        number: '01',
        discipline: 'التجربة الرقمية',
        title: 'Website Design & Development',
        category: 'digital',
        featured: true,
        description:
          'مواقع إلكترونية سريعة الاستجابة وسهلة الاستخدام تصاغ لإبراز قيمة علامتك بوضوح وتوجيه الزوار نحو قرارات تجارية فعّالة.',
        deliverables: [
          'تصميم تجربة وواجهة المستخدم المتجاوبة (UI/UX)',
          'صفحات الهبوط التجارية وتحسين التحويلات',
          'تحسين السرعة وكفاءة الأداء والاستخدام',
          'إعداد أنظمة إدارة المحتوى والصيانة المستمرة',
        ],
      },
      {
        number: '02',
        discipline: 'الظهور العضوي',
        title: 'SEO & Content Strategy',
        category: 'growth',
        description:
          'بناء حضور مستدام في نتائج البحث وربط نشاطك التجاري بالعملاء الذين يبحثون بنشاط عن حلولك.',
        deliverables: [
          'أبحاث الكلمات المفتاحية وتحليل المنافسين',
          'تحسين محركات البحث التقني وداخل الصفحات',
          'تحسين الظهور في البحث المحلي',
          'تخطيط المحتوى وتحسين جودته وتصدره',
        ],
      },
      {
        number: '03',
        discipline: 'المجتمع والمحتوى',
        title: 'Social Media Management',
        category: 'brand',
        description:
          'بناء حضور متسق على منصات التواصل عبر محتوى هادف وتخطيط دقيق وتفاعل فعّال مع الجمهور.',
        deliverables: [
          'استراتيجية منصات التواصل الاجتماعي',
          'تقويم النشر وكتابة المحتوى الإبداعي',
          'التصاميم الإبداعية ومقاطع الفيديو القصيرة',
          'إدارة التفاعل وتقارير الأداء الشهرية',
        ],
      },
      {
        number: '04',
        discipline: 'الهوية البصرية',
        title: 'Branding & Creative Design',
        category: 'brand',
        description:
          'صياغة هوية بصرية ولفظية متميزة تجعل علامتك سهلة التعرّف ومتسقة عبر جميع القنوات الرقمية والمطبوعة.',
        deliverables: [
          'استراتيجية العلامة التجارية والتموضع السوقي',
          'تصميم الشعارات والأنظمة البصرية المتكاملة',
          'أدلة الهوية المؤسسية الشاملة',
          'المطبوعات والأصول التسويقية الرقمية',
        ],
      },
      {
        number: '05',
        discipline: 'الاستحواذ المدفوع',
        title: 'Performance Marketing',
        category: 'growth',
        description:
          'تخطيط وتحسين الحملات الإعلانية المدفوعة وفق جماهير محددة وأهداف قابلة للقياس وتوزيع منضبط للميزانية.',
        deliverables: [
          'إدارة حملات Meta وGoogle الإعلانية',
          'استراتيجية الجمهور ومسارات التحويل',
          'اختبار الإعلانات والنصوص التسويقية',
          'تتبع التحويلات وإعداد تقارير العائد',
        ],
      },
    ],
  },
  about: {
    studioFallbackTitle: 'استوديو ANG للاستراتيجية والإبداع',
    workingPrincipleEyebrow: 'مبادئ العمل في ANG',
    principles: [
      {
        number: '01',
        title: 'الفهم',
        description: 'دراسة النشاط التجاري والجمهور بعمق.',
      },
      {
        number: '02',
        title: 'الابتكار',
        description: 'البناء بوضوح وتوجه استراتيجي مدروس.',
      },
      {
        number: '03',
        title: 'التفعيل',
        description: 'إطلاق المبادرات الرقمية المناسبة.',
      },
      {
        number: '04',
        title: 'التطوير',
        description: 'التعلم والقياس والتحسين المستمر.',
      },
    ],
    eyebrow: 'عن وكالة ANG',
    headline: 'نربط التفكير الإبداعي بالاستراتيجية التجارية العملية.',
    paragraphOnePrefix:
      'تساعد وكالة ANG الرقمية الشركات الطموحة على بناء حضور إلكتروني أقوى وأكثر تأثيراً. وبصفتنا شريكاً فخوراً لـ',
    paragraphOneSuffix:
      'نجمع بين التخطيط التنفيذي والتنفيذ الإبداعي وقنوات الأداء لحل التحديات التجارية الواقعية.',
    paragraphTwo:
      'تبدأ شراكتنا دائماً بالاستماع. ندرس جمهورك المستهدف واقتصاديات وحدتك وموقعك التنافسي قبل اقتراح خارطة الطريق—لنقدم عملاً مصمماً خصيصاً لأعمالك بعيداً عن القوالب الجاهزة.',
    pillars: [
      {
        title: 'الوضوح قبل التنفيذ',
        description: 'تحديد الأولويات والمراحل بدقة قبل التزام الوقت أو ميزانية الإعلانات.',
      },
      {
        title: 'إبداع يخدم الأهداف التجارية',
        description: 'كل صفحة ونظام بصري وأصل إعلاني يخدم هدف تحويل واضحاً ومحدداً.',
      },
      {
        title: 'تقارير شفافة وإيقاع منتظم',
        description: 'رؤية مباشرة للمخرجات ونتائج الاختبارات وخطوات التحسين التالية.',
      },
    ],
  },
  faqSection: {
    eyebrow: 'الأسئلة الشائعة',
    headline: 'إجابات واضحة حول المنهجية، التسعير، والجداول الزمنية.',
    subtitle:
      'كل ما يسأل عنه الشركاء قبل بدء المشروع—من مرحلة الاستكشاف ونظام الدفعات إلى مواعيد الإطلاق وملكية الأصول.',
    filterAria: 'تصفية الأسئلة الشائعة حسب الموضوع',
    filters: [
      { id: 'all', label: 'جميع الأسئلة' },
      { id: 'process', label: 'منهجية العمل' },
      { id: 'pricing', label: 'التسعير' },
      { id: 'timelines', label: 'المدد الزمنية' },
    ],
    ctaTitle: 'هل لديك نطاق عمل خاص أو موعد تسليم محدد؟',
    ctaBody:
      'شاركنا موعد الإطلاق المستهدف والمخرجات المطلوبة وسنعد لك جدولاً زمنياً وتقديراً مخصصاً للمراحل.',
    ctaProposal: 'اطلب عرضاً مخصصاً',
    ctaAskAi: 'اسأل مستشار AI',
    items: [
      {
        id: 'faq-process-start',
        number: '01',
        category: 'process',
        categoryLabel: 'منهجية العمل',
        question: 'كيف يبدأ التعاون والعمل مع وكالة ANG الرقمية؟',
        answer:
          'يبدأ كل مشروع بمرحلتي الاستكشاف ووضع الاستراتيجية. نقوم بمراجعة قنواتك الرقمية الحالية، وتوضيح شرائح الجمهور والأهداف التجارية، ثم نقدم نطاق عمل مكتوباً بمراحل واضحة قبل بدء التنفيذ الفعلي.',
      },
      {
        id: 'faq-pricing-structure',
        number: '02',
        category: 'pricing',
        categoryLabel: 'التسعير',
        question: 'كيف يتم تسعير مشاريع المواقع والهوية التجارية والتسويق؟',
        answer:
          'تُقدَّم المشاريع ذات النطاق المحدد—مثل بناء المواقع وأنظمة الهوية البصرية—بعقود مراحل واضحة الأهداف. أما الخدمات المستمرة مثل تحسين محركات البحث وإدارة الحسابات والتسويق الأدائي فتُدار باشتراكات شهرية مرنة تتناسب مع حجم القنوات والمخرجات.',
      },
      {
        id: 'faq-timelines-website',
        number: '03',
        category: 'timelines',
        categoryLabel: 'المدد الزمنية',
        question: 'كم يستغرق تصميم وإطلاق موقع إلكتروني احترافي للأعمال؟',
        answer:
          'تستغرق المواقع التسويقية المركزة وصفحات الهبوط عالية التحويل عادةً من 3 إلى 5 أسابيع بعد اعتماد مرحلة الاستكشاف، بينما تتطلب المنصات المؤسسية متعددة الصفحات والتكاملات المخصصة من 6 إلى 10 أسابيع.',
      },
      {
        id: 'faq-pricing-ad-spend',
        number: '04',
        category: 'pricing',
        categoryLabel: 'التسعير',
        question: 'هل تشمل رسوم التسويق الأدائي ميزانية الإنفاق الإعلاني؟',
        answer:
          'لا—يتم دفع ميزانية الإعلانات مباشرة إلى منصات Meta أو Google أو LinkedIn من حسابك الإعلاني الخاص لضمان احتفاظك الكامل بملكية البيانات والفوترة. وتتقاضى ANG رسوم إدارة شفافة تغطي الاستراتيجية والاختبار والتقارير.',
      },
      {
        id: 'faq-process-collaboration',
        number: '05',
        category: 'process',
        categoryLabel: 'منهجية العمل',
        question: 'كيف تتم المراجعات والتعديلات واعتماد المراحل أثناء التنفيذ؟',
        answer:
          'تتضمن كل مرحلة نقاط مراجعة منظمة يعاين فيها فريقك النماذج التفاعلية أو النصوص أو مسودات الحملات. تُدمج الملاحظات الموحدة خلال 48 ساعة عمل، ويمكنك متابعة حالة الطلب مباشرة من خلال بوابة عملاء ANG.',
      },
      {
        id: 'faq-timelines-seo',
        number: '06',
        category: 'timelines',
        categoryLabel: 'المدد الزمنية',
        question: 'متى تظهر النتائج الملموسة لحملات SEO والتسويق الأدائي؟',
        answer:
          'تبدأ حملات الاستحواذ المدفوعة في توليد بيانات الاختبار والعملاء المحتملين خلال أول 7 إلى 14 يوماً من الإطلاق مع تصاعد التحسين في الشهرين الثاني والثالث، بينما يبني تحسين محركات البحث رصيداً عضوياً يظهر أثره الملموس خلال 90 إلى 120 يوماً.',
      },
      {
        id: 'faq-pricing-bundled',
        number: '07',
        category: 'pricing',
        categoryLabel: 'التسعير',
        question: 'هل يمكننا دمج بناء الهوية وتطوير الموقع وحملة الإطلاق في حزمة واحدة؟',
        answer:
          'نعم. يجمع معظم عملائنا في مرحلة النمو بين بناء الهوية البصرية وتطوير الموقع وحملة إطلاق لمدة 90 يوماً ضمن خارطة طريق موحدة، مما يزيل تأخير التسليم بين الفرق ويوفر تسعيراً مفضلاً للمراحل.',
      },
      {
        id: 'faq-process-ownership',
        number: '08',
        category: 'process',
        categoryLabel: 'منهجية العمل',
        question: 'هل نحتفظ بالملكية الكاملة لكود الموقع والنطاق وأصول العلامة التجارية؟',
        answer:
          'نعم بنسبة 100%. عند إتمام كل مرحلة، تمتلك مؤسستك جميع الملفات المصدرية وأدلة الهوية والنطاقات وحسابات التحليلات والإعلانات بالكامل دون أي قيود احتكارية.',
      },
    ],
  },
  workSection: {
    eyebrow: 'أعمال مختارة',
    headline: 'مشاريع تدفع الأعمال نحو الأمام.',
    subtitle: 'استعرض توجهاتنا التصميمية عبر هندسة المواقع وأنظمة الهوية والحملات الرقمية.',
    filterAria: 'تصفية نماذج الأعمال',
    filters: [
      { id: 'all', label: 'جميع الأعمال' },
      { id: 'web', label: 'تجربة الويب' },
      { id: 'brand', label: 'الهوية والحملات' },
    ],
    showcaseLabel: 'عرض تصوري',
    inspectDirection: 'استعراض التوجه',
    closeModalAria: 'إغلاق نافذة تفاصيل المشروع',
    targetOutcome: 'النتيجة المستهدفة',
    includedDeliverables: 'المخرجات المشمولة',
    askAiAboutThis: 'اسأل مستشار AI عن هذا التوجه',
    startSimilarProject: 'ابدأ مشروعاً مشابهاً',
    projects: [
      {
        id: 'business-website-experience',
        category: 'web',
        categoryLabel: 'المواقع والتجربة الرقمية',
        title: 'تجربة مواقع الأعمال المؤسسية',
        subtitle: 'هيكلة رقمية مركزة على التحويل للعلامات الخدمية الحديثة',
        imagePath: '/src/assets/images/work_web_experience_1794854682847.jpg',
        imageAlt: 'جهاز حاسوب يعرض واجهة موقع مؤسسي منظم على مكتب حديث',
        summary:
          'توجه تطبيقي يوضح كيف يحول تسلسل الرسائل الواضح ومسارات الخدمات المهيكلة وسرعة الأداء المتجاوب اهتمام الزائر إلى طلبات استشارة مؤهلة.',
        deliverables: [
          'هيكلة المعلومات وتخطيط تجربة المستخدم (UX)',
          'نظام واجهات مستخدم متجاوب (UI)',
          'نماذج استقطاب العملاء المتوافقة مع CRM',
          'ضبط مؤشرات الأداء الأساسية للويب',
        ],
        outcomeFocus: 'تموضع واضح من القسم الافتتاحي حتى طلب الاستشارة المؤهل',
        recommendedService: 'Website Design & Development',
      },
      {
        id: 'campaign-identity-direction',
        category: 'brand',
        categoryLabel: 'الهوية التجارية وإبداع الحملات',
        title: 'التوجه البصري لهوية الحملات',
        subtitle: 'لغة بصرية متماسكة عبر القنوات الرقمية والمواد التنفيذية',
        imagePath: '/src/assets/images/work_brand_campaign_1794854682317.jpg',
        imageAlt: 'تنسيق تحريري لمواد الهوية المؤسسية وعرض حملة رقمية على جهاز لوحي',
        summary:
          'نموذج إبداعي يبرز كيف يجمع التوجيه الفني الموحد بين هوية العلامة التجارية ورسائل الحملة والأصول الرقمية عبر القنوات بتناغم تام.',
        deliverables: [
          'الهوية البصرية ونظام الخطوط والطباعة',
          'المرئيات الرئيسية وإطار صياغة الحملات',
          'العروض التنفيذية والمطبوعات المؤسسية',
          'حزمة التصاميم لمنصات التواصل والإعلانات',
        ],
        outcomeFocus: 'حضور بصري متسق يعزز الثقة عبر الويب والتواصل والتقديم التنفيذي',
        recommendedService: 'Branding & Creative Design',
      },
    ],
  },
  processSection: {
    eyebrow: 'كيف نعمل',
    headline: 'مسار واضح من الفكرة إلى الأثر الفعلي.',
    subtitle:
      'إطار عمل تشاركي من أربع مراحل يضمن توافق كل مخرج مع أهداف أعمالك التجارية.',
    steps: [
      {
        number: '01',
        title: 'الاستكشاف',
        description: 'فهم نشاطك التجاري وجمهورك وأهدافك ووضعك الرقمي الراهن قبل اقتراح التكتيكات.',
      },
      {
        number: '02',
        title: 'الاستراتيجية',
        description: 'تحديد الأولويات والمخرجات والجدول الزمني والمزيج الأنسب من القنوات لمرحلة نموك.',
      },
      {
        number: '03',
        title: 'التنفيذ',
        description: 'تصميم وبناء وإطلاق وتنسيق الأعمال الرقمية المعتمدة بأعلى درجات الإتقان.',
      },
      {
        number: '04',
        title: 'التحسين',
        description: 'مراجعة الأداء، والاستفادة من البيانات الواقعية، وتطوير الخطوات القادمة باستمرار.',
      },
    ],
  },
  testimonialsSection: {
    eyebrow: 'آراء الشركاء والعملاء',
    headline: 'ثقة الشركاء الاستراتيجيين وفرق النمو الطموحة.',
    subtitle:
      'نتائج موثقة لمؤسسات عملت مع وكالة ANG الرقمية في هندسة الويب وبناء الهوية والبحث العضوي والاستحواذ المدفوع.',
    filterAria: 'تصفية آراء العملاء',
    filters: [
      { id: 'all', label: 'جميع التقييمات' },
      { id: 'partner', label: 'تحالف الشركاء' },
      { id: 'digital', label: 'الويب والإعلانات' },
      { id: 'growth', label: 'SEO والهوية' },
    ],
    exploreScope: 'استكشف نطاقاً مشابهاً',
    items: [
      {
        id: 'al-nibras-group',
        number: '01',
        category: 'partner',
        service: 'Multiple Services / Strategy',
        engagementDuration: 'تحالف استراتيجي · 12 شهراً',
        metricOutcome: '+138% زيادة في طلبات الشركات المؤهلة خلال 6 أشهر',
        featured: true,
        quote:
          'قبل شراكتنا مع وكالة ANG الرقمية، كانت نقاط الاتصال الرقمية لدينا تعمل ككتيبات تعريفية منفصلة. وحّدت ANG تموضع علامتنا، وأعادت بناء هيكلة التحويل على الويب، ومواءمة الاستحواذ المدفوع مع مؤشرات أداء تجارية دقيقة—مما حقق زيادة بنسبة 138% في استفسارات الشركات المؤهلة خلال ستة أشهر.',
        authorName: 'طارق المنصور',
        authorRole: 'مدير العمليات الرقمية',
        organization: 'مجموعة النبراس',
      },
      {
        id: 'kestrel-logistics',
        number: '02',
        category: 'digital',
        service: 'Website Design & Development',
        engagementDuration: 'إعادة بناء الويب · إطلاق خلال 5 أسابيع',
        metricOutcome: 'تضاعف معدل تحويل طلبات العروض 2.4x بعد الإطلاق',
        quote:
          'كان موقعنا القديم يخفي قدراتنا الأساسية في الشحن خلف قوائم تقنية معقدة. أعادت ANG هيكلة رسائلنا وأطلقت موقعاً أسرع ومتجاوباً في خمسة أسابيع، مما ضاعف معدل تحويل الزوار إلى طلبات عروض بمقدار 2.4 ضعف في الربع الأول.',
        authorName: 'نادية قريشي',
        authorRole: 'رئيسة النمو التجاري',
        organization: 'كيستريل للشحن واللوجستيات',
      },
      {
        id: 'veridian-clinics',
        number: '03',
        category: 'growth',
        service: 'SEO & Content Strategy',
        engagementDuration: 'تحسين محركات البحث · 6 أشهر',
        metricOutcome: '+165% نمو في الحجوزات العضوية غير المرتبطة باسم العلامة',
        quote:
          'كنا نعتمد بشكل كبير على الإعلانات المدفوعة مع ارتفاع تكلفة الاستحواذ. أعادت ANG بناء الأساس التقني لـ SEO وأطلقت أدلة خدمات مهيكلة لأربعة فروع، مما رفع الحجوزات العضوية بنسبة 165% خلال ستة أشهر.',
        authorName: 'د. عمر فاروق',
        authorRole: 'الشريك الإداري',
        organization: 'عيادات فيريديان التخصصية',
      },
      {
        id: 'solis-architectural',
        number: '04',
        category: 'growth',
        service: 'Branding & Creative Design',
        engagementDuration: 'الهوية وحزمة الحملات · 8 أسابيع',
        metricOutcome: 'تسريع إعداد عروض المبيعات بنسبة 38%',
        quote:
          'تطلبت المنافسة على المناقصات التجارية الإقليمية هوية بصرية راسخة. قدمت ANG نظام علامة تجارية متكاملاً وأدلة رقمية ومواد عرض تنفيذية قلصت وقت إعداد عروضنا بنسبة 38% وعززت ثقة الشركاء.',
        authorName: 'هناء صديقي',
        authorRole: 'المديرة المعمارية الرئيسية',
        organization: 'استوديو سوليس المعماري',
      },
      {
        id: 'meridian-saas',
        number: '05',
        category: 'digital',
        service: 'Performance Marketing',
        engagementDuration: 'حملات البحث وMeta · سباق 90 يوماً',
        metricOutcome: 'خفض تكلفة العميل المحتمل المؤهل بنسبة 31% خلال 90 يوماً',
        quote:
          'كانت الحملات السابقة تجلب نقرات عالية لكن بنوايا شراء منخفضة. قسّمت ANG مسارات بحث Google وإعادة الاستهداف عبر Meta مع اختبار إبداعي منضبط، مما خفض تكلفة العميل المؤهل بنسبة 31% خلال 90 يوماً.',
        authorName: 'زينب حبيب',
        authorRole: 'نائبة رئيس الإيرادات',
        organization: 'ميريديان لبرمجيات الأساطيل',
      },
    ],
  },
  assistant: {
    eyebrow: 'مستشار ANG للاستراتيجية',
    headline: 'استكشف خارطة طريقك الرقمية قبل تخصيص الميزانية.',
    subtitle:
      'اختبر توجهات الحملات، وهيكلة الموقع، وتوزيع القنوات عبر مساعد Gemini الاستراتيجي متعدد الأدوار. بدّل بين الملخص السريع للإجابات الفورية والاستراتيجية العميقة للتخطيط التحليلي المتكامل.',
    suggestedPromptsLabel: 'أسئلة مقترحة',
    starterPrompts: [
      {
        label: 'خطة إطلاق 90 يوماً',
        prompt:
          'أنشئ خارطة طريق عملية لإطلاق رقمي خلال 90 يوماً لعلامة خدمات B2B تجمع بين تطوير الموقع وتحسين محركات البحث وطلب LinkedIn.',
      },
      {
        label: 'تدقيق تحويلات الموقع',
        prompt:
          'ما هي الأقسام وتسلسل الرسائل التي يجب أن يعتمدها موقع مؤسسي لتحويل الزوار ذوي النية الشرائية العالية إلى مكالمات استشارية؟',
      },
      {
        label: 'توزيع ميزانية الاستحواذ المدفوع',
        prompt:
          'كيف ينبغي لشركة نامية توزيع ميزانية التسويق الأدائي الشهرية الأولية بين إعلانات بحث Google وإعلانات Meta؟',
      },
    ],
    savedThreadsLabel: 'المحادثات الاستراتيجية المحفوظة',
    newThread: 'محادثة جديدة',
    savedAutoNote: 'تُحفظ جلسات الاستشارة الخاصة بك تلقائياً في حساب العميل.',
    guestLoginNote: 'سجّل الدخول عبر Google لحفظ جلسات الاستشارة متعددة المراحل عبر زياراتك.',
    clientLogin: 'دخول العملاء',
    headerTitle: 'مستشار ANG الاستراتيجي',
    deepModeSubtitle: 'الاستراتيجية العميقة · تفكير تحليلي متقدم',
    fastModeSubtitle: 'الملخص السريع · استجابة فورية',
    modeAria: 'اختر وضع سرعة التحليل',
    fastBriefLabel: 'ملخص سريع',
    deepStrategyLabel: 'استراتيجية عميقة',
    loadingConversation: 'جارٍ تحميل المحادثة المحفوظة...',
    thinkingPlaceholder: 'جارٍ تحليل استراتيجيتك...',
    copyPromptLabel: 'هل ترغب في أن ينفذ فريقنا هذه الخطة؟',
    copyToBrief: 'نسخ إلى ملخص المشروع',
    inputAria: 'اسأل مستشار ANG الاستراتيجي',
    inputPlaceholder: 'اسأل عن تطوير الموقع، SEO، الهوية، أو النمو المدفوع...',
    send: 'إرسال',
    welcomeMessage:
      'أهلاً بك في وكالة ANG الرقمية. أخبرني عن نشاطك التجاري أو جمهورك أو أهداف النمو لديك، واختر بين الملخص السريع للتوجيه الفوري أو الاستراتيجية العميقة للتخطيط التفصيلي.',
    newThreadMessage:
      'بدأت محادثة استشارية جديدة. شاركنا مجال عملك، أو التحديات الحالية، أو الخدمة المستهدفة لرسم خطواتك القادمة.',
    externalPromptTemplate: (serviceLabel) =>
      `أنشئ خطة عمل عملية وخارطة مخرجات لخدمة ${serviceLabel} مصممة خصيصاً لشركة في مرحلة النمو.`,
    externalProjectTemplate: (title, categoryLabel) =>
      `كيف يمكننا تكييف توجه "${title}" (${categoryLabel}) ليناسب طبيعة أعمالنا؟`,
  },
  contact: {
    eyebrow: 'تواصل مع ANG',
    headline: 'لنتحدث عن مشروعك القادم.',
    subtitle:
      'أخبرنا عن نشاطك التجاري وما تطمح لتحقيقه، وسنراجع أهدافك ونقترح عليك الخطوة العملية الأنسب.',
    directEmailLabel: 'البريد الإلكتروني المباشر',
    allianceLabel: 'نطاق الوكالة والتحالف',
    allianceValue: 'www.angdigital.agency · شريك فخور لمجموعة النبراس',
    portalTitle: 'بوابة ملخصات العملاء',
    portalSignedInPrefix: 'تم تسجيل الدخول باسم',
    portalGuestSubtitle: 'سجّل الدخول عبر Google لحفظ ومتابعة طلبات المشاريع',
    signOut: 'تسجيل الخروج',
    clientLogin: 'دخول العملاء',
    adminView: 'عرض إدارة الوكالة',
    showMyBriefs: 'عرض طلباتي فقط',
    showAllBriefs: 'عرض جميع طلبات العملاء',
    noSavedBriefs:
      'لا توجد ملخصات مشاريع محفوظة بعد. أرسل النموذج لحفظ ومتابعة طلب مشروعك هنا.',
    guestPortalNote:
      'سجّل الدخول عبر بوابة عملاء ANG لحفظ ملخصات المشاريع ومتابعة حالة المراجعة بشكل فوري.',
    statusLabel: 'الحالة',
    statuses: {
      submitted: 'تم الإرسال',
      in_review: 'قيد المراجعة',
      archived: 'مؤرشف',
    },
    archiveAria: 'أرشفة الطلب',
    deleteAria: 'حذف الطلب',
    formTitle: 'حدثنا عن مشروعك',
    formRequiredNote: 'الحقول المميزة بـ * مطلوبة.',
    fullNameLabel: 'الاسم الكامل *',
    fullNamePlaceholder: 'اسمك الكامل',
    emailLabel: 'البريد الإلكتروني *',
    emailPlaceholder: 'you@company.com',
    businessLabel: 'اسم الشركة أو الجهة',
    businessPlaceholder: 'اسم مؤسستك',
    serviceLabel: 'الخدمة المطلوبة *',
    chooseService: 'اختر خدمة',
    detailsLabel: 'تفاصيل المشروع *',
    detailsPlaceholder: 'شاركنا أهدافك والتحديات الحالية والجدول الزمني المتوقع...',
    submitting: 'جارٍ إرسال الطلب...',
    submitButton: 'إرسال طلب المشروع',
    validationName: 'يرجى إدخال الاسم الكامل.',
    validationEmail: 'يرجى إدخال بريد إلكتروني صحيح.',
    validationService: 'يرجى اختيار الخدمة المطلوبة.',
    validationDetails: 'يرجى كتابة تفاصيل للمشروع لا تقل عن 10 أحرف.',
    successSignedIn: (refId) =>
      `تم حفظ ملخص المشروع ${refId} في بوابة العملاء الخاصة بك وإرساله إلى وكالة ANG الرقمية.`,
    successGuest: (refId) =>
      `تم استلام ملخص المشروع ${refId} لدى وكالة ANG الرقمية وسيتواصل معك فريق الاستراتيجية قريباً. سجّل الدخول عبر Google لمتابعة طلباتك من البوابة.`,
  },
  loginModal: {
    closeAria: 'إغلاق نافذة تسجيل الدخول',
    bannerCaptionTitle: 'نرتقي بالعلامات التجارية · نلهم النمو',
    portalSubtitle: 'بوابة استراتيجية العملاء والمشاريع',
    title: 'تسجيل الدخول إلى بوابتك',
    description:
      'اطّلع على ملخصات المشاريع المرسلة، وتابع مراحل المراجعة، واستأنف استشاراتك الاستراتيجية المحفوظة.',
    connecting: 'جارٍ الاتصال...',
    continueGoogle: 'المتابعة باستخدام Google',
    securityNote:
      'محمية بتسجيل الدخول عبر Google وقواعد عزل مساحات عمل العملاء لدى وكالة ANG الرقمية.',
  },
  newsletter: {
    eyebrow: 'رؤى القطاع الرقمي',
    headline: 'ابقَ في طليعة تحولات الاستراتيجية، السيو، والتحويل الرقمي.',
    subtitle:
      'احصل على نشرة شهرية عملية من وكالة ANG الرقمية تغطي هندسة المواقع، الظهور في البحث، الأنظمة الإبداعية، والاستحواذ المدفوع.',
    emailLabel: 'البريد الإلكتروني للعمل',
    emailPlaceholder: 'you@company.com',
    note: 'ملخص مركز واحد شهرياً · إلغاء الاشتراك في أي وقت · دون مشاركة بياناتك مع أطراف خارجية',
    subscribing: 'جارٍ الاشتراك...',
    subscribed: 'تم الاشتراك',
    subscribe: 'اشترك الآن',
    validationError: 'يرجى إدخال بريد إلكتروني صحيح (مثال: name@company.com).',
    successSignedIn: (email, refId) =>
      `تم اشتراك ${email} (${refId}) ومزامنته مع بوابة العملاء الخاصة بك.`,
    successGuest: (email, refId) =>
      `تم اشتراك ${email} (${refId}). ترقب نشرات وكالة ANG الرقمية الشهرية حول الاستراتيجية والنمو.`,
  },
  footer: {
    taglinePrefix: 'نرتقي بالعلامات التجارية ونلهم النمو · شريك فخور لـ',
    summary:
      'استراتيجية، هندسة ويب، تحسين محركات البحث، هوية تجارية، وتسويق أدائي مصمم لتحقيق نتائج تجارية قابلة للقياس.',
    navAria: 'روابط التذييل',
    navLinks: [
      { label: 'الخدمات', href: '#services' },
      { label: 'من نحن', href: '#about' },
      { label: 'الأعمال', href: '#work' },
      { label: 'مستشار AI', href: '#assistant' },
      { label: 'تواصل معنا', href: '#contact' },
    ],
    rights: 'وكالة ANG الرقمية. جميع الحقوق محفوظة.',
  },
  progressAria: 'تقدم قراءة الصفحة',
};

export function getTranslations(language: Language): TranslationBundle {
  return language === 'ar' ? AR_BUNDLE : EN_BUNDLE;
}
