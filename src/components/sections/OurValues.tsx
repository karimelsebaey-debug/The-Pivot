'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const VALUES = [
  {
    label: 'Be Kind',
    heading: 'We build an environment where ambitious talent thrives.',
    body: 'We give honest, constructive feedback — and we look out for each other, personally and professionally.',
  },
  {
    label: 'Seek The Truth',
    heading: "We're transparent, direct, and honest — even when it's uncomfortable.",
    body: "Facts over feelings. We treat our beliefs as hypotheses, and we change course fast when we're wrong.",
  },
  {
    label: 'Speed Is Safety',
    heading: 'Moving fast is safer than moving slow.',
    body: 'We choose what not to do, take the shortest effective path, and iterate from there.',
  },
  {
    label: 'Roll Up Your Sleeves',
    heading: "We pull our weight, and we're happy to take one for the team.",
    body: 'No task is beneath us. We execute with rigor, focus, and zero ego.',
  },
  {
    label: 'Lead With Quality',
    heading: 'We hold ourselves to a high standard and own our outcomes.',
    body: 'Excellence is a team effort — built through the structures and habits we design together.',
  },
]

export function OurValues() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from('.ov-item', {
      autoAlpha: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: ref })

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: 'var(--color-bg)',
        padding: 'clamp(64px,10vh,120px) clamp(24px,5vw,80px)',
      }}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ maxWidth: '1216px', margin: '0 auto', gap: 'clamp(40px, 6vw, 96px)' }}
      >
        <div style={{ position: 'relative' }}>
          <div className="md:sticky" style={{ top: 'calc(var(--header-height) + 40px)' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#A8885A',
              marginBottom: '1.25rem',
            }}>
              Our Values
            </p>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '4 / 5', borderRadius: 8, overflow: 'hidden' }}>
              <img
                src="/images/perspectives/our-team.jpeg"
                alt="The Pivot team"
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        <div>
          {VALUES.map((value, i) => (
            <div
              key={value.label}
              className="ov-item"
              style={{
                paddingBottom: 'clamp(32px, 4vw, 56px)',
                marginBottom: 'clamp(32px, 4vw, 56px)',
                borderBottom: i < VALUES.length - 1 ? '1px solid var(--color-border)' : 'none',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-ink)',
                opacity: 0.45,
                marginBottom: '1rem',
              }}>
                {value.label}
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)',
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
                marginBottom: '0.85rem',
              }}>
                {value.heading}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                lineHeight: 1.65,
                color: 'var(--color-ink)',
                opacity: 0.6,
                maxWidth: '48ch',
              }}>
                {value.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
