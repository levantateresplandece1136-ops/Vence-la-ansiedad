import { useState, useCallback, useEffect } from 'react';
import { RoomId, ROOMS, ZoneId } from '../data/narrative';

export interface IntelligenceState {
  visitedRooms: RoomId[];
  feeling: string | null;
  mechanism: string | null;
  energyBalance: number; 
  tendencies: Record<string, number>; // Tracks things like 'evasion', 'control', 'isolation'
  lastSessionDate: string | null;
  sessionCount: number;
}

const STORAGE_KEY = 'coram_deo_refuge_state';

const getInitialState = (): IntelligenceState => {
  if (typeof window === 'undefined') return {
    visitedRooms: [],
    feeling: null,
    mechanism: null,
    energyBalance: 0,
    tendencies: {},
    lastSessionDate: null,
    sessionCount: 0,
  };

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...parsed,
        visitedRooms: [], // Reset for new session but keep tendencies and history
        feeling: null,
        mechanism: null,
        energyBalance: 0,
      };
    } catch (e) {
      console.error('Error loading saved state', e);
    }
  }
  return {
    visitedRooms: [],
    feeling: null,
    mechanism: null,
    energyBalance: 0,
    tendencies: {},
    lastSessionDate: null,
    sessionCount: 0,
  };
};

export function useIntelligence() {
  const [state, setState] = useState<IntelligenceState>(getInitialState);

  // Persistence
  useEffect(() => {
    const { visitedRooms, feeling, mechanism, energyBalance, ...persistentState } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistentState));
  }, [state]);

  const getTimeContext = useCallback(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 22) return 'evening';
    return 'night';
  }, []);

  const recordRoomEntry = useCallback((roomId: RoomId) => {
    setState(prev => {
      const room = ROOMS[roomId];
      if (!room) return prev;

      // Update energy balance
      let energyMod = 0;
      if (room.metadata.energy === 'high') energyMod = 1.5;
      if (room.metadata.energy === 'low') energyMod = -1;

      // Update tendencies based on focus
      const newTendencies = { ...prev.tendencies };
      room.metadata.focus.forEach(f => {
        newTendencies[f] = (newTendencies[f] || 0) + 1;
      });

      return {
        ...prev,
        visitedRooms: [...prev.visitedRooms, roomId],
        energyBalance: Math.max(-3, Math.min(5, prev.energyBalance + energyMod)),
        tendencies: newTendencies
      };
    });
  }, []);

  const setInitialContext = useCallback((feeling: string, mechanism: string) => {
    setState(prev => ({ 
      ...prev, 
      feeling, 
      mechanism,
      sessionCount: prev.sessionCount + 1,
      lastSessionDate: new Date().toISOString()
    }));
  }, []);

  const getSuggestedNextRoom = useCallback((targetRoomId: RoomId): RoomId | null => {
    // Layer 4 & 5: Anti-repetition and Emotional Adaptation
    const lastRooms = state.visitedRooms.slice(-4);
    
    // Prevent immediate loop
    if (lastRooms.includes(targetRoomId)) {
      // Find another room in the same or adjacent zone that hasn't been visited recently
      const alternatives = Object.values(ROOMS).filter(r => 
        r.zone === ROOMS[targetRoomId].zone && 
        !lastRooms.includes(r.id) &&
        r.id !== 'welcome' && r.id !== 'reaction'
      );
      if (alternatives.length > 0) return alternatives[0].id;
    }

    // Layer 5: Grace Moments if energy is too high
    if (state.energyBalance >= 4) {
      const graceRooms: RoomId[] = ['stillness', 'safe-place', 'breathe-again'];
      const availableGrace = graceRooms.filter(id => !lastRooms.includes(id));
      if (availableGrace.length > 0) return availableGrace[0];
    }

    // Pattern Detection: If too much evasion, steer towards depth / truth
    const evasionCount = state.tendencies['evasion'] || 0;
    if (evasionCount > 4 && Math.random() > 0.4) {
      return 'room-of-shadows';
    }

    if (evasionCount > 2 && ROOMS[targetRoomId].zone === 'huida' && Math.random() > 0.5) {
      return 'the-well';
    }

    // Grace Moments for those who allow themselves to be quiet
    const quietCount = state.tendencies['paz'] || 0;
    if (quietCount > 3 && Math.random() > 0.6) {
      return 'grace-garden';
    }

    // Night complexity
    const timeContext = getTimeContext();
    if (timeContext === 'night' && ROOMS[targetRoomId].zone === 'ruido' && Math.random() > 0.5) {
      return 'long-night';
    }

    return null;
  }, [state, getTimeContext]);

  const getInitialRoomId = useCallback((feeling: string, mechanism: string): RoomId => {
    // Map feeling keywords to zones
    const f = feeling.toLowerCase();
    const m = mechanism.toLowerCase();

    // Logic for Layer 3: Selection based on energy and focus
    if (f.includes('mente') || f.includes('presión') || f.includes('abruma')) {
      if (m.includes('distraerme')) return 'thousand-screens';
      if (m.includes('controlar')) return 'need-to-fix';
      return 'what-if';
    }
    if (f.includes('cansado') || f.includes('vacío')) {
      if (m.includes('aíslo')) return 'empty-room';
      return 'invisible-tiredness';
    }
    if (f.includes('miedo')) {
      return 'storm-before-dawn';
    }
    if (f.includes('desaparecer')) {
      return 'anesthetic-noise';
    }

    return 'what-if'; // fallback
  }, []);

  return {
    state,
    recordRoomEntry,
    setInitialContext,
    getSuggestedNextRoom,
    getInitialRoomId,
    getTimeContext
  };
}
