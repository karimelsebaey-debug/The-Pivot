'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { PillCTA } from '@/components/ui/PillCTA'

// ─── Card data ────────────────────────────────────────────────────────────────

const CARDS = [
  { id: '1', bg: '#1E3A34', accent: '#D8FF85', label: 'Brand Identity' },
  { id: '2', bg: '#2A1F3D', accent: '#A78BFA', label: 'Motion Design' },
  { id: '3', bg: '#3A2010', accent: '#FB923C', label: 'Ad Creative' },
  { id: '4', bg: '#0F2D2A', accent: '#34D399', label: 'UI / UX' },
  { id: '5', bg: '#1A1A2E', accent: '#60A5FA', label: 'Social Media' },
  { id: '6', bg: '#2D1A1A', accent: '#F87171', label: 'Print & OOH' },
  { id: '7', bg: '#1A2D1A', accent: '#86EFAC', label: 'Video Editing' },
]

const CARD_H = 210
const GAP    = 14
const ITEM_H = CARD_H + GAP

const TOTAL = (cards: typeof CARDS) => cards.length * ITEM_H

// ─── Decorative SVG shape ─────────────────────────────────────────────────────

function CardDecor({ accent, index }: { accent: string; index: number }) {
  const n = index % 3
  if (n === 0)
    return (
      <svg className="absolute inset-0 m-auto" width="72" height="72" fill="none">
        <circle cx="36" cy="36" r="28" stroke={accent} strokeWidth="1.5" opacity=".35" />
        <circle cx="36" cy="36" r="14" fill={accent} opacity=".12" />
      </svg>
    )
  if (n === 1)
    return (
      <svg className="absolute inset-0 m-auto" width="72" height="72" fill="none">
        <rect x="12" y="12" width="48" height="48" rx="4"
          stroke={accent} strokeWidth="1.5" opacity=".35"
          transform="rotate(15 36 36)" />
      </svg>
    )
  return (
    <svg className="absolute inset-0 m-auto" width="72" height="72" fill="none">
      <polygon points="36,6 66,58 6,58"
        stroke={accent} strokeWidth="1.5" opacity=".35"
        fill={accent} fillOpacity=".08" />
    </svg>
  )
}

// ─── Infinite column ──────────────────────────────────────────────────────────

interface ColumnProps {
  cards: typeof CARDS
  direction: 'up' | 'down'
  speed: number
  getScrollVelocity: () => number
}

function InfiniteColumn({ cards, direction, speed, getScrollVelocity }: ColumnProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(direction === 'down' ? -TOTAL(cards) : 0)
  const rafRef    = useRef<number>(0)
  const lastRef   = useRef<number | null>(null)

  useEffect(() => {
    const T = TOTAL(cards)

    function tick(now: number) {
      const delta = lastRef.current == null ? 16 : now - lastRef.current
      lastRef.current = now

      const boost = Math.abs(getScrollVelocity()) * 0.0018
      const sign  = direction === 'up' ? -1 : 1
      let next    = offsetRef.current + sign * (speed + boost) * (delta / 1000)

      if (next < -T) next += T
      if (next > 0)  next -= T

      offsetRef.current = next
      if (wrapRef.current) wrapRef.current.style.transform = `translateY(${next}px)`

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [cards, direction, speed, getScrollVelocity])

  const repeated = [...cards, ...cards]

  return (
    <div className="relative min-w-0 flex-1 overflow-hidden" aria-hidden>
      <div ref={wrapRef} className="absolute inset-x-0 top-0 will-change-transform">
        {repeated.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className="relative w-full overflow-hidden rounded-2xl"
            style={{ height: CARD_H, marginBottom: GAP, background: card.bg }}
          >
            <CardDecor accent={card.accent} index={i} />
            <span
              className="absolute bottom-3 left-3 font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: '0.22em', color: card.accent, opacity: 0.7 }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── VerticalLoopHero ─────────────────────────────────────────────────────────

const MASK = 'linear-gradient(to bottom, transparent 0%, black 13%, black 87%, transparent 100%)'

const COL_1 = CARDS.slice(0, 5)
const COL_2 = [...CARDS.slice(3), ...CARDS.slice(0, 2)]
const COL_3 = [...CARDS.slice(2)]

export function VerticalLoopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  const velRef      = useRef(0)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      velRef.current = y - prevScrollY.current
      prevScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const getScrollVelocity = () => velRef.current

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
    tl.from(headRef.current!.querySelectorAll('span > span'), {
        yPercent: 110, opacity: 0, stagger: 0.12, duration: 1.1,
      })
      .from(bodyRef.current,  { opacity: 0, y: 14, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current,   { opacity: 0, y: 14, duration: 0.7 }, '-=0.4')
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="relative flex overflow-hidden"
      style={{ minHeight: '100vh', background: 'var(--color-dark-bg)' }}
    >
      {/* Left: copy */}
      <div
        className="relative z-10 flex flex-col justify-center"
        style={{
          width: '50%',
          padding: 'clamp(48px,7vh,96px) clamp(32px,5vw,80px)',
          minHeight: '100vh',
        }}
      >
        <h1
          ref={headRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 5.4vw, 6.5rem)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: '#F2F4E7',
            marginBottom: '1.75rem',
          }}
        >
          <span className="block overflow-hidden">
            <span className="block">Where Ideas</span>
          </span>
          <span className="block overflow-hidden">
            <span className="block italic" style={{ color: 'var(--color-accent)' }}>
              Become Presence
            </span>
          </span>
        </h1>

        <p
          ref={bodyRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 2.6vw, 3rem)',
            lineHeight: 1.25,
            letterSpacing: '-0.02em',
            color: '#F2F4E7',
            maxWidth: '20ch',
            marginBottom: '2.5rem',
          }}
        >
          Scale fast with{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
            20+ creative services
          </em>{' '}
          engineered to{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
            accelerate growth
          </em>{' '}
          and maximize your revenue.
        </p>

        <div ref={ctaRef}>
          <PillCTA href="/contact" label="Book a Demo" />
        </div>
      </div>

      {/* Right: vertical looping carousel */}
      <div
        className="absolute inset-y-0 right-0"
        style={{ width: '50%', overflow: 'hidden' }}
        aria-hidden
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            gap: 12,
            padding: '0 24px',
            maskImage: MASK,
            WebkitMaskImage: MASK,
          }}
        >
          <InfiniteColumn cards={COL_1} direction="up"   speed={46} getScrollVelocity={getScrollVelocity} />
          <InfiniteColumn cards={COL_2} direction="down" speed={34} getScrollVelocity={getScrollVelocity} />
          <InfiniteColumn cards={COL_3} direction="up"   speed={56} getScrollVelocity={getScrollVelocity} />
        </div>
      </div>

      {/* Edge fade */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0"
        style={{
          right: '50%',
          width: 120,
          background: 'linear-gradient(to right, var(--color-dark-bg), transparent)',
          zIndex: 5,
        }}
      />
    </section>
  )
}
