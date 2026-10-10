// Reads release data for the projects from the GitHub API and writes src/data/github.json.
// Runs before every build. When GitHub can't be reached, or a repository is not public yet,
// the data already in the file is kept, so the build never depends on the network.
import { readFile, writeFile } from 'node:fs/promises';

const USER = 'caste9612';
// project slug → repository name
const REPOS = {
  orbit: 'Orbit',
  pulse: 'Pulse',
  prism: 'Prism',
  argus: 'Argus',
  cove: 'Cove',
  inlay: 'Inlay',
};
const OUT = new URL('../src/data/github.json', import.meta.url);

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${USER}-portfolio-build`,
  'X-GitHub-Api-Version': '2022-11-28',
};
// Optional: in CI a token raises the rate limit. It is never written anywhere.
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

async function api(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return res.json();
}

async function repoData(name) {
  const repo = await api(`/repos/${USER}/${name}`);
  const releases = (await api(`/repos/${USER}/${name}/releases?per_page=100`)).filter((r) => !r.draft);
  // Like GitHub's "latest release": the newest one that is not a prerelease.
  const latest = releases
    .filter((r) => !r.prerelease)
    .sort((a, b) => b.published_at.localeCompare(a.published_at))[0];
  const license = repo.license?.spdx_id;
  return {
    url: repo.html_url,
    license: license && license !== 'NOASSERTION' ? license : null,
    releaseCount: releases.length,
    firstRelease: releases.map((r) => r.published_at).sort()[0] ?? null,
    latest: latest
      ? {
          tag: latest.tag_name,
          name: latest.name,
          date: latest.published_at,
          url: latest.html_url,
          assets: latest.assets.map((a) => ({ name: a.name, size: a.size, url: a.browser_download_url })),
        }
      : null,
  };
}

let previous = {};
try {
  previous = JSON.parse(await readFile(OUT, 'utf8'));
} catch {
  // first run: nothing to keep
}

const out = { fetchedAt: new Date().toISOString(), user: previous.user ?? null, repos: { ...previous.repos } };
const failed = [];

try {
  const user = await api(`/users/${USER}`);
  out.user = { publicRepos: user.public_repos };
} catch (e) {
  failed.push(`user (${e.message})`);
}

for (const [slug, name] of Object.entries(REPOS)) {
  try {
    out.repos[slug] = await repoData(name);
  } catch (e) {
    failed.push(`${name} (${e.message})`);
  }
}

if (failed.length) console.warn(`[github] kept the previous data for: ${failed.join(', ')}`);
if (failed.length === Object.keys(REPOS).length + 1) {
  console.warn('[github] nothing could be read, src/data/github.json left as it is');
} else {
  await writeFile(OUT, JSON.stringify(out, null, 2) + '\n');
  console.log('[github] src/data/github.json updated');
}
