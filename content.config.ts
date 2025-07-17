import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import type { UserProps } from '@nuxt/ui-pro'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const docsSchema = z.object({
  links: z.array(z.object({
    avatar: z.object({
      alt: z.string(),
      src: z.string(),
    }).optional(),
    icon: z.string(),
    label: z.string(),
    target: z.string().optional(),
    to: z.string(),
  })),
  navigation: z.object({
    title: z.string().optional(),
  }),
})

const blogSchema = z.object({
  authors: z.custom<Array<UserProps>>(),
  category: z.string(),
  date: z.string().date(),
  image: z.string(),
})

const contentSchema = z.object({
  links: z.array(z.object({
    avatar: z.object({
      alt: z.string(),
      src: z.string(),
    }).optional(),
    icon: z.string(),
    label: z.string(),
    target: z.string().optional(),
    to: z.string(),
  })),
  navigation: z.object({
    title: z.string().optional(),
  }),
})

export default defineContentConfig({
  collections: {
    blog: defineCollection(
      asSitemapCollection({
        schema: blogSchema,
        source: 'blog/**',
        type: 'page',
      }),
    ),
    content: defineCollection(
      asSitemapCollection({
        schema: contentSchema,
        source: '**/*',
        type: 'page',
      }),
    ),
    docs: defineCollection(
      asSitemapCollection({
        schema: docsSchema,
        source: 'docs/**',
        type: 'page',
      }),
    ),
  },
})
