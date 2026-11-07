import path from "node:path";

export default {
  layout: "post.html",
  tags: ["post"],
  eleventyComputed: {
    permalink: (data) => {
      const ext = path.extname(data.page.inputPath);
      const filename = path.basename(data.page.inputPath, ext);
      const normalized = filename.replace(/^(\d{4})-(\d{1,2})-(\d{1,2})-/, (_, y, m, d) => {
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}-`;
      });
      return `/${normalized}/index.html`;
    }
  }
};
