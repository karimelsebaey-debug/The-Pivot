import { Navbar } from '@/components/nav/Navbar'
import { Footer } from '@/components/sections/Footer'
import { CaseStudyGrid, type CaseStudy } from '@/components/sections/CaseStudyGrid'
import { italicHeadingStyle } from '@/lib/inline-heading'

export const metadata = {
  title: 'Selected Work — THE PIVOT',
  description: 'A curated view of our best work across motion, branding, web, and AI.',
}

const CDN = 'https://res.cloudinary.com/dn21xgyhb'
const img = (path: string) => ({ url: `${CDN}/image/upload/${path}`, type: 'image' as const })
const vid = (path: string) => ({ url: `${CDN}/video/upload/${path}`, type: 'video' as const })

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'app-design',
    title: 'NEXUS',
    tags: 'Product Design, UX/UI',
    description: 'A mobile-first app experience for NEXUS Fit, designed to engage, convert, and scale.',
    main: img('v1784387146/the-pivot/card-grid/app_design/main-card.jpg'),
    gallery: [
      img('v1784387128/the-pivot/card-grid/app_design/1.jpg'),
      img('v1784387134/the-pivot/card-grid/app_design/2.jpg'),
      img('v1784387139/the-pivot/card-grid/app_design/3.jpg'),
      img('v1784387143/the-pivot/card-grid/app_design/4.jpg'),
    ],
  },
  {
    slug: 'fast-food',
    title: 'Crisp & Co Chicken',
    tags: 'Ad Creative, Social Media Creative',
    description: 'Bold, appetite-driving ad creative built for Crisp & Co Chicken.',
    main: img('v1784240791/the-pivot/card-grid/fast_food/main-card.jpg'),
    gallery: [
      img('v1784240783/the-pivot/card-grid/fast_food/1.jpg'),
      vid('v1784240785/the-pivot/card-grid/fast_food/2.mp4'),
      img('v1784240789/the-pivot/card-grid/fast_food/3.jpg'),
      img('v1784240790/the-pivot/card-grid/fast_food/4.jpg'),
    ],
  },
  {
    slug: 'illustration-design',
    title: 'BillBrain',
    tags: 'Illustration Design, Branding Services',
    description: 'Custom illustration systems that bring the BillBrain fintech brand to life.',
    main: img('v1784240801/the-pivot/card-grid/illustration-design/main-card.jpg'),
    gallery: [
      vid('v1784240794/the-pivot/card-grid/illustration-design/3.mp4'),
      img('v1784240793/the-pivot/card-grid/illustration-design/2.jpg'),
      img('v1784240792/the-pivot/card-grid/illustration-design/1.jpg'),
      img('v1784240795/the-pivot/card-grid/illustration-design/4.jpg'),
      img('v1784240796/the-pivot/card-grid/illustration-design/5.jpg'),
      img('v1784240798/the-pivot/card-grid/illustration-design/6.jpg'),
      img('v1784240799/the-pivot/card-grid/illustration-design/7.jpg'),
      img('v1784240800/the-pivot/card-grid/illustration-design/8.jpg'),
    ],
  },
  {
    slug: 'jewelry-brand',
    title: 'Luminaire',
    tags: 'Video Production',
    description: 'Elevated brand identity and video production for the Luminaire jewelry label.',
    main: img('v1784240810/the-pivot/card-grid/jewelry_brand/main-card.jpg'),
    gallery: [
      img('v1784240803/the-pivot/card-grid/jewelry_brand/1.jpg'),
      img('v1784240804/the-pivot/card-grid/jewelry_brand/2.jpg'),
      img('v1784240806/the-pivot/card-grid/jewelry_brand/3.jpg'),
      vid('v1784240808/the-pivot/card-grid/jewelry_brand/4.mp4'),
    ],
  },
  {
    slug: 'saas',
    title: 'Saas Pro',
    tags: 'Web Design, Product Design',
    description: 'Product design and web experience for the Saas Pro platform.',
    main: img('v1784240816/the-pivot/card-grid/saas/main-card.jpg'),
    gallery: [
      img('v1784240812/the-pivot/card-grid/saas/1.jpg'),
      img('v1784240813/the-pivot/card-grid/saas/2.jpg'),
      img('v1784240815/the-pivot/card-grid/saas/3.jpg'),
    ],
  },
  {
    slug: 'ugc-unboxing',
    title: 'Lumière Collection',
    tags: 'Video Production, Social Media Creative',
    description: 'Authentic unboxing content for the Lumière Collection, built for organic reach.',
    main: img('v1784288914/the-pivot/card-grid/ugc_unboxing/main-card.jpg'),
    gallery: [
      img('v1784240817/the-pivot/card-grid/ugc_unboxing/1.jpg'),
      vid('v1784288910/the-pivot/card-grid/ugc_unboxing/2.mp4'),
      img('v1784240820/the-pivot/card-grid/ugc_unboxing/3.jpg'),
      img('v1784240821/the-pivot/card-grid/ugc_unboxing/4.jpg'),
    ],
  },
  {
    slug: 'website',
    title: 'TOYOU',
    tags: 'Web Design',
    description: 'A modern, conversion-focused website for TOYOU.',
    main: img('v1784335021/the-pivot/card-grid/website/main-card.jpg'),
    gallery: [
      img('v1784335395/the-pivot/card-grid/website/1.jpg'),
      img('v1784335396/the-pivot/card-grid/website/2.jpg'),
      img('v1784335398/the-pivot/card-grid/website/3.jpg'),
      img('v1784335400/the-pivot/card-grid/website/4.jpg'),
    ],
    galleryAspects: ['4/3', '3/4', '3/4', '3/4'],
  },
  {
    slug: 'yogurt',
    title: 'Field & Forage',
    tags: 'Branding Services, Motion Design',
    description: 'Fresh brand identity and motion for the Field & Forage yogurt line.',
    main: img('v1784240833/the-pivot/card-grid/yogurt/main-card.jpg'),
    gallery: [
      vid('v1784240828/the-pivot/card-grid/yogurt/1.mp4'),
      img('v1784240830/the-pivot/card-grid/yogurt/2.jpg'),
      img('v1784240831/the-pivot/card-grid/yogurt/3.jpg'),
      img('v1784240832/the-pivot/card-grid/yogurt/4.jpg'),
    ],
  },
]

export default function SelectedWork() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', paddingTop: '120px' }}>
        <div style={{ maxWidth: '1216px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 64px)' }}>

          <h2 style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)',
            lineHeight: 1.3,
            letterSpacing: '-0.02em',
            color: 'var(--color-ink)',
            textAlign: 'center',
            maxWidth: '1100px',
            margin: '0 auto 4rem',
          }}>
            We help the world&apos;s leading brands create standout brands, websites, apps, and campaigns
            <br />
            <em style={italicHeadingStyle}>from strategy and design to motion, AI, and everything in between</em>
          </h2>

        </div>

        <CaseStudyGrid items={CASE_STUDIES} />
      </main>
      <Footer />
    </>
  )
}
