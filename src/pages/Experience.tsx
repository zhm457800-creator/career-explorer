import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGE_ASSETS } from '../lib/assets';
import { CyberpunkImage } from '../components/CyberpunkImage';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    id: '01',
    category: 'THE FOUNDATION',
    title: '工程造价',
    year: '2019',
    period: '2019.09 - 2023.06',
    image: IMAGE_ASSETS.experience.stage1,
    description: '本科就读于南京工程学院，GPA：3.99/5.00； 获奖情况：获二等奖学金（2020）、三等奖学金（2019、2021）、国家励志奖学金（2022）；担任“青年志愿者协会”及“心理部“”培训干事，获“优秀学生干部”（2020、2021）政务志愿活动“优秀志愿者”（2022）；担任负责人在南京工程学院创新创业训练计划项目中获“优秀奖”（2021），参与江苏省大学生创新创业训练计划项目在国家级期刊发表两篇论文（2022）；发展成为中共党员（2023）。',
    icons: ['school', 'workspace_premium']
  },
  {
    id: '02',
    category: 'THE PROFESSIONALISM',
    title: '工料测量师（QS）',
    year: '2023',
    period: '2023.07 - 2024.12',
    image: IMAGE_ASSETS.experience.stage2,
    description: '利比建设咨询(上海)有限公司南京分公司就职，核心职责：负责全生命周期造价管理，涵盖标前标后全流程工作。标前：资格预审、图纸审核及算量、编制清单、招标文件与标底编制、开标评标、回标分析、议标；标后：合同管理、中期付款、变更审核、竣工结算、施工重计量等。协同各方配合业主进行造价预算，成本控制、数据分析汇报及资料整合归档。项目经历：主导并参与过土方、景观、幕墙、门窗、地坪、人防标识、装饰装修等专业工程（百万-千万元级），两年半内参与招标及审核的项目数量累计40+；运用广联达软件完成两次总造价5000万元以上的大型总包重计量工作（南京中华门G98别墅项目IL地块/FG地块重计量）。在施工重计量中，面对GTJ模型提量所产生的大量清单数据，运用excel函数（如IF ELSE、SUBTOTAL、VLOOKUP等）内嵌搭建清单筛选汇总模型，与原清单整合优化数据处理，显著提升团办公效率。技能总结：OFFICE办公软件、中望CAD、广联达  GTJ、SketchUp、易择网、招商ERP系统等。',
    icons: ['table_chart', 'analytics']
  },
  {
    id: '03',
    category: 'THE EVOLUTION',
    title: '公众号编辑（兼职）',
    year: '2025',
    period: '2025.01 - 2025.12',
    image: IMAGE_ASSETS.experience.stage3,
    description: '在理昂国际英语测评中心兼职，主要负责公众号文章编辑与排版，熟练运用“秀米”“135编辑器”、结合网站图片信息收集并辅助AI工具（Kimi、Chatgpt、Lovart等），优化图文搭配，累计交付文章作品20+，单篇文案编辑和构思排版耗时3h内，兼顾效率与美观，配合团队保障推送节奏。也担任剑桥KET/PET监考人员，主要负责考试前期考场布置、物料清点与座位安排，配合老师确保考场环境符合考试规范；考试期间引导学生有序入场就坐，耐心解答学生及家长的相关疑问；按规范完成试卷收发、核对、封存等工作，维护考场秩序，保障考试顺利有序开展。',
    icons: ['edit_note', 'auto_awesome']
  },
  {
    id: '04',
    category: 'THE FUTURE FRONTIER',
    title: 'AI学习拓展',
    year: 'PRESENT',
    period: '2026.01 - PRESENT',
    image: IMAGE_ASSETS.experience.stage4,
    description: '这段时间我一直在钻研AI领域，先后上手了 Gemini、ChatGPT、Kimi、Claude Code、Cursor 等多种工具，并尝试将它们应用到实际开发中。通过这段时间的积累，我利用 Stitch、Google AI Studio、VScode和 Trae等环境，从0到1成功搭建起了个人网站，并独立开发部署了一款英语学习 App。目前这个 App 已经实现了用户注册登录、智能语音、音频解析以及多模态对话功能，特别是其中的音色克隆与实时语音交流，让交互体验有了质的提升。在完成单词系统学习功能的闭环后，我现在正集中精力研究 Agent 智能体的构建，希望能够实现更复杂、更自动化的任务处理。',
    icons: ['psychology', 'rocket_launch']
  }
];

