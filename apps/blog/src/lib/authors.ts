export interface Author {
  name: string
  title: string
  avatar: string
  href?: string
}

export const authors: Record<string, Author> = {
  leadcode_dev: {
    name: 'Baptiste Parmantier',
    title: 'Creator of Explainer',
    avatar: 'https://avatars.githubusercontent.com/u/8946317?v=4',
    href: 'https://github.com/LeadcodeDev',
  },
}

export function getAuthor(id: string): Author | undefined {
  return authors[id]
}
