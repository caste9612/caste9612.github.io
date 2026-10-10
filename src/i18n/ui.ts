import { getRelativeLocaleUrl } from 'astro:i18n';

export const langs = ['en', 'it'] as const;
export type Lang = (typeof langs)[number];
/** A text in every language of the site. */
export type Text = Record<Lang, string>;

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'it' : 'en');

/** Path of a page in the given language, e.g. url('it', 'projects/orbit') → /it/projects/orbit/ */
export const url = (lang: Lang, path = '') => getRelativeLocaleUrl(lang, path);

interface Strings {
  skip: string;
  navLabel: string;
  navProjects: string;
  navAbout: string;
  navContact: string;
  langLabel: string;
  menu: string;
  metaHome: string;
  heroRole: string;
  heroLede: string;
  ctaProjects: string;
  ctaContact: string;
  roLocation: string;
  roLatest: string;
  tickerLabel: string;
  projEyebrow: string;
  projTitle: string;
  projLede: string;
  downloadFor: (platform: string) => string;
  download: string;
  source: string;
  details: string;
  detailsOf: (name: string) => string;
  repos: (n: number) => string;
  aboutEyebrow: string;
  aboutTitle: string;
  experience: string;
  education: string;
  skills: string;
  areas: string;
  today: string;
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  showEmail: string;
  copyEmail: string;
  copied: string;
  emailNoJs: string;
  footer: string;
  projects: string;
  metaProject: (name: string, tagline: string) => string;
  overviewEyebrow: string;
  overviewTitle: string;
  detailsEyebrow: string;
  detailsTitle: string;
  requirements: string;
  builtWith: string;
  latestRelease: string;
  releasesSince: (n: number, since: string) => string;
  allReleases: string;
  othersEyebrow: string;
  othersTitle: string;
  screenshots: string;
  chooseShot: string;
  platform: string;
  installer: string;
  downloadSize: string;
  program: string;
  license: string;
  licenseName: (id: string) => string;
  requires: string;
  installation: string;
  notNeeded: string;
  runtime: string;
  included: string;
  releases: string;
  notFoundTitle: string;
  notFoundText: string;
  backHome: string;
}

