'use client';

import Image from 'next/image';
import { Button, ArrowIcon, PlayIcon } from '@/components/ui/Button';
import { GoldDivider } from '@/components/ui';

// ============================================================
// Hero — Main homepage hero section
// Mobile: Clean stacked layout (Photo 100% visible, no overlay over face)
// Desktop: Floating card overlap layout
// ============================================================

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      aria-label="LifeBloom hero — Empower. Transform. Grow."
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#F8F5EE] overflow-hidden" aria-hidden="true">
        {/* Botanical blob — top left */}
        <div
          className="absolute -top-32 -left-32 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full opacity-40 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #DDE8D9 0%, transparent 70%)',
          }}
        />
        {/* Botanical blob — bottom right */}
        <div
          className="absolute -bottom-40 -right-20 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, #DDE8D9 0%, transparent 70%)',
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
          }}
        />
        {/* Subtle leaf element — far right */}
        <div
          className="absolute top-1/4 right-0 w-48 h-96 opacity-20 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at right, #DDE8D9 0%, transparent 80%)',
          }}
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A35B]/40 to-transparent z-10" aria-hidden="true" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 z-10">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Text content (Order 1 on Mobile & Desktop) */}
            <div className="order-1">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="h-[1px] w-8 sm:w-10 bg-[#C9A35B]" aria-hidden="true" />
                <p className="font-sans text-[11px] sm:text-xs font-semibold tracking-[0.18em] text-[#C9A35B] uppercase">
                  LIFEBLOOM | PERSONAL & PROFESSIONAL TRANSFORMATION
                </p>
              </div>

              {/* Main heading */}
              <h1 className="font-serif text-[clamp(2.75rem,8vw,5.25rem)] font-normal leading-[1.05] text-[#20251F] mb-6 sm:mb-8">
                <span className="block">Empower.</span>
                <span className="block">Transform.</span>
                <span className="block text-[#183B2A] italic">Grow.</span>
              </h1>

              {/* Gold divider */}
              <GoldDivider className="mb-6" />

              {/* Subheading */}
              <p className="font-sans text-base sm:text-lg text-[#6D716A] leading-relaxed mb-8 sm:mb-10 max-w-lg">
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
                  className="flex items-center justify-center gap-2.5 font-sans text-sm font-medium text-[#6D716A] hover:text-[#183B2A] transition-colors duration-200 group pt-2 sm:pt-0"
                  onClick={() => {}}
                  aria-label="Watch introduction video"
                  type="button"
                >
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#183B2A]/20 flex items-center justify-center text-[#183B2A] group-hover:border-[#183B2A] group-hover:bg-[#183B2A]/5 transition-all duration-200">
                    <PlayIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-0.5" />
                  </span>
                  Watch Introduction
                </button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-[#E5E0D8]">
                <div className="text-left sm:text-center">
                  <div className="font-serif text-2xl text-[#183B2A] font-medium">15+</div>
                  <div className="font-sans text-xs text-[#6D716A]">Years Experience</div>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-[#E5E0D8]" aria-hidden="true" />
                <div className="text-left sm:text-center">
                  <div className="font-serif text-2xl text-[#183B2A] font-medium">1000+</div>
                  <div className="font-sans text-xs text-[#6D716A]">Targeted by 2027</div>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-[#E5E0D8]" aria-hidden="true" />
                <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0">
                  <div className="font-sans text-xs text-[#6D716A] italic">
                    "Empowering individuals & organizations to unlock human potential."
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Portrait + profile card */}
            <div className="order-2 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
              <div className="relative w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">

                {/* Portrait image — 100% un-obscured on mobile */}
                <div className="relative rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden aspect-[4/5] shadow-xl sm:shadow-2xl shadow-[#183B2A]/10 border border-[#E5E0D8]/60">
                  <Image
                    src="/founder.jpg"
                    alt="Dr. Shivani Koccher Dhand — Life Coach, NLP Practitioner, and Founder of LifeBloom"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 420px, 480px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#183B2A]/20 via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Profile card — BELOW photo on Mobile (< md), FLOATING on Desktop (>= md) */}
                <div className="mt-4 md:mt-0 md:absolute md:top-6 md:-right-8 bg-[#183B2A] text-white rounded-2xl p-5 shadow-xl md:shadow-2xl md:max-w-[210px] z-10 border border-white/10">
                  <p className="font-serif text-xs sm:text-sm italic text-[#C9A35B] mb-1">Meet</p>
                  <h2 className="font-serif text-base sm:text-lg font-semibold leading-tight mb-3">
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
                        <span className="mt-1 shrink-0 w-1 h-1 rounded-full bg-[#C9A35B]" aria-hidden="true" />
                        <span className="font-sans text-xs md:text-[11px] text-white/85 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Signature */}
                  <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between">
                    <p className="font-serif text-sm italic text-[#C9A35B]/90">Dr. Shivani</p>
                    <span className="font-sans text-[10px] text-white/40 uppercase tracking-widest md:hidden">Founder</span>
                  </div>
                </div>

                {/* Floating badge — bottom left (Desktop / Tablet) */}
                <div className="hidden sm:flex absolute -bottom-4 -left-4 md:-left-8 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-xl border border-[#E5E0D8] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#DDE8D9] flex items-center justify-center shrink-0">
                      <LeafIcon />
                    </div>
                    <div>
                      <div className="font-sans text-xs font-semibold text-[#183B2A]">Trusted Coaching</div>
                      <div className="font-sans text-[11px] text-[#6D716A]">Personalized for You</div>
                    </div>
                  </div>
                </div>

                {/* Decorative gold ring */}
                <div
                  className="hidden md:block absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-[#C9A35B]/20 pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6 sm:pb-8" aria-hidden="true">
        <div className="flex flex-col items-center gap-1.5 opacity-50">
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase text-[#6D716A]">Scroll</span>
          <div className="w-[1px] h-6 sm:h-8 bg-[#6D716A]" />
        </div>
      </div>
    </section>
  );
}

function LeafIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#183B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12M12 12C12 12 7 9.5 5 4c4.5 1 7.5 4 7 8zM12 12c0 0 5-2.5 7-8-4.5 1-7.5 4-7 8z" />
    </svg>
  );
}
