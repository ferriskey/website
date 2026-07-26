export interface Sponsor {
  id: string
  name: string
  href: string
  logoUrlLight: string
  logoUrlDark: string
  tier: 'lead' | 'partner'
}

export interface Supporter {
  id: string
  name: string
  href: string
  logoUrlLight: string
  logoUrlDark: string
}

export const sponsorTierStyles: Record<Sponsor['tier'], string> = {
  lead: 'border-primary/40 bg-primary/5',
  partner: 'border-border bg-muted/10',
}

export const sponsorBadgeStyles: Record<Sponsor['tier'], string> = {
  lead: 'bg-primary/15 text-primary',
  partner: 'bg-muted text-muted-foreground',
}

// Financial partners — fund development directly.
export const defaultSponsors: Sponsor[] = [
  {
    id: 'cloudiam',
    name: 'Cloud IAM',
    href: 'https://eu1.hubs.ly/H0q0Kbb0',
    logoUrlLight: '/sponsors/cloud-iam-light.svg',
    logoUrlDark: '/sponsors/cloud-iam-dark.svg',
    tier: 'lead',
  },
  {
    id: 'gilded-health',
    name: 'Gilded Health',
    href: 'https://www.gilded.ch',
    logoUrlLight: '/sponsors/gilded_health.svg',
    logoUrlDark: '/sponsors/gilded_health.svg',
    tier: 'partner',
  },
  {
    id: 'anthropic',
    name: 'Anthropic',
    href: 'https://www.anthropic.com',
    logoUrlLight: '/sponsors/anthropic-light.svg',
    logoUrlDark: '/sponsors/anthropic-dark.svg',
    tier: 'partner',
  },
]

// Supporters — in-kind support, community and academic backing (no tier/hierarchy, shown as a logo strip).
export const defaultSupporters: Supporter[] = [
  {
    id: 'nudibranches',
    name: 'Nudibranches',
    href: 'https://nudibranches.tech',
    logoUrlLight: '/sponsors/nudibranches.png',
    logoUrlDark: '/sponsors/nudibranches.png',
  },
  {
    id: 'natalia',
    name: 'Natalia',
    href: 'https://getnatalia.com',
    logoUrlLight: '/sponsors/natalia.svg',
    logoUrlDark: '/sponsors/natalia.svg',
  },
  {
    id: 'mineral',
    name: 'Mineral',
    href: 'https://mineral-foundation.org/',
    logoUrlLight: '/sponsors/mineral.png',
    logoUrlDark: '/sponsors/mineral.png',
  },
  {
    id: 'kong',
    name: 'Kong',
    href: 'https://konghq.com',
    logoUrlLight: '/sponsors/kong.svg',
    logoUrlDark: '/sponsors/kong.svg',
  },
  {
    id: 'mestier',
    name: 'Mestier',
    href: 'https://mestier.fr',
    logoUrlLight: '/sponsors/mestier.svg',
    logoUrlDark: '/sponsors/mestier.svg',
  },
]

export function getSponsors(overrides?: Partial<Record<string, Sponsor>>): Sponsor[] {
  return defaultSponsors.map((sponsor) => ({
    ...sponsor,
    ...overrides?.[sponsor.id],
  }))
}

export function getSupporters(overrides?: Partial<Record<string, Supporter>>): Supporter[] {
  return defaultSupporters.map((supporter) => ({
    ...supporter,
    ...overrides?.[supporter.id],
  }))
}