export const ui: Record<Lang, Strings> = {
  en: {
    skip: 'Skip to content',
    navLabel: 'Sections',
    navProjects: 'Projects',
    navAbout: 'About',
    navContact: 'Contact',
    langLabel: 'Language',
    menu: 'Menu',
    metaHome: 'Antonio Castellucci, software engineer in R&D. Open-source desktop software: free to download, with source code on GitHub.',
    heroRole: 'Software engineer, R&D — Tuscany, Italy',
    heroLede: 'I work on software for laboratory automation and digital pathology. Here I publish the open-source tools I build in my spare time.',
    ctaProjects: 'Projects',
    ctaContact: 'Contact',
    roLocation: 'Location',
    roLatest: 'Latest release',
    tickerLabel: 'Latest releases',
    projEyebrow: '01 — Projects',
    projTitle: 'Open-source software',
    projLede: 'Desktop applications I develop in my spare time. Free to download, with source code on GitHub.',
    downloadFor: (platform) => `Download for ${platform}`,
    download: 'Download',
    source: 'Source code',
    details: 'Details',
    detailsOf: (name) => `Details about ${name}`,
    repos: (n) => `${n} public repositories on GitHub, including university projects.`,
    aboutEyebrow: '02 — About',
    aboutTitle: 'About',
    experience: 'Experience',
    education: 'Education',
    skills: 'Skills',
    areas: 'Areas of work',
    today: 'Today',
    contactEyebrow: '03 — Contact',
    contactTitle: 'Contact',
    contactText: 'For questions about the projects, you can write to me by email or on LinkedIn.',
    showEmail: 'Show email address',
    copyEmail: 'Copy address',
    copied: 'Address copied',
    emailNoJs: 'The email address is shown with JavaScript enabled.',
    footer: 'No cookies, no tracking',
    projects: 'Projects',
    metaProject: (name, tagline) => `${name}: ${tagline} Free download, source code on GitHub.`,
    overviewEyebrow: '01 — Overview',
    overviewTitle: 'What it does',
    detailsEyebrow: '02 — Details',
    detailsTitle: 'Requirements and stack',
    requirements: 'Requirements',
    builtWith: 'Built with',
    latestRelease: 'Latest release',
    releasesSince: (n, since) => (n === 1 ? `First release, ${since}` : `${n} releases since ${since}`),
    allReleases: 'All releases on GitHub',
    othersEyebrow: 'Projects',
    othersTitle: 'Other projects',
    screenshots: 'Screenshots',
    chooseShot: 'Choose a screenshot',
    platform: 'Platform',
    installer: 'Installer',
    downloadSize: 'Download',
    program: 'Program',
    license: 'License',
    licenseName: (id) => `${id} license`,
    requires: 'Requires',
    installation: 'Installation',
    notNeeded: 'Not needed',
    runtime: 'Runtime',
    included: 'Included',
    releases: 'Releases',
    notFoundTitle: 'Page not found',
    notFoundText: 'The page you are looking for does not exist or has moved.',
    backHome: 'Back to the home page',
  },
  it: {
    skip: 'Vai al contenuto',
    navLabel: 'Sezioni',
    navProjects: 'Progetti',
    navAbout: 'Chi sono',
    navContact: 'Contatti',
    langLabel: 'Lingua',
    menu: 'Menu',
    metaHome: 'Antonio Castellucci, ingegnere informatico in R&D. Software desktop open source: si scarica gratis e il codice è su GitHub.',
    heroRole: 'Ingegnere informatico, R&D — Toscana',
    heroLede: "Mi occupo di software per l'automazione di laboratorio e la patologia digitale. Qui pubblico gli strumenti open source che sviluppo nel tempo libero.",
    ctaProjects: 'Progetti',
    ctaContact: 'Contatti',
    roLocation: 'Posizione',
    roLatest: 'Ultima versione',
    tickerLabel: 'Ultime versioni',
    projEyebrow: '01 — Progetti',
    projTitle: 'Software open source',
    projLede: 'Applicazioni desktop che sviluppo nel tempo libero. Si scaricano gratis e il codice è su GitHub.',
    downloadFor: (platform) => `Scarica per ${platform}`,
    download: 'Scarica',
    source: 'Codice sorgente',
    details: 'Dettagli',
    detailsOf: (name) => `Dettagli su ${name}`,
    repos: (n) => `${n} repository pubblici su GitHub, compresi i progetti dell'università.`,
    aboutEyebrow: '02 — Chi sono',
    aboutTitle: 'Chi sono',
    experience: 'Esperienza',
    education: 'Formazione',
    skills: 'Competenze',
    areas: 'Aree di lavoro',
    today: 'Oggi',
    contactEyebrow: '03 — Contatti',
    contactTitle: 'Contatti',
    contactText: 'Per domande sui progetti puoi scrivermi per email o su LinkedIn.',
    showEmail: 'Mostra indirizzo email',
    copyEmail: 'Copia indirizzo',
    copied: 'Indirizzo copiato',
    emailNoJs: "L'indirizzo email compare con JavaScript attivo.",
    footer: 'Nessun cookie, nessun tracciamento',
    projects: 'Progetti',
    metaProject: (name, tagline) => `${name}: ${tagline} Si scarica gratis, il codice è su GitHub.`,
    overviewEyebrow: '01 — Panoramica',
    overviewTitle: 'Cosa fa',
    detailsEyebrow: '02 — Dettagli',
    detailsTitle: 'Requisiti e tecnologie',
    requirements: 'Requisiti',
    builtWith: 'Tecnologie',
    latestRelease: 'Ultima versione',
    releasesSince: (n, since) => (n === 1 ? `Prima versione, ${since}` : `${n} versioni da ${since}`),
    allReleases: 'Tutte le versioni su GitHub',
    othersEyebrow: 'Progetti',
    othersTitle: 'Altri progetti',
    screenshots: 'Schermate',
    chooseShot: 'Scegli una schermata',
    platform: 'Piattaforma',
    installer: 'Installer',
    downloadSize: 'Download',
    program: 'Programma',
    license: 'Licenza',
    licenseName: (id) => `licenza ${id}`,
    requires: 'Richiede',
    installation: 'Installazione',
    notNeeded: 'Non serve',
    runtime: 'Runtime',
    included: 'Incluso',
    releases: 'Versioni',
    notFoundTitle: 'Pagina non trovata',
    notFoundText: 'La pagina che cerchi non esiste o è stata spostata.',
    backHome: 'Torna alla home',
  },
};
