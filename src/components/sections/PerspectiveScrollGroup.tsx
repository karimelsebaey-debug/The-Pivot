'use client'

import { Children, useRef, type ReactNode } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function PerspectiveScrollGroup({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const pages = Children.toArray(children)

  useGSAP(() => {
    const pageEls = gsap.utils.toArray<HTMLElement>('.ps-page', ref.current ?? undefined)
    if (pageEls.length < 2) return

    // Mobile stacks each split's image+text vertically (taller than one screen),
    // so the pinned overlay only runs at md+ where the pin's 100dvh assumption holds.
    ScrollTrigger.matchMedia({
      '(min-width: 768px)': () => {
        pageEls.forEach((el, i) => gsap.set(el, { yPercent: i === 0 ? 0 : 100 }))

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top top',
            end: () => `+=${(pageEls.length - 1) * window.innerHeight}`,
            scrub: 1,
            pin: true,
            snap: 1 / (pageEls.length - 1),
          },
        })

        pageEls.forEach((page, i) => {
          if (i === 0) return
          tl.fromTo(page, { yPercent: 100 }, { yPercent: 0, ease: 'none', duration: 1 }, i - 1)
        })
      },
    })
  }, { scope: ref })

  return (
    <div ref={ref} className="relative md:h-[100dvh] md:overflow-hidden">
      {pages.map((page, i) => (
        <div key={i} className="ps-page md:absolute md:inset-0 md:h-full">
          {page}
        </div>
      ))}
    </div>
  )
}