export const Experience = () => {
  const timelineGrowthRef = useRef<HTMLDivElement>(null);
  const timelineTipRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Timeline Growth Animation
    if (timelineGrowthRef.current && timelineTipRef.current && mainRef.current) {
      gsap.to(timelineGrowthRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        }
      });

      gsap.to(timelineTipRef.current, {
        top: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: mainRef.current,
          start: 'top center',
          end: 'bottom bottom',
          scrub: 1,
        }
      });
    }

    // Card Scroll In Effects
    const cards = document.querySelectorAll('.timeline-card');
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="relative">
      <header className="pt-48 pb-24 px-8 md:px-24 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 relative z-10">
        <div className="w-full md:w-1/2">
          <span className="font-label text-primary uppercase tracking-[0.3em] text-xs mb-4 block">02 / CHRONOLOGY</span>
          <h1 className="font-headline font-bold text-6xl md:text-8xl lg:text-9xl uppercase tracking-tighter leading-none">
            PROFESSIONAL<br/><span className="text-primary">STAGES</span>
          </h1>
        </div>
        <div className="w-full md:w-1/2 text-right">
          <p className="font-body opacity-70 text-sm max-w-sm ml-auto leading-relaxed">
            From engineering precision to the deep space of logic, navigating towards the endless frontier of AI.
          </p>
        </div>
      </header>

      <main className="relative min-h-screen px-4 md:px-0" ref={mainRef}>
        {/* Central Timeline Line */}
        <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-on-surface/10 md:block hidden">
          <div 
            ref={timelineGrowthRef}
            className="absolute top-0 left-0 w-full bg-on-surface/30 origin-top" 
            style={{ height: '0%' }}
          />
          <div 
            ref={timelineTipRef}
            className="absolute left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-primary glow-dot z-20" 
            style={{ top: '0%' }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative flex flex-col gap-32 md:gap-64 pb-32">
          {stages.map((stage, index) => (
            <section 
              key={stage.id}
              className={`relative flex flex-col md:flex-row justify-center items-center w-full group ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
            >
              {/* Year Watermark */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 font-headline font-black text-[6vw] md:text-[8vw] text-primary opacity-[0.04] pointer-events-none select-none z-0 tracking-tighter leading-none flex items-center justify-center w-1/2 hidden md:flex
                  ${index % 2 === 0 ? 'left-0' : 'right-0'}`}
              >
                {stage.year}
              </div>

              <div className="hidden md:block w-1/2"></div>
              <div className="md:absolute md:left-1/2 md:-translate-x-1/2 z-10 w-4 h-4 bg-transparent border-2 border-primary glow-dot"></div>
              <div className={`w-full md:w-[45%] ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12'}`}>
                <div className="timeline-card p-8 hover:border-primary transition-all duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <span className="font-label opacity-60 text-xs tracking-[0.2em] uppercase">{stage.id} / {stage.category}</span>
                    <span className="font-label text-primary text-sm tracking-wider font-medium">{stage.period}</span>
                  </div>
                  <h2 className="font-headline font-bold text-3xl uppercase tracking-tight mb-6">{stage.title}</h2>
                  <div className="aspect-video mb-6 overflow-hidden">
                    <CyberpunkImage 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60" 
                      src={stage.image} 
                      alt={stage.title}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <p className="opacity-70 text-sm leading-relaxed mb-8">
                    {stage.description}
                  </p>
                  <div className="flex gap-4 mt-auto">
                    {stage.icons.map(icon => (
                      <span key={icon} className="material-symbols-outlined text-primary glimmer-effect">{icon}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};
