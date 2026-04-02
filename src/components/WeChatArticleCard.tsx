import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, BookOpen, Sparkles } from 'lucide-react';

interface WeChatArticle {
  title: string;
  coverImage: string;
  summary: string;
  url: string;
  fetchedAt?: string;
}

interface WeChatArticleCardProps {
  url: string;
  className?: string;
}

const WeChatArticleCard: React.FC<WeChatArticleCardProps> = ({ url, className = '' }) => {
  const [article, setArticle] = useState<WeChatArticle | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const fetchArticle = async () => {
      try {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
        const response = await fetch(`${API_BASE}/api/fetch-articles`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ urls: [url] }),
        });

        const data = await response.json();
        
        if (data.success && data.articles && data.articles[0]?.success) {
          setArticle(data.articles[0].data);
        } else {
          setError(data.articles?.[0]?.error || 'Failed to fetch article');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error');
        console.error('Failed to fetch WeChat article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [url, isVisible]);

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Image load failed for article: ${url}`);
  };

  const handleClick = () => {
    window.open(article?.url || url, '_blank', 'noopener,noreferrer');
  };

  if (loading || !isVisible) {
    return (
      <div
        ref={cardRef}
        className={`horizontal-card group bg-background border border-outline-variant/20 overflow-hidden transition-all duration-500 ${className}`}
      >
        <div className="flex h-full">
          <div className="w-[280px] h-full bg-gradient-to-br from-surface to-background animate-pulse" />
          <div className="flex-1 p-8 flex items-center">
            <div className="space-y-4 w-full">
              <div className="h-8 bg-surface animate-pulse rounded w-3/4" />
              <div className="space-y-2">
                <div className="h-4 bg-surface animate-pulse rounded" />
                <div className="h-4 bg-surface animate-pulse rounded w-5/6" />
              </div>
              <div className="flex items-center gap-4 pt-4">
                <div className="h-6 w-24 bg-surface animate-pulse rounded-full" />
                <div className="h-6 w-24 bg-surface animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div
        ref={cardRef}
        className={`horizontal-card group bg-background border border-primary/20 overflow-hidden transition-all duration-500 ${className}`}
      >
        <div className="flex h-full">
          <div className="w-[280px] h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            <Sparkles className="w-12 h-12 text-primary/30" />
          </div>
          <div className="flex-1 p-8 flex items-center">
            <div className="space-y-4 w-full">
              <h3 className="font-headline text-2xl font-bold text-on-surface/60">加载失败</h3>
              <p className="text-sm text-on-surface/40">无法获取文章信息</p>
              <button
                onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
                className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">查看原文</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article
      ref={cardRef}
      onClick={handleClick}
      className={`horizontal-card group bg-background border border-outline-variant/20 overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(216,167,177,0.15)] hover:-translate-y-1 ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="flex h-full relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="w-[280px] h-full relative overflow-hidden flex-shrink-0">
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface to-background flex items-center justify-center">
              <div className="text-center space-y-2">
                <Sparkles className="w-12 h-12 text-primary/40 mx-auto" />
                <span className="text-xs text-on-surface/30 block">图片加载失败</span>
              </div>
            </div>
          ) : (
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface">
              WECHAT
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-[10px] text-on-surface/60">
              <BookOpen className="w-3 h-3" />
              <span className="uppercase tracking-wider">公众号文章</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary/50 group-hover:bg-primary group-hover:w-12 transition-all duration-500" />
              <span className="text-xs text-primary/70 font-medium uppercase tracking-wider">
                精选文章
              </span>
            </div>
            
            <h3
              className="font-headline font-bold text-2xl md:text-3xl uppercase tracking-tight text-on-surface line-clamp-2 group-hover:text-primary transition-colors duration-300"
              title={article.title}
            >
              {article.title}
            </h3>
            
            <div className="w-16 h-[1px] bg-gradient-to-r from-outline-variant/30 to-transparent" />
            
            <p
              className="font-body text-sm text-on-surface/60 leading-relaxed line-clamp-3"
              title={article.summary}
            >
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 mt-auto relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-on-surface/40 uppercase tracking-wider font-medium">
                阅读原文
              </span>
              <div className="flex items-center gap-2">
                <span className="text-primary opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-on-surface/40 group-hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span className="text-xs font-medium">打开链接</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-0 group-hover:h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent transition-all duration-700" />
      </div>
    </article>
  );
};

interface WeChatArticleGridProps {
  urls?: string[];
  articles?: any[];
  className?: string;
}

