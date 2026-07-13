import fs from 'fs'
import path from 'path'
import { createHash } from 'crypto'
// Node 18+ has native fetch, FormData, Blob

// Read .env.local
const envRaw = fs.readFileSync(new URL('../.env.local', import.meta.url), 'utf-8')
const env = Object.fromEntries(
  envRaw.split('\n').filter(l => l.includes('=')).map(l => {
    const idx = l.indexOf('=')
    return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()]
  })
)

const CLOUD   = env.CLOUDINARY_CLOUD_NAME
const API_KEY = env.CLOUDINARY_API_KEY
const SECRET  = env.CLOUDINARY_API_SECRET

const FOLDER   = 'the-pivot/hero'
const FILE     = 'C:\\Users\\Dell\\AppData\\Local\\Temp\\claude\\C--Users-Dell--claude\\b875116e-5436-4f79-acea-baab722885dd\\scratchpad\\hero-day-cycle.mp4'
const SLUG     = 'hero-day-cycle'

function sign(params) {
  const str = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&') + SECRET
  return createHash('sha256').update(str).digest('hex')
}

async function upload() {
  const public_id = `${FOLDER}/${SLUG}`
  const timestamp = Math.floor(Date.now() / 1000)
  const sig = sign({ invalidate: 'true', public_id, timestamp })

  const fileBuffer = fs.readFileSync(FILE)
  const blob = new Blob([fileBuffer], { type: 'video/mp4' })

  const form = new FormData()
  form.append('file', blob, path.basename(FILE))
  form.append('public_id', public_id)
  form.append('invalidate', 'true')
  form.append('timestamp', String(timestamp))
  form.append('api_key', API_KEY)
  form.append('signature', sig)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/video/upload`, {
    method: 'POST',
    body: form,
  })

  const data = await res.json()
  if (data.secure_url) {
    console.log(`OK  Video.mp4`)
    console.log(`    -> ${data.secure_url}`)
    return { filename: 'Video.mp4', public_id: data.public_id, url: data.secure_url, bytes: data.bytes, duration: data.duration }
  } else {
    console.error(`ERR Video.mp4:`, data.error?.message)
    return { filename: 'Video.mp4', error: data.error?.message }
  }
}

const result = await upload()

fs.writeFileSync(
  new URL('./hero-video-result.json', import.meta.url),
  JSON.stringify(result, null, 2)
)
console.log('\nDone. Result in scripts/hero-video-result.json')
