export interface Contributor {
  id: number
  login: string
  avatarUrl: string
  profileUrl: string
  contributions: number
}

export type ContributorSortStrategy = 'contributions' | 'alphabetical' | 'random'

interface FetchContributorsOptions {
  owner?: string
  repo?: string
  token?: string
}

let cachedContributors: Contributor[] | null = null
let cacheTimestamp = 0
const CACHE_TTL = 5 * 60 * 1000

export async function fetchContributors(options?: FetchContributorsOptions): Promise<Contributor[]> {
  const owner = options?.owner ?? 'LeadcodeDev'
  const repo = options?.repo ?? 'explainer_v2'

  const now = Date.now()
  if (cachedContributors && now - cacheTimestamp < CACHE_TTL) {
    return cachedContributors
  }

  try {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }
    if (options?.token) {
      headers.Authorization = `Bearer ${options.token}`
    }

    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contributors?per_page=100`,
      { headers },
    )

    if (!response.ok) {
      console.warn(`Failed to fetch contributors: ${response.status} ${response.statusText}`)
      return []
    }

    const data = await response.json()
    const contributors: Contributor[] = data
      .filter((c: { type?: string }) => c.type !== 'Bot')
      .map((c: { id: number; login: string; avatar_url: string; html_url: string; contributions: number }) => ({
        id: c.id,
        login: c.login,
        avatarUrl: c.avatar_url,
        profileUrl: c.html_url,
        contributions: c.contributions,
      }))

    cachedContributors = contributors
    cacheTimestamp = now
    return contributors
  } catch (error) {
    console.warn('Failed to fetch contributors:', error)
    return []
  }
}

export function sortContributors(contributors: Contributor[], strategy: ContributorSortStrategy): Contributor[] {
  const sorted = [...contributors]
  switch (strategy) {
    case 'contributions':
      return sorted.sort((a, b) => b.contributions - a.contributions)
    case 'alphabetical':
      return sorted.sort((a, b) => a.login.localeCompare(b.login))
    case 'random':
      for (let i = sorted.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[sorted[i], sorted[j]] = [sorted[j], sorted[i]]
      }
      return sorted
  }
}

export const defaultContributors: Contributor[] = []
