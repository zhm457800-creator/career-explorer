const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const largeImages = [
  'assets/img/home/home_01_hero_bg.png',
  'assets/img/home/home_02_section_img1.png',
  'assets/img/home/home_03_section_img2.png',
  'assets/img/home/home_04_section_img3.png',
];

async function compressImages() {
  for (const imgPath of largeImages) {
    const fullPath = path.join(__dirname, imgPath);
    const outputPath = fullPath.replace('.png', '_compressed.png');

    console.log(`Compressing ${imgPath}...`);

    await sharp(fullPath)
      .resize(1920, null, { withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toFile(outputPath);

    // Get file sizes
    const originalSize = fs.statSync(fullPath).size;
    const compressedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - compressedSize) / originalSize * 100).toFixed(1);

    console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(1)}MB -> Compressed: ${(compressedSize / 1024 / 1024).toFixed(1)}MB (saved ${savings}%)`);

    // Replace original with compressed
    fs.unlinkSync(fullPath);
    fs.renameSync(outputPath, fullPath);
  }

  console.log('Done!');
}

compressImages().catch(console.error);
