'use client'

import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

const WORK = [
  {
    client: 'Talal',
    title: 'P&L Dashboard',
    category: 'Data Services',
    quote: 'The numbers were always there. The Pivot taught me how to see them.',
    role: 'CEO, Private Investment Firm',
    bg: '#0A211F',
    accent: '#D8FF85',
    placeholder: 'https://placehold.co/720x720/0A211F/D8FF85?text=P%26L+Dashboard',
  },
  {
    client: 'Sherif',
    title: 'AI Avatar Ad',
    category: 'AI-Powered Creative',
    quote: "The virtual persona didn't replace the team — it gave them a tool that races against time.",
    role: 'R&D Director, Tech Company',
    bg: '#F7F9F2',
    accent: '#0A211F',
    placeholder: 'https://placehold.co/720x720/F7F9F2/0A211F?text=AI+Avatar+Ad',
  },
]

export function WorkGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (!card) return
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="work"
      ref={sectionRef}
      className="section-py"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="container" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-px)' }}>

        {/* Section header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.15em' }}
            >
              Selected Work
            </p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              What Shifted.
            </h2>
          </div>
          <p className="hidden md:block text-sm max-w-xs text-right" style={{ color: 'var(--color-ink-muted)' }}>
            More results available on request.
          </p>
        </div>

        {/* 2-column grid — superside layout */}
        <div
          className="grid grid-cols-1 md:grid-cols-2"
          style={{ gap: '40px' }}
        >
          {WORK.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => { cardsRef.current[i] = el }}
              className="group relative overflow-hidden"
              style={{ borderRadius: 'var(--radius-lg)' }}
            >
              {/* Image / placeholder */}
              <div
                className="relative overflow-hidden"
                style={{ aspectRatio: '1 / 1' }}
              >
                <img
                  src={item.placeholder}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{
                    transition: `transform var(--t-slow) var(--ease), filter var(--t-slow) var(--ease)`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'scale(1.04) translate(4px, -4px)'
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = ''
                  }}
                />

                {/* Category tag */}
                <span
                  className="absolute top-5 left-5 text-xs font-semibold uppercase tracking-widest px-3 py-1.5"
                  style={{
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-ink)',
                    borderRadius: 'var(--radius-xl)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {item.category}
                </span>
              </div>

              {/* Info */}
              <div
                className="p-8"
                style={{
                  backgroundColor: item.bg,
                  color: item.accent,
                }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ opacity: 0.6, letterSpacing: '0.12em' }}
                >
                  {item.client} — {item.role}
                </p>
                <blockquote
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
                    lineHeight: 1.35,
                    letterSpacing: '-0.01em',
                  }}
                >
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <p
                  className="mt-6 text-sm font-semibold uppercase tracking-widest"
                  style={{ opacity: 0.5, letterSpacing: '0.12em' }}
                >
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Request more */}
        <p className="md:hidden mt-8 text-sm text-center" style={{ color: 'var(--color-ink-muted)' }}>
          More results available on request.
        </p>
      </div>
    </section>
  )
}
