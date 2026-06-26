'use client'

import { useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useLenis } from '@/lib/lenis'

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prevPath = useRef<string>(pathname)
  const lenis = useLenis()

  useEffect(() => {
    if (prevPath.current === pathname) {
      /* Initial load — preloader handles reveal, just ensure content visible */
      gsap.set(contentRef.current, { autoAlpha: 1 })
      prevPath.current = pathname
      return
    }

    /* Route change — reset scroll first so new page always starts at top */
    prevPath.current = pathname
    const overlay = overlayRef.current
    const content = contentRef.current
    if (!overlay || !content) return

    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true })

    const tl = gsap.timeline({
      onComplete: () => ScrollTrigger.refresh(),
    })
    tl.set(overlay, { autoAlpha: 1, yPercent: 0 })
      .to(overlay, { yPercent: -100, duration: 0.7, ease: 'power4.inOut', delay: 0.05 })
      .from(content, { autoAlpha: 0, duration: 0.6, ease: 'power3.out' }, '-=0.25')
      .set(overlay, { autoAlpha: 0 })
  }, [pathname, lenis])

  return (
    <>
      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#0A211F',
          zIndex: 9998,
          opacity: 0,
          pointerEvents: 'none',
        }}
      />
      <div ref={contentRef}>
        {children}
      </div>
    </>
  )
}
