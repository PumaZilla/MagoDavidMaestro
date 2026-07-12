import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import path from 'node:path';

const dir = path.resolve('public/img/textures');
const files = readdirSync(dir).filter((f) => f.endsWith('.png'));

for (const f of files) {
  const src = path.join(dir, f);
  const base = f.replace(/\.png$/i, '');
  const outWebp = path.join(dir, `${base}.webp`);
  const outJpg = path.join(dir, `${base}.jpg`);

  await sharp(src)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 78, effort: 6 })
    .toFile(outWebp);

  await sharp(src)
    .resize({ width: 2400, withoutEnlargement: true })
    .jpeg({ quality: 82, progressive: true, mozjpeg: true })
    .toFile(outJpg);

  console.log(`✓ ${base}: webp + jpg`);
}
