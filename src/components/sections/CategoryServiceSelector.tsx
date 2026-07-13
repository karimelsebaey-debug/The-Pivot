'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { ServiceItem } from '@/lib/services-data'

function ArrowUpRight({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none">
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CategoryServiceSelector({ items, accent }: { items: ServiceItem[]; accent: string }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [revealed, setRevealed] = useState<number[]>([])
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setRevealed((prev) => [...prev, i]), 90 * i)
    )
    return () => timers.forEach(clearTimeout)
  }, [items])

  if (items.length === 0) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        height: isMobile ? 'auto' : '460px',
        borderRadius: 4,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index
        const isCollapsedRow = isMobile && !isActive
        const isRevealed = revealed.includes(index)
        const image = item.mobileHeroImage ?? item.heroImage ?? item.images?.[0]?.src

        return (
          <div
            key={item.slug}
            onClick={() => setActiveIndex(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') setActiveIndex(index) }}
            style={{
              position: 'relative',
              cursor: 'pointer',
              overflow: 'hidden',
              backgroundColor: '#0A211F',
              backgroundImage: image ? `url(${image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              flex: isMobile ? 'none' : isActive ? '6 1 0%' : '1 1 0%',
              height: isMobile ? (isActive ? '400px' : '76px') : '100%',
              borderBottom: isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderRight: !isMobile ? '1px solid rgba(255,255,255,0.08)' : 'none',
              opacity: isRevealed ? 1 : 0,
              transform: isRevealed ? 'translateX(0)' : 'translateX(-24px)',
              transition:
                'flex-grow 0.6s cubic-bezier(0.16,1,0.3,1), height 0.5s ease, opacity 0.5s ease, transform 0.5s ease',
            }}
          >
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background: isCollapsedRow
                  ? 'rgba(10,33,31,0.6)'
                  : 'linear-gradient(to top, rgba(10,33,31,0.92) 0%, rgba(10,33,31,0.15) 55%, transparent 100%)',
              }}
            />

            {isCollapsedRow ? (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 16px',
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    color: accent,
                    flexShrink: 0,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    color: '#F2F4E7',
                  }}
                >
                  {item.title}
                </span>
              </div>
            ) : (
              <div
                style={{
                  position: 'absolute',
                  left: 0, right: 0, bottom: 0,
                  padding: '18px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.65rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: accent,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: isActive ? '1.3rem' : '0.95rem',
                      color: '#F2F4E7',
                      whiteSpace: isMobile ? 'normal' : 'nowrap',
                      transition: 'font-size 0.4s ease',
                      marginTop: 2,
                    }}
                  >
                    {item.title}
                  </div>
                  {isActive && (
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.85rem',
                        color: 'rgba(242,244,231,0.7)',
                        marginTop: 6,
                        maxWidth: '32ch',
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>

                {isActive && (
                  <Link
                    href={`/services/${item.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`View ${item.title}`}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      width: 36, height: 36, borderRadius: '50%',
                      border: '1px solid rgba(242,244,231,0.4)',
                      color: '#F2F4E7',
                      flexShrink: 0,
                    }}
                  >
                    <ArrowUpRight />
                  </Link>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
