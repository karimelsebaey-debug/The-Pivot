'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { PillCTA } from '@/components/ui/PillCTA'

export function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const headRef   = useRef<HTMLDivElement>(null)
  const ctaRef    = useRef<HTMLDivElement>(null)
  const barRef    = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const lines = headRef.current!.querySelectorAll('.line-inner')

    gsap.from(lines, {
      scrollTrigger: {
        trigger: headRef.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
      yPercent: 110,
      opacity: 0,
      stagger: 0.13,
      duration: 1.15,
      ease: 'power4.out',
    })

    gsap.from(ctaRef.current, {
      scrollTrigger: {
        trigger: ctaRef.current,
        start: 'top 88%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 22,
      duration: 0.9,
      ease: 'power3.out',
    })

    gsap.from(barRef.current, {
      scrollTrigger: {
        trigger: barRef.current,
        start: 'top 98%',
        toggleActions: 'play none none none',
      },
      opacity: 0,
      y: 12,
      duration: 0.7,
      ease: 'power2.out',
    })

  }, { scope: footerRef })

  return (
    <footer
      ref={footerRef}
      style={{
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-ink)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(80px,12vh,140px) clamp(24px,5vw,88px) clamp(40px,5vh,56px)',
      }}
    >
      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.63rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'var(--color-ink)',
            marginBottom: 'clamp(20px,3.5vh,44px)',
          }}
        >
          Ready to pivot?
        </p>

        <div ref={headRef} style={{ marginBottom: 'clamp(48px,7vh,80px)' }}>
          <div style={{ overflow: 'hidden', paddingBottom: '0.22em', marginBottom: '-0.22em' }}>
            <div
              className="line-inner"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem,8vw,10.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
              }}
            >
              Start your
            </div>
          </div>

          <div style={{ overflow: 'hidden', paddingBottom: '0.28em', marginBottom: '-0.28em' }}>
            <div
              className="line-inner"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3.2rem,8vw,10.5rem)',
                lineHeight: 1.0,
                letterSpacing: '-0.03em',
                fontStyle: 'italic',
                color: 'var(--color-ink)',
              }}
            >
              turning point.
            </div>
          </div>
        </div>

        <div ref={ctaRef}>
          <PillCTA href="/contact" label="Get in Touch" />
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div
        ref={barRef}
        style={{
          borderTop: '1px solid rgba(10,33,31,0.12)',
          paddingTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <Image
          src="/logo.png"
          alt="The Pivot"
          width={64}
          height={64}
          style={{ mixBlendMode: 'multiply' }}
        />

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {[
            { label: 'Capabilities', href: '/capabilities/specialized-production' },
            { label: 'Selected Work', href: '/selected-work' },
            { label: 'Perspectives', href: '/perspectives' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.78rem',
                color: 'rgba(10,33,31,0.45)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--color-ink)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(10,33,31,0.45)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p
          style={{
            fontFamily: 'var(--font-mono, monospace)',
            fontSize: '0.62rem',
            color: 'rgba(10,33,31,0.65)',
            letterSpacing: '0.04em',
          }}
        >
          © {new Date().getFullYear()} The Pivot. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
