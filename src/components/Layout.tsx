import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Mail, MessageSquare, Copy, Check, Hash } from 'lucide-react';
import { gsap } from 'gsap';
import { Assistant } from './Assistant';

// Custom Cursor Component
export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const location = useLocation();
  const isArchivePage = location.pathname === '/archive';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .reveal-container, .glass-card, .scaler-wrapper')) {
        setIsHovering(true);
      }
    };
    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .reveal-container, .glass-card, .scaler-wrapper')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);
    window.addEventListener('mouseout', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor fixed top-0 left-0 pointer-events-none z-[10001] rounded-full border ${isArchivePage ? 'border-[#D8A7B1]' : 'border-[#F4F1ED]'}`}
      style={{ mixBlendMode: isArchivePage ? 'normal' : 'difference' }}
      animate={{
        x: position.x - (isHovering ? 30 : 15),
        y: position.y - (isHovering ? 30 : 15),
        width: isHovering ? 60 : 30,
        height: isHovering ? 60 : 30,
        backgroundColor: isArchivePage ? 'transparent' : (isHovering ? 'rgba(216, 167, 177, 0.8)' : 'rgba(216, 167, 177, 0.8)'),
        borderWidth: isArchivePage ? '2px' : '1px'
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.5 }}
    />
  );
};

// Copyable Field Component
const CopyableField = ({ label, value, icon: Icon, href, isLocked }: { label: string; value: string; icon: any; href?: string; isLocked?: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLocked) return;
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Content = (
    <div className="flex items-center gap-5 group/item cursor-pointer py-3 border-b border-on-surface/5 hover:border-primary/30 transition-all duration-500" onClick={handleCopy}>
      <div className="w-10 h-10 shrink-0 rounded-full bg-on-surface/5 flex items-center justify-center border border-on-surface/10 group-hover/item:border-primary/40 group-hover/item:bg-primary/5 transition-all duration-500">
        <Icon size={18} className="text-on-surface/50 group-hover/item:text-primary transition-colors" />
      </div>
      <div className="flex-grow min-w-0">
        <p className="text-[8px] text-on-surface/30 uppercase tracking-[0.2em] mb-0.5 font-label">{label}</p>
        <div className="flex items-center justify-between gap-4">
          <span className={`font-headline font-bold text-on-surface text-base md:text-lg tracking-tighter truncate transition-colors ${isLocked ? 'opacity-20 select-none' : 'group-hover/item:text-primary'}`}>
            {isLocked ? '••••••••' : value}
          </span>
          {!isLocked && (
            <div className="flex items-center shrink-0">
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  key="copied"
                  className="flex items-center gap-1.5 text-primary"
                >
                  <Check size={12} />
                  <span className="text-[9px] font-bold uppercase tracking-tighter">COPIED</span>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  key="copy"
                  className="text-on-surface/20 group-hover/item:text-primary/40 transition-colors"
                >
                  <Copy size={14} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} className="block no-underline">{Content}</a>;
  }
  return Content;
};

// Contact Modal Component
export const ContactModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [accessCode, setAccessCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    if (accessCode === '0131') {
      setIsUnlocked(true);
    }
  }, [accessCode]);

  useEffect(() => {
    if (!isOpen) {
      setAccessCode('');
      setIsUnlocked(false);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[840px] bg-[#0A0A0C]/50 backdrop-blur-3xl border border-white/20 shadow-[0_50px_100px_rgba(0,0,0,0.95),inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_0_0_1px_rgba(255,255,255,0.05)] rounded-[2rem] overflow-hidden flex flex-col md:flex-row ring-1 ring-black/50"
          >
            {/* Left/Top Section: Branding */}
            <div className="w-full md:w-1/3 bg-black/30 border-b md:border-b-0 md:border-r border-white/10 p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 w-48 h-48 bg-primary/20 blur-[80px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[8px] font-black text-white/80 uppercase tracking-widest">ACCESS_NODE</span>
                </div>
                <h2 className="font-headline font-black text-4xl tracking-tighter text-white leading-none break-words">
                  OPEN_<br />
                  <span className="italic text-primary">PORT</span>
                </h2>
                <p className="mt-5 text-[9px] text-white/30 uppercase tracking-[0.3em] font-bold leading-relaxed">
                  ARCHITECTURAL<br/>MONOLITH LOG
                </p>
              </div>

              <div className="relative z-10 mt-16 md:mt-0 flex items-center gap-3">
                <div className="relative flex items-center justify-center">
                   {isUnlocked && <div className="absolute inset-0 bg-green-500 blur-sm rounded-full" />}
                   <div className={`w-2 h-2 rounded-full ${isUnlocked ? 'bg-green-400' : 'bg-red-500'}`} />
                </div>
                <span className={`text-[9px] font-black tracking-widest uppercase ${isUnlocked ? 'text-green-500' : 'text-red-500/80'}`}>
                  {isUnlocked ? 'LINK ESTABLISHED' : 'ENCRYPTED PORT'}
                </span>
              </div>
            </div>

            {/* Right/Bottom Section: Input or Data */}
            <div className="w-full md:w-2/3 p-10 md:p-14 relative flex flex-col justify-center min-h-[400px]">
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />
              
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-all duration-300 z-[50] p-2 hover:bg-white/5 rounded-full group"
              >
                <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              <AnimatePresence mode="wait">
                {!isUnlocked ? (
                  <motion.div
                    key="locked"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full relative z-10"
                  >
                    <div className="flex items-center gap-3 mb-8">
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      <p className="text-base text-white/95 font-black tracking-widest relative">
                        请输入访问密码
                        <span className="absolute -bottom-2 left-0 w-8 h-[2px] bg-primary" />
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="password"
                        maxLength={4}
                        placeholder="••••"
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value)}
                        className="w-full bg-black/40 border-b-2 border-white/10 px-2 py-4 font-headline font-black text-center tracking-[1.5em] text-primary text-3xl focus:outline-none focus:border-primary transition-all placeholder:text-white/10"
                      />
                    </div>
                    <p className="mt-8 text-[8px] text-white/20 uppercase tracking-[0.2em] font-mono leading-relaxed">
                      ENTER 4-DIGIT ACCESS TOKEN TO REVEAL SECURE CONTACT CHANNELS.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="unlocked"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-full relative z-10 space-y-1"
                  >
                    <p className="text-[9px] text-green-500/60 font-bold uppercase tracking-[0.3em] mb-6">
                      CHANNELS DECRYPTED //
                    </p>
                    <CopyableField 
                      label="EMAIL" 
                      value="hm15295780131@outlook.com" 
                      icon={Mail} 
                      href="mailto:hm15295780131@outlook.com"
                    />
                    <CopyableField 
                      label="WECHAT" 
                      value="15295780131" 
                      icon={MessageSquare} 
                    />
                    <CopyableField 
                      label="QQ" 
                      value="2458678372" 
                      icon={Hash} 
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Layout Component
export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const location = useLocation();
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleTheme = (e: React.MouseEvent) => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);

    const bgColor = newIsDark ? '#1A1A1B' : '#F4F1ED';
    const textColor = newIsDark ? '#F4F1ED' : '#1A1A1B';
    const navBg = newIsDark ? 'rgba(26, 26, 27, 0.6)' : 'rgba(244, 241, 237, 0.4)';
    const navBorder = newIsDark ? 'rgba(80, 68, 69, 0.2)' : 'rgba(26, 26, 27, 0.1)';

    // Animate CSS variables for smooth transition
    gsap.to('html', {
      '--bg-color': bgColor,
      '--text-color': textColor,
      '--nav-bg': navBg,
      '--nav-border': navBorder,
      duration: 0.8,
      ease: 'power2.inOut',
    });

    if (newIsDark) {
      document.documentElement.classList.remove('light-theme');
    } else {
      document.documentElement.classList.add('light-theme');
    }

    // Overlay animation for visual feedback
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.style.backgroundColor = newIsDark ? '#1A1A1B' : '#F4F1ED';
      overlay.style.clipPath = `circle(0% at ${e.clientX}px ${e.clientY}px)`;
      overlay.style.opacity = '1';

      gsap.to(overlay, {
        clipPath: `circle(150% at ${e.clientX}px ${e.clientY}px)`,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              overlay.style.clipPath = 'circle(0% at 0% 0%)';
            }
          });
        }
      });
    }
  };

  const isArchivePage = location.pathname === '/archive';

  return (
    <div className="min-h-screen flex flex-col">
      <div id="theme-transition-overlay" ref={overlayRef}></div>
      <CustomCursor />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <Assistant />
      
      {!isArchivePage && (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl border border-outline-variant/20 bg-surface/60 backdrop-blur-md flex justify-between items-center px-8 py-4 z-[100] shadow-2xl">
          <Link to="/" className="font-headline font-black tracking-tighter text-on-surface text-lg uppercase">EXPLORER</Link>
          <div className="hidden md:flex gap-10 items-center">
            {[
              { name: 'HOME', path: '/' },
              { name: 'ABOUT', path: '/about' },
              { name: 'EXPERIENCE', path: '/experience' },
              { name: 'EXTENSION', path: '/extension' },
            ].map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`font-headline font-bold uppercase tracking-tighter text-sm transition-colors duration-300 relative group ${
                  location.pathname === item.path ? 'text-primary' : 'text-on-surface/70 hover:text-primary'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-px bg-primary transition-all duration-300 ${
                  location.pathname === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            <button
              onClick={() => setIsContactOpen(true)}
              className="font-headline font-bold uppercase tracking-tighter text-sm text-on-surface/70 hover:text-primary transition-colors duration-300"
            >
              CONTACT
            </button>
            
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-on-surface/10 text-on-surface hover:bg-primary hover:text-white transition-all duration-300 group"
              onClick={toggleTheme}
              title="Toggle Theme"
            >
              {isDark ? (
                <Sun size={16} className="transition-transform duration-500 group-hover:rotate-90" />
              ) : (
                <Moon size={16} className="transition-transform duration-500 group-hover:-rotate-12" />
              )}
            </button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="w-8 h-8 flex items-center justify-center rounded-full bg-on-surface/10 text-on-surface"
              onClick={toggleTheme}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Menu className="text-on-surface" />
          </div>
        </nav>
      )}

      <main className="flex-grow">
        {children}
      </main>

      {!isArchivePage && (
        <footer className="w-full border-t border-on-surface/5 mt-24">
          <div className="max-w-7xl mx-auto px-12 py-20 flex flex-col md:flex-row justify-between items-center md:items-end gap-12">
            <div className="flex flex-col gap-8 w-full md:w-auto">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="absolute w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="48" stroke="currentColor" strokeOpacity="0.1" strokeWidth="0.5"></circle>
                  <circle cx="50" cy="50" fill="none" r="48" stroke="var(--color-primary)" strokeDasharray="60 240" strokeWidth="1.5"></circle>
                </svg>
                <Link to="/archive" className="font-headline font-bold text-[10px] uppercase hover:text-primary transition-colors tracking-tighter text-center px-4 z-10 text-on-surface leading-tight">
                  PIONEER'S LOG<br/>拓荒者日志
                </Link>
              </div>
              <div className="flex gap-8 items-center">
                <span className="font-body text-[10px] uppercase tracking-[0.2em] font-light opacity-40 text-on-surface">INDEX</span>
                {[
                  { id: '01', path: '/' },
                  { id: '02', path: '/about' },
                  { id: '03', path: '/experience' },
                  { id: '04', path: '/extension' },
                ].map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`font-body text-[10px] uppercase tracking-[0.2em] font-light transition-all cursor-pointer ${
                      location.pathname === item.path 
                        ? 'text-primary opacity-100' 
                        : 'text-on-surface opacity-40 hover:opacity-100'
                    }`}
                  >
                    {item.id}
                  </Link>
                ))}
              </div>
            </div>
            <div className="text-right">
              <span className="font-headline font-black text-2xl tracking-tighter opacity-10 block mb-4 italic text-on-surface">ARCHITECTURAL MONOLITH</span>
              <p className="font-body text-[10px] uppercase tracking-[0.2em] font-light opacity-40 text-on-surface">
                ©2026 ARCHITECTURAL MONOLITH
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};
