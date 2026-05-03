'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const SERVICES = [
  {
    number: '01',
    title: 'Creative Design',
    description: 'Ads, branding, presentations, and visual concepts that make your brand impossible to ignore.',
    items: ['Ad Creative', 'Social Media Creative', 'Presentation Design', 'Illustration Design', 'Branding Services', 'eBooks & Reports', 'Concept Creation'],
    accent: '#D8FF85',
  },
  {
    number: '02',
    title: 'Specialized Production',
    description: 'End-to-end production for motion, web, copy, and design systems that scale.',
    items: ['Motion Design', 'Email Creation', 'Web Design', 'Copywriting', 'Design Systems', 'Product Design'],
    accent: '#0A211F',
  },
  {
    number: '03',
    title: 'AI Services',
    description: 'AI-powered creative, automation, data visualization, and consulting for the next era.',
    items: ['AI-Powered Creative', 'AI Consulting', 'Automation', 'Data Services'],
    accent: '#D8FF85',
  },
  {
    number: '04',
    title: 'Marketing',
    description: 'Campaign strategy that connects creative ambition to measurable results.',
    items: ['Campaign Strategy'],
    accent: '#0A211F',
  },
]

export function Services() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    const ctx = gsap.context(() => {
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
    }, wrapper)

    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={wrapperRef} style={{ overflow: 'hidden' }}>
      <div ref={trackRef} className="flex" style={{ width: `${SERVICES.length * 100}vw` }}>
        {SERVICES.map((service, i) => (
          <div
            key={service.number}
            className="flex-shrink-0 flex flex-col justify-between"
            style={{
              width: '100vw',
              minHeight: '100vh',
              padding: 'calc(var(--header-height) + 80px) var(--container-px) 80px',
              backgroundColor: i % 2 === 0 ? 'var(--color-bg)' : 'var(--color-dark-bg)',
              color: i % 2 === 0 ? 'var(--color-ink)' : 'var(--color-bg)',
            }}
          >
            <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto', width: '100%' }}>

              {/* Number + category */}
              <div className="flex items-start justify-between mb-16">
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ letterSpacing: '0.15em', opacity: 0.5 }}
                >
                  {service.number} / {String(SERVICES.length).padStart(2, '0')}
                </span>
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ letterSpacing: '0.15em', opacity: 0.5 }}
                >
                  Services
                </span>
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 7vw, 6.5rem)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  marginBottom: '2rem',
                }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p
                className="max-w-lg text-lg leading-relaxed mb-16"
                style={{ opacity: 0.7 }}
              >
                {service.description}
              </p>

              {/* Service list */}
              <ul className="flex flex-wrap gap-3">
                {service.items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/services/${item.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                      className={`pill-tag ${i % 2 === 0 ? 'pill-tag-light' : 'pill-tag-dark'}`}
                    >
                      {item}
                      <span className="pill-arrow">
                        <ArrowUpRight size={13} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-16">
                <Link href="/contact" className="cta-pill">
                  <span className="cta-pill-label" style={{
                    backgroundColor: service.accent,
                    color: i % 2 === 0 ? 'var(--color-ink)' : 'var(--color-dark-bg)',
                  }}>
                    Get Started
                  </span>
                  <div className="cta-pill-icon" style={{
                    backgroundColor: service.accent,
                    color: i % 2 === 0 ? 'var(--color-ink)' : 'var(--color-dark-bg)',
                  }}>
                    <ArrowUpRight className="arr-out" size={15} />
                    <ArrowUpRight className="arr-in"  size={15} />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
