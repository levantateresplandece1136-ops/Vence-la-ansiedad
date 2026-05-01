import { useEffect, useRef, useState } from 'react';
import { ZoneId, RoomId } from '../data/narrative';

const ZONE_SOUNDS: Record<ZoneId, string> = {
  inicio: 'https://cdn.pixabay.com/audio/2022/05/27/audio_180873748b.mp3', // Soft ambient
  ruido: 'https://cdn.pixabay.com/audio/2022/03/10/audio_506253457a.mp3', // Rain
  huida: 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3de9bf154.mp3', // Wind
  peso: 'https://cdn.pixabay.com/audio/2021/08/04/audio_34b355883d.mp3', // Heavy drone
  quiebre: 'https://cdn.pixabay.com/audio/2022/01/18/audio_2917711d94.mp3', // Deep silent wind
  quietud: 'https://cdn.pixabay.com/audio/2022/03/24/audio_3d1ef91781.mp3', // Ethereal pads
  camino: 'https://cdn.pixabay.com/audio/2022/01/18/audio_8233a042e6.mp3', // Soft breeze
};

const ROOM_AMBIENT: Partial<Record<RoomId | 'thinking', string>> = {
  'what-if': 'https://cdn.pixabay.com/audio/2023/10/16/audio_03d6d67b2d.mp3', // Rain & Piano
  'invisible-clock': 'https://cdn.pixabay.com/audio/2022/03/10/audio_c350781734.mp3', // Clock ticking ambient
  'storm-before-dawn': 'https://cdn.pixabay.com/audio/2022/05/17/audio_82c764e594.mp3', // Storm
  'anesthetic-noise': 'https://cdn.pixabay.com/audio/2022/03/15/audio_c8c8a16315.mp3', // Urban hum
  'stillness': 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b315264b.mp3', // Forest/Birds
  'safe-place': 'https://cdn.pixabay.com/audio/2024/02/06/audio_4048ca039b.mp3', // Warm fireplace
  'small-step': 'https://cdn.pixabay.com/audio/2021/11/25/audio_91b315264b.mp3', // Forest birds
  'open-door': 'https://cdn.pixabay.com/audio/2022/03/10/audio_c3de9bf154.mp3', // Wind through trees
  'slow-dawn': 'https://cdn.pixabay.com/audio/2022/08/01/audio_731e8432a6.mp3', // Morning nature piano
  'thinking': 'https://cdn.pixabay.com/audio/2022/03/10/audio_733355523a.mp3', // Breathing pulse
};

// Emotional "system" textures for specific atmospheres
const ROOM_TEXTURE: Partial<Record<RoomId | 'thinking', string>> = {
  'thinking': 'https://cdn.pixabay.com/audio/2022/03/10/audio_733355523a.mp3', // Rhythmic pulse
  'breathe-again': 'https://cdn.pixabay.com/audio/2022/03/10/audio_733355523a.mp3', // Rhythmic breathing
  'cannot-continue': 'https://cdn.pixabay.com/audio/2021/08/04/audio_34b355883d.mp3', // Deep sub pressure
  'noiseless-peace': 'https://cdn.pixabay.com/audio/2022/03/24/audio_3d1ef91781.mp3', // Ethereal pads layer
};

export function useAmbientSound(zone: ZoneId, roomId?: RoomId, isThinking?: boolean) {
  const [isEnabled, setIsEnabled] = useState(false);
  const ambientRef = useRef<HTMLAudioElement | null>(null);
  const textureRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!ambientRef.current) {
      ambientRef.current = new Audio();
      ambientRef.current.loop = true;
      ambientRef.current.volume = 0;
    }
    if (!textureRef.current) {
      textureRef.current = new Audio();
      textureRef.current.loop = true;
      textureRef.current.volume = 0;
    }

    const ambient = ambientRef.current;
    const texture = textureRef.current;

    let ambientSrc = (roomId && ROOM_AMBIENT[roomId]) || ZONE_SOUNDS[zone];
    if (isThinking) ambientSrc = ROOM_AMBIENT['thinking']!;

    let textureSrc = (isThinking ? ROOM_TEXTURE['thinking'] : roomId && ROOM_TEXTURE[roomId as RoomId]) || null;

    if (!isEnabled) {
      ambient.pause();
      texture.pause();
      return;
    }

    // Handle Ambient Layer
    if (ambient.src !== ambientSrc) {
      let fadeOutInterval: any;
      let fadeInInterval: any;

      const transitionAmbient = async () => {
        fadeOutInterval = setInterval(() => {
          if (ambient.volume > 0.05) {
            ambient.volume -= 0.05;
          } else {
            clearInterval(fadeOutInterval);
            ambient.src = ambientSrc;
            ambient.load();
            ambient.play().then(() => {
              fadeInInterval = setInterval(() => {
                if (ambient.volume < 0.8) { 
                  ambient.volume += 0.03;
                } else {
                  ambient.volume = 0.85;
                  clearInterval(fadeInInterval);
                }
              }, 50);
            }).catch(() => {});
          }
        }, 30);
      };
      transitionAmbient();
      return () => {
        clearInterval(fadeOutInterval);
        clearInterval(fadeInInterval);
      };
    } else if (ambient.paused && isEnabled) {
      ambient.play().catch(() => {});
      ambient.volume = 0.85;
    }

    // Handle Texture Layer
    if (textureSrc && texture.src !== textureSrc) {
      texture.pause();
      texture.src = textureSrc;
      texture.volume = 0;
      texture.play().then(() => {
        const interval = setInterval(() => {
          if (texture.volume < 0.3) texture.volume += 0.01;
          else clearInterval(interval);
        }, 100);
      }).catch(() => {});
    } else if (!textureSrc) {
      // Fade out texture
      const interval = setInterval(() => {
        if (texture.volume > 0.05) texture.volume -= 0.05;
        else {
          texture.pause();
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    } else if (texture.paused && isEnabled) {
      texture.play().catch(() => {});
      texture.volume = 0.3;
    }
  }, [zone, roomId, isThinking, isEnabled]);

  const toggleSound = () => setIsEnabled(prev => !prev);

  return { isEnabled, toggleSound };
}
