'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceItem } from '@/lib/services-data'
import { renderInlineHeading } from '@/lib/inline-heading'

export function ServiceStorySection({ service }: { service: ServiceItem }) {
  const ref = useRef<HTMLElement>(null)
  const isDark = service.bg === '#0A211F'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const bgColor = service.introBg ?? (isDark ? '#0A211F' : '#DADECF')
  const isBgDark = bgColor === '#0A211F'
  const textColor = isBgDark ? '#F2F4E7' : '#0A211F'
  const mutedColor = isBgDark ? 'rgba(242,244,231,0.38)' : 'rgba(10,33,31,0.38)'
  const borderColor = isBgDark ? 'rgba(242,244,231,0.10)' : 'rgba(10,33,31,0.10)'

  useGSAP(() => {
    gsap.from(['.sss-label', '.sss-heading', '.sss-subtitle', '.sss-body', '.sss-media'], {
      autoAlpha: 0,
      y: 30,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.15,
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
        borderTop: `1px solid ${borderColor}`,
        padding: 'clamp(48px,7vh,96px) clamp(24px,5vw,80px)',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'stretch' : 'center',
        gap: 'clamp(40px,5vw,72px)',
      }}
    >
      <div
        style={{
          flex: '1 1 50%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {service.storyLabel && (
          <p
            className="sss-label"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: mutedColor,
              marginBottom: '2.5rem',
              paddingBottom: '1.5rem',
              borderBottom: `1px solid ${borderColor}`,
            }}
          >
            {service.storyLabel}
          </p>
        )}

        <h2
          className="sss-heading"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(2rem, 3.6vw, 3.75rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: textColor,
            marginBottom: '2rem',
          }}
        >
          {renderInlineHeading(service.storyHeadingLine1 ?? '')}
        </h2>

        {service.storySubtitle && (
          <p
            className="sss-subtitle"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.05rem',
              fontWeight: 400,
              lineHeight: 1.75,
              color: textColor,
              opacity: 0.55,
              maxWidth: '460px',
              marginBottom: service.storyBody ? '1.5rem' : 0,
            }}
          >
            {service.storySubtitle}
          </p>
        )}

        {service.storyBody && (
          <p
            className="sss-body"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.9rem',
              fontWeight: 400,
              lineHeight: 1.75,
              color: textColor,
              opacity: 0.45,
              maxWidth: '460px',
            }}
          >
            {service.storyBody}
          </p>
        )}
      </div>

      {service.storyMediaSrc && (
        <div
          className="sss-media"
          style={{
            flex: '1 1 50%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '20px',
            aspectRatio: service.storyAspectRatio ?? '9/16',
          }}
        >
          {service.storyMediaType === 'image' ? (
            <img
              src={service.storyMediaSrc}
              alt={service.storyLabel ?? ''}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <video
              src={service.storyMediaSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
      )}
    </section>
  )
}