export const WeChatArticleGrid: React.FC<WeChatArticleGridProps> = ({ urls, articles, className = '' }) => {
  // 如果有预加载的文章数据，使用预加载的数据
  if (articles) {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {articles.map((articleResult, index) => (
          <PreloadedArticleCard key={`article-${index}`} articleResult={articleResult} />
        ))}
      </div>
    );
  }

  // 否则使用URL数组（向后兼容）
  if (urls) {
    return (
      <div className={`flex flex-col gap-6 ${className}`}>
        {urls.map((url, index) => (
          <WeChatArticleCard key={`${url}-${index}`} url={url} />
        ))}
      </div>
    );
  }

  return null;
};

interface PreloadedArticleCardProps {
  articleResult: any;
  className?: string;
}

const PreloadedArticleCard: React.FC<PreloadedArticleCardProps> = ({ articleResult, className = '' }) => {
  const [imageError, setImageError] = useState<boolean>(false);

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Image load failed for article: ${articleResult.data?.url}`);
  };

  const handleClick = () => {
    window.open(articleResult.data?.url, '_blank', 'noopener,noreferrer');
  };

  if (!articleResult.success || !articleResult.data) {
    return (
      <div className={`horizontal-card group bg-background border border-primary/20 overflow-hidden transition-all duration-500 ${className}`}>
        <div className="flex h-full">
          <div className="w-[280px] h-full bg-gradient-to-br from-primary/10 to-surface flex items-center justify-center relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-transparent" />
            <Sparkles className="w-12 h-12 text-primary/30" />
          </div>
          <div className="flex-1 p-8 flex items-center">
            <div className="space-y-4 w-full">
              <h3 className="font-headline text-2xl font-bold text-on-surface/60">加载失败</h3>
              <p className="text-sm text-on-surface/40">无法获取文章信息</p>
              <button
                onClick={() => window.open(articleResult.url || 'https://mp.weixin.qq.com', '_blank', 'noopener,noreferrer')}
                className="mt-4 flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="text-sm font-medium">查看原文</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const article = articleResult.data;

  return (
    <article
      onClick={handleClick}
      className={`horizontal-card group bg-background border border-outline-variant/20 overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/50 hover:shadow-[0_8px_30px_rgba(216,167,177,0.15)] hover:-translate-y-1 ${className}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`Read article: ${article.title}`}
    >
      <div className="flex h-full relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="w-[280px] h-full relative overflow-hidden flex-shrink-0">
          {imageError ? (
            <div className="w-full h-full bg-gradient-to-br from-primary/20 via-surface to-background flex items-center justify-center">
              <div className="text-center space-y-2">
                <Sparkles className="w-12 h-12 text-primary/40 mx-auto" />
                <span className="text-xs text-on-surface/30 block">图片加载失败</span>
              </div>
            </div>
          ) : (
            <img
              src={article.coverImage}
              alt={article.title}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
              onError={handleImageError}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] font-headline font-bold uppercase tracking-widest text-on-surface">
              WECHAT
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-2 text-[10px] text-on-surface/60">
              <BookOpen className="w-3 h-3" />
              <span className="uppercase tracking-wider">公众号文章</span>
            </div>
          </div>
        </div>

        <div className="flex-1 p-8 flex flex-col justify-between relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-[2px] bg-primary/50 group-hover:bg-primary group-hover:w-12 transition-all duration-500" />
              <span className="text-xs text-primary/70 font-medium uppercase tracking-wider">
                精选文章
              </span>
            </div>

            <h3
              className="font-headline font-bold text-2xl md:text-3xl uppercase tracking-tight text-on-surface line-clamp-2 group-hover:text-primary transition-colors duration-300"
              title={article.title}
            >
              {article.title}
            </h3>

            <div className="w-16 h-[1px] bg-gradient-to-r from-outline-variant/30 to-transparent" />

            <p
              className="font-body text-sm text-on-surface/60 leading-relaxed line-clamp-3"
              title={article.summary}
            >
              {article.summary}
            </p>
          </div>

          <div className="flex items-center justify-between pt-6 mt-auto relative z-10">
            <div className="flex items-center gap-4">
              <span className="text-[11px] text-on-surface/40 uppercase tracking-wider font-medium">
                阅读原文
              </span>
              <div className="flex items-center gap-2">
                <span className="text-primary opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                  →
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-on-surface/40 group-hover:text-primary transition-colors">
              <ExternalLink className="w-4 h-4" />
              <span className="text-xs font-medium">打开链接</span>
            </div>
          </div>
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-0 group-hover:h-24 bg-gradient-to-b from-transparent via-primary/30 to-transparent transition-all duration-700" />
      </div>
    </article>
  );
};

export default WeChatArticleCard;
