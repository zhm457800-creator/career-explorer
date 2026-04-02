import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ASSETS_DIR = 'public/assets/img';
const SIZE_THRESHOLD = 500 * 1024; // 500KB

async function optimizeImage(filePath: string) {
  const stats = fs.statSync(filePath);
  if (stats.size <= SIZE_THRESHOLD) return;

  const ext = path.extname(filePath).toLowerCase();
  const originalSize = (stats.size / 1024 / 1024).toFixed(2);
  
  console.log(`Optimizing ${filePath} (${originalSize} MB)...`);

  const tempPath = `${filePath}.tmp`;

  try {
    let pipeline = sharp(filePath);

    if (ext === '.png') {
      pipeline = pipeline.png({ palette: true, quality: 80, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, mozjpeg: true });
    } else {
      return; // Skip unsupported formats
    }

    await pipeline.toFile(tempPath);
    
    const newStats = fs.statSync(tempPath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);

    fs.unlinkSync(filePath);
    fs.renameSync(tempPath, filePath);

    console.log(`  Done! New size: ${newSize} MB`);
  } catch (err) {
    console.error(`  Failed to optimize ${filePath}:`, err);
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

async function walkDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await walkDir(fullPath);
    } else {
      await optimizeImage(fullPath);
    }
  }
}

console.log('--- Starting Image Optimization ---');
walkDir(ASSETS_DIR).then(() => {
  console.log('--- All Large Images Optimized! ---');
}).catch(err => {
  console.error('Optimization failed:', err);
});
