export interface Author {
  name: string
  title: string
  avatar: string
  href?: string
}

export const authors: Record<string, Author> = {
  leadcode_dev: {
    name: 'Baptiste Parmantier',
    title: 'Co-Founder of FerrisKey',
    avatar: '/core/baptiste.jpeg',
    href: 'https://github.com/LeadcodeDev',
  },
  nathaelb: {
    name: "Nathael Bonnal",
    title: "Co-Founder of FerrisKey",
    avatar: '/core/nathael.jpeg',
    href: 'https://github.com/nathaelb',
  }
}

export function getAuthor(id: string): Author | undefined {
  return authors[id]
}
