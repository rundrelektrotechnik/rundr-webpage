// Draws the illustrated service pictures (smart-home, wallboxen) into content/bilder/.
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

// ---------- Wallbox: wall box charging an electric car ----------
const wall = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600">${defs}
  <rect width="900" height="600" fill="url(#bg)"/>
  <!-- house wall + ground -->
  <rect x="0" y="0" width="300" height="470" fill="#334155"/>
  <g stroke="#1e293b" stroke-width="2" opacity=".6">
    ${[60, 120, 180, 240, 300, 360, 420].map((y) => `<path d="M0 ${y}H300"/>`).join('')}
  </g>
  <rect x="0" y="470" width="900" height="130" fill="#0b1220"/>
  <rect x="0" y="470" width="900" height="6" fill="#475569"/>
  <!-- wallbox -->
  <g transform="translate(190 170)">
    <rect x="-52" y="-80" width="104" height="170" rx="22" fill="#f8fafc"/>
    <rect x="-40" y="-68" width="80" height="146" rx="16" fill="#e2e8f0"/>
    <circle cx="0" cy="-32" r="14" fill="#22c55e"/>
    <circle cx="0" cy="-32" r="24" fill="none" stroke="#22c55e" stroke-width="4" opacity=".5"/>
    <rect x="-22" y="6" width="44" height="30" rx="6" fill="#0f172a"/>
    <path d="M3 10l-9 14h7l-3 10 10-15h-7z" fill="#fb923c"/>
    <circle cx="0" cy="62" r="9" fill="#475569"/>
  </g>
  <!-- cable -->
  <path d="M190 232 C 190 330, 260 310, 330 335 S 380 385, 420 372" fill="none" stroke="#111827" stroke-width="14" stroke-linecap="round"/>
  <path d="M190 232 C 190 330, 260 310, 330 335 S 380 385, 420 372" fill="none" stroke="#fb923c" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 14"/>
  <!-- car -->
  <g transform="translate(390 0)">
    <path d="M20 440 V390 C20 370 40 360 70 355 L150 300 C170 285 200 278 240 278 H320 C350 278 372 292 392 318 L420 350 C 450 358 470 372 470 400 V440 Z" fill="#fb923c"/>
    <path d="M165 312 L120 352 H235 V298 H200 C185 298 175 304 165 312Z M255 298 V352 H375 L350 318 C340 305 328 298 312 298Z" fill="#0f172a" opacity=".85"/>
    <rect x="22" y="378" width="30" height="14" rx="5" fill="#fde68a"/>
    <circle cx="105" cy="440" r="42" fill="#0b1220"/><circle cx="105" cy="440" r="22" fill="#94a3b8"/>
    <circle cx="385" cy="440" r="42" fill="#0b1220"/><circle cx="385" cy="440" r="22" fill="#94a3b8"/>
    <rect x="30" y="360" width="22" height="22" rx="4" fill="#22c55e"/>
  </g>
  <!-- lightning badge -->
  <g transform="translate(740 110)">
    <circle r="56" fill="#0f172a" stroke="#fb923c" stroke-width="4"/>
    <path d="M8-34L-18 4h18l-8 30 28-42H2z" fill="#fb923c"/>
  </g>
  <text x="450" y="556" text-anchor="middle" fill="#f8fafc" font-size="30" font-weight="600" ${font}>Wallbox – Laden zu Hause</text>
</svg>`;

for (const [name, svg] of [['smart-home', smart], ['wallboxen', wall]]) {
  await rm(`content/bilder/${name}.jpg`, { force: true }); // overwriting in place fails on this Windows setup
  await writeFile(`content/bilder/${name}.jpg`, await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toBuffer());
}
console.log('Service images generated.');
