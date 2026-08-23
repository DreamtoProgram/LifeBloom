'use client';

import Image from 'next/image';
import { Button, ArrowIcon, PlayIcon } from '@/components/ui/Button';
import { GoldDivider } from '@/components/ui';

// ============================================================
// Hero — Main homepage hero section
// Matches the design: large split layout with editorial serif
// heading, founder portrait, floating profile card
// ============================================================

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col"
      aria-label="LifeBloom hero — Empower. Transform. Grow."
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#F8F5EE] overflow-hidden" aria-hidden="true">
        {/* Botanical blob — top left */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, #DDE8D9 0%, transparent 70%)',
          }}
        />
        {/* Botanical blob — bottom right */}
        <div
          className="absolute -bottom-40 -right-20 w-[600px] h-[600px] opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, #DDE8D9 0%, transparent 70%)',
            borderRadius: '60% 40% 30% 70% / 50% 60% 40% 50%',
          }}
        />
        {/* Subtle leaf element — far right */}
        <div
          className="absolute top-1/4 right-0 w-48 h-96 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at right, #DDE8D9 0%, transparent 80%)',
          }}
        />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#C9A35B]/40 to-transparent" aria-hidden="true" />

      {/* Main content */}
      <div className="relative flex-1 flex items-center pt-28 pb-20 md:pt-36 md:pb-24">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT — Text content */}
            <div className="order-2 lg:order-1">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-10 bg-[#C9A35B]" aria-hidden="true" />
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase">
                  LIFEBLOOM | PERSONAL & PROFESSIONAL TRANSFORMATION
                </p>
              </div>

              {/* Main heading */}
              <h1 className="font-serif text-[clamp(3rem,7vw,5.5rem)] font-normal leading-[1.05] text-[#20251F] mb-8">
                <span className="block">Empower.</span>
                <span className="block">Transform.</span>
                <span className="block text-[#183B2A] italic">Grow.</span>
              </h1>

              {/* Gold divider */}
              <GoldDivider className="mb-6" />

              {/* Subheading */}
              <p className="font-sans text-base md:text-lg text-[#6D716A] leading-relaxed mb-10 max-w-lg">
                Discover clarity. Build confidence. Find purpose.{' '}
                <br className="hidden sm:block" />
                Create a life of fulfilment.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-wrap items-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowIcon />}
                >
                  Start Your Journey
                </Button>
                <Button
                  href="/services"
                  variant="secondary"
                  size="lg"
                >
                  Explore Coaching
                </Button>
                <button
                  className="flex items-center gap-2.5 font-sans text-sm font-medium text-[#6D716A] hover:text-[#183B2A] transition-colors duration-200 group"
                  onClick={() => {}}
                  aria-label="Watch introduction video"
                  type="button"
                >
                  <span className="w-10 h-10 rounded-full border-2 border-[#183B2A]/20 flex items-center justify-center text-[#183B2A] group-hover:border-[#183B2A] group-hover:bg-[#183B2A]/5 transition-all duration-200">
                    <PlayIcon className="w-4 h-4 ml-0.5" />
                  </span>
                  Watch Introduction
                </button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-[#E5E0D8]">
                <div className="text-center">
                  <div className="font-serif text-2xl text-[#183B2A]">15+</div>
                  <div className="font-sans text-xs text-[#6D716A]">Years Experience</div>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E0D8]" aria-hidden="true" />
                <div className="text-center">
                  <div className="font-serif text-2xl text-[#183B2A]">1000+</div>
                  <div className="font-sans text-xs text-[#6D716A]">People Targeted by 2027</div>
                </div>
                <div className="w-[1px] h-10 bg-[#E5E0D8]" aria-hidden="true" />
                <div>
                  <div className="font-sans text-xs text-[#6D716A] italic">
                    "Empowering individuals &<br />organizations to unlock their<br />human potential."
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Portrait + floating card */}
            <div className="order-1 lg:order-2 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[480px]">

                {/* Portrait image */}
                <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl shadow-[#183B2A]/10">
                  <Image
                    src="/founder.jpg"
                    alt="Dr. Shivani Koccher Dhand — Life Coach, NLP Practitioner, and Founder of LifeBloom"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1024px) 90vw, 480px"
                  />
                  {/* Subtle overlay for card contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#183B2A]/30 via-transparent to-transparent" aria-hidden="true" />
                </div>

                {/* Floating profile card — top right */}
                <div className="absolute -top-4 -right-4 md:top-6 md:-right-8 bg-[#183B2A] text-white rounded-2xl p-5 shadow-2xl max-w-[200px] z-10">
                  <p className="font-serif text-sm italic text-[#C9A35B] mb-1">Meet</p>
                  <h2 className="font-serif text-lg font-semibold leading-tight mb-3">
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
                        <span className="font-sans text-[11px] text-white/80 leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {/* Signature */}
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="font-serif text-sm italic text-[#C9A35B]/80">Dr. Shivani</p>
                  </div>
                </div>

                {/* Floating badge — bottom left */}
                <div className="absolute -bottom-4 -left-4 md:-bottom-4 md:-left-8 bg-white rounded-2xl p-4 shadow-xl border border-[#E5E0D8] z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#DDE8D9] flex items-center justify-center shrink-0">
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
                  className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border border-[#C9A35B]/20"
                  aria-hidden="true"
                />
                <div
                  className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full border border-[#C9A35B]/30"
                  aria-hidden="true"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom wave / scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8" aria-hidden="true">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#6D716A]">Scroll</span>
          <div className="w-[1px] h-8 bg-[#6D716A]" />
        </div>
      </div>
    </section>
  );
}

function LeafIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#183B2A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V12M12 12C12 12 7 9.5 5 4c4.5 1 7.5 4 7 8zM12 12c0 0 5-2.5 7-8-4.5 1-7.5 4-7 8z" />
    </svg>
  );
}
