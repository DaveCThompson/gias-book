// src/pages/_app.tsx

import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { useThemeManager } from '@/data/hooks/useThemeManager';

// Import Swiper's core styles globally
import 'swiper/css';

export default function App({ Component, pageProps }: AppProps) {
  // This hook manages the theme for the entire application
  useThemeManager();

  return <Component {...pageProps} />;
}