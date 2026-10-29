// Loads the customer-editable YAML files from /content.
// Shared by the Eleventy build (eleventy.config.js) and the checker (validate-content.mjs).
const fs = require('node:fs');
const path = require('node:path');
const yaml = require('js-yaml');

const CONTENT_DIR = path.join(__dirname, '..', 'content');
const IMAGE_DIR = path.join(CONTENT_DIR, 'bilder');
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp'];

// Content file names (without .yml) -> template variable names.
const FILES = ['firma', 'startseite', 'leistungen', 'kontakt'];

/** Reads one YAML file; throws an error that names the file and line. */
function readYaml(name) {
  const file = `${name}.yml`;
  const full = path.join(CONTENT_DIR, file);
  try {
    return yaml.load(fs.readFileSync(full, 'utf8')) ?? {};
  } catch (err) {
    const line = err.mark ? err.mark.line + 1 : undefined;
    const where = line ? `In Zeile ${line}` : 'In der Datei';
    const reason = err.reason || err.message;
    const error = new Error(
      `${where} stimmt der Aufbau nicht (technisch: "${reason}"). ` +
        'Häufige Ursachen: Text ohne Anführungszeichen (besonders bei Doppelpunkt oder &), ' +
        'falsche Einrückung oder ein Tabulator statt Leerzeichen.',
    );
    error.file = `content/${file}`;
    error.line = line;
    throw error;
  }
}

function loadContent() {
  return Object.fromEntries(FILES.map((name) => [name, readYaml(name)]));
}

/** Lists the source photos available in content/bilder. */
function listImages() {
  if (!fs.existsSync(IMAGE_DIR)) return [];
  return fs
    .readdirSync(IMAGE_DIR)
    .filter((f) => IMAGE_EXTENSIONS.includes(path.extname(f).toLowerCase()))
    .map((f) => ({ file: f, name: path.basename(f, path.extname(f)), path: path.join(IMAGE_DIR, f) }));
}

module.exports = { loadContent, listImages, readYaml, FILES, CONTENT_DIR, IMAGE_DIR };
