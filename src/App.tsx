/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, MapPin, Heart, ArrowRight, RefreshCcw, Scroll, History, ShieldCheck, Zap, Volume2, VolumeX, Sparkles } from "lucide-react";
import { STORY_NODES, StoryNode } from "./nodes";

interface Promise {
  reference: string;
  text: string;
}

export default function App() {
  const [appState, setAppState] = useState<"welcome" | "story">("welcome");
  const [currentNodeId, setCurrentNodeId] = useState<string>("inicio");
  const [history, setHistory] = useState<string[]>([]);
  const [peaceScore, setPeaceScore] = useState(30); // Starting with some basic "stress"
  const [collectedPromises, setCollectedPromises] = useState<Promise[]>([]);
  const [showInventory, setShowInventory] = useState(false);
  const [lastPromiseUnlocked, setLastPromiseUnlocked] = useState<Promise | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const currentNode = STORY_NODES[currentNodeId] || STORY_NODES["inicio"];

  const audioContextRef = useRef<AudioContext | null>(null);

  const playTone = (freq: number, type: OscillatorType = "sine", duration = 0.1) => {
    if (!isAudioEnabled) return;
    if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const speak = (text: string, mood: "conscience" | "wisdom") => {
    if (!isAudioEnabled) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "es-ES";
    utterance.rate = mood === "wisdom" ? 0.85 : 1.1;
    utterance.pitch = mood === "wisdom" ? 0.9 : 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const handleChoice = (nextNodeId: string) => {
    const nextNode = STORY_NODES[nextNodeId];
    if (nextNode) {
      setHistory((prev) => [...prev, currentNodeId]);
      
      // Update Peace Score
      if (nextNode.peaceDelta !== undefined) {
        setPeaceScore((prev) => Math.min(100, Math.max(0, prev + nextNode.peaceDelta!)));
      }

      // Collect Promise if it's new
      if (nextNode.scripture) {
        setCollectedPromises((prev) => {
          const exists = prev.find(p => p.reference === nextNode.scripture!.reference);
          if (!exists) {
            setLastPromiseUnlocked(nextNode.scripture!);
            setTimeout(() => setLastPromiseUnlocked(null), 4000);
            return [...prev, nextNode.scripture!];
          }
          return prev;
        });
      }

      setCurrentNodeId(nextNodeId);

      // Automatic narration
      const mood = (nextNode.peaceDelta || 0) > 0 ? "wisdom" : "conscience";
      // Split by paragraphs and take first for immediate reaction
      speak(nextNode.content.split('\n')[0], mood); 
      
      if (nextNode.voicePrompt) {
        setTimeout(() => speak(nextNode.voicePrompt!, mood), 3000);
      }
    }
  };

  const undoChoice = () => {
    if (history.length > 0) {
      const prevHistory = [...history];
      const prevNodeId = prevHistory.pop()!;
      
      setHistory(prevHistory);
      setCurrentNodeId(prevNodeId);
      window.speechSynthesis.cancel();
    }
  };

  const startJourney = () => {
    setAppState("story");
    setIsAudioEnabled(true);
    // Speak first paragraph
    speak(STORY_NODES["inicio"].content.split('\n')[0], "conscience");
    if (STORY_NODES["inicio"].voicePrompt) {
        setTimeout(() => speak(STORY_NODES["inicio"].voicePrompt!, "conscience"), 3000);
    }
  };

  const resetStory = () => {
    setCurrentNodeId("inicio");
    setHistory([]);
    setPeaceScore(30);
    setCollectedPromises([]);
    setLastPromiseUnlocked(null);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentNodeId]);

  // Determine mood based on peace score
  const isStressed = peaceScore < 40;
  const isPeaceful = peaceScore >= 70;

  return (
    <>
    {appState === "welcome" ? (
      <div className="min-h-screen bg-[#fcfaf7] flex items-center justify-center p-6 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md space-y-12"
        >
          <div className="space-y-4">
            <div className="inline-flex p-4 bg-sage-100 text-sage-600 rounded-3xl mb-4">
              <BookOpen size={32} />
            </div>
            <h1 className="font-serif text-5xl text-sage-950">El Camino de la Paz</h1>
            <p className="text-sage-600 leading-relaxed font-light text-lg">
              Una experiencia sensorial e interactiva diseñada para transformar tu ansiedad en propósito.
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={startJourney}
              className="group w-full py-6 bg-sage-600 text-white rounded-3xl font-bold text-xl shadow-2xl shadow-sage-200 hover:bg-sage-700 transition-all flex items-center justify-center gap-3"
            >
              <span>Activar Experiencia Sensorial</span>
              <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
            </button>
            <p className="text-[10px] text-sage-400 uppercase tracking-widest font-bold">
              Se recomienda usar audífonos para audio inmersivo
            </p>
          </div>
        </motion.div>
      </div>
    ) : (
      <div className={`min-h-screen font-sans selection:bg-sage-200 transition-colors duration-1000 ${isStressed ? 'bg-slate-50' : 'bg-[#fcfaf7]'}`}>
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-1000">
        <motion.div 
          animate={{ 
            scale: isPeaceful ? 1.2 : 1,
            opacity: isPeaceful ? 0.3 : 0.1,
            backgroundColor: isPeaceful ? '#8a9a5b' : (isStressed ? '#334155' : '#8a9a5b')
          }}
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" 
        />
        <motion.div 
          animate={{ 
            scale: isStressed ? 1.3 : 1,
            opacity: isStressed ? 0.2 : 0.1,
            backgroundColor: isStressed ? '#f97316' : '#d2b48c'
          }}
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" 
        />
      </div>

      {/* Global Hud */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center bg-white/40 backdrop-blur-md border-b border-sage-100">
        <div className="flex items-center gap-6">
          {/* Peace Bar */}
          <div className="flex flex-col gap-1 w-32 md:w-48">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-sage-600">
              <span>Estado de Paz</span>
              <span>{peaceScore}%</span>
            </div>
            <div className="h-1.5 w-full bg-sage-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${peaceScore}%` }}
                className={`h-full transition-colors duration-500 ${isStressed ? 'bg-orange-500' : 'bg-sage-600'}`}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`p-2 rounded-full transition-colors ${isAudioEnabled ? 'text-sage-600 bg-sage-50' : 'text-sage-300'}`}
            title="Toggle Audio"
          >
            {isAudioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>

          <button 
            onClick={() => setShowInventory(true)}
            className="relative p-2 text-sage-900 hover:bg-sage-50 rounded-full transition-colors"
            title="Inventario de Promesas"
          >
            <Scroll size={20} />
            {collectedPromises.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-sage-600 text-white text-[8px] flex items-center justify-center rounded-full font-bold">
                {collectedPromises.length}
              </span>
            )}
          </button>
          
          <div className="h-4 w-px bg-sage-200" />
          
          <button 
            onClick={resetStory}
            className="p-2 text-sage-400 hover:text-sage-900 transition-colors"
            title="Reiniciar"
          >
            <RefreshCcw size={20} />
          </button>
        </div>
      </nav>

      <main className="story-container relative z-10 pt-24">
        {/* Undo Button (Mercy Button) */}
        <AnimatePresence>
          {history.length > 0 && (
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={undoChoice}
              className="mb-8 flex items-center gap-2 text-sage-400 hover:text-sage-900 transition-colors text-[10px] font-bold uppercase tracking-widest"
            >
              <History size={14} />
              <span>Reconsiderar Camino</span>
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.article
            key={currentNodeId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-8 pb-20"
          >
            {/* Context Badge */}
            <div className="flex items-center gap-2">
              {isStressed ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-orange-200">
                  <Zap size={10} />
                  <span>Nivel de Estrés: Crítico</span>
                </div>
              ) : isPeaceful ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-sage-100 text-sage-700 text-[10px] font-bold uppercase tracking-widest rounded-full border border-sage-200">
                  <ShieldCheck size={10} />
                  <span>Protección Espiritual</span>
                </div>
              ) : null}
            </div>

            {/* Node Title */}
            <h1 className="font-serif text-4xl md:text-6xl leading-tight text-sage-950">
              {currentNode.title}
            </h1>

            {/* Narrative Content */}
            <div className="space-y-6">
              {currentNode.content.split('\n').map((paragraph, idx) => (
                <motion.p 
                  key={idx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (idx * 0.2) }}
                  className="text-lg md:text-2xl text-sage-900/80 leading-relaxed font-light"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            {/* Scripture Reveal */}
            {currentNode.scripture && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, type: "spring", damping: 15 }}
                className="my-8 p-10 bg-white border border-sage-100 rounded-3xl bible-verse-glow relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Heart size={120} fill="#8a9a5b" />
                </div>
                <p className="font-serif italic text-3xl text-sage-900 mb-6 leading-relaxed relative z-10">
                  "{currentNode.scripture.text}"
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sage-600 relative z-10">
                  <MapPin size={14} className="text-sage-400" />
                  <span>{currentNode.scripture.reference}</span>
                </div>
              </motion.div>
            )}

            {/* Choices */}
            <div className="mt-12 flex flex-col gap-4">
              <h2 className="text-[10px] uppercase tracking-widest font-bold text-sage-400 mb-2">
                Elige tu destino:
              </h2>
              {currentNode.choices.map((choice, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + (idx * 0.15) }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                        playTone(choice.isBiblical ? 880 : 110, "triangle", 0.2);
                        handleChoice(choice.nextNode);
                  }}
                  onMouseEnter={() => {
                        playTone(choice.isBiblical ? 440 : 220, "sine", 0.05);
                  }}
                  className={`group flex items-center justify-between p-8 rounded-3xl border text-left transition-all duration-300
                    ${choice.isBiblical 
                      ? "bg-sage-600 border-sage-600 text-white shadow-xl hover:shadow-sage-200" 
                      : "bg-white border-sage-200 text-sage-900 hover:border-sage-900 shadow-sm"
                    }`}
                >
                  <div className="flex flex-col gap-1">
                    <span className="text-xl font-medium leading-snug">{choice.text}</span>
                    {choice.isBiblical && (
                      <span className="text-[10px] uppercase tracking-widest opacity-60 font-bold">Camino de Fe</span>
                    )}
                  </div>
                  <ArrowRight size={24} className={`opacity-40 group-hover:opacity-100 transition-all ${choice.isBiblical ? 'text-white' : 'text-sage-900'}`} />
                </motion.button>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>
      </main>

      {/* Inventory Modal */}
      <AnimatePresence>
        {showInventory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-sage-950/20 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#fcfaf7] w-full max-w-2xl max-h-[80vh] rounded-[40px] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-8 border-b border-sage-100 flex justify-between items-center bg-white">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-sage-100 text-sage-600 rounded-2xl">
                    <Scroll size={24} />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl text-sage-950">Inventario de Promesas</h2>
                    <p className="text-xs text-sage-400 font-bold uppercase tracking-widest">Verdades que has descubierto</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowInventory(false)}
                  className="p-2 hover:bg-sage-50 rounded-full transition-colors text-sage-400 hover:text-sage-950"
                >
                  <ArrowRight className="rotate-45" size={24} />
                </button>
              </div>

              <div className="p-8 overflow-y-auto space-y-8">
                {collectedPromises.length === 0 ? (
                  <div className="py-20 text-center space-y-4">
                    <p className="text-sage-400 font-light text-xl italic">Aún no has descubierto ninguna promesa...</p>
                    <p className="text-xs text-sage-300 font-bold uppercase tracking-widest">Atraviesa el camino de fe para encontrarlas</p>
                  </div>
                ) : (
                  collectedPromises.map((promise, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group"
                    >
                      <p className="font-serif italic text-xl text-sage-900 group-hover:text-sage-600 transition-colors leading-relaxed">
                        "{promise.text}"
                      </p>
                      <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-sage-400">
                        <MapPin size={12} />
                        <span>{promise.reference}</span>
                      </div>
                      {idx < collectedPromises.length - 1 && <div className="mt-8 h-px bg-sage-100" />}
                    </motion.div>
                  ))
                )}
              </div>

              <div className="p-8 bg-sage-50 text-center">
                <p className="text-[10px] text-sage-400 uppercase tracking-widest italic">
                  "El cielo y la tierra pasarán, pero mis palabras no pasarán"
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Unlock Notification */}
      <AnimatePresence>
        {lastPromiseUnlocked && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: -20, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] w-full max-w-sm"
          >
            <div className="mx-4 p-6 bg-sage-900 text-white rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/20">
              <div className="p-3 bg-white/10 rounded-2xl">
                <Scroll size={24} className="text-sage-300" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-bold uppercase tracking-widest text-sage-300 mb-1">¡Promesa Desbloqueada!</p>
                <p className="text-sm font-medium leading-snug line-clamp-2 italic">"{lastPromiseUnlocked.text}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .text-sage-950 { color: #1a2a1a; }
        .text-sage-900 { color: #2a3a2a; }
        .text-sage-600 { color: #5a6a3a; }
        .text-sage-400 { color: #8a9a8a; }
        .bg-sage-50 { background-color: #f5f7f2; }
        .bg-sage-100 { background-color: #e5e9e0; }
        .bg-sage-600 { background-color: #8a9a5b; }
        .bg-sage-900 { background-color: #2a3a1a; }
        .bg-sage-950 { background-color: #1a2310; }
        .border-sage-100 { border-color: #e5e9e0; }
        .border-sage-200 { border-color: #d5d9d0; }
        .selection\:bg-sage-200::selection { background-color: #8a9a5b55; }
        .bible-verse-glow { box-shadow: 0 0 40px rgba(138, 154, 91, 0.1); }
      `}</style>
    </div>
    )}
    </>
  );
}
