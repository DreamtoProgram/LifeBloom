'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, LavenderDivider, StatCard, AnimatedSection } from '@/components/ui';

// ============================================================
// FounderSection — Editorial split section on Homepage with animation
// Design: Soft blush background, lavender accents
// ============================================================

export function FounderSection() {
  return (
    <section
      className="py-24 bg-[#FCF8FB] overflow-hidden relative"
      aria-labelledby="founder-heading"
    >
      {/* Background botanical gradient with organic floating */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-40 pointer-events-none -translate-y-1/2 -translate-x-1/3 animate-float-slow"
        style={{ background: 'radial-gradient(circle, #FBE8F0 0%, transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 right-0 w-72 h-72 rounded-full opacity-30 pointer-events-none -translate-y-1/2 translate-x-1/3 animate-float-reverse"
        style={{ background: 'radial-gradient(circle, #EEE7FA 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — Portrait */}
          <div className="lg:col-span-5 relative">
            <AnimatedSection direction="scale" delay={50}>
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl shadow-[rgba(74,52,80,0.10)] border border-[#EDE7EE] transition-transform duration-700 hover:scale-[1.01]">
                <Image
                  src="/founder.jpg"
                  alt="Dr. Shivani Koccher Dhand — Founder & Lead Coach at LifeBloom"
                  fill
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                />
                {/* Very soft blush gradient at bottom */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#FBE8F0]/25 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>

              {/* Credential badge (bottom right of image) with subtle float */}
              <div className="absolute -bottom-4 right-2 sm:-bottom-6 sm:-right-6 bg-white text-[#25222A] rounded-2xl p-4 sm:p-5 shadow-xl z-10 max-w-[190px] sm:max-w-[200px] border border-[#EDE7EE] animate-bounce-subtle">
                <p className="font-serif text-xs italic text-[#C9A5E8] mb-1">Human Capital Expert</p>
                <p className="font-sans text-xs text-[#6E6872] leading-snug">
                  Integrating NLP &amp; Personal Transformation
                </p>
              </div>

              {/* Decorative lavender ring with breathing pulse */}
              <div
                className="absolute -top-6 -left-6 w-40 h-40 rounded-full border border-[#C9A5E8]/30 pointer-events-none animate-pulse-soft"
                aria-hidden="true"
              />
            </AnimatedSection>
          </div>

          {/* RIGHT — Content */}
          <div className="lg:col-span-7">
            <AnimatedSection direction="up" delay={150}>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
                  Meet Your Coach
                </p>
              </div>

              <h2
                id="founder-heading"
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#25222A] leading-[1.15] mb-6"
              >
                Helping People Unlock
                <br />
                <span className="text-[#9B70C7] italic">Their Human Potential</span>
              </h2>

              <LavenderDivider className="mb-6" />

              <div className="space-y-4 font-sans text-base text-[#6E6872] leading-relaxed mb-8">
                <p>
                  Dr. Shivani Koccher Dhand is a passionate Life Coach, NLP Practitioner, HR &amp; Human Capital Expert, and Educator based in Phagwara, India.
                </p>
                <p>
                  With over 15 years of rich experience in personal growth, professional development, and emotional intelligence training, she guides individuals and teams to navigate life transitions with clarity, confidence, and purpose.
                </p>
              </div>

              {/* Key Expertise Chips */}
              <div className="flex flex-wrap gap-2.5 mb-10">
                {[
                  'Life Coaching',
                  'NLP Practitioner',
                  'HR & Human Capital',
                  'Emotional Intelligence',
                  'Mindset Transformation',
                ].map((chip) => (
                  <span
                    key={chip}
                    className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EEE7FA] text-[#7F55A8] border border-[#C9A5E8]/40 hover:scale-105 hover:bg-[#E4D7F7] transition-all duration-200 cursor-default"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Credibility Stats */}
              <div className="grid grid-cols-2 gap-6 p-6 bg-white rounded-2xl border border-[#EDE7EE] mb-8 shadow-xs hover:shadow-md transition-shadow duration-300">
                <StatCard number="15+" label="Years Experience" />
                <StatCard number="1000+" label="People Targeted by 2027" />
              </div>

              {/* CTA */}
              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors duration-200 group"
                  aria-label="Meet Dr. Shivani Koccher Dhand"
                >
                  <span>Meet Dr. Shivani</span>
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}
