'use client'

import Link from 'next/link'
import { SERVICE_CATEGORIES } from '@/lib/services-data'

/* ─── Icons (inline SVG — superside style) ─── */
function IconTarget() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" /><circle cx="10" cy="10" r="4" /><circle cx="10" cy="10" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconPlay() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" /><polygon points="8,7 14,10 8,13" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconStar() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M10 2l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
    </svg>
  )
}
function IconChat() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M3 4h14v10H3z" /><path d="M7 18l3-4h7" />
    </svg>
  )
}
function IconPen() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" /><path d="M10 7v6M7 10h6" />
    </svg>
  )
}
function IconGraph() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <rect x="2" y="2" width="16" height="16" rx="2" /><path d="M6 14l3-4 3 2 3-6" />
    </svg>
  )
}
function IconBolt() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="10" cy="10" r="8" /><path d="M11 4l-3 7h5l-3 5" />
    </svg>
  )
}
function IconGrid() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <rect x="2" y="2" width="7" height="7" /><rect x="11" y="2" width="7" height="7" /><rect x="2" y="11" width="7" height="7" /><rect x="11" y="11" width="7" height="7" />
    </svg>
  )
}
function IconMail() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <rect x="2" y="5" width="16" height="12" rx="1" /><path d="M2 5l8 7 8-7" />
    </svg>
  )
}
function IconPhone() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <rect x="5" y="2" width="10" height="16" rx="2" /><circle cx="10" cy="15" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  )
}
function IconLayers() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M2 10l8-6 8 6-8 6z" /><path d="M2 14l8 6 8-6" />
    </svg>
  )
}
function IconCursor() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <path d="M4 4l12 7-6 1-3 6z" />
    </svg>
  )
}

/* ─── Dropdown-specific icon and description maps ─── */
const ICON_MAP: Record<string, React.ReactNode> = {
  'motion-design':         <IconBolt />,
  'email-creation':        <IconMail />,
  'web-design':            <IconCursor />,
  'copywriting':           <IconPen />,
  'design-systems':        <IconGrid />,
  'product-design':        <IconPhone />,
  'ad-creative':           <IconTarget />,
  'social-media-creative': <IconGraph />,
  'presentation-design':   <IconGrid />,
  'illustration-design':   <IconPen />,
  'branding-services':     <IconStar />,
  'concept-creation':      <IconBolt />,
  'ai-powered-creative':   <IconStar />,
  'automation':            <IconBolt />,
  'campaign-strategy':     <IconTarget />,
  'finance-expert':        <IconGraph />,
  'business-strategist':   <IconBolt />,
  'early-stage-recovery':  <IconChat />,
}

const DESC_MAP: Record<string, string> = {
  'motion-design':         'Animated social ads · Explainer animations · UI micro-animations',
  'email-creation':        'Email templates · Sequences · Newsletter design',
  'web-design':            'Portfolio · Landing page · E-commerce design',
  'copywriting':           'Ad copy · Web & landing page copy · SEO blog articles',
  'design-systems':        'Design token system · Component library · UI kit',
  'product-design':        'UX/UI design · Prototypes · MVP design',
  'ad-creative':           'Static ads · Motion ads · Ad copy & hooks',
  'social-media-creative': 'Organic content · Paid social ads · Campaign concepts',
  'presentation-design':   'Custom decks · Templates · Infographics',
  'illustration-design':   'Brand illustrations · Iconography · Storyboarding',
  'branding-services':     'Logo design · Brand identity kit · Guidelines',
  'concept-creation':      'Campaign concepts · Big ideas · Creative briefs',
  'ai-powered-creative':   'Brand image library · AI character development · Key art',
  'automation':            'Content automation · Reporting pipelines · Repurposing',
  'campaign-strategy':     'Creative strategy · Campaign concepts · Multi-channel',
  'finance-expert':        'P&L analysis · Cash flow · Financial health assessment',
  'business-strategist':   'Growth strategy · Investment readiness · Cost optimization',
  'early-stage-recovery':  'Distressed debt · Recovery planning · Stabilization',
}

const COL_STYLE: Record<string, { bg: string; color: string }> = {
  'specialized-production': { bg: '#0A211F', color: '#F7F9F2' },
  'creative-design':        { bg: '#1A4A40', color: '#F7F9F2' },
  'ai-services':            { bg: '#8FCCA8', color: '#0A211F' },
  'consultant':             { bg: '#A8885A', color: '#0A211F' },
}

const COLUMNS = SERVICE_CATEGORIES.map(cat => ({
  label:    cat.title,
  href:     `/capabilities/${cat.slug}`,
  bg:       COL_STYLE[cat.slug]?.bg    ?? '#0A211F',
  color:    COL_STYLE[cat.slug]?.color ?? '#F7F9F2',
  services: cat.items.map(item => ({
    slug: item.slug,
    name: item.title,
    desc: DESC_MAP[item.slug] ?? item.description,
    icon: ICON_MAP[item.slug],
  })),
}))

interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export function MegaDropdown({ onMouseEnter, onMouseLeave }: Props) {
  return (
    <div
      className="fixed left-0 right-0 z-40"
      style={{
        top: 'var(--header-height)',
        animation: 'slideDownAppearing 0.2s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        style={{
          backgroundColor: 'var(--color-bg)',
          borderBottom: '1px solid var(--color-border)',
          boxShadow: '0 32px 64px rgba(10,33,31,0.10)',
          maxHeight: 'calc(100vh - var(--header-height))',
          overflowY: 'auto',
        }}
      >
        <div
          className="grid grid-cols-4"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
          {COLUMNS.map((col) => (
            <div
              key={col.label}
              style={{
                padding: '4px 16px 12px',
                borderRight: '1px solid var(--color-border)',
              }}
              className="last:border-r-0"
            >
              {/* Category header pill */}
              <Link
                href={col.href}
                className="pill-tag mb-3"
                style={{
                  backgroundColor: col.bg,
                  color: col.color,
                  borderColor: 'transparent',
                  fontFamily: 'var(--font-body)',
                  fontStyle: 'normal',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  padding: '6px 14px',
                  whiteSpace: 'nowrap',
                }}
              >
                {col.label}
                <span className="pill-arrow">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" style={{ flexShrink: 0 }}>
                    <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>

              {/* Service list */}
              <ul>
                {col.services.map((service, i) => (
                  <li key={service.name}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="dropdown-row"
                      style={{ borderTop: i === 0 ? 'none' : '1px solid var(--color-border)' }}
                    >
                      <div>
                        <p className="dropdown-row-title">{service.name}</p>
                        <p className="dropdown-row-desc">{service.desc}</p>
                      </div>
                      <span className="dropdown-row-icon" style={{ width: 16, height: 16 }}>{service.icon}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
