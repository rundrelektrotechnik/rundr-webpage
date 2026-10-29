// Builds a self-contained preview that opens straight from disk (no server, no Node.js)
// and packs it into a ZIP for the customer. NEVER used for deployment: the real site
// is built with `npm run build` (root-absolute links, served from the domain root).
//
// Usage: npm run preview   ->   _preview/rr-website-vorschau-<datum>.zip
import { spawnSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import AdmZip from 'adm-zip';

const root = path.resolve(import.meta.dirname, '..');
const previewDir = path.join(root, '_preview');
const date = new Date().toISOString().slice(0, 10);
const folderName = 'rr-website-vorschau';
const siteDir = path.join(previewDir, folderName);
const zipPath = path.join(previewDir, `${folderName}-${date}.zip`);

function run(command) {
  const result = spawnSync(command, { cwd: root, stdio: 'inherit', shell: true, env: { ...process.env, PREVIEW: '1', SITE_OUTPUT: `_preview/${folderName}` } });
  if (result.status !== 0) process.exit(result.status ?? 1);
}

rmSync(previewDir, { recursive: true, force: true });
mkdirSync(siteDir, { recursive: true });

run('npm run validate');
run('npx eleventy');
run(`npx tailwindcss -i src/css/input.css -o _preview/${folderName}/css/style.css --minify`);

// Short instructions for the customer, placed next to index.html
writeFileSync(
  path.join(siteDir, 'LIES-MICH.txt'),
  [
    'Vorschau der neuen Website – R&R Elektrotechnik GmbH',
    `Stand: ${date}`,
    '',
    'So öffnen Sie die Vorschau:',
    '',
    '1. Entpacken Sie die ZIP-Datei.',
    '   Windows: Rechtsklick auf die ZIP-Datei, dann "Alle extrahieren...".',
    '   Mac: Doppelklick auf die ZIP-Datei.',
    '   Wichtig: Öffnen Sie die Website nicht direkt aus der ZIP-Datei, sonst fehlen Bilder und Farben.',
    '',
    '2. Öffnen Sie den entpackten Ordner und klicken Sie doppelt auf die Datei "index.html".',
    '   Die Website öffnet sich in Ihrem Internet-Browser.',
    '',
    '3. Klicken Sie sich wie auf einer echten Website durch alle Seiten.',
    '',
    'Hinweise:',
    '- Das ist nur eine Vorschau. Die Website ist noch nicht im Internet veröffentlicht.',
    '- Das Kontaktformular öffnet Ihr E-Mail-Programm mit einer vorbereiteten Nachricht.',
    '- Bitte notieren Sie Änderungswünsche (Texte, Fotos, Telefonnummern) und senden Sie sie uns zurück.',
    '',
  ].join('\r\n'),
  'utf8',
);

const zip = new AdmZip();
zip.addLocalFolder(siteDir, folderName);
zip.writeZip(zipPath);

console.log(`\nVorschau fertig: ${path.relative(root, zipPath)}`);
console.log(`Zum Testen ohne Entpacken: ${path.join(siteDir, 'index.html')}`);
