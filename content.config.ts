import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSitemapCollection } from '@nuxtjs/sitemap/content'

const docsSchema = z.object({
  navigation: z.object({
    icon: z.string().optional(),
    title: z.string().optional(),
  }).optional(),
})

const docs2Schema = z.object({
  links: z.array(z.object({
    avatar: z.object({
      alt: z.string(),
      src: z.string(),
    }).optional(),
    icon: z.string(),
    label: z.string(),
    target: z.string().optional(),
    to: z.string(),
  })).optional(),
  navigation: z.object({
    title: z.string().optional(),
  }).optional(),
})

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      asSitemapCollection({
        schema: docsSchema,
        source: 'docs/**',
        type: 'page',
      }),
    ),
    docs2: defineCollection(
      asSitemapCollection({
        schema: docs2Schema,
        source: 'docs2/**',
        type: 'page',
      }),
    ),
  },
})
