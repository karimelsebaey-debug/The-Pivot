'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PillCTA } from '@/components/ui/PillCTA'
import { TextColor } from '@/components/ui/text-color'

const TOTAL    = 30
const HEADER_H = 56
const BG       = '#DADECF'

const frameSrc = (i: number) =>
  `https://res.cloudinary.com/dn21xgyhb/image/upload/q_auto,f_auto/the-pivot/frames-hero/frame_${String(i).padStart(3, '0')}.jpg`

export function HeroCanvas() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const line1Ref   = useRef<HTMLHeadingElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef          = useRef<HTMLDivElement>(null)
  const eyebrowRef      = useRef<HTMLParagraphElement>(null)
  const scrollIndRef    = useRef<HTMLDivElement>(null)

  const imgs     = useRef<HTMLImageElement[]>([])
  const frameIdx = useRef(0)
  const logical  = useRef({ w: 0, h: 0 })

  const [loadProgress, setLoadProgress] = useState(0)
  const [loaded, setLoaded] = useState(false)

  /* ── Preload all frames with progress ── */
  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = Array.from({ length: TOTAL }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      const onDone = () => {
        loadedCount++
        setLoadProgress(loadedCount / TOTAL)
        if (loadedCount === TOTAL) setLoaded(true)
        if (i === 0 && img.complete && img.naturalWidth > 0) drawFrame(0)
      }
      img.onload = onDone
      img.onerror = onDone
      return img
    })
    imgs.current = images
  }, [])

  function drawFrame(idx: number) {
    const canvas = canvasRef.current
    const img    = imgs.current[idx]
    if (!canvas || !img?.complete) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const { w, h } = logical.current
    if (!w || !h) return

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)

    /* Desktop: use full height minus header.
       Mobile: building fills top 60%, text panel takes bottom 40%. */
    const isMob  = w < 768
    const availH = isMob ? h * 0.60 - HEADER_H : h - HEADER_H
    const scaleW = w / img.naturalWidth
    const scaleH = availH / img.naturalHeight
    // Mobile: height-driven — fills exactly top 60%, no gap, no overflow
    const scale  = isMob ? scaleH : Math.min(scaleW, scaleH)

    const dw = Math.round(img.naturalWidth  * scale)
    const dh = Math.round(img.naturalHeight * scale)
    const dx = Math.round((w - dw) / 2) - (isMob ? Math.round(w * 0.20) : 0)
    const dy = isMob
      ? HEADER_H
      : Math.round(HEADER_H + (availH - dh) / 2)

    ctx.drawImage(img, dx, dy, dw, dh)
  }

  function resizeCanvas() {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr  = window.devicePixelRatio || 1
    logical.current = { w: rect.width, h: rect.height }
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
    drawFrame(frameIdx.current)
  }

  useGSAP(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas, { passive: true })

    /* Entry animation */
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.8 })
      .from(line1Ref.current,   { opacity: 0, y: 30, duration: 1.1 }, '-=0.5')
      .from(subRef.current,     { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current,       { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
      .from(scrollIndRef.current, { opacity: 0, y: 12, duration: 0.8 }, '-=0.2')

    /* Canvas entry: desktop only — mobile hidden via CSS .hero-canvas-el, revealed on scroll */
    if (window.innerWidth >= 768) {
      tl.from(canvasRef.current, { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)
    }

    /* Scroll-driven frame scrub */
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=280%',
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const fi = Math.min(Math.round(self.progress * (TOTAL - 1)), TOTAL - 1)
        if (fi !== frameIdx.current) {
          frameIdx.current = fi
          drawFrame(fi)
        }
        /* Mobile: building fades in as user scrolls (fully visible at 25% progress) */
        if (window.innerWidth < 768 && canvasRef.current) {
          canvasRef.current.style.opacity = String(Math.min(self.progress * 4, 1))
        }
      },
    })

    return () => window.removeEventListener('resize', resizeCanvas)
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: '100vh', overflow: 'hidden', backgroundColor: BG }}
    >
      {/* ── Loading bar ── */}
      {!loaded && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          width: `${loadProgress * 100}%`,
          backgroundColor: 'var(--color-accent)',
          zIndex: 10,
          transition: 'width 0.1s linear',
          pointerEvents: 'none',
        }} />
      )}

      {/* ── Canvas — scroll-driven 000→119 ── */}
      <canvas
        ref={canvasRef}
        className="hero-canvas-el"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />

      {/* Left gradient — text readability on desktop */}
      <div aria-hidden className="hidden md:block" style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to right, ${BG} 0%, ${BG} 32%, rgba(218,222,207,0.88) 46%, rgba(218,222,207,0.4) 58%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Right gradient — blends frame sky into page BG */}
      <div aria-hidden style={{
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to left, ${BG} 0%, rgba(218,222,207,0.7) 15%, transparent 35%)`,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* ── Desktop text overlay ── */}
      <div
        className="hidden md:flex flex-col"
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
            color: 'var(--color-ink)',
            marginBottom: '1.5rem',
          }}>
            <TextColor words={['The Turning', 'Point For Your', 'Creative Ambition.']} />
          </h1>

          <p ref={subRef} style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            fontWeight: 400,
            lineHeight: 1.7,
            letterSpacing: '-0.01em',
            maxWidth: '480px',
            background: 'linear-gradient(to right, #082010 0%, #173F35 50%, #546D5D 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            We transform ambitious ideas and needs into visual presence,
            specialized services, and digital solutions —
            <br />
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700, fontSize: '1.3rem' }}>
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
              color: '#A8885A',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
            }}
            className="link-underline"
          >
            Start a Project →
          </Link>
        </div>
      </div>

{/* ── Mobile: text panel — bottom 45% (always visible) ── */}
      <div
        className="md:hidden flex flex-col justify-center"
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '40%',
          backgroundColor: BG,
          padding: '20px clamp(20px, 5vw, 32px) 32px',
          zIndex: 3,
        }}
      >
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 8vw, 3rem)',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          color: 'var(--color-accent)',
          marginBottom: '0.75rem',
        }}>
          The Turning Point For Your{' '}
          <em style={{ fontStyle: 'italic' }}>Creative Ambition.</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.88rem',
          lineHeight: 1.65,
          color: 'var(--color-ink)',
          opacity: 0.65,
          marginBottom: '1.25rem',
        }}>
          We transform ambitious ideas into visual presence and digital
          solutions —{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 700 }}>built to last, impossible to ignore.</em>
        </p>
        <PillCTA href="#work" label="See Our Work" />
      </div>

      {/* ── Mobile: scroll indicator — left of building area ── */}
      <div
        aria-hidden
        className="md:hidden flex flex-col items-center"
        style={{
          position: 'absolute',
          left: 14,
          top: '28%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          pointerEvents: 'none',
          gap: 0,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.52rem',
          fontWeight: 600,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
          opacity: 0.42,
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          marginBottom: 14,
          lineHeight: 1,
        }}>
          Scroll Down to Pivot
        </p>
        <div style={{
          width: '1px',
          height: '52px',
          background: `linear-gradient(to bottom, var(--color-ink), transparent)`,
          opacity: 0.28,
          transformOrigin: 'top',
          animation: 'scroll-line-draw 1.2s ease-out forwards',
          marginBottom: 6,
        }} />
        <svg
          width="22" height="36" viewBox="0 0 26 42" fill="none"
          style={{ animation: 'mouse-body-scroll 2s ease-in-out infinite', opacity: 0.65 }}
        >
          <rect x="1" y="1" width="24" height="40" rx="12" fill="rgba(10,33,31,0.08)" />
          <rect x="1" y="1" width="24" height="40" rx="12"
            stroke="rgba(10,33,31,0.38)" strokeWidth="1.2" fill="none" />
          <circle cx="13" cy="11" r="3" fill="rgba(10,33,31,0.4)"
            style={{ animation: 'mouse-dot-scroll 2s ease-in-out infinite' }} />
        </svg>
      </div>

      {/* ── Scroll indicator — desktop only ── */}
      <div
        ref={scrollIndRef}
        aria-hidden
        className="hidden md:flex"
        style={{
          position: 'absolute',
          left: 'calc(44% + 16px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 4,
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Vertical label */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          fontWeight: 600,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--color-ink)',
          opacity: 0.45,
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          marginBottom: '14px',
          lineHeight: 1,
        }}>
          Scroll Down to Pivot
        </p>

        {/* Animated line */}
        <div style={{
          width: '1px',
          height: '52px',
          background: `linear-gradient(to bottom, var(--color-ink), transparent)`,
          opacity: 0.3,
          transformOrigin: 'top',
          animation: 'scroll-line-draw 1.2s ease-out forwards',
          marginBottom: '6px',
        }} />

        {/* Mouse scroll icon — elegant 3D */}
        <svg
          width="24" height="42" viewBox="0 0 24 42" fill="none"
          style={{
            animation: 'mouse-body-scroll 2s ease-in-out infinite',
            filter: 'drop-shadow(0 5px 12px rgba(10,33,31,0.28)) drop-shadow(0 1px 3px rgba(10,33,31,0.18))',
          }}
        >
          <defs>
            {/* Side-lit metal — bright left rim, mid surface, dark right */}
            <linearGradient id="em-body" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.62)" />
              <stop offset="10%"  stopColor="rgba(10,33,31,0.10)" />
              <stop offset="40%"  stopColor="rgba(10,33,31,0.26)" />
              <stop offset="72%"  stopColor="rgba(10,33,31,0.52)" />
              <stop offset="100%" stopColor="rgba(10,33,31,0.78)" />
            </linearGradient>
            {/* Top-to-bottom depth */}
            <linearGradient id="em-depth" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.20)" />
              <stop offset="35%"  stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.20)" />
            </linearGradient>
            {/* Top-left specular capsule */}
            <radialGradient id="em-spec" cx="26%" cy="16%" r="36%">
              <stop offset="0%"   stopColor="rgba(255,255,255,0.80)" />
              <stop offset="60%"  stopColor="rgba(255,255,255,0.10)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            {/* Gold button-split accent */}
            <linearGradient id="em-gold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="rgba(184,148,60,0)" />
              <stop offset="25%"  stopColor="rgba(184,148,60,0.60)" />
              <stop offset="75%"  stopColor="rgba(184,148,60,0.60)" />
              <stop offset="100%" stopColor="rgba(184,148,60,0)" />
            </linearGradient>
          </defs>

          {/* Offset shadow */}
          <rect x="2.5" y="3.5" width="19" height="37" rx="9.5" fill="rgba(10,33,31,0.16)" />

          {/* Body */}
          <rect x="1" y="1" width="22" height="40" rx="11" fill="url(#em-body)" />
          <rect x="1" y="1" width="22" height="40" rx="11" fill="url(#em-depth)" />

          {/* Outer stroke */}
          <rect x="1" y="1" width="22" height="40" rx="11"
            stroke="rgba(10,33,31,0.42)" strokeWidth="0.9" fill="none" />

          {/* Inner stroke — glass inner edge */}
          <rect x="2" y="2" width="20" height="38" rx="10"
            stroke="rgba(255,255,255,0.10)" strokeWidth="0.7" fill="none" />

          {/* Left rim highlight */}
          <rect x="2.4" y="5" width="1.2" height="30" rx="0.6" fill="rgba(255,255,255,0.42)" />

          {/* Right shadow strip */}
          <rect x="20.4" y="5" width="1.2" height="30" rx="0.6" fill="rgba(0,0,0,0.32)" />

          {/* Button split — gold accent line */}
          <line x1="2" y1="15" x2="22" y2="15" stroke="url(#em-gold)" strokeWidth="0.7" />

          {/* Center divider (top buttons) */}
          <line x1="12" y1="2" x2="12" y2="14.5"
            stroke="rgba(10,33,31,0.16)" strokeWidth="0.7" />

          {/* Scroll wheel — fixed on body, moves with mouse */}
          <rect x="10" y="11" width="4" height="8" rx="2" fill="rgba(10,33,31,0.38)" />
          <rect x="10" y="11" width="4" height="8" rx="2"
            stroke="rgba(255,255,255,0.14)" strokeWidth="0.6" fill="none" />
          <line x1="10.5" y1="12.5" x2="10.5" y2="17.5"
            stroke="rgba(255,255,255,0.32)" strokeWidth="0.6" strokeLinecap="round" />

          {/* Specular overlay */}
          <rect x="1" y="1" width="22" height="40" rx="11" fill="url(#em-spec)" />
        </svg>
      </div>

    </section>
  )
}
