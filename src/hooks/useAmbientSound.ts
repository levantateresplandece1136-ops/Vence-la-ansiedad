import { useEffect, useRef, useState } from 'react';
import { ZoneId, RoomId } from '../data/narrative';

const ZONE_SOUNDS: Record<ZoneId, string> = {
  inicio: 'https://cdn.pixabay.com/audio/2022/05/27/audio_180873748b.mp3', // Soft ambient
  ruido: 'https://cdn.pixabay.com/audio/2022/03/10/audio_506253457a.mp3', // Consistent rain
  huida: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3de9bf154.mp3', // Wind through trees (Bosque/Viento)
  peso: 'https://cdn.pixabay.com/audio/2021/08/04/audio_34b355883d.mp3', // Low heavy Wind
  quiebre: 'https://cdn.pixabay.com/audio/2022/01/18/audio_2917711d94.mp3', // Deep silent wind
  quietud: 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b315264b.mp3', // Forest birds and nature
  camino: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8233a042e6.mp3', // Soft morning breeze
};

const ROOM_SOUNDS: Partial<Record<RoomId | 'thinking', string>> = {
  'small-step': 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b315264b.mp3', // Forest birds (Progress)
  'thinking': 'https://cdn.pixabay.com/audio/2022/03/10/audio_733355523a.mp3', // Rhythmic breathing-like pulse
};

export function useAmbientSound(zone: ZoneId, roomId?: RoomId, isThinking?: boolean) {
  const [isEnabled, setIsEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.volume = 0;
    }

    const audio = audioRef.current;
    let targetSrc = ZONE_SOUNDS[zone];

    if (isThinking) {
      targetSrc = ROOM_SOUNDS['thinking']!;
    } else if (roomId && ROOM_SOUNDS[roomId as RoomId]) {
      targetSrc = ROOM_SOUNDS[roomId as RoomId]!;
    }

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
                if (audio.volume < 0.8) { 
                  audio.volume += 0.03;
                } else {
                  audio.volume = 0.85;
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
      audio.volume = 0.85;
    }
  }, [zone, roomId, isThinking, isEnabled]);

  const toggleSound = () => setIsEnabled(prev => !prev);

  return { isEnabled, toggleSound };
}
