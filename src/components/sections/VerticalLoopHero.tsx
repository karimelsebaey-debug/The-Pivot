'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { useLenis } from '@/lib/lenis'
import { PillCTA } from '@/components/ui/PillCTA'

// ─── Card data (local assets only) ───────────────────────────────────────────

type Card = {
  id: string
  type: 'video' | 'image'
  src: string
  label: string
}

const CARDS: Card[] = [
  { id: '1',  type: 'video', src: '/videos/loop/app-ad.mp4',        label: 'App Ad' },
  { id: '2',  type: 'video', src: '/videos/loop/gourmet-ad.mp4',    label: 'Gourmet Ad' },
  { id: '3',  type: 'video', src: '/videos/loop/dashboard-ad.mp4',  label: 'Dashboard Ad' },
  { id: '4',  type: 'video', src: '/videos/loop/jewelry-ad.mp4',    label: 'Jewelry Ad' },
  { id: '5',  type: 'video', src: '/videos/loop/saas-ad.mp4',       label: 'SaaS Ad' },
  { id: '6',  type: 'video', src: '/videos/loop/sneakers-ad.mp4',   label: 'Sneakers Ad' },
  { id: '7',  type: 'video', src: '/videos/loop/eyeliner-ad.mp4',   label: 'UGC Eyeliner' },
  { id: '8',  type: 'video', src: '/videos/loop/fashion-ad.mp4',    label: 'Fashion Ad' },
  { id: '9',  type: 'video', src: '/videos/loop/makeup-ad.mp4',     label: 'Unboxing Ad' },
  { id: '10', type: 'video', src: '/videos/loop/website-ad.mp4',    label: 'Website Ad' },
  { id: '11', type: 'image', src: '/images/loop/copywriting.jpg',       label: 'Copywriting' },
  { id: '12', type: 'image', src: '/images/loop/product-visuals.jpg',   label: 'Product Visuals' },
]

const GAP = 12

// Desktop columns mix square and tall-rectangle cards instead of a uniform
// height — every 3rd card (index 1, 4, 7…) renders square.
const SQUARE_H = 200
const RECT_H   = 320
function cardHeight(i: number) {
  return i % 3 === 1 ? SQUARE_H : RECT_H
}

const TOTAL_MIXED = (cards: Card[]) =>
  cards.reduce((sum, _, i) => sum + cardHeight(i) + GAP, 0)

const CARD_W  = 130
const H_GAP   = 10
const ITEM_W  = CARD_W + H_GAP
const H_TOTAL = (cards: Card[]) => cards.length * ITEM_W

const H_MASK = 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)'

// ─── Shared RAF manager — one tick loop drives all columns ───────────────────

type RafCallback = (now: number) => void
const _rafCallbacks = new Set<RafCallback>()
let _rafHandle = 0

function _rafTick(now: number) {
  _rafCallbacks.forEach(fn => fn(now))
  if (_rafCallbacks.size > 0) _rafHandle = requestAnimationFrame(_rafTick)
}

function registerRaf(fn: RafCallback): () => void {
  _rafCallbacks.add(fn)
  if (_rafCallbacks.size === 1) _rafHandle = requestAnimationFrame(_rafTick)
  return () => {
    _rafCallbacks.delete(fn)
    if (_rafCallbacks.size === 0 && _rafHandle !== 0) {
      cancelAnimationFrame(_rafHandle)
      _rafHandle = 0
    }
  }
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Card renderer ────────────────────────────────────────────────────────────

function CardMedia({ card }: { card: Card }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const style: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  }

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  if (card.type === 'image') {
    return (
      <img
        src={card.src}
        alt={card.label}
        loading="lazy"
        decoding="async"
        style={style}
      />
    )
  }

  return (
    <video
      ref={videoRef}
      src={card.src}
      muted
      loop
      playsInline
      preload="none"
      style={style}
    />
  )
}

// ─── Infinite column ──────────────────────────────────────────────────────────

interface ColumnProps {
  cards: Card[]
  direction: 'up' | 'down'
  speed: number
  getScrollVelocity: () => number
  className?: string
}

