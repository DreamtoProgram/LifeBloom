'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
  links?: { label: string; href: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    sender: 'assistant',
    text: "Hello! 👋 Welcome to LifeBloom. I'm your AI coaching assistant.",
    timestamp: 'Just now',
  },
  {
    id: 'welcome-2',
    sender: 'assistant',
    text: 'How can I support your personal growth, leadership, or wellbeing journey today?',
    timestamp: 'Just now',
  },
];

const SUGGESTED_TOPICS = [
  { label: '🌿 Life Coaching', query: 'Tell me about Life Coaching' },
  { label: '💼 Career & Leadership', query: 'What career and leadership programs do you offer?' },
  { label: '🧠 NLP Sessions', query: 'How does NLP coaching work at LifeBloom?' },
  { label: '🏢 Corporate Workshops', query: 'Tell me about corporate workshops' },
  { label: '📅 Book Discovery Call', query: 'How can I book a discovery call with Dr. Shivani?' },
];

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Dynamic contextual assistant responses
    setTimeout(() => {
      let replyText = "Thank you for reaching out! Dr. Shivani Koccher Dhand provides personalized, evidence-informed coaching tailored to your specific goals.";
      let replyLinks: { label: string; href: string }[] | undefined = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('life coaching') || lower.includes('personal')) {
        replyText = "Our Life Coaching program helps you gain clarity, build unshakable self-confidence, and overcome limiting patterns to create a life of purpose and fulfilment.";
        replyLinks = [
          { label: 'Explore Life Coaching', href: '/services/life-coaching' },
          { label: 'Book Discovery Call', href: '/contact' },
        ];
      } else if (lower.includes('career') || lower.includes('leadership')) {
        replyText = "Our Career & Leadership Coaching is designed for working professionals, managers, and aspiring leaders seeking career transitions, executive presence, and strategic decision-making.";
        replyLinks = [
          { label: 'Career Coaching Details', href: '/services/career-professional-coaching' },
          { label: 'Get in Touch', href: '/contact' },
        ];
      } else if (lower.includes('nlp')) {
        replyText = "LifeBloom integrates Neuro-Linguistic Programming (NLP) to help you reprogram subconscious thought patterns, enhance communication, and accelerate behavioral transformation.";
        replyLinks = [
          { label: 'Learn About NLP', href: '/services/nlp-transformation' },
          { label: 'Connect With Dr. Shivani', href: '/contact' },
        ];
      } else if (lower.includes('workshop') || lower.includes('corporate') || lower.includes('team')) {
        replyText = "We deliver tailored corporate workshops and leadership programs on Emotional Intelligence, Mindfulness at Work, and High-Performance Team Dynamics for organizations across India.";
        replyLinks = [
          { label: 'View Workshops', href: '/workshops' },
          { label: 'Corporate Enquiry', href: '/contact' },
        ];
      } else if (lower.includes('book') || lower.includes('call') || lower.includes('appointment') || lower.includes('contact') || lower.includes('shivani')) {
        replyText = "You can schedule a complimentary discovery call with Dr. Shivani to discuss your goals and choose the coaching path that best fits your needs.";
        replyLinks = [
          { label: 'Book Your Discovery Call', href: '/contact' },
          { label: 'About Dr. Shivani', href: '/about' },
        ];
      } else {
        replyText = "Dr. Shivani Koccher Dhand is a certified Life Coach & NLP Practitioner with 15+ years of experience in human potential development. Would you like to explore our programs or start a conversation?";
        replyLinks = [
          { label: 'Explore All Services', href: '/services' },
          { label: 'Contact Us', href: '/contact' },
        ];
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        links: replyLinks,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Greeting Pill (Desktop/Tablet) */}
      {showGreeting && !isOpen && (
        <aside
          aria-label="LifeBloom Assistant message"
          className="fixed bottom-[96px] right-[24px] z-50 hidden sm:flex items-center gap-3 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl shadow-[#4A3450]/10 border border-[#EDE7EE] text-[#25222A] transition-all duration-300 max-w-xs animate-fade-in-up"
        >
          <div className="relative w-7 h-7 shrink-0 rounded-full overflow-hidden">
            <Image
              src="/chatbot-icon.png"
              alt="LifeBloom Assistant"
              fill
              sizes="28px"
              className="object-contain"
            />
          </div>
          <div className="text-left flex-1 min-w-0">
            <p className="font-sans text-xs font-semibold text-[#25222A] leading-tight">
              LifeBloom Assistant
            </p>
            <p className="font-sans text-[11px] text-[#6E6872] leading-tight mt-0.5 truncate">
              Need guidance? Ask us anything!
            </p>
          </div>
          <button
            onClick={() => setShowGreeting(false)}
            className="text-[#6E6872]/60 hover:text-[#25222A] text-xs p-1 rounded-full hover:bg-[#EEE7FA] transition-colors"
            aria-label="Dismiss greeting"
          >
            ✕
          </button>
        </aside>
      )}

      {/* Main Chatbot Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="LifeBloom AI Chat Assistant"
          className="fixed z-50 bg-white border border-[#EDE7EE] rounded-[24px] shadow-2xl flex flex-col overflow-hidden animate-fade-in-up
            right-[12px] left-[12px] sm:left-auto sm:right-[24px] bottom-[90px] sm:bottom-[108px]
            w-auto sm:w-[390px] md:w-[410px]
            h-[min(70vh,580px)] sm:h-[600px] max-h-[calc(100vh-130px)]"
          style={{
            boxShadow: '0 20px 60px rgba(74, 52, 80, 0.16)',
          }}
        >
          {/* Header */}
          <div className="shrink-0 bg-gradient-to-r from-[#FCF8FB] via-white to-[#EEE7FA]/30 px-5 py-4 border-b border-[#EDE7EE] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/chatbot-icon.png"
                  alt="LifeBloom Assistant Icon"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-base font-semibold text-[#25222A] leading-tight">
                  LifeBloom Assistant
                </h3>
                <p className="font-sans text-xs text-[#6E6872] leading-tight mt-0.5">
                  Here to help you grow &amp; transform
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#6E6872] hover:text-[#25222A] hover:bg-[#EEE7FA] transition-colors duration-200"
              aria-label="Close LifeBloom Assistant"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-white font-sans text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed rounded-[18px] ${
                    msg.sender === 'user'
                      ? 'bg-[#EEE7FA] text-[#25222A] rounded-br-sm border border-[#C9A5E8]/30 font-medium'
                      : 'bg-[#FCF8FB] text-[#25222A] rounded-tl-sm border border-[#EDE7EE]'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Links / CTAs if returned by bot */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-3 pt-2.5 border-t border-[#EDE7EE] flex flex-wrap gap-2">
                      {msg.links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white text-[#9B70C7] hover:bg-[#EEE7FA] text-xs font-semibold border border-[#C9A5E8]/40 shadow-xs transition-colors"
                        >
                          {link.label} →
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-[#6E6872]/60 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-start">
                <div className="bg-[#FCF8FB] border border-[#EDE7EE] px-4 py-3 rounded-[18px] rounded-tl-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C9A5E8] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#9B70C7] animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 rounded-full bg-[#E99AB8] animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Prompts (when only initial message or user is looking for topics) */}
          {messages.length <= 3 && (
            <div className="px-4 py-2 bg-[#FCF8FB] border-t border-[#EDE7EE] overflow-x-auto flex gap-2 no-scrollbar">
              {SUGGESTED_TOPICS.map((topic) => (
                <button
                  key={topic.label}
                  onClick={() => handleSendMessage(topic.query)}
                  className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-white hover:bg-[#EEE7FA] text-[#6E6872] hover:text-[#9B70C7] border border-[#EDE7EE] hover:border-[#C9A5E8] transition-all font-medium"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          <div className="shrink-0 p-3.5 sm:p-4 bg-white border-t border-[#EDE7EE]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 bg-[#FCF8FB] border border-[#EDE7EE] focus-within:border-[#C9A5E8] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#C9A5E8]/30 rounded-full px-4 py-1.5 transition-all"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask LifeBloom anything..."
                className="flex-1 bg-transparent py-2 text-sm text-[#25222A] placeholder:text-[#6E6872]/60 focus:outline-none font-sans"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="shrink-0 w-8 h-8 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] disabled:opacity-40 disabled:hover:bg-[#9B70C7] text-white flex items-center justify-center transition-all duration-200"
                aria-label="Send message"
              >
                <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Chatbot Launcher Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowGreeting(false);
        }}
        className="fixed z-50 cursor-pointer pointer-events-auto select-none transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-[#9B70C7] focus-visible:outline-offset-4
          bottom-[18px] right-[18px] sm:bottom-[24px] sm:right-[24px]
          w-[62px] h-[62px] sm:w-[72px] sm:h-[72px]
          bg-transparent border-0 p-0"
        style={{
          filter: 'drop-shadow(0 10px 24px rgba(155, 112, 199, 0.28)) drop-shadow(0 2px 6px rgba(74, 52, 80, 0.12))',
        }}
        aria-label={isOpen ? 'Close LifeBloom Assistant' : 'Open LifeBloom Assistant'}
        aria-expanded={isOpen}
      >
        <div className="relative w-full h-full">
          <Image
            src="/chatbot-icon.png"
            alt="LifeBloom AI Assistant"
            fill
            sizes="(max-width: 640px) 62px, 72px"
            className="object-contain pointer-events-none"
            priority
          />
        </div>
      </button>
    </>
  );
}
