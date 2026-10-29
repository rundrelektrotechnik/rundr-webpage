module.exports = function (eleventyConfig) {
  // Static assets are copied as-is; CSS is built by the Tailwind CLI.
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.addPassthroughCopy('src/images/**/*.{jpg,png}');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/favicon-32.png');
  eleventyConfig.addPassthroughCopy('src/apple-touch-icon.png');
  eleventyConfig.watchIgnores.add('_site/css/style.css');

  return {
    dir: { input: 'src', output: '_site' },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
