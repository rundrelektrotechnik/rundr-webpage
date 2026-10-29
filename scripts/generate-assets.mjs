// Renders raster brand assets (favicon PNGs, Open Graph share image) from SVG.
// Run with `npm run assets`; the generated files are committed to src/.
import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const favicon = await readFile('src/favicon.svg');

// Browser tab icon and iOS home-screen icon (iOS rounds the corners itself).
await sharp(favicon).resize(32, 32).png().toFile('src/favicon-32.png');
const square = favicon.toString().replace(' rx="14"', '');
await sharp(Buffer.from(square)).resize(180, 180).png().toFile('src/apple-touch-icon.png');

// Open Graph / social share image, 1200x630.
const mark = favicon.toString().replace(/<\/?svg[^>]*>|<title>.*<\/title>/g, '');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/>
      <stop offset="1" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="14" height="630" fill="#fbbf24"/>
  <g transform="translate(90 150) scale(5)">${mark}</g>
  <g font-family="Segoe UI, Arial, Helvetica, sans-serif">
    <text x="470" y="250" font-size="68" font-weight="700" fill="#ffffff">R&amp;R Elektrotechnik</text>
    <text x="470" y="330" font-size="68" font-weight="700" fill="#ffffff">GmbH</text>
    <text x="470" y="410" font-size="34" fill="#cbd5e1">Elektroinstallation · PV-Anlagen</text>
    <text x="470" y="455" font-size="34" fill="#cbd5e1">Smart Home · Netzwerk · Glasfaser</text>
    <text x="470" y="540" font-size="30" font-weight="600" fill="#fbbf24">Erbach · Hessen</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('src/images/og-image.png');
console.log('Assets generated.');
