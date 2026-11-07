# Abhinay Khoparzi — Personal Website & Algorithmic Arts Portfolio

The personal website and algorithmic arts portfolio of **Abhinay Khoparzi** (Creative Technologist, Algorave Artist, Livecoder, and Video Producer), hosted at [khoparzi.com](https://khoparzi.com) / [khoparzi.github.io](https://khoparzi.github.io).

## Design & Architecture

- **Brand Alignment**: Modernist, rational, high-contrast visual design principles adhering to the [MIT Brand Guidelines](https://brand.mit.edu).
- **Typography**: Zero Google / Adobe Font CDN dependencies. Powered entirely by system neo-grotesque font stacks (`-apple-system`, `BlinkMacSystemFont`, `"Segoe UI"`, `Roboto`, `Helvetica`, `Arial`) and monospace stacks for livecoding.
- **Engine**: [Eleventy (11ty)](https://www.11ty.dev/) v3.x generating fast, lean, static HTML.
- **Zero-Bloat Runtime**: Pure vanilla JavaScript (theme toggle, navigation, dynamic livecoding module loaders for Strudel and Hydra). Zero heavy client-side frameworks or CSS utility bloat.
- **Continuous Deployment**: Automated GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.

## Local Development

### Requirements
- [Node.js](https://nodejs.org/) (v18 or newer)
- npm

### Installation & Run

```bash
# Install dependencies
npm install

# Start local development server with hot reload
npm start

# Build production static site
npm run build
```

The site will be available at `http://localhost:8080`.

## Content Authoring

- **Posts**: Place markdown files in `_posts/` with standard frontmatter:
  ```yaml
  ---
  title: "Post Title"
  date: 2026-06-06
  description: "Brief summary of post"
  tags: ["livecoding", "algorave"]
  ---
  ```
- **Gigs / Performances**: Update `_data/gigs.csv` (`date, name, location, link`). The table on `/gigs/` automatically renders upcoming performances in chronological order followed by past events in reverse chronological order.
