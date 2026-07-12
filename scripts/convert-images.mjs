import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public', 'img');

const images = [
  { input: 'hero.jpg', quality: 85 },
  { input: 'cocktail.jpg', quality: 85 },
  { input: 'stage.jpg', quality: 85 },
];

console.log('Converting images to WebP...\n');

for (const img of images) {
  const inputPath = join(publicDir, img.input);
  const outputPath = join(publicDir, img.input.replace('.jpg', '.webp'));

  try {
    const info = await sharp(inputPath)
      .webp({ quality: img.quality })
      .toFile(outputPath);

    const originalSize = (await sharp(inputPath).metadata()).size;
    const savings = ((1 - info.size / originalSize) * 100).toFixed(1);

    console.log(`✓ ${img.input} → ${img.input.replace('.jpg', '.webp')}`);
    console.log(`  Original: ${(originalSize / 1024).toFixed(1)}KB`);
    console.log(`  WebP:     ${(info.size / 1024).toFixed(1)}KB`);
    console.log(`  Savings:  ${savings}%\n`);
  } catch (err) {
    console.error(`✗ Failed to convert ${img.input}:`, err.message);
  }
}

console.log('Done!');
