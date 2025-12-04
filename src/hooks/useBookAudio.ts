import useSound from 'use-sound';
import { useEffect, useRef } from 'react';

interface UseBookAudioProps {
    narrationUrl?: string;
    isPlaying: boolean;
    onEnd?: () => void;
}

export const useBookAudio = ({ narrationUrl, isPlaying, onEnd }: UseBookAudioProps) => {
    // We use a ref to track if we are currently fading out to prevent "rapid fire" issues
    const isFadingOut = useRef(false);

    const [play, { sound, duration }] = useSound(narrationUrl || '', {
        interrupt: true, // Stop previous sound when new one starts
        onend: onEnd,
        onload: () => {
            // Optional: Preload logic could go here
        },
    });

    // Handle Play/Pause/Stop with Fades
    useEffect(() => {
        if (!sound) return;

        if (isPlaying) {
            // If we were fading out, stop that and fade in
            if (isFadingOut.current) {
                isFadingOut.current = false;
                sound.stop(); // Hard stop to reset
            }

            sound.fade(0, 1, 500); // Fade in over 500ms
            play();
        } else {
            // Fade out
            if (sound.playing()) {
                isFadingOut.current = true;
                sound.fade(1, 0, 300); // Fade out faster (300ms)

                // Stop after fade
                const timer = setTimeout(() => {
                    if (isFadingOut.current) {
                        sound.stop();
                        isFadingOut.current = false;
                    }
                }, 300);

                return () => clearTimeout(timer);
            }
        }

        return () => {
            // Cleanup on unmount or url change
            if (sound) {
                sound.stop();
            }
        };
    }, [isPlaying, play, sound, narrationUrl]);

    return {
        duration,
        sound,
    };
};
