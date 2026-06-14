'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceItem } from '@/lib/services-data'

function ArrowUpRight({ size = 15, style }: { size?: number; style?: CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" style={style}>
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ServiceHero({ service }: { service: ServiceItem }) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasImage   = !!service.heroImage

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
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: `0 clamp(24px, 5vw, 80px)`,
        backgroundColor: service.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {hasImage && (
        <>
          <img
            src={service.heroImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center right',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: [
                'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
                'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 35%)',
              ].join(', '),
              zIndex: 1,
            }}
          />
        </>
      )}

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 'clamp(320px, 48%, 680px)' }}>
        <p
          className="sh-cat text-sm font-semibold uppercase tracking-widest mb-6"
          style={{ letterSpacing: '0.18em', color: '#C9A84C', opacity: 0.8 }}
        >
          <Link href={`/capabilities/${service.categorySlug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
            {service.category}
          </Link>
          {' '}→ {service.title}
        </p>

        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <h1
            className="sh-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#F2F4E7',
            }}
          >
            {service.title}
          </h1>
        </div>

        <p
          className="sh-desc text-lg leading-relaxed mb-10"
          style={{ color: '#F2F4E7', opacity: 0.75, maxWidth: '42ch' }}
        >
          {service.longDescription}
        </p>

        <div className="sh-cta flex flex-wrap items-center gap-5">
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:scale-105"
            style={{
              borderRadius: 'var(--radius-xl)',
              backgroundColor: '#C9A84C',
              color: '#0A211F',
              letterSpacing: '0.12em',
            }}
          >
            Start a Project
            <ArrowUpRight size={15} />
          </Link>
          <Link
            href={`/capabilities/${service.categorySlug}`}
            className="text-sm font-semibold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity duration-200"
            style={{ color: '#F2F4E7', letterSpacing: '0.12em' }}
          >
            ← All Services
          </Link>
        </div>
      </div>
    </section>
  )
}
