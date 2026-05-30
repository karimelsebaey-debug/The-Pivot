'use client'

import { useRef, type CSSProperties } from 'react'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { SERVICE_CATEGORIES } from '@/lib/services-data'

function ArrowUpRight({ size = 15, style, className }: { size?: number; style?: CSSProperties; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 15 15" fill="none" style={style} className={className}>
      <path d="M3 12L12 3M12 3H5M12 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const wrapper = wrapperRef.current
    const track   = trackRef.current
    if (!wrapper || !track) return

    const totalScroll = track.scrollWidth - window.innerWidth

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        end: () => `+=${totalScroll}`,
        invalidateOnRefresh: true,
      },
    })

    /* Category number fade-in on panel enter */
    SERVICE_CATEGORIES.forEach((_, i) => {
      const panel = track.children[i] as HTMLElement
      if (!panel) return
      gsap.from(panel.querySelector('.srv-title'), {
        yPercent: 60,
        autoAlpha: 0,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: wrapper,
          start: () => `top+=${i * (totalScroll / SERVICE_CATEGORIES.length)} top`,
          toggleActions: 'play none none none',
        },
      })
    })
  }, { scope: wrapperRef })

  return (
    <section id="services" ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div
        ref={trackRef}
        className="flex"
        style={{ width: `${SERVICE_CATEGORIES.length * 100}vw` }}
      >
        {SERVICE_CATEGORIES.map((cat, i) => {
          const isDark = i % 2 === 0
          return (
            <div
              key={cat.slug}
              className="flex-shrink-0 flex flex-col justify-center"
              style={{
                width: '100vw',
                minHeight: '100vh',
                padding: 'calc(var(--header-height) + 48px) var(--container-px) 48px',
                backgroundColor: isDark ? 'var(--color-dark-bg)' : 'var(--color-bg)',
                color: isDark ? 'var(--color-bg)' : 'var(--color-ink)',
              }}
            >
              <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' }}>

                {/* Title */}
                <div style={{ overflow: 'hidden', marginBottom: '2rem' }}>
                  <h2
                    className="srv-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                      lineHeight: 1.0,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {cat.title}
                  </h2>
                </div>

                {/* Description */}
                <p
                  className="max-w-lg text-xl leading-relaxed mb-16"
                  style={{ opacity: 0.65 }}
                >
                  {cat.description}
                </p>

                {/* Service pills */}
                <ul className="flex flex-wrap gap-3">
                  {cat.items.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/capabilities/${item.slug}`}
                        className="group inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200"
                        style={{
                          borderRadius: 'var(--radius-xl)',
                          border: `1.5px solid ${isDark ? 'rgba(242,244,231,0.2)' : 'rgba(10,33,31,0.15)'}`,
                          letterSpacing: '0.1em',
                          backgroundColor: 'transparent',
                        }}
                        onMouseEnter={e => {
                          const el = e.currentTarget
                          el.style.backgroundColor = isDark ? '#C9A84C' : '#0A211F'
                          el.style.color = isDark ? '#0A211F' : '#F2F4E7'
                          el.style.borderColor = 'transparent'
                        }}
                        onMouseLeave={e => {
                          const el = e.currentTarget
                          el.style.backgroundColor = 'transparent'
                          el.style.color = ''
                          el.style.borderColor = isDark ? 'rgba(242,244,231,0.2)' : 'rgba(10,33,31,0.15)'
                        }}
                      >
                        {item.title}
                        <ArrowUpRight size={13} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="mt-16">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-3 px-7 py-4 text-sm font-semibold uppercase tracking-widest transition-all duration-300"
                    style={{
                      borderRadius: 'var(--radius-xl)',
                      backgroundColor: isDark ? '#C9A84C' : '#0A211F',
                      color: isDark ? '#0A211F' : '#F2F4E7',
                      letterSpacing: '0.12em',
                    }}
                  >
                    Get Started
                    <ArrowUpRight size={15} />
                  </Link>
                </div>

              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
