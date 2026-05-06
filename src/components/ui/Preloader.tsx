'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

/* ─── Tokens ──────────────────────────── */
const BG    = '#0A1510'
const CREAM = '#F2F4E7'
const LIME  = '#C8D96F'

/* ─── Grain ──────────────────────────── */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/* ─── Timing ──────────────────────────── */
const T_FILL       = 2.0    // left→right fill sweep
const T_HOLD       = 0.4    // hold at full text
const T_SWITCH     = 0.22   // cream → window cross-fade
const T_ZOOM       = 1.65   // zoom duration
const T_FADE       = 0.22   // opacity-out at the very end

const T_ZOOM_START = T_FILL + T_HOLD                        // 2.40
const T_FADE_START = T_ZOOM_START + T_ZOOM - T_FADE         // 3.83

/* ── Shared text style (keeps all three layers pixel-identical) */
const TEXT: React.CSSProperties = {
  fontFamily:    'var(--font-display)',
  fontStyle:     'italic',
  fontWeight:    400,
  fontSize:      'clamp(80px, 11vw, 136px)',
  letterSpacing: '0.04em',
  lineHeight:    1,
  whiteSpace:    'nowrap',
}

export function Preloader() {
  const [done, setDone] = useState(false)

  const wrapRef   = useRef<HTMLDivElement>(null)  // isolated compositor
  const bgRef     = useRef<HTMLDivElement>(null)  // dark-green layer (gets punched)
  const textRef   = useRef<HTMLDivElement>(null)  // zoom target
  const revealRef = useRef<HTMLDivElement>(null)  // cream clip-path layer
  const cutoutRef = useRef<HTMLDivElement>(null)  // destination-out window
  const scanRef   = useRef<HTMLDivElement>(null)  // scanline

  useGSAP(() => {
    /* ── Initial states ───────────────── */
    gsap.set(revealRef.current, { clipPath: 'inset(0 100% 0 0)' })
    gsap.set(cutoutRef.current, { opacity: 0 })
    gsap.set(scanRef.current,   { y: '-110%', opacity: 0 })

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wrapRef.current, { display: 'none' })
        setDone(true)
      },
    })

    /* ── 1. Fill sweep left → right ──── */
    tl.to(revealRef.current, {
      clipPath: 'inset(0 0% 0 0)',
      duration: T_FILL,
      ease: 'power2.inOut',
    }, 0)

    /* Scanline down during fill */
    tl.to(scanRef.current, {
      y: '110%',
      opacity: 0.065,
      duration: T_FILL * 0.88,
      ease: 'power1.inOut',
    }, 0.12)

    /* ── 2. Hold ─────────────────────── (implicit gap) */

    /* ── 3a. Cream fades → window appears (crossfade) ── */
    tl.to(revealRef.current, {
      opacity: 0,
      duration: T_SWITCH,
      ease: 'power1.in',
    }, T_ZOOM_START)

    tl.to(cutoutRef.current, {
      opacity: 1,
      duration: T_SWITCH,
      ease: 'power1.out',
    }, T_ZOOM_START)

    /* ── 3b. Zoom rush — text grows until it fills viewport ── */
    tl.to(textRef.current, {
      scale: 24,
      duration: T_ZOOM,
      ease: 'expo.in',
      force3D: true,
    }, T_ZOOM_START)

    /* ── 4. Snap whole wrapper to invisible ── */
    tl.to(wrapRef.current, {
      opacity: 0,
      duration: T_FADE,
      ease: 'none',
    }, T_FADE_START)

  }, { scope: wrapRef })

  if (done) return null

  return (
    /*
     * isolation: 'isolate' is the key ingredient.
     * It creates an offscreen compositing group so that
     * mix-blend-mode: destination-out on the cutout text
     * punches THROUGH the dark-green bgRef, making those
     * pixels fully transparent → the real page shows through.
     */
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        isolation: 'isolate',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >

      {/* ── Dark green background ─────────────────────────────
          This layer is what gets "punched through" by the
          destination-out text during the zoom phase.         */}
      <div
        ref={bgRef}
        style={{ position: 'absolute', inset: 0, backgroundColor: BG }}
      />

      {/* ── Film grain ──────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 0.042,
          backgroundImage: GRAIN,
          backgroundSize: '200px',
        }}
      />

      {/* ── Vignette ────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 35%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      {/* ── Scanline ────────────────────────────────────────── */}
      <div
        ref={scanRef}
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '1px',
          pointerEvents: 'none',
          zIndex: 2,
          background: `linear-gradient(to right,
            transparent 0%,
            ${LIME}55 28%,
            ${CREAM}99 50%,
            ${LIME}55 72%,
            transparent 100%)`,
        }}
      />

      {/*
       * ── Text wrapper ────────────────────────────────────────
       * This is the zoom target (scale 1 → 24).
       * will-change + backfaceVisibility = GPU compositing layer.
       */}
      <div
        ref={textRef}
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'inline-block',
          lineHeight: 1,
          willChange: 'transform',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden',
        }}
      >

        {/* Ghost base — letter outlines only (no fill), always visible */}
        <div
          aria-hidden
          style={{
            ...TEXT,
            color: 'transparent',
            WebkitTextStroke: '1px rgba(200,217,111,0.15)',
          }}
        >
          THE PIVOT
        </div>

        {/* Cream fill — clip-path sweeps left→right (fill phase) */}
        <div
          ref={revealRef}
          style={{
            ...TEXT,
            position: 'absolute',
            inset: 0,
            color: CREAM,
            textShadow: `0 0 22px rgba(200,217,111,0.2)`,
          }}
        >
          THE PIVOT
        </div>

        {/*
         * Destination-out window ─────────────────────────────
         * opacity:0 during fill phase (no effect).
         * At T_ZOOM_START fades to opacity:1 → text shape
         * subtracts alpha from bgRef, punching a transparent
         * window through the dark overlay.
         * The real page content beneath shows through the letters.
         * As scale reaches ~24, letters fill entire viewport →
         * full page is revealed, seamlessly.
         */}
        <div
          ref={cutoutRef}
          aria-hidden
          style={{
            ...TEXT,
            position: 'absolute',
            inset: 0,
            color: 'black',            // must be opaque — alpha is what cuts
            mixBlendMode: 'destination-out' as React.CSSProperties['mixBlendMode'],
            opacity: 0,
          }}
        >
          THE PIVOT
        </div>

      </div>
    </div>
  )
}
