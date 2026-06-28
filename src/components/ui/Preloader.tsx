'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { PAGE_CONTENT_ID } from '@/lib/utils'

// Survives StrictMode double-mount, resets on hard refresh
let _hasPlayed = false

export function Preloader() {
  const [done, setDone] = useState(() => _hasPlayed)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    const video = videoRef.current
    if (_hasPlayed) {
      // Already played — reveal page content immediately
      const el = document.getElementById(PAGE_CONTENT_ID)
      if (el) el.style.visibility = 'visible'
      return
    }
    if (!video) return
    _hasPlayed = true

    const exit = () => {
      gsap.to(wrapRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          const el = document.getElementById(PAGE_CONTENT_ID)
          if (el) el.style.visibility = 'visible'
          setDone(true)
        },
      })
    }

    const onEnded = () => gsap.delayedCall(0.2, exit)

    const startPlay = () => {
      video.currentTime = 0
      video.addEventListener('ended', onEnded, { once: true })
      video.addEventListener('pause', () => {
        if (!video.ended) gsap.delayedCall(0.3, exit)
      }, { once: true })
      video.play().catch(() => gsap.delayedCall(3, exit))
    }

    if (video.readyState >= 3) {
      startPlay()
    } else {
      video.addEventListener('canplay', startPlay, { once: true })
    }

    const hardTimer = setTimeout(exit, 4500)

    return () => {
      video.removeEventListener('canplay', startPlay)
      video.removeEventListener('ended', onEnded)
      clearTimeout(hardTimer)
    }
  }, { scope: wrapRef })

  if (done) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        willChange: 'transform',
      }}
    >
      <video
        ref={videoRef}
        src="/videos/logo-reveal.mp4"
        preload="auto"
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
