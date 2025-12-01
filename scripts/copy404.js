import fs from 'fs';
import path from 'path';

const distPath = path.join(process.cwd(), 'dist');
const indexFile = path.join(distPath, 'index.html');
const destFile = path.join(distPath, '404.html');

try {
  if (!fs.existsSync(distPath)) {
    console.error(`Dist folder not found: ${distPath}`);
    process.exit(0);
  }
  if (!fs.existsSync(indexFile)) {
    console.error(`index.html not found in dist. Build may have failed: ${indexFile}`);
    process.exit(1);
  }
  fs.copyFileSync(indexFile, destFile);
  console.log(`Copied ${indexFile} -> ${destFile}`);
} catch (err) {
  console.error('Error copying 404 file:', err);
  process.exit(1);
}
