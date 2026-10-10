import type { Text } from '../i18n/ui';
import type { GlyphName } from '../lib/glyphs';

export const person = {
  name: 'Antonio Castellucci',
  // user and domain of the email address, kept apart so that the whole address appears neither in
  // the code nor in the pages: the contact section puts it together when a visitor asks for it
  email: ['antonio.castellucci4', 'gmail.com'],
  github: 'https://github.com/caste9612',
  githubRepos: 'https://github.com/caste9612?tab=repositories',
  linkedin: 'https://www.linkedin.com/in/antonio-castellucci-2398a419b/',
  coordinates: '43.34° N · 11.92° E',
};

export const about: { paragraphs: Text[] } = {
  paragraphs: [
    {
      en: "I'm a software engineer based in Tuscany. Since 2021 I've worked in R&D at Visia Lab, on software for automated in-vitro diagnostic instruments and digital pathology.",
      it: 'Sono un ingegnere informatico e vivo in Toscana. Dal 2021 lavoro nel reparto R&D di Visia Lab, sul software di strumenti automatici per la diagnostica in vitro e la patologia digitale.',
    },
    {
      en: 'In my spare time I develop desktop tools, which I publish on this site.',
      it: 'Nel tempo libero sviluppo strumenti desktop, che pubblico su questo sito.',
    },
  ],
};

export interface Job {
  role: Text;
  org: string;
  /** what the company does, in one sentence */
  sector: Text;
  /** first month, YYYY-MM; without an end the job is the current one */
  start: string;
  end?: string;
  areas: { glyph: GlyphName; text: Text }[];
}

export const experience: Job[] = [
  {
    role: { en: 'R&D Software Specialist', it: 'R&D Software Specialist' },
    org: 'Visia Lab',
    sector: {
      en: 'A company that designs and manufactures automated laboratory instruments for in-vitro clinical diagnostics and digital pathology.',
      it: 'Azienda che progetta e produce strumenti automatici di laboratorio per la diagnostica clinica in vitro e la patologia digitale.',
    },
    start: '2021-03',
    areas: [
      { glyph: 'robot', text: { en: 'Robotics and motorized stages', it: 'Robotica e assi motorizzati' } },
      {
        glyph: 'camera',
        text: {
          en: 'Real-time image acquisition, compression and processing',
          it: 'Acquisizione, compressione ed elaborazione di immagini in tempo reale',
        },
      },
      { glyph: 'eye', text: { en: 'Computer vision', it: 'Visione artificiale' } },
      { glyph: 'neural', text: { en: 'Deep learning', it: 'Deep learning' } },
      { glyph: 'globe', text: { en: 'Web platforms', it: 'Piattaforme web' } },
    ],
  },
];

/** most recent first; from and to are the years of the course */
export const education: { degree: Text; school: Text; from: string; to: string }[] = [
  {
    degree: { en: 'M.Sc. Computer Science & Engineering', it: 'Laurea magistrale in Ingegneria Informatica' },
    school: { en: 'University of Florence', it: 'Università di Firenze' },
    from: '2019',
    to: '2021',
  },
  {
    degree: { en: 'B.Sc. Computer Science & Engineering', it: 'Laurea triennale in Ingegneria Informatica' },
    school: { en: 'University of Florence', it: 'Università di Firenze' },
    from: '2015',
    to: '2018',
  },
];

export const skills: { group: Text; items: string[] }[] = [
  { group: { en: 'Languages', it: 'Linguaggi' }, items: ['C#', 'C++', 'Rust', 'Python', 'TypeScript', 'Java'] },
  {
    group: { en: 'Frameworks', it: 'Framework' },
    items: ['.NET', 'WinUI', 'WPF', 'Tauri', 'Svelte', 'Angular', 'Spring Boot', 'TensorFlow', 'ONNX'],
  },
  {
    group: { en: 'Protocols & standards', it: 'Protocolli e standard' },
    items: ['gRPC', 'WebSocket', 'DICOM / WSI', 'IIIF', 'JPEG 2000'],
  },
  { group: { en: 'Tools', it: 'Strumenti' }, items: ['Docker', 'Git', 'Linux', 'LaTeX'] },
];
