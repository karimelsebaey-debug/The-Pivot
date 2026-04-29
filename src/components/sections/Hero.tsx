'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const line1Ref = useRef<HTMLSpanElement>(null)
  const line2Ref = useRef<HTMLSpanElement>(null)
  const line3Ref = useRef<HTMLSpanElement>(null)
  const svgLineRef = useRef<SVGPathElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation on load
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from([line1Ref.current, line2Ref.current, line3Ref.current], {
        yPercent: 110,
        opacity: 0,
        stagger: 0.1,
        duration: 1.1,
      })
        .from(subRef.current, { opacity: 0, y: 16, duration: 0.8 }, '-=0.5')
        .from(ctaRef.current, { opacity: 0, y: 16, duration: 0.7 }, '-=0.5')

      // SVG line draw on scroll
      if (svgLineRef.current) {
        const length = svgLineRef.current.getTotalLength()
        gsap.set(svgLineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom center',
          scrub: 1.5,
          onUpdate: (self) => {
            if (svgLineRef.current) {
              gsap.set(svgLineRef.current, {
                strokeDashoffset: length * (1 - self.progress),
              })
            }
          },
        })
      }

      // Parallax on scroll
      gsap.to('.hero-bg-shape', {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{
        paddingTop: 'calc(var(--header-height) + 80px)',
        paddingBottom: '80px',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      {/* Parallax background accent */}
      <div
        className="hero-bg-shape absolute top-1/4 right-0 w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{
          backgroundColor: 'var(--color-accent)',
          opacity: 0.18,
          filter: 'blur(80px)',
        }}
      />

      <div className="container relative z-10" style={{ maxWidth: 'var(--container-max)', margin: '0 auto', padding: '0 var(--container-px)' }}>

        {/* Eyebrow */}
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-10"
          style={{ color: 'var(--color-ink-muted)', letterSpacing: '0.15em' }}
        >
          Creative Platform
        </p>

        {/* Headline */}
        <h1
          className="overflow-hidden"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: '2.5rem',
          }}
        >
          <span className="block overflow-hidden">
            <span ref={line1Ref} className="block">The Turning</span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line2Ref} className="block">Point For Your</span>
          </span>
          <span className="block overflow-hidden">
            <span ref={line3Ref} className="block italic" style={{ color: 'var(--color-ink)' }}>
              Creative Ambition.
            </span>
          </span>
        </h1>

        {/* SVG decorative line */}
        <svg
          className="absolute right-8 top-1/2 hidden lg:block"
          width="1"
          height="300"
          viewBox="0 0 1 300"
          fill="none"
          style={{ transform: 'translateY(-50%)' }}
        >
          <path
            ref={svgLineRef}
            d="M0.5 0V300"
            stroke="var(--color-ink)"
            strokeWidth="1"
            strokeOpacity="0.2"
          />
        </svg>

        {/* Sub + CTA row */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-10 sm:gap-20">
          <p
            ref={subRef}
            className="max-w-md leading-relaxed"
            style={{
              color: 'var(--color-ink)',
              fontSize: '1.05rem',
              fontWeight: 400,
              letterSpacing: '-0.01em',
              lineHeight: 1.7,
            }}
          >
            We transform ambitious ideas and needs into visual presence,
            specialized services, and digital solutions —{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 700 }}>
              built to last, impossible to ignore.
            </em>
          </p>

          <div ref={ctaRef} className="flex items-center gap-4">
            <Link
              href="#work"
              className="inline-flex items-center gap-3 text-sm font-semibold arrow-btn"
              style={{
                backgroundColor: 'var(--color-ink)',
                color: 'var(--color-bg)',
                borderRadius: 'var(--radius-xl)',
                padding: '14px 28px',
                transition: 'padding var(--t-std) var(--ease)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.padding = '16px 36px' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.padding = '14px 28px' }}
            >
              See Our Work
              <svg className="arrow-out" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg className="arrow-in" width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href="/contact"
              className="text-sm font-semibold"
              style={{
                color: 'var(--color-ink)',
                padding: '14px 20px',
                borderRadius: 'var(--radius-xl)',
                border: '1.5px solid var(--color-ink)',
                transition: 'padding var(--t-std) var(--ease), background-color var(--t-std) var(--ease), color var(--t-std) var(--ease)',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.padding = '16px 28px'
                el.style.backgroundColor = 'var(--color-ink)'
                el.style.color = 'var(--color-bg)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.padding = '14px 20px'
                el.style.backgroundColor = 'transparent'
                el.style.color = 'var(--color-ink)'
              }}
            >
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
