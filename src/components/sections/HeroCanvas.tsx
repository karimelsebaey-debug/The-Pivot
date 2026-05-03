'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PillCTA } from '@/components/ui/PillCTA'

gsap.registerPlugin(useGSAP, ScrollTrigger)

/* Use frames 0-38 only — exclude 039 & 040 (final cinematic frames) */
const TOTAL    = 39
const HEADER_H = 56
/* Sampled from frames_veo3 — matches sketch paper exactly */
const BG       = '#F2F4E7'

const frameSrc = (i: number) =>
  `/frames-hero/frame_${String(i).padStart(3, '0')}.jpg`

export function HeroCanvas() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const line1Ref   = useRef<HTMLSpanElement>(null)
  const line2Ref   = useRef<HTMLSpanElement>(null)
  const line3Ref   = useRef<HTMLSpanElement>(null)
  const subRef     = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLParagraphElement>(null)

  const imgs     = useRef<HTMLImageElement[]>([])
  const frameIdx = useRef(0)
  const logical  = useRef({ w: 0, h: 0 })

  /* ── Preload frames ───────────────────────────────────── */
  useEffect(() => {
    imgs.current = Array.from({ length: TOTAL }, (_, i) => {
      const img = new Image()
      img.src = frameSrc(i)
      if (i === 0) img.onload = () => drawFrame(0)
      return img
    })
  }, [])

  /* ── Draw ─────────────────────────────────────────────── */
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

    /* object-fit: contain — full frame, slight right bias for editorial composition */
    const ia = img.naturalWidth / (img.naturalHeight || 1)
    const ca = w / h
    let dw: number, dh: number, dx: number, dy: number
    if (ia > ca) {
      dw = w; dh = w / ia; dx = 0; dy = (h - dh) / 2
    } else {
      dh = h; dw = h * ia
      /* Push tower toward right (editorial weight) — 65% from left center */
      dx = (w - dw) * 0.62
      dy = 0
    }

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

  /* ── GSAP ─────────────────────────────────────────────── */
  useGSAP(() => {
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(eyebrowRef.current, { opacity: 0, y: 12, duration: 0.8 })
      .from([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 110, opacity: 0, stagger: 0.1, duration: 1.1,
      }, '-=0.5')
      .from(subRef.current,    { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current,    { opacity: 0, y: 16, duration: 0.7 }, '-=0.4')
      .from(canvasRef.current, { opacity: 0, duration: 1.6, ease: 'power2.out' }, 0)

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

  /* ── Render ───────────────────────────────────────────── */
  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: BG,
      }}
    >
      {/* ── Desktop ──────────────────────────────────────── */}
      <div
        className="hidden md:grid h-full"
        style={{ gridTemplateColumns: '45% 55%' }}
      >

        {/* LEFT — text column */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: `${HEADER_H + 8}px clamp(24px, 3vw, 48px) clamp(36px, 5vh, 52px) clamp(32px, 4vw, 64px)`,
            minHeight: 0,
          }}
        >

          {/* ── Text block — fills remaining height, centres content ── */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

            {/* Eyebrow */}
            <p
              ref={eyebrowRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '1.05rem',
                color: 'var(--color-ink-muted)',
                letterSpacing: '-0.01em',
                marginBottom: '0.75rem',
              }}
            >
              Creative Collective
            </p>

            {/* Heading — editorial spec: clamp(48px,6vw,80px), Regular 400, tight */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 400,
                lineHeight: 1.07,
                letterSpacing: '-0.025em',
                color: '#1A1A1A',
                marginBottom: '1.5rem',
              }}
            >
              <span className="block overflow-hidden">
                <span ref={line1Ref} className="block">The Turning</span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line2Ref} className="block">Point For Your</span>
              </span>
              <span className="block overflow-hidden">
                <span ref={line3Ref} className="block" style={{ fontStyle: 'italic' }}>
                  Creative Ambition.
                </span>
              </span>
            </h1>

            {/* Body — sans-serif 15-16px, #3A3A3A, lh 1.6, max 480px */}
            <p
              ref={subRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 400,
                lineHeight: 1.6,
                color: '#3A3A3A',
                maxWidth: '480px',
              }}
            >
              We transform ambitious ideas and needs into visual presence,
              specialized services, and digital solutions —{' '}
              <em style={{ fontStyle: 'italic' }}>built to last,</em>{' '}
              <em style={{ fontStyle: 'italic' }}>
                impossible to ignore.
              </em>
            </p>

          </div>

          {/* ── CTAs — always anchored at column bottom ── */}
          <div
            ref={ctaRef}
            style={{ display: 'flex', alignItems: 'center', gap: '28px', flexShrink: 0 }}
          >
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

        {/* RIGHT — canvas column */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: BG,
          }}
        >
          {/* Canvas — full column height, no top offset so tower reaches top */}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              display: 'block',
              /* CSS mask: smooth fade left edge into page background */
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%)',
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 8%, black 22%)',
            }}
          />

          {/* Top fade — covers area behind the fixed navbar */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: `${HEADER_H + 40}px`,
              background: `linear-gradient(to bottom, ${BG} 0%, transparent 100%)`,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* ── Mobile ───────────────────────────────────────── */}
      <div
        className="md:hidden flex flex-col justify-center h-full"
        style={{
          padding: `${HEADER_H + 24}px clamp(20px, 5vw, 40px) 48px`,
          backgroundColor: BG,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '1rem',
            color: 'var(--color-ink-muted)',
            marginBottom: '0.875rem',
          }}
        >
          Creative Collective
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.4rem, 9vw, 3.5rem)',
            lineHeight: 1.06,
            letterSpacing: '-0.025em',
            color: 'var(--color-ink)',
            marginBottom: '1.25rem',
          }}
        >
          The Turning Point For Your{' '}
          <em style={{ fontStyle: 'italic' }}>Creative Ambition.</em>
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.95rem',
            lineHeight: 1.75,
            opacity: 0.65,
            marginBottom: '1.75rem',
            maxWidth: '420px',
          }}
        >
          We transform ambitious ideas into visual presence and digital
          solutions —{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 600 }}>built to last,</em>{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 700 }}>impossible to ignore.</em>
        </p>
        <PillCTA href="#work" label="See Our Work" />
      </div>
    </section>
  )
}
