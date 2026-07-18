'use client'

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/lib/gsap'
import { PAGE_CONTENT_ID } from '@/lib/utils'

// Module-level guards survive React StrictMode's dev-only double-invoke of
// this effect (which can create two independent closures for one mount) —
// sharing these flags across both invocations ensures only one of them ever
// actually plays the video or runs the exit animation.
let _hasPlayed = false
let _hasExited = false

export function Preloader() {
  const [done, setDone] = useState(() => _hasExited)
  const wrapRef  = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useGSAP(() => {
    const video = videoRef.current

    const reveal = () => {
      const el = document.getElementById(PAGE_CONTENT_ID)
      if (el) el.style.visibility = 'visible'
    }

    const exit = () => {
      if (_hasExited) return
      _hasExited = true
      const el = document.getElementById('app-preloader')
      if (!el) {
        reveal()
        setDone(true)
        return
      }
      gsap.to(el, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
        onComplete: () => {
          reveal()
          setDone(true)
        },
      })
      // Failsafe — guarantees the overlay clears even if onComplete never fires.
      setTimeout(() => {
        reveal()
        setDone(true)
      }, 1200)
    }

    if (_hasExited) {
      // A prior invocation already finished exiting — mirror its end state.
      reveal()
      setDone(true)
      return
    }

    if (!video || _hasPlayed) return
    _hasPlayed = true

    const onEnded = () => gsap.delayedCall(0.2, exit)

    const startPlay = () => {
      video.currentTime = 0
      // {once:true} listeners self-detach on fire — do not remove them in
      // effect cleanup, or React StrictMode's dev-only double-invoke tears
      // them down before the video naturally ends and the overlay never exits.
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

    setTimeout(exit, 4500)
  }, { scope: wrapRef })

  if (done) return null

  return (
    <div
      ref={wrapRef}
      id="app-preloader"
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
