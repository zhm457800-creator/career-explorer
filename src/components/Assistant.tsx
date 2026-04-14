/// <reference types="vite/client" />
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Cpu, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const Assistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: '正在读取档案清单...\n你好，我是你的数字导航员。今天能陪伴你访问哪段旅程呢？' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 520, height: 760 });
  const [thinkingIndex, setThinkingIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [usage, setUsage] = useState({ count: 0, date: new Date().toLocaleDateString() });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);


  const DAILY_LIMIT = 20;

  // Initialize usage from localStorage
  useEffect(() => {
    const savedUsage = localStorage.getItem('assistant_usage');
    const today = new Date().toLocaleDateString();
    
    if (savedUsage) {
      const parsed = JSON.parse(savedUsage);
      if (parsed.date === today) {
        setUsage(parsed);
      } else {
        // New day, reset
        const initial = { count: 0, date: today };
        setUsage(initial);
        localStorage.setItem('assistant_usage', JSON.stringify(initial));
      }
    } else {
      const initial = { count: 0, date: today };
      setUsage(initial);
      localStorage.setItem('assistant_usage', JSON.stringify(initial));
    }
  }, []);

  const thinkingPhrases = [
    "Pondering...",
    "Deliberating...",
    "Reflecting...",
    "Contemplating...",
    "Weaving insights...",
    "Distilling...",
    "Architecting...",
    "Synthesizing..."
  ];

  // Typewriter thinking effect
  useEffect(() => {
    if (!isLoading) {
      setTypedText('');
      return;
    }

    // 每次切换词语时，重置打字并重新打出来
    const phrase = thinkingPhrases[thinkingIndex];
    setTypedText('');
    let charIndex = 0;
    // 打字：每 50ms 打一个字符（比之前快一点）
    const typingTimer = setInterval(() => {
      charIndex++;
      setTypedText(phrase.slice(0, charIndex));
      if (charIndex >= phrase.length) clearInterval(typingTimer);
    }, 50);

    // 打完后等 2.5 秒再切换到下一词
    const switchTimer = setTimeout(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingPhrases.length);
    }, phrase.length * 50 + 2500);

    return () => {
      clearInterval(typingTimer);
      clearTimeout(switchTimer);
    };
  }, [isLoading, thinkingIndex]);

  // Resizing Logic
  const handleResize = (direction: 'left' | 'top' | 'both') => (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (direction === 'left' || direction === 'both') {
        const deltaX = startX - moveEvent.clientX;
        setDimensions(prev => ({ ...prev, width: Math.max(350, startWidth + deltaX) }));
      }
      if (direction === 'top' || direction === 'both') {
        const deltaY = startY - moveEvent.clientY;
        setDimensions(prev => ({ ...prev, height: Math.max(450, startHeight + deltaY) }));
      }
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, thinkingIndex]);

  useEffect(() => {
    // 按钮保持展开 3 秒
    const expandTimer = setTimeout(() => setIsExpanded(false), 3000);

    // 自动唤醒逻辑
    const hasPrompted = sessionStorage.getItem('assistant_auto_prompted');
    if (!hasPrompted) {
      // 首次进入会话，延迟一小会儿后唤醒
      const wakeTimer = setTimeout(() => {
        setIsOpen(true);
        setShowGreeting(false);
        
        // 只有在真正触发唤醒后才记录到会话中
        // 这样可以避免开发环境下 React Strict Mode 导致的计时器清理问题
        sessionStorage.setItem('assistant_auto_prompted', 'true');
        
        // 5秒后如果没交互则自动收起
        autoCloseTimerRef.current = setTimeout(() => {
          setIsOpen(false);
        }, 5000);
      }, 1000);

      return () => {
        clearTimeout(expandTimer);
        clearTimeout(wakeTimer);
        if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
      };
    } else {

      // 非首次进入，照常显示气泡提示
      const greetingTimer = setTimeout(() => setShowGreeting(false), 8000);
      return () => {
        clearTimeout(expandTimer);
        clearTimeout(greetingTimer);
      };
    }
  }, []);

  const handleInteraction = () => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  };


  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading || usage.count >= DAILY_LIMIT) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsLoading(true);
    const apiStartTime = Date.now(); 

    // 记录并更新用量
    const newCount = usage.count + 1;
    const newUsage = { ...usage, count: newCount };
    setUsage(newUsage);
    localStorage.setItem('assistant_usage', JSON.stringify(newUsage));

    try {
      const newAssistantMessage: Message = {
        id: 'asst-' + Date.now(),
        role: 'assistant',
        content: ''
      };
      
      setMessages(prev => [...prev, newAssistantMessage]);

      const apiUrl = import.meta.env.VITE_DIFY_API_URL || 'http://localhost/v1';
      const apiKey = import.meta.env.VITE_DIFY_API_KEY;

      if (!apiKey) {
        throw new Error('API Key is missing');
      }

      const response = await fetch(`${apiUrl}/workflows/run`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: { query: newUserMessage.content },
          response_mode: 'streaming',
          user: 'website-visitor'
        })
      });

      if (!response.ok) {
        throw new Error(`API Request Failed: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = ''; 
      
      if (reader) {
        let rawContent = ''; // 蓄水池：存储后台返回的所有原文
        let displayedContent = ''; // 喷泉：存储当前显示给用户看的
        let hasReceivedData = false;
        
        // --- 核心：打字机追赶引擎 ---
        const typingEngine = setInterval(() => {
          const elapsedTime = Date.now() - apiStartTime;
          // 只有够 1.5 秒，且蓄水池里有货，且喷泉还没喷完时才工作
          if (elapsedTime >= 1500 && rawContent.length > displayedContent.length) {
            if (isLoading) setIsLoading(false);
            
            // 每次取 1-2 个字符（加速追赶，如果堆积太多的话）
            const increment = rawContent.length - displayedContent.length > 50 ? 3 : 1;
            displayedContent += rawContent.slice(displayedContent.length, displayedContent.length + increment);
            
            setMessages(prev => {
              const updated = [...prev];
              const lastMsg = updated[updated.length - 1];
              if (lastMsg && lastMsg.role === 'assistant') {
                lastMsg.content = displayedContent;
              }
              return updated;
            });
          }
        }, 30); // 30ms 恒定平滑打字

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith('data: ')) continue;
            
            const dataStr = trimmedLine.slice(6).trim();
            if (dataStr === '[DONE]') continue;
            
            try {
              const data = JSON.parse(dataStr);
              
              if (data.event === 'text' || data.event === 'message') {
                const text = data.text || (data.data && data.data.text) || '';
                if (text) {
                  hasReceivedData = true;
                  rawContent += text;
                }
              } 
              
              if (data.event === 'workflow_finished') {
                const outputs = data.outputs || (data.data && data.data.outputs) || {};
                let finalAns = '';
                
                const priorityKeys = ['response', 'text', 'result', 'answer', 'output'];
                for (const key of priorityKeys) {
                  if (typeof outputs[key] === 'string' && outputs[key].trim().length > 0) {
                    finalAns = outputs[key];
                    break;
                  }
                }
                
                if (!finalAns) {
                  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                  for (const key in outputs) {
                    if (key.startsWith('sys.')) continue;
                    const val = outputs[key];
                    if (typeof val === 'string' && val.length > finalAns.length) {
                      if (val !== 'true' && val !== 'false' && !uuidRegex.test(val)) {
                        finalAns = val;
                      }
                    }
                  }
                }
                
                if (finalAns && finalAns.length >= rawContent.length) {
                  hasReceivedData = true;
                  rawContent = finalAns;
                }
              }
            } catch (e) {
              console.error('JSON 解析失败:', e);
            }
          }
        }

        // 停止追赶前的最后检查
        const checkEnd = setInterval(() => {
          const isTypedOut = rawContent.length === displayedContent.length;
          const isTimeUp = Date.now() - apiStartTime > 1500;

          if (isTypedOut) {
            clearInterval(typingEngine);
            clearInterval(checkEnd);
            setIsLoading(false); // 无论如何，只要打完了就释放输入框
            
            // 如果 API 彻底结束了还没收到任何有效文本
            if (!hasReceivedData && isTimeUp) {
               setMessages(prev => {
                  const updated = [...prev];
                  const lastMsg = updated[updated.length - 1];
                  if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content === '') {
                    lastMsg.content = 'API 运行结束，未捕获到有效文本输出。';
                  }
                  return updated;
               });
            }
          }
        }, 300);
      }
    } catch (error) {
      console.error('Dify API Error:', error);
      setIsLoading(false);
      setMessages(prev => {
        const updated = [...prev];
        const lastMsg = updated[updated.length - 1];
        if (lastMsg && lastMsg.role === 'assistant' && lastMsg.content === '') {
          lastMsg.content = 'SYSTEM ERROR: CONNECTION FAILED.';
        }
        return updated;
      });
    }
  };

  return (
    <>
      {/* Greeting Bubble */}
      <AnimatePresence>
        {!isOpen && showGreeting && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-8 z-[140] backdrop-blur-2xl border border-[color:var(--nav-border)] px-5 py-3 text-[10px] uppercase tracking-widest font-headline font-bold text-on-surface shadow-2xl origin-bottom-right"
            style={{ backgroundColor: 'var(--nav-bg)' }}
          >
            AWAITING INSTRUCTIONS ...
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 border-b border-r border-[color:var(--nav-border)] transform rotate-45 backdrop-blur-md" style={{ backgroundColor: 'var(--nav-bg)' }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-[150] flex items-center justify-center rounded-full backdrop-blur-md border border-on-surface/20 transition-all duration-500 overflow-hidden ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'
        }`}
        style={{
          width: (isHovered || isExpanded) ? 'auto' : '56px',
          height: '56px',
          padding: (isHovered || isExpanded) ? '0 24px' : '0',
          backgroundColor: 'var(--nav-bg)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => {
          setIsOpen(true);
          setShowGreeting(false);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex items-center gap-3 relative">
          <div className="relative">
            <MessageSquare size={20} className="text-primary flex-shrink-0" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse border-2" style={{ borderColor: 'var(--bg-color)' }} />
          </div>
          <AnimatePresence>
            {(isHovered || isExpanded) && (
              <motion.span
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="font-headline font-bold text-[10px] tracking-[0.2em] uppercase text-on-surface whitespace-nowrap overflow-hidden"
              >
                AI CHAT
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 rounded-full border border-primary/20 bg-primary/5 animate-pulse-slow pointer-events-none"></div>
      </motion.button>
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-8 right-8 z-[200] flex flex-col backdrop-blur-2xl border shadow-2xl overflow-hidden"
            onMouseDown={handleInteraction}
            onKeyDown={handleInteraction}

            style={{ 
              backgroundColor: 'var(--nav-bg)', 
              borderColor: 'var(--nav-border)',
              width: `${dimensions.width}px`, 
              height: `${dimensions.height}px`,
              maxWidth: 'calc(100vw - 40px)',
              maxHeight: 'calc(100vh - 100px)'
            }}
          >
            {/* Custom Resizers */}
            <div 
              onMouseDown={handleResize('left')}
              className="absolute left-0 top-0 bottom-0 w-1.5 cursor-ew-resize hover:bg-primary/20 transition-colors z-[210]" 
            />
            <div 
              onMouseDown={handleResize('top')}
              className="absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize hover:bg-primary/20 transition-colors z-[210]" 
            />
            <div 
              onMouseDown={handleResize('both')}
              className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize z-[220] hover:bg-primary/30 rounded-br-full"
            />
            <div className="absolute bottom-0 right-0 w-4 h-4 p-0.5 opacity-30 flex items-end justify-end">
               <div className="w-1.5 h-1.5 border-r border-b border-primary" />
            </div>

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b relative z-10" style={{ borderColor: 'var(--nav-border)', backgroundColor: 'var(--bg-color)' }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                  <Cpu size={14} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-[12px] tracking-[0.1em] text-on-surface uppercase m-0 leading-none">SYS.ASSISTANT</h3>
                  <p className="font-body text-[8px] text-green-500/80 uppercase tracking-widest mt-1">ONLINE / ACTIVE</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-on-surface/40 hover:text-primary transition-colors p-2 -mr-2"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 relative z-10 custom-scrollbar">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 text-sm font-body tracking-wide leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-primary/10 border border-primary/20 text-on-surface text-right'
                        : 'bg-on-surface/5 border border-on-surface/10 text-on-surface/90'
                    }`}
                  >
                    {msg.role === 'assistant' && msg.id === '1' ? (
                      <span className="font-mono text-xs opacity-70 block mb-1">$&gt; _</span>
                    ) : null}
                    {msg.content === '' && msg.role === 'assistant' && isLoading ? (
                      <span className="font-mono text-[15px] tracking-widest text-primary">
                        {typedText}
                        <span className="animate-pulse">▋</span>
                      </span>
                    ) : (
                      <span>{msg.content}</span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t relative z-10" style={{ borderColor: 'var(--nav-border)', backgroundColor: 'var(--bg-color)' }}>
              <form onSubmit={handleSendMessage} className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={usage.count >= DAILY_LIMIT ? `今日配额已用完 (${usage.count}/${DAILY_LIMIT})` : `AWAITING INPUT... (${usage.count}/${DAILY_LIMIT})`}
                  disabled={isLoading || usage.count >= DAILY_LIMIT}
                  className="w-full bg-on-surface/5 border border-on-surface/20 px-4 py-3 pr-12 font-mono text-sm text-on-surface focus:outline-none focus:border-primary/50 transition-colors placeholder:text-on-surface/20 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || usage.count >= DAILY_LIMIT}
                  className="absolute right-2 p-2 text-on-surface/40 hover:text-primary transition-colors disabled:opacity-50 disabled:hover:text-on-surface/40"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
