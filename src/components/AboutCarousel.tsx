import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { IMAGE_ASSETS } from '../lib/assets';

export const AboutCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    
    // --- 核心轮播图逻辑 ---
    const navLinks = container.querySelectorAll('.nav-link');
    let currentIndex = 0;
    let isAnimating = false;
    const slides = container.querySelectorAll('.slide');
    const total = slides.length;
    const intervalTime = 5;
    let progressTween: gsap.core.Tween | undefined, breathingTween: gsap.core.Tween | undefined;

    function startBreathing(img: Element) {
        if(breathingTween) breathingTween.kill();
        gsap.set(img, { scale: 1.2 });
        breathingTween = gsap.to(img, {
            scale: 1.35, duration: intervalTime + 2, ease: "none", repeat: -1, yoyo: true
        });
    }

    function animateText(slide: Element) {
        const h2 = slide.querySelector('h2');
        const divider = slide.querySelector('.divider');
        const paragraphs = slide.querySelectorAll('p');
        const tl = gsap.timeline();
        tl.to(h2, { y: 0, opacity: 1, duration: 1.2, ease: "expo.out" }, 0.4)
          .to(divider, { scaleX: 1, duration: 1, ease: "expo.out" }, 0.6)
          .to(paragraphs, { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "expo.out" }, 0.7);
    }

    function startAutoPlay() {
        if(progressTween) progressTween.kill();
        const currentFill = navLinks[currentIndex].querySelector('.bar-fill');
        gsap.set(container.querySelectorAll('.bar-fill'), { width: "0%" });
        progressTween = gsap.to(currentFill, {
            width: "100%", duration: intervalTime, ease: "none",
            onComplete: () => nextSlide()
        });
    }

    function nextSlide() { changeSlide((currentIndex + 1) % total); }

    function changeSlide(index: number) {
        if (isAnimating || index === currentIndex) return;
        isAnimating = true;

        const currentSlide = slides[currentIndex];
        const nextSlide = slides[index];
        const nextImg = nextSlide.querySelector('img');
        const currentImg = currentSlide.querySelector('img');

        const bodyClass = nextSlide.getAttribute('data-mode');
        container.setAttribute('data-mode', bodyClass || 'mode-text');
        
        gsap.set(nextSlide, { zIndex: 20, opacity: 1, visibility: "visible", clipPath: "inset(0 0 0 100%)" });
        gsap.set(currentSlide, { zIndex: 10 });
        gsap.set([nextSlide.querySelector('h2'), nextSlide.querySelectorAll('p')], { y: 40, opacity: 0 });
        gsap.set(nextSlide.querySelector('.divider'), { scaleX: 0 });

        const isMobile = window.innerWidth <= 768;
        let startX = "20%", exitX = "-10%";
        if (!isMobile) {
            const isFlipped = nextSlide.classList.contains('layout-flipped');
            startX = isFlipped ? "-20%" : "20%";
            exitX = currentSlide.classList.contains('layout-flipped') ? "10%" : "-10%";
        }

        const tl = gsap.timeline({
            onComplete: () => {
                gsap.set(currentSlide, { opacity: 0, visibility: "hidden", zIndex: 1 });
                currentIndex = index;
                isAnimating = false;
                startAutoPlay();
                if (nextImg) startBreathing(nextImg);
            }
        });

        tl.to(nextSlide, { clipPath: "inset(0 0 0 0%)", duration: 1.4, ease: "expo.inOut", force3D: true })
          .fromTo(nextImg, { x: startX }, { x: "0%", duration: 1.6, ease: "expo.out", force3D: true }, 0);

        animateText(nextSlide);

        if(breathingTween) breathingTween.pause();
        tl.to(currentImg, { x: exitX, duration: 1.4, ease: "expo.inOut", force3D: true }, 0);

        navLinks.forEach(n => n.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    navLinks.forEach((link, i) => { (link as HTMLElement).onclick = () => { if(!isAnimating) changeSlide(i); }; });

    // Initialize
    startAutoPlay();
    const firstImg = slides[0].querySelector('img');
    if (firstImg) startBreathing(firstImg);
    animateText(slides[0]);

    return () => {
        if (progressTween) progressTween.kill();
        if (breathingTween) breathingTween.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="about-carousel-wrapper" data-mode="mode-text" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', backgroundColor: 'var(--bg-color)' }}>
      <style>{`
        .about-carousel-wrapper {
            --font-main: "Inter", sans-serif;
            --font-serif: "Playfair Display", serif;
            background-color: var(--bg-color);
        }

        .about-carousel-wrapper .viewport { position: relative; width: 100%; height: 100%; }
        .about-carousel-wrapper .slider-inner { position: relative; width: 100%; height: 100%; overflow: hidden; }

        .about-carousel-wrapper .slide {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            box-sizing: border-box;
            clip-path: inset(0 0 0 100%);
            z-index: 1; opacity: 0; visibility: hidden;
            background-color: transparent !important;
            will-change: clip-path, opacity;
            backface-visibility: hidden;
            transform: translateZ(0);
        }
        .about-carousel-wrapper .slide-content {
            max-width: 80rem;
            margin: 0 auto;
            padding: 0 2rem;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 2rem;
            transition: background-color 0.8s ease;
            backface-visibility: hidden;
            transform: translateZ(0);
            position: relative;
        }
        @media (min-width: 768px) {
            .about-carousel-wrapper .slide-content { padding: 0 4rem; gap: 4rem; }
        }
        @media (min-width: 1024px) {
            .about-carousel-wrapper .slide-content { padding: 0 6rem; gap: 6rem; }
        }
        .about-carousel-wrapper .slide.active { clip-path: inset(0 0 0 0%); z-index: 10; opacity: 1; visibility: visible; }

        .about-carousel-wrapper .slide.layout-normal .slide-content { flex-direction: row; }
        .about-carousel-wrapper .slide.layout-flipped .slide-content { flex-direction: row-reverse; }

        .about-carousel-wrapper .content-box { width: 42%; z-index: 5; flex-shrink: 0; } 
        .about-carousel-wrapper .layout-normal .content-box { margin-left: 0; }
        .about-carousel-wrapper .layout-flipped .content-box { margin-right: 0; margin-left: 0; }

        .about-carousel-wrapper .content-box h2 { 
            font-family: var(--font-main);
            font-size: clamp(3rem, 6vw, 5.5rem); 
            font-weight: 900; line-height: 0.9; 
            letter-spacing: -0.02em; text-transform: uppercase; 
            margin: 0 0 3vh 0; 
            transform: translateY(30px); opacity: 0; 
        }
        .about-carousel-wrapper .serif-italic {
            font-family: var(--font-serif);
            font-style: italic; font-weight: 400;
            text-transform: lowercase; 
            letter-spacing: 0px; font-size: 1.05em;
        }

        .about-carousel-wrapper .content-box .divider { 
            width: 50px; height: 3px; 
            margin-bottom: 2.5vh; 
            transform: scaleX(0); transform-origin: left; 
        }
        .about-carousel-wrapper .layout-flipped .divider { transform-origin: left; margin-left: 0; }
        .about-carousel-wrapper .layout-flipped h2, .about-carousel-wrapper .layout-flipped p { text-align: left; }

        .about-carousel-wrapper .content-box p { 
            font-family: var(--font-main);
            font-size: 0.95rem; line-height: 1.8; margin-bottom: 0; 
            max-width: 480px; 
            opacity: 0; transform: translateY(20px); 
            font-weight: 400; letter-spacing: 0.04em;
        }
        .about-carousel-wrapper .layout-flipped p { margin-left: 0; }

        .about-carousel-wrapper .img-wrap { 
            width: 44%; height: 65vh; overflow: hidden; position: relative; 
            background-color: var(--carousel-bg); 
            transform: translateY(4vh);
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .about-carousel-wrapper .layout-normal .img-wrap { margin-right: 0; }
        .about-carousel-wrapper .layout-flipped .img-wrap { margin-left: 0; margin-right: 0; }
        
        .about-carousel-wrapper .img-wrap img { 
            width: 100%; height: 100%; object-fit: cover; 
            transform: scale(1.2) translateZ(0); will-change: transform; 
            filter: brightness(0.82) saturate(0.85) contrast(1.05); 
        }
        /* Vignette + grain overlay on images — uses theme-aware variable */
        .about-carousel-wrapper .img-wrap::after {
            content: '';
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
                radial-gradient(ellipse at center, transparent 40%, var(--carousel-vignette) 100%),
                url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E");
            z-index: 2;
        }

        /* === 「暗房展廊」主题系统 ===
         * 轮播区无论极昼/暗黑均保持深色基调
         * 颜色来自 CSS 变量，随 .light-theme 类平滑过渡
         * ============================================ */

        /* 全局深色基础 — 始终使用 --carousel-bg，文字始终浅色 */
        .about-carousel-wrapper .slide-content {
            background-color: var(--carousel-bg);
            color: #F4F1ED;
        }

        /* 01 Intro — 玫瑰粉调 */
        .about-carousel-wrapper .theme-cashmere .slide-content { background-color: var(--carousel-bg); }
        .about-carousel-wrapper .theme-cashmere .accent { color: #D8A7B1; }
        .about-carousel-wrapper .theme-cashmere .divider { background: #D8A7B1; }
        .about-carousel-wrapper .theme-cashmere p { color: #F4F1ED; opacity: 0.55; }
        .about-carousel-wrapper .theme-cashmere .slide-content::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 70% 50%, rgba(216,167,177,0.07) 0%, transparent 65%);
            pointer-events: none;
        }

        /* 02 City — 蓝灰调 */
        .about-carousel-wrapper .theme-slate .slide-content { background-color: var(--carousel-bg-tinted); }
        .about-carousel-wrapper .theme-slate .accent { color: #7A8B99; }
        .about-carousel-wrapper .theme-slate .divider { background: #7A8B99; }
        .about-carousel-wrapper .theme-slate p { color: #F4F1ED; opacity: 0.55; }
        .about-carousel-wrapper .theme-slate .slide-content::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 30% 50%, rgba(122,139,153,0.09) 0%, transparent 65%);
            pointer-events: none;
        }

        /* 03 INFJ — 绿苔调 */
        .about-carousel-wrapper .theme-dark .slide-content { background-color: var(--carousel-bg); }
        .about-carousel-wrapper .theme-dark .accent { color: #A8B0A2; }
        .about-carousel-wrapper .theme-dark .divider { background: #A8B0A2; }
        .about-carousel-wrapper .theme-dark p { color: #F4F1ED; opacity: 0.55; }
        .about-carousel-wrapper .theme-dark .slide-content::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 70% 50%, rgba(168,176,162,0.07) 0%, transparent 65%);
            pointer-events: none;
        }

        /* 04 AI — 暖橙调 */
        .about-carousel-wrapper .theme-oat .slide-content { background-color: var(--carousel-bg-tinted); }
        .about-carousel-wrapper .theme-oat .accent { color: #C06E52; }
        .about-carousel-wrapper .theme-oat .divider { background: #C06E52; }
        .about-carousel-wrapper .theme-oat p { color: #F4F1ED; opacity: 0.55; }
        .about-carousel-wrapper .theme-oat .slide-content::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 30% 50%, rgba(192,110,82,0.09) 0%, transparent 65%);
            pointer-events: none;
        }

        /* 05 Goal — 主题粉调 */
        .about-carousel-wrapper .theme-final .slide-content { background-color: var(--carousel-bg); }
        .about-carousel-wrapper .theme-final .accent { color: #D8A7B1; }
        .about-carousel-wrapper .theme-final .divider { background: #D8A7B1; }
        .about-carousel-wrapper .theme-final p { color: #F4F1ED; opacity: 0.55; }
        .about-carousel-wrapper .theme-final .slide-content::before {
            content: ''; position: absolute; inset: 0;
            background: radial-gradient(ellipse at 70% 50%, rgba(216,167,177,0.07) 0%, transparent 65%);
            pointer-events: none;
        }

        /* --- 动态导航条 --- */
        .about-carousel-wrapper .navigation-wrapper { position: absolute; bottom: 35px; left: 0; width: 100%; z-index: 1100; }
        .about-carousel-wrapper .navigation { max-width: 80rem; margin: 0 auto; padding: 0 2rem; display: flex; gap: 40px; justify-content: flex-start; }
        @media (min-width: 768px) { .about-carousel-wrapper .navigation { padding: 0 4rem; } }
        @media (min-width: 1024px) { .about-carousel-wrapper .navigation { padding: 0 6rem; } }
        .about-carousel-wrapper .nav-link { 
            font-family: var(--font-main);
            font-size: 11px; font-weight: 900; letter-spacing: 2px; 
            cursor: pointer; padding-bottom: 12px; transition: color 0.4s; position: relative;
        }
        .about-carousel-wrapper .bar-bg { position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; transition: background 0.4s;}
        .about-carousel-wrapper .bar-fill { position: absolute; bottom: 0; left: 0; width: 0%; height: 2px; transition: background 0.4s;}

        /* 导航始终使用浅色 #F4F1ED — 因为轮播背景无论模式均为深色 */
        .about-carousel-wrapper .nav-link { color: #F4F1ED; opacity: 0.4; }
        .about-carousel-wrapper .nav-link.active { color: #F4F1ED; opacity: 1; }
        .about-carousel-wrapper .bar-bg { background: #F4F1ED; opacity: 0.2; }
        .about-carousel-wrapper .bar-fill { background: #D8A7B1; }

        .about-carousel-wrapper[data-mode="mode-text"] .nav-link { color: #F4F1ED; opacity: 0.4; }
        .about-carousel-wrapper[data-mode="mode-text"] .nav-link.active { color: #F4F1ED; opacity: 1; }
        .about-carousel-wrapper[data-mode="mode-text"] .bar-bg { background: #F4F1ED; opacity: 0.2; }
        .about-carousel-wrapper[data-mode="mode-text"] .bar-fill { background: #D8A7B1; }

        .about-carousel-wrapper[data-mode="mode-bg"] .nav-link { color: #F4F1ED; opacity: 0.4; }
        .about-carousel-wrapper[data-mode="mode-bg"] .nav-link.active { color: #F4F1ED; opacity: 1; }
        .about-carousel-wrapper[data-mode="mode-bg"] .bar-bg { background: #F4F1ED; opacity: 0.2; }
        .about-carousel-wrapper[data-mode="mode-bg"] .bar-fill { background: #D8A7B1; }

        /* --- 固定头部 --- */
        .about-carousel-wrapper .fixed-header-wrapper { position: absolute; top: 35px; left: 0; width: 100%; z-index: 1000; pointer-events: none; }
        .about-carousel-wrapper .fixed-header { max-width: 80rem; margin: 0 auto; padding: 0 2rem; }
        .about-carousel-wrapper .fixed-header span {
            font-family: var(--font-main);
            font-size: 11px; font-weight: 900; letter-spacing: 5px;
            text-transform: uppercase; transition: color 0.6s ease;
        }
        @media (min-width: 768px) { .about-carousel-wrapper .fixed-header { padding: 0 4rem; } }
        @media (min-width: 1024px) { .about-carousel-wrapper .fixed-header { padding: 0 6rem; } }
        
        /* 固定头部始终使用浅色 #F4F1ED — 轮播背景始终为深色 */
        .about-carousel-wrapper .fixed-header span { color: #F4F1ED; }
        .about-carousel-wrapper[data-mode="mode-text"] .fixed-header span { color: #F4F1ED; }
        .about-carousel-wrapper[data-mode="mode-bg"] .fixed-header span { color: #F4F1ED; }

        @media (max-width: 768px) {
            .about-carousel-wrapper .slide { padding: 12vh 0 8vh 0; }
            .about-carousel-wrapper .slide-content { flex-direction: column !important; justify-content: center; }
            .about-carousel-wrapper .content-box, .about-carousel-wrapper .img-wrap { width: 100% !important; margin: 0 !important; transform: none !important; }
            .about-carousel-wrapper .layout-flipped h2, .about-carousel-wrapper .layout-flipped p { text-align: left; }
            .about-carousel-wrapper .layout-flipped .divider { margin-left: 0; transform-origin: left; }
            .about-carousel-wrapper .content-box h2 { font-size: clamp(2.8rem, 12vw, 3.5rem); margin-bottom: 20px; }
            .about-carousel-wrapper .content-box p { font-size: 0.9rem; margin-bottom: 30px; max-width: 100%; }
            .about-carousel-wrapper .img-wrap { height: 45vh !important; }
            .about-carousel-wrapper .navigation { gap: 15px; width: 100%; flex-wrap: wrap; }
            .about-carousel-wrapper .navigation-wrapper { bottom: 20px; }
            .about-carousel-wrapper .fixed-header-wrapper { top: 20px; }
            .about-carousel-wrapper .nav-link { font-size: 10px; padding-bottom: 8px; }
        }
      `}</style>
      
      <div className="viewport">
          <div className="slider-inner">
              
              <div className="slide theme-cashmere layout-normal active" data-mode="mode-text">
                  <div className="slide-content">
                      <div className="content-box">
                          <h2>Not<br/>just a<br/><span className="accent serif-italic">resume.</span></h2>
                          <div className="divider"></div>
                          <p>Hello，我是张慧美，你也可以叫我小美，今年23岁。我不想被传统的履历定义，相比求职者，我更愿意称自己是一名探索者。</p>
                      </div>
                      <div className="img-wrap"><img src={IMAGE_ASSETS.about.topCarousel.slide1} alt="Intro" /></div>
                  </div>
              </div>
              
              <div className="slide theme-slate layout-flipped" data-mode="mode-text">
                  <div className="slide-content">
                      <div className="content-box">
                          <h2>Life in<br/><span className="accent serif-italic">Nanjing</span><br/>City</h2>
                          <div className="divider"></div>
                          <p>我在河南的一个小镇上长大，这片厚重的土地孕育了我坚韧，永不言败的内核。高考后来到南京上学，并爱上了这座兼具历史厚重与现代活力的城市。毕业后，我和姐姐选择扎根在此并开启我们的职业生涯。</p>
                      </div>
                      <div className="img-wrap"><img src={IMAGE_ASSETS.about.topCarousel.slide2} alt="City" /></div>
                  </div>
              </div>
              
              <div className="slide theme-dark layout-normal" data-mode="mode-text">
                  <div className="slide-content">
                      <div className="content-box">
                          <h2>INFJ<br/><span className="accent serif-italic">inner</span><br/>World</h2>
                          <div className="divider"></div>
                          <p>本人是太阳水瓶，月亮双子的INFJ。安静的外表下，装满了对世界的好奇。擅长向内自省，也乐于向外专研新事物。</p>
                      </div>
                      <div className="img-wrap"><img src={IMAGE_ASSETS.about.topCarousel.slide3} alt="INFJ" /></div>
                  </div>
              </div>
              
              <div className="slide theme-oat layout-flipped" data-mode="mode-bg">
                  <div className="slide-content">
                      <div className="content-box">
                          <h2>Explore<br/>AI & <span className="accent serif-italic">grow.</span></h2>
                          <div className="divider"></div>
                          <p>技术的奇点已经到来，与其焦虑现在，不如拥抱未来。最近正深度探索AI领域，我不想设限自己的边界，希望在未知的土壤中汲取养分，持续生长。</p>
                      </div>
                      <div className="img-wrap"><img src={IMAGE_ASSETS.about.topCarousel.slide4} alt="AI" /></div>
                  </div>
              </div>
              
              <div className="slide theme-final layout-normal" data-mode="mode-text">
                  <div className="slide-content">
                      <div className="content-box">
                          <h2>The New<br/><span className="accent serif-italic">chapter.</span></h2>
                          <div className="divider"></div>
                          <p>每当迎来一个新的改变和尝试时，我都会感到无比振奋。虽然前方道路尚未可知，但我相信“We are what we are. But we can be more.”期待找到志同道合的伙伴们，共创美好明天。</p>
                      </div>
                      <div className="img-wrap"><img src={IMAGE_ASSETS.about.topCarousel.slide5} alt="Goal" /></div>
                  </div>
              </div>

          </div>
      </div>

      <div className="navigation-wrapper">
          <div className="navigation">
              <div className="nav-link active">01 INTRO<div className="bar-bg"></div><div className="bar-fill"></div></div>
              <div className="nav-link">02 CITY<div className="bar-bg"></div><div className="bar-fill"></div></div>
              <div className="nav-link">03 INFJ<div className="bar-bg"></div><div className="bar-fill"></div></div>
              <div className="nav-link">04 AI<div className="bar-bg"></div><div className="bar-fill"></div></div>
              <div className="nav-link">05 GOAL<div className="bar-bg"></div><div className="bar-fill"></div></div>
          </div>
      </div>
    </div>
  );
};
