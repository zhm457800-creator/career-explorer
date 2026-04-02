import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { WeChatArticleGrid } from './WeChatArticleCard';
import { IMAGE_ASSETS } from '../lib/assets';

interface NarrativeDrawerProps {
  onClose: () => void;
}

const WECHAT_ARTICLE_URLS = [
  'https://mp.weixin.qq.com/s/iaxqb_l5jk1Vw-8vnlUQMw',
  'https://mp.weixin.qq.com/s/Lj_QJ0BeQvZYyn2DLkP2JQ',
  'https://mp.weixin.qq.com/s/6codMOYC3l5yMSSmFcXKqw',
  'https://mp.weixin.qq.com/s/pcVY8xocuAerwTZfhEn6SQ',
];

export const NarrativeDrawer = ({ onClose }: NarrativeDrawerProps) => {
  // 使用本地图片和API抓取的文章信息组合
  const [articles, setArticles] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const articlesData = [
      {
        success: true,
        data: {
          title: "【剑桥/牛津/美系】 8套原版书详细分析，一文带你搞懂教材区别！",
          coverImage: IMAGE_ASSETS.extension.wechatArticles.article1,
          summary: "一文带你搞懂教材区别！详细分析剑桥、牛津、美系原版书的差异和特点。",
          url: "https://mp.weixin.qq.com/s/iaxqb_l5jk1Vw-8vnlUQMw",
          fetchedAt: new Date().toISOString(),
        }
      },
      {
        success: true,
        data: {
          title: "Linguaskill（原领思）2026年1-6月全国社会场次报名正式开启！",
          coverImage: IMAGE_ASSETS.extension.wechatArticles.article2,
          summary: "Linguaskill剑桥英语水平测试（原领思）2026年上半年1至6月社会场次考试报名现已正式启动。",
          url: "https://mp.weixin.qq.com/s/Lj_QJ0BeQvZYyn2DLkP2JQ",
          fetchedAt: new Date().toISOString(),
        }
      },
      {
        success: true,
        data: {
          title: "【下一站，名师！】剑桥TKT国际英语教学能力证书师训营开启报名",
          coverImage: IMAGE_ASSETS.extension.wechatArticles.article3,
          summary: "剑桥大学TKT国际英语教学能力证书师训营火热报名！下一站 名师！",
          url: "https://mp.weixin.qq.com/s/6codMOYC3l5yMSSmFcXKqw",
          fetchedAt: new Date().toISOString(),
        }
      },
      {
        success: true,
        data: {
          title: "2026年剑桥TKT（教师英语教学能力认证）考试开启报名！",
          coverImage: IMAGE_ASSETS.extension.wechatArticles.article4,
          summary: "TKT（Teaching Knowledge Test），英语教学能力证书，适用于CEFR等级B1及以上级别英语教师。",
          url: "https://mp.weixin.qq.com/s/pcVY8xocuAerwTZfhEn6SQ",
          fetchedAt: new Date().toISOString(),
        }
      }
    ];
    setArticles(articlesData);
    setLoading(false);
  }, []);

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 30, stiffness: 300 }}
      className="fixed inset-0 z-[100] bg-background overflow-y-auto hide-scrollbar flex flex-col text-on-surface drawer-dark-bg"
    >
      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-[110] flex justify-between items-center px-12 py-10 bg-background/80 backdrop-blur-md">
        <button 
          onClick={onClose}
          className="group flex items-center gap-3 font-headline font-bold uppercase tracking-tight text-sm text-on-surface hover:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>CLOSE / BACK</span>
        </button>
        <div className="font-headline font-black text-2xl tracking-tighter text-on-surface">
          ARCHIVE_01
        </div>
        <div className="flex items-center gap-8 font-headline font-bold uppercase text-[10px] tracking-widest text-on-surface/40">
          <span>02 / NARRATIVE</span>
          <span>V.2026</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-5xl mx-auto px-12 pt-48 pb-32 flex flex-col gap-20">
        {/* Page Heading Section */}
        <section className="grid grid-cols-12 gap-8 mb-12">
          <div className="col-span-12 md:col-span-7">
            <span className="font-headline font-bold text-primary text-xs tracking-[0.3em] uppercase block mb-6">PUBLIC ACCOUNT ARTICLES</span>
            <h1 className="font-headline font-black text-on-surface text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9]">
              WeChat <br /><span className="text-primary">Articles</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-end">
            <p className="font-body text-sm leading-relaxed max-w-sm text-on-surface/70 border-l border-primary pl-6 py-2">
              Collection of articles from my WeChat official account, exploring the intersection of design, technology, and human experience.
            </p>
          </div>
        </section>

        {/* WeChat Articles Grid */}
        <section className="w-full space-y-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-primary font-headline font-bold text-lg">加载中...</div>
            </div>
          ) : (
            <WeChatArticleGrid articles={articles} />
          )}
        </section>

        {/* Footer */}
        <footer className="w-full pt-16 border-t border-on-surface/10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex flex-col gap-2">
            <span className="font-headline font-bold text-xs uppercase tracking-tight text-on-surface">ARCHIVE_01 / JOURNAL</span>
            <p className="font-body text-[9px] uppercase tracking-[0.2em] text-on-surface/40">©2026 ARCHITECTURAL MONOLITH. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="flex gap-8">
            <a className="font-body text-[9px] uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors" href="#">INSTAGRAM</a>
            <a className="font-body text-[9px] uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors" href="#">LINKEDIN</a>
            <a className="font-body text-[9px] uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors" href="#">TWITTER</a>
          </div>
        </footer>
      </main>
    </motion.div>
  );
};
