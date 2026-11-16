import { contactEmail } from '@explainer/ui/lib/footer'

/** `null` = information still missing: the page shows a visible placeholder until it is filled in. */
type Field = string | null

/**
 * FerrisKey has no legal entity yet: the site is published by a natural person acting on a
 * non-professional basis (LCEN art. 1-1, III), who may withhold their home address and phone.
 */
export const publisher = {
  name: 'Nathaël Bonnal' as Field,
  email: contactEmail,
}

export const host = {
  name: 'OVH SAS (OVHcloud)' as Field,
  address: '2 rue Kellermann, 59100 Roubaix, France' as Field,
  phone: '+33 9 72 10 10 07' as Field,
}

export const retention = {
  serverLogs: { fr: '12 mois' as Field, en: '12 months' as Field },
  emails: { fr: '3 ans après le dernier échange', en: '3 years after the last exchange' },
}

export const lastUpdated = '2026-11-15'
