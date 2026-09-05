'use client';

import { useState, useEffect } from 'react';

interface LoadingTransitionProps {
  onComplete: () => void;
}

const STAGES = [
  'Understanding your responses',
  'Identifying your preferences',
  'Recognising behavioural patterns',
  'Preparing your visual profile',
  'Creating your personal report',
];

export function LoadingTransition({ onComplete }: LoadingTransitionProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    // Progress through stages every 700ms
    const interval = setInterval(() => {
      setCurrentStage((prev) => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 600);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="bg-white rounded-[32px] p-8 sm:p-14 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] text-center max-w-xl mx-auto my-12 animate-fade-in-up">
      {/* Animated Pulse Icon */}
      <div className="relative w-20 h-20 mx-auto mb-8 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-[#EEE7FA] animate-ping opacity-30" />
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#C9A5E8] to-[#9B70C7] flex items-center justify-center text-white shadow-lg shadow-[#9B70C7]/20">
          <svg
            className="animate-spin h-7 w-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        </div>
      </div>

      <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal mb-3">
        Creating Your Personal Reflection Report
      </h2>

      <p className="font-sans text-sm text-[#6E6872] max-w-sm mx-auto mb-8 leading-relaxed">
        Reflecting your selected preferences and responses into structured insights for your coaching journey.
      </p>

      {/* Sequential Checkpoints List */}
      <div className="space-y-3 text-left max-w-md mx-auto bg-[#FCF8FB] p-5 rounded-2xl border border-[#EDE7EE]">
        {STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;

          return (
            <div
              key={stage}
              className={`flex items-center gap-3 transition-opacity duration-300 ${
                idx <= currentStage ? 'opacity-100' : 'opacity-35'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                  isDone
                    ? 'bg-[#9B70C7] text-white'
                    : isCurrent
                    ? 'border-2 border-[#9B70C7] text-[#9B70C7] animate-pulse'
                    : 'border border-[#EDE7EE] text-[#6E6872]'
                }`}
              >
                {isDone ? '✓' : idx + 1}
              </div>
              <span
                className={`font-sans text-xs sm:text-sm ${
                  isDone
                    ? 'text-[#25222A] font-medium'
                    : isCurrent
                    ? 'text-[#865CB5] font-semibold'
                    : 'text-[#6E6872]'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
