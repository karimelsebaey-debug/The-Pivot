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

        <div ref={ctaRef} style={{ marginBottom: 'clamp(64px,10vh,120px)' }}>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              backgroundColor: 'var(--color-accent)',
              color: '#0A211F',
              borderRadius: '999px',
              padding: '10px 16px',
              fontSize: '0.9rem',
              fontWeight: 500,
              letterSpacing: '0.01em',
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      {/* ── Bottom bar — Superside style ── */}
      <div
        ref={barRef}
        style={{
          backgroundColor: 'var(--color-dark-bg)',
          margin: '0 calc(-1 * clamp(24px,5vw,88px)) calc(-1 * clamp(40px,5vh,56px))',
          padding: '20px clamp(24px,5vw,88px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* Left: logo */}
        <div style={{ width: '100%', marginBottom: 16 }}>
          <Image
            src="/logo.png"
            alt="The Pivot"
            width={100}
            height={100}
            style={{ filter: 'brightness(0) invert(1)', opacity: 0.85 }}
          />
        </div>

        {/* Bottom row: copyright + nav + icons */}
        <div style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          borderTop: '1px solid rgba(242,244,231,0.08)',
          paddingTop: 16,
        }}>
          {/* Copyright */}
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            color: 'rgba(242,244,231,0.4)',
            letterSpacing: '0.01em',
          }}>
            © {new Date().getFullYear()} The Pivot. All rights reserved.
          </span>

          {/* Nav links */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 24 }}>
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
                  fontSize: '0.9rem',
                  color: 'rgba(242,244,231,0.5)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  textDecorationColor: 'rgba(242,244,231,0.2)',
                  transition: 'color 0.2s ease, text-decoration-color 0.2s ease',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = '#F2F4E7'
                  el.style.textDecorationColor = 'rgba(242,244,231,0.6)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'rgba(242,244,231,0.5)'
                  el.style.textDecorationColor = 'rgba(242,244,231,0.2)'
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social icons */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          {[
            { label: 'LinkedIn',  href: 'https://linkedin.com',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
            { label: 'Facebook',  href: 'https://facebook.com',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
            { label: 'Instagram', href: 'https://instagram.com', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
            { label: 'YouTube',   href: 'https://youtube.com',   icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/></svg> },
            { label: 'TikTok',    href: 'https://tiktok.com',    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
          ].map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="footer-social-icon"
              style={{
                border: '1px solid rgba(242,244,231,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(242,244,231,0.55)',
                transition: 'border-color 0.2s ease, color 0.2s ease',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(242,244,231,0.8)'
                el.style.color = '#F2F4E7'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(242,244,231,0.25)'
                el.style.color = 'rgba(242,244,231,0.55)'
              }}
            >
              {icon}
            </a>
          ))}
          </div>

        </div>{/* end bottom row */}
      </div>{/* end barRef */}
    </footer>
  )
}
