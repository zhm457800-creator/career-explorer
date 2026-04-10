import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Filter, Lock, Terminal as TerminalIcon, RefreshCw, ArrowLeft } from 'lucide-react';
import gsap from 'gsap';


interface ResearchDrawerProps {
  onClose: () => void;
}

const codeSnippets = [
  "async function init_neural_v6(seed) {",
  "  const tensor = await compute_latent_matrix(seed);",
  "  return tensor.map(node => node.affinity * Math.exp(1.442));",
  "}",
  "class CoreEngine extends FractalLayer {",
  "  private const SYNC_RATE = 0.99281;",
  "  public void trigger_pulse() { if(this.ready) this.emit_signal(); }",
  "}",
  "def evaluate_entropy_delta(nodes, delta_t):",
  "  flux = nodes * delta_t * 6.626e-34",
  "  return round(flux * (1 + random.gauss(0, 0.02)), 6)",
  "LOG: Fractal_Drift detected in Sector_04. Compensating...",
  "STATUS_OK: High-fidelity link established. Parity CHECK.",
  "const neural_bridge = new BufferArray(1024 * 512);",
  "System.out.println(\"Synaptic_Handshake: Node_\" + node.hash);",
  "await resource.lock({ priority: 'OMEGA', mode: 'EXCLUSIVE' });",
  "lambda axis: torch.softmax(axis, dim=-1) # Att_Weight",
  "DECRYPT: Cipher_X-0 initialized. Hash: 0x822A1C.",
  "for cell in grid.cells(): worker.dispatch(Task_P, cell);",
  "import numpy as np; grad = optimize.gradient(f, x0)"
];

const researchNodes = [
  {
    label: ">> NEURAL_MAPPING_V2_01",
    title: "音色克隆英语学习软件“ECHO_LINGO”",
    desc: "致力于通过音色克隆技术打造极致个性化（Personalized）的语言学习体验。正在开发一款APP，技术端已打通系统框架、交互 UI 及基础文本对话链路，目前正集中于语音生成模块的优化与功能联调。",
    load: "84.2%",
    sync: "89.2% Optm",
    progress: 12,
  },
  {
    label: ">> ACCESSING_AI_QS_INTEGRATION_02",
    title: "构建公众号 AI 自动化写作 Workflow",
    desc: "为解决公众号创作慢、AI 风格调教难的痛点，我正通过标准化模块搭建专属工作流。目标是将 AI 从单纯的「聊天工具」转化为能精准复刻个人风格的「高效生产线」。",
    load: "68.4%",
    sync: "99.9% Core",
    progress: 10,
  },
  {
    label: ">> QUANTUM_LOGIC_SYNC_03",
    title: "探索中...",
    desc: "Synchronizing non-deterministic outcome prediction matrices. Utilizing cosmic geometric attractors to simulate edge-case strategy branches.",
    load: "94.8%",
    sync: "Locked_Zero",
    progress: 11,
  }
];

