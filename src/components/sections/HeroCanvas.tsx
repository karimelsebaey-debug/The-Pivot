'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { PillCTA } from '@/components/ui/PillCTA'
import { TextColor } from '@/components/ui/text-color'

const TOTAL    = 60
const HEADER_H = 56
const BG       = '#DADECF'

const frameSrc = (i: number) =>
  `/frames-hero/frame_${String(i).padStart(3, '0')}.jpg`

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

    /* Contain: full building visible, no clipping. BG fill blends with sky color. */
    const availH = h - HEADER_H
    const scaleW = w / img.naturalWidth
    const scaleH = availH / img.naturalHeight
    const scale  = Math.min(scaleW, scaleH)

    const dw = Math.round(img.naturalWidth  * scale)
    const dh = Math.round(img.naturalHeight * scale)
    const dx = Math.round((w - dw) / 2)
    const dy = Math.round(HEADER_H + (availH - dh) / 2)

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
      .from(canvasRef.current,    { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)

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

          <p ref={eyebrowRef} style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1.35rem',
            color: 'var(--color-ink)',
            opacity: 0.55,
            letterSpacing: '-0.01em',
            marginBottom: '1.25rem',
          }}>
            Creative Collective
          </p>

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
            specialized services, and digital solutions —{' '}
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
              color: 'var(--color-ink)',
              letterSpacing: '-0.01em',
              textDecoration: 'none',
              opacity: 0.8,
            }}
            className="link-underline"
          >
            Start a Project →
          </Link>
        </div>
      </div>

      {/* ── Mobile text overlay ── */}
      <div
        className="md:hidden flex flex-col justify-center h-full"
        style={{
          position: 'relative',
          padding: `${HEADER_H + 24}px clamp(20px, 5vw, 40px) 48px`,
          zIndex: 3,
          background: `linear-gradient(to bottom, ${BG} 0%, rgba(218,222,207,0.75) 60%, rgba(218,222,207,0.4) 100%)`,
        }}
      >
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1rem',
          color: 'var(--color-ink)',
          opacity: 0.55,
          marginBottom: '0.875rem',
        }}>
          Creative Collective
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 9vw, 3.5rem)',
          lineHeight: 1.06,
          letterSpacing: '-0.025em',
          color: 'var(--color-ink)',
          marginBottom: '1.25rem',
        }}>
          The Turning Point For Your{' '}
          <em style={{ fontStyle: 'italic' }}>Creative Ambition.</em>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.95rem',
          lineHeight: 1.75,
          color: 'var(--color-ink)',
          opacity: 0.7,
          marginBottom: '1.75rem',
          maxWidth: '420px',
        }}>
          We transform ambitious ideas into visual presence and digital
          solutions —{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 700 }}>built to last, impossible to ignore.</em>
        </p>
        <PillCTA href="#work" label="See Our Work" />
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

        {/* Mouse scroll icon */}
        <svg width="22" height="36" viewBox="0 0 22 36" fill="none">
          <rect x="0.7" y="0.7" width="20.6" height="34.6" rx="10.3"
            stroke="var(--color-ink)" strokeWidth="1.1" opacity="0.35"/>
          <circle cx="11" cy="10" r="2.2"
            fill="var(--color-ink)"
            style={{ animation: 'mouse-dot-scroll 2s ease-in-out infinite' }}/>
        </svg>
      </div>

    </section>
  )
}
