import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ROOMS, RoomId, Room } from './data/narrative';
import { 
  Heart, Wind, Moon, Sun, Anchor, Droplets, Leaf, Compass, Brain, 
  MapPin, History, Clock, VolumeX, Monitor, Coffee, Cloud, Lock, 
  Activity, Sunrise, LogOut, Footprints, Eye, Trees, Waves, Sparkles,
  Share2, Check 
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useIntelligence } from './hooks/useIntelligence';
import { useAmbientSound } from './hooks/useAmbientSound';
import { useSystemSounds } from './hooks/useSystemSounds';
import { Volume2 } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ThinkingOverlay = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-2xl flex items-center justify-center"
  >
    <div className="flex flex-col items-center gap-12">
      <div className="relative">
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute inset-0 bg-white rounded-full blur-3xl opacity-20"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="w-16 h-16 rounded-full border border-white/40 flex items-center justify-center relative z-10"
        >
          <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
        </motion.div>
      </div>
      <motion.p 
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="text-[11px] font-mono tracking-[0.6em] uppercase text-white/60"
      >
        Respira conmigo...
      </motion.p>
    </div>
  </motion.div>
);

const BreathTimer = () => {
  const [phase, setPhase] = useState<'Inhala' | 'Mantén' | 'Exhala'>('Inhala');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((c) => (c + 1) % 6);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count < 2) setPhase('Inhala');
    else if (count < 4) setPhase('Mantén');
    else setPhase('Exhala');
  }, [count]);

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <div className="relative flex items-center justify-center">
        <motion.div
          animate={{
            scale: phase === 'Inhala' ? 1.5 : phase === 'Mantén' ? 1.5 : 1,
            opacity: phase === 'Inhala' ? 0.3 : 0.1
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute w-24 h-24 bg-white rounded-full"
        />
        <div className="z-10 text-xs font-mono tracking-widest uppercase opacity-80">
          {phase}
        </div>
      </div>
    </div>
  );
};

