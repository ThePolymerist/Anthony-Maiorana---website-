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
    promptFile: z.string().regex(/^\/downloads\/[a-zA-Z0-9/_-]+\.txt$/).optional(),
    sampleUrl: z.string().regex(/^\/projects\/[a-zA-Z0-9/_-]+\/$/).optional(),
  }),
});

const briefs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/briefs' }),
  schema: z.object({ title: z.string(), description: z.string() }),
});

export const collections = { projects, briefs };
