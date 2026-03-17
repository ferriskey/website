export interface Sponsor {
  id: string
  name: string
  href: string
  logoUrl: string
  tier: 'gold' | 'silver' | 'bronze'
}

export const sponsorTierStyles: Record<Sponsor['tier'], string> = {
  gold: 'border-yellow-500/50 bg-yellow-500/5',
  silver: 'border-zinc-400/50 bg-zinc-400/5',
  bronze: 'border-orange-700/50 bg-orange-700/5',
}

export const sponsorBadgeStyles: Record<Sponsor['tier'], string> = {
  gold: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  silver: 'bg-zinc-400/15 text-zinc-600 dark:text-zinc-400',
  bronze: 'bg-orange-700/15 text-orange-800 dark:text-orange-400',
}

export const defaultSponsors: Sponsor[] = [
  {
      id: 'cloudiam',
      name: 'Cloud IAM',
      href: 'https://www.cloud-iam.com/',
      logoUrl: 'https://cdn.brandfetch.io/idEKeGBP2Y/w/300/h/300/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1769852965392',
      tier: 'gold',
    },
    {
      id: 'mineral',
      name: 'Mineral',
      href: 'https://mineral-dart.dev/',
      logoUrl: 'https://mineral-dart.dev/logo.svg',
      tier: 'silver',
    },
]

export function getSponsors(overrides?: Partial<Record<string, Sponsor>>): Sponsor[] {
  return defaultSponsors.map((sponsor) => ({
    ...sponsor,
    ...overrides?.[sponsor.id],
  }))
}
