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

const SRC = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Card_Grid'
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm'])

function toSlug(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-')
}

async function main() {
  const results = {}
  const folders = fs.readdirSync(SRC).filter(f => fs.statSync(path.join(SRC, f)).isDirectory())

  for (const folder of folders) {
    const slug = toSlug(folder)
    results[slug] = { main: null, gallery: [] }
    const folderPath = path.join(SRC, folder)
    const files = fs.readdirSync(folderPath).filter(f => fs.statSync(path.join(folderPath, f)).isFile())

    for (const filename of files) {
      const ext = path.extname(filename).toLowerCase()
      const resourceType = VIDEO_EXT.has(ext) ? 'video' : 'image'
      const isMain = filename.toLowerCase().replace(/\s+/g, '').startsWith('main_card') || filename.toLowerCase().replace(/\s+/g, '').startsWith('main_')
      const nameNoExt = isMain ? 'main-card' : path.basename(filename, ext).trim().replace(/\s+/g, '-')
      const publicId = `the-pivot/card-grid/${slug}/${nameNoExt}`

      process.stdout.write(`[${slug}] ${filename} ... `)
      try {
        const result = await cloudinary.uploader.upload(path.join(folderPath, filename), {
          public_id: publicId,
          resource_type: resourceType,
          overwrite: true,
        })
        console.log('OK')
        if (isMain) {
          results[slug].main = { url: result.secure_url, type: resourceType }
        } else {
          results[slug].gallery.push({ url: result.secure_url, type: resourceType })
        }
      } catch (err) {
        console.log(`FAIL ${err.message}`)
      }
    }
  }

  fs.writeFileSync(path.join(__dirname, 'card-grid-result.json'), JSON.stringify(results, null, 2))
  console.log('\nResults -> scripts/card-grid-result.json')
}

main().catch(err => { console.error(err); process.exit(1) })
