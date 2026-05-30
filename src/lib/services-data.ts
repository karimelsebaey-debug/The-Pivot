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
}

export type ServiceCategory = {
  slug: string
  number: string
  title: string
  description: string
  accent: string
  bg: string
  items: ServiceItem[]
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'specialized-production',
    number: '01',
    title: 'Specialized Production',
    description: 'End-to-end production for motion, web, copy, and design systems that scale.',
    accent: '#C9A84C',
    bg: '#0A211F',
    items: [
      {
        slug: 'motion-design',
        title: 'Motion Design',
        description: 'Animation that commands attention.',
        longDescription: 'From brand explainers to cinematic motion ads — we craft motion that stops the scroll and earns the click.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [
          { src: '/videos/services/motion-design/motion-ads.mp4', label: 'Motion Ads' },
          { src: '/videos/services/motion-design/explainers.mp4', label: 'Explainers & How-Tos' },
          { src: '/videos/services/motion-design/campaign-support.mp4', label: 'Campaign Support' },
          { src: '/videos/services/motion-design/web-animations.mp4', label: 'Web Animations' },
        ],
      },
      {
        slug: 'email-creation',
        title: 'Email Creation',
        description: 'Emails people actually open.',
        longDescription: 'CRM-native templates, lifecycle flows, and performance-optimized sequences that convert readers into clients.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [
          { src: '/videos/services/email-creation/crm-native.mp4', label: 'CRM-Native Development' },
        ],
      },
      {
        slug: 'web-design',
        title: 'Web Design',
        description: 'Sites that earn Awwwards, not just visits.',
        longDescription: 'Scroll-driven storytelling, editorial layouts, and interaction design that makes your brand impossible to ignore online.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [
          { src: '/videos/services/web-design/brand-illustrations.mp4', label: 'Brand Illustrations' },
          { src: '/videos/services/web-design/storyboarding.mp4', label: 'Storyboarding' },
        ],
      },
      {
        slug: 'copywriting',
        title: 'Copywriting',
        description: 'Words that close.',
        longDescription: 'Brand messaging, web copy, long-form content, and ad scripts — written to persuade, not just inform.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [],
      },
      {
        slug: 'design-systems',
        title: 'Design Systems',
        description: 'One system. Infinite scale.',
        longDescription: 'Component libraries, tokens, documentation, and governance frameworks that let your team ship faster without breaking brand.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [],
      },
      {
        slug: 'product-design',
        title: 'Product Design',
        description: 'UX that converts.',
        longDescription: 'End-to-end product design, UX audits, and iteration cycles that turn user frustration into business momentum.',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#C9A84C',
        bg: '#0A211F',
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
    items: [
      {
        slug: 'ad-creative',
        title: 'Ad Creative',
        description: 'Creative that converts, not just impresses.',
        longDescription: 'Static and motion ad creative engineered for performance — built for paid social, programmatic, and OOH formats.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/ad-creative/motion-graphics.mp4', label: 'Motion Graphics' },
          { src: '/videos/services/ad-creative/illustration.mp4', label: 'Illustration' },
        ],
      },
      {
        slug: 'social-media-creative',
        title: 'Social Media Creative',
        description: 'Content that earns the stop.',
        longDescription: 'Platform-native content across Instagram, TikTok, LinkedIn, and beyond — organic and paid, always on-brand.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/social-media-creative/organic-social.mp4', label: 'Organic Social Content' },
        ],
      },
      {
        slug: 'presentation-design',
        title: 'Presentation Design',
        description: 'Slides that close the room.',
        longDescription: 'Investor decks, pitch books, and corporate presentations — designed to persuade in the boardroom.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/presentation-design/data-visualization.mp4', label: 'Data Visualization' },
          { src: '/videos/services/presentation-design/motion-slides.mp4', label: 'Motion for Slides' },
        ],
      },
      {
        slug: 'illustration-design',
        title: 'Illustration Design',
        description: 'Visual language only you own.',
        longDescription: 'Custom illustration systems — characters, icons, editorial art, and infographics that become part of your brand DNA.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [],
      },
      {
        slug: 'branding-services',
        title: 'Branding Services',
        description: 'Brands built to last decades.',
        longDescription: 'Logo design, brand identity, guidelines, and rebranding — the full visual system your brand needs to lead.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/branding-services/brand-consistency.mp4', label: 'Brand Consistency' },
          { src: '/videos/services/branding-services/brand-guidelines.mp4', label: 'Brand Guidelines' },
        ],
      },
      {
        slug: 'concept-creation',
        title: 'Concept Creation',
        description: 'The idea before the execution.',
        longDescription: 'Campaign concepts, creative briefs, moodboards, and ideation sprints — where great work begins.',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/concept-creation/ad-new-brand.mp4', label: 'New Brand Concept' },
        ],
      },
    ],
  },
  {
    slug: 'ai-services',
    number: '03',
    title: 'AI Services',
    description: 'AI-powered creative, automation, data visualization, and consulting for the next era.',
    accent: '#C9A84C',
    bg: '#0A211F',
    items: [
      {
        slug: 'ai-powered-creative',
        title: 'AI-Powered Creative',
        description: 'Human vision. Machine speed.',
        longDescription: 'AI video production, image synthesis, avatar creation, and creative at scale — without sacrificing brand integrity.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [
          { src: '/videos/services/ai-powered-creative/ai-video-production.mp4', label: 'AI Video Production' },
          { src: '/videos/services/ai-powered-creative/brand-imagery.mp4', label: 'Brand Imagery' },
          { src: '/videos/services/ai-powered-creative/image-enhancements.mp4', label: 'Image Enhancements' },
          { src: '/videos/services/ai-powered-creative/translation.mp4', label: 'Translation & Transcreation' },
        ],
      },
      {
        slug: 'ai-consulting',
        title: 'AI Consulting',
        description: 'Strategy before the stack.',
        longDescription: 'AI readiness assessments, tool selection, workflow redesign, and team enablement — before you spend a dollar on software.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [],
      },
      {
        slug: 'automation',
        title: 'Automation',
        description: 'Remove the work that removes focus.',
        longDescription: 'End-to-end workflow automation for marketing, ops, and creative teams — built on n8n, Make, and custom pipelines.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#C9A84C',
        bg: '#0A211F',
        videos: [],
      },
      {
        slug: 'data-services',
        title: 'Data Services',
        description: 'The numbers were always there.',
        longDescription: 'P&L dashboards, data visualization, reporting infrastructure, and analytics pipelines that make complexity readable.',
        category: 'AI Services',
        categorySlug: 'ai-services',
        accent: '#C9A84C',
        bg: '#0A211F',
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
    items: [
      {
        slug: 'campaign-strategy',
        title: 'Campaign Strategy',
        description: 'Creative ambition meets measurable results.',
        longDescription: 'Full-funnel campaign strategy — from brief to media mix, messaging architecture to performance benchmarks.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [
          { src: '/videos/services/campaign-strategy/campaign-concepts.mp4', label: 'Campaign Concepts' },
          { src: '/videos/services/campaign-strategy/graphic-design-concepts.mp4', label: 'Design Concepts' },
          { src: '/videos/services/campaign-strategy/strategic-storytelling.mp4', label: 'Strategic Storytelling' },
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
        videos: [],
      },
      {
        slug: 'business-strategist',
        title: 'Business Strategist',
        description: 'Strategy that survives contact with reality.',
        longDescription: 'Market positioning, growth planning, and operational strategy — built for execution, not decks.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [],
      },
      {
        slug: 'pl-expert',
        title: 'P&L Expert',
        description: 'Profit clarity. Line by line.',
        longDescription: 'P&L analysis, margin improvement, cost structure redesign, and profitability benchmarking across business units.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [],
      },
      {
        slug: 'early-stage-recovery',
        title: 'Early Stage Recovery',
        description: 'The turning point, before it is too late.',
        longDescription: 'Diagnostic, stabilization, and recovery planning for early-stage companies showing signs of financial or operational stress.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        videos: [],
      },
      {
        slug: 'write-off-recovery',
        title: 'Write-off Recovery',
        description: 'Value others walked away from.',
        longDescription: 'Structured recovery strategies for distressed assets, written-off receivables, and dormant business units.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
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
