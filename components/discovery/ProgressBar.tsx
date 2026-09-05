'use client';

interface ProgressBarProps {
  current: number; // 1 to 20
  total: number; // 20
  category?: string;
  categoryEmoji?: string;
}

export function ProgressBar({ current, total, category, categoryEmoji }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full mb-8">
      {/* Top Labels */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-sans mb-2.5">
        <div className="flex items-center gap-2">
          {categoryEmoji && <span className="text-base" aria-hidden="true">{categoryEmoji}</span>}
          {category && (
            <span className="font-semibold text-[#865CB5] tracking-wide uppercase text-xs">
              {category}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="font-medium text-[#25222A]">
            Question <span className="font-bold text-[#9B70C7]">{current}</span> of {total}
          </span>
          <span className="font-semibold text-[#9B70C7] font-mono text-xs bg-[#EEE7FA] px-2 py-0.5 rounded-full border border-[#C9A5E8]/30">
            {percent}% Complete
          </span>
        </div>
      </div>

      {/* Progress Track */}
      <div
        className="w-full h-3 bg-[#EDE7EE] rounded-full overflow-hidden relative shadow-inner"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Assessment progress: Question ${current} of ${total}`}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out shadow-xs"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #C9A5E8 0%, #9B70C7 60%, #865CB5 100%)',
          }}
        />
      </div>
    </div>
  );
}
