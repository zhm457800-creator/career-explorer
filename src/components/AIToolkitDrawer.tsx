import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Terminal, Settings, Database, Cpu, LayoutGrid, Zap, BarChart3, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';
import { NeuralBackground } from './NeuralBackground';


interface AIToolkitDrawerProps {
  onClose: () => void;
}

const tabData = {
  alpha: {
    id: '01',
    title: 'ECHO_LINGO',
    icon: Database,
    protocol: 'ECHO_LINGO / 语音克隆英语学习软件',
    capacity: 84,
    outcomes: [
      '全栈部署： 独立完成用户体系、数据库及云端全链路搭建。',
      '双模交互： 集成大模型接口，实现流式语音与文本即时对话。',
      '音色克隆： 接入神经网络算法，实现 1:1 还原的交互口语练习。',
      '后端驱动： 自动化解析、处理并调用大规模音频数据。'
    ],
  },
  neural: {
    id: '02',
    title: 'NEURAL_CORE',
    icon: Cpu,
    protocol: '敬请期待',
    capacity: 92,
    outcomes: [
      'Pattern Recognition at 99.8%',
      'Memory Allocation Optimized',
      'Synaptic Pruning Active'
    ],
  },
  grid: {
    id: '03',
    title: 'GRID_SYSTEM',
    icon: LayoutGrid,
    protocol: '敬请期待',
    capacity: 45,
    outcomes: [
      'Topology Mapping Complete',
      'Node Synchronization Stable',
      'Energy Distribution Balanced'
    ],
    action: 'RECALIBRATE_GRID'
  },
  void: {
    id: '04',
    title: 'VOID_ENGINE',
    icon: Zap,
    protocol: '敬请期待',
    capacity: 12,
    outcomes: [
      'Containment Field Holding',
      'Singularity Stable',
      'Hawking Radiation Nominal'
    ],
  }
};

