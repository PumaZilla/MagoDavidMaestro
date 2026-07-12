import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const src = path.resolve('public/favicon.svg');
const svg = readFileSync(src);

const targets = [
  { out: 'public/favicon-16.png', size: 16 },
  { out: 'public/favicon-32.png', size: 32 },
  { out: 'public/favicon-48.png', size: 48 },
  { out: 'public/favicon-180.png', size: 180 },
  { out: 'public/favicon-192.png', size: 192 },
  { out: 'public/favicon-512.png', size: 512 },
];

for (const { out, size } of targets) {
  await sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'cover' })
    .png({ compressionLevel: 9 })
    .toFile(path.resolve(out));
  console.log(`✓ ${out} (${size}x${size})`);
}

// Multi-size ICO: sharp cannot write .ico, but the 32x32 PNG renamed .ico
// works in every current browser (Chrome/Firefox/Safari/Edge treat PNG-as-ICO
// fine; only IE < 11 required real ICO, and we do not support it).
const ico32 = readFileSync(path.resolve('public/favicon-32.png'));
writeFileSync(path.resolve('public/favicon.ico'), ico32);
console.log('✓ public/favicon.ico (PNG masquerading as .ico)');
