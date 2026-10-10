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

Some screenshots have parts blurred before being added to `src/assets/`:

- Pulse: the public IP address.
- Orbit, Activity view: names of other projects and the text of the prompts.
- Prism, backup check: the names of the missing files.

When a screenshot is replaced, check it for personal or work data before adding it.

## Publishing

The site is published on GitHub Pages at https://caste9612.github.io by the workflow in
`.github/workflows/deploy.yml`. It builds the site (GitHub data included) and deploys it:

- at every push to `main`;
- every night, so new releases of the projects show up without changes to this repository;
- on demand, from the Actions tab (Deploy → Run workflow) or with `gh workflow run deploy.yml`.

GitHub suspends scheduled workflows in repositories without commits for 60 days; if that happens, it
sends an email and the workflow can be enabled again from the Actions tab.

To use a custom domain later: set it in Settings → Pages, then change `site` in `astro.config.mjs`.
