const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { loadContent, listImages } = require('./scripts/load-content.js');

// The preview build (npm run preview) writes to a different folder via SITE_OUTPUT.
const OUTPUT_DIR = process.env.SITE_OUTPUT || '_site';

module.exports = function (eleventyConfig) {
  // Customer-editable content (YAML in /content) becomes global template data:
  // firma, startseite, leistungen, kontakt.
  for (const name of ['firma', 'startseite', 'leistungen', 'kontakt']) {
    eleventyConfig.addGlobalData(name, () => loadContent()[name]);
  }
  eleventyConfig.addGlobalData('buildYear', () => new Date().getFullYear());
  eleventyConfig.addWatchTarget('content/');

  // "0151 598 294 01" -> "+4915159829401" (for tel: links)
  eleventyConfig.addFilter('tel', (number) => {
    const digits = String(number).replace(/[^\d+]/g, '');
    return digits.startsWith('+') ? digits : `+49${digits.replace(/^0+/, '')}`;
  });

  // Preview build only (npm run preview, never used for deployment): make all
  // root-absolute links relative so the pages open straight from disk (file://).
  // All pages sit in the output root, so "/x.html" simply becomes "x.html".
  if (process.env.PREVIEW) {
    eleventyConfig.addTransform('preview-relative-links', function (content) {
      if (!this.page.outputPath || !this.page.outputPath.endsWith('.html')) return content;
      const banner =
        '<div style="position:fixed;left:12px;bottom:12px;z-index:9999;padding:6px 12px;border-radius:8px;' +
        'background:#fbbf24;color:#0f172a;font:600 13px sans-serif;box-shadow:0 2px 8px rgba(0,0,0,.3)">' +
        'Vorschau – noch nicht veröffentlicht</div>';
      return content
        .replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, rest) => `${attr}="${rest === '' ? 'index.html' : rest}"`)
        .replace('</body>', `${banner}</body>`);
    });
  }

  // Static assets are copied as-is; CSS is built by the Tailwind CLI.
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images/og-image.png');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/logo.svg');
  eleventyConfig.addPassthroughCopy('src/logo-mark.svg');
  eleventyConfig.addPassthroughCopy('src/favicon-32.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.watchIgnores.add(OUTPUT_DIR + '/css/style.css');

  // Photos dropped into content/bilder are resized to 900x600 JPEGs for the site.
  eleventyConfig.on('eleventy.after', async ({ dir }) => {
    const outDir = path.join(dir.output, 'images', 'leistungen');
    fs.mkdirSync(outDir, { recursive: true });
    await Promise.all(
      listImages().map(({ name, path: source }) =>
        sharp(source)
          .rotate()
          .resize(900, 600, { fit: 'cover' })
          .jpeg({ quality: 75 })
          .toFile(path.join(outDir, `${name}.jpg`)),
      ),
    );
  });

  return {
    dir: { input: 'src', output: OUTPUT_DIR },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