function InfiniteColumn({ cards, direction, speed, getScrollVelocity, className = '' }: ColumnProps) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(direction === 'down' ? -TOTAL_MIXED(cards) : 0)
  const lastRef   = useRef<number | null>(null)

  useEffect(() => {
    const T = TOTAL_MIXED(cards)
    const tick = (now: number) => {
      const delta = lastRef.current == null ? 16 : now - lastRef.current
      lastRef.current = now
      const boost = Math.abs(getScrollVelocity()) * 0.0018
      const sign  = direction === 'up' ? -1 : 1
      let next    = offsetRef.current + sign * (speed + boost) * (delta / 1000)
      if (next < -T) next += T
      if (next > 0)  next -= T
      offsetRef.current = next
      if (wrapRef.current) wrapRef.current.style.transform = `translateY(${next}px)`
    }
    return registerRaf(tick)
  }, [cards, direction, speed, getScrollVelocity])

  const repeated = [...cards, ...cards]

  return (
    <div className={`relative min-w-0 flex-1 overflow-hidden ${className}`} aria-hidden>
      <div ref={wrapRef} className="absolute inset-x-0 top-0 will-change-transform">
        {repeated.map((card, i) => (
          <div
            key={`${card.id}-${i}`}
            className="relative w-full overflow-hidden rounded-2xl group"
            style={{ height: cardHeight(i % cards.length), marginBottom: GAP, background: '#0A211F' }}
          >
            <CardMedia card={card} />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Horizontal loop (mobile) ─────────────────────────────────────────────────

function HorizontalLoop({ cards, speed, direction = 'left', getScrollVelocity }: {
  cards: Card[]
  speed: number
  direction?: 'left' | 'right'
  getScrollVelocity: () => number
}) {
  const wrapRef   = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(direction === 'right' ? -H_TOTAL(cards) : 0)
  const lastRef   = useRef<number | null>(null)

  useEffect(() => {
    const T = H_TOTAL(cards)
    const sign = direction === 'left' ? -1 : 1
    const tick = (now: number) => {
      const delta = lastRef.current == null ? 16 : now - lastRef.current
      lastRef.current = now
      const boost = Math.abs(getScrollVelocity()) * 0.001
      let next = offsetRef.current + sign * (speed + boost) * (delta / 1000)
      if (next < -T) next += T
      if (next > 0)  next -= T
      offsetRef.current = next
      if (wrapRef.current) wrapRef.current.style.transform = `translateX(${next}px)`
    }
    return registerRaf(tick)
  }, [cards, speed, direction, getScrollVelocity])

  const repeated = [...cards, ...cards]

  return (
    <div style={{ overflow: 'hidden', width: '100%', height: '100%', maskImage: H_MASK, WebkitMaskImage: H_MASK }}>
      <div ref={wrapRef} style={{ display: 'flex', gap: H_GAP, height: '100%', willChange: 'transform' }}>
        {repeated.map((card, i) => (
          <div
            key={`h-${card.id}-${i}`}
            style={{ flexShrink: 0, width: CARD_W, height: '100%', borderRadius: 12, overflow: 'hidden', background: '#0A211F', position: 'relative' }}
          >
            <CardMedia card={card} />
          </div>
        ))}
      </div>
    </div>
  )
}

const MASK = 'linear-gradient(to bottom, transparent 0%, black 13%, black 87%, transparent 100%)'

function splitCols(cards: Card[]) {
  const third = Math.ceil(cards.length / 3)
  return {
    col1: cards.slice(0, third),
    col2: cards.slice(third, third * 2),
    col3: cards.slice(third * 2),
  }
}

const INITIAL_COLS = splitCols(CARDS)

// ─── VerticalLoopHero ─────────────────────────────────────────────────────────

export function VerticalLoopHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const bodyRef    = useRef<HTMLParagraphElement>(null)
  const ctaRef     = useRef<HTMLDivElement>(null)

  const velRef = useRef(0)
  const lenis  = useLenis()
  const [isMobile, setIsMobile] = useState(false)
  const [cols, setCols] = useState(() => splitCols(CARDS))

  useEffect(() => {
    setCols(splitCols(shuffle(CARDS)))
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!lenis) return
    const onScroll = ({ velocity }: { velocity: number }) => {
      velRef.current = velocity
    }
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
  }, [lenis])

  const getScrollVelocity = useCallback(() => velRef.current * 60, [])

  useGSAP(() => {
    if (!headRef.current || !bodyRef.current || !ctaRef.current) return
    const tl = gsap.timeline({
      defaults: { ease: 'power4.out' },
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })
    tl.from(headRef.current.querySelectorAll('span > span'), {
        yPercent: 110, opacity: 0, stagger: 0.12, duration: 1.1,
      })
      .from(bodyRef.current,  { opacity: 0, y: 14, duration: 0.8 }, '-=0.5')
      .from(ctaRef.current,   { opacity: 0, y: 14, duration: 0.7 }, '-=0.4')
  }, { scope: sectionRef })

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative flex flex-col md:flex-row overflow-hidden"
      style={{ minHeight: '100dvh', background: 'var(--color-dark-bg)' }}
    >
      {/* Left: copy */}
      <div className="vlh-copy relative z-10 flex flex-col justify-center">
        <h2
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
        </h2>

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

      {/* Right: carousel */}
      <div className="vlh-carousel" aria-hidden>
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, height: '100%', justifyContent: 'center' }}>
            <HorizontalLoop cards={[...cols.col1, ...cols.col2, ...cols.col3]}                   speed={55} direction="left"  getScrollVelocity={getScrollVelocity} />
            <HorizontalLoop cards={[...cols.col3, ...cols.col2, ...cols.col1].reverse()}         speed={45} direction="right" getScrollVelocity={getScrollVelocity} />
          </div>
        ) : (
          <div
            className="vlh-columns"
            style={{
              display: 'flex',
              height: '100%',
              gap: 12,
              maskImage: MASK,
              WebkitMaskImage: MASK,
            }}
          >
            <InfiniteColumn cards={cols.col1} direction="up"   speed={46} getScrollVelocity={getScrollVelocity} />
            <InfiniteColumn cards={cols.col2} direction="down" speed={34} getScrollVelocity={getScrollVelocity} />
            <InfiniteColumn cards={cols.col3} direction="up"   speed={56} getScrollVelocity={getScrollVelocity} />
          </div>
        )}
      </div>

      {/* Edge fade left — desktop only */}
      {!isMobile && (
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
      )}
    </section>
  )
}
