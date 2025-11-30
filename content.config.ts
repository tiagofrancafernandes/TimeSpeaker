import { z } from 'zod';

import { defineCollection, defineContentConfig } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        content: defineCollection({
            type: 'page',
            source: '**/*.md',
            schema: z.object({
                date: z.string(),
            }),
        }),
        staticPages: defineCollection({
            type: 'page',
            source: 'staticPages/**/*.md',
            schema: z.object({
                date: z.string(),
            }),
        }),
        staticDocs: defineCollection({
            type: 'page',
            source: 'staticDocs/**/*.md',
            schema: z.object({
                date: z.string(),
            }),
        }),
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',

            schema: z.object({
                date: z.string(),
            }),
        }),
    },
});
