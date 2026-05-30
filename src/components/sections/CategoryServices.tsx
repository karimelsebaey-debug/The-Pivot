'use client'

import Link from 'next/link'
import { useRef, type CSSProperties } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceCategory } from '@/lib/services-data'

function ArrowUpRight({ size = 20, style, className }: { size?: number; style?: CSSProperties; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" style={style} className={className}>
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CategoryServices({ category }: { category: ServiceCategory }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isDark = category.bg === '#0A211F'

  const textColor   = isDark ? '#F2F4E7' : '#0A211F'
  const mutedColor  = isDark ? 'rgba(242,244,231,0.55)' : 'rgba(10,33,31,0.55)'
  const borderColor = isDark ? 'rgba(242,244,231,0.12)' : 'rgba(10,33,31,0.10)'
  const cardBg      = isDark ? 'rgba(242,244,231,0.04)' : '#ffffff'

  useGSAP(() => {
    gsap.from('.cs-card', {
      autoAlpha: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: category.bg,
        padding: '80px clamp(24px,5vw,80px) 120px',
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      <p
        className="text-sm font-semibold uppercase tracking-widest mb-12"
        style={{ letterSpacing: '0.14em', color: mutedColor }}
      >
        {category.items.length} Services
      </p>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '1.5px', border: `1px solid ${borderColor}` }}
      >
        {category.items.map((item) => (
          <Link
            key={item.slug}
            href={`/capabilities/${item.slug}`}
            className="cs-card group block"
            style={{
              backgroundColor: cardBg,
              padding: '40px 36px',
              borderRight: `1px solid ${borderColor}`,
              borderBottom: `1px solid ${borderColor}`,
              transition: 'background-color 0.25s ease',
              textDecoration: 'none',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = isDark
                ? 'rgba(216,255,133,0.07)'
                : 'rgba(10,33,31,0.04)'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.backgroundColor = cardBg
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: textColor,
                }}
              >
                {item.title}
              </h2>
              <ArrowUpRight
                size={20}
                style={{
                  color: isDark ? '#C9A84C' : '#0A211F',
                  flexShrink: 0,
                  marginTop: 4,
                  transition: 'transform 0.2s ease',
                }}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </div>
            <p style={{ color: mutedColor, fontSize: '0.95rem', lineHeight: 1.6 }}>
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
