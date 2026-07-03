export type MediaItem = {
  src: string
  label: string
  type: 'video' | 'image'
  aspectRatio?: string
  objectPosition?: string
  description?: string
}

export type ServiceItem = {
  slug: string
  title: string
  description: string
  longDescription: string
  intro?: string
  introLabel?: string
  headingLine1?: string
  headingItalic?: string
  introSubtitle?: string
  introBg?: string
  videos: { src: string; label: string }[]
  images?: { src: string; label: string }[]
  mediaItems?: MediaItem[]
  gridRows?: (number | { count: number; cardAspectRatio?: string; columns?: string })[]
  gridMaxWidth?: string
  category: string
  categorySlug: string
  accent: string
  bg: string
  heroImage?: string
  heroHeadline?: string
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

const CDN = 'https://res.cloudinary.com/dn21xgyhb'
const img = (slug: string, file: string) =>
  `${CDN}/image/upload/q_auto,f_auto/the-pivot/services/${slug}/${file}`
const vid = (slug: string, file: string) =>
  `${CDN}/video/upload/q_auto,f_auto/the-pivot/services/${slug}/${file}`

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    slug: 'specialized-production',
    number: '01',
    title: 'Specialized Production',
    description: 'End-to-end production for motion, web, copy, and design systems that scale.',
    accent: '#A8885A',
    bg: '#0A211F',
    heroImage: '/images/categories/specialized-production-hero.jpg',
    mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/specialized-production.jpg`,
    mobileObjectPosition: '70% 35%',
    items: [
      {
        slug: 'motion-design',
        title: 'Motion Design',
        description: 'Animation that commands attention.',
        longDescription: 'From brand explainers to cinematic motion ads, we craft motion that stops the scroll and earns the click.',
        intro: 'Movement is the message. We craft motion that stops the scroll, deepens your story, and turns static brands into living ones — from quick social ads to full-scale campaigns.',
        introLabel: 'What We Offer',
        headingLine1: 'Delivering motion design that',
        headingItalic: 'moves the needle',
        introSubtitle: 'From quick-turn ads to high-concept animation, we design motion for every use case and channel.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('motion-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/motion-design.jpg`,
        mobileObjectPosition: '55% 55%',
        videos: [
          { src: vid('motion-design', 'Web%20animations.mp4'), label: 'Web Animations' },
          { src: vid('motion-design', 'Explainers%20and%20how-tos.mp4'), label: 'Explainers & How-Tos' },
        ],
        images: [
          { src: img('motion-design', 'Motion%20ads.jpg'), label: 'Motion Ads' },
          { src: img('motion-design', 'Campaign%20support.jpg'), label: 'Campaign Support' },
          { src: img('motion-design', 'Presentation%20and%20event%20motion.jpg'), label: 'Presentation & Event Motion' },
        ],
        mediaItems: [
          { src: vid('motion-design', 'Explainers%20and%20how-tos.mp4'), label: 'Explainers & How-Tos', type: 'video', aspectRatio: '16/9' },
          { src: img('motion-design', 'Motion%20ads.jpg'),                label: 'Motion Ads',            type: 'image', aspectRatio: '56/75' },
          { src: img('motion-design', 'Presentation%20and%20event%20motion.jpg'), label: 'Presentation & Event Motion', type: 'image', aspectRatio: '56/75' },
          { src: img('motion-design', 'Campaign%20support.jpg'),          label: 'Campaign Support',      type: 'image', aspectRatio: '75/56' },
          { src: vid('motion-design', 'Web%20animations.mp4'),            label: 'Web Animations',        type: 'video', aspectRatio: '16/9', objectPosition: 'left top' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '56/75', columns: '29fr 14fr 14fr' },
          { count: 2, cardAspectRatio: '16/9' },
        ],
      },
      {
        slug: 'email-creation',
        title: 'Email Creation',
        description: 'Emails people actually open.',
        longDescription: 'Email templates, automated flows, and sequences built to make people actually click. And keep reading.',
        intro: 'Email templates, automated flows, and sequences built to make people actually click. And keep reading.',
        introLabel: 'What We Offer',
        headingLine1: 'Emails people',
        headingItalic: 'actually open',
        introSubtitle: 'From modular templates to growth flows, we design, write, and build emails that convert — inside the tools you already use.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('email-creation', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/email-creation.jpg`,
        mobileObjectPosition: '75% 55%',
        videos: [
          { src: vid('email-creation', 'CRM-native%20development.mp4'), label: 'CRM-Native Development' },
        ],
        images: [
          { src: img('email-creation', 'Email%20performance%20optimization.jpg'), label: 'Email Performance Optimization' },
          { src: img('email-creation', 'Growth%20and%20lifecycle%20flows.jpg'), label: 'Growth & Lifecycle Flows' },
          { src: img('email-creation', 'Modular%20templates.jpg'), label: 'Modular Templates' },
        ],
        mediaItems: [
          { src: vid('email-creation', 'CRM-native%20development.mp4'),              label: 'CRM-Native Development',         type: 'video', aspectRatio: '3/4' },
          { src: img('email-creation', 'Email%20performance%20optimization.jpg'),    label: 'Email Performance Optimization', type: 'image', aspectRatio: '3/4' },
          { src: img('email-creation', 'Growth%20and%20lifecycle%20flows.jpg'),      label: 'Growth & Lifecycle Flows',       type: 'image', aspectRatio: '3/4' },
          { src: img('email-creation', 'Modular%20templates.jpg'),                   label: 'Modular Templates',              type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 4, cardAspectRatio: '3/4' },
        ],
      },
      {
        slug: 'web-design',
        title: 'Web Design',
        description: 'Sites that earn Awwwards, not just visits.',
        longDescription: 'Scroll-driven storytelling, editorial layouts, and interaction design that makes your brand impossible to ignore online.',
        intro: 'Scroll-driven storytelling, editorial layouts, and interaction design that makes your brand impossible to ignore online.',
        introLabel: 'What We Offer',
        headingLine1: 'Creative web design, ready to',
        headingItalic: 'scale and convert',
        introSubtitle: 'Whether you\'re optimizing an existing site or designing something entirely new, we give you everything you need to move forward confidently and drive measurable business results.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('web-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/web-design.jpg`,
        mobileObjectPosition: '70% 40%',
        videos: [
          { src: vid('web-design', 'Brand%20illustrations.mp4'), label: 'Brand Illustrations' },
          { src: vid('web-design', 'Storyboarding.mp4'), label: 'Storyboarding' },
        ],
        images: [
          { src: img('web-design', 'Custom%20landing%20page%20design.jpg'), label: 'Custom Landing Page Design' },
          { src: img('web-design', 'Data%20visualization.jpg'), label: 'Data Visualization' },
          { src: img('web-design', 'Iconography.jpg'), label: 'Iconography' },
          { src: img('web-design', 'Infographic%20design.jpg'), label: 'Infographic Design' },
        ],
        mediaItems: [
          { src: vid('web-design', 'Brand%20illustrations.mp4'),            label: 'Brand Illustrations',      type: 'video', aspectRatio: '16/9' },
          { src: img('web-design', 'Custom%20landing%20page%20design.jpg'), label: 'Custom Landing Page Design', type: 'image', aspectRatio: '16/9' },
          { src: img('web-design', 'Data%20visualization.jpg'),             label: 'Data Visualization',       type: 'image', aspectRatio: '3/4' },
          { src: img('web-design', 'Iconography.jpg'),                      label: 'Iconography',              type: 'image', aspectRatio: '3/4' },
          { src: img('web-design', 'Infographic%20design.jpg'),             label: 'Infographic Design',       type: 'image', aspectRatio: '3/4' },
          { src: vid('web-design', 'Storyboarding.mp4'),                    label: 'Storyboarding',            type: 'video', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 2, cardAspectRatio: '16/9' },
          { count: 4, cardAspectRatio: '3/4' },
        ],
      },
      {
        slug: 'copywriting',
        title: 'Copywriting',
        description: 'Words that close.',
        longDescription: 'Brand messaging, web copy, long-form content, and ad scripts. Written to persuade, not just inform.',
        intro: 'Brand messaging, web copy, long-form content, and ad scripts. Written to persuade, not just inform.',
        introLabel: 'What We Offer',
        headingLine1: "Copywriting that's",
        headingItalic: 'on brand and on brief',
        introSubtitle: 'We cover all your copy needs from high-converting ads to in-depth content and frameworks that shape how your brand shows up.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('copywriting', 'main%20page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/copywriting.jpg`,
        mobileObjectPosition: '70% 35%',
        videos: [],
        images: [
          { src: img('copywriting', 'Brand%20messaging%20frameworks.jpg'), label: 'Brand Messaging Frameworks' },
          { src: img('copywriting', 'Email%20and%20lifecycle%20campaigns.jpg'), label: 'Email & Lifecycle Campaigns' },
          { src: img('copywriting', 'Long-form%20content.jpg'), label: 'Long-Form Content' },
          { src: img('copywriting', 'Paid%20and%20social%20ads.jpg'), label: 'Paid & Social Ads' },
          { src: img('copywriting', 'Product%20marketing.jpg'), label: 'Product Marketing' },
          { src: img('copywriting', 'Web%20and%20landing%20pages.jpg'), label: 'Web & Landing Pages' },
        ],
        mediaItems: [
          { src: img('copywriting', 'Brand%20messaging%20frameworks.jpg'),      label: 'Brand Messaging Frameworks',  type: 'image', aspectRatio: '4/3' },
          { src: img('copywriting', 'Email%20and%20lifecycle%20campaigns.jpg'), label: 'Email & Lifecycle Campaigns', type: 'image', aspectRatio: '3/4' },
          { src: img('copywriting', 'Long-form%20content.jpg'),                 label: 'Long-Form Content',           type: 'image', aspectRatio: '3/4' },
          { src: img('copywriting', 'Paid%20and%20social%20ads.jpg'),           label: 'Paid & Social Ads',           type: 'image', aspectRatio: '4/3' },
          { src: img('copywriting', 'Product%20marketing.jpg'),                 label: 'Product Marketing',           type: 'image', aspectRatio: '3/4' },
          { src: img('copywriting', 'Web%20and%20landing%20pages.jpg'),         label: 'Web & Landing Pages',         type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '4/3', columns: '16fr 9fr 9fr' },
          { count: 3, cardAspectRatio: '4/3', columns: '16fr 9fr 9fr' },
        ],
      },
      {
        slug: 'design-systems',
        title: 'Design Systems',
        description: 'One system. Infinite scale.',
        longDescription: 'A shared design language for your whole team. So every product, page, and asset looks like it belongs to the same brand.',
        intro: 'A shared design language for your whole team. So every product, page, and asset looks like it belongs to the same brand.',
        introLabel: 'What We Offer',
        headingLine1: 'The building blocks of',
        headingItalic: 'great digital experiences',
        introSubtitle: 'Our design systems are built to help organizations reduce rework, improve collaboration between design and development, and scale with confidence.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('design-systems', 'main%20page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/design-systems.jpg`,
        mobileObjectPosition: '65% 40%',
        videos: [],
        images: [
          { src: img('design-systems', 'Design%20system%20audit.jpg'), label: 'Design System Audit' },
          { src: img('design-systems', 'Design%20system%20creation.jpg'), label: 'Design System Creation' },
          { src: img('design-systems', 'System%20maintenance.jpg'), label: 'System Maintenance' },
        ],
        mediaItems: [
          { src: img('design-systems', 'Design%20system%20audit.jpg'),    label: 'Design System Audit',    type: 'image', aspectRatio: '1/1', objectPosition: 'center center' },
          { src: img('design-systems', 'Design%20system%20creation.jpg'), label: 'Design System Creation', type: 'image', aspectRatio: '3/4' },
          { src: img('design-systems', 'System%20maintenance.jpg'),       label: 'System Maintenance',     type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '1/1', columns: '4fr 3fr 3fr' },
        ],
      },
      {
        slug: 'product-design',
        title: 'Product Design',
        description: 'UX that converts.',
        longDescription: 'End-to-end product design, UX audits, and iteration cycles that turn user frustration into business momentum.',
        intro: 'End-to-end product design, UX audits, and iteration cycles that turn user frustration into business momentum.',
        introLabel: 'What We Offer',
        headingLine1: 'The building blocks of',
        headingItalic: 'great digital experiences',
        introSubtitle: 'From pixel-level execution to scalable design infrastructure, we give you everything needed to launch and maintain high-performing products.',
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('product-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/product-design.jpg`,
        mobileObjectPosition: '85% 50%',
        videos: [],
        images: [
          { src: img('product-design', 'End-to-end%20product%20design.jpg'), label: 'End-to-End Product Design' },
          { src: img('product-design', 'Product%20design%20audit.jpg'), label: 'Product Design Audit' },
          { src: img('product-design', 'UX%20enhancements%20and%20iteration.jpg'), label: 'UX Enhancements & Iteration' },
        ],
        mediaItems: [
          { src: img('product-design', 'End-to-end%20product%20design.jpg'),   label: 'End-to-End Product Design',   type: 'image', aspectRatio: '4/3' },
          { src: img('product-design', 'UX%20enhancements%20and%20iteration.jpg'), label: 'UX Enhancements & Iteration', type: 'image', aspectRatio: '4/3' },
          { src: img('product-design', 'Product%20design%20audit.jpg'),         label: 'Product Design Audit',         type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '4/3', columns: '16fr 16fr 9fr' },
        ],
      },
      {
        slug: 'video-production',
        title: 'Video Production',
        description: 'Films that move people.',
        longDescription: 'Full-service commercial production from concept to delivery. When the brief matters, the execution has to match.',
        intro: 'Full-service commercial production from concept to delivery. When the brief matters, the execution has to match.',
        introLabel: 'Full-Service Production',
        headingLine1: 'Flexible production options for',
        headingItalic: 'every kind of video need',
        introSubtitle: "End-to-end or just where you need us, we've got your team's back (and also your backlog).",
        introBg: '#DADECF',
        category: 'Specialized Production',
        categorySlug: 'specialized-production',
        accent: '#A8885A',
        bg: '#0A211F',
        heroImage: img('video-production', 'Main%20Page.jpg'),
        mobileObjectPosition: '60% 50%',
        videos: [
          { src: vid('video-production', 'AI-Enhanced%20video%20creation.mp4'), label: 'AI-Enhanced Video Creation' },
          { src: vid('video-production', 'Full-service%20commercial.mp4'), label: 'Full-Service Commercial' },
          { src: vid('video-production', 'Just%20the%20concept.mp4'), label: 'Just the Concept' },
        ],
        images: [
          { src: img('video-production', 'Video%20specialists-2.jpg'), label: 'Video Specialists' },
        ],
        mediaItems: [
          { src: vid('video-production', 'AI-Enhanced%20video%20creation.mp4'), label: 'AI-Enhanced Video Creation', type: 'video', aspectRatio: '4/3', description: 'Adding motion, speeding up production, and getting to market faster with AI-human collaboration.' },
          { src: vid('video-production', 'Full-service%20commercial.mp4'),       label: 'Full-Service Commercial',    type: 'video', aspectRatio: '3/4', description: 'Script, cast, shoot, edit, and animate. Your cinematic campaign starts here.' },
          { src: img('video-production', 'Video%20specialists-2.jpg'),           label: 'Video Specialists',          type: 'image', aspectRatio: '3/4', objectPosition: 'center center' },
          { src: vid('video-production', 'Just%20the%20concept.mp4'),            label: 'Just the Concept',           type: 'video', aspectRatio: '4/3' },
        ],
        gridRows: [
          { count: 2, cardAspectRatio: '4/3', columns: '16fr 9fr' },
          { count: 2, cardAspectRatio: '3/4', columns: '9fr 16fr' },
        ],
        gridMaxWidth: '900px',
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
    mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/creative-design.jpg`,
    mobileObjectPosition: '65% 45%',
    items: [
      {
        slug: 'ad-creative',
        title: 'Ad Creative',
        description: 'Creative that converts, not just impresses.',
        longDescription: 'Static and motion ads built to perform across social media, digital, and outdoor campaigns. Every asset made to earn its spot.',
        intro: 'Static and motion ads built to perform across social media, digital, and outdoor campaigns. Every asset made to earn its spot.',
        introLabel: 'What We Offer',
        headingLine1: 'Ad creative services that',
        headingItalic: 'scale',
        introSubtitle: 'From big campaign concepts to video editing, we offer the creative muscle to keep your ads fresh and on-brand, across every channel and campaign.',
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('ad-creative', 'Main%20Page%20star.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/ad-creative.jpg`,
        mobileObjectPosition: '50% 40%',
        videos: [
          { src: vid('ad-creative', 'Motion%20graphics.mp4'), label: 'Motion Graphics' },
          { src: vid('ad-creative', 'Illustration%20Original.mp4'), label: 'Illustration' },
        ],
        images: [
          { src: img('ad-creative', 'Static%20design.jpg'), label: 'Static Design' },
          { src: img('ad-creative', 'Motion%20graphics.jpg'), label: 'Motion Graphics' },
        ],
        mediaItems: [
          { src: vid('ad-creative', 'Illustration%20Original.mp4'), label: 'Illustration Original', type: 'video', aspectRatio: '16/9' },
          { src: vid('ad-creative', 'Motion%20graphics.mp4'),       label: 'Motion Graphics',         type: 'video', aspectRatio: '3/2' },
          { src: img('ad-creative', 'Static%20design.jpg'),         label: 'Static Design',           type: 'image', aspectRatio: '3/2' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '16/9', columns: '32fr 27fr 27fr' },
        ],
      },
      {
        slug: 'social-media-creative',
        title: 'Social Media Creative',
        description: 'Content that earns the stop.',
        longDescription: 'Platform-native content across Instagram, TikTok, LinkedIn, and beyond. Organic and paid, always on-brand.',
        intro: 'Platform-native content across Instagram, TikTok, LinkedIn, and beyond. Organic and paid, always on-brand.',
        introLabel: 'Made For Social',
        headingLine1: 'Social media creative built for',
        headingItalic: 'every platform and goal',
        introSubtitle: 'Our creative experts deliver high-performing social media design and creative that drives clicks, shares, and conversions.',
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('social-media-creative', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/social-media-creative.jpg`,
        mobileObjectPosition: '65% 40%',
        videos: [
          { src: vid('social-media-creative', 'Organic%20social%20content.mp4'), label: 'Organic Social Content' },
        ],
        images: [
          { src: img('social-media-creative', 'Campaign%20concepts.jpg'), label: 'Campaign Concepts' },
          { src: img('social-media-creative', 'Immersive%20experiences.jpg'), label: 'Immersive Experiences' },
          { src: img('social-media-creative', 'Organic%20social%20content.jpg'), label: 'Organic Social Content' },
          { src: img('social-media-creative', 'Paid%20social%20ads.jpg'), label: 'Paid Social Ads' },
        ],
        mediaItems: [
          { src: img('social-media-creative', 'Campaign%20concepts.jpg'),         label: 'Campaign Concepts',       type: 'image', aspectRatio: '3/4' },
          { src: vid('social-media-creative', 'Organic%20social%20content.mp4'),  label: 'Organic Social Content',  type: 'video', aspectRatio: '3/4' },
          { src: img('social-media-creative', 'Paid%20social%20ads.jpg'),         label: 'Paid Social Ads',         type: 'image', aspectRatio: '3/4' },
          { src: img('social-media-creative', 'Immersive%20experiences.jpg'),     label: 'Immersive Experiences',   type: 'image', aspectRatio: '3/2' },
          { src: img('social-media-creative', 'Organic%20social%20content.jpg'),  label: 'Organic Social Content',  type: 'image', aspectRatio: '3/2' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '3/4', columns: 'repeat(3, 1fr)' },
          { count: 2, cardAspectRatio: '3/2', columns: 'repeat(2, 1fr)' },
        ],
        gridMaxWidth: '850px',
      },
      {
        slug: 'presentation-design',
        title: 'Presentation Design',
        description: 'Slides that close the room.',
        longDescription: 'Investor decks, pitch books, and corporate presentations designed to persuade in the boardroom.',
        intro: 'Investor decks, pitch books, and corporate presentations designed to persuade in the boardroom.',
        introLabel: 'Flexible Formats',
        headingLine1: 'Expert design across',
        headingItalic: 'Keynote, PowerPoint, Slides & Figma',
        introSubtitle: 'From polishing a professional business presentation to delivering a custom pitch deck fast, we cover every high-stakes moment.',
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('presentation-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/presentation-design.jpg`,
        mobileObjectPosition: '65% 40%',
        videos: [
          { src: vid('presentation-design', 'Data%20visualization.mp4'), label: 'Data Visualization' },
          { src: vid('presentation-design', 'Motion%20for%20slides.mp4'), label: 'Motion for Slides' },
        ],
        images: [
          { src: img('presentation-design', 'Custom%20presentation%20design.jpg'), label: 'Custom Presentation Design' },
          { src: img('presentation-design', 'Presentation%20templates.jpg'), label: 'Presentation Templates' },
        ],
        mediaItems: [
          { src: img('presentation-design', 'Custom%20presentation%20design.jpg'), label: 'Custom Presentation Design', type: 'image', aspectRatio: '4/3' },
          { src: vid('presentation-design', 'Data%20visualization.mp4'),           label: 'Data Visualization',          type: 'video', aspectRatio: '3/4' },
          { src: vid('presentation-design', 'Motion%20for%20slides.mp4'),          label: 'Motion for Slides',           type: 'video', aspectRatio: '3/4' },
          { src: img('presentation-design', 'Presentation%20templates.jpg'),       label: 'Presentation Templates',      type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 1, cardAspectRatio: '4/3', columns: '1fr' },
          { count: 3, cardAspectRatio: '3/4', columns: 'repeat(3, 1fr)' },
        ],
        gridMaxWidth: '850px',
      },
      {
        slug: 'illustration-design',
        title: 'Illustration Design',
        description: 'Visual language only you own.',
        longDescription: 'Custom illustration systems built around characters, icons, editorial art, and infographics that become part of your brand DNA.',
        intro: 'Custom illustration systems built around characters, icons, editorial art, and infographics that become part of your brand DNA.',
        introLabel: 'What We Offer',
        headingLine1: 'Illustration design built to',
        headingItalic: 'bring your brand to life',
        introSubtitle: 'From sets of custom icons to office-wall murals, no matter the scale, we deliver work that is original, captivating, and narrative-driven.',
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('illustration-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/illustration-design.jpg`,
        mobileObjectPosition: '70% 45%',
        videos: [],
        images: [
          { src: img('illustration-design', 'Brand%20illustrations.jpg'), label: 'Brand Illustrations' },
          { src: img('illustration-design', 'Data%20visualization.jpg'), label: 'Data Visualization' },
          { src: img('illustration-design', 'Iconography.jpg'), label: 'Iconography' },
        ],
        mediaItems: [
          { src: img('illustration-design', 'Brand%20illustrations.jpg'),  label: 'Brand Illustrations',  type: 'image', aspectRatio: '4/3' },
          { src: img('illustration-design', 'Data%20visualization.jpg'),   label: 'Data Visualization',   type: 'image', aspectRatio: '3/4' },
          { src: img('illustration-design', 'Iconography.jpg'),            label: 'Iconography',           type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '4/3', columns: '16fr 9fr 9fr' },
        ],
        gridMaxWidth: '900px',
      },
      {
        slug: 'branding-services',
        title: 'Branding Services',
        description: 'Brands built to last decades.',
        longDescription: 'Logo design, brand identity, guidelines, and rebranding. The full visual system your brand needs to lead.',
        intro: 'Logo design, brand identity, guidelines, and rebranding. The full visual system your brand needs to lead.',
        introLabel: 'What We Offer',
        headingLine1: 'From *brand strategy to brand systems,* we cover it all',
        introSubtitle: "Our branding services fuel consistency, speed, and standout creative, whether you're starting from scratch or evolving what exists.",
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('branding-services', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/branding-services.jpg`,
        mobileObjectPosition: '50% 65%',
        videos: [
          { src: vid('branding-services', 'Brand%20consistency.mp4'), label: 'Brand Consistency' },
          { src: vid('branding-services', 'Brand%20guidelines.mp4'), label: 'Brand Guidelines' },
        ],
        images: [
          { src: img('branding-services', 'Brand%20design.jpg'), label: 'Brand Design' },
          { src: img('branding-services', 'Brand%20development.jpg'), label: 'Brand Development' },
          { src: img('branding-services', 'Logo%20design.jpg'), label: 'Logo Design' },
          { src: img('branding-services', 'Rebranding%20services.jpg'), label: 'Rebranding Services' },
        ],
        mediaItems: [
          { src: vid('branding-services', 'Brand%20consistency.mp4'),    label: 'Brand Consistency',   type: 'video', aspectRatio: '3/4' },
          { src: img('branding-services', 'Brand%20design.jpg'),         label: 'Brand Design',         type: 'image', aspectRatio: '4/3' },
          { src: img('branding-services', 'Brand%20development.jpg'),    label: 'Brand Development',    type: 'image', aspectRatio: '3/4' },
          { src: vid('branding-services', 'Brand%20guidelines.mp4'),     label: 'Brand Guidelines',     type: 'video', aspectRatio: '3/4' },
          { src: img('branding-services', 'Logo%20design.jpg'),          label: 'Logo Design',          type: 'image', aspectRatio: '3/4' },
          { src: img('branding-services', 'Rebranding%20services.jpg'),  label: 'Rebranding Services',  type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 2, cardAspectRatio: '3/4', columns: '9fr 16fr' },
          { count: 4, cardAspectRatio: '3/4', columns: 'repeat(4, 1fr)' },
        ],
        gridMaxWidth: '1100px',
      },
      {
        slug: 'concept-creation',
        title: 'Concept Creation',
        description: 'The idea before the execution.',
        longDescription: 'Campaign concepts, creative briefs, and visual directions that give your work a clear starting point. Where great ideas begin.',
        intro: 'Campaign concepts, creative briefs, and visual directions that give your work a clear starting point. Where great ideas begin.',
        introLabel: 'What We Offer',
        headingLine1: 'Every campaign *starts with an idea*',
        introSubtitle: 'From raw concept to creative direction, we shape the idea before a single asset gets built.',
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('concept-creation', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/concept-creation.jpg`,
        mobileObjectPosition: '70% 35%',
        videos: [
          { src: vid('concept-creation', 'Ad%20New%20Brand%20%282%29.mp4'), label: 'New Brand Concept' },
        ],
        images: [
          { src: img('concept-creation', 'digital%20billboard%20kiosk.jpg'), label: 'Digital Billboard Kiosk' },
          { src: img('concept-creation', 'Sub%20Main.jpg'), label: 'Sub Main' },
        ],
        mediaItems: [
          { src: vid('concept-creation', 'Ad%20New%20Brand%20%282%29.mp4'),    label: 'New Brand Concept',      type: 'video', aspectRatio: '3/4' },
          { src: img('concept-creation', 'digital%20billboard%20kiosk.jpg'),   label: 'Digital Billboard Kiosk', type: 'image', aspectRatio: '3/4' },
          { src: img('concept-creation', 'Sub%20Main.jpg'),                    label: 'Sub Main',                type: 'image', aspectRatio: '3/4' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '3/4', columns: 'repeat(3, 1fr)' },
        ],
        gridMaxWidth: '900px',
      },
      {
        slug: 'packaging-merchandise-design',
        title: 'Packaging & Merchandise Design',
        description: 'Bring your brand to life.',
        longDescription: 'Give your brand custom product packaging, merchandising, and branded apparel designs that people remember and want to hold on to.',
        intro: 'Give your brand custom product packaging, merchandising, and branded apparel designs that people remember and want to hold on to.',
        heroHeadline: 'Design for the *brand touchpoints* you can touch',
        introLabel: 'What We Deliver',
        headingLine1: '*Custom design* for every item on your wishlist',
        introSubtitle: "No matter what you've been dreaming of, our collaborative design services are built around your brand, goals, and audience.",
        introBg: '#DADECF',
        category: 'Creative Design',
        categorySlug: 'creative-design',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('packaging-merchandise-design', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/packaging-merchandise-design.jpg`,
        videos: [],
        images: [
          { src: img('packaging-merchandise-design', 'Apparel%20design.jpg'), label: 'Apparel Design' },
          { src: img('packaging-merchandise-design', 'Corporate%20gifting.jpg'), label: 'Corporate Gifting' },
          { src: img('packaging-merchandise-design', 'Custom%20kits.jpg'), label: 'Custom Kits' },
          { src: img('packaging-merchandise-design', 'Packaging%20design.jpg'), label: 'Packaging Design' },
          { src: img('packaging-merchandise-design', 'Merchandising%20design.jpg'), label: 'Merchandising Design' },
          { src: img('packaging-merchandise-design', 'Event%20collateral.jpg'), label: 'Event Collateral' },
        ],
        mediaItems: [
          { src: img('packaging-merchandise-design', 'Apparel%20design.jpg'),       label: 'Apparel Design',       type: 'image', aspectRatio: '4/3' },
          { src: img('packaging-merchandise-design', 'Corporate%20gifting.jpg'),    label: 'Corporate Gifting',    type: 'image', aspectRatio: '3/4' },
          { src: img('packaging-merchandise-design', 'Custom%20kits.jpg'),          label: 'Custom Kits',          type: 'image', aspectRatio: '3/4' },
          { src: img('packaging-merchandise-design', 'Merchandising%20design.jpg'), label: 'Merchandising Design', type: 'image', aspectRatio: '3/4' },
          { src: img('packaging-merchandise-design', 'Event%20collateral.jpg'),     label: 'Event Collateral',     type: 'image', aspectRatio: '3/4' },
          { src: img('packaging-merchandise-design', 'Packaging%20design.jpg'),     label: 'Packaging Design',     type: 'image', aspectRatio: '4/3' },
        ],
        gridRows: [
          { count: 3, cardAspectRatio: '4/3', columns: '16fr 9fr 9fr' },
          { count: 3, cardAspectRatio: '4/3', columns: '9fr 9fr 16fr' },
        ],
        gridMaxWidth: '1100px',
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
    mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/ai-services.jpg`,
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
        heroImage: img('ai-powered-creative', 'Main%20Page%20Star.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/ai-powered-creative.jpg`,
        mobileObjectPosition: '75% 45%',
        videos: [
          { src: vid('ai-powered-creative', 'AI%20Video%20Production.mp4'), label: 'AI Video Production' },
          { src: vid('ai-powered-creative', 'Brand%20imagery.mp4'), label: 'Brand Imagery' },
          { src: vid('ai-powered-creative', 'Image%20enhancements.mp4'), label: 'Image Enhancements' },
          { src: vid('ai-powered-creative', 'Translation%20and%20transcreation.mp4'), label: 'Translation & Transcreation' },
        ],
        images: [
          { src: img('ai-powered-creative', 'Avatar%20and%20voice%20cloning.jpg'), label: 'Avatar & Voice Cloning' },
          { src: img('ai-powered-creative', 'Character%20development.jpg'), label: 'Character Development' },
          { src: img('ai-powered-creative', 'Product%20visuals.jpg'), label: 'Product Visuals' },
          { src: img('ai-powered-creative', 'Production%20at%20scale.jpg'), label: 'Production at Scale' },
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
        heroImage: img('automation', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/automation.jpg`,
        mobileObjectPosition: '65% 45%',
        videos: [
          { src: vid('automation', 'Motion%20and%20video%20automation.mp4'), label: 'Motion & Video Automation' },
        ],
        images: [
          { src: img('automation', 'AI-enhanced%20automation.jpg'), label: 'AI-Enhanced Automation' },
          { src: img('automation', 'Email%20templates.jpg'), label: 'Email Templates' },
          { src: img('automation', 'Print%20automation.jpg'), label: 'Print Automation' },
          { src: img('automation', 'production%20workflows.png'), label: 'Production Workflows' },
          { src: img('automation', 'Web%20templates.jpg'), label: 'Web Templates' },
        ],
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
    mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/consultant.jpg`,
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
        heroImage: img('campaign-strategy', 'main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/campaign-strategy.jpg`,
        mobileObjectPosition: '80% 35%',
        videos: [
          { src: vid('campaign-strategy', 'Campaign%20concepts.mp4'), label: 'Campaign Concepts' },
          { src: vid('campaign-strategy', 'Graphic%20design%20concepts.mp4'), label: 'Graphic Design Concepts' },
          { src: vid('campaign-strategy', 'Strategic%20storytelling.mp4'), label: 'Strategic Storytelling' },
        ],
        images: [
          { src: img('campaign-strategy', 'Ad%20copywriting.jpg'), label: 'Ad Copywriting' },
          { src: img('campaign-strategy', 'Creative%20strategy.jpg'), label: 'Creative Strategy' },
          { src: img('campaign-strategy', 'Storyboarding.jpg'), label: 'Storyboarding' },
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
        heroImage: img('finance-expert', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/finance-expert.jpg`,
        mobileObjectPosition: '60% 38%',
        videos: [],
        images: [
          { src: img('finance-expert', 'Cash%20Flow.jpg'), label: 'Cash Flow' },
          { src: img('finance-expert', 'Financial%20Health%20Assessment.jpg'), label: 'Financial Health Assessment' },
          { src: img('finance-expert', 'PandL%20Analysis.jpg'), label: 'P&L Analysis' },
        ],
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
        heroImage: img('business-strategist', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/business-strategist.jpg`,
        mobileObjectPosition: '55% 40%',
        videos: [],
        images: [
          { src: img('business-strategist', 'Cost%20Optimization.jpg'), label: 'Cost Optimization' },
          { src: img('business-strategist', 'Growth%20Strategy.jpg'), label: 'Growth Strategy' },
          { src: img('business-strategist', 'Investment%20Readiness.jpg'), label: 'Investment Readiness' },
        ],
      },
      {
        slug: 'debt-recovery',
        title: 'Debt Recovery',
        description: 'Turn distressed debt into recovered value.',
        longDescription: 'Recovery planning and financial stabilization for businesses under pressure. We diagnose the problem first. Then we fix it.',
        category: 'Consultant',
        categorySlug: 'consultant',
        accent: '#0A211F',
        bg: '#F2F4E7',
        heroImage: img('debt-recovery', 'Main%20Page.jpg'),
        mobileHeroImage: `${CDN}/image/upload/q_auto,f_auto/the-pivot/mobile/debt-recovery.jpg`,
        mobileObjectPosition: '60% 40%',
        videos: [],
        images: [
          { src: img('debt-recovery', 'Credit%20Management.jpg'), label: 'Credit Management' },
          { src: img('debt-recovery', 'Debt%20Collection.jpg'), label: 'Debt Collection' },
          { src: img('debt-recovery', 'Receivables%20Management.jpg'), label: 'Receivables Management' },
        ],
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
