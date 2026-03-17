import { glob } from 'astro/loaders'
import { defineCollection, z } from 'astro:content'

const posts = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    short_description: z.string().optional(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    status: z.enum(['draft', 'published']).default('draft'),
    author: z.string().optional(),
  }),
})

export const collections = { posts }
