export type FooterLocale = 'en' | 'fr'

export const footerCopy = {
  en: {
    product: 'Product',
    community: 'Community',
    project: 'Project',
    contact: 'Contact us',
    tagline: 'Open-source identity and access management, written in Rust.',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
  },
  fr: {
    product: 'Produit',
    community: 'Communauté',
    project: 'Projet',
    contact: 'Nous contacter',
    tagline: 'Gestion des identités et des accès open source, écrite en Rust.',
    legal: 'Mentions légales',
    privacy: 'Politique de confidentialité',
  },
} as const satisfies Record<FooterLocale, Record<string, string>>

export const contactEmail = 'contact@ferriskey.io'

export function appHref(base: string | undefined, path: string): string {
  return `${(base ?? '').replace(/\/+$/, '')}${path}`
}
