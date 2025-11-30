// src/data/schemas/book.schema.mjs

import { z } from 'zod';

// Schema for a single page
const pageDataSchema = z.object({
  pageNumber: z.number().int().positive(),
  text: z.string().min(1),
  illustration: z.string().url().optional(),
  mask: z.string().optional(),
  narrationUrl: z.string().optional(),
  mood: z.enum(['calm', 'tense', 'joyful']).optional(), // Added mood validation
});

// Schema for the entire book data file
export const bookDataSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  author: z.string().min(1),
  pages: z.array(pageDataSchema).min(1),
});