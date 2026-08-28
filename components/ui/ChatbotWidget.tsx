'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export function ChatbotWidget() {
  const [showTooltip, setShowTooltip] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      aria-label="Chatbot assistance"
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-auto select-none"
    >
      {/* Friendly greeting tooltip bubble */}
      {showTooltip && !isOpen && (
        <div
          role="status"
          aria-live="polite"
          className="hidden sm:flex items-center gap-2.5 bg-white/95 backdrop-blur-md py-2.5 px-4 rounded-2xl shadow-xl shadow-[#9B70C7]/15 border border-[#EDE7EE] text-[#25222A] animate-bounce-subtle transition-all duration-300 max-w-xs"
        >
          <span className="text-base" aria-hidden="true">✨</span>
          <div className="text-left">
            <p className="font-sans text-xs font-semibold text-[#25222A] leading-tight">
              LifeBloom Assistant
            </p>
            <p className="font-sans text-[11px] text-[#6E6872] leading-tight mt-0.5">
              Need guidance? Ask us anything!
            </p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="ml-1 text-[#6E6872]/60 hover:text-[#25222A] text-xs p-1 rounded-full hover:bg-[#EEE7FA] transition-colors"
            aria-label="Close message"
          >
            ✕
          </button>
        </div>
      )}

      {/* Floating Chatbot Action Button */}
      <div className="relative group">
        {/* Ambient background glow ring */}
        <div
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#E99AB8] via-[#C9A5E8] to-[#9B70C7] opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition-all duration-500 animate-pulse"
          aria-hidden="true"
        />

        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white p-0.5 shadow-2xl shadow-[#9B70C7]/40 border-2 border-white/80 transition-transform duration-300 transform group-hover:scale-105 group-active:scale-95 flex items-center justify-center overflow-hidden cursor-pointer"
          aria-label="Open LifeBloom Chat Assistant"
          aria-expanded={isOpen}
        >
          {/* Realistic 3D Icon Image */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-[#FBE8F0] via-white to-[#EEE7FA]">
            <Image
              src="/chatbot-icon.png"
              alt="LifeBloom AI Chatbot"
              fill
              sizes="(max-width: 640px) 56px, 64px"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority
            />
          </div>

          {/* Online active indicator dot */}
          <span
            className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full shadow-sm shadow-emerald-400/50"
            title="Online"
            aria-hidden="true"
          >
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
          </span>
        </button>
      </div>

      {/* Mini popup placeholder when clicked */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="LifeBloom AI Chat preview"
          className="absolute bottom-20 right-0 w-[300px] sm:w-[340px] bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl shadow-[#9B70C7]/20 border border-[#EDE7EE] animate-fade-in-up"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#EDE7EE]">
            <div className="flex items-center gap-2.5">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#C9A5E8]">
                <Image
                  src="/chatbot-icon.png"
                  alt="LifeBloom Assistant"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-serif text-sm font-semibold text-[#25222A]">
                  LifeBloom AI
                </h4>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                  <span className="font-sans text-[11px] text-[#6E6872]">Online & Ready</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[#6E6872] hover:bg-[#EEE7FA] hover:text-[#25222A] transition-colors text-sm"
              aria-label="Close chat window"
            >
              ✕
            </button>
          </div>

          <div className="py-5 text-center">
            <div className="w-12 h-12 rounded-full bg-[#EEE7FA] text-[#9B70C7] flex items-center justify-center mx-auto mb-3 text-xl">
              💬
            </div>
            <h5 className="font-serif text-base font-medium text-[#25222A] mb-1">
              How can we support you today?
            </h5>
            <p className="font-sans text-xs text-[#6E6872] leading-relaxed mb-4">
              Ask about life coaching, corporate workshops, NLP sessions, or book a discovery call with Dr. Shivani.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center w-full py-2.5 px-4 rounded-full bg-[#9B70C7] hover:bg-[#865CB5] text-white font-sans text-xs font-semibold shadow-md shadow-[#9B70C7]/20 transition-all duration-200 hover:-translate-y-0.5"
            >
              Start a Conversation →
            </a>
          </div>
        </div>
      )}
    </aside>
  );
}
