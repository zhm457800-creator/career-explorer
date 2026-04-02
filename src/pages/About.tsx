import React, { useRef, useEffect } from 'react';
import { Network, Sparkles, Brain, Quote, Book, Podcast, Film, Terminal } from 'lucide-react';
import { AboutCarousel } from '../components/AboutCarousel';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';

const ColorCard = ({ bgColor, textColor = '#1A1A1B', children, maskContent, className = '', showNoise = false }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !maskRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    lastPos.current = { x, y };

    gsap.to(maskRef.current, {
      clipPath: `circle(150px at ${x}px ${y}px)`,
      duration: 0.3,
      ease: 'power2.out',
      overwrite: 'auto'
    });
  };

  const handleMouseLeave = () => {
    if (!maskRef.current) return;
    gsap.to(maskRef.current, {
      clipPath: `circle(0px at ${lastPos.current.x}px ${lastPos.current.y}px)`,
      duration: 0.15,
      ease: 'power4.in',
      overwrite: 'auto'
    });
  };

  return (
    <div 
      ref={cardRef}
      className={`relative overflow-hidden group ${className}`}
      style={{ 
        backgroundColor: bgColor, 
        color: textColor
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-8 md:p-12 h-full flex flex-col justify-between relative z-0">
        {children}
      </div>
      
      <div 
        ref={maskRef}
        className="lens-mask absolute inset-0 z-10 p-8 md:p-12 pointer-events-none"
        style={{
          clipPath: 'circle(0px at center)',
          WebkitClipPath: 'circle(0px at center)',
          willChange: 'clip-path',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)'
        }}
      >
        {showNoise && <div className="noise-overlay" />}
        {maskContent}
      </div>
    </div>
  );
};

