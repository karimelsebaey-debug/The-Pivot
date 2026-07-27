/**
 * Hero scroll-sequence asset manifest.
 *
 * Assets live on Cloudinary under `the-pivot/hero/` — uploaded by
 * `scripts/upload-hero-frames.mjs`. Delivery URLs omit the version segment so
 * re-uploading a frame (the script passes `invalidate: true`) does not require
 * touching this file.
 *
 * Source: The_Pivot_Hero_Frames_REvised.mp4 — 1942x1080 @24fps, every 4th
 * frame, cropped to 1920x1080 and scaled to 1600w WebP q70. Mobile stills are
 * the source's own 8 portrait day-cycle renders (sunrise -> first light),
 * cropped to 9:16 and scaled to 1080x1920 WebP q70, plus a 9th frame
 * (mob_09 = mob_01, sunrise repeated) so the mobile cycle loops seamlessly.
 */

const CLOUD_NAME = 'dn21xgyhb'
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/the-pivot/hero`

/**
 * Cache-bust key — Cloudinary's `invalidate: true` purges the CDN edge on
 * re-upload, but browsers that already fetched a frame under this exact URL
 * keep serving it from disk cache for up to 30 days (Cloudinary's
 * `max-age=2592000`). Bump this to the upload timestamp printed by
 * `scripts/upload-hero-frames.mjs` (see `scripts/hero-frames-result.json` ->
 * any asset's `v<digits>` version segment) every time frames are re-uploaded.
 */
const ASSET_VERSION = '1785095958'

/** Desktop canvas frames — 1600x900 WebP, ~58 KB each, 8.3 MB total. */
export const HERO_FRAME_COUNT = 147

/** Mobile day-cycle stills — 1080x1920 WebP, ~116 KB each, 928 KB total. Frame 9 repeats frame 1 to close the loop. */
export const HERO_MOBILE_COUNT = 9

/** First frame as JPEG — used as the LCP paint and the reduced-motion fallback. */
export const HERO_POSTER = `${BASE}/poster.jpg?v=${ASSET_VERSION}`

/** 1-based frame index -> delivery URL (`frame_0001` … `frame_0147`). */
export function heroFrameUrl(index: number): string {
  return `${BASE}/frames/frame_${String(index).padStart(4, '0')}.webp?v=${ASSET_VERSION}`
}

/** 1-based still index -> delivery URL (`mob_01` … `mob_09`). */
export function heroMobileUrl(index: number): string {
  return `${BASE}/mobile/mob_${String(index).padStart(2, '0')}.webp?v=${ASSET_VERSION}`
}

/** All desktop frame URLs, ordered. */
export const HERO_FRAME_URLS: readonly string[] = Array.from(
  { length: HERO_FRAME_COUNT },
  (_, i) => heroFrameUrl(i + 1)
)

/** All mobile still URLs, ordered sunrise -> first light. */
export const HERO_MOBILE_URLS: readonly string[] = Array.from(
  { length: HERO_MOBILE_COUNT },
  (_, i) => heroMobileUrl(i + 1)
)