export const ResearchDrawer = ({ onClose }: ResearchDrawerProps) => {
  const [lines, setLines] = useState<{ text: string; isGreen: boolean; data?: any }[]>([]);
  const [selectedNode, setSelectedNode] = useState<any | null>(null);
  const [isTerminating, setIsTerminating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const sequenceStep = useRef(0); // 0: Pre-filling, 1: Typing 03, 2: Noise

  // Scanline animation
  useEffect(() => {
    if (scanlineRef.current) {
      gsap.to(scanlineRef.current, {
        top: "100%",
        duration: 4,
        ease: "none",
        repeat: -1
      });
    }
  }, []);

  // Typewriter logic
  const typeLine = async (text: string, isGreen: boolean, data?: any) => {
    return new Promise<void>((resolve) => {
      let currentText = "";
      const interval = isGreen ? 40 : 10;
      
      const timer = setInterval(() => {
        if (currentText.length < text.length) {
          currentText += text.charAt(currentText.length);
          // We update the last line in the state
          setLines(prev => {
            const newLines = [...prev];
            if (newLines.length > 0) {
              newLines[newLines.length - 1] = { text: currentText, isGreen, data };
            }
            return newLines;
          });
        } else {
          clearInterval(timer);
          resolve();
        }
      }, interval);
    });
  };

  const addLine = async () => {
    if (isTerminating) return;

    const contentHeight = contentRef.current?.offsetHeight || 0;
    const containerHeight = containerRef.current?.offsetHeight || 0;

    if (contentHeight > containerHeight - 100) {
      setIsTerminating(true);
      await new Promise(r => setTimeout(r, 2000));
      setLines([]);
      setIsTerminating(false);
      sequenceStep.current = 0;
      prePopulate();
      return;
    }

    let text = "";
    let isGreen = false;
    let data = undefined;

    if (sequenceStep.current === 1) {
      data = researchNodes[2];
      text = data.label;
      isGreen = true;
      sequenceStep.current = 2;
    } else {
      text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    }

    setLines(prev => [...prev, { text: "", isGreen, data }]);
    await typeLine(text, isGreen, data);
    
    setTimeout(() => addLine(), Math.random() * 300 + 50);
  };

  const prePopulate = () => {
    const containerHeight = containerRef.current?.offsetHeight || 0;
    const targetHeight = containerHeight * 0.4;
    
    let currentHeight = 0;
    let addedGreens = 0;
    const initialLines: { text: string; isGreen: boolean; data?: any }[] = [];
    
    // This is a bit tricky in React because we can't measure height easily before render
    // So we'll just add a fixed number of lines for the pre-populate phase
    for (let i = 0; i < 15; i++) {
      let text = "";
      let isGreen = false;
      let data = undefined;

      const isTargetForGreen = (addedGreens === 0 && i === 4) || (addedGreens === 1 && i === 10);

      if (isTargetForGreen && addedGreens < 2) {
        data = researchNodes[addedGreens];
        text = data.label;
        isGreen = true;
        addedGreens++;
      } else {
        text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      }
      initialLines.push({ text, isGreen, data });
    }

    setLines(initialLines);
    sequenceStep.current = 1;
    setTimeout(() => addLine(), 500);
  };

  useEffect(() => {
    prePopulate();
  }, []);

  const handleReset = () => {
    setLines([]);
    sequenceStep.current = 0;
    prePopulate();
  };

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[150] bg-background flex items-center justify-center p-8 drawer-dark-bg"
    >
      {/* Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-20 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px]"></div>

      <div className="w-full h-full max-w-7xl mx-auto border border-primary/15 bg-surface flex flex-col relative overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.8)]">
        {/* Neon Scanline */}
        <div 
          ref={scanlineRef}
          className="absolute w-full h-px bg-secondary/80 shadow-[0_0_12px_2px_rgba(0,255,65,0.4)] left-0 z-50 pointer-events-none"
        ></div>

        {/* Header */}
        <div className="h-11 bg-black/40 border-bottom border-primary/8 flex items-center px-6 justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
            </div>
            <span className="text-[0.6rem] tracking-[0.6em] font-bold text-primary/40 uppercase">System_Execution_Terminal_V6.0</span>
          </div>
          <div className="flex items-center space-x-6">
            <button 
              onClick={handleReset}
              className="text-[0.6rem] tracking-[0.3em] font-bold text-primary/30 hover:text-secondary transition-colors uppercase outline-none"
            >
              System_Flush
            </button>
            <button 
              onClick={onClose}
              className="group flex items-center gap-3 font-headline font-bold uppercase tracking-tight text-sm text-on-surface hover:text-primary transition-colors outline-none"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>CLOSE / BACK</span>
            </button>
            <span className="text-[0.55rem] font-mono text-primary/10 tracking-widest">PID: 9901-X</span>
          </div>
        </div>

        {/* Terminal Container */}
        <div ref={containerRef} className="flex-1 overflow-hidden p-6 relative">
          <div ref={contentRef} className="flex flex-col">
            {lines.map((line, i) => (
              <div 
                key={i} 
                className={line.isGreen ? "terminal-green-node" : "terminal-line"}
                onClick={() => line.isGreen && setSelectedNode(line.data)}
              >
                {line.text}
              </div>
            ))}
            <div className="terminal-cursor-blink"></div>
          </div>
        </div>
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedNode && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-8 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedNode(null)}
              className="absolute inset-0"
            />
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              className="relative w-full max-w-xl overflow-hidden bg-background/95 border border-primary/20 shadow-[0_0_120px_rgba(0,0,0,0.9)] backdrop-blur-[40px]"
            >
              {/* Top / Bottom accent lines */}
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>

              <div className="p-10 flex flex-col gap-8">
                {/* Label row */}
                <div className="flex items-center space-x-4">
                  <Filter className="text-secondary w-4 h-4" />
                  <span className="text-primary/30 font-mono text-[0.6rem] tracking-[0.5em] uppercase">Intelligence_Packet_Captured</span>
                </div>

                {/* Title */}
                <h2 className="text-primary font-headline font-bold text-4xl uppercase tracking-tighter">{selectedNode.title}</h2>

                {/* Description */}
                <p className="text-primary/60 font-body text-xs leading-relaxed">
                  {selectedNode.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1 border-b border-primary/10 pb-3">
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary/30">Fractal_Stability</span>
                    <span className="font-mono text-xl text-secondary">{selectedNode.load}</span>
                  </div>
                  <div className="flex flex-col gap-1 border-b border-primary/10 pb-3">
                    <span className="text-[0.6rem] uppercase tracking-[0.3em] text-primary/30">Temporal_Lock</span>
                    <span className="font-mono text-xl text-secondary">{selectedNode.sync}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="text-[0.5rem] uppercase tracking-[0.6em] text-primary/20 mb-4">Neural_Integrity_Matrix</div>
                  <div className="segmented-progress flex">
                    {[...Array(16)].map((_, i) => (
                      <span key={i} className={i < selectedNode.progress ? 'active' : ''}></span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