export const About = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* Header Carousel */}
      <AboutCarousel />

      {/* Main Content */}
      <main className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-24 gap-8">
          <h2 className="font-headline font-[900] text-5xl md:text-8xl tracking-tighter uppercase leading-none max-w-2xl">
            THE <span className="text-primary">ARCHITECTURAL</span> MONOLITH
          </h2>
          <p className="font-serif-italic italic text-xl md:text-2xl max-w-sm text-right">
            Building digital cathedrals in a world of temporary structures.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 py-1 bg-outline-variant/20">
          {/* Card A */}
          <ColorCard 
            bgColor="#D8A7B1" 
            className="md:col-span-8 h-[500px]"
            maskContent={
              <div className="h-full flex flex-col justify-center items-center">
                <div className="text-left w-fit">
                  <p className="text-xl md:text-2xl font-extralight leading-relaxed tracking-[0.25em] px-8">
                    让感性止于外壳。<br/>
                    在透镜的轴心维度，只允许精确运行。<br/>
                    这是我在万物流转中，<br/>
                    为 <span style={{ color: '#D8A7B1' }} className="animate-signal-blink font-bold">SOLID CORE</span> 锚定的唯一坐标。
                  </p>
                  <Network className="mt-12 w-16 h-16" />
                </div>
              </div>
            }
          >
            <span className="font-label text-xs tracking-[0.3em] font-black uppercase">Identity / 01</span>
            <h3 className="font-headline font-[900] text-4xl md:text-6xl uppercase leading-none">Soft Shell,<br/>Solid Core.</h3>
            <div className="absolute top-4 right-4 text-4xl font-light opacity-20">+</div>
            <div className="absolute bottom-4 left-4 text-4xl font-light opacity-20">+</div>
          </ColorCard>

          {/* Card B */}
          <ColorCard 
            bgColor="#EAE6DF" 
            className="md:col-span-4 h-[500px]"
            maskContent={
              <div className="h-full flex flex-col justify-center">
                <p className="text-xl font-light leading-relaxed">细节不是为了完美，而是为了在万物流转的熵增里，锚定一点属于我自己的确定性。</p>
                <div className="mt-8 h-[1px] w-full bg-primary/40"></div>
              </div>
            }
          >
            <span className="font-label text-xs tracking-[0.3em] font-black uppercase">Standard / 02</span>
            <h3 className="font-headline font-[900] text-4xl uppercase leading-none">Devil in the<br/>Details.</h3>
          </ColorCard>

          {/* Card C */}
          <ColorCard 
            bgColor="#7A8B99" 
            textColor="#FFFFFF"
            className="md:col-span-4 h-[600px]"
            maskContent={
              <div className="h-full flex flex-col justify-end">
                <p className="text-xl font-light leading-relaxed mb-6">踩过的坑都变成了梯子，AI 不再是工具，是我的新感官。</p>
                <Sparkles className="w-10 h-10" />
              </div>
            }
          >
            <span className="font-label text-xs tracking-[0.3em] font-black uppercase">Future / 03</span>
            <h3 className="font-headline font-[900] text-4xl uppercase leading-none">Into the<br/>Unknown.</h3>
          </ColorCard>

          {/* Card D */}
          <ColorCard 
            bgColor="#A8B0A2" 
            className="md:col-span-8 h-[600px]"
            showNoise={true}
            maskContent={
              <div className="h-full flex items-center justify-center">
                <p className="text-xl md:text-2xl font-serif-cn font-extralight leading-relaxed tracking-[0.2em] text-center max-w-3xl px-8">
                  为了精确而保持静默，在逻辑校准中，绘制星辰间无限组合的<span style={{ color: '#D8A7B1' }} className="animate-signal-blink font-bold">思维版图</span>。
                </p>
              </div>
            }
          >
            <div className="flex justify-between items-start">
              <span className="font-label text-xs tracking-[0.3em] font-black uppercase">Psychology / 04</span>
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="font-headline font-[900] text-6xl md:text-8xl uppercase leading-[0.85] tracking-tighter">INFJ<br/>Sanctuary.</h3>
          </ColorCard>
        </div>

        {/* Experience List */}
        <div className="mt-48 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          <div className="md:col-span-7">
            <h4 className="font-headline font-black text-2xl border-b-4 border-on-surface pb-4 inline-block tracking-tighter mb-24">UNDER THE HOOD</h4>
            
            <div className="space-y-4">
              {/* SECTION 01: Precision */}
              <div className="group relative px-6 py-4 -ml-6 transition-all duration-500">
                <div className="grid-lines-bg absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-primary">
                        <rect x="4" y="4" width="16" height="16" rx="1" />
                        <path d="M12 4V20" strokeDasharray="2 2" />
                        <path d="M4 12H20" strokeDasharray="2 2" />
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                      </svg>
                    </div>
                    <h5 className="font-headline font-bold text-2xl">01. 关于“偏执”</h5>
                    <span className="font-mono text-xs opacity-60 text-primary uppercase tracking-widest">(The Precision)</span>
                  </div>
                  <p className="font-body text-base leading-[1.75] text-on-surface/80 max-w-2xl">
                    习惯了在清单中对齐每一分钱，这种“职业病”已经成了我的肌肉记忆，现在不管是调图片还是做设计，只要有一点位移，大脑就会自动发出警报。我坚持，没有“大概，差不多”，只有严丝合缝的逻辑闭环。
                  </p>
                </div>
              </div>

              {/* SECTION 02: Adaptability */}
              <div className="group relative px-6 py-4 -ml-6 transition-all duration-500">
                <div className="grid-lines-bg absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-primary">
                        <path d="M4 20C4 20 8 16 12 16C16 16 20 20 20 20" className="animate-path" />
                        <path d="M4 12C4 12 8 8 12 8C16 8 20 12 20 12" className="animate-path" style={{ animationDelay: '0.5s' }} />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                        <circle cx="12" cy="8" r="1" fill="currentColor" />
                      </svg>
                    </div>
                    <h5 className="font-headline font-bold text-2xl">02. 关于“活络”</h5>
                    <span className="font-mono text-xs opacity-60 text-primary uppercase tracking-widest">(The Adaptability)</span>
                  </div>
                  <p className="font-body text-base leading-[1.75] text-on-surface/80 max-w-2xl">
                    我不盲目遵守死板的规矩，不管是枯燥的工程算量，还是复杂的AI提示词，我总是在钻研：有没有更聪明、更高效、更契合的解法？我认为，所谓开拓，就是要敢于迈步探索未知之路，找到最优解。
                  </p>
                </div>
              </div>

              {/* SECTION 03: Persistence */}
              <div className="group relative px-6 py-4 -ml-6 overflow-hidden transition-all duration-500">
                <div className="grid-lines-bg absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"></div>
                <div className="particle-drift absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                  {[...Array(10)].map((_, i) => (
                    <div 
                      key={i} 
                      className="particle" 
                      style={{ 
                        left: `${Math.random() * 100}%`, 
                        top: `${Math.random() * 100}%`,
                        animationDuration: `${2 + Math.random() * 3}s`,
                        animationDelay: `${Math.random() * 2}s`
                      }} 
                    />
                  ))}
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full text-primary">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3V21M3 12H21" strokeOpacity="0.3" />
                        <path d="M12 8L15 12L12 16L9 12L12 8Z" fill="currentColor" className="animate-pulse" />
                      </svg>
                    </div>
                    <h5 className="font-headline font-bold text-2xl">03. 关于“认真”</h5>
                    <span className="font-mono text-xs opacity-60 text-primary uppercase tracking-widest">(The Persistence)</span>
                  </div>
                  <p className="font-body text-base leading-[1.75] text-on-surface/80 max-w-2xl">
                    23 岁，在行业变动中转场。我发现只要还在打磨细节、还在学习新维度，原本碎裂的坐标就能重新锚定。我相信，“做难事，必有所得”，这不是一句口号，而是新领域的一张入场券。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center pt-12">
            <div className="bg-surface border border-outline-variant/20 text-on-surface p-10 w-full max-w-md ml-auto shadow-2xl relative flex flex-col justify-between min-h-[450px] transform translate-y-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-primary/30"></div>
              <div>
                <Quote className="w-12 h-12 mb-8 text-primary/40" />
                <p className="text-[1.75rem] font-serif-italic italic leading-relaxed mb-8 text-on-surface/80">
                  "Design is not what it looks like and feels like. Design is how it works under the hood."
                </p>
              </div>
              <div className="font-label text-xs font-black tracking-[0.3em] uppercase opacity-40 border-t border-on-surface/10 pt-6">
                Observation Report / Philosophy
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Action */}
      <section className="bg-surface py-48 px-6 flex flex-col items-center justify-center overflow-hidden">
        <div className="relative group">
          <div className="absolute inset-[-40px] border border-primary/20 rounded-full animate-rotate-slow"></div>
          <div className="absolute inset-[-40px] border-t-2 border-primary rounded-full animate-rotate-slow"></div>
          <Link to="/archive" className="relative z-10 bg-primary text-on-primary px-12 py-12 font-headline font-black text-2xl tracking-tighter uppercase transition-transform duration-500 hover:scale-110 active:scale-95 flex items-center justify-center text-center">
            SEE WHAT'S FEEDING<br/>MY BRAIN
          </Link>
        </div>
        <div className="mt-24 flex gap-8 opacity-20 grayscale">
          <Book className="w-10 h-10" />
          <Podcast className="w-10 h-10" />
          <Film className="w-10 h-10" />
          <Terminal className="w-10 h-10" />
        </div>
      </section>
    </div>
  );
};
