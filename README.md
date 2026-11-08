# Personal portfolio

Static site in Astro 7: home page and one page per project, in English (`/`) and Italian (`/it/`).
No cookies, no tracking, no requests to external services: fonts are downloaded at build time and
served by the site.

## Commands

```bash
npm install
npm run dev            # development server on http://localhost:4321
npm run build          # refresh the GitHub data, then build into dist/
npm run build:offline  # build with the data already in src/data/github.json
npm run preview        # serve dist/ locally
npm run check          # type check
```

## Where things are

- `src/i18n/ui.ts`: interface texts in both languages.
- `src/data/site.ts`: name, contacts, About, experience, education, skills. The email address is
  stored as user and domain and only put together in the visitor's browser, after a click, to keep it
  away from the programs that collect addresses for spam.
- `src/data/projects.ts`: the projects: texts, features, requirements, stack, screenshots, the
  four boxes of the details section. The order of the array is the order on the site.
- `src/data/github.json`: versions, dates, download sizes, release counts and licences, written by
  `scripts/fetch-github.mjs` before every build. If GitHub can't be reached, or a repository is not
  public, the data already in the file is kept. A `GITHUB_TOKEN` environment variable is optional.
- `src/assets/`: icons, screenshots and photo, optimised by Astro at build time.

## Screenshots

The screenshots show demo data, never personal or work data:

- Orbit: an isolated build on public repositories cloned to a drive letter (no user name in the paths),
  with real Claude Code chats and, for Activity, transcripts built from the real commits.
- Inlay: the app's own preview mode on a demo vault.
- Cove: a clone with only the built-in sounds.
- Prism: the screenshots of its README, from the simulated backend of its interface.
- Pulse: the public IP address is blurred.

When a screenshot is replaced, check it for personal or work data before adding it.

## Preview images

When a page is shared (LinkedIn, chats), its preview image comes from `public/og/<page>-<lang>.jpg`,
1200 × 630. `scripts/og.mjs` draws them from the built site with the Chrome installed on the
computer: the top of each page, without menu and buttons, with the address of the site. Draw them
again when the look of the site, a project name or a tagline changes, or when a project is added
(add it to the list in the script too):

```bash
npm run build:offline && npm run og && npm run build:offline
```

## Colours

Every colour of the site is a token at the top of `src/styles/global.css`: pure black surfaces, the
amber of Brace as the accent, and the Neptune-blue planet of the home page (its surface and its halo
have tokens of their own). The SVGs of the header and of the hero and the starfield read the same
tokens. The colour of each project comes from its icon (`color` in `src/data/projects.ts`).

## Publishing

The site is published on GitHub Pages at https://caste9612.github.io by the workflow in
`.github/workflows/deploy.yml`. It builds the site (GitHub data included) and deploys it:

- at every push to `main`;
- every night, so new releases of the projects show up without changes to this repository;
- on demand, from the Actions tab (Deploy → Run workflow) or with `gh workflow run deploy.yml`.

GitHub suspends scheduled workflows in repositories without commits for 60 days; if that happens, it
sends an email and the workflow can be enabled again from the Actions tab.

To use a custom domain later: set it in Settings → Pages, then change `site` in `astro.config.mjs`.
