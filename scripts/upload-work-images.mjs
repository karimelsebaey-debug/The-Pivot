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

const WORK_DIR = path.join(ROOT, 'public', 'images', 'work')

async function main() {
  const results = {}
  const files = fs.readdirSync(WORK_DIR).filter(f => f.toLowerCase().endsWith('.jpg'))

  for (const filename of files) {
    const slug = path.basename(filename, '.jpg')
    process.stdout.write(`${slug} ... `)
    try {
      const result = await cloudinary.uploader.upload(path.join(WORK_DIR, filename), {
        public_id: `the-pivot/work/${slug}`,
        resource_type: 'image',
        overwrite: true,
      })
      results[slug] = { url: result.secure_url, publicId: result.public_id }
      console.log(`OK  ${result.secure_url}`)
    } catch (err) {
      results[slug] = { error: err.message }
      console.log(`FAIL  ${err.message}`)
    }
  }

  fs.writeFileSync(path.join(__dirname, 'upload-work-images-result.json'), JSON.stringify(results, null, 2))
  console.log('\nResults -> scripts/upload-work-images-result.json')
}

main().catch(err => { console.error(err); process.exit(1) })
