import { defineCollection, z } from 'astro:content';
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const posts = defineCollection({
  loader: {
    name: 'markdown-posts-loader',
    load: async ({ store, parseData, renderMarkdown, generateDigest }) => {
      const dir = path.resolve('./_posts');
      const files = await fs.readdir(dir);
      const postFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.markdown'));

      for (const file of postFiles) {
        const filePath = path.join(dir, file);
        const content = await fs.readFile(filePath, 'utf-8');
        const digest = generateDigest(content);

        let data: any = {};
        let body = content;

        if (content.startsWith('---')) {
          const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
          if (match) {
            try {
              data = yaml.load(match[1]) || {};
            } catch (e) {
              data = {};
            }
            body = match[2];
          }
        }

        // If title missing, extract from first heading or filename
        if (!data.title) {
          const h1Match = body.match(/^#\s+(.+)$/m);
          if (h1Match) {
            data.title = h1Match[1].trim();
          } else {
            data.title = file.replace(/^(\d{4}-\d{1,2}-\d{1,2}-)?/, '').replace(/\.(md|markdown)$/, '');
          }
        }

        // If date missing, extract from filename
        if (!data.date) {
          const dMatch = file.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
          if (dMatch) {
            data.date = new Date(`${dMatch[1]}-${dMatch[2].padStart(2, '0')}-${dMatch[3].padStart(2, '0')}T00:00:00Z`);
          }
        }

        // Handle tags as array if string
        if (typeof data.tags === 'string') {
          data.tags = [data.tags];
        }

        const parsedData = await parseData({ id: file, data });
        const rendered = renderMarkdown ? await renderMarkdown(body) : undefined;

        store.set({
          id: file,
          data: parsedData,
          body,
          filePath: `_posts/${file}`,
          digest,
          rendered
        });
      }
    }
  },
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    subtitle: z.string().optional(),
    tags: z.array(z.string()).optional(),
    layout: z.string().optional(),
    published: z.boolean().optional(),
    image: z.string().optional()
  })
});

export const collections = { posts };
