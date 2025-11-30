// src/features/BookReader/BookReader.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Keyboard } from 'swiper/modules';
import type { Swiper as SwiperInstance } from 'swiper';
import { useSettingsStore } from '@/data/stores/settings.store';
import { useProgressStore } from '@/data/stores/progress.store';
import { useAudioPlayer } from '@/data/useAudioPlayer';
import { BookData, PageData } from '@/data/types';
import Page from './Page';
import NarrationControls from './components/NarrationControls';
import Navigation from './components/Navigation';
import styles from './BookReader.module.css';

interface BookReaderProps {
  bookData: BookData;
  currentPage: number;
}

const BookReader: React.FC<BookReaderProps> = ({ bookData, currentPage }) => {
  const router = useRouter();
  const { readingMode } = useSettingsStore();
  const { getLastReadPage, setLastReadPage } = useProgressStore();
  const { play, stop, isPlaying } = useAudioPlayer();
  const [swiperInstance, setSwiperInstance] = useState<SwiperInstance | null>(null);
  const [activePage, setActivePage] = useState<PageData>(bookData.pages[currentPage - 1]);
  const hasInitializedFromStorage = useRef(false);

  useEffect(() => {
    if (swiperInstance && !hasInitializedFromStorage.current) {
      const lastReadPage = getLastReadPage(bookData.slug);
      if (lastReadPage && lastReadPage !== currentPage) {
        swiperInstance.slideTo(lastReadPage - 1, 0);
      }
      hasInitializedFromStorage.current = true;
    }
  }, [swiperInstance, bookData.slug, currentPage, getLastReadPage]);

  const handleSlideChange = (swiper: SwiperInstance) => {
    const newPageNumber = swiper.activeIndex + 1;
    const newActivePage = bookData.pages[swiper.activeIndex];
    setActivePage(newActivePage);
    setLastReadPage(bookData.slug, newPageNumber);
    const url = `/${bookData.slug}/${newPageNumber}`;
    router.replace(url, undefined, { shallow: true });
  };

  useEffect(() => {
    if (readingMode === 'narrated' && activePage?.narrationUrl) {
      play(activePage.narrationUrl);
    } else {
      stop();
    }
  }, [readingMode, activePage, play, stop]);

  const handlePrev = useCallback(() => swiperInstance?.slidePrev(), [swiperInstance]);
  const handleNext = useCallback(() => swiperInstance?.slideNext(), [swiperInstance]);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      stop();
    } else if (activePage?.narrationUrl) {
      play(activePage.narrationUrl);
    }
  }, [isPlaying, activePage, play, stop]);

  return (
    <div className={styles.bookReaderContainer} data-mood={activePage.mood || 'calm'}>
      <Navigation
        currentPage={activePage.pageNumber}
        totalPages={bookData.pages.length}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        isPlaying={isPlaying}
        hasNarration={!!activePage.narrationUrl}
      />
      <Swiper
        modules={[Keyboard]}
        keyboard={{ enabled: true }}
        onSwiper={setSwiperInstance}
        initialSlide={currentPage - 1}
        onSlideChange={handleSlideChange}
        className={styles.swiperContainer}
      >
        {bookData.pages.map((page) => (
          <SwiperSlide key={page.pageNumber}>
            {({ isActive }) => <Page pageData={page} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>
      <NarrationControls />
    </div>
  );
};

export default BookReader;