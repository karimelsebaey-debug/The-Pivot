'use client'

import Link from 'next/link'

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

/* ─── Column Data — order & sub-services from services_table.xlsx ─── */
const COLUMNS = [
  {
    label: 'Specialized production',
    href: '/capabilities/specialized-production',
    bg: '#0A211F',
    color: '#F7F9F2',
    services: [
      { slug: 'motion-design',    name: 'Motion Design',    desc: 'Animated social ads · Explainer animations · UI micro-animations', icon: <IconBolt /> },
      { slug: 'email-creation',   name: 'Email Creation',   desc: 'Email templates · Sequences · Newsletter design', icon: <IconMail /> },
      { slug: 'web-design',       name: 'Web Design',       desc: 'Portfolio · Landing page · E-commerce design', icon: <IconCursor /> },
      { slug: 'copywriting',      name: 'Copywriting',      desc: 'Ad copy · Web & landing page copy · SEO blog articles', icon: <IconPen /> },
      { slug: 'design-systems',   name: 'Design Systems',   desc: 'Design token system · Component library · UI kit', icon: <IconGrid /> },
      { slug: 'product-design',   name: 'Product Design',   desc: 'UX/UI design · Prototypes · MVP design', icon: <IconPhone /> },
    ],
  },
  {
    label: 'Creative design',
    href: '/capabilities/creative-design',
    bg: '#1A4A40',
    color: '#F7F9F2',
    services: [
      { slug: 'ad-creative',            name: 'Ad Creative',            desc: 'Static ads · Motion ads · Ad copy & hooks', icon: <IconTarget /> },
      { slug: 'social-media-creative',  name: 'Social Media Creative',  desc: 'Organic content · Paid social ads · Campaign concepts', icon: <IconGraph /> },
      { slug: 'presentation-design',    name: 'Presentation Design',    desc: 'Custom decks · Templates · Infographics', icon: <IconGrid /> },
      { slug: 'illustration-design',    name: 'Illustration Design',    desc: 'Brand illustrations · Iconography · Storyboarding', icon: <IconPen /> },
      { slug: 'branding-services',      name: 'Branding Services',      desc: 'Logo design · Brand identity kit · Guidelines', icon: <IconStar /> },
      { slug: 'concept-creation',       name: 'Concept Creation',       desc: 'Campaign concepts · Big ideas · Creative briefs', icon: <IconBolt /> },
    ],
  },
  {
    label: 'AI services',
    href: '/capabilities/ai-services',
    bg: '#8FCCA8',
    color: '#0A211F',
    services: [
      { slug: 'ai-powered-creative', name: 'AI-Powered Creative', desc: 'Brand image library · AI character development · Key art', icon: <IconStar /> },
      { slug: 'ai-consulting',       name: 'AI Consulting',       desc: 'AI tool stack audit · Workflow redesign · Team training', icon: <IconChat /> },
      { slug: 'automation',          name: 'Automation',          desc: 'Content automation · Reporting pipelines · Repurposing', icon: <IconBolt /> },
      { slug: 'data-services',       name: 'Data Services',       desc: 'Data visualization · AI data analysis · Performance reports', icon: <IconGraph /> },
    ],
  },
  {
    label: 'Consultant',
    href: '/capabilities/consultant',
    bg: '#C9A84C',
    color: '#0A211F',
    services: [
      { slug: 'campaign-strategy',    name: 'Campaign Strategy',    desc: 'Creative strategy · Campaign concepts · Multi-channel', icon: <IconTarget /> },
      { slug: 'finance-expert',       name: 'Finance Expert',       desc: 'P&L analysis · Cash flow · Financial health assessment', icon: <IconGraph /> },
      { slug: 'business-strategist',  name: 'Business Strategist',  desc: 'Growth strategy · Investment readiness · Cost optimization', icon: <IconBolt /> },
      { slug: 'pl-expert',            name: 'P&L Expert',           desc: 'Revenue stream analysis · Margin optimization', icon: <IconLayers /> },
      { slug: 'early-stage-recovery', name: 'Early Stage Recovery', desc: 'Pre-legal collection · Payment negotiation strategy', icon: <IconChat /> },
      { slug: 'write-off-recovery',   name: 'Write-off Recovery',   desc: 'Vintage portfolio management · Written-off account strategy', icon: <IconStar /> },
    ],
  },
]

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
