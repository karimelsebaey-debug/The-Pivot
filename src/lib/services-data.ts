export type ServiceItem = {
  slug: string
  title: string
  description: string
  longDescription: string
  videos: { src: string; label: string }[]
  category: string
  categorySlug: string
  accent: string
  bg: string
  heroImage?: string
  mobileHeroImage?: string
  mobileObjectPosition?: string
}

export type ServiceCategory = {
  slug: string
  number: string
  title: string
  description: string
  accent: string
  bg: string
  heroImage?: string
  mobileHeroImage?: string
  mobileObjectPosition?: string
  items: ServiceItem[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'specialized-production',
    number: '01',
    title: 'Specialized Production',
    description: 'End-to-end production for motion, web, copy, and design systems that scale.',
    accent: '#A8885A',
    bg: '#0A211F',
    heroImage: '/images/categories/specialized-production-hero.jpg',
    mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/specialized-production.jpg',
    mobileObjectPosition: '70% 35%',
    items: [
      {
        slug: 'motion-design',
        title: 'Motion Design',
        description: 'Animation that commands attention.',
        longDescription: 'From brand explainers to cinematic motion ads, we craft motion that stops the scroll and earns the click.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/motion-design-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/motion-design.jpg',
        mobileObjectPosition: '55% 55%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/motion-design/motion-ads.mp4', label: 'Motion Ads' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/motion-design/explainers.mp4', label: 'Explainers & How-Tos' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/motion-design/campaign-support.mp4', label: 'Campaign Support' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/motion-design/web-animations.mp4', label: 'Web Animations' },
        ],
      },
      {
        slug: 'email-creation',
        title: 'Email Creation',
        description: 'Emails people actually open.',
        longDescription: 'Email templates, automated flows, and sequences built to make people actually click. And keep reading.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/email-creation-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/email-creation.jpg',
        mobileObjectPosition: '75% 55%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/email-creation/crm-native.mp4', label: 'CRM-Native Development' },
        ],
      },
      {
        slug: 'web-design',
        title: 'Web Design',
        description: 'Sites that earn Awwwards, not just visits.',
        longDescription: 'Scroll-driven storytelling, editorial layouts, and interaction design that makes your brand impossible to ignore online.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/web-design-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/web-design.jpg',
        mobileObjectPosition: '70% 40%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/web-design/brand-illustrations.mp4', label: 'Brand Illustrations' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/web-design/storyboarding.mp4', label: 'Storyboarding' },
        ],
      },
      {
        slug: 'copywriting',
        title: 'Copywriting',
        description: 'Words that close.',
        longDescription: 'Brand messaging, web copy, long-form content, and ad scripts. Written to persuade, not just inform.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/copywriting-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/copywriting.jpg',
        mobileObjectPosition: '70% 35%',
        videos: [],
      },
      {
        slug: 'design-systems',
        title: 'Design Systems',
        description: 'One system. Infinite scale.',
        longDescription: 'A shared design language for your whole team. So every product, page, and asset looks like it belongs to the same brand.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/design-systems-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/design-systems.jpg',
        mobileObjectPosition: '65% 40%',
        videos: [],
      },
      {
        slug: 'product-design',
        title: 'Product Design',
        description: 'UX that converts.',
        longDescription: 'End-to-end product design, UX audits, and iteration cycles that turn user frustration into business momentum.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/product-design-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/product-design.jpg',
        mobileObjectPosition: '85% 50%',
        videos: [],
      },
    ],
  },
  {
    slug: 'creative-design',
    number: '02',
    title: 'Creative Design',
    description: 'Ads, branding, presentations, and visual concepts that make your brand impossible to ignore.',
    accent: '#0A211F',
    bg: '#F2F4E7',
    heroImage: '/images/categories/creative-design-hero.jpg',
    mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/creative-design.jpg',
    mobileObjectPosition: '65% 45%',
    items: [
      {
        slug: 'ad-creative',
        title: 'Ad Creative',
        description: 'Creative that converts, not just impresses.',
        longDescription: 'Static and motion ads built to perform across social media, digital, and outdoor campaigns. Every asset made to earn its spot.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/ad-creative-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/ad-creative.jpg',
        mobileObjectPosition: '50% 40%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ad-creative/motion-graphics.mp4', label: 'Motion Graphics' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ad-creative/illustration.mp4', label: 'Illustration' },
        ],
      },
      {
        slug: 'social-media-creative',
        title: 'Social Media Creative',
        description: 'Content that earns the stop.',
        longDescription: 'Platform-native content across Instagram, TikTok, LinkedIn, and beyond. Organic and paid, always on-brand.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/social-media-creative-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/social-media-creative.jpg',
        mobileObjectPosition: '65% 40%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/social-media-creative/organic-social.mp4', label: 'Organic Social Content' },
        ],
      },
      {
        slug: 'presentation-design',
        title: 'Presentation Design',
        description: 'Slides that close the room.',
        longDescription: 'Investor decks, pitch books, and corporate presentations designed to persuade in the boardroom.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/presentation-design-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/presentation-design.jpg',
        mobileObjectPosition: '65% 40%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/presentation-design/data-visualization.mp4', label: 'Data Visualization' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/presentation-design/motion-slides.mp4', label: 'Motion for Slides' },
        ],
      },
      {
        slug: 'illustration-design',
        title: 'Illustration Design',
        description: 'Visual language only you own.',
        longDescription: 'Custom illustration systems built around characters, icons, editorial art, and infographics that become part of your brand DNA.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/illustration-design-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/illustration-design.jpg',
        mobileObjectPosition: '70% 45%',
        videos: [],
      },
      {
        slug: 'branding-services',
        title: 'Branding Services',
        description: 'Brands built to last decades.',
        longDescription: 'Logo design, brand identity, guidelines, and rebranding. The full visual system your brand needs to lead.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/branding-services-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/branding-services.jpg',
        mobileObjectPosition: '50% 65%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/branding-services/brand-consistency.mp4', label: 'Brand Consistency' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/branding-services/brand-guidelines.mp4', label: 'Brand Guidelines' },
        ],
      },
      {
        slug: 'concept-creation',
        title: 'Concept Creation',
        description: 'The idea before the execution.',
        longDescription: 'Campaign concepts, creative briefs, and visual directions that give your work a clear starting point. Where great ideas begin.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/concept-creation-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/concept-creation.jpg',
        mobileObjectPosition: '70% 35%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/concept-creation/ad-new-brand.mp4', label: 'New Brand Concept' },
        ],
      },
    ],
  },
  {
    slug: 'ai-services',
    number: '03',
    title: 'AI Services',
    description: 'AI-powered creative, automation, data visualization, and consulting for the next era.',
    accent: '#A8885A',
    bg: '#0A211F',
    heroImage: '/images/categories/ai-services-hero.jpg',
    mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/ai-services.jpg',
    mobileObjectPosition: '72% 30%',
    items: [
      {
        slug: 'ai-powered-creative',
        title: 'AI-Powered Creative',
        description: 'Human vision. Machine speed.',
        longDescription: 'AI-generated video, images, and creative content at scale. Fast, on-brand, and built to match your visual identity.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/ai-powered-creative-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/ai-powered-creative.jpg',
        mobileObjectPosition: '75% 45%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ai-powered-creative/ai-video-production.mp4', label: 'AI Video Production' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ai-powered-creative/brand-imagery.mp4', label: 'Brand Imagery' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ai-powered-creative/image-enhancements.mp4', label: 'Image Enhancements' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/ai-powered-creative/translation.mp4', label: 'Translation & Transcreation' },
        ],
      },
      {
        slug: 'automation',
        title: 'Automation',
        description: 'Remove the work that removes focus.',
        longDescription: 'End-to-end workflow automation for marketing and creative teams. Less manual work. More time for what actually matters.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: '/images/services/automation-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/automation.jpg',
        mobileObjectPosition: '65% 45%',
        videos: [],
      },
    ],
  },
  {
    slug: 'consultant',
    number: '04',
    title: 'Consultant',
    description: 'Expert advisory across strategy, finance, and business recovery for ambitious organizations.',
    accent: '#0A211F',
    bg: '#F2F4E7',
    heroImage: '/images/categories/consultant-hero.jpg',
    mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/consultant.jpg',
    mobileObjectPosition: '55% 38%',
    items: [
      {
        slug: 'campaign-strategy',
        title: 'Campaign Strategy',
        description: 'Creative ambition meets measurable results.',
        longDescription: 'End-to-end campaign planning from the first brief to where your budget goes, how your message reads, and what success looks like.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/campaign-strategy-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/campaign-strategy.jpg',
        mobileObjectPosition: '80% 35%',
        videos: [
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/campaign-strategy/campaign-concepts.mp4', label: 'Campaign Concepts' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/campaign-strategy/graphic-design-concepts.mp4', label: 'Design Concepts' },
          { src: 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/services/campaign-strategy/strategic-storytelling.mp4', label: 'Strategic Storytelling' },
        ],
      },
      {
        slug: 'finance-expert',
        title: 'Finance Expert',
        description: 'Financial clarity that drives decisions.',
        longDescription: 'Financial modeling, scenario planning, and advisory for founders and executives navigating complexity.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/finance-expert-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/finance-expert.jpg',
        mobileObjectPosition: '60% 38%',
        videos: [],
      },
      {
        slug: 'business-strategist',
        title: 'Business Strategist',
        description: 'Strategy that survives contact with reality.',
        longDescription: 'Market positioning, growth planning, and operational strategy. Built for execution, not decks.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/business-strategist-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/business-strategist.jpg',
        mobileObjectPosition: '55% 40%',
        videos: [],
      },
      {
        slug: 'early-stage-recovery',
        title: 'Debt Recovery',
        description: 'Turn distressed debt into recovered value.',
        longDescription: 'Recovery planning and financial stabilization for businesses under pressure. We diagnose the problem first. Then we fix it.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: '/images/services/early-stage-recovery-hero.jpg',
        mobileHeroImage: 'https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/mobile/debt-recovery.jpg',
        mobileObjectPosition: '60% 40%',
        videos: [],
      },
    ],
  },
]

export const ALL_SERVICES: ServiceItem[] = SERVICE_CATEGORIES.flatMap(c => c.items)

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return ALL_SERVICES.find(s => s.slug === slug)
}

export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return SERVICE_CATEGORIES.find(c => c.slug === slug)
}

