#!/usr/bin/env node
import sharp from "sharp"
import { readdir, copyFile, stat } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dirname, "..", "public")
const SRC_DIR = join(PUBLIC, "glimpses-original")
const OUT_DIR = join(PUBLIC, "glimpses")

const files = (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))
let saved = 0
for (const f of files) {
  const src = join(SRC_DIR, f)
  const out = join(OUT_DIR, f)
  const before = (await stat(src)).size
  await sharp(src)
    .rotate()
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(out + ".tmp")
  await copyFile(out + ".tmp", out)
  const { rm } = await import("node:fs/promises")
  await rm(out + ".tmp")
  const after = (await stat(out)).size
  saved += before - after
  console.log(`${f}  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB`)
}
console.log(`saved ${(saved / 1024 / 1024).toFixed(1)}MB`)
