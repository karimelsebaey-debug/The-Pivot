'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { renderInlineHeading } from '@/lib/inline-heading'

type Props = {
  image: string
  imageAlt: string
  imageSide: 'left' | 'right'
  label?: string
  heading: string
  body?: string
  fullHeight?: boolean
}

export function PerspectiveSplit({ image, imageAlt, imageSide, label, heading, body, fullHeight }: Props) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (fullHeight) return
    gsap.from(['.ps-label', '.ps-heading', '.ps-body'], {
      autoAlpha: 0,
      y: 24,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 78%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  const imageEl = (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 360 }}>
      <img
        src={image}
        alt={imageAlt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  )

  const textEl = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'clamp(40px, 6vw, 96px)',
      minHeight: 360,
    }}>
      {label && (
        <p className="ps-label" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.75rem',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#A8885A',
          marginBottom: '1.5rem',
        }}>
          {label}
        </p>
      )}
      <h2 className="ps-heading" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.25rem, 4.2vw, 3.5rem)',
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        color: '#F2F4E7',
        marginBottom: body ? '1.75rem' : 0,
      }}>
        {renderInlineHeading(heading)}
      </h2>
      {body && (
        <p className="ps-body" style={{
          fontFamily: 'var(--font-body)',
          fontSize: '1.05rem',
          lineHeight: 1.75,
          color: 'rgba(242,244,231,0.65)',
          maxWidth: '48ch',
        }}>
          {body}
        </p>
      )}
    </div>
  )

  return (
    <section
      ref={ref}
      className={`grid grid-cols-1 md:grid-cols-2${fullHeight ? ' ps-section md:h-[100dvh]' : ''}`}
      style={{ backgroundColor: '#0A211F' }}
    >
      {imageSide === 'left' ? (
        <>
          <div className="order-2 md:order-1">{imageEl}</div>
          <div className="order-1 md:order-2">{textEl}</div>
        </>
      ) : (
        <>
          <div>{textEl}</div>
          <div>{imageEl}</div>
        </>
      )}
    </section>
  )
}

export type { Props as PerspectiveSplitProps }
