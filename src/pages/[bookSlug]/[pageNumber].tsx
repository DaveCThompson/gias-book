// src/pages/[bookSlug]/[pageNumber].tsx

import React from 'react';
// FIX: Import GetStaticProps and GetStaticPaths instead of GetServerSideProps
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import BookReader from '@/features/BookReader/BookReader';
import { BookData } from '@/data/types';
import slimeyData from '@/books/slimey/data.json';

interface BookPageProps {
  bookData: BookData;
  currentPage: number;
}

const bookDataMap: { [key: string]: BookData } = {
  slimey: slimeyData,
};

const BookPage: NextPage<BookPageProps> = ({ bookData, currentPage }) => {
  if (!bookData) {
    // This case should not be hit with getStaticPaths, but it's good practice
    return <div>Book not found.</div>;
  }
  return <BookReader bookData={bookData} currentPage={currentPage} />;
};

// FIX: Replaced getServerSideProps with getStaticPaths
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [];

  // Loop through all books and all pages to generate a path for each
  for (const slug in bookDataMap) {
    const book = bookDataMap[slug];
    for (const page of book.pages) {
      paths.push({
        params: {
          bookSlug: slug,
          pageNumber: page.pageNumber.toString(),
        },
      });
    }
  }

  return {
    paths,
    fallback: false, // Any path not defined here will result in a 404
  };
};

// FIX: Replaced getServerSideProps with getStaticProps
export const getStaticProps: GetStaticProps = async (context) => {
  const { bookSlug, pageNumber } = context.params || {};

  const slug = typeof bookSlug === 'string' ? bookSlug : '';
  const pageNum = typeof pageNumber === 'string' ? parseInt(pageNumber, 10) : 1;

  const bookData = bookDataMap[slug] || null;

  if (!bookData || isNaN(pageNum)) {
    return { notFound: true };
  }

  return {
    props: {
      bookData,
      currentPage: pageNum,
    },
  };
};

export default BookPage;