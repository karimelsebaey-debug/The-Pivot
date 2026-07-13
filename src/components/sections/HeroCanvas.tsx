'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { PillCTA } from '@/components/ui/PillCTA'
import { TextColor } from '@/components/ui/text-color'
import { HeroMobileDayCycle } from './HeroMobileDayCycle'

const HEADER_H = 56
const BG       = '#DADECF'

/* One frozen NYC corner, sunrise → night — 14s dissolve loop */
const HERO_VIDEO = 'https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/v1783926102/the-pivot/hero/hero-day-cycle.mp4'

export function HeroCanvas() {
  const sectionRef   = useRef<HTMLElement>(null)
  const mediaWrapRef = useRef<HTMLDivElement>(null)
  const line1Ref   = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef          = useRef<HTMLDivElement>(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useGSAP(() => {
    /* Entry animation */
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(line1Ref.current,   { opacity: 0, y: 30, duration: 1.1 })
      .from(subRef.current,     { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current,       { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
      .from(mediaWrapRef.current, { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100dvh', overflow: 'hidden', backgroundColor: BG }}
    >
      {/* ── Day-cycle media — sunrise → night, autoplay ── */}
      <div ref={mediaWrapRef} className="hero-canvas-el" style={{ position: 'absolute', inset: 0 }}>
        {isMobile ? (
          <HeroMobileDayCycle />
        ) : (
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '62% 16%',
              transform: 'scale(1.06) translate(-1%, 2%)',
            }}
          />
        )}
      </div>

      {/* Left scrim — subtle, image stays fully visible, just enough for text legibility */}
      <div aria-hidden className="hidden md:block" style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to right, rgba(10,33,31,0.5) 0%, rgba(10,33,31,0.3) 30%, rgba(10,33,31,0.1) 52%, transparent 68%)`,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Desktop text overlay ── */}
      <div
        className="hero-desktop-text hidden md:flex flex-col"
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '48%',
          padding: `${HEADER_H + 8}px clamp(24px, 3vw, 48px) clamp(36px, 5vh, 52px) clamp(32px, 4vw, 64px)`,
          zIndex: 3,
        }}
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>



          <h1 ref={line1Ref} style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5.6vw, 7rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '1.5rem',
            textShadow: '0 2px 5px rgba(10,33,31,0.9), 0 10px 34px rgba(10,33,31,0.55)',
          }}>
            <TextColor words={['The Turning', 'Point For Your', 'Creative Ambition.']} color="#FAF8F1" />
          </h1>

          <p ref={subRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: '-0.01em',
            maxWidth: '480px',
            color: 'rgba(250,248,241,0.95)',
            textShadow: '0 1px 4px rgba(10,33,31,0.9), 0 6px 22px rgba(10,33,31,0.5)',
          }}>
            We transform ambitious ideas and needs into visual presence,
            specialized services, and digital solutions —
            <br />
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-accent)' }}>
              built to last, impossible to ignore.
            </em>
          </p>

        </div>

        <div ref={ctaRef} style={{ display: 'flex', alignItems: 'center', gap: '28px', flexShrink: 0 }}>
          <PillCTA href="#work" label="See Our Work" />
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#FAF8F1',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              textShadow: '0 2px 12px rgba(10,33,31,0.4)',
            }}
            className="link-underline"
          >
            Start a Project <span style={{ color: 'var(--color-accent)' }}>→</span>
          </Link>
        </div>
      </div>

{/* ── Mobile: bottom scrim — image stays full-bleed, text floats on top ── */}
      <div
        aria-hidden
        className="md:hidden"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)',
          zIndex: 2,
        }}
      />

      {/* ── Mobile: text — bottom, floating over the image ── */}
      <div
        className="hero-mob-text md:hidden flex flex-col justify-end"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          padding: '20px clamp(20px, 5vw, 32px) clamp(32px, 6dvh, 56px)',
          zIndex: 3,
        }}
      >
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 8vw, 3rem)',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          color: '#FAF8F1',
          textShadow: '0 2px 5px rgba(10,33,31,0.9), 0 10px 34px rgba(10,33,31,0.55)',
          marginBottom: '0.75rem',
        }}>
          The Turning Point For Your{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Creative Ambition.</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: 'rgba(250,248,241,0.92)',
          textShadow: '0 1px 4px rgba(10,33,31,0.9), 0 6px 22px rgba(10,33,31,0.5)',
          marginBottom: '1.25rem',
        }}>
          We transform ambitious ideas into visual presence and digital
          solutions —{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 700, color: 'var(--color-accent)' }}>built to last, impossible to ignore.</em>
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <PillCTA href="#work" label="See Our Work" />
        </div>
      </div>

    </section>
  )
}
