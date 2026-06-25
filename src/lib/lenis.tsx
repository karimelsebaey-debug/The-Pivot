'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const LenisContext = createContext<Lenis | null>(null)

export function useLenis() {
  return useContext(LenisContext)
}

export function LenisProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    setLenis(instance)

    instance.on('scroll', ScrollTrigger.update as () => void)

    const rafCb = (time: number) => instance.raf(time * 1000)
    gsap.ticker.add(rafCb)
    gsap.ticker.lagSmoothing(0)

    /* Children (HeroCanvas, VerticalLoopHero) run useGSAP before this parent
       effect fires. Without refresh(), pin spacer sits at wrong offset and
       the hero pin never releases, blocking sections below. */
    ScrollTrigger.refresh()

    // Debounced resize — avoids forced reflow on every pixel of resize
    let resizeTimer: ReturnType<typeof setTimeout>
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 200)
    }
    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      instance.off('scroll', ScrollTrigger.update as () => void)
      instance.destroy()
      gsap.ticker.remove(rafCb)
    }
  }, [])

  return (
    <LenisContext.Provider value={lenis}>
      {children}
    </LenisContext.Provider>
  )
}
