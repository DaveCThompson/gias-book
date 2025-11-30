// src/features/BookReader/components/Navigation.tsx

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GearIcon } from '@/components/icons/GearIcon';
import { SettingsDialog } from './SettingsDialog';
import styles from './Navigation.module.css';

interface NavigationProps {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  onPlayPause: () => void;
  isPlaying: boolean;
  hasNarration: boolean;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onPlayPause,
  isPlaying,
  hasNarration,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className={styles.navContainer}>
        <div className={styles.leftControls}>
          <Link href="/" className={styles.logoLink} aria-label="Return to Library">
            <Image src="/madoodle-logo.svg" alt="Madoodle Logo" width={100} height={24} />
          </Link>
        </div>

        <div className={styles.pageInfo}>
          <button
            onClick={onPlayPause}
            disabled={!hasNarration}
            className={styles.playButton}
            aria-label={isPlaying ? 'Pause narration' : 'Play narration'}
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
        </div>

        <div className={styles.rightControls}>
          <button
            onClick={onPrev}
            disabled={currentPage === 1}
            className={styles.navButton}
          >
            &larr; Prev
          </button>
          <button
            onClick={onNext}
            disabled={currentPage === totalPages}
            className={styles.navButton}
          >
            Next &rarr;
          </button>
          <button
            className={styles.settingsButton}
            onClick={() => setIsSettingsOpen(true)}
            aria-label="Open settings"
          >
            <GearIcon />
          </button>
        </div>
      </div>
      <SettingsDialog isOpen={isSettingsOpen} onOpenChange={setIsSettingsOpen} />
    </>
  );
};

export default Navigation;