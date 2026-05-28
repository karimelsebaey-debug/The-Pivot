'use client'

import { useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useLenis } from '@/lib/lenis'
import { PillCTA } from '@/components/ui/PillCTA'

// ─── Video card data ───────────────────────────────────────────────────────────

const CARDS = [
  { id: '1',  src: '/videos/loop/app-ad.mp4',       label: 'App Ad' },
  { id: '2',  src: '/videos/loop/fast-food-ad.mp4', label: 'Fast Food Ad' },
  { id: '3',  src: '/videos/loop/gourmet-ad.mp4',   label: 'Gourmet Ad' },
  { id: '4',  src: '/videos/loop/dashboard-ad.mp4', label: 'Dashboard Ad' },
  { id: '5',  src: '/videos/loop/jewelry-ad.mp4',   label: 'Jewelry Ad' },
  { id: '6',  src: '/videos/loop/saas-ad.mp4',      label: 'SaaS Ad' },
  { id: '7',  src: '/videos/loop/sneakers-ad.mp4',  label: 'Sneakers Ad' },
  { id: '8',  src: '/videos/loop/eyeliner-ad.mp4',  label: 'UGC Eyeliner' },
  { id: '9',  src: '/videos/loop/fashion-ad.mp4',   label: 'Fashion Ad' },
  { id: '10', src: '/videos/loop/makeup-ad.mp4',    label: 'Unboxing Ad' },
  { id: '11', src: '/videos/loop/website-ad.mp4',   label: 'Website Ad' },
  { id: '12', src: '/videos/loop/redesign-ad.mp4',  label: 'Redesign Ad' },
  { id: '13', src: '/videos/loop/eyeliner-ad-2.mp4',label: 'UGC Ad' },
  { id: '14', src: '/videos/loop/website-ad-2.mp4', label: 'Website Ad' },
]

const CARD_H = 280
const GAP    = 12
const ITEM_H = CARD_H + GAP

const TOTAL = (cards: typeof CARDS) => cards.length * ITEM_H

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
            className="relative w-full overflow-hidden rounded-2xl group"
            style={{ height: CARD_H, marginBottom: GAP, background: '#0A211F' }}
          >
            <video
              src={card.src}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Bottom label overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(10,33,31,0.7) 0%, transparent 50%)',
              }}
            />
            <span
              className="absolute bottom-3 left-3 font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: '0.22em', color: '#D8FF85', opacity: 0.8 }}
            >
              {card.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Column splits ─────────────────────────────────────────────────────────────

const COL_1 = CARDS.slice(0,  5)
const COL_2 = CARDS.slice(5,  9)
const COL_3 = CARDS.slice(9, 14)

const MASK = 'linear-gradient(to bottom, transparent 0%, black 13%, black 87%, transparent 100%)'

// ─── VerticalLoopHero ─────────────────────────────────────────────────────────

export function VerticalLoopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  const velRef = useRef(0)
  const lenis  = useLenis()

  useEffect(() => {
    if (!lenis) return
    const onScroll = ({ velocity }: { velocity: number }) => {
      velRef.current = velocity
    }
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  const getScrollVelocity = () => velRef.current * 60

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

      {/* Edge fade left */}
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
