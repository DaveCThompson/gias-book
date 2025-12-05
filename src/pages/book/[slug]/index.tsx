// src/pages/book/[slug]/index.tsx

import React from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { bookDataMap, allBooks } from '@/data/constants';
import { BookData } from '@/data/types';
import BookLobby from '@/features/BookLobby/BookLobby';

interface BookLobbyPageProps {
    book: BookData;
}

const BookLobbyPage: NextPage<BookLobbyPageProps> = ({ book }) => {
    return <BookLobby book={book} isModal={false} />;
};

export const getStaticPaths: GetStaticPaths = async () => ({
    paths: allBooks.map((b) => ({ params: { slug: b.slug } })),
    fallback: false,
});

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = typeof params?.slug === 'string' ? params.slug : '';
    const book = bookDataMap[slug];

    if (!book) {
        return { notFound: true };
    }

    return {
        props: { book },
    };
};

export default BookLobbyPage;
