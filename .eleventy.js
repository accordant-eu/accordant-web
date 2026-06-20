const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("style.css");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Do NOT passthrough the insight markdown files.
  // They must be processed as content so they get proper URLs + layouts.

  // Date filter
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL yyyy");
  });

  // Collection for insights (sorted newest first)
  // Also ensure they get proper /insights/ URLs even without frontmatter
  eleventyConfig.addCollection("insights", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/insights/*.md").sort((a, b) => {
      return b.date - a.date;
    });
  });

  // Force clean permalinks + layout for all insight markdown files
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data.page.inputPath.includes("/src/insights/")) {
        const slug = data.page.fileSlug;
        return `/insights/${slug}/`;
      }
    },
    layout: (data) => {
      if (data.page.inputPath.includes("/src/insights/")) {
        return "base.njk";
      }
    }
  });

  return {
    dir: {
      input: "src",
      includes: "../_includes",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};