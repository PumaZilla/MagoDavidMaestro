import sharp from 'sharp';
import { unlinkSync, existsSync } from 'node:fs';
import path from 'node:path';

// Optimize a set of raw photos into web-ready jpg (and webp fallback).
// Reads sources with the given quality target and outputs to the same dir.

const jobs = [
  { in: 'public/img/tv-portrait.jpeg',      out: 'public/img/about.jpg',    width: 2000, quality: 82 },
  { in: 'public/img/stage-live.jpeg',       out: 'public/img/stage.jpg',    width: 2000, quality: 82 },
  { in: 'public/img/branson-friendly.jpeg', out: 'public/img/branson.jpg',  width: 1800, quality: 82 },
];

// Also archive the "Branson kneeling" shot (dvm.jpeg) at a smaller size,
// in case we want a second Branson image later.
const extras = [
  { in: 'public/img/branson.jpeg', out: 'public/img/branson-alt.jpg', width: 1600, quality: 82 },
];

async function process(list) {
  for (const j of list) {
    const src = path.resolve(j.in);
    const outJpg = path.resolve(j.out);
    const outWebp = outJpg.replace(/\.jpg$/, '.webp');

    if (!existsSync(src)) {
      console.warn(`✗ missing: ${j.in}`);
      continue;
    }

    await sharp(src)
      .rotate()
      .resize({ width: j.width, withoutEnlargement: true })
      .jpeg({ quality: j.quality, progressive: true, mozjpeg: true })
      .toFile(outJpg);

    await sharp(src)
      .rotate()
      .resize({ width: j.width, withoutEnlargement: true })
      .webp({ quality: j.quality - 5, effort: 6 })
      .toFile(outWebp);

    console.log(`✓ ${j.out}  +  ${path.basename(outWebp)}`);
  }
}

await process(jobs);
await process(extras);

// Clean up the raw uploads once the processed variants exist
const cleanup = ['public/img/tv-portrait.jpeg', 'public/img/stage-live.jpeg', 'public/img/branson-friendly.jpeg', 'public/img/branson.jpeg'];
for (const f of cleanup) {
  const p = path.resolve(f);
  if (existsSync(p)) {
    unlinkSync(p);
    console.log(`× removed ${f}`);
  }
}
