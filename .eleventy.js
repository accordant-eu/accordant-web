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
  // Exclude README.md and any non-article files
  eleventyConfig.addCollection("insights", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/insights/*.md")
      .filter(item => !item.inputPath.endsWith("/README.md"))
      .sort((a, b) => {
        return b.date - a.date;
      });
  });

  // Force clean permalinks + article layout for insight markdown files
  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data.page.inputPath.includes("/src/insights/")) {
        const slug = data.page.fileSlug;
        return `/insights/${slug}/`;
      }
    },
    layout: (data) => {
      if (data.page.inputPath.includes("/src/insights/")) {
        return "article.njk";
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