// Draws the illustrated service pictures (smart-home) into content/bilder/.
// Run with `node scripts/generate-service-images.mjs`; the generated PNGs are committed.
import { rm, writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const font = 'font-family="Segoe UI, Arial, Helvetica, sans-serif"';
const defs = `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#1e293b"/></linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fb923c"/><stop offset="1" stop-color="#ea580c"/></linearGradient>
</defs>`;

// ---------- Smart Home: house with connected devices, KNX + Loxone ----------
const nodes = [
  { x: 130, y: 150, label: 'Licht', icon: '<path d="M0-18a12 12 0 0 1 7 22v6h-14v-6a12 12 0 0 1 7-22zM-5 14h10M-4 19h8" />' },
  { x: 130, y: 330, label: 'Heizung', icon: '<path d="M-6 10a8 8 0 1 0 12 0V-14h-12z"/><path d="M0 12V-4"/>' },
  { x: 130, y: 500, label: 'Rollläden', icon: '<path d="M-14-16h28M-14-8h28M-14 0h28M-14 8h28M-14 16h28"/>' },
  { x: 770, y: 150, label: 'Sicherheit', icon: '<path d="M0-18l15 6v10c0 10-7 17-15 20-8-3-15-10-15-20v-10z"/><path d="M-6 2l4 4 8-9"/>' },
  { x: 770, y: 330, label: 'Energie', icon: '<path d="M4-20l-14 22h10l-4 20 16-24h-10z"/>' },
  { x: 770, y: 500, label: 'Multimedia', icon: '<rect x="-16" y="-12" width="32" height="22" rx="2"/><path d="M-8 18h16"/>' },
];
const links = nodes.map((n) => `<path d="M${n.x} ${n.y} C ${n.x < 450 ? 300 : 600} ${n.y}, ${n.x < 450 ? 330 : 570} 330, ${n.x < 450 ? 355 : 545} 330" />`).join('\n');
const nodeSvg = nodes.map((n) => `
  <g transform="translate(${n.x} ${n.y})">
    <circle r="40" fill="#0f172a" stroke="#fb923c" stroke-width="3"/>
    <g fill="none" stroke="#f8fafc" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${n.icon}</g>
    <text y="66" text-anchor="middle" fill="#cbd5e1" font-size="20" ${font}>${n.label}</text>
  </g>`).join('');

const smart = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">${defs}
  <rect width="900" height="600" fill="url(#bg)"/>
  <g fill="none" stroke="#fb923c" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round" opacity=".9">${links}</g>
  ${nodeSvg}
  <!-- house -->
  <g transform="translate(450 330)">
    <path d="M-110 -10 L0 -120 L110 -10 V110 H-110 Z" fill="#0b1220" stroke="url(#glow)" stroke-width="8" stroke-linejoin="round"/>
    <path d="M-135 -5 L0 -140 L135 -5" fill="none" stroke="url(#glow)" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="-62" y="10" width="50" height="46" rx="4" fill="#fbbf24" opacity=".9"/>
    <rect x="22" y="10" width="40" height="46" rx="4" fill="#475569"/>
    <rect x="-24" y="66" width="48" height="44" rx="4" fill="#475569"/>
    <circle cx="0" cy="-48" r="9" fill="#fb923c"/>
    <path d="M-22-70a31 31 0 0 1 44 0M-34-84a48 48 0 0 1 68 0" fill="none" stroke="#fb923c" stroke-width="5" stroke-linecap="round"/>
  </g>
  <!-- system badges -->
  <g ${font} font-weight="700" font-size="34" text-anchor="middle">
    <rect x="262" y="520" width="150" height="56" rx="28" fill="#fff"/>
    <text x="337" y="560" fill="#16a34a">KNX</text>
    <rect x="488" y="520" width="150" height="56" rx="28" fill="#7ac143"/>
    <text x="563" y="560" fill="#0f172a" font-size="30">Loxone</text>
  </g>
  <text x="450" y="52" text-anchor="middle" fill="#f8fafc" font-size="30" font-weight="600" ${font}>Smart Home – alles vernetzt</text>
</svg>`;

for (const [name, svg] of [['smart-home', smart]]) {
  await rm(`content/bilder/${name}.jpg`, { force: true }); // overwriting in place fails on this Windows setup
  await writeFile(`content/bilder/${name}.jpg`, await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer());
}
console.log('Service images generated.');
