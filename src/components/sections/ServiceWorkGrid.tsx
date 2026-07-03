'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceItem } from '@/lib/services-data'

type GridItem = {
  src: string
  label: string
  type: 'video' | 'image'
  aspectRatio?: string
  objectPosition?: string
  description?: string
}

function getBentoSpan(index: number, total: number): 1 | 2 | 3 {
  if (total <= 2) return 3
  if (index === total - 1 && total % 2 !== 0) return 3
  const row = Math.floor(index / 2)
  const pos = index % 2
  if (row % 2 === 0) return pos === 0 ? 2 : 1
  return pos === 0 ? 1 : 2
}

/*
 * MediaCard — uses a hidden spacer div to establish height from CSS aspect-ratio.
 * All media is position:absolute so overflow:hidden clips reliably regardless
 * of the media's intrinsic dimensions.
 */
function MediaCard({
  item,
  cardAspectRatio = '16/10',
  className = '',
}: {
  item: GridItem
  cardAspectRatio?: string
  className?: string
}) {
  const mediaStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: item.objectPosition ?? 'center top',
    transition: 'transform 700ms',
  }

  return (
    <div
      className={`swg-card group ${className}`}
      style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px' }}
    >
      {/* Spacer — non-positioned, establishes card height via aspect-ratio */}
      <div style={{ width: '100%', aspectRatio: cardAspectRatio }} aria-hidden />

      {item.type === 'video' ? (
        <video
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          className="group-hover:scale-105"
          style={mediaStyle}
        />
      ) : (
        <img
          src={item.src}
          alt={item.label}
          className="group-hover:scale-105"
          style={mediaStyle}
        />
      )}

      {item.description && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, transparent 38%, transparent 55%, rgba(0,0,0,0.6) 100%)',
          padding: 'clamp(14px, 2vw, 22px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}>
          <p style={{
            color: '#fff',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.85rem, 1.05vw, 1rem)',
            fontWeight: 600,
            margin: 0,
            lineHeight: 1.3,
          }}>
            {item.label}
          </p>
          <p style={{
            color: 'rgba(255,255,255,0.88)',
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {item.description}
          </p>
        </div>
      )}

    </div>
  )
}

export function ServiceWorkGrid({ service }: { service: ServiceItem }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isDark = service.bg === '#0A211F'

  const allItems: GridItem[] = service.mediaItems ?? [
    ...service.videos.map(v => ({ ...v, type: 'video' as const })),
    ...(service.images ?? []).map(img => ({ ...img, type: 'image' as const })),
  ]

  useGSAP(() => {
    gsap.from('.swg-card', {
      autoAlpha: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  const introBg = service.introBg
  const bg = introBg ?? (isDark ? '#12211D' : '#F2F4E7')
  const sectionStyle: React.CSSProperties = {
    backgroundColor: bg,
    padding: introBg
      ? `clamp(40px,6vh,80px) clamp(24px,5vw,80px) clamp(60px,10vh,120px)`
      : `clamp(60px,10vh,120px) clamp(24px,5vw,80px)`,
  }

  const labelEl = null

  /* ── Custom row layout ── */
  if (service.gridRows) {
    let idx = 0
    const rows = service.gridRows.map(row => {
      const count = typeof row === 'number' ? row : row.count
      const cardAspectRatio =
        typeof row === 'object' ? (row.cardAspectRatio ?? '16/10') : '16/10'
      const columns =
        typeof row === 'object' ? (row.columns ?? `repeat(${count}, 1fr)`) : `repeat(${count}, 1fr)`
      const items = allItems.slice(idx, idx + count)
      idx += count
      return { items, count, cardAspectRatio, columns }
    })

    return (
      <section ref={sectionRef} style={sectionStyle}>
        {labelEl}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: service.gridMaxWidth ?? '1200px', margin: '0 auto' }}>
          {rows.map(({ items: rowItems, count, cardAspectRatio, columns }, rowIdx) => (
            <div
              key={rowIdx}
              className="swg-grid-row"
              style={{
                display: 'grid',
                gridTemplateColumns: columns,
                gap: '16px',
              }}
            >
              {rowItems.map(item => (
                <MediaCard
                  key={item.src}
                  item={item}
                  cardAspectRatio={item.aspectRatio ?? cardAspectRatio}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    )
  }

  /* ── Default bento layout ── */
  return (
    <section ref={sectionRef} style={sectionStyle}>
      {labelEl}
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: '16px' }}>
        {allItems.map((item, index) => {
          const span = getBentoSpan(index, allItems.length)
          const colClass =
            span === 3 ? 'md:col-span-3' :
            span === 2 ? 'md:col-span-2' :
            'md:col-span-1'
          const cardAspectRatio = span === 1 ? '3/4' : '16/9'

          return (
            <MediaCard
              key={item.src}
              item={item}
              cardAspectRatio={cardAspectRatio}
              className={colClass}
            />
          )
        })}
      </div>
    </section>
  )
}
