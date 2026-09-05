'use client';

import type { Question } from '@/lib/discovery/questions';

interface QuestionCardProps {
  question: Question;
  selectedOption?: string;
  onSelectOption: (option: string) => void;
  error?: string;
}

export function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  error,
}: QuestionCardProps) {
  return (
    <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] transition-all">
      {/* Category Pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCF8FB] border border-[#EDE7EE] mb-5">
        <span className="text-sm" aria-hidden="true">{question.categoryEmoji}</span>
        <span className="font-sans text-xs font-semibold text-[#865CB5] tracking-wide uppercase">
          {question.category}
        </span>
      </div>

      {/* Question Heading */}
      <h2
        id={`question-${question.id}-title`}
        className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#25222A] font-normal tracking-tight leading-snug mb-8"
      >
        {question.question}
      </h2>

      {/* Options List */}
      <div
        role="radiogroup"
        aria-labelledby={`question-${question.id}-title`}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 mb-4"
      >
        {question.options.map((option, idx) => {
          const isSelected = selectedOption === option;
          const letter = String.fromCharCode(65 + idx); // A, B, C, D

          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectOption(option)}
              className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-center justify-between group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#9B70C7] focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-[#EEE7FA] border-[#9B70C7] shadow-sm shadow-[#9B70C7]/15 ring-1 ring-[#9B70C7]'
                  : 'bg-white border-[#EDE7EE] hover:border-[#C9A5E8] hover:bg-[#FCF8FB]'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Option Letter Indicator */}
                <div
                  className={`w-8 h-8 rounded-xl font-sans text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-[#9B70C7] text-white'
                      : 'bg-[#FCF8FB] text-[#6E6872] border border-[#EDE7EE] group-hover:border-[#C9A5E8] group-hover:text-[#9B70C7]'
                  }`}
                >
                  {letter}
                </div>

                {/* Option Text */}
                <span
                  className={`font-sans text-base sm:text-lg font-medium transition-colors ${
                    isSelected ? 'text-[#3E1B4C] font-semibold' : 'text-[#25222A] group-hover:text-[#6E3587]'
                  }`}
                >
                  {option}
                </span>
              </div>

              {/* Selection Checkmark */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#9B70C7] text-white scale-100 opacity-100'
                    : 'border border-[#EDE7EE] opacity-0 group-hover:opacity-40'
                }`}
                aria-hidden="true"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>

      {/* Validation Error Message */}
      {error && (
        <div
          role="alert"
          className="mt-4 p-3 bg-red-50/80 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-xs font-sans animate-fade-in-up"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
