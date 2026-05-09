'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import styles from './Preloader.module.css'

gsap.registerPlugin(useGSAP)

/* 8-tooth gear polygon */
const GEAR_PTS =
  '37,20 32,25 32,32 25,32 20,37 15,32 8,32 8,25 3,20 8,15 8,8 15,8 20,3 25,8 32,8 32,15'

/* Phase messages — specific to The Pivot creative agency */
const PHASES = [
  'Initializing',
  'Calibrating pivot',
  'Clearing the path',
  'Aligning axis',
  'Locking vector',
  'Ready',
]

export function Preloader() {
  const [done, setDone] = useState(false)

  const wrapRef     = useRef<HTMLDivElement>(null)
  const phaseRef    = useRef<HTMLDivElement>(null)
  const pctRef      = useRef<HTMLDivElement>(null)
  const timeRef     = useRef<HTMLDivElement>(null)
  const gearOrbitRef = useRef<HTMLDivElement>(null)

  /* Phase label cycling */
  useEffect(() => {
    let idx = 0
    const phaseId = setInterval(() => {
      idx = (idx + 1) % PHASES.length
      if (phaseRef.current)
        phaseRef.current.innerHTML = PHASES[idx] + '<span>_</span>'
    }, 580)
    const phaseStop = setTimeout(() => clearInterval(phaseId), 2900)
    return () => { clearInterval(phaseId); clearTimeout(phaseStop) }
  }, [])

  /* Percentage counter */
  useEffect(() => {
    let pct = 0
    const id = setInterval(() => {
      pct = Math.min(100, pct + Math.floor(Math.random() * 4) + 1)
      if (pctRef.current) pctRef.current.textContent = pct + '%'
      if (pct >= 100) clearInterval(id)
    }, 38)
    return () => clearInterval(id)
  }, [])

  /* Clock timer */
  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      const elapsed = Date.now() - start
      const s  = String(Math.floor(elapsed / 1000) % 60).padStart(2, '0')
      const ms = String(Math.floor((elapsed % 1000) / 10)).padStart(2, '0')
      if (timeRef.current) timeRef.current.textContent = s + ':' + ms
    }, 16)
    const stop = setTimeout(() => clearInterval(id), 3700)
    return () => { clearInterval(id); clearTimeout(stop) }
  }, [])

  /* Gear orbit — trigonometry RAF, starts at 9-o'clock (left of PIVOT) */
  useEffect(() => {
    const el = gearOrbitRef.current
    if (!el) return

    const CX = 240, CY = 100, RX = 210, RY = 72
    const PERIOD = 8000 // ms — matches textGlow period
    const HALF_SIZE = 11 // 22px gear → center offset
    let startTime: number | null = null
    let rafId: number

    const tick = (ts: number) => {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      // π = 9-o'clock (leftmost point); increases clockwise on screen
      const theta = Math.PI + (elapsed / PERIOD) * Math.PI * 2
      const x = CX + Math.cos(theta) * RX
      const y = CY + Math.sin(theta) * RY
      el.style.transform = `translate(${x - HALF_SIZE}px, ${y - HALF_SIZE}px)`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  /* GSAP exit — starts at 3.0s, fades 0.55s → total 3.55s */
  useGSAP(() => {
    const tl = gsap.timeline({
      delay: 3.0,
      onComplete: () => {
        gsap.set(wrapRef.current, { display: 'none' })
        setDone(true)
      },
    })
    tl.to(wrapRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.55,
      ease: 'power2.in',
    })
  }, { scope: wrapRef })

  if (done) return null

  return (
    <div ref={wrapRef} className={styles.root}>

      {/* Grain + vignette + starlight */}
      <div className={styles.grain}     aria-hidden />
      <div className={styles.vignette}  aria-hidden />
      <div className={styles.starlight} aria-hidden />
      <div className={styles.scanline}  aria-hidden />

      {/* HUD corners */}
      <div className={`${styles.hud} ${styles.hudTl}`}>The Pivot</div>
      <div className={`${styles.hud} ${styles.hudTr}`} ref={timeRef}>00:00</div>
      <div className={`${styles.hud} ${styles.hudBl}`}>v 1.0.0</div>
      <div className={`${styles.hud} ${styles.hudBr}`} ref={pctRef}>0%</div>

      {/* ── Center composition ── */}
      <div className={styles.center}>
        <div className={styles.cosmosWrapper}>

          {/* THE — eyebrow above orbit */}
          <div className={styles.eyebrow}>THE</div>

          {/* Cosmos — 480×200 orbit stage */}
          <div className={styles.cosmos}>

            {/* Layer 1 — full ellipse, dim (orbit back) */}
            <svg
              className={`${styles.orbitSvg} ${styles.orbitBack}`}
              viewBox="0 0 480 200"
              aria-hidden
            >
              <ellipse
                cx="240" cy="100" rx="210" ry="72"
                fill="none"
                stroke="rgba(200,245,66,0.13)"
                strokeWidth="1"
                strokeDasharray="3 9"
              />
            </svg>

            {/* Layer 2 — PIVOT wordmark */}
            <div className={styles.wordmark}>
              <div className={styles.pivot}>PIVOT</div>
            </div>

            {/* Layer 3 — top-half arc, brighter (depth: orbit passes behind PIVOT) */}
            <svg
              className={`${styles.orbitSvg} ${styles.orbitFront}`}
              viewBox="0 0 480 200"
              aria-hidden
            >
              <defs>
                <clipPath id="pl-top-half">
                  <rect x="0" y="0" width="480" height="100" />
                </clipPath>
              </defs>
              <ellipse
                cx="240" cy="100" rx="210" ry="72"
                fill="none"
                stroke="rgba(200,245,66,0.38)"
                strokeWidth="1"
                strokeDasharray="3 9"
                clipPath="url(#pl-top-half)"
              />
            </svg>

            {/* Layer 4 — gear on JS orbit path */}
            <div className={styles.gearOrbit} ref={gearOrbitRef}>
              <div className={styles.corona} aria-hidden />
              <svg
                className={styles.gearSvg}
                viewBox="0 0 40 40"
                width="22"
                height="22"
                aria-hidden
              >
                <defs>
                  <filter id="pl-gg" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle
                  cx="20" cy="20" r="14"
                  fill="rgba(200,245,66,0.06)"
                  filter="url(#pl-gg)"
                />
                <polygon
                  points={GEAR_PTS}
                  fill="none"
                  stroke="#c8f542"
                  strokeWidth="1.3"
                  strokeLinejoin="round"
                  filter="url(#pl-gg)"
                />
                <circle
                  cx="20" cy="20" r="6"
                  fill="none"
                  stroke="#c8f542"
                  strokeWidth="1"
                  filter="url(#pl-gg)"
                />
                <circle cx="20" cy="20" r="2.2" fill="#c8f542" />
              </svg>
            </div>

          </div>
        </div>

        {/* Phase label */}
        <div className={styles.phase} ref={phaseRef}>
          Initializing<span>_</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.bar}>
        <div className={styles.barFill} />
      </div>

    </div>
  )
}
