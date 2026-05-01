import { useEffect, useRef, useState } from 'react';
import { ZoneId } from '../data/narrative';

const ZONE_SOUNDS: Record<ZoneId, string> = {
  inicio: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_180873748b.mp3', // Soft ambient
  ruido: 'https://cdn.pixabay.com/download/audio/2022/03/04/audio_733355523a.mp3', // Rain + Subtle Clock vibe
  huida: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a16315.mp3', // Distant urban hum
  peso: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_2917711d94.mp3', // Slow, heavy wind
  quiebre: 'https://cdn.pixabay.com/download/audio/2021/11/26/audio_a0a762089b.mp3', // Deep meditative silence
  quietud: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_f6e07bed12.mp3', // Soft breeze and nature
  camino: 'https://cdn.pixabay.com/download/audio/2021/11/25/audio_91b315264b.mp3', // Forest birds/stream (Hopeful)
};

export function useAmbientSound(zone: ZoneId) {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;
    const targetSrc = ZONE_SOUNDS[zone];

    if (!isEnabled) {
      audio.pause();
      return;
    }

    if (audio.src !== targetSrc) {
      let fadeOutInterval: ReturnType<typeof setInterval>;
      let fadeInInterval: ReturnType<typeof setInterval>;

      const performTransition = async () => {
        // Fade out
        fadeOutInterval = setInterval(() => {
          if (audio.volume > 0.05) {
            audio.volume -= 0.05;
          } else {
            clearInterval(fadeOutInterval);
            audio.src = targetSrc;
            audio.load();
            audio.play().then(() => {
              // Fade in
              fadeInInterval = setInterval(() => {
                if (audio.volume < 0.25) { // Lower volume for non-intrusive atmosphere
                  audio.volume += 0.02;
                } else {
                  audio.volume = 0.3;
                  clearInterval(fadeInInterval);
                }
              }, 50);
            }).catch(e => console.log('Audio playback delayed until interaction', e));
          }
        }, 30);
      };

      performTransition();

      return () => {
        clearInterval(fadeOutInterval);
        clearInterval(fadeInInterval);
      };
    } else if (audio.paused && isEnabled) {
      audio.play().catch(() => {});
      audio.volume = 0.3;
    }
  }, [zone, isEnabled]);

  const toggleSound = () => setIsEnabled(prev => !prev);

  return { isEnabled, toggleSound };
}
