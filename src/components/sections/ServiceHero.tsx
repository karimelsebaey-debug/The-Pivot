'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

function ArrowUpRight({ size = 15, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" style={style}>
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
import type { ServiceItem } from '@/lib/services-data'

const HEADER_H = 56

export function ServiceHero({ service }: { service: ServiceItem }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isDark = service.bg === '#0A211F'

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.sh-cat',   { autoAlpha: 0, y: 10, duration: 0.6 }, 0.2)
      .from('.sh-title', { yPercent: 110, autoAlpha: 0, duration: 1.0 }, 0.35)
      .from('.sh-desc',  { autoAlpha: 0, y: 20, duration: 0.8 }, 0.6)
      .from('.sh-cta',   { autoAlpha: 0, y: 16, duration: 0.6 }, 0.75)
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="service-hero-section"
      style={{
        minHeight: '72dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: `${HEADER_H + 80}px clamp(24px,5vw,80px) 72px`,
        backgroundColor: service.bg,
        color: isDark ? service.accent : service.accent,
      }}
    >
      {/* Breadcrumb */}
      <p
        className="sh-cat text-sm font-semibold uppercase tracking-widest mb-8"
        style={{ letterSpacing: '0.14em', opacity: 0.55, color: isDark ? '#C9A84C' : '#0A211F' }}
      >
        <Link href={`/capabilities/${service.categorySlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
          {service.category}
        </Link>
        {' '}→ {service.title}
      </p>

      {/* Title curtain */}
      <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
        <h1
          className="sh-title"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9vw, 9rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: isDark ? '#F2F4E7' : '#0A211F',
          }}
        >
          {service.title}
        </h1>
      </div>

      {/* Long description */}
      <p
        className="sh-desc max-w-2xl text-xl leading-relaxed mb-12"
        style={{ opacity: 0.7, color: isDark ? '#F2F4E7' : '#0A211F' }}
      >
        {service.longDescription}
      </p>

      {/* CTAs */}
      <div className="sh-cta flex flex-wrap items-center gap-5">
        <Link
          href="/contact"
          className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105"
          style={{
            borderRadius: 'var(--radius-xl)',
            backgroundColor: isDark ? '#C9A84C' : '#0A211F',
            color: isDark ? '#0A211F' : '#F2F4E7',
            letterSpacing: '0.12em',
          }}
        >
          Start a Project
          <ArrowUpRight size={15} />
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-200"
          style={{ color: isDark ? '#F2F4E7' : '#0A211F', letterSpacing: '0.12em' }}
        >
          ← All Services
        </Link>
      </div>
    </section>
  )
}
