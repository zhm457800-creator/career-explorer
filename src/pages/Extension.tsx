import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { NarrativeDrawer } from '../components/NarrativeDrawer';
import { TarotDrawer } from '../components/TarotDrawer';
import { ResearchDrawer } from '../components/ResearchDrawer';
import { AIToolkitDrawer } from '../components/AIToolkitDrawer';
import { ArrowLeft } from 'lucide-react';
import { IMAGE_ASSETS } from '../lib/assets';
import { CyberpunkImage } from '../components/CyberpunkImage';

export const Extension = () => {
  const [isNarrativeOpen, setIsNarrativeOpen] = useState(false);
  const [isTarotOpen, setIsTarotOpen] = useState(false);
  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [isAIToolkitOpen, setIsAIToolkitOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <AnimatePresence>
        {isAIToolkitOpen && (
          <AIToolkitDrawer 
            onClose={() => setIsAIToolkitOpen(false)} 
          />
        )}
        {isNarrativeOpen && (
          <NarrativeDrawer 
            onClose={() => setIsNarrativeOpen(false)} 
          />
        )}
        {isTarotOpen && (
          <TarotDrawer 
            onClose={() => setIsTarotOpen(false)} 
          />
        )}
        {isResearchOpen && (
          <ResearchDrawer 
            onClose={() => setIsResearchOpen(false)} 
          />
        )}
      </AnimatePresence>

      <main className="pt-32 px-12 pb-20 overflow-hidden relative">
        {/* Background Grid Markers */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-outline-variant/20"></div>
          <div className="absolute top-0 left-2/4 w-px h-full bg-outline-variant/20"></div>
          <div className="absolute top-0 left-3/4 w-px h-full bg-outline-variant/20"></div>
          <div className="absolute top-1/3 left-0 w-full h-px bg-outline-variant/20"></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-outline-variant/20"></div>
        </div>

        {/* Header Section */}
        <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
          <div className="max-w-3xl">
            <span className="font-label text-primary uppercase tracking-[0.3em] text-[10px] mb-4 block">EXTENDING POSSIBILITIES // 04 MODULES</span>
            <h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] text-on-surface">
              INSPIRATION <br/> <span className="text-primary">DRAWERS</span>
            </h1>
          </div>
          <div className="text-right flex flex-col items-end gap-6">
            <button 
              onClick={() => navigate(-1)}
              className="font-label text-[10px] text-primary/40 hover:text-primary border border-primary/20 hover:border-primary px-6 py-2.5 uppercase tracking-[0.4em] transition-all duration-300 flex items-center gap-3 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" />
              <span className="relative z-10">RETURN_TO_CORE</span>
              <div className="w-1 h-1 bg-primary animate-pulse relative z-10"></div>
            </button>
            <p className="font-body text-xs text-on-surface/60 max-w-[300px] leading-relaxed uppercase tracking-wider">
              An architectural repository of thoughts, tools, and research protocols. Hover to explore the depth of the monolith.
            </p>
          </div>
        </header>

        {/* Asymmetric Grid Content */}
        <div className="flex flex-col md:flex-row h-[700px] gap-4 items-stretch relative">
          {/* 01 Narrative */}
          <motion.div 
            onClick={() => setIsNarrativeOpen(true)}
            whileHover={{ flexGrow: 2 }}
            className="glass-card flex-1 group relative overflow-hidden flex flex-col justify-end p-10 cursor-pointer rounded-l-[100px] rounded-r-none"
          >
            <div className="absolute top-8 left-8 font-headline font-black text-4xl opacity-10 text-on-surface">01</div>
            <div className="relative z-10">
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-on-surface">Narrative</h3>
              <p className="font-body text-[10px] text-on-surface/60 uppercase tracking-[0.2em] mb-8">Architectural Storytelling</p>
              <div className="bg-background/40 p-4 border-l border-primary backdrop-blur-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-primary font-headline font-bold uppercase text-lg leading-tight">公众号文章</p>
                <p className="text-on-surface/60 text-[9px] mt-2 uppercase">PUBLIC ACCOUNT ARTICLES</p>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 opacity-40">
              <CyberpunkImage 
                className="w-full h-full object-cover mix-blend-overlay grayscale" 
                src={IMAGE_ASSETS.extension.narrative.drawer} 
                alt="Narrative"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* 02 AI Toolkits */}
          <motion.div 
            onClick={() => setIsAIToolkitOpen(true)}
            whileHover={{ flexGrow: 2 }}
            className="glass-card flex-1 group relative overflow-hidden flex flex-col items-center justify-center p-10 cursor-pointer rounded-[20px] md:-mt-10 md:mb-10"
          >
            <div className="absolute top-8 left-8 font-headline font-black text-4xl opacity-10 text-on-surface">02</div>
            <div className="relative z-10 text-center">
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-on-surface">AI Toolkits</h3>
              <p className="font-body text-[10px] text-on-surface/60 uppercase tracking-[0.2em]">Generative Workflows</p>
            </div>
            <div className="absolute bottom-0 w-48 h-80 bg-surface border-x-4 border-t-4 border-outline-variant rounded-t-[30px] p-2 transform translate-y-20 group-hover:translate-y-4 transition-transform duration-700">
              <div className="w-full h-full bg-background rounded-t-[24px] overflow-hidden relative">
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-4 bg-outline-variant/40 rounded-full"></div>
                <CyberpunkImage 
                  className="w-full h-full object-cover opacity-0 group-hover:opacity-60 transition-opacity duration-1000" 
                  src={IMAGE_ASSETS.extension.aiToolkits.drawer} 
                  alt="AI Toolkit"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.div>

          {/* 03 Feeding My Brain */}
          <motion.div 
            onClick={() => setIsTarotOpen(true)}
            whileHover={{ flexGrow: 2 }}
            className="glass-card flex-1 group relative overflow-hidden flex flex-col justify-between p-10 cursor-pointer md:mt-10 rounded-[40px]"
          >
            <div className="absolute top-8 left-8 font-headline font-black text-4xl opacity-10 text-on-surface">03</div>
            <div className="flex flex-col gap-8 mt-20">
              <p className="font-headline text-xl font-light italic text-on-surface/60 border-l-2 border-primary pl-6 py-2 leading-relaxed">
                "Han Shunping, <br/>The Fourth Chimpanzee"
              </p>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-on-surface">Feeding Brain</h3>
              <p className="font-body text-[10px] text-on-surface/60 uppercase tracking-[0.2em]">Curation of thought</p>
            </div>
          </motion.div>

          {/* 04 Researching */}
          <motion.div 
            onClick={() => setIsResearchOpen(true)}
            whileHover={{ flexGrow: 2 }}
            className="glass-card flex-1 group relative overflow-hidden flex flex-col justify-end p-10 cursor-pointer rounded-r-[100px] rounded-l-none md:mb-20"
          >
            <div className="absolute top-8 left-8 font-headline font-black text-4xl opacity-10 text-on-surface">04</div>
            <div className="absolute top-0 right-0 h-full w-1/2 p-4 font-mono text-[8px] text-primary/30 overflow-hidden select-none pointer-events-none">
              <div className="animate-marquee-vertical">
                async function fetchGeminiAPI() {'{'}<br/>
                &nbsp;&nbsp;const response = await fetch('https://api.google.gemini.v1/generate');<br/>
                &nbsp;&nbsp;const stitchLogic = new Map();<br/>
                &nbsp;&nbsp;return stitchLogic.execute();<br/>
                {'}'}<br/>
                // Initiating Core...<br/>
                0x123456789ABCDEF<br/>
                // Stitch Logic Active<br/>
                system.load(Research_Module)<br/>
                0x123456789ABCDEF<br/>
                async function fetchGeminiAPI() {'{'}<br/>
                &nbsp;&nbsp;const response = await fetch('https://api.google.gemini.v1/generate');<br/>
                &nbsp;&nbsp;const stitchLogic = new Map();<br/>
                &nbsp;&nbsp;return stitchLogic.execute();<br/>
                {'}'}<br/>
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline text-2xl font-bold uppercase mb-4 text-on-surface">Researching</h3>
              <p className="font-body text-[10px] text-on-surface/60 uppercase tracking-[0.2em] mb-4">Gemini API / Stitch Logic</p>
              <div className="flex gap-2">
                <span className="text-[8px] border border-outline-variant px-2 py-1 text-on-surface/60">API_v1.2</span>
                <span className="text-[8px] border border-outline-variant px-2 py-1 text-on-surface/60">LOGIC_CORE</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Technical Metadata Overlay */}
        <div className="mt-20 flex justify-between items-center font-label text-[9px] text-outline tracking-[0.4em] uppercase">
          <div className="flex items-center gap-4">
            <span>COORD: 31.2304° N, 121.4737° E</span>
            <span className="w-2 h-2 bg-primary animate-ping"></span>
            <span>STATUS: ACTIVE_ARCHIVE</span>
          </div>
          <div className="hidden md:block">
            SYSTEM_REF: CE_EXT_2026_01
          </div>
        </div>
      </main>
    </div>
  );
};
