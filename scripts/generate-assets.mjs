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
const logo = (await readFile('src/logo.svg')).toString().replace(/<\/?svg[^>]*>|<title[^>]*>.*<\/title>/g, '');
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#000"/>
      <stop offset="1" stop-color="#1c1917"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="14" height="630" fill="#f97316"/>
  <g transform="translate(220 75) scale(.7) translate(-310 -90)">${logo}</g>
  <g font-family="Segoe UI, Arial, Helvetica, sans-serif" text-anchor="middle" fill="#cbd5e1" font-size="34">
    <text x="600" y="425">Elektroinstallation · PV-Anlagen</text>
    <text x="600" y="475">Smart Home · Wallboxen · Netzwerk</text>
    <text x="600" y="555" font-size="30" font-weight="600" fill="#f97316">Erbach · Hessen</text>
  </g>
</svg>`;
await sharp(Buffer.from(og)).png().toFile('src/images/og-image.png');
console.log('Assets generated.');
