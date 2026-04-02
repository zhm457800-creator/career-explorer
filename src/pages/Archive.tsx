import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { IMAGE_ASSETS } from '../lib/assets';

const CONFIG = {
  lerp: 0.08,
  sensitivity: 850,
  itemsPerUnit: 3,
  parallaxText: 55,
  parallaxImg: 22
};

const ARCHIVE_DATA = [
  {
    id: '01',
    tag: '01 / Motion',
    catName: 'Recently Playing',
    theme: 'bg-playing',
    items: [
      { title: 'DETROIT\nHUMAN', desc: '《底特律：化身为人》这不仅是一个关于仿生人科幻故事，更是一台命运交织机：数千条因果线索汇聚指尖，每次按键，都能感受到蝴蝶效应引发的颤栗。', img: IMAGE_ASSETS.about.bottomCarousel.playing1, ratio: 'ratio-16-9' },
      { title: 'OUTER\nWILDS', desc: '《星际拓荒》从最初对未知的恐惧，到最后对结局的坦然，那是每个宇航员在火堆旁学会的最深刻的一课。万物终将消逝，唯有好奇心永恒。', img: IMAGE_ASSETS.about.bottomCarousel.playing2, ratio: 'ratio-16-9' },
      { title: 'EGGY\nPARTY', desc: '《蛋仔派对》烦恼会被Q弹的身体撞飞，所有的胜负欲最终都会消解在一声声软萌的‘搞快点’里。圆滚滚的身体里，藏着对抗生活琐碎的巨大能量。', img: IMAGE_ASSETS.about.bottomCarousel.playing3, ratio: 'ratio-16-9' }
    ]
  },
  {
    id: '02',
    tag: '02 / Frame',
    catName: 'Recently Watching',
    theme: 'bg-watching',
    items: [
      { title: 'CRIMINAL\nMINDS', desc: '《犯罪心理》每一集开场与结尾的名人名言，像是某种神圣的祭文，试图在最极端的恶行中，为人类文明寻回一丝理性的光亮。', img: IMAGE_ASSETS.about.bottomCarousel.watching1, ratio: 'ratio-16-9' },
      { title: 'MING\nDYNASTY', desc: '《大明王朝1566》“长江之水灌溉两岸，黄河之水也灌溉两岸。” 关于利弊与善恶的辩证法，至今依然能在现实中找到回响。', img: IMAGE_ASSETS.about.bottomCarousel.watching2, ratio: 'ratio-16-9' },
      { title: 'STAR\nTREK', desc: '《星际迷航》人类对未来最温柔的政治寓言：在那里，贫穷、饥饿与偏见已成往事，我们终将跨越肤色与物种，共同驶向群星。', img: IMAGE_ASSETS.about.bottomCarousel.watching3, ratio: 'ratio-16-9' }
    ]
  },
  {
    id: '03',
    tag: '03 / Page',
    catName: 'Recently Reading',
    theme: 'bg-reading',
    items: [
      { title: 'BOY\'S\nLIFE', desc: '《奇风岁月》它捕捉到了人生中那个最微妙的时刻——当你还相信自行车有灵魂、森林里住着古老怪物，而成人世界的残酷真相正像潮汐一样缓缓逼近。', img: IMAGE_ASSETS.about.bottomCarousel.reading1, ratio: 'ratio-3-4' },
      { title: 'CRAWDADS\nSING', desc: '《蝲蛄吟唱的地方》当镇上的人忙着审判她的‘怪异’时，她正忙着与萤火虫交换秘密。每一寸泥沼、每一根羽毛、每一次潮汐，都是大自然教给她的生存哲学。', img: IMAGE_ASSETS.about.bottomCarousel.reading2, ratio: 'ratio-3-4' },
      { title: 'BROOKLYN\nTREE', desc: '《布鲁克林有棵树》弗兰西就像那棵长在混凝土缝隙里的‘天堂树’，只要有一丝阳光，她就能坚强成长。环境可以剥夺面包，但无法剥夺观察世界的清澈眼光。', img: IMAGE_ASSETS.about.bottomCarousel.reading3, ratio: 'ratio-3-4' }
    ]
  },
  {
    id: '04',
    tag: '04 / Wave',
    catName: 'Recently Listening',
    theme: 'bg-listening',
    items: [
      { title: 'CROSSING', desc: '《十字路口 crossing》与其说它是在讲‘离开’或‘到达’，不如说它是在致敬那段身处十字路口、尚未看清未来却依然选择迈步的勇气。', img: IMAGE_ASSETS.about.bottomCarousel.listening1, ratio: 'ratio-3-4' },
      { title: 'ROCKEFELLER', desc: '《岩中花述》它不仅探讨女性，更是在通过女性视角探讨世界。女性的生命力从不是温室里的点缀，而是在岩石缝隙中挤压、挣扎并最终绽放的奇迹。', img: IMAGE_ASSETS.about.bottomCarousel.listening2, ratio: 'ratio-3-4' },
      { title: 'HA-HA\nDIARY', desc: '《哈哈日记》这里没有高深的人生导师，只有对生活最生动的‘拆台’：如果不顺心，那就把它变成一个好笑的段子。', img: IMAGE_ASSETS.about.bottomCarousel.listening3, ratio: 'ratio-3-4' }
    ]
  }
];

