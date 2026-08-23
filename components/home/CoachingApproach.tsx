'use client';

import Image from 'next/image';
import { Container } from '@/components/ui';

// ============================================================
// CoachingApproach — Dark forest green section with 5-stage journey
// ============================================================

const stages = [
  {
    number: '01',
    title: 'Listen',
    description: 'We listen deeply to understand your unique story.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Reflect',
    description: 'We help you pause, reflect and gain new perspectives.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Discover',
    description: 'You discover your strengths, values and purpose.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Transform',
    description: 'We help you break barriers and create real change.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    number: '05',
    title: 'Grow',
    description: 'You grow with clarity, confidence and consistent action.',
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12C12 7 7 4 3 5c1 5 5 8 9 7zM12 12c0-5 5-8 9-7-1 5-5 8-9 7z" />
      </svg>
    ),
  },
];

export function CoachingApproach() {
  return (
    <section
      className="relative bg-[#183B2A] py-24 overflow-hidden"
      aria-labelledby="approach-heading"
    >
      {/* Background plant image */}
      <div className="absolute right-0 top-0 h-full w-80 md:w-96 opacity-20" aria-hidden="true">
        <Image
          src="/coaching-plant.jpg"
          alt=""
          fill
          className="object-cover object-left"
          sizes="384px"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#183B2A] via-[#183B2A]/50 to-transparent" />
      </div>

      {/* Subtle botanical blobs */}
      <div
        className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #DDE8D9 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-[#C9A35B]" aria-hidden="true" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase">
              Our Method
            </p>
          </div>
          <h2
            id="approach-heading"
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-white leading-[1.15] mb-4"
          >
            Our Coaching Approach{' '}
            <span className="text-[#C9A35B]">✦</span>
          </h2>
          <p className="font-sans text-base md:text-lg text-white/65 leading-relaxed">
            A transformative journey designed around you.
          </p>
        </div>

        {/* Journey stages */}
        <div className="relative">
          {/* Connecting line — desktop */}
          <div
            className="hidden lg:block absolute top-[52px] left-[calc(10%-16px)] right-[calc(10%-16px)] h-[1px] bg-gradient-to-r from-[#C9A35B]/20 via-[#C9A35B]/60 to-[#C9A35B]/20"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {stages.map((stage, idx) => (
              <div
                key={stage.number}
                className="group flex flex-col items-center text-center lg:items-center"
              >
                {/* Icon circle */}
                <div className="relative mb-5 z-10">
                  <div className="w-[104px] h-[104px] rounded-full border border-[#C9A35B]/30 bg-[#183B2A] flex items-center justify-center group-hover:border-[#C9A35B]/70 group-hover:bg-[#1e4a35] transition-all duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-[#C9A35B] group-hover:bg-white/10 transition-colors duration-300">
                      {stage.icon}
                    </div>
                  </div>
                  {/* Stage number */}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#C9A35B] text-white font-sans text-[10px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                </div>

                {/* Content */}
                <h3 className="font-serif text-lg font-semibold text-white mb-2">
                  {stage.title}
                </h3>
                <p className="font-sans text-sm text-white/60 leading-relaxed max-w-[140px]">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Watch video CTA */}
        <div className="mt-16 flex justify-end">
          <button
            className="flex items-center gap-4 group"
            type="button"
            aria-label="Watch how coaching transforms lives"
          >
            <div className="text-right">
              <div className="font-sans text-xs text-white/50 mb-1">How Coaching</div>
              <div className="font-sans text-sm font-semibold text-white group-hover:text-[#C9A35B] transition-colors duration-200">Transforms Lives</div>
              <div className="font-sans text-xs text-[#C9A35B]">Watch Video</div>
            </div>
            <div className="w-14 h-14 rounded-full bg-[#C9A35B]/20 border border-[#C9A35B]/40 flex items-center justify-center text-[#C9A35B] group-hover:bg-[#C9A35B] group-hover:text-white transition-all duration-300">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </Container>
    </section>
  );
}
