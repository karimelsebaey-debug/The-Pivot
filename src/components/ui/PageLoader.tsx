'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { ExpoScaleEase } from 'gsap/EasePack'

gsap.registerPlugin(useGSAP, SplitText, CustomEase, ExpoScaleEase)

/* ─── Design tokens ───────────────────────── */
const BG   = '#0A1510'   // dark green extracted from screenshot
const LIME = '#C8D96F'   // brand accent

/* ─── Stutter custom ease ─────────────────── */
const STUTTER_PATH =
  'M0,0 C0,0 0.052,0.1 0.152,0.1 0.242,0.1 0.299,0.349 0.399,0.349 ' +
  '0.586,0.349 0.569,0.596 0.67,0.624 0.842,0.671 0.95,0.95 1,1'

export function PageLoader() {
  const [hidden, setHidden] = useState(false)

  /* ─── Refs ────────────────────────────── */
  const wrapperRef     = useRef<HTMLDivElement>(null)
  const bgRef          = useRef<HTMLDivElement>(null)   // wipe curtain
  const logoRef        = useRef<HTMLDivElement>(null)   // full logo block
  const maskRef        = useRef<HTMLDivElement>(null)   // oval frame
  const pivotRef       = useRef<HTMLDivElement>(null)   // PIVOT text target
  const eyebrowRef     = useRef<HTMLDivElement>(null)
  const dividerRef     = useRef<HTMLDivElement>(null)
  const taglineRef     = useRef<HTMLDivElement>(null)
  const progressRef    = useRef<HTMLDivElement>(null)   // progress track
  const progressBarRef = useRef<HTMLDivElement>(null)   // progress fill

  /* ─── GSAP ────────────────────────────── */
  useGSAP(() => {
    if (!pivotRef.current) return

    /* 1 ─ Register stutter ease */
    CustomEase.create('stutterEase', STUTTER_PATH)

    /* 2 ─ Initial states (prevent layout flash) */
    gsap.set(bgRef.current,          { scaleX: 0, transformOrigin: 'right center' })
    gsap.set(progressBarRef.current, { scaleX: 0, transformOrigin: 'left center' })
    gsap.set(
      [eyebrowRef.current, dividerRef.current, taglineRef.current],
      { opacity: 0, y: 5 }
    )

    /* 3 ─ SplitText — "PIVOT" chars only */
    let split: InstanceType<typeof SplitText> | null = null
    let chars: Element[] = []

    try {
      split = new SplitText(pivotRef.current, {
        type: 'chars',
        smartWrap: true,
        mask: 'chars',
      })
      chars = split.chars
    } catch {
      /* Fallback: query manually-split child spans */
      chars = Array.from(pivotRef.current.querySelectorAll('.char'))
    }

    /* 4 ─ Main timeline */
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(wrapperRef.current, { display: 'none' })
        setHidden(true)
      },
    })

    /* t = 0  →  PIVOT chars stutter-drop reveal */
    tl.from(chars, {
      yPercent: -100,
      ease: 'power2.inOut',
      stagger: { each: 0.02, from: 'random' },
      duration: 0.5,
      repeat: 1,
      repeatDelay: 0.75,
    }, 0)

    /* t = 0.15  →  eyebrow / divider / tagline fade in */
    tl.to(
      [eyebrowRef.current, dividerRef.current, taglineRef.current],
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      0.15
    )

    /* t = 0.05 → 2.6  →  progress bar fills */
    tl.to(progressBarRef.current, { scaleX: 1, duration: 2.55, ease: 'none' }, 0.05)

    /* ──── EXIT at t = 2.8 ──────────────────────────────── */

    /* bg curtain wipes right → left with stutter */
    tl.to(bgRef.current, {
      scaleX: 1,
      ease: 'stutterEase',
      duration: 0.9,
    }, 2.8)

    /* oval frame explodes outward */
    tl.to(maskRef.current, {
      scale: 3,
      duration: 0.9,
      ease: 'expoScale(0.5,7,power1.in)',
    }, 2.8)

    /* everything fades to 0 */
    tl.to(
      [bgRef.current, logoRef.current, progressRef.current],
      { opacity: 0, duration: 0.85, ease: 'power2.inOut' },
      2.8
    )

    return () => {
      split?.revert()
    }
  }, { scope: wrapperRef })

  if (hidden) return null

  return (
    <div
      ref={wrapperRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
      style={{ backgroundColor: BG }}
    >

      {/* ── Film grain ─────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.038,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: '200px',
        }}
      />

      {/* ── Ambient lime glow ──────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          width: '540px',
          height: '360px',
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center, ${LIME}14 0%, transparent 68%)`,
          filter: 'blur(64px)',
        }}
      />

      {/* ── Wipe curtain — preloader-bg ────────────────────── */}
      <div
        ref={bgRef}
        className="preloader-bg absolute inset-0"
        style={{ backgroundColor: BG, zIndex: 1 }}
      />

      {/* ── Logo block — preloader-logo ────────────────────── */}
      <div
        ref={logoRef}
        className="preloader-logo relative z-[2] flex items-center justify-center"
      >
        {/* ── Oval frame — preloader-mask ──────────────────── */}
        <div
          ref={maskRef}
          className="preloader-mask relative flex flex-col items-center justify-center"
          style={{
            width: '420px',
            height: '278px',
            borderRadius: '50%',
            border: '1px solid rgba(242,244,231,0.08)',
          }}
        >

          {/* Eyebrow — THE */}
          <div
            ref={eyebrowRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: LIME,
              marginBottom: '6px',
            }}
          >
            THE
          </div>

          {/* PIVOT wordmark — SplitText target */}
          <div
            ref={pivotRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(56px, 8vw, 88px)',
              fontStyle: 'italic',
              fontWeight: 400,
              letterSpacing: '-0.025em',
              lineHeight: 1,
              color: '#F2F4E7',
            }}
          >
            PIVOT
          </div>

          {/* Divider — — • — */}
          <div
            ref={dividerRef}
            style={{
              marginTop: '14px',
              fontSize: '11px',
              letterSpacing: '0.22em',
              color: LIME,
              opacity: 0.65,
            }}
          >
            — • —
          </div>

          {/* Tagline */}
          <div
            ref={taglineRef}
            style={{
              marginTop: '8px',
              fontFamily: 'var(--font-body)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: `${LIME}88`,
            }}
          >
            The Turning Point
          </div>

        </div>
      </div>

      {/* ── Progress bar — preloader-progress-bar ────────── */}
      <div
        ref={progressRef}
        className="preloader-progress-bar absolute z-[2]"
        style={{
          bottom: '38px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '108px',
          height: '1px',
          backgroundColor: 'rgba(242,244,231,0.07)',
          overflow: 'hidden',
        }}
      >
        <div
          ref={progressBarRef}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: LIME,
          }}
        />
      </div>

    </div>
  )
}