export const AIToolkitDrawer = ({ onClose }: AIToolkitDrawerProps) => {
  const [activeTab, setActiveTab] = useState<keyof typeof tabData>('alpha');
  const [isCardVisible, setIsCardVisible] = useState(true);
  const [loadCapacity, setLoadCapacity] = useState(tabData.alpha.capacity);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoadCapacity(tabData[activeTab].capacity);
  }, [activeTab]);

  useEffect(() => {
    // Animate load capacity slightly for realism
    const interval = setInterval(() => {
      setLoadCapacity(prev => {
        const delta = Math.random() > 0.5 ? 0.1 : -0.1;
        return Math.min(100, Math.max(0, parseFloat((prev + delta).toFixed(1))));
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[150] bg-[#0D0D0D] text-[#e5e2e1] font-body overflow-hidden"
    >
      {/* Global HUD Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-12 h-20 bg-black/60 backdrop-blur-xl border-b border-white/5">
        <div className="text-xl font-black tracking-tighter text-white font-headline uppercase">MONOLITH.EXE</div>
        <div className="hidden md:flex">
          <span className="font-headline font-black uppercase tracking-tighter text-3xl text-white drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]">AI TOOLKITS</span>
        </div>
        <div className="flex items-center">
          <button 
            onClick={onClose}
            className="group flex items-center gap-3 font-headline font-bold uppercase tracking-tight text-sm text-white hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>CLOSE / BACK</span>
          </button>
        </div>
      </nav>

      {/* Main Viewport Container */}
      <main 
        className="relative h-screen w-screen flex items-center justify-center overflow-hidden neural-bg pt-20"
        onClick={() => setIsCardVisible(false)}
      >
        <NeuralBackground />
        {/* Sidebar Navigation */}
        <aside 
          className="fixed left-0 top-0 h-full flex flex-col pt-32 pb-8 w-64 bg-[#0D0D0D] z-40 border-r border-white/5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-8 mb-12">
            <h2 className="font-headline font-black text-white text-xs tracking-[0.3em] uppercase">PROJECT_ID</h2>
            <p className="font-headline font-bold text-primary text-[10px] opacity-60">V.08.24</p>
          </div>
          <nav className="flex-1 space-y-2">
            {(Object.keys(tabData) as Array<keyof typeof tabData>).map((key) => {
              const tab = tabData[key];
              const Icon = tab.icon;
              const isActive = activeTab === key && isCardVisible;
              return (
                <button 
                  key={key}
                  onClick={() => {
                    setActiveTab(key);
                    setIsCardVisible(true);
                  }}
                  className={`w-full text-left px-8 py-4 flex items-center gap-4 group transition-all duration-200 ${
                    isActive 
                      ? 'text-primary bg-[#1C1B1B] border-l-4 border-primary translate-x-1' 
                      : 'text-white/40 hover:text-white/80 hover:bg-[#1C1B1B] border-l-4 border-transparent'
                  }`}
                >
                  <Icon size={14} />
                  <span className="font-headline font-bold uppercase tracking-widest text-[10px]">{tab.id} / {tab.title}</span>
                </button>
              );
            })}
          </nav>
          <div className="px-8 mt-auto pt-8 border-t border-white/5">
            <div className="flex items-center gap-4 text-white/40">
              <BarChart3 size={14} />
              <span className="font-headline font-bold uppercase tracking-widest text-[10px]">SYSTEM_LOGS</span>
            </div>
          </div>
        </aside>

        {/* Central HUD Card */}
        <AnimatePresence>
          {isCardVisible && (
            <motion.section 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-4xl px-12 ml-64"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.05)] p-1 relative overflow-hidden rounded-2xl">
            {/* Technical Ornamentation */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-primary -translate-x-1 -translate-y-1"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-primary translate-x-1 -translate-y-1"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-primary -translate-x-1 translate-y-1"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-primary translate-x-1 translate-y-1"></div>
            
            <div className="p-10 flex flex-col gap-8">
              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-headline font-bold text-[10px] tracking-[0.4em] text-primary uppercase">Active Protocol</span>
                  <h1 className="font-headline font-black text-4xl mt-2 tracking-tighter uppercase text-white">{tabData[activeTab].protocol}</h1>
                </div>
                <div className="text-right">
                  <span className="font-headline font-bold text-[10px] tracking-[0.4em] text-white/40 uppercase">Load Capacity</span>
                  <p className="font-headline font-bold text-2xl text-[#00FF41]">{loadCapacity}%</p>
                </div>
              </div>

              {/* Progress Bar (Segmented) */}
              <div className="flex gap-1 w-full h-2">
                {[...Array(16)].map((_, i) => {
                  const isActive = i < Math.round((loadCapacity / 100) * 16);
                  return (
                    <div 
                      key={i} 
                      className={`h-full flex-grow transition-all duration-500 ${isActive ? 'bg-[#00FF41] shadow-[0_0_8px_#00FF41]' : 'bg-[#1C1B1B]'}`}
                    ></div>
                  );
                })}
              </div>

              {/* Main Content — Outcomes Only */}
              <div className="mt-4">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-primary font-headline font-bold text-xs">{tabData[activeTab].id}/</span>
                    <h3 className="font-headline font-bold text-xs tracking-widest uppercase text-white">Research Outcomes</h3>
                  </div>
                  <ul className="space-y-4">
                    {tabData[activeTab].outcomes.map((outcome, idx) => (
                      <li key={idx} className="flex items-center gap-3 group cursor-crosshair">
                        <span className="w-1.5 h-1.5 bg-primary flex-shrink-0"></span>
                        <span className="text-white/60 text-[11px] font-medium tracking-wide uppercase group-hover:text-white transition-colors">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Footer Text */}
          <div className="mt-8 flex justify-between w-full opacity-20">
            <span className="font-headline text-[8px] tracking-[0.5em] uppercase">Security Clearance: Omega</span>
            <span className="font-headline text-[8px] tracking-[0.5em] uppercase">Sync Status: Optimal</span>
            <span className="font-headline text-[8px] tracking-[0.5em] uppercase">Node: 7A-9X</span>
          </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Background Overlay Grids */}
        <div className="absolute inset-0 pointer-events-none border-[40px] border-[#0D0D0D] z-20"></div>
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_0%,_#0D0D0D_90%)] z-10"></div>
      </main>
    </motion.div>
  );
};
