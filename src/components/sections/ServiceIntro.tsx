'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceItem } from '@/lib/services-data'
import { renderInlineHeading, italicHeadingStyle } from '@/lib/inline-heading'

export function ServiceIntro({ service }: { service: ServiceItem }) {
  const ref = useRef<HTMLElement>(null)
  const isDark = service.bg === '#0A211F'

  const bgColor = service.introBg ?? (isDark ? '#12211D' : '#F2F4E7')
  const isBgDark = bgColor === '#12211D' || bgColor === '#0A211F'
  const textColor = isBgDark ? '#F2F4E7' : '#0A211F'
  const mutedColor = isBgDark ? 'rgba(242,244,231,0.38)' : 'rgba(10,33,31,0.38)'
  const borderColor = isBgDark ? 'rgba(242,244,231,0.10)' : 'rgba(10,33,31,0.10)'

  const label = service.introLabel ?? 'What We Do'
  const hasNewStyle = !!service.headingLine1

  useGSAP(() => {
    const targets = hasNewStyle
      ? ['.si-label', '.si-heading', '.si-subtitle']
      : ['.si-label', '.si-text']

    gsap.from(targets, {
      autoAlpha: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: bgColor,
        padding: hasNewStyle
          ? 'clamp(80px,12vh,140px) clamp(24px,5vw,80px) 0'
          : 'clamp(80px,12vh,140px) clamp(24px,5vw,80px)',
        borderTop: `1px solid ${borderColor}`,
      }}
    >
      {hasNewStyle ? (
        <div style={{ textAlign: 'center', maxWidth: '860px', margin: '0 auto' }}>
          <p
            className="si-label"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: mutedColor,
              marginBottom: '2.5rem',
            }}
          >
            {label}
          </p>

          <h2
            className="si-heading"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(2.25rem, 4.2vw, 4.75rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: textColor,
              marginBottom: '2rem',
            }}
          >
            {renderInlineHeading(service.headingLine1 ?? '')}
            {service.headingItalic && (
              <>
                <br />
                <em style={italicHeadingStyle}>{service.headingItalic}</em>
              </>
            )}
          </h2>

          {service.introSubtitle && (
            <p
              className="si-subtitle"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.05rem',
                fontWeight: 400,
                lineHeight: 1.75,
                color: textColor,
                opacity: 0.55,
                maxWidth: '540px',
                margin: '0 auto',
              }}
            >
              {service.introSubtitle}
            </p>
          )}
        </div>
      ) : (
        <div style={{ maxWidth: '860px' }}>
          <p
            className="si-label"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.7rem',
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: mutedColor,
              marginBottom: '2rem',
            }}
          >
            {label}
          </p>

          <p
            className="si-text"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.2vw, 3rem)',
              lineHeight: 1.22,
              letterSpacing: '-0.02em',
              color: textColor,
            }}
          >
            {service.intro}
          </p>
        </div>
      )}
    </section>
  )
}
