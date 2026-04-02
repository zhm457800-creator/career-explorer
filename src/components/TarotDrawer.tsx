import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Building2, Zap, Columns3, Brain, Sun, Network, Share2, Waves, Box } from 'lucide-react';
import { IMAGE_ASSETS } from '../lib/assets';
import { CyberpunkImage } from './CyberpunkImage';

interface TarotDrawerProps {
  onClose: () => void;
}

const cardData = [
  { 
    title: "MONOLITH", 
    icon: <Building2 size={20} />, 
    quote: "The details are not the details. They make the design.", 
    author: "Charles Eames",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot1 
  },
  { 
    title: "NEURAL", 
    icon: <Zap size={20} />, 
    quote: "少即是多 (Less is more).", 
    author: "Ludwig Mies van der Rohe",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot2 
  },
  { 
    title: "FRAGMENT", 
    icon: <Columns3 size={20} />, 
    quote: "Form follows function.", 
    author: "Louis Sullivan",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot3 
  },
  { 
    title: "GHOST", 
    icon: <Brain size={20} />, 
    quote: "设计不仅仅是外观和感觉，设计是它是如何工作的。", 
    author: "Steve Jobs",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot4 
  },
  { 
    title: "VOID", 
    icon: <Sun size={20} />, 
    quote: "Simplicity is the ultimate sophistication.", 
    author: "Leonardo da Vinci",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot5 
  },
  { 
    title: "SYSTEM", 
    icon: <Network size={20} />, 
    quote: "一切皆为设计，但鲜有优良的设计。", 
    author: "Brian Reed",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot6 
  },
  { 
    title: "VECTOR", 
    icon: <Share2 size={20} />, 
    quote: "Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep.", 
    author: "Le Corbusier",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot7 
  },
  { 
    title: "SYNC", 
    icon: <Waves size={20} />, 
    quote: "发现需求是设计的第一先决条件。", 
    author: "Charles Eames",
    img: IMAGE_ASSETS.extension.feedingBrain.tarot8 
  }
];

