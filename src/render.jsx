import { renderToStaticMarkup } from 'react-dom/server';
import Page from './Page.jsx';

// the deal, as the comment at the top of <body> (taste-skill SKILL.md, step 4)
const DEAL = `<!-- type: software (a developer's portfolio whose work is software: internal tools, APIs, desktop apps)
     deal: hero triptych, nav nav-mega (re-dealt from nav-cards: only one project has real screens),
     close close-type, footer footer-dark (re-dealt from footer-statement: it needs a lit ground and the brand is neon noir),
     rhythm space, buttons solid, mark initial, palette: the client's own (start.mjs brand: #0b0607 ground, #ff2b3d accent),
     type instrument (Instrument Sans + DM Mono, self-hosted), radius sharp, grounds ruled (statement section),
     effect grain-gradient in the hero collage, card grounds grain-gradient (bento, still)
     moments: letters-assemble in #principle -->`;

export function render(lang, base) {
  const html = renderToStaticMarkup(<Page lang={lang} base={base} />);
  return '<!doctype html>\n' + html.replace('<body>', '<body>\n' + DEAL + '\n');
}
