const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');
const { loadContent, listImages } = require('./scripts/load-content.js');

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

  // Static assets are copied as-is; CSS is built by the Tailwind CLI.
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images/og-image.png');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/favicon-32.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.watchIgnores.add('_site/css/style.css');

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
    dir: { input: 'src', output: '_site' },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
