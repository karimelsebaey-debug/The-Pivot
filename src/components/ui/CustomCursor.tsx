'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = cursorRef.current
    if (!el) return

    gsap.set(el, { x: -200, y: -200 })

    let mouseX = -200, mouseY = -200
    let curX   = -200, curY   = -200
    let rafId: number
    let visible = false

    function onMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!visible) {
        visible = true
        gsap.to(el, { opacity: 1, duration: 0.4, ease: 'power2.out' })
      }
    }

    function animate() {
      curX += (mouseX - curX) * 0.13
      curY += (mouseY - curY) * 0.13
      // hotspot = tip of stem = top-center of element
      gsap.set(el, { x: curX - 13, y: curY })
      rafId = requestAnimationFrame(animate)
    }

    // Hover: tilt + scale down slightly
    function onOver(e: MouseEvent) {
      if (!(e.target as Element).closest('a, button, [role="button"]')) return
      gsap.to(el, { rotate: -18, scale: 0.88, duration: 0.3, ease: 'power2.out' })
    }
    function onOut(e: MouseEvent) {
      if (!(e.target as Element).closest('a, button, [role="button"]')) return
      gsap.to(el, { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.out' })
    }
    // Click: quick squish
    function onClick() {
      gsap.timeline()
        .to(el, { scaleY: 0.88, scaleX: 1.06, duration: 0.1 })
        .to(el, { scaleY: 1,    scaleX: 1,    duration: 0.35, ease: 'elastic.out(1,0.5)' })
    }

    window.addEventListener('mousemove', onMove,   { passive: true })
    document.addEventListener('mouseover',  onOver)
    document.addEventListener('mouseout',   onOut)
    document.addEventListener('mousedown',  onClick)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onOver)
      document.removeEventListener('mouseout',   onOut)
      document.removeEventListener('mousedown',  onClick)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0, left: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0,
        willChange: 'transform',
        transformOrigin: 'top center',
      }}
    >
      <svg
        width="26" height="62" viewBox="0 0 26 62"
        fill="none"
        style={{ display: 'block', filter: 'drop-shadow(0 4px 12px rgba(10,33,31,0.30))' }}
      >
        <defs>
          {/* Mouse body — 3D cylinder gradient */}
          <linearGradient id="cc-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.18)" />
            <stop offset="25%"  stopColor="#B0B8A8" />
            <stop offset="65%"  stopColor="#8A9280" />
            <stop offset="100%" stopColor="#5C6859" />
          </linearGradient>
          {/* Specular highlight */}
          <radialGradient id="cc-spec" cx="30%" cy="20%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.30)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          {/* Scroll dot sphere */}
          <radialGradient id="cc-dot" cx="35%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.95)" />
            <stop offset="45%"  stopColor="#B8943C" />
            <stop offset="100%" stopColor="#6B4A10" />
          </radialGradient>
          {/* Inner rim */}
          <linearGradient id="cc-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,0.10)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.06)" />
          </linearGradient>
        </defs>

        {/* ── Stem line (hotspot at top) ── */}
        <line
          x1="13" y1="0" x2="13" y2="16"
          stroke="rgba(10,33,31,0.35)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* ── Mouse body ── */}
        {/* Drop shadow shape */}
        <rect x="2.5" y="19" width="21" height="38" rx="10.5"
          fill="rgba(10,33,31,0.15)" />

        {/* Base fill */}
        <rect x="1" y="17" width="24" height="40" rx="12"
          fill="url(#cc-body)" />

        {/* Inner rim overlay */}
        <rect x="1" y="17" width="24" height="40" rx="12"
          fill="url(#cc-rim)" />

        {/* Outer border */}
        <rect x="1" y="17" width="24" height="40" rx="12"
          stroke="rgba(10,33,31,0.22)" strokeWidth="1" fill="none" />

        {/* Left edge highlight */}
        <rect x="2.5" y="21" width="1.2" height="28" rx="0.6"
          fill="rgba(255,255,255,0.25)" />

        {/* Right edge shadow */}
        <rect x="22.3" y="21" width="1.2" height="28" rx="0.6"
          fill="rgba(0,0,0,0.22)" />

        {/* Center divider */}
        <line x1="13" y1="19" x2="13" y2="31"
          stroke="rgba(10,33,31,0.15)" strokeWidth="0.8" />

        {/* Specular overlay */}
        <rect x="1" y="17" width="24" height="40" rx="12"
          fill="url(#cc-spec)" />

        {/* Scroll dot — gold sphere */}
        <circle cx="13" cy="30" r="3.2"
          fill="url(#cc-dot)" />
      </svg>
    </div>
  )
}
