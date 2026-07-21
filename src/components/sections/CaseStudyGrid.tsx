'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

type MediaItem = { url: string; type: 'image' | 'video' }

export type CaseStudy = {
  slug: string
  title: string
  tags: string
  description: string
  main: MediaItem
  gallery: MediaItem[]
  /** Optional per-tile aspect-ratio override (raw CSS ratio, e.g. '4/3'), one per gallery item. Defaults to '3/2'. */
  galleryAspects?: string[]
  /** Optional custom column layout: each inner array is a column of gallery indices, stacked top to bottom. Overrides the default single-row layout. */
  galleryLayout?: number[][]
}

function Media({ item, className }: { item: MediaItem; className?: string }) {
  if (item.type === 'video') {
    return <video src={item.url} className={className} autoPlay muted loop playsInline />
  }
  return <img src={item.url} alt="" className={className} />
}

type ModalZone = 'close' | 'media'

// Native scrollbars aren't real DOM nodes — detect them by checking whether the
// cursor sits inside the scrollbar-thickness band of a scrollable ancestor.
function isOverScrollbar(e: React.MouseEvent): boolean {
  let node = e.target as HTMLElement | null
  while (node) {
    const scrollbarW = node.offsetWidth - node.clientWidth
    const scrollbarH = node.offsetHeight - node.clientHeight
    if (scrollbarW > 0 || scrollbarH > 0) {
      const rect = node.getBoundingClientRect()
      const onVerticalTrack = scrollbarW > 0 && e.clientX >= rect.right - scrollbarW
      const onHorizontalTrack = scrollbarH > 0 && e.clientY >= rect.bottom - scrollbarH
      if (onVerticalTrack || onHorizontalTrack) return true
    }
    node = node.parentElement
  }
  return false
}

function CaseModal({ study, onClose, initialPos }: { study: CaseStudy; onClose: () => void; initialPos: { x: number; y: number } | null }) {
  const badgeRef = useRef<HTMLDivElement>(null)
  const [zone, setZone] = useState<ModalZone>('close')

  // Seed the badge at the click position immediately — otherwise it sits at
  // (0,0) and the OS cursor stays visible until the user's first mousemove.
  useEffect(() => {
    if (!initialPos) return
    const el = badgeRef.current
    if (el) el.style.transform = `translate(${initialPos.x}px, ${initialPos.y}px) translate(-50%, -50%)`
    const hitEl = document.elementFromPoint(initialPos.x, initialPos.y)
    setZone(hitEl?.closest('[data-media]') ? 'media' : 'close')
  }, [initialPos])

  const handleMove = (e: React.MouseEvent) => {
    const el = badgeRef.current
    if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    const isMedia = (e.target as Element).closest('[data-media]')
    setZone(isMedia && !isOverScrollbar(e) ? 'media' : 'close')
  }

  const handleClick = (e: React.MouseEvent) => {
    if (zone === 'close') onClose()
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

      <div
        className="relative z-10 order-2 mx-auto w-full max-w-[1800px] overflow-y-auto md:order-1"
        style={{ padding: 'clamp(48px,6vw,96px) clamp(32px,5vw,64px) 0', maxHeight: '64vh' }}
      >
        {study.galleryLayout ? (
          // Custom column layout: each column stacks its listed gallery indices top to bottom.
          <div className="flex items-start gap-3 overflow-x-auto">
            {study.galleryLayout.map((column, colIdx) => (
              <div key={colIdx} className="flex shrink-0 flex-col gap-3" style={{ width: 320 }}>
                {column.map((itemIdx) => (
                  <div
                    key={itemIdx}
                    data-media
                    className="relative w-full overflow-hidden rounded-lg"
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)', aspectRatio: study.galleryAspects?.[itemIdx] ?? '3/2' }}
                  >
                    <Media item={study.gallery[itemIdx]} className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          // Single row, fixed-size tiles — overflows and scrolls horizontally rather than shrinking
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:overflow-x-auto">
            {study.gallery.map((item, i) => (
              <div
                key={i}
                data-media
                className="relative w-full overflow-hidden rounded-lg md:w-auto md:shrink-0 md:h-[280px]"
                style={{ backgroundColor: 'rgba(255,255,255,0.04)', aspectRatio: study.galleryAspects?.[i] ?? '3/2' }}
              >
                <Media item={item} className="absolute inset-0 h-full w-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cursor badge: white Close bubble over the backdrop, hidden over media tiles */}
      <div
        ref={badgeRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[110] flex h-18 w-18 items-center justify-center rounded-full text-xs font-medium"
        style={{
          width: 72,
          height: 72,
          backgroundColor: '#F2F4E7',
          color: '#0A211F',
          opacity: zone === 'media' ? 0 : 1,
          transition: 'opacity 0.2s ease',
          willChange: 'transform',
        }}
      >
        Close
      </div>

      <div className="relative z-10 order-1 mx-auto w-full max-w-[1400px] md:order-2" style={{ padding: '0 clamp(32px,5vw,64px) clamp(16px,2vw,24px)' }}>
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
  const [openAt, setOpenAt] = useState<{ x: number; y: number } | null>(null)
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
          onClick={(e) => { setActiveIndex(i); setOpenAt({ x: e.clientX, y: e.clientY }) }}
          onMouseEnter={showBadge}
          onMouseMove={moveBadge}
          onMouseLeave={hideBadge}
          className="group relative aspect-[4/3] w-full cursor-none select-none overflow-hidden text-left md:aspect-square"
        >
          <Media item={study.main} className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl brightness-75" />
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
        className="pointer-events-none fixed left-0 top-0 z-[90] flex h-18 w-18 items-center justify-center rounded-full text-xs font-medium text-white backdrop-blur-sm"
        style={{
          width: 72,
          height: 72,
          backgroundColor: 'rgba(10,33,31,0.4)',
          opacity: 0,
          transition: 'opacity 0.25s ease',
          willChange: 'transform',
        }}
      >
        Expand +
      </div>

      <AnimatePresence>
        {active && <CaseModal study={active} onClose={() => setActiveIndex(null)} initialPos={openAt} />}
      </AnimatePresence>
    </div>
  )
}
