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

const VID = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES'

const JOBS = [
  { file: `${VID}\\Card_Grid\\Fast_Food\\2.mp4`,              publicId: 'the-pivot/card-grid/fast_food/2',              type: 'video' },
  { file: `${VID}\\Card_Grid\\Jewelry_brand\\Main_Card.jpeg`, publicId: 'the-pivot/card-grid/jewelry_brand/main-card',  type: 'image' },
  { file: `${VID}\\Card_Grid\\App_design\\Main_Card.jpeg`,    publicId: 'the-pivot/card-grid/app_design/main-card',    type: 'image' },
  { file: `${VID}\\Card_Grid\\illustration Design\\1.jpeg`,   publicId: 'the-pivot/card-grid/illustration-design/1',   type: 'image' },
  { file: `${VID}\\Card_Grid\\SaaS\\Main_Card.jpeg`,          publicId: 'the-pivot/card-grid/saas/main-card',          type: 'image' },
  { file: `${VID}\\Card_Grid\\UGC_Unboxing\\Main_Card.jpeg`,  publicId: 'the-pivot/card-grid/ugc_unboxing/main-card',  type: 'image' },
  { file: `${VID}\\Card_Grid\\Yogurt\\1.mp4`,                 publicId: 'the-pivot/card-grid/yogurt/1',                type: 'video' },
]

async function main() {
  const results = []
  for (const job of JOBS) {
    process.stdout.write(`${job.publicId} ... `)
    const result = await cloudinary.uploader.upload(job.file, {
      public_id: job.publicId,
      resource_type: job.type,
      overwrite: true,
      invalidate: true,
    })
    console.log(`OK  ${result.secure_url}`)
    results.push({ publicId: job.publicId, url: result.secure_url })
  }
  fs.writeFileSync(path.join(__dirname, 'upload-selected-loop-replace-result.json'), JSON.stringify(results, null, 2))
  console.log('\nResults -> scripts/upload-selected-loop-replace-result.json')
}

main().catch(err => { console.error(err); process.exit(1) })
