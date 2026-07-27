'use client'

import { useEffect, useRef, type RefObject } from 'react'
import { ScrollTrigger } from '@/lib/gsap'

/**
 * Scroll-driven canvas frame sequence — paints a full-bleed canvas, reading
 * scroll progress off `triggerRef` (the ancestor scroll runway). The caller
 * owns layout, sizing, and the runway/sticky structure, and supplies which
 * frame set to paint (desktop's 147-frame set or mobile's 8-still set).
 */

/** Load every Nth frame first so something paints before the full set arrives. */
const COARSE_STRIDE = 8

/** Parallel image requests during the fill-in pass. */
const FILL_CONCURRENCY = 12

/** Per-frame easing toward the scroll target. Lower = more silk, more lag. */
const LERP = 0.12

/** Below this frame delta the loop parks itself instead of burning rAF. */
const SETTLE_EPSILON = 0.02

type Props = {
  /** Scroll runway element — progress 0..1 over its full height drives the frame index. */
  triggerRef: RefObject<HTMLElement | null>
  /** Ordered frame delivery URLs. */
  frameUrls: readonly string[]
  /** Frame count — must equal `frameUrls.length`. */
  frameCount: number
  /** First-paint / reduced-motion fallback image. */
  poster: string
  /** Horizontal crop anchor, 0..1 — same convention as CSS `object-position` (0.5 = centered, 1 = right-anchored). */
  focalX?: number
}

export function HeroCanvasFrames({ triggerRef, frameUrls, frameCount, poster, focalX = 0.5 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = triggerRef.current
    if (!canvas || !section) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const images: (HTMLImageElement | null)[] = new Array(frameCount).fill(null)
    let disposed = false

    /* ── frame lookup ─────────────────────────────────────────────────────── */

    /** Nearest decoded frame to `index`, searching outward. Null until the first lands. */
    function nearestLoaded(index: number): HTMLImageElement | null {
      const exact = images[index]
      if (exact) return exact
      for (let offset = 1; offset < frameCount; offset++) {
        const before = images[index - offset]
        if (before) return before
        const after = images[index + offset]
        if (after) return after
      }
      return null
    }

    /* ── painting ─────────────────────────────────────────────────────────── */

    let canvasWidth = 0
    let canvasHeight = 0

    function resize() {
      // Cap DPR at 2 — beyond that the extra pixels cost far more than they show.
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas!.getBoundingClientRect()
      canvasWidth = rect.width
      canvasHeight = rect.height
      canvas!.width = Math.round(rect.width * dpr)
      canvas!.height = Math.round(rect.height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.imageSmoothingEnabled = true
      ctx!.imageSmoothingQuality = 'high'
    }

    /** Draws `img` cover-fit (crop overflow, never letterbox), anchored horizontally at `focalX`. */
    function paint(img: HTMLImageElement) {
      if (!canvasWidth || !canvasHeight) return
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height)
      const drawWidth = img.width * scale
      const drawHeight = img.height * scale
      ctx!.drawImage(
        img,
        (canvasWidth - drawWidth) * focalX,
        (canvasHeight - drawHeight) / 2,
        drawWidth,
        drawHeight
      )
    }

    let paintedIndex = -1

    function paintIndex(index: number, force = false) {
      const clamped = Math.max(0, Math.min(frameCount - 1, index))
      if (clamped === paintedIndex && !force) return
      const img = nearestLoaded(clamped)
      if (!img) return
      paint(img)
      paintedIndex = clamped
    }

    /* ── scroll -> frame, smoothed ────────────────────────────────────────── */

    let targetFrame = 0
    let currentFrame = 0
    let rafId = 0

    function tick() {
      rafId = 0
      const delta = targetFrame - currentFrame
      if (Math.abs(delta) < SETTLE_EPSILON) {
        currentFrame = targetFrame
        paintIndex(Math.round(currentFrame))
        return // settled — stop the loop until the next scroll event
      }
      currentFrame += delta * LERP
      paintIndex(Math.round(currentFrame))
      rafId = requestAnimationFrame(tick)
    }

    function requestTick() {
      if (!rafId) rafId = requestAnimationFrame(tick)
    }

    /* ── progressive loading ──────────────────────────────────────────────── */

    function load(index: number): Promise<void> {
      return new Promise(resolve => {
        if (images[index]) return resolve()
        const img = new Image()
        img.decoding = 'async'
        img.src = frameUrls[index]
        img.onload = () => {
          if (!disposed) {
            images[index] = img
            // Repaint if this frame is a better match than what is on screen.
            if (paintedIndex === -1 || Math.round(currentFrame) === index) {
              paintIndex(Math.round(currentFrame), true)
            }
          }
          resolve()
        }
        img.onerror = () => resolve() // a dropped frame degrades to its neighbour
      })
    }

    async function loadAll() {
      // Pass 1 — a coarse pass so the whole cycle is representable immediately.
      const coarse: number[] = []
      for (let i = 0; i < frameCount; i += COARSE_STRIDE) coarse.push(i)
      await Promise.all(coarse.map(load))
      if (disposed) return

      // Pass 2 — everything else, bounded so the network is not flooded.
      const rest = Array.from({ length: frameCount }, (_, i) => i).filter(
        i => i % COARSE_STRIDE !== 0
      )
      let cursor = 0
      const workers = Array.from({ length: FILL_CONCURRENCY }, async () => {
        while (cursor < rest.length && !disposed) {
          await load(rest[cursor++])
        }
      })
      await Promise.all(workers)
    }

    /* ── wire-up ──────────────────────────────────────────────────────────── */

    resize()

    if (reducedMotion) {
      // No scroll animation: paint the poster once and leave it.
      const posterImg = new Image()
      posterImg.decoding = 'async'
      posterImg.src = poster
      posterImg.onload = () => {
        if (!disposed) paint(posterImg)
      }
      const onResizeStatic = () => {
        resize()
        if (posterImg.complete) paint(posterImg)
      }
      window.addEventListener('resize', onResizeStatic)
      return () => {
        disposed = true
        window.removeEventListener('resize', onResizeStatic)
      }
    }

    void loadAll()

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => {
        targetFrame = self.progress * (frameCount - 1)
        requestTick()
      },
    })

    const onResize = () => {
      resize()
      paintIndex(Math.round(currentFrame), true)
    }
    window.addEventListener('resize', onResize)

    return () => {
      disposed = true
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      trigger.kill()
    }
  }, [triggerRef, frameUrls, frameCount, poster, focalX])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
    />
  )
}
