'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'

type MediaItem = { url: string; type: 'image' | 'video' }

export type CaseStudy = {
  slug: string
  title: string
  tags: string
  description: string
  main: MediaItem
  gallery: MediaItem[]
}

function Media({ item, className }: { item: MediaItem; className?: string }) {
  if (item.type === 'video') {
    return <video src={item.url} className={className} autoPlay muted loop playsInline />
  }
  return <img src={item.url} alt="" className={className} />
}

// Every 3rd tile spans both rows (tall); the rest are half-height and pair up
// via dense packing — same rhythm as superside.com's two-row mosaic.
function tileRowSpan(i: number): 1 | 2 {
  return i % 3 === 0 ? 2 : 1
}

type ModalZone = 'left' | 'right' | 'close' | 'media'

function CaseModal({ study, onClose }: { study: CaseStudy; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const [zone, setZone] = useState<ModalZone>('close')
  const canScroll = study.gallery.length > 3

  const scrollBy = (dir: 1 | -1) => {
    scrollRef.current?.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }

  const handleMove = (e: React.MouseEvent) => {
    const el = badgeRef.current
    if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`

    const w = window.innerWidth
    let next: ModalZone
    if (canScroll && e.clientX > w * 0.85) next = 'right'
    else if (canScroll && e.clientX < w * 0.15) next = 'left'
    else if ((e.target as Element).closest('[data-media]')) next = 'media'
    else next = 'close'
    if (next !== zone) setZone(next)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (zone === 'right') scrollBy(1)
    else if (zone === 'left') scrollBy(-1)
    else if (zone === 'close' && !(e.target as Element).closest('[data-media]')) onClose()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseMove={handleMove}
      onClick={handleClick}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-y-auto"
      style={{ backgroundColor: 'var(--color-ink)', cursor: zone === 'media' ? 'auto' : 'none' }}
    >
      {/* Blurred glass backdrop, tinted by the case study's own imagery */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `url(${study.main.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(70px) saturate(1.3)',
          transform: 'scale(1.2)',
          opacity: 0.55,
        }}
      />
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{ backgroundColor: 'rgba(10,33,31,0.55)' }} />

      {/* Fallback close for touch / keyboard */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="fixed right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white md:hidden"
        style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
      >
        <X size={16} />
      </button>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]" style={{ padding: 'clamp(48px,6vw,96px) clamp(32px,5vw,64px) 0' }}>
        <div
          ref={scrollRef}
          className="grid gap-3 overflow-x-auto"
          style={{
            gridAutoFlow: 'column dense',
            gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
            gridAutoColumns: 'minmax(220px, 320px)',
            height: 'min(58vh, 520px)',
          }}
        >
          {study.gallery.map((item, i) => (
            <div
              key={i}
              data-media
              className="relative overflow-hidden rounded-lg"
              style={{ gridRow: `span ${tileRowSpan(i)}` }}
            >
              <Media item={item} className="absolute inset-0 h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Zoned cursor badge: green scroll arrows at the edges, white Close over the backdrop */}
      <div
        ref={badgeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] flex items-center justify-center rounded-full text-xs font-medium"
        style={{
          width: zone === 'close' ? 72 : 64,
          height: zone === 'close' ? 72 : 64,
          backgroundColor: zone === 'close' ? '#F2F4E7' : 'var(--color-accent)',
          color: '#0A211F',
          opacity: zone === 'media' ? 0 : 1,
          transition: 'opacity 0.2s ease, background-color 0.2s ease',
          willChange: 'transform',
        }}
      >
        {zone === 'left' && <ArrowLeft size={18} />}
        {zone === 'right' && <ArrowRight size={18} />}
        {zone === 'close' && 'Close'}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px]" style={{ padding: '0 clamp(32px,5vw,64px) clamp(16px,2vw,24px)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 3vw, 2.75rem)',
            color: '#F2F4E7',
            letterSpacing: '-0.02em',
            marginBottom: '0.5rem',
          }}
        >
          {study.title}
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', lineHeight: 1.6, color: 'rgba(242,244,231,0.6)', maxWidth: '40rem' }}>
          {study.description}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'rgba(242,244,231,0.4)',
            marginTop: '0.75rem',
          }}
        >
          {study.tags}
        </p>
      </div>
    </motion.div>
  )
}

export function CaseStudyGrid({ items }: { items: CaseStudy[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex !== null ? items[activeIndex] : null
  const badgeRef = useRef<HTMLDivElement>(null)

  // "Expand +" badge follows the mouse while it moves over a card (superside.com behavior)
  const moveBadge = (e: React.MouseEvent) => {
    const el = badgeRef.current
    if (!el) return
    el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
  }
  const showBadge = (e: React.MouseEvent) => {
    moveBadge(e)
    if (badgeRef.current) badgeRef.current.style.opacity = '1'
  }
  const hideBadge = () => {
    if (badgeRef.current) badgeRef.current.style.opacity = '0'
  }

  return (
    <div className="grid grid-cols-1 gap-1 md:grid-cols-2">
      {items.map((study, i) => (
        <button
          key={study.slug}
          onClick={() => setActiveIndex(i)}
          onMouseEnter={showBadge}
          onMouseMove={moveBadge}
          onMouseLeave={hideBadge}
          className="group relative aspect-[4/3] w-full cursor-none select-none overflow-hidden text-left md:aspect-square"
        >
          <Media item={study.main} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0) 100%)' }}
          />

          <div className="absolute" style={{ bottom: 24, left: 24, right: 24 }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#F2F4E7' }}>
              {study.title} +
            </h3>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'rgba(242,244,231,0.7)', marginTop: 4 }}>
              {study.tags}
            </p>
          </div>
        </button>
      ))}

      {/* Mouse-following Expand badge — fixed so it tracks clientX/Y directly */}
      <div
        ref={badgeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-16 w-16 items-center justify-center rounded-full text-[11px] font-medium text-white backdrop-blur-sm"
        style={{
          backgroundColor: 'rgba(10,33,31,0.6)',
          opacity: 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform',
        }}
      >
        Expand +
      </div>

      <AnimatePresence>
        {active && <CaseModal study={active} onClose={() => setActiveIndex(null)} />}
      </AnimatePresence>
    </div>
  )
}
