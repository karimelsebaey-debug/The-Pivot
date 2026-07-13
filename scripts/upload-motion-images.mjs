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

const FOLDER = 'the-pivot/services/motion-design'
const LOCAL_DIR = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Services\\Specialized production\\Motion design'

const FILES = [
  'Presentation and event motion.jpeg',
  'Campaign support.jpeg',
  'Motion ads.jpeg',
]

function sign(params) {
  const str = Object.keys(params).sort().map(k => `${k}=${params[k]}`).join('&') + SECRET
  return createHash('sha256').update(str).digest('hex')
}

async function upload(filename) {
  const ext = path.extname(filename)
  const nameNoExt = path.basename(filename, ext).trim().replace(/&/g, 'and')
  const public_id = `${FOLDER}/${nameNoExt}`
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
    return { filename, url: data.secure_url, public_id: data.public_id }
  } else {
    console.error(`ERR ${filename}:`, data.error?.message)
    return { filename, error: data.error?.message }
  }
}

const results = []
for (const f of FILES) {
  results.push(await upload(f))
}

fs.writeFileSync(
  new URL('./motion-images-result.json', import.meta.url),
  JSON.stringify(results, null, 2)
)
console.log('\nDone. Results in scripts/motion-images-result.json')
