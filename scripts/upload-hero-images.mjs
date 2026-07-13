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

const FOLDER = 'the-pivot/hero'
const LOCAL_DIR = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Services\\Hero\\New'

const FILES = [
  ['1_Sunrise.jpeg',   'day-1-sunrise'],
  ['2_Morning.jpeg',   'day-2-morning'],
  ['3_Afternoon.jpeg', 'day-3-afternoon'],
  ['4_Sunset.jpeg',    'day-4-sunset'],
  ['5_Blue Hour.jpeg', 'day-5-bluehour'],
  ['6_Night.jpeg',     'day-6-night'],
]

function sign(params) {
  const str = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&') + SECRET
  return createHash('sha256').update(str).digest('hex')
}

async function upload(filename, slug) {
  const public_id = `${FOLDER}/${slug}`
  const timestamp = Math.floor(Date.now() / 1000)

  const sig = sign({ public_id, timestamp })

  const fileBuffer = fs.readFileSync(path.join(LOCAL_DIR, filename))
  const blob = new Blob([fileBuffer], { type: 'image/jpeg' })

  const form = new FormData()
  form.append('file', blob, filename)
  form.append('public_id', public_id)
  form.append('timestamp', String(timestamp))
  form.append('api_key', API_KEY)
  form.append('signature', sig)

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body: form,
  })

  const data = await res.json()
  if (data.secure_url) {
    console.log(`OK  ${filename}`)
    console.log(`    -> ${data.secure_url}`)
    return { filename, public_id: data.public_id, url: data.secure_url, bytes: data.bytes, width: data.width, height: data.height }
  } else {
    console.error(`ERR ${filename}:`, data.error?.message)
    return { filename, error: data.error?.message }
  }
}

const results = []
for (const [file, slug] of FILES) {
  results.push(await upload(file, slug))
}

fs.writeFileSync(
  new URL('./hero-images-result.json', import.meta.url),
  JSON.stringify(results, null, 2)
)
console.log('\nDone. Results in scripts/hero-images-result.json')
