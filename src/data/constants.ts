// src/data/constants.ts

import { BookData } from '@/data/types';
import slimeyData from '@/books/slimey/data.json';

// This map centralizes all book data, making it easy to add new books.
// The key is the book's slug, which is used in the URL.
export const bookDataMap: { [key: string]: BookData } = {
  slimey: slimeyData as BookData,
};

// We can also export an array of all books for easier mapping in UI components.
export const allBooks: BookData[] = Object.values(bookDataMap);