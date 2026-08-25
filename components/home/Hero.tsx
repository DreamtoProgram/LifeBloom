'use client';

import Image from 'next/image';
import { Button, ArrowIcon, PlayIcon } from '@/components/ui/Button';
import { LavenderDivider } from '@/components/ui';

// ============================================================
// Hero — Main homepage hero section
// Design: White + Blush Pink + Soft Lavender
// Mobile: Clean stacked layout (Photo 100% visible, no overlay)
// Desktop: Floating card overlap layout
// ============================================================

export function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-white"
      aria-label="LifeBloom hero — Empower. Transform. Grow."
    >
      {/* Soft background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Blush blob — top left */}
        <div
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-60"
          style={{ background: 'radial-gradient(ellipse at center, #FBE8F0 0%, transparent 65%)' }}
        />
        {/* Lavender blob — bottom right */}
        <div
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] opacity-50"
          style={{
            background: 'radial-gradient(ellipse at center, #EEE7FA 0%, transparent 65%)',
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
          }}
        />
        {/* Soft pink right fade */}
        <div
          className="absolute top-1/4 right-0 w-48 h-96 opacity-30"
          style={{ background: 'radial-gradient(ellipse at right, #F7DCE8 0%, transparent 80%)' }}
        />
      </div>

      {/* Thin lavender top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A5E8]/60 to-transparent z-10"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 pt-[88px] md:pt-[96px] pb-16 sm:pb-20 md:pb-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Text content */}
            <div className="order-1">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="h-[1px] w-8 sm:w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#9B70C7] uppercase">
                  LIFEBLOOM | PERSONAL &amp; PROFESSIONAL TRANSFORMATION
                </p>
              </div>

              {/* Main heading */}
              <h1 className="font-serif text-[clamp(3rem,8.5vw,5.5rem)] font-normal leading-[1.05] mb-6 sm:mb-8">
                <span className="block text-[#25222A]">Empower.</span>
                <span className="block text-[#C9A5E8]">Transform.</span>
                <span className="block text-[#E99AB8]">Grow.</span>
              </h1>

              {/* Lavender divider */}
              <LavenderDivider className="mb-6" />

              {/* Subheading */}
              <p className="font-sans text-base sm:text-lg text-[#6E6872] leading-relaxed mb-8 sm:mb-10 max-w-lg">
                Discover clarity. Build confidence. Find purpose.{' '}
                <br className="hidden sm:block" />
                Create a life of fulfilment.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 sm:gap-4 mb-10">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowIcon />}
                  className="w-full sm:w-auto"
                >
                  Start Your Journey
                </Button>
                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Coaching
                </Button>
                <button
                  className="flex items-center justify-center gap-2.5 font-sans text-sm font-medium text-[#6E6872] hover:text-[#9B70C7] transition-colors duration-200 group pt-2 sm:pt-0"
                  onClick={() => {}}
                  aria-label="Watch introduction video"
                  type="button"
                >
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#C9A5E8]/50 flex items-center justify-center text-[#9B70C7] group-hover:border-[#9B70C7] group-hover:bg-[#EEE7FA] transition-all duration-200">
                    <PlayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                  </span>
                  Watch Introduction
                </button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#EDE7EE]">
                <div className="text-left sm:text-center">
                  <div className="font-serif text-2xl text-[#9B70C7] font-medium">15+</div>
                  <div className="font-sans text-xs text-[#6E6872]">Years Experience</div>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-[#EDE7EE]" aria-hidden="true" />
                <div className="text-left sm:text-center">
                  <div className="font-serif text-2xl text-[#9B70C7] font-medium">1000+</div>
                  <div className="font-sans text-xs text-[#6E6872]">Targeted by 2027</div>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-[#EDE7EE]" aria-hidden="true" />
                <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0">
                  <div className="font-sans text-xs text-[#6E6872] italic">
                    &ldquo;Empowering individuals &amp; organizations to unlock human potential.&rdquo;
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Portrait + profile card */}
            <div className="order-2 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">

                {/* Soft blush/lavender shape behind image */}
                <div
                  className="absolute inset-4 rounded-[2rem] opacity-40 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, #FBE8F0 0%, #EEE7FA 100%)' }}
                  aria-hidden="true"
                />

                {/* Portrait image */}
                <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl shadow-[rgba(74,52,80,0.12)] border border-[#EDE7EE]">
                  <Image
                    src="/founder.jpg"
                    alt="Dr. Shivani Koccher Dhand — Life Coach, NLP Practitioner, and Founder of LifeBloom"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 480px"
                  />
                  {/* Very soft blush vignette at bottom only */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-[#FBE8F0]/20 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>

                {/* Profile card — BELOW photo on Mobile (< md), FLOATING on Desktop (>= md) */}
                <div className="mt-4 md:mt-0 md:absolute md:top-6 md:-right-8 bg-white text-[#25222A] rounded-2xl p-5 shadow-xl md:shadow-2xl md:max-w-[210px] z-10 border border-[#EDE7EE]"
                  style={{ boxShadow: '0 8px 32px rgba(74, 52, 80, 0.12)' }}
                >
                  <p className="font-serif text-xs sm:text-sm italic text-[#C9A5E8] mb-1">Meet</p>
                  <h2 className="font-serif text-base sm:text-lg font-semibold leading-tight mb-3 text-[#25222A]">
                    Dr. Shivani<br />Dhand Koccher
                  </h2>
                  <ul className="space-y-1.5">
                    {[
                      'Life Coach',
                      'NLP Practitioner',
                      'HR & Human Capital Expert',
                      'Educator | 15+ Years Experience',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-1.5">
                        <span className="mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#C9A5E8]" aria-hidden="true" />
                        <span className="font-sans text-xs md:text-[11px] text-[#6E6872] leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Accent bottom */}
                  <div className="mt-3 pt-3 border-t border-[#EDE7EE] flex items-center justify-between">
                    <p className="font-serif text-sm italic text-[#C9A5E8]">Dr. Shivani</p>
                    <span className="font-sans text-[10px] text-[#6E6872] uppercase tracking-widest md:hidden">Founder</span>
                  </div>
                </div>

                {/* Floating badge — bottom left (Desktop / Tablet) */}
                <div className="hidden sm:flex absolute -bottom-4 -left-4 md:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-[#EDE7EE] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#EEE7FA] flex items-center justify-center shrink-0">
                      <LeafIcon />
                    </div>
                    <div>
                      <div className="font-sans text-xs font-semibold text-[#25222A]">Trusted Coaching</div>
                      <div className="font-sans text-[11px] text-[#6E6872]">Personalized for You</div>
                    </div>
                  </div>
                </div>

                {/* Decorative lavender ring */}
                <div
                  className="hidden md:block absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-[#C9A5E8]/30 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6 sm:pb-8" aria-hidden="true">
        <div className="flex flex-col items-center gap-1.5 opacity-40">
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#6E6872]">Scroll</span>
          <div className="w-[1px] h-6 sm:h-8 bg-gradient-to-b from-[#C9A5E8] to-transparent" />
        </div>
      </div>
    </section>
  );
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9B70C7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12M12 12C12 12 7 9.5 5 4c4.5 1 7.5 4 7 8zM12 12c0 0 5-2.5 7-8-4.5 1-7.5 4-7 8z" />
    </svg>
  );
}
