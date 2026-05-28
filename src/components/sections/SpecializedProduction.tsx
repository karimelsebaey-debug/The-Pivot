'use client'

import Link from 'next/link'
import type { CSSProperties } from 'react'

function ArrowUpRight({ size = 15, style, className }: { size?: number; style?: CSSProperties; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" style={style} className={className}>
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SpecializedProduction() {
  return (
    <section
      className="flex flex-col justify-between"
      style={{
        minHeight: '100vh',
        padding: 'calc(var(--header-height) + 80px) var(--container-px) 80px',
        backgroundColor: 'var(--color-dark-bg)',
        color: 'var(--color-bg)',
      }}
    >
      <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: '45vw' }}>

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 6.5vw, 8.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: 'var(--color-bg)',
            marginBottom: '1.5rem',
          }}
        >
          <span className="block">Where Ideas</span>
          <span className="block italic">Become Presence</span>
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.65rem',
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: '-0.01em',
            color: 'var(--color-bg)',
            opacity: 0.8,
            marginBottom: '4rem',
          }}
        >
          Scale fast with{' '}
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.8rem' }}>
            20+ creative services
          </em>{' '}
          engineered to{' '}
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.65rem' }}>
            accelerate growth
          </em>{' '}
          and maximize your revenue.
        </p>
        </div>

        <div>
          <Link href="/contact" className="cta-pill">
            <span className="cta-pill-label" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}>
              Get Started
            </span>
            <div className="cta-pill-icon" style={{ backgroundColor: 'var(--color-accent)', color: 'var(--color-ink)' }}>
              <ArrowUpRight className="arr-out" size={15} />
              <ArrowUpRight className="arr-in" size={15} />
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
