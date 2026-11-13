import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(['In development', 'Prototype', 'Published', 'Idea']),
    category: z.string(),
    order: z.number(),
    updated: z.string(),
    repository: z.url().optional(),
  }),
});

export const collections = { projects };
