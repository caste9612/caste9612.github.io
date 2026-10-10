import type { Lang } from '../i18n/ui';

const locale: Record<Lang, string> = { en: 'en-GB', it: 'it-IT' };

/** 7 Oct 2026 · 7 ott 2026 */
export const formatDate = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(locale[lang], { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
    new Date(iso),
  );

/** June 2026 · giugno 2026 */
export const formatMonth = (lang: Lang, iso: string) =>
  new Intl.DateTimeFormat(locale[lang], { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(iso));

/** File sizes as Windows shows them (base 1024): 2.8 MB · 2,8 MB · 218 MB */
export function formatSize(lang: Lang, bytes: number) {
  const mb = bytes / 1024 / 1024;
  const digits = mb >= 100 ? 0 : 1;
  const n = new Intl.NumberFormat(locale[lang], { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(mb);
  return `${n} MB`;
}

/** Release tags shown with a leading v: 1.0.1 → v1.0.1 */
export const version = (tag: string) => (tag.startsWith('v') ? tag : `v${tag}`);
