import { createServerFn } from "@tanstack/react-start";

export const GITHUB_USER = "rachitmanaktala-ctrl";

export type Repo = {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
};

export type GithubData = {
  profile: { public_repos: number; followers: number; bio: string | null; html_url: string } | null;
  repos: Repo[];
};

// Fetches live from GitHub's public API on every page load, so new repos appear automatically.
export const getGithub = createServerFn({ method: "GET" }).handler(async (): Promise<GithubData> => {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "rachit-portfolio" };
  try {
    const [p, r] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`, { headers }),
    ]);
    const profile = p.ok ? await p.json() : null;
    const repos = r.ok ? ((await r.json()) as Array<Repo & { fork: boolean }>) : [];
    return {
      profile: profile
        ? { public_repos: profile.public_repos, followers: profile.followers, bio: profile.bio, html_url: profile.html_url }
        : null,
      repos: repos.filter((x) => !x.fork).map(({ name, description, html_url, language, stargazers_count, updated_at }) => ({
        name, description, html_url, language, stargazers_count, updated_at,
      })),
    };
  } catch {
    return { profile: null, repos: [] };
  }
});
