// Live list of the most recently updated public repos, straight from GitHub's
// public API. No token is needed: the API allows 60 requests an hour per
// visitor, and the result is cached in the browser for an hour on top of that.
// If GitHub can't be reached, the last cached list is used, and failing that
// the snapshot in data/projects.ts.
import { useEffect, useState } from "react";
import { githubRepos as SNAPSHOT, type GitHubRepo } from "../data/projects";

export const GITHUB_USER = "chiranjeevbitm";
export const GITHUB_PROFILE = `https://github.com/${GITHUB_USER}`;

const SHOW = 6;
const CACHE_KEY = "gh-repos-v1";
const CACHE_MS = 60 * 60 * 1000;
const API = `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=40`;

// Repos to leave out even when they are recent, by name.
const HIDE = new Set<string>([GITHUB_USER]);

// GitHub's own language colours.
const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  "Jupyter Notebook": "#DA5B0B",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Go: "#00ADD8",
};

export function langColor(language: string | null): string {
  return (language && LANG_COLORS[language]) || "#8b949e";
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const STEPS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 365 * 864e5],
  ["month", 30 * 864e5],
  ["week", 7 * 864e5],
  ["day", 864e5],
  ["hour", 36e5],
  ["minute", 6e4],
];

/** "Updated 2 days ago", worked out from the push date at render time. */
export function updatedLabel(pushedAt: string): string {
  const diff = new Date(pushedAt).getTime() - Date.now();
  for (const [unit, ms] of STEPS) {
    // 0.9 so that 23 hours reads "yesterday" and 6.5 days reads "last week".
    if (Math.abs(diff) >= ms * 0.9 || unit === "minute") return `Updated ${rtf.format(Math.round(diff / ms), unit)}`;
  }
  return "Updated just now";
}

interface ApiRepo {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}

function pick(list: ApiRepo[]): GitHubRepo[] {
  return list
    .filter((r) => !r.fork && !r.archived && !HIDE.has(r.name))
    // Repos without a description say nothing on a card, so they go last.
    .sort((a, b) => Number(!!b.description) - Number(!!a.description) || b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, SHOW)
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      language: r.language ?? "",
      url: r.html_url,
      stars: r.stargazers_count,
      pushedAt: r.pushed_at,
    }));
}

function readCache(): { at: number; repos: GitHubRepo[] } | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeCache(repos: GitHubRepo[]) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    // Private mode or storage full: the list still shows, it just isn't cached.
  }
}

export type RepoStatus = "loading" | "live" | "cached" | "snapshot";

/** Loads the repos the first time `enabled` is true (i.e. when the section is opened). */
export function useGitHubRepos(enabled: boolean): { repos: GitHubRepo[]; status: RepoStatus } {
  const [state, setState] = useState<{ repos: GitHubRepo[]; status: RepoStatus }>(() => {
    const cached = readCache();
    if (cached && Date.now() - cached.at < CACHE_MS) return { repos: cached.repos, status: "live" };
    return { repos: [], status: "loading" };
  });

  const needsFetch = enabled && state.status === "loading";

  useEffect(() => {
    if (!needsFetch) return;
    const ctrl = new AbortController();
    fetch(API, { signal: ctrl.signal, headers: { Accept: "application/vnd.github+json" } })
      .then((res) => {
        if (!res.ok) throw new Error(`GitHub ${res.status}`);
        return res.json() as Promise<ApiRepo[]>;
      })
      .then((list) => {
        const repos = pick(list);
        if (!repos.length) throw new Error("no repos");
        writeCache(repos);
        setState({ repos, status: "live" });
      })
      .catch((err: unknown) => {
        if (ctrl.signal.aborted) return;
        console.warn("Latest from GitHub: using fallback list", err);
        const cached = readCache();
        setState(cached ? { repos: cached.repos, status: "cached" } : { repos: SNAPSHOT, status: "snapshot" });
      });
    return () => ctrl.abort();
  }, [needsFetch]);

  return state;
}
