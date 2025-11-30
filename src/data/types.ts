// src/data/types.ts

// This file is the single source of truth for our data structures.

export interface PageData {
  pageNumber: number;
  text: string;
  illustration?: string;
  mask?: string;
  narrationUrl?: string;
  mood?: 'calm' | 'tense' | 'joyful'; // Added optional mood property
}

export interface BookData {
  slug: string;
  title: string;
  author: string;
  pages: PageData[];
}