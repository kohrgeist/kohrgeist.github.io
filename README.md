# kohrgeist.github.io

Personal site of Marcos Pereira: the projects (FCA Board, Shenzhen Scrolls API, LiderOps, Aeon), the stack and how to reach me. English at `/`, Portuguese at `/pt/`.

## How it is built

- **React, rendered at build time.** `src/Page.jsx` holds the whole page as components and `src/content.js` every word in both languages. `build.mjs` renders each language to static HTML with `react-dom/server`, so no React runs in the browser.
- **Motion and layout** come from the [taste-skill](https://github.com/Leonxlnx/taste-skill) kit (MIT), copied into `public/assets`: the system CSS, the UI fragments, the grain-gradient grounds, the diagram and the letters-assemble moment.
- **Fonts** are self-hosted (Instrument Sans and DM Mono, from Fontsource). Tool logos come from Gil Barbara's SVG Logos (CC0); they are trademarks of their owners.

## Run it

```bash
npm install
npm run build     # dist/index.html and dist/pt/index.html
npm run preview   # http://localhost:4173
```

## Deploy

Push to `main`: `.github/workflows/pages.yml` builds the site and publishes `dist/` to GitHub Pages (Settings → Pages → Source: GitHub Actions).
