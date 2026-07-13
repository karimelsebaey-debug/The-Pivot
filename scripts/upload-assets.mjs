import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')

// Parse .env.local manually (no dotenv needed)
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

const ASSETS_BASE = 'C:\\Users\\Dell\\AppData\\Local\\CapCut\\Videos\\My Content\\WEBSITE\\VIDOES\\Services'
const VALID_EXT = new Set(['.jpg', '.jpeg', '.png', '.mp4', '.mov', '.webm'])
const VIDEO_EXT = new Set(['.mp4', '.mov', '.webm'])

function toSlug(name) {
  return name.toLowerCase().replace(/\s+/g, '-')
}

async function uploadFile(filePath, slug, filename) {
  const ext = path.extname(filename).toLowerCase()
  const resourceType = VIDEO_EXT.has(ext) ? 'video' : 'image'
  const nameNoExt = path.basename(filename, ext).trim().replace(/&/g, 'and')
  const publicId = `the-pivot/services/${slug}/${nameNoExt}`

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: false,
    })
    return { ok: true, url: result.secure_url, publicId: result.public_id, type: resourceType }
  } catch (err) {
    return { ok: false, error: err.message }
  }
}

async function main() {
  const results = {}
  let total = 0, failed = 0

  for (const category of fs.readdirSync(ASSETS_BASE)) {
    const catPath = path.join(ASSETS_BASE, category)
    if (!fs.statSync(catPath).isDirectory()) continue

    for (const svcName of fs.readdirSync(catPath)) {
      const svcPath = path.join(catPath, svcName)
      if (!fs.statSync(svcPath).isDirectory()) continue

      const slug = toSlug(svcName)
      results[slug] = []

      const files = fs.readdirSync(svcPath).filter(f => {
        const ext = path.extname(f).toLowerCase()
        return VALID_EXT.has(ext) && fs.statSync(path.join(svcPath, f)).isFile()
      })

      console.log(`\n[${slug}] ${files.length} files`)

      for (const filename of files) {
        process.stdout.write(`  ${filename} ... `)
        const res = await uploadFile(path.join(svcPath, filename), slug, filename)
        total++

        if (res.ok) {
          console.log(`OK  ${res.url}`)
          results[slug].push({ url: res.url, type: res.type, filename })
        } else {
          console.log(`FAIL  ${res.error}`)
          results[slug].push({ error: res.error, filename })
          failed++
        }
      }
    }
  }

  const out = path.join(__dirname, 'upload-results.json')
  fs.writeFileSync(out, JSON.stringify(results, null, 2))

  console.log(`\nDone. ${total - failed}/${total} uploaded.`)
  console.log(`Results -> scripts/upload-results.json`)
}

main().catch(err => { console.error(err); process.exit(1) })
