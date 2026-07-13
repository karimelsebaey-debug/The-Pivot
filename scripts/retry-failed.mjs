import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

const envRaw = fs.readFileSync(path.join(ROOT, '.env.local'), 'utf-8')
const env = Object.fromEntries(
  envRaw.split('\n').filter(l => l.includes('=')).map(l => {
    const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()]
  })
)
cloudinary.config({ cloud_name: env.CLOUDINARY_CLOUD_NAME, api_key: env.CLOUDINARY_API_KEY, api_secret: env.CLOUDINARY_API_SECRET })

const BASE = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Services'
const FAILED = [
  { file: `${BASE}\\AI services\\Automation\\Motion & video automation.mp4`, slug: 'automation', type: 'video' },
  { file: `${BASE}\\Consultant\\Finance Expert\\P&L Analysis.jpg`, slug: 'finance-expert', type: 'image' },
  { file: `${BASE}\\Creative design\\Illustration design\\Main Page .jpeg`, slug: 'illustration-design', type: 'image' },
  { file: `${BASE}\\Specialized production\\Motion design\\Explainers & how-tos.mp4`, slug: 'motion-design', type: 'video' },
]

const results = JSON.parse(fs.readFileSync(path.join(__dirname, 'upload-results.json'), 'utf-8'))

for (const f of FAILED) {
  const ext = path.extname(f.file)
  const name = path.basename(f.file, ext).trim().replace(/&/g, 'and')
  const publicId = `the-pivot/services/${f.slug}/${name}`
  process.stdout.write(`${path.basename(f.file)} ... `)
  try {
    const r = await cloudinary.uploader.upload(f.file, { public_id: publicId, resource_type: f.type, overwrite: false })
    console.log(`OK  ${r.secure_url}`)
    results[f.slug].push({ url: r.secure_url, type: f.type, filename: path.basename(f.file) })
  } catch (e) {
    console.log(`FAIL  ${e.message}`)
  }
}

fs.writeFileSync(path.join(__dirname, 'upload-results.json'), JSON.stringify(results, null, 2))
console.log('Done.')
