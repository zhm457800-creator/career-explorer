import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { WeChatArticleCard, WeChatArticleGrid } from '../WeChatArticleCard';

const mockArticle = {
  title: '测试文章标题',
  coverImage: 'https://example.com/image.jpg',
  summary: '这是文章摘要内容...',
  url: 'https://mp.weixin.qq.com/s/test',
};

describe('WeChatArticleCard', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    const observerMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', observerMock);

    render(<WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />);
    
    expect(screen.getByText(/加载中/i)).toBeTruthy();
  });

  it('fetches article data when visible', async () => {
    const observerMock = vi.fn((callback) => {
      setTimeout(() => callback([{ isIntersecting: true }]), 100);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', observerMock);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        articles: [{ success: true, data: mockArticle }],
      }),
    });

    render(<WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />);

    await waitFor(() => {
      expect(screen.getByText(mockArticle.title)).toBeTruthy();
    });
  });

  it('handles fetch error gracefully', async () => {
    const observerMock = vi.fn((callback) => {
      setTimeout(() => callback([{ isIntersecting: true }]), 100);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', observerMock);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: false,
        error: 'Failed to fetch',
      }),
    });

    render(<WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />);

    await waitFor(() => {
      expect(screen.getByText(/加载失败/i)).toBeTruthy();
    });
  });

  it('opens article in new tab on click', async () => {
    const mockOpen = vi.fn();
    vi.stubGlobal('window', { ...window, open: mockOpen });

    const observerMock = vi.fn((callback) => {
      setTimeout(() => callback([{ isIntersecting: true }]), 100);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', observerMock);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        articles: [{ success: true, data: mockArticle }],
      }),
    });

    render(<WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />);

    await waitFor(() => {
      const card = screen.getByText(mockArticle.title);
      fireEvent.click(card);
    });

    expect(mockOpen).toHaveBeenCalledWith(
      mockArticle.url,
      '_blank',
      'noopener,noreferrer'
    );
  });

  it('displays fallback image on image error', async () => {
    const observerMock = vi.fn((callback) => {
      setTimeout(() => callback([{ isIntersecting: true }]), 100);
      return {
        observe: vi.fn(),
        disconnect: vi.fn(),
      };
    });
    vi.stubGlobal('IntersectionObserver', observerMock);

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        articles: [{ success: true, data: mockArticle }],
      }),
    });

    render(<WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />);

    await waitFor(() => {
      const img = screen.getByAltText(mockArticle.title);
      fireEvent.error(img);
    });

    expect(screen.getByText(/图片加载失败/i)).toBeTruthy();
  });

  it('supports dark mode', () => {
    const observerMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', observerMock);

    document.documentElement.classList.add('dark');
    
    const { container } = render(
      <WeChatArticleCard url="https://mp.weixin.qq.com/s/test" />
    );
    
    const card = container.querySelector('.article-card');
    expect(card).toBeTruthy();
    
    document.documentElement.classList.remove('dark');
  });
});

describe('WeChatArticleGrid', () => {
  it('renders multiple article cards', () => {
    const urls = [
      'https://mp.weixin.qq.com/s/test1',
      'https://mp.weixin.qq.com/s/test2',
      'https://mp.weixin.qq.com/s/test3',
      'https://mp.weixin.qq.com/s/test4',
    ];

    const observerMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', observerMock);

    render(<WeChatArticleGrid urls={urls} />);
    
    const cards = document.querySelectorAll('.article-card');
    expect(cards.length).toBe(4);
  });

  it('passes correct URL to each card', () => {
    const urls = [
      'https://mp.weixin.qq.com/s/test1',
      'https://mp.weixin.qq.com/s/test2',
    ];

    const observerMock = vi.fn(() => ({
      observe: vi.fn(),
      disconnect: vi.fn(),
    }));
    vi.stubGlobal('IntersectionObserver', observerMock);

    render(<WeChatArticleGrid urls={urls} />);
    
    expect(document.body.innerHTML).toContain('test1');
    expect(document.body.innerHTML).toContain('test2');
  });
});