export const TarotDrawer = ({ onClose }: TarotDrawerProps) => {
  const [isFanned, setIsFanned] = useState(false);
  const [extractedIndex, setExtractedIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleCardClick = (index: number) => {
    if (extractedIndex === index) {
      setExtractedIndex(null);
    } else {
      setExtractedIndex(index);
    }
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[150] bg-background overflow-y-auto hide-scrollbar flex flex-col text-on-surface"
      onMouseMove={handleMouseMove}
    >
      {/* Background Noise & Glow */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E')]"></div>
      <div 
        className="fixed inset-0 pointer-events-none opacity-30 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary) 0%, transparent 50%)`
        }}
      ></div>

      {/* Header */}
      <header className="fixed top-0 w-full z-[160] flex justify-between items-center px-12 py-10">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 font-headline font-bold uppercase tracking-tight text-sm text-on-surface hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>CLOSE / BACK</span>
        </button>
        <div className="font-headline font-black text-2xl tracking-tighter text-on-surface">
          ARCHITECT
        </div>
        <div className="hidden md:flex items-center gap-8 font-headline font-bold uppercase text-[10px] tracking-widest text-on-surface/40">
          <span>04 / EXTENSION</span>
          <span>V.2026</span>
        </div>
      </header>

      <main className="relative z-10 w-full max-w-6xl mx-auto px-12 pt-40 pb-24">
        {/* Hero Section */}
        <section className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="max-w-3xl">
              <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] block mb-4">04 // VIRTUAL EXTENSION</span>
              <h1 className="font-headline font-black text-6xl md:text-8xl uppercase tracking-tighter leading-none mb-6">
                QUANTUM <br />
                <span className="text-primary/40">INSPIRATION</span>
              </h1>
              <p className="font-body text-on-surface/60 max-w-xl text-sm leading-relaxed uppercase tracking-wider">
                A neural network manifest as organic architecture. Interaction creates entropy; focus creates form. Explore the fragments of a digital subconscious.
              </p>
            </div>
            <div className="flex flex-col items-end text-right">
              <div className="font-headline font-bold text-4xl text-on-surface/20 mb-2">50,000+</div>
              <div className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface/40">ACTIVE PARTICLES</div>
            </div>
          </div>
        </section>

        {/* Tarot Section */}
        <section className="relative min-h-[700px] flex flex-col items-center justify-center py-16">
          <div className="text-center mb-20">
            <h2 className="font-headline font-bold text-3xl uppercase tracking-tighter mb-4">THE EXPLORER'S TAROT</h2>
            <div className="flex gap-8 justify-center">
              {['ARCHITECTURE', 'AI & LIFE', 'PSYCHOLOGY', 'FRAGMENTS'].map((tag, i) => (
                <span key={tag} className={`font-label text-[10px] uppercase tracking-[0.2em] ${i === 0 ? 'text-primary' : 'text-on-surface/40'}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Card Stack Container */}
          <div
            className="relative w-full h-[450px] flex items-center justify-center"
            onMouseEnter={() => !extractedIndex && setIsFanned(true)}
            onMouseLeave={() => !extractedIndex && setIsFanned(false)}
          >
            <div className="relative w-56 h-80">
              {cardData.map((card, i) => {
                const isExtracted = extractedIndex === i;
                const isOtherExtracted = extractedIndex !== null && extractedIndex !== i;
                
                // Fan calculations
                const angle = (i - (cardData.length - 1) / 2) * 12;
                const radius = 350;
                const tx = Math.sin(angle * (Math.PI / 180)) * radius;
                const ty = -Math.cos(angle * (Math.PI / 180)) * radius + radius;

                return (
                  <motion.div
                    key={i}
                    onClick={() => handleCardClick(i)}
                    className="absolute inset-0 w-56 h-80 cursor-pointer"
                    initial={false}
                    animate={{
                      x: isExtracted ? 0 : (isFanned ? tx : 0),
                      y: isExtracted ? -100 : (isFanned ? ty : 0),
                      rotate: isExtracted ? 0 : (isFanned ? angle : i * 2),
                      scale: isExtracted ? 1.5 : (isOtherExtracted ? 0.8 : 1),
                      opacity: isOtherExtracted ? 0.2 : 1,
                      zIndex: isExtracted ? 100 : i,
                    }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <motion.div 
                      className="w-full h-full relative"
                      animate={{ rotateY: isExtracted ? 0 : 180 }}
                      transition={{ duration: 0.8, ease: "circOut" }}
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Card Front */}
                      <div 
                        className="absolute inset-0 bg-surface border border-primary/30 p-4 flex flex-col justify-between"
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-label text-[10px] text-primary/50">#0{i + 1}</span>
                          <span className="text-primary/30">{card.icon}</span>
                        </div>
                        <div className="flex-grow flex flex-col items-center justify-start text-center px-2 pt-2 pb-4">
                          <div className="w-full h-40 mb-4 overflow-hidden border border-on-surface/5 relative group">
                            <CyberpunkImage src={card.img} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500" alt={card.title} referrerPolicy="no-referrer" />
                          </div>
                          <div className="flex flex-col flex-grow justify-center w-full px-2">
                            <p className="font-body text-[11px] italic leading-relaxed text-on-surface/80 mb-3">
                              "{card.quote}"
                            </p>
                            <div className="w-4 h-[1px] bg-primary/50 mx-auto mb-3"></div>
                            <p className="font-headline text-[9px] font-bold uppercase tracking-widest text-primary/70 text-right w-full">
                              — {card.author}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-end">
                          <div className="font-label text-[8px] tracking-tighter opacity-20">ARCHITECT.OS</div>
                          <ArrowUpRight size={10} className="opacity-20 rotate-45" />
                        </div>
                      </div>

                      {/* Card Back (Clow Seal) */}
                      <div 
                        className="absolute inset-0 bg-surface border border-primary flex items-center justify-center overflow-hidden"
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <svg className="w-[150%] h-[150%] stroke-primary/80 stroke-[0.5] fill-none opacity-80" viewBox="0 0 200 200">
                          <circle cx="100" cy="100" r="95" />
                          <circle cx="100" cy="100" r="88" />
                          <circle cx="100" cy="100" r="75" strokeDasharray="2,2" />
                          <path d="M100 25 L165 137.5 L35 137.5 Z" />
                          <path d="M100 175 L35 62.5 L165 62.5 Z" />
                          <path d="M100 10 L100 190 M10 100 L190 100" strokeWidth="0.3" />
                          <circle cx="100" cy="100" r="15" />
                          <path d="M100 85 A 15 15 0 0 1 100 115" strokeWidth="1" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-primary/10 to-white/0 mix-blend-color-dodge opacity-50"></div>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="mt-20 font-label text-[10px] uppercase tracking-[0.5em] text-white/20 animate-pulse">
            HOVER TO FAN / CLICK TO EXTRACT
          </div>
        </section>

        {/* Technical Metadata */}
        <section className="py-32 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
            {[
              { title: "01 / GENESIS", desc: "The expansion of the monolith requires a departure from Euclidean space. Here, we simulate the emotional weight of volume using light and shadow." },
              { title: "02 / INTERFACE", desc: "Human interaction is the primary input for entropy. The tree reacts, not to command, but to presence. It is a mirror of digital awareness." },
              { title: "03 / FUTURE", desc: "Scaling beyond the browser. We are building environments that do not just store data, but inhabit it. The extension is the first step." }
            ].map(item => (
              <div key={item.title} className="relative pt-10">
                <div className="absolute top-0 left-0 w-6 h-[1px] bg-primary"></div>
                <h4 className="font-headline font-bold text-lg mb-4 uppercase tracking-tighter text-on-surface">{item.title}</h4>
                <p className="font-body text-xs text-on-surface/60 leading-relaxed uppercase tracking-wider">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Image Grid */}
        <section className="pb-32">
          <div className="grid grid-cols-12 gap-1 items-stretch">
            <div className="col-span-12 md:col-span-8 bg-white/5 h-[500px] overflow-hidden relative group">
              <CyberpunkImage
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                src={IMAGE_ASSETS.extension.feedingBrain.tarotModal1}
                alt="Structure"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
              <div className="absolute bottom-8 left-8">
                <h5 className="font-headline font-bold text-3xl uppercase tracking-tighter">STRUCTURE 01</h5>
              </div>
            </div>
            <div className="col-span-12 md:col-span-4 flex flex-col gap-1 h-[500px]">
              <div className="h-1/2 bg-white/5 overflow-hidden relative group">
                <CyberpunkImage
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  src={IMAGE_ASSETS.extension.feedingBrain.tarotModal2}
                  alt="Detail"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="h-1/2 bg-primary p-8 flex flex-col justify-between">
                <Box className="text-on-primary" size={32} />
                <p className="font-headline font-black text-xl text-on-primary uppercase leading-tight">SYSTEMS <br /> ARCHITECTURE</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-12 border-t border-on-surface/10">
        <div className="flex flex-col md:flex-row justify-between items-center opacity-40">
          <div className="font-body font-medium uppercase tracking-[0.2em] text-[10px] mb-4 md:mb-0 text-on-surface">
            © 2026 ARCHITECTURAL MONOLITH / ALL RIGHTS RESERVED
          </div>
          <div className="flex gap-12">
            {['TWITTER', 'LINKEDIN', 'GITHUB'].map(link => (
              <a key={link} href="#" className="font-body font-medium uppercase tracking-[0.2em] text-[10px] hover:text-primary transition-colors text-on-surface">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </motion.div>
  );
};
