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

const FOLDER = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Card_Grid\\App_design'

async function main() {
  const results = { main: null, gallery: [] }
  const files = fs.readdirSync(FOLDER).filter(f => fs.statSync(path.join(FOLDER, f)).isFile())

  for (const filename of files) {
    const isMain = filename.toLowerCase().replace(/\s+/g, '').startsWith('main_card') || filename.toLowerCase().replace(/\s+/g, '').startsWith('main_')
    const nameNoExt = isMain ? 'main-card' : path.basename(filename, path.extname(filename)).trim().replace(/\s+/g, '-')
    const publicId = `the-pivot/card-grid/app_design/${nameNoExt}`

    process.stdout.write(`${filename} ... `)
    const result = await cloudinary.uploader.upload(path.join(FOLDER, filename), {
      public_id: publicId,
      resource_type: 'image',
      overwrite: true,
      invalidate: true,
    })
    console.log(`OK  ${result.secure_url}`)
    if (isMain) results.main = { url: result.secure_url }
    else results.gallery.push({ url: result.secure_url, name: nameNoExt })
  }

  fs.writeFileSync(path.join(__dirname, 'card-grid-appdesign-result.json'), JSON.stringify(results, null, 2))
  console.log('\nResults -> scripts/card-grid-appdesign-result.json')
}

main().catch(err => { console.error(err); process.exit(1) })
