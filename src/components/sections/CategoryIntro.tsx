'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceCategory } from '@/lib/services-data'
import { renderInlineHeading } from '@/lib/inline-heading'
import { CategoryServiceSelector } from './CategoryServiceSelector'

export function CategoryIntro({ category }: { category: ServiceCategory }) {
  const ref = useRef<HTMLElement>(null)
  const bg = category.introBg ?? '#F2F4E7'
  const isDark = bg === '#0A211F'

  const textColor   = isDark ? '#F2F4E7' : '#0A211F'
  const mutedColor  = isDark ? 'rgba(242,244,231,0.62)' : 'rgba(10,33,31,0.62)'
  const borderColor = isDark ? 'rgba(242,244,231,0.12)' : 'rgba(10,33,31,0.10)'

  useGSAP(() => {
    if (!category.introHeading) return
    gsap.from(['.ci-heading', '.ci-body'], {
      autoAlpha: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 82%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  if (!category.introHeading) return null

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: bg,
        borderTop: `1px solid ${borderColor}`,
        padding: 'clamp(64px,10vh,120px) clamp(24px,5vw,80px)',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: 'clamp(40px, 6vw, 96px)', alignItems: 'start' }}
      >
        {/* Left — heading + body */}
        <div>
          <h2
            className="ci-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.25rem, 4.2vw, 3.75rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              color: textColor,
              marginBottom: '1.75rem',
            }}
          >
            {renderInlineHeading(category.introHeading)}
          </h2>

          {category.introBody && (
            <p
              className="ci-body"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                lineHeight: 1.75,
                color: mutedColor,
                maxWidth: '46ch',
              }}
            >
              {category.introBody}
            </p>
          )}
        </div>

        {/* Right — interactive service selector */}
        <CategoryServiceSelector items={category.items} accent={category.accent} />
      </div>
    </section>
  )
}