const RoomIcon = ({ id, zone }: { id: RoomId, zone: Room['zone'] }) => {
  const icons: Record<string, React.ReactNode> = {
    'welcome': <MapPin className="w-12 h-12" />,
    'what-if': <History className="w-12 h-12" />,
    'invisible-clock': <Clock className="w-12 h-12" />,
    'need-to-fix': <Anchor className="w-12 h-12" />,
    'anesthetic-noise': <VolumeX className="w-12 h-12" />,
    'thousand-screens': <Monitor className="w-12 h-12" />,
    'disappearing-sofa': <Coffee className="w-12 h-12" />,
    'hunger-unnamed': <Droplets className="w-12 h-12" />,
    'invisible-tiredness': <Cloud className="w-12 h-12" />,
    'full-backpack': <Lock className="w-12 h-12" />,
    'empty-room': <MapPin className="w-12 h-12 opacity-20" />,
    'silent-chair': <Activity className="w-12 h-12" />,
    'long-night': <Moon className="w-12 h-12" />,
    'stillness': <Wind className="w-12 h-12" />,
    'breathe-again': <Sunrise className="w-12 h-12" />,
    'open-window': <LogOut className="w-12 h-12 rotate-[-45deg]" />,
    'safe-place': <Heart className="w-12 h-12" />,
    'small-step': <Footprints className="w-12 h-12" />,
    'live-again': <Sunrise className="w-12 h-12" />,
    'room-of-shadows': <Eye className="w-12 h-12 opacity-50" />,
    'grace-garden': <Trees className="w-12 h-12" />,
    'the-well': <Waves className="w-12 h-12" />
  };

  const getZoneColor = () => {
    switch (zone) {
      case 'inicio': return 'text-amber-200/50';
      case 'ruido': return 'text-blue-300/40';
      case 'huida': return 'text-violet-400/40';
      case 'peso': return 'text-stone-400/40';
      case 'quiebre': return 'text-red-300/30';
      case 'quietud': return 'text-emerald-300/40';
      case 'camino': return 'text-amber-400/50';
      default: return 'text-white/20';
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center transition-colors duration-1000", getZoneColor())}>
      {icons[id] || <Sparkles className="w-10 h-10" />}
    </div>
  );
};

export default function App() {
  const [currentId, setCurrentId] = useState<RoomId>('welcome');
  const [showPause, setShowPause] = useState(false);
  const [showTruth, setShowTruth] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { state, recordRoomEntry, setInitialContext, getInitialRoomId, getSuggestedNextRoom, getTimeContext } = useIntelligence();
  
  const currentRoom = ROOMS[currentId];
  const { isEnabled: isSoundOn, toggleSound } = useAmbientSound(currentRoom.zone, currentId, isThinking);
  const { playSound } = useSystemSounds(isSoundOn);
  const timeContext = getTimeContext();

  // Dynamic choices for entry
  const getDisplayChoices = () => {
    if (currentId === 'welcome' || currentId === 'reaction') {
      return [...currentRoom.choices]
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
    }
    return currentRoom.choices;
  };

  const displayChoices = getDisplayChoices();

  // Dynamic reflection based on context
  const getDisplayReflection = () => {
    let reflection = currentRoom.internalRefleciton;

    // Layer 4: Memory Emotional
    if (state.sessionCount > 1 && currentId === 'welcome') {
      return `Has vuelto al refugio. El lugar sigue aquí, esperándote. ¿Cómo te sientes hoy?`;
    }

    // Layer 3 & 8: Context Awareness
    const isNight = timeContext === 'night' || timeContext === 'evening';
    if (isNight && currentRoom.metadata.energy === 'high') {
      reflection = `La noche amplifica el eco de este ruido. ${reflection}`;
    } else if (timeContext === 'morning') {
      reflection = `En la quietud de esta mañana, esta verdad busca tu atención. ${reflection}`;
    }

    // Layer 2: Emotional state memory
    if (state.feeling && Math.random() > 0.7 && currentRoom.zone !== 'inicio') {
      reflection = `${reflection} Recuerdas que hace un momento mencionaste sentirte "${state.feeling.toLowerCase()}". Incluso ahí, hay una salida.`;
    }

    return reflection;
  };

  const displayReflection = getDisplayReflection();

  useEffect(() => {
    setShowPause(false);
    setShowTruth(false);

    recordRoomEntry(currentId);

    const pauseTimer = setTimeout(() => setShowPause(true), 2500);
    const truthTimer = setTimeout(() => {
      setShowTruth(true);
      if (currentId !== 'welcome' && currentId !== 'reaction') {
        playSound('success');
      }
    }, 6000);

    return () => {
      clearTimeout(pauseTimer);
      clearTimeout(truthTimer);
    };
  }, [currentId, recordRoomEntry]);

  const handleChoice = (text: string, nextRoom: RoomId) => {
    playSound('click');
    if (currentId === 'welcome') {
      setInitialContext(text, ''); // Temporary set feeling
      goToRoom('reaction');
      return;
    }

    if (currentId === 'reaction') {
      setIsThinking(true);
      setTimeout(() => {
        const initialRoom = getInitialRoomId(state.feeling || '', text);
        setInitialContext(state.feeling || '', text);
        setIsThinking(false);
        goToRoom(initialRoom);
      }, 6000);
      return;
    }

    // Intelligence Layer 4 & 5: Adaptive pathing
    const suggestion = getSuggestedNextRoom(nextRoom);
    
    // We only reroute if the suggestion is DIFFERENT from what they chose
    // and we add a bit of randomness so it's not predictable
    if (suggestion && suggestion !== nextRoom && Math.random() > 0.4) {
      setIsThinking(true);
      setTimeout(() => {
        setIsThinking(false);
        goToRoom(suggestion);
      }, 6000);
      return;
    }

    goToRoom(nextRoom);
  };

  const handleShare = async () => {
    playSound('transition');
    const shareText = `${displayReflection}\n\n"${currentRoom.sownTruth}"\n\n— Refugio Coram Deo`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Refugio Coram Deo',
          text: shareText,
          url: window.location.origin
        });
        setShareStatus('shared');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setShareStatus('copied');
        setTimeout(() => setShareStatus('idle'), 2000);
      } catch (error) {
        console.error('Failed to copy:', error);
      }
    }
  };

  const goToRoom = (id: RoomId) => {
    playSound('transition');
    setCurrentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Override logic for specific choice targets if needed
  // ...

  return (
    <div 
      className={cn(
        "min-h-screen transition-colors duration-[3000ms] ease-in-out font-sans selection:bg-white/20 overflow-x-hidden relative",
        currentRoom.theme.bg,
        currentRoom.theme.text
      )} 
      ref={containerRef}
    >
      {/* Deep Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Grain/Noise for texture */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }} />
        
        {/* Dynamic Light breathing */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-1/4 -left-1/4 w-[150%] h-[150%] bg-gradient-radial from-white/10 to-transparent rounded-full"
        />

        {/* Ambient Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: Math.random() * 0.3 
              }}
              animate={{ 
                y: [null, "-30%"],
                opacity: [null, 0]
              }}
              transition={{ 
                duration: Math.random() * 15 + 25, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isThinking && <ThinkingOverlay />}
      </AnimatePresence>

      <main className="relative z-10 container max-w-3xl mx-auto px-6 pt-32 pb-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentId}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-32"
          >
            {/* Symbol Header */}
            <header className="flex flex-col items-center space-y-16">
              <div className="relative">
                <motion.div 
                   animate={{ scale: [1, 1.6, 1], opacity: [0, 0.1, 0] }}
                   transition={{ duration: 8, repeat: Infinity }}
                   className="absolute inset-0 bg-white/20 rounded-full blur-3xl"
                />
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: state.energyBalance > 3 ? [1, 1.1, 1] : 1,
                    opacity: 1 
                  }}
                  transition={{ 
                    scale: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
                    opacity: { duration: 1.5 }
                  }}
                  className="relative z-10"
                >
                  <RoomIcon id={currentId} zone={currentRoom.zone} />
                </motion.div>
              </div>

              {/* Sensory Heading */}
              <section className="space-y-12">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 2, ease: "easeOut" }}
                  className="text-4xl md:text-5xl lg:text-6xl font-serif text-center mb-8 tracking-tight leading-[1.2]"
                >
                  {currentRoom.sensoryOpening}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 2.5 }}
                  className="text-xl md:text-2xl font-sans font-light leading-relaxed opacity-80 text-center max-w-2xl mx-auto mb-12"
                >
                  {displayReflection}
                </motion.p>
              </section>
            </header>

            {/* Interaction Area */}
            <div className="max-w-xl mx-auto space-y-24">
              {/* Sown Truth - The Gentle Light */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 3.5, duration: 2 }}
                className="text-center italic font-serif text-xl md:text-2xl py-16 border-y border-white/5 px-4 mb-8"
              >
                 {currentRoom.sownTruth}
              </motion.div>

              {/* Share Action - Enhanced visibility */}
              {currentId !== 'welcome' && currentId !== 'reaction' && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3.8 }}
                  className="flex justify-center -mt-16 mb-20 px-8"
                >
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/40 bg-white/10 hover:bg-white/[0.18] hover:border-white/60 transition-all text-[11px] font-mono tracking-[0.3em] uppercase cursor-pointer group shadow-lg shadow-black/20"
                  >
                    {shareStatus === 'idle' ? (
                      <>
                        <Share2 size={15} className="group-hover:scale-110 transition-transform opacity-80" />
                        <span className="opacity-80 group-hover:opacity-100">Compartir verdad</span>
                      </>
                    ) : (
                      <>
                        <Check size={15} className="text-emerald-400 animate-bounce" />
                        <span className="text-emerald-400">{shareStatus === 'copied' ? 'Copiado' : 'Enviado'}</span>
                      </>
                    )}
                  </button>
                </motion.div>
              )}

              {/* Micro-exercise */}
              {currentRoom.microExercise && (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 4.5, duration: 2 }}
                  className="p-12 rounded-[2.5rem] bg-white/[0.03] border border-white/5 backdrop-blur-sm"
                >
                  <h3 className="text-[10px] uppercase tracking-[0.4em] opacity-40 mb-8 flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                     Espacio para procesar
                  </h3>
                  <p className="text-xl md:text-2xl font-sans leading-relaxed opacity-90 font-light">
                    {currentRoom.microExercise.instructions}
                  </p>

                  {currentId === 'stillness' && <BreathTimer />}
                </motion.div>
              )}

              {/* Choices Area */}
              <div className="space-y-12">
                <motion.h4 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  transition={{ delay: 5.5 }}
                  className="text-center text-[10px] uppercase tracking-[0.6em] mb-12"
                >
                  Continúa tu camino
                </motion.h4>
                <div className="grid gap-6">
                  {displayChoices.map((choice, idx) => (
                    <motion.button
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 6 + (idx * 0.3) }}
                      whileHover={{ x: 12, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleChoice(choice.text, choice.nextRoom)}
                      className="w-full text-left p-8 md:p-10 rounded-3xl border border-white/5 bg-white/[0.05] transition-all cursor-pointer group flex justify-between items-center"
                    >
                      <span className="text-xl md:text-2xl font-sans font-light tracking-wide group-hover:pl-4 transition-all">
                        {choice.text}
                      </span>
                      <div className="opacity-0 group-hover:opacity-40 transition-opacity">
                        <Sunrise size={24} />
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Persistent Footer - Enhanced visibility */}
      <footer className="py-24 flex flex-col items-center gap-10 text-[11px] tracking-[0.3em] uppercase font-mono">
        <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8 px-6 text-white/80 hover:text-white transition-colors">
          <button 
            onClick={toggleSound}
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors cursor-pointer group py-2"
          >
            <div className="p-2 rounded-full border border-white/30 group-hover:border-white/60 group-hover:bg-white/5 transition-all">
              {isSoundOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </div>
            <span className="font-medium">{isSoundOn ? 'Sonido: Activado' : 'Sonido: Silencio'}</span>
          </button>
          
          <button 
            onClick={() => goToRoom('welcome')} 
            className="flex items-center gap-3 text-white/90 hover:text-white transition-colors cursor-pointer group py-2"
          >
            <div className="p-2 rounded-full border border-white/30 group-hover:border-white/60 group-hover:bg-white/5 transition-all">
              <LogOut size={14} className="rotate-[-135deg]" />
            </div>
            <span className="font-medium">Inicio</span>
          </button>
        </div>
        <div className="h-[1px] w-24 bg-white/20" />
      </footer>
    </div>
  );
}
