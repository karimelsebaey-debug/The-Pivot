'use client'

import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceCategory } from '@/lib/services-data'

export function CategoryHero({ category }: { category: ServiceCategory }) {
  const sectionRef = useRef<HTMLElement>(null)
  const hasImage   = !!category.heroImage
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from('.ch-label', { autoAlpha: 0, y: 10, duration: 0.6 }, 0.2)
      .from('.ch-title', { yPercent: 110, autoAlpha: 0, duration: 1.0 }, 0.35)
      .from('.ch-desc',  { autoAlpha: 0, y: 20, duration: 0.8 }, 0.6)
      .from('.ch-cta',   { autoAlpha: 0, y: 16, duration: 0.6 }, 0.75)
  }, { scope: sectionRef })

  const mobileGradient = isMobile
    ? 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)'
    : [
        'linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 70%)',
        'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 45%)',
      ].join(', ')

  const contentStyle: CSSProperties = isMobile
    ? { position: 'relative', zIndex: 2, maxWidth: '100%', padding: '0 clamp(20px, 5vw, 32px) clamp(40px, 6dvh, 64px)' }
    : { position: 'relative', zIndex: 2, maxWidth: 'clamp(320px, 48%, 680px)' }

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isMobile ? 'flex-end' : 'center',
        padding: isMobile ? 0 : `0 clamp(24px, 5vw, 80px)`,
        backgroundColor: category.bg,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {hasImage && (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src={isMobile && category.mobileHeroImage ? category.mobileHeroImage : category.heroImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: isMobile ? 'center' : 'center right',
              zIndex: 0,
            }}
          />
          <div
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              background: mobileGradient,
              zIndex: 1,
            }}
          />
        </div>
      )}

      <div style={contentStyle}>
        <div className="ch-label" style={{ marginBottom: '1.5rem' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 12px', borderRadius: 999,
              border: '1px solid rgba(201,168,76,0.55)',
              color: '#A8885A',
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            All Services
          </Link>
        </div>

        <div style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
          <h1
            className="ch-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 8rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              color: '#F2F4E7',
              paddingBottom: '0.15em',
            }}
          >
            {category.title}
          </h1>
        </div>

        <p
          className="ch-desc text-lg leading-relaxed"
          style={{ color: '#F2F4E7', opacity: 0.75, maxWidth: '42ch', marginBottom: '48px' }}
        >
          {category.description}
        </p>

        <div className="ch-cta">
          <Link
            href="/contact"
            style={{
              display: isMobile ? 'block' : 'inline-block',
              width: isMobile ? '100%' : 'auto',
              textAlign: 'center',
              backgroundColor: 'var(--color-accent)',
              color: '#0A211F',
              borderRadius: '999px',
              padding: isMobile ? '12px 20px' : '10px 16px',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  )
}
