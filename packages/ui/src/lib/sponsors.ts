export interface Sponsor {
  id: string
  name: string
  href: string
  logoUrlLight: string
  logoUrlDark: string
  tier: 'platinum' | 'gold' | 'supporters'
}

export const sponsorTierStyles: Record<Sponsor['tier'], string> = {
  platinum: 'border-slate-400/50 bg-slate-400/5',
  gold: 'border-yellow-500/50 bg-yellow-500/5',
  supporters: 'border-blue-500/30 bg-blue-500/5',
}

export const sponsorBadgeStyles: Record<Sponsor['tier'], string> = {
  platinum: 'bg-slate-400/15 text-slate-600 dark:text-slate-300',
  gold: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  supporters: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
}

export const defaultSponsors: Sponsor[] = [
  {
    id: 'cloudiam',
    name: 'Cloud IAM',
    href: 'https://eu1.hubs.ly/H0q0Kbb0',
    logoUrlLight: '/sponsors/cloud-iam-light.svg',
    logoUrlDark: '/sponsors/cloud-iam-dark.svg',
    tier: 'platinum',
  },
  {
    id: 'gilded-health',
    name: 'Gilded Health',
    href: 'https://www.gilded.ch',
    logoUrlLight: '/sponsors/gilded_health.svg',
    logoUrlDark: '/sponsors/gilded_health.svg',
    tier: 'platinum',
  },
  {
    id: 'nudibranches',
    name: 'Nudibranches',
    href: 'https://nudibranches.tech',
    logoUrlLight: '/sponsors/nudibranches.png',
    logoUrlDark: '/sponsors/nudibranches.png',
    tier: 'gold',
  },
  {
    id: 'natalia',
    name: 'Natalia',
    href: 'https://getnatalia.com',
    logoUrlLight: '/sponsors/natalia.svg',
    logoUrlDark: '/sponsors/natalia.svg',
    tier: 'gold',
  },
  // Supporters
  {
    id: 'mineral',
    name: 'Mineral',
    href: 'https://mineral-foundation.org/',
    logoUrlLight: '/sponsors/mineral.png',
    logoUrlDark: '/sponsors/mineral.png',
    tier: 'supporters',
  },
  {
    id: 'polytech-montpellier',
    name: 'Polytech Montpellier',
    href: 'https://www.polytech.umontpellier.fr/',
    logoUrlLight: '/sponsors/polytech-montpellier.png',
    logoUrlDark: '/sponsors/polytech-montpellier.png',
    tier: 'supporters',
  },
]

export function getSponsors(overrides?: Partial<Record<string, Sponsor>>): Sponsor[] {
  return defaultSponsors.map((sponsor) => ({
    ...sponsor,
    ...overrides?.[sponsor.id],
  }))
}
