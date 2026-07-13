'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'

const IMAGES = [
  '/images/hero-mobile/01-sunrise.jpg',
  '/images/hero-mobile/02-morning.jpg',
  '/images/hero-mobile/03-afternoon.jpg',
  '/images/hero-mobile/04-sunset.jpg',
  '/images/hero-mobile/05-blue-hour.jpg',
  '/images/hero-mobile/06-night.jpg',
]

const HOLD = 4.5
const DIP  = 1.1
const STEP = HOLD + DIP
const KEN_BURNS_DURATION = STEP * IMAGES.length / IMAGES.length + 2.5

export function HeroMobileDayCycle() {
  const rootRef = useRef<HTMLDivElement>(null)
  const imgRefs = useRef<(HTMLImageElement | null)[]>([])

  useGSAP(() => {
    /* crossfade — direct dissolve over a solid-black backdrop, no held black beat */
    const tl = gsap.timeline({ repeat: -1 })
    IMAGES.forEach((_, i) => {
      const next = (i + 1) % IMAGES.length
      const t = i * STEP
      tl.to(imgRefs.current[i],    { opacity: 0, duration: DIP, ease: 'sine.inOut' }, t + HOLD)
        .to(imgRefs.current[next], { opacity: 1, duration: DIP, ease: 'sine.inOut' }, t + HOLD)
    })

    /* continuous slow Ken Burns push-in per image so nothing ever sits dead-static */
    imgRefs.current.forEach((img, i) => {
      if (!img) return
      gsap.fromTo(
        img,
        { scale: 1 },
        {
          scale: 1.09,
          duration: KEN_BURNS_DURATION,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.4,
        }
      )
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef} style={{ position: 'absolute', inset: 0, background: '#000', overflow: 'hidden' }}>
      {IMAGES.map((src, i) => (
        <img
          key={src}
          ref={el => { imgRefs.current[i] = el }}
          src={src}
          alt=""
          aria-hidden="true"
          loading={i === 0 ? 'eager' : 'lazy'}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: '88% 50%',
            transformOrigin: '60% 45%',
            opacity: i === 0 ? 1 : 0,
          }}
        />
      ))}
    </div>
  )
}
