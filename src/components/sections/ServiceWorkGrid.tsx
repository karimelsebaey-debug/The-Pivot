'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import type { ServiceItem } from '@/lib/services-data'

export function ServiceWorkGrid({ service }: { service: ServiceItem }) {
  const sectionRef = useRef<HTMLElement>(null)
  const isDark = service.bg === '#0A211F'

  useGSAP(() => {
    gsap.from('.swg-card', {
      autoAlpha: 0,
      y: 60,
      duration: 1,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      style={{
        backgroundColor: isDark ? '#12211D' : '#F2F4E7',
        padding: 'clamp(60px,10vh,120px) clamp(24px,5vw,80px)',
      }}
    >
      {/* Section label */}
      <p
        className="text-sm font-semibold uppercase tracking-widest mb-12"
        style={{
          letterSpacing: '0.15em',
          color: isDark ? 'rgba(242,244,231,0.45)' : 'rgba(10,33,31,0.45)',
        }}
      >
        Work Samples
      </p>

      {/* Grid — 1 col mobile, 2 col md, 3 col lg */}
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        style={{ gap: '24px' }}
      >
        {service.videos.map((v) => (
          <div
            key={v.src}
            className="swg-card group relative overflow-hidden"
            style={{ borderRadius: '20px', aspectRatio: '16/10' }}
          >
            <video
              src={v.src}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Label overlay */}
            <div
              className="absolute inset-0 flex items-end p-6"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 55%)',
              }}
            >
              <span
                className="text-sm font-semibold uppercase tracking-widest"
                style={{ color: '#F2F4E7', letterSpacing: '0.12em' }}
              >
                {v.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
