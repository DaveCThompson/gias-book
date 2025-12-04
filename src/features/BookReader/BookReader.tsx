// src/features/BookReader/BookReader.tsx

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useSettingsStore } from '@/data/stores/settings.store';
import { useProgressStore } from '@/data/stores/progress.store';
import { useBookAudio } from '@/hooks/useBookAudio';
import { useAccessibilityNavigation } from '@/hooks/useAccessibilityNavigation';
import { BookData } from '@/data/types';
import Page from './Page';
import NarrationControls from './components/NarrationControls';
import Navigation from './components/Navigation';
import { GestureCanvas } from './components/GestureCanvas';
import { DesktopClickZones } from './components/DesktopClickZones';
import styles from './BookReader.module.css';

interface BookReaderProps {
  bookData: BookData;
  currentPage: number;
}

const BookReader: React.FC<BookReaderProps> = ({ bookData, currentPage: initialPage }) => {
  const router = useRouter();
  const { readingMode } = useSettingsStore();
  const { getLastReadPage, setLastReadPage } = useProgressStore();

  // Optimistic State: Manage page locally for instant feedback
  const [internalPage, setInternalPage] = useState(initialPage);
  const [direction, setDirection] = useState(0);
  const lastActionTime = useRef(0);

  // Sync internal state if props change (e.g. browser back button or deep link)
  // We ignore updates that happen shortly after a user action to prevent "stale" router state
  // from reverting our optimistic update.
  useEffect(() => {
    const timeSinceLastAction = Date.now() - lastActionTime.current;
    if (timeSinceLastAction > 2000 && initialPage !== internalPage) {
      setInternalPage(initialPage);
    }
  }, [initialPage, internalPage]);

  const activePage = bookData.pages[internalPage - 1];
  const totalPages = bookData.pages.length;

  // Audio Hook
  useBookAudio({
    narrationUrl: activePage?.narrationUrl,
    isPlaying: readingMode === 'narrated',
    onEnd: () => {
      // Auto-advance logic could go here if desired
    },
  });

  // Navigation Handlers
  const handlePrev = useCallback(() => {
    if (internalPage > 1) {
      lastActionTime.current = Date.now();
      setDirection(-1);
      const newPage = internalPage - 1;

      // Optimistic Update
      setInternalPage(newPage);
      setLastReadPage(bookData.slug, newPage);

      // Router update (shallow)
      router.replace(`/${bookData.slug}/${newPage}`, undefined, { shallow: true });
    }
  }, [internalPage, bookData.slug, router, setLastReadPage]);

  const handleNext = useCallback(() => {
    if (internalPage < totalPages) {
      lastActionTime.current = Date.now();
      setDirection(1);
      const newPage = internalPage + 1;

      // Optimistic Update
      setInternalPage(newPage);
      setLastReadPage(bookData.slug, newPage);

      // Router update (shallow)
      router.replace(`/${bookData.slug}/${newPage}`, undefined, { shallow: true });
    }
  }, [internalPage, totalPages, bookData.slug, router, setLastReadPage]);

  // A11y Hook (Keyboard + Screen Reader)
  const { a11yStatus, containerRef } = useAccessibilityNavigation({
    currentPage: internalPage,
    totalPages,
    onPrev: handlePrev,
    onNext: handleNext,
  });

  // Play/Pause Toggle
  const handlePlayPause = useCallback(() => {
    if (readingMode === 'narrated') {
      useSettingsStore.getState().toggleReadingMode(); // Switch to self-read (stops audio)
    } else {
      useSettingsStore.getState().toggleReadingMode(); // Switch to narrated (starts audio)
    }
  }, [readingMode]);

  // Restore last read page on mount
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current) {
      const lastRead = getLastReadPage(bookData.slug);
      if (lastRead && lastRead !== initialPage) {
        // Update internal state immediately
        setInternalPage(lastRead);
        router.replace(`/${bookData.slug}/${lastRead}`, undefined, { shallow: true });
      }
      hasInitialized.current = true;
    }
  }, [bookData.slug, initialPage, getLastReadPage, router]);

  return (
    <div
      className={styles.bookReaderContainer}
      data-mood={activePage.mood || 'calm'}
      ref={containerRef}
      tabIndex={-1} // Allow focus for keyboard events
    >
      {a11yStatus}

      <Navigation
        currentPage={internalPage}
        totalPages={totalPages}
        onPrev={handlePrev}
        onNext={handleNext}
        onPlayPause={handlePlayPause}
        isPlaying={readingMode === 'narrated'}
        hasNarration={!!activePage.narrationUrl}
      />

      <DesktopClickZones
        onPrev={handlePrev}
        onNext={handleNext}
        canPrev={internalPage > 1}
        canNext={internalPage < totalPages}
      />

      <GestureCanvas
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstPage={internalPage === 1}
        isLastPage={internalPage === totalPages}
      >
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={internalPage}
            custom={direction}
            initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={styles.pageWrapper}
          >
            <Page pageData={activePage} isActive={true} />
          </motion.div>
        </AnimatePresence>
      </GestureCanvas>

      <NarrationControls />
    </div>
  );
};

export default BookReader;