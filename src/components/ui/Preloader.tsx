'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

gsap.registerPlugin(useGSAP)

export function Preloader() {
  const [done, setDone] = useState(false)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  /* Block scroll while preloader is visible */
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useGSAP(() => {
    const video = videoRef.current
    if (!video) return

    const exit = () => {
      gsap.to(wrapRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(wrapRef.current, { display: 'none' })
          document.body.style.overflow = ''
          setDone(true)
        },
      })
    }

    let endedFallback: ReturnType<typeof setTimeout>

    const startPlay = () => {
      video.currentTime = 0
      video.playbackRate = 1.2
      video.play().catch(exit)
      video.addEventListener('ended', exit, { once: true })
      // 6s / 1.2x = 5s + 1.5s buffer
      endedFallback = setTimeout(exit, 6500)
    }

    // If already buffered, start immediately; otherwise wait for canplay
    if (video.readyState >= 3) {
      startPlay()
    } else {
      video.addEventListener('canplay', startPlay, { once: true })
    }

    // Hard fallback if canplay never fires (e.g. video fails to load)
    const hardFallback = setTimeout(exit, 9000)

    return () => {
      video.removeEventListener('canplay', startPlay)
      video.removeEventListener('ended', exit)
      clearTimeout(endedFallback)
      clearTimeout(hardFallback)
    }
  }, { scope: wrapRef })

  if (done) return null

  return (
    <div
      ref={wrapRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#071C1C',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 99999,
        willChange: 'opacity',
      }}
    >
      <div style={{
        width: 'min(600px, 56vmin)',
        height: 'min(600px, 56vmin)',
        flexShrink: 0,
        maskImage: 'radial-gradient(ellipse 72% 72% at 50% 52%, black 38%, transparent 72%)',
        WebkitMaskImage: 'radial-gradient(ellipse 72% 72% at 50% 52%, black 38%, transparent 72%)',
      }}>
        <video
          ref={videoRef}
          src="https://res.cloudinary.com/dn21xgyhb/video/upload/q_auto,f_auto/the-pivot/videos/preloader/preloader.mp4"
          preload="auto"
          autoPlay
          muted
          playsInline
          className="preloader-video"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
