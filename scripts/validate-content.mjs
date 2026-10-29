// Checks the customer-editable content in /content before the site is built.
// Prints problems in plain German; on GitHub Actions they also appear as annotations.
import { readYaml, listImages, FILES } from './load-content.js';

const problems = [];
const report = (file, message) => problems.push({ file: `content/${file}.yml`, message });

const isText = (v) => typeof v === 'string' && v.trim() !== '';
const required = (file, where, value) => {
  if (!isText(value)) report(file, `${where}: Hier fehlt ein Text.`);
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[+\d][\d\s\-/()]{6,}$/;

// First make sure every file can be read; report all broken files at once.
let content = {};
for (const name of FILES) {
  try {
    content[name] = readYaml(name);
  } catch (err) {
    problems.push({ file: err.file ?? `content/${name}.yml`, line: err.line, message: err.message });
  }
}

if (problems.length === 0) {
  const { firma, startseite, leistungen, kontakt } = content;

  // --- firma.yml ---
  for (const key of ['name', 'kurzbeschreibung', 'strasse', 'ort', 'register_gericht', 'register_nummer', 'inhaltlich_verantwortlich']) {
    required('firma', `"${key}"`, firma[key]);
  }
  if (!/^\d{5}$/.test(String(firma.plz ?? ''))) {
    report('firma', '"plz": Die Postleitzahl muss aus 5 Ziffern bestehen, in Anführungszeichen (z. B. "64711").');
  }
  if (!EMAIL.test(String(firma.email ?? ''))) report('firma', '"email": Das ist keine gültige E-Mail-Adresse.');
  if (!/^DE\d{9}$/.test(String(firma.ust_id ?? ''))) report('firma', '"ust_id": Die USt-ID muss so aussehen: "DE123456789".');
  if (!Array.isArray(firma.ansprechpartner) || firma.ansprechpartner.length === 0) {
    report('firma', '"ansprechpartner": Mindestens eine Person mit Name und Telefonnummer ist nötig.');
  } else {
    firma.ansprechpartner.forEach((p, i) => {
      const who = `Ansprechpartner ${i + 1}`;
      required('firma', `${who}, "name"`, p?.name);
      required('firma', `${who}, "rolle"`, p?.rolle);
      if (!PHONE.test(String(p?.telefon ?? ''))) {
        report('firma', `${who}, "telefon": Das ist keine gültige Telefonnummer (z. B. "0151 598 294 01").`);
      }
    });
  }
  for (const key of ['einsatzgebiet', 'oeffnungszeiten']) {
    if (firma[key] !== undefined && typeof firma[key] !== 'string') {
      report('firma', `"${key}": Bitte als Text in Anführungszeichen schreiben oder "" für leer.`);
    }
  }

  // --- startseite.yml ---
  required('startseite', '"seo", "titel"', startseite.seo?.titel);
  required('startseite', '"seo", "beschreibung"', startseite.seo?.beschreibung);
  for (const key of ['titel', 'untertitel', 'button_anfragen', 'button_leistungen']) {
    required('startseite', `"hero", "${key}"`, startseite.hero?.[key]);
  }
  for (const key of ['titel', 'link']) required('startseite', `"leistungen_teaser", "${key}"`, startseite.leistungen_teaser?.[key]);
  for (const key of ['titel', 'einleitung']) required('startseite', `"warum", "${key}"`, startseite.warum?.[key]);
  if (!Array.isArray(startseite.warum?.punkte) || startseite.warum.punkte.length === 0) {
    report('startseite', '"warum", "punkte": Mindestens ein Punkt ist nötig.');
  } else {
    startseite.warum.punkte.forEach((p, i) => {
      required('startseite', `Warum-Punkt ${i + 1}, "titel"`, p?.titel);
      required('startseite', `Warum-Punkt ${i + 1}, "text"`, p?.text);
    });
  }
  for (const key of ['titel', 'text', 'link_formular']) {
    required('startseite', `"kontakt_band", "${key}"`, startseite.kontakt_band?.[key]);
  }

  // --- leistungen.yml ---
  required('leistungen', '"seo", "titel"', leistungen.seo?.titel);
  required('leistungen', '"seo", "beschreibung"', leistungen.seo?.beschreibung);
  required('leistungen', '"titel"', leistungen.titel);
  required('leistungen', '"einleitung"', leistungen.einleitung);
  for (const key of ['titel', 'text', 'button']) required('leistungen', `"abschluss", "${key}"`, leistungen.abschluss?.[key]);

  const images = new Map(listImages().map((i) => [i.name, i]));
  const seen = new Set();
  if (!Array.isArray(leistungen.leistungen) || leistungen.leistungen.length === 0) {
    report('leistungen', '"leistungen": Mindestens eine Leistung ist nötig.');
  } else {
    leistungen.leistungen.forEach((l, i) => {
      const who = isText(l?.titel) ? `Leistung "${l.titel}"` : `Leistung ${i + 1}`;
      required('leistungen', `${who}, "titel"`, l?.titel);
      required('leistungen', `${who}, "text"`, l?.text);
      if (!isText(l?.alt)) {
        report('leistungen', `${who}, "alt": Die Bildbeschreibung fehlt (kurzer Satz, was auf dem Foto zu sehen ist).`);
      }
      if (!isText(l?.bild)) {
        report('leistungen', `${who}, "bild": Der Name des Fotos fehlt.`);
      } else {
        if (!images.has(l.bild)) {
          report('leistungen', `${who}, "bild": Das Foto "${l.bild}" wurde im Ordner content/bilder nicht gefunden (Dateiname ohne Endung angeben, z. B. "dach" für dach.jpg).`);
        }
        if (seen.has(l.bild)) report('leistungen', `${who}, "bild": Das Foto "${l.bild}" wird zweimal verwendet.`);
        seen.add(l.bild);
      }
    });
  }

  // --- kontakt.yml ---
  required('kontakt', '"seo", "titel"', kontakt.seo?.titel);
  required('kontakt', '"seo", "beschreibung"', kontakt.seo?.beschreibung);
  for (const key of ['titel', 'einleitung', 'ablauf_titel']) required('kontakt', `"${key}"`, kontakt[key]);
  if (!Array.isArray(kontakt.schritte) || kontakt.schritte.length === 0) {
    report('kontakt', '"schritte": Mindestens ein Schritt ist nötig.');
  } else {
    kontakt.schritte.forEach((s, i) => {
      required('kontakt', `Schritt ${i + 1}, "titel"`, s?.titel);
      required('kontakt', `Schritt ${i + 1}, "text"`, s?.text);
    });
  }
}

if (problems.length === 0) {
  console.log('Inhalte geprüft: alles in Ordnung.');
} else {
  console.error(`\nDie Inhalte enthalten ${problems.length} Problem(e). Die Website wurde NICHT veröffentlicht:\n`);
  for (const p of problems) {
    console.error(` - ${p.file}: ${p.message}`);
    // Inline annotation in the GitHub Actions UI
    if (process.env.GITHUB_ACTIONS) console.error(`::error file=${p.file}${p.line ? `,line=${p.line}` : ''}::${p.message}`);
  }
  console.error('\nBitte die genannte Datei korrigieren (siehe content/ANLEITUNG.md) und erneut speichern.\n');
  process.exit(1);
}
