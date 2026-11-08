// Draws the preview images shown when a page of the site is shared (Open Graph, 1200 × 630) from the
// built site itself: the top of each page, without menu, buttons and screenshots, with the address
// of the site underneath. Writes public/og/<page>-<lang>.jpg; run it after a build when the look of
// the site, a project name or a tagline changes, then build again:
//   npm run build:offline && npm run og && npm run build:offline
// It uses the Chrome installed on the computer (playwright-core does not download browsers).
import { preview } from 'astro';
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('..', import.meta.url);
const out = new URL('public/og/', root);
const port = 4329;
const pages = [
  { name: 'home', path: '' },
  ...['orbit', 'pulse', 'prism', 'argus', 'cove', 'inlay'].map((slug) => ({ name: slug, path: `projects/${slug}/` })),
];
const langs = { en: '', it: 'it/' };

// what changes on the page to make it a card
const css = `
  .site-header, .scroll-cue, .ticker, .readouts, .lede, .ctas, .crumbs, .p-meta, .gallery, astro-dev-toolbar { display: none !important; }
  html, body { overflow: hidden !important; }
  .hero { min-height: 630px; height: 630px; padding: 0 0 54px; justify-content: center; }
  .hero-inner { --s: 760px; }
  .p-hero { height: 630px; padding: 40px 0 0; }
  .hero .name { font-size: 64px; }
  .hero .role { font-size: 15px; margin-top: 22px; }
  .p-hero .stage.xl { height: 300px; }
  .p-hero .p-title { font-size: 84px; }
  .p-hero .p-tl { max-width: 36ch; margin-top: 22px; font-size: 27px; line-height: 1.4; color: var(--text); }
  .vf { inset: 22px 26px !important; height: auto !important; }
  .og-url { position: fixed; left: 0; right: 0; bottom: 34px; text-align: center; font: 500 15px/1 var(--f-mono); letter-spacing: .2em; color: var(--muted); z-index: 5; }
  .og-url b { font-weight: 500; color: var(--accent); }
`;

await mkdir(out, { recursive: true });
const server = await preview({ root: fileURLToPath(root), server: { port, host: '127.0.0.1' }, logLevel: 'warn' });
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'no-preference' });
try {
  for (const p of pages) {
    for (const [lang, prefix] of Object.entries(langs)) {
      await page.goto(`http://127.0.0.1:${port}/${prefix}${p.path}`, { waitUntil: 'networkidle' });
      await page.addStyleTag({ content: css });
      // the name is already big on the home page; elsewhere it goes next to the address
      await page.evaluate((home) => {
        const line = document.createElement('p');
        line.className = 'og-url';
        line.innerHTML = home ? '<b>caste9612.github.io</b>' : 'Antonio Castellucci · <b>caste9612.github.io</b>';
        document.body.append(line);
        window.scrollTo(0, 0);
      }, p.name === 'home');
      // let the entrance animations finish
      await page.waitForTimeout(3500);
      const file = new URL(`${p.name}-${lang}.jpg`, out);
      await page.screenshot({ path: fileURLToPath(file), type: 'jpeg', quality: 86 });
      console.log(`[og] public/og/${p.name}-${lang}.jpg`);
    }
  }
} finally {
  await browser.close();
  await server.stop();
}
