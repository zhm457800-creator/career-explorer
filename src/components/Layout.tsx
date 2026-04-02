import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Mail, MessageSquare, Copy, Check, Hash } from 'lucide-react';
import { gsap } from 'gsap';

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
const CopyableField = ({ label, value, icon: Icon, href }: { label: string; value: string; icon: any; href?: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
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
          <span className="font-headline font-bold text-on-surface text-base md:text-lg tracking-tighter truncate group-hover/item:text-primary transition-colors">{value}</span>
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
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-[500px] bg-surface/40 border border-outline-variant/30 backdrop-blur-2xl p-8 md:p-10 overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-on-surface/50 hover:text-primary transition-colors z-10"
            >
              <X size={24} />
            </button>
            <div className="space-y-2 relative z-10 text-center md:text-left">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-block px-2.5 py-0.5 bg-primary/10 text-[8px] font-black text-primary uppercase tracking-[0.3em] rounded-sm"
              >
                GET_IN_TOUCH
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-headline font-black text-3xl md:text-5xl tracking-[ -0.05em] text-on-surface leading-none"
              >
                OPEN_<span className="italic text-primary/80">CHANNELS</span>
              </motion.h2>
            </div>

            <div className="mt-8 space-y-2 relative z-10 max-w-xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 bg-primary/30" />
                  <div>
                    <p className="text-micro font-bold text-on-surface/30 uppercase tracking-[0.3em]">CHANNELS</p>
                  </div>
                </div>
                
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
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="pt-10 flex items-center gap-4"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/5 border border-green-500/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-green-500/80 uppercase tracking-tighter">AVAILABLE FOR WORK</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 pt-6 border-t border-on-surface/5 flex justify-between items-center relative z-10"
            >
              <p className="text-[8px] text-on-surface/30 uppercase tracking-[0.2em] font-light">
                ©2026 ARCHITECTURAL MONOLITH
              </p>
              <div className="flex gap-4">
                {['LINKEDIN', 'GITHUB'].map(social => (
                  <a key={social} href="#" className="text-[8px] font-bold text-on-surface/40 hover:text-primary transition-colors tracking-widest uppercase">
                    {social}
                  </a>
                ))}
              </div>
            </motion.div>
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
