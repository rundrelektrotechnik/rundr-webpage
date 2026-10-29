module.exports = function (eleventyConfig) {
  // Client-side scripts are copied as-is; CSS is built by the Tailwind CLI.
  eleventyConfig.addPassthroughCopy('src/js');
  eleventyConfig.watchIgnores.add('_site/css/style.css');

  return {
    dir: { input: 'src', output: '_site' },
    templateFormats: ['html', 'njk'],
    htmlTemplateEngine: 'njk',
  };
};
