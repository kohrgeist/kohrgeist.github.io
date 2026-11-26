// Builds the static site: React renders each language to plain HTML, public/ is copied beside it.
// npm run build  ->  dist/index.html (English) and dist/pt/index.html (Portuguese)
import { build } from 'esbuild';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

await build({
  entryPoints: ['src/render.jsx'], bundle: true, platform: 'node', format: 'esm',
  outfile: '.build/render.mjs', jsx: 'automatic', packages: 'external', logLevel: 'warning',
});
const { render } = await import(pathToFileURL(path.resolve('.build/render.mjs')).href + '?v=' + Date.now());

await fs.rm('dist', { recursive: true, force: true });
await fs.cp('public', 'dist', { recursive: true });
for (const [lang, file, base] of [['en', 'index.html', ''], ['pt', 'pt/index.html', '../']]) {
  await fs.mkdir(path.dirname(path.join('dist', file)), { recursive: true });
  await fs.writeFile(path.join('dist', file), render(lang, base));
}
await fs.writeFile('dist/.nojekyll', '');   // GitHub Pages: serve the assets folder as is
console.log('built dist/index.html and dist/pt/index.html');
