import { useRef, useCallback } from 'react';

const SFX = {
  click: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c350781734.mp3', // Soft wooden click
  transition: 'https://cdn.pixabay.com/audio/2022/03/24/audio_3d1ef91781.mp3', // Ethereal sweep
  success: 'https://cdn.pixabay.com/audio/2021/11/25/audio_1289f643e9.mp3', // Calm chime
};

export function useSystemSounds(isEnabled: boolean) {
  const audioRefs = useRef<Record<string, HTMLAudioElement>>({});

  const playSound = useCallback((type: keyof typeof SFX) => {
    if (!isEnabled) return;

    if (!audioRefs.current[type]) {
      audioRefs.current[type] = new Audio(SFX[type]);
      audioRefs.current[type].volume = 0.15;
    }

    const audio = audioRefs.current[type];
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isEnabled]);

  return { playSound };
}
