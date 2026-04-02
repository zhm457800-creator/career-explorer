import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { IMAGE_ASSETS } from '../lib/assets';
import { CyberpunkImage } from '../components/CyberpunkImage';

export const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !maskRef.current) return;
      
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(maskRef.current, {
        clipPath: `circle(150px at ${x}px ${y}px)`,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      if (!maskRef.current) return;
      gsap.to(maskRef.current, {
        clipPath: 'circle(0% at center)',
        duration: 0.5,
        ease: 'power2.inOut'
      });
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (hero) {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1400px] mx-auto">
      {/* Hero Section */}
      <section ref={heroRef} className="min-h-[80vh] flex flex-col md:flex-row items-center gap-12 md:gap-20 mb-40 relative">
        <div className="w-full md:w-3/5 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-headline font-black text-5xl leading-[0.9] tracking-tighter uppercase text-on-surface md:text-7xl lg:text-8xl"
          >
            THAT TREE IS LIKE SOME PEOPLE. IT GROWS BEST IN THE <span className="text-primary italic">DARK</span>.
          </motion.h1>
          
          {/* Eraser Layer */}
          <div 
            ref={maskRef}
            className="lens-mask absolute inset-0 z-20 flex items-center pointer-events-none overflow-hidden"
            style={{ clipPath: 'circle(0% at center)' }}
          >
            <h1 className="font-headline font-black text-5xl leading-[0.9] tracking-tighter uppercase md:text-7xl lg:text-8xl w-full">
              THAT TREE IS LIKE SOME PEOPLE. IT GROWS BEST IN THE <span className="text-primary italic">LIGHT</span>.
            </h1>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-12 flex items-center gap-6"
          >
            <span className="text-micro font-light text-on-surface/60 uppercase tracking-[0.3em]">00 / INTRO</span>
            <div className="h-px w-24 bg-outline-variant/30"></div>
            <p className="text-xs max-w-xs text-on-surface/60">From an auditor of the physical world to a pioneer in the digital galaxy. Beyond the horizon of hardship, I am reconstructing the eternal totem of the Explorer through algorithms.</p>
          </motion.div>
        </div>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-2/5 relative group overflow-hidden aspect-[4/5]"
          style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)' }}
        >
          <span className="absolute top-2 left-2 text-primary font-bold z-10 text-xs">+</span>
          <span className="absolute top-2 right-2 text-primary font-bold z-10 text-xs">+</span>
          <span className="absolute bottom-2 left-2 text-primary font-bold z-10 text-xs">+</span>
          <span className="absolute bottom-2 right-2 text-primary font-bold z-10 text-xs">+</span>
          <CyberpunkImage 
            className="w-full h-full object-cover filter grayscale blur-xl brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:blur-none group-hover:brightness-100 group-hover:scale-105" 
            src={IMAGE_ASSETS.home.heroBg} 
            alt="Moody tree"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-background/20 mix-blend-overlay"></div>
        </motion.div>
      </section>

      {/* Staggered Vertical Grid (Projects) */}
      <section className="space-y-64 mb-64">
        {/* Item 01 */}
        <div className="grid grid-cols-12 gap-8 items-end">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-2 md:col-span-5 space-y-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-headline font-bold text-outline-variant/40 italic text-3xl">01</span>
              <h2 className="font-headline font-bold uppercase tracking-tighter text-on-surface text-4xl">THE SEED</h2>
            </div>
            <div
              className="relative group aspect-[3/2] overflow-hidden"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)' }}
            >
              <CyberpunkImage
                className="w-full h-full object-cover grayscale blur-md brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:blur-none group-hover:brightness-100 group-hover:scale-105"
                src={IMAGE_ASSETS.home.sectionImg1}
                alt="The Seed"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-8 md:col-span-4 pb-12"
          >
            <div className="border-l border-outline-variant/30 pl-8 space-y-8">
              <h3 className="text-lg font-bold text-primary uppercase tracking-widest">TRAIT_DETAILS</h3>
              <p className="text-sm text-on-surface/80 leading-relaxed">
                <span className="block whitespace-nowrap">DATA_SENSITIVITY / 极度敏锐的数字感</span>
                <span className="block whitespace-nowrap">PRECISION_ENGINE / 精确至上的逻辑底盘</span>
                以“全生命周期”为视角，在金额5000 万+项目的负载下，埋下对世界进行“数字审判”的思维种子。
              </p>
              <div className="pt-4 space-y-3">
                <button className="text-base font-bold border-b-2 border-primary text-on-surface pb-1 hover:text-primary transition-colors">VIEW_SPECIFICATIONS</button>
                <p className="text-xs text-on-surface/40 italic uppercase tracking-widest">Logic is the beginning of wisdom.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Item 02 */}
        <div className="grid grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-7 md:col-span-5 space-y-8 order-1 md:order-2"
          >
            <div className="flex items-baseline gap-4 justify-end md:justify-start">
              <span className="font-headline font-bold text-outline-variant/40 italic text-3xl">02</span>
              <h2 className="font-headline font-bold uppercase tracking-tighter text-on-surface text-4xl">THE BARK</h2>
            </div>
            <div
              className="relative group aspect-[3/2] overflow-hidden"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)' }}
            >
              <CyberpunkImage
                className="w-full h-full object-cover grayscale blur-md brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:blur-none group-hover:brightness-100 group-hover:scale-105"
                src={IMAGE_ASSETS.home.sectionImg2}
                alt="The Bark"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-2 md:col-span-4 pt-12 order-2 md:order-1"
          >
            <div className="text-right border-r-0 md:border-r border-outline-variant/30 md:pr-8 space-y-8">
              <h3 className="text-lg font-bold text-primary uppercase tracking-widest">TRAIT_DETAILS</h3>
              <p className="text-sm text-on-surface/80 leading-relaxed flex flex-col items-end">
                <span className="whitespace-nowrap">DETAIL_REFINEMENT / 近乎偏执的细节打磨</span>
                <span className="whitespace-nowrap">ITERATIVE_ADAPTATION / 脚步不停的迭代进化</span>
                <span className="mt-2">半道转场中保持前进的勇气，意外不曾动摇我的精神内核，反而让外皮在每一次迭代中愈发坚固。</span>
              </p>
              <div className="pt-4 space-y-3 flex flex-col items-end">
                <button className="text-base font-bold border-b-2 border-primary text-on-surface pb-1 hover:text-primary transition-colors w-fit">VIEW_SPECIFICATIONS</button>
                <p className="text-xs text-on-surface/40 italic uppercase tracking-widest">I don't believe in the no-win scenario.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Item 03 */}
        <div className="grid grid-cols-12 gap-8 items-end">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-2 md:col-span-5 space-y-8"
          >
            <div className="flex items-baseline gap-4">
              <span className="font-headline font-bold text-outline-variant/40 italic text-3xl">03</span>
              <h2 className="font-headline font-bold uppercase tracking-tighter text-on-surface text-4xl">THE BLOOM</h2>
            </div>
            <div
              className="relative group aspect-[3/2] overflow-hidden"
              style={{ WebkitMaskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)', maskImage: 'radial-gradient(ellipse at center, black 55%, transparent 100%)' }}
            >
              <CyberpunkImage
                className="w-full h-full object-cover grayscale blur-md brightness-75 transition-all duration-1000 group-hover:grayscale-0 group-hover:blur-none group-hover:brightness-100 group-hover:scale-105"
                src={IMAGE_ASSETS.home.sectionImg3}
                alt="The Bloom"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-start-8 md:col-span-4 pb-12"
          >
            <div className="border-l border-outline-variant/30 pl-8 space-y-8">
              <h3 className="text-lg font-bold text-primary uppercase tracking-widest">TRAIT_DETAILS</h3>
              <p className="text-sm text-on-surface/80 leading-relaxed">
                <span className="block whitespace-nowrap">EXPLORATION_SPIRIT / 永不设限的探索精神</span>
                <span className="block whitespace-nowrap">RIGOROUS_CREATIVITY / 基于认真态度的蓬勃创意</span>
                用算法重构逻辑的羽翼。在 AI 协作的深空里，让曾经计量的每一份努力，都转化为航向未来的数字坐标。
              </p>
              <div className="pt-4 space-y-3">
                <button className="text-base font-bold border-b-2 border-primary text-on-surface pb-1 hover:text-primary transition-colors">VIEW_SPECIFICATIONS</button>
                <p className="text-xs text-on-surface/40 italic uppercase tracking-widest">To boldly go where no one has gone before.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="border-t border-outline-variant/20 py-32 text-center">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.1 }}
          whileHover={{ opacity: 1, color: 'var(--color-primary)' }}
          transition={{ duration: 0.5 }}
          className="font-headline font-black text-6xl uppercase tracking-tighter text-on-surface/10 cursor-default md:text-8xl"
        >
          BUILD_WITH_ME
        </motion.h2>
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs uppercase text-on-surface/60 mb-8">Ready to transition from the void to the light?</p>
          <button className="bg-primary text-on-primary font-headline font-bold tracking-tighter uppercase hover:bg-on-surface hover:text-background transition-colors px-10 py-3">
            My Portfolio
          </button>
        </div>
      </section>
    </div>
  );
};
