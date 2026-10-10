// Release data read from GitHub at build time (see scripts/fetch-github.mjs).
import data from '../data/github.json';

export interface Asset {
  name: string;
  size: number;
  url: string;
}

export interface Release {
  tag: string;
  name: string | null;
  date: string;
  url: string;
  assets: Asset[];
}

export interface RepoInfo {
  url: string;
  license: string | null;
  releaseCount: number;
  firstRelease: string | null;
  latest: Release | null;
}

const repos = data.repos as Record<string, RepoInfo | undefined>;

export const publicRepos: number | null = data.user?.publicRepos ?? null;

export function repo(slug: string): RepoInfo {
  const info = repos[slug];
  if (!info) throw new Error(`No GitHub data for "${slug}": run npm run data`);
  return info;
}

export const assetSize = (slug: string, pattern: RegExp) =>
  repo(slug).latest?.assets.find((a) => pattern.test(a.name))?.size ?? null;

/** The descriptive part of a release name: "Orbit v0.9.1 — Smooth layout motion" → "Smooth layout motion". */
export function releaseTitle(release: Release) {
  const match = release.name?.match(/\s[—–:-]\s(.+)$/);
  return match ? match[1].trim() : null;
}