export const Archive = () => {
  const navigate = useNavigate();
  const stageRef = useRef<HTMLDivElement>(null);
  const virtualScrollRef = useRef(0);
  const lerpPosRef = useRef(0);
  const requestRef = useRef<number>();

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const delta = Math.max(-100, Math.min(100, e.deltaY));
      virtualScrollRef.current += delta * 2.5;
      const maxScroll = (ARCHIVE_DATA.length * CONFIG.itemsPerUnit - 1) * CONFIG.sensitivity;
      virtualScrollRef.current = Math.max(0, Math.min(virtualScrollRef.current, maxScroll));
    };

    let ts = 0;
    const handleTouchStart = (e: TouchEvent) => {
      ts = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const te = e.touches[0].clientY;
      virtualScrollRef.current += (ts - te) * 3.5;
      ts = te;
      const maxScroll = (ARCHIVE_DATA.length * CONFIG.itemsPerUnit - 1) * CONFIG.sensitivity;
      virtualScrollRef.current = Math.max(0, Math.min(virtualScrollRef.current, maxScroll));
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const animate = () => {
      const winW = window.innerWidth;
      lerpPosRef.current += (virtualScrollRef.current - lerpPosRef.current) * CONFIG.lerp;
      const globalIndex = lerpPosRef.current / CONFIG.sensitivity;
      const unitIndex = Math.floor(globalIndex / CONFIG.itemsPerUnit);
      const indexInUnit = globalIndex % CONFIG.itemsPerUnit;

      let stageTranslate;
      if (indexInUnit < CONFIG.itemsPerUnit - 1) {
        stageTranslate = unitIndex * winW;
      } else {
        const t = indexInUnit - (CONFIG.itemsPerUnit - 1);
        const easeT = t * t * (3 - 2 * t);
        stageTranslate = (unitIndex + easeT) * winW;
      }

      if (stageRef.current) {
        stageRef.current.style.transform = `translateX(-${stageTranslate}px) translateZ(0)`;
        
        const workUnits = stageRef.current.querySelectorAll('.work-unit');
        workUnits.forEach((unit: any, i) => {
          const wrapper = unit.querySelector('.scaler-wrapper');
          const stack = unit.querySelector('.content-group-stack');
          const cardCenterX = (i * winW) + (winW / 2) - stageTranslate;
          const dist = Math.min(Math.abs(cardCenterX - winW / 2) / winW, 1);

          if (dist < 1.1) {
            wrapper.style.transform = `scale(${1 - dist * 0.12})`;
            wrapper.style.borderRadius = `${dist * 120 + 40}px`;

            const progressInUnit = globalIndex - (i * CONFIG.itemsPerUnit);
            stack.style.transform = `translateY(${progressInUnit * -100}%) translateZ(0)`;

            const items = stack.querySelectorAll('.content-item');
            items.forEach((item: any, idx: number) => {
              const itemDist = progressInUnit - idx;
              if (Math.abs(itemDist) < 1.5) {
                item.querySelector('.text-part').style.setProperty('--ty-stagger', (itemDist * CONFIG.parallaxText).toString());
                const img = item.querySelector('img');
                if (img) img.style.transform = `translateY(${itemDist * -CONFIG.parallaxImg}%) scale(1.1)`;
              }
            });
          }
        });
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div className="archive-page-container">
      <style>{`
        .archive-page-container {
          --bg-1: #7A8B99;
          --bg-2: #B36A5E;
          --bg-3: #A8B0A2;
          --bg-4: #E2D1B3;
          --text-dark: #1D3557;
          --text-light: #F1FAEE;
          --font-main: "Inter", "Helvetica Neue", "PingFang SC", sans-serif;
          margin: 0; padding: 0;
          width: 100%; height: 100vh;
          background: #000;
          font-family: var(--font-main);
          overflow: hidden;
          -webkit-font-smoothing: antialiased;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 10000;
          cursor: none;
        }

        .archive-page-container .back-btn {
          position: fixed; top: 20px; right: 20px;
          z-index: 2100;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #fff;
          padding: 8px 16px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          pointer-events: auto;
        }
        .archive-page-container .back-btn:hover {
          background: #fff;
          color: #000;
          transform: scale(1.05);
        }

        .archive-page-container .scroll-stage {
          display: flex; height: 100vh; width: fit-content;
          will-change: transform; align-items: center;
        }

        .archive-page-container .work-unit {
          position: relative; width: 100vw; height: 100vh;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; padding: 0 4vw; box-sizing: border-box;
        }

        .archive-page-container .scaler-wrapper {
          position: relative; width: 95%; height: 80%;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden; border-radius: 40px; 
          will-change: transform, border-radius;
          box-shadow: 0 100px 150px -50px rgba(0,0,0,0.7);
          transform: translateY(30vh);
        }

        .archive-page-container .bg-playing { background-color: var(--bg-1); color: var(--text-light); }
        .archive-page-container .bg-watching { background-color: var(--bg-2); color: var(--text-light); }
        .archive-page-container .bg-reading { background-color: var(--bg-3); color: var(--text-light); }
        .archive-page-container .bg-listening { background-color: var(--bg-4); color: var(--text-dark); }

        .archive-page-container .unit-label {
          position: absolute; top: 20px; left: 3%; z-index: 10;
        }
        .archive-page-container .unit-label .tag { font-size: 8px; font-weight: 800; opacity: 0.6; letter-spacing: 3px; }
        .archive-page-container .unit-label .cat-name { font-size: 18px; font-weight: 900; text-transform: uppercase; margin-top: 6px; }

        .archive-page-container .content-group-stack {
          display: flex; flex-direction: column; width: 100%; height: 100%;
          will-change: transform;
        }

        .archive-page-container .content-item {
          width: 100%; height: 100%; display: flex; align-items: center;
          justify-content: space-between; flex-shrink: 0; padding: 0 10vw; box-sizing: border-box;
        }

        .archive-page-container .text-part { width: 45%; z-index: 5; overflow: hidden; }
        .archive-page-container .text-part h2 { 
          font-size: clamp(2.2rem, 5.8vw, 5.5rem); line-height: 0.85; font-weight: 900; 
          margin: 0; letter-spacing: -0.05em; text-transform: uppercase;
          transform: translateY(calc(var(--ty-stagger, 0) * 1.3px));
          animation: revealUp 1.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes revealUp {
          from { transform: translateY(100%) skewY(5deg); opacity: 0; }
          to { transform: translateY(0) skewY(0); opacity: 1; }
        }

        .archive-page-container .text-part p { 
          margin-top: 40px; font-size: 1.1rem; opacity: 0.85; max-width: 460px; line-height: 1.9;
          transform: translateY(calc(var(--ty-stagger, 0) * 0.5px));
        }

        .archive-page-container .image-part { 
          position: relative; overflow: hidden; border-radius: 6px; background: #111;
        }
        .archive-page-container .image-part::after {
          content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(0,0,0,0.05); pointer-events: none;
        }

        .archive-page-container .ratio-16-9 { width: 48%; aspect-ratio: 16 / 9; }
        .archive-page-container .ratio-3-4 { width: 30%; aspect-ratio: 3 / 4; }

        .archive-page-container .image-part img { 
          width: 100%; height: 100%; object-fit: cover; scale: 1.1; 
          filter: contrast(1.05) brightness(0.95); will-change: transform; 
        }

        .archive-page-container .bg-num { 
          position: absolute; bottom: 5%; right: 5%; font-size: 24vw; font-weight: 900; 
          color: rgba(255,255,255,0.06); z-index: -1; pointer-events: none;
        }
        .archive-page-container .bg-reading .bg-num, .archive-page-container .bg-listening .bg-num { color: rgba(0,0,0,0.05); }

        @media (max-width: 768px) {
          .archive-page-container .content-item { flex-direction: column; justify-content: center; padding: 0 6vw; gap: 40px; }
          .archive-page-container .text-part { width: 100%; text-align: center; }
          .archive-page-container .text-part p { margin: 20px auto 0; }
          .archive-page-container .ratio-16-9, .archive-page-container .ratio-3-4 { width: 80%; }
          .archive-page-container .unit-label .cat-name { font-size: 18px; }
          .archive-page-container .back-btn { top: 20px; right: 20px; padding: 8px 15px; font-size: 10px; }
          .archive-page-container .fixed-header { top: 25px; left: 20px; font-size: 8px; }
        }
      `}</style>

      <button className="back-btn" onClick={() => navigate('/about')}>
        <ArrowLeft size={16} />
        Back
      </button>

      <div className="scroll-stage" ref={stageRef}>
        {ARCHIVE_DATA.map((unit) => (
          <div key={unit.id} className="work-unit">
            <div className={`scaler-wrapper ${unit.theme}`}>
              <div className="unit-label">
                <span className="tag">{unit.tag}</span>
                <span className="cat-name">{unit.catName}</span>
              </div>
              <div className="bg-num">{unit.id}</div>
              <div className="content-group-stack">
                {unit.items.map((item, idx) => (
                  <div key={idx} className="content-item">
                    <div className="text-part">
                      <h2>{item.title.split('\n').map((line, i) => <React.Fragment key={i}>{line}<br/></React.Fragment>)}</h2>
                      <p>{item.desc}</p>
                    </div>
                    <div className={`image-part ${item.ratio}`}>
                      <img src={item.img} alt={item.title} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
