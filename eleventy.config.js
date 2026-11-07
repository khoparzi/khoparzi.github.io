import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import yaml from "js-yaml";

export default function(eleventyConfig) {
  // Syntax Highlighting (Compile-time, zero client JS)
  eleventyConfig.addPlugin(syntaxHighlight);

  // Layout aliases for Jekyll compatibility
  eleventyConfig.addLayoutAlias("page", "page.html");
  eleventyConfig.addLayoutAlias("post", "post.html");
  eleventyConfig.addLayoutAlias("default", "page.html");
  eleventyConfig.addLayoutAlias("base", "base.html");

  // Passthrough copy assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("img");
  eleventyConfig.addPassthroughCopy("livecode-resources");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy("*.pdf");

  // Add support for .markdown files
  eleventyConfig.addExtension(["markdown"], {
    key: "md"
  });

  // Frontmatter parsing to handle Jekyll date formats seamlessly
  eleventyConfig.setFrontMatterParsingOptions({
    engines: {
      yaml: (str, opts) => {
        const data = yaml.load(str) || {};
        if (data.date) {
          if (typeof data.date === "string") {
            const parsed = new Date(data.date);
            if (!isNaN(parsed.getTime())) {
              data.date = parsed;
            }
          }
        } else if (opts?.filePath) {
          const match = opts.filePath.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
          if (match) {
            const [_, y, m, d] = match;
            data.date = new Date(`${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}T00:00:00Z`);
          }
        }
        return data;
      }
    }
  });

  // Configure Liquid options for Jekyll compatibility
  eleventyConfig.setLiquidOptions({
    dynamicPartials: false,
    jekyllInclude: true,
    strictFilters: false
  });

  // Custom filters
  eleventyConfig.addFilter("limit", (arr, limit) => {
    if (!Array.isArray(arr)) return arr;
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("number_of_words", (str) => {
    if (!str) return 0;
    return str.trim().split(/\s+/).length;
  });

  eleventyConfig.addFilter("truncatewords", (str, count = 50) => {
    if (!str) return "";
    const words = str.trim().split(/\s+/);
    if (words.length <= count) return str;
    return words.slice(0, count).join(" ") + "...";
  });

  eleventyConfig.addFilter("xml_escape", (str) => {
    if (!str) return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  });

  // Collections: Posts collection sorted chronologically (newest first)
  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("_posts/*.{md,markdown}").sort((a, b) => {
      return b.date - a.date;
    });
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      layouts: "_layouts",
      data: "_data",
      output: "_site"
    },
    templateFormats: ["html", "md", "liquid", "markdown"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid"
  };
}
