#!/usr/bin/env node
// One-shot image optimizer. Backs up originals to *-original/ then writes
// compressed variants in place so the existing /main-emphasis/* and
// /gallery/* paths in the code keep working.
//
// Run: node scripts/optimize-images.mjs

import sharp from "sharp"
import { readdir, mkdir, copyFile, stat } from "node:fs/promises"
import { existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, "..", "public")

const TARGETS = [
  // Main-emphasis: full-screen scene photos. Cap width 1920, JPEG q78, ~250KB target.
  { dir: "main-emphasis", maxWidth: 1920, quality: 78 },
  // Gallery (used as 28-44px globe avatars): aggressively downsize. 256px is plenty.
  { dir: "gallery",       maxWidth: 256,  quality: 80 },
]

const PINNED_GALLERY = new Set([
  "7N2A0192.jpg", "7N2A0779.jpg", "7N2A1007.jpg", "7N2A1023.jpg",
  "7N2A1124.jpg", "7N2A1167.jpg", "7N2A1305.jpg", "7N2A1514.jpg",
  "7N2A1643.jpg", "7N2A1684.jpg", "7N2A9744.jpg", "7N2A0076.jpg",
])

async function ensureBackup(src, backup) {
  if (!existsSync(backup)) {
    await copyFile(src, backup)
  }
}

async function processDir({ dir, maxWidth, quality }) {
  const inDir = join(PUBLIC, dir)
  const backupDir = join(PUBLIC, `${dir}-original`)
  if (!existsSync(inDir)) {
    console.log(`skip: ${dir} (not found)`)
    return
  }
  await mkdir(backupDir, { recursive: true })

  const files = (await readdir(inDir)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f),
  )

  // For gallery, only compress the 12 photos actually referenced by globe.
  const filtered = dir === "gallery"
    ? files.filter((f) => PINNED_GALLERY.has(f))
    : files

  let savedTotal = 0
  for (const f of filtered) {
    const src = join(inDir, f)
    const backup = join(backupDir, f)
    try {
      await ensureBackup(src, backup)
      const before = (await stat(backup)).size
      await sharp(backup)
        .rotate() // honor EXIF orientation
        .resize({ width: maxWidth, withoutEnlargement: true })
        .jpeg({ quality, mozjpeg: true })
        .toFile(src + ".tmp")
      // atomic-ish swap
      await copyFile(src + ".tmp", src)
      const { rm } = await import("node:fs/promises")
      await rm(src + ".tmp")
      const after = (await stat(src)).size
      const saved = before - after
      savedTotal += saved
      console.log(
        `${dir}/${f}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB  (-${(saved / 1024).toFixed(0)}KB)`,
      )
    } catch (err) {
      console.error(`fail: ${dir}/${f}`, err.message)
    }
  }
  console.log(`\n${dir}: saved ${(savedTotal / 1024 / 1024).toFixed(1)}MB total\n`)
}

for (const t of TARGETS) {
  await processDir(t)
}

console.log("done.")
console.log("Originals are preserved in public/main-emphasis-original/ and public/gallery-original/.")
console.log("If anything looks bad, restore by copying the original back over the compressed file.")
