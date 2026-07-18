import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const envRaw = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf-8')
const env = Object.fromEntries(
  envRaw.split('\n')
    .filter(l => l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] })
)

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
})

const FILE = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Card_Grid\\Website\\Main_Card_2.jpeg'

cloudinary.uploader.upload(FILE, {
  public_id: 'the-pivot/card-grid/website/main-card',
  resource_type: 'image',
  overwrite: true,
  invalidate: true,
}).then(r => {
  console.log('OK', r.secure_url)
}).catch(err => {
  console.log('FAIL', JSON.stringify(err, Object.getOwnPropertyNames(err)))
})
