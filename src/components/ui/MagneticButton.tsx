'use client'

import { useRef, useEffect, ReactNode } from 'react'
import { gsap } from '@/lib/gsap'

interface MagneticButtonProps {
  children: ReactNode
  strength?: number
  className?: string
  style?: React.CSSProperties
}

export function MagneticButton({ children, strength = 0.28, className, style }: MagneticButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null)

  /* useEffect is legitimate here — this is DOM event binding, not a GSAP animation */
  useEffect(() => {
    const el = btnRef.current
    if (!el) return

    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'elastic.out(1,0.3)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'elastic.out(1,0.3)' })

    const move = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      xTo((e.clientX - rect.left - rect.width  / 2) * strength)
      yTo((e.clientY - rect.top  - rect.height / 2) * strength)
    }
    const reset = () => { xTo(0); yTo(0) }

    el.addEventListener('mousemove', move)
    el.addEventListener('mouseleave', reset)

    return () => {
      el.removeEventListener('mousemove', move)
      el.removeEventListener('mouseleave', reset)
    }
  }, [strength])

  return (
    <div ref={btnRef} className={className} style={{ display: 'inline-block', ...style }}>
      {children}
    </div>
  )
}
