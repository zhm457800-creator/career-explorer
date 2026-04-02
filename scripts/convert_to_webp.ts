import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'public/assets/img';

async function convertToWebP(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg'].includes(ext)) return;

  const newPath = filePath.replace(new RegExp(`\\${ext}$`, 'i'), '.webp');
  
  console.log(`Converting ${filePath} to WebP...`);

  try {
    // Skip if somehow the webp already exists (safety)
    // if (fs.existsSync(newPath)) return;

    await sharp(filePath)
      .webp({ quality: 80, effort: 6 })
      .toFile(newPath);
    
    // Once successful, delete original
    fs.unlinkSync(filePath);
    console.log(`  Done! Saved as ${path.basename(newPath)}`);
  } catch (err) {
    console.error(`  Failed to convert ${filePath}:`, err);
  }
}

async function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await walkDir(fullPath);
    } else {
      await convertToWebP(fullPath);
    }
  }
}

console.log('--- Starting WebP Conversion ---');
walkDir(ASSETS_DIR).then(() => {
  console.log('--- All Images Converted to WebP! ---');
}).catch(err => {
  console.error('Conversion failed:', err);
});
