import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { repo } from '../lib/github';
import { langs, url, type Lang } from '../i18n/ui';

// Sitemap for search engines: every page in both languages, each one with the links to its
// translations (the 404 page is left out). The date of a page is that of the latest release it
// shows: of its project, or of the newest project for the home page.
export const GET: APIRoute = ({ site }) => {
  const abs = (lang: Lang, path: string) => new URL(url(lang, path), site).href;
  const released = (slug: string) => repo(slug).latest?.date.slice(0, 10) ?? null;
  const dates = projects.map((p) => released(p.slug)).filter((d): d is string => d !== null);
  const pages = [
    { path: '', date: dates.sort().at(-1) ?? null },
    ...projects.map((p) => ({ path: `projects/${p.slug}`, date: released(p.slug) })),
  ];
  const entries = pages.flatMap(({ path, date }) =>
    langs.map((lang) =>
      [
        '  <url>',
        `    <loc>${abs(lang, path)}</loc>`,
        ...(date ? [`    <lastmod>${date}</lastmod>`] : []),
        ...langs.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${abs(l, path)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs('en', path)}"/>`,
        '  </url>',
      ].join('\n'),
    ),
  );
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
