/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, MapPin, Heart, ArrowRight, RefreshCcw, Sparkles } from "lucide-react";
import { STORY_NODES, StoryNode, MoodAction } from "./nodes";

export default function App() {
  const [currentNodeId, setCurrentNodeId] = useState<string>("introspeccion");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Internal Stats
  const [stats, setStats] = useState({
    ansiedad: 10,
    paz: 10,
    fe: 5
  });

  const currentNode = useMemo(() => 
    STORY_NODES[currentNodeId] || STORY_NODES["introspeccion"], 
    [currentNodeId]
  );

  const handleChoice = (choice: any) => {
    // Update Stats
    if (choice.impact) {
      setStats(prev => ({
        ansiedad: Math.max(0, Math.min(100, prev.ansiedad + (choice.impact.ansiedad || 0))),
        paz: Math.max(0, Math.min(100, prev.paz + (choice.impact.paz || 0))),
        fe: Math.max(0, Math.min(100, prev.fe + (choice.impact.fe || 0)))
      }));
    }

    // Special reset logic for certain transitions
    if (choice.nextNode === "introspeccion" && choice.impact?.ansiedad === -100) {
      setStats({ ansiedad: 10, paz: 10, fe: 5 });
    }

    if (currentNode.transitionText) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentNodeId(choice.nextNode);
        setIsTransitioning(false);
      }, 4000);
    } else {
      setCurrentNodeId(choice.nextNode);
    }
  };

  const resetStory = () => {
    setCurrentNodeId("introspeccion");
    setIsTransitioning(false);
    setStats({ ansiedad: 10, paz: 10, fe: 5 });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentNodeId]);

  // Sensory Effect Mapping
  const getSensoryBackground = (mood?: MoodAction) => {
    switch (mood) {
      case "glitch": return "bg-zinc-950 text-zinc-100";
      case "pulse": return "bg-rose-50/20 text-zinc-900";
      case "blur": return "bg-slate-100/50 text-slate-900";
      case "dim": return "bg-zinc-900 text-zinc-300";
      case "vibrate": return "bg-zinc-800 text-zinc-200";
      case "warm": return "bg-[#faf7f2] text-zinc-800";
      case "introspective": return "bg-zinc-950 text-zinc-400";
      case "pure": return "bg-white text-zinc-900";
      case "loop": return "bg-zinc-100 text-zinc-600";
      case "collapse": return "bg-black text-red-500";
      case "growth": return "bg-blue-50/30 text-blue-900";
      case "freedom": return "bg-white text-yellow-700 font-medium";
      default: return "bg-[#fcfaf7] text-[#1a1a1a]";
    }
  };

  const getEffectClasses = (mood?: MoodAction) => {
    switch (mood) {
      case "glitch": return "glitch-effect";
      case "blur": return "blur-[3px] opacity-70";
      case "vibrate": return "shake-effect";
      case "pulse": return "animate-pulse-slow";
      case "loop": return "opacity-80 scale-95";
      case "collapse": return "brightness-50 grayscale";
      default: return "";
    }
  };

  const StatBar = ({ label, value, color, icon: Icon }: any) => (
    <div className="flex flex-col gap-1 w-full max-w-[120px]">
      <div className="flex items-center justify-between text-[8px] font-bold uppercase tracking-widest opacity-50">
        <div className="flex items-center gap-1">
          <Icon size={10} />
          {label}
        </div>
        <span>{value}%</span>
      </div>
      <div className="h-1 w-full bg-zinc-200/20 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );

  if (currentNodeId === "introspeccion") {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 font-sans overflow-hidden">
        <div className="fixed inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-zinc-800/20 to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="max-w-xl w-full text-center space-y-16 relative z-10"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 4, times: [0, 0.3, 0.7, 1] }}
              className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] font-bold"
            >
              El Umbral
            </motion.div>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="font-serif text-3xl md:text-4xl text-zinc-300 leading-relaxed italic"
            >
              {currentNode.content.split('\n\n')[0]}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 2 }}
              className="text-2xl md:text-3xl font-serif text-zinc-100"
            >
              {currentNode.content.split('\n\n')[1]}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {currentNode.choices.map((choice, idx) => (
              <motion.button
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 + (idx * 0.2) }}
                whileHover={{ scale: 1.01, color: "#fff" }}
                onClick={() => handleChoice(choice)}
                className="p-5 rounded-full bg-zinc-900/50 border border-zinc-800 text-sm italic text-zinc-500 hover:border-zinc-500 transition-all text-center"
              >
                {choice.text}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-[2000ms] font-sans selection:bg-sage-200 overflow-x-hidden ${getSensoryBackground(currentNode.mood)}`}>
      {/* Stats Bar */}
      {!isTransitioning && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 flex justify-between gap-6 z-50">
          <StatBar label="Ansiedad" value={stats.ansiedad} color="bg-red-500" icon={BookOpen} />
          <StatBar label="Paz" value={stats.paz} color="bg-emerald-500" icon={Sparkles} />
          <StatBar label="Fe" value={stats.fe} color="bg-amber-400" icon={Heart} />
        </div>
      )}

      {/* Sensory Audio Hint Indicator */}
      {currentNode.audioHint && !isTransitioning && (
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 0.3, x: 0 }}
          className="fixed top-8 right-8 flex items-center gap-2 text-[10px] uppercase tracking-widest pointer-events-none"
        >
          <div className="w-4 h-px bg-current" />
          <span>{currentNode.audioHint}</span>
        </motion.div>
      )}

      <main className={`story-container relative z-10 min-h-screen flex flex-col justify-center ${getEffectClasses(currentNode.mood)}`}>
        <header className="absolute top-8 left-1/2 -translate-x-1/2 opacity-20 hover:opacity-100 transition-opacity">
          <button onClick={resetStory} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <RefreshCcw size={12} />
            <span>Reiniciar</span>
          </button>
        </header>

        <AnimatePresence mode="wait">
          {isTransitioning ? (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-8 h-[60vh]"
            >
              <div className="w-px h-12 bg-current opacity-20 mb-4" />
              <p className="font-serif italic text-2xl md:text-3xl opacity-60 leading-relaxed max-w-lg">
                {currentNode.transitionText}
              </p>
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-1 bg-current rounded-full"
              />
            </motion.div>
          ) : (
            <motion.article
              key={currentNodeId}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="flex flex-col gap-14 py-20 pb-40"
            >
              <div className="space-y-10">
                {currentNode.content.split('\n\n').map((p, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: 0.5 + (i * 0.7), // Slower, more intentional staggering
                      duration: 1.2
                    }}
                    className="text-2xl md:text-3xl leading-relaxed font-light font-serif"
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {currentNode.scripture && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 1 }}
                  className="relative py-12 px-8"
                >
                  <div className="absolute top-0 left-0 w-8 h-px bg-current opacity-20" />
                  <p className="font-serif text-3xl italic mb-6 leading-tight opacity-90">
                    "{currentNode.scripture.text}"
                  </p>
                  <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase opacity-40">
                    <BookOpen size={12} />
                    <span>— {currentNode.scripture.reference}</span>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-6 mt-8">
                {currentNode.choices.map((choice, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 + (idx * 0.3) }}
                    whileHover={{ x: 10 }}
                    onClick={() => handleChoice(choice)}
                    className="group flex items-center justify-between p-7 rounded-full border border-current opacity-60 hover:opacity-100 transition-all text-left"
                  >
                    <span className="text-xl md:text-2xl font-light italic">{choice.text}</span>
                    <ArrowRight size={20} className="translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
                  </motion.button>
                ))}
              </div>

              {currentNode.isEnding && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  transition={{ delay: 4 }}
                  className="text-center text-[10px] uppercase tracking-[0.5em] font-bold"
                >
                  {currentNode.title} alcanzado
                </motion.div>
              )}
            </motion.article>
          )}
        </AnimatePresence>
      </main>

      <style>{`
        .glitch-effect {
          animation: glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite;
        }
        @keyframes glitch {
          0% { transform: translate(0); text-shadow: 0 0 0 transparent; }
          20% { transform: translate(-2px, 2px); text-shadow: 2px 0 red, -2px 0 cyan; }
          40% { transform: translate(-2px, -2px); text-shadow: -2px 0 red, 2px 0 cyan; }
          60% { transform: translate(2px, 2px); text-shadow: 2px 0 red, -2px 0 cyan; }
          80% { transform: translate(2px, -2px); text-shadow: -2px 0 red, 2px 0 cyan; }
          100% { transform: translate(0); text-shadow: 0 0 0 transparent; }
        }
        .shake-effect {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both infinite;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-pulse-slow {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .bg-gradient-radial {
          background-image: radial-gradient(var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
