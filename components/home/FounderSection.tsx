'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Container, GoldDivider, StatCard } from '@/components/ui';

// ============================================================
// FounderSection — Editorial split section on Homepage
// SECTION 6 — ABOUT DR. SHIVANI
// ============================================================

export function FounderSection() {
  return (
    <section
      className="py-24 bg-white overflow-hidden relative"
      aria-labelledby="founder-heading"
    >
      {/* Background subtle botanical gradient */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 rounded-full opacity-30 pointer-events-none -translate-y-1/2 -translate-x-1/3"
        style={{
          background: 'radial-gradient(circle, #DDE8D9 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT — Portrait */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] shadow-xl shadow-[#183B2A]/10 border border-[#E5E0D8]">
              <Image
                src="/founder.jpg"
                alt="Dr. Shivani Koccher Dhand — Founder & Lead Coach at LifeBloom"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183B2A]/30 via-transparent to-transparent" aria-hidden="true" />
            </div>

            {/* Decorative Gold Leaf Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-[#183B2A] text-white rounded-2xl p-5 shadow-xl z-10 max-w-[200px]">
              <p className="font-serif text-xs italic text-[#C9A35B] mb-1">Human Capital Expert</p>
              <p className="font-sans text-xs text-white/80 leading-snug">
                Integrating NLP & Personal Transformation
              </p>
            </div>

            {/* Decorative background border ring */}
            <div
              className="absolute -top-6 -left-6 w-40 h-40 rounded-full border border-[#C9A35B]/30 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* RIGHT — Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-[#C9A35B]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase">
                Meet Your Coach
              </p>
            </div>

            <h2
              id="founder-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#20251F] leading-[1.15] mb-6"
            >
              Helping People Unlock
              <br />
              <span className="text-[#183B2A] italic">Their Human Potential</span>
            </h2>

            <GoldDivider className="mb-6" />

            <div className="space-y-4 font-sans text-base text-[#6D716A] leading-relaxed mb-8">
              <p>
                Dr. Shivani Koccher Dhand is a passionate Life Coach, NLP Practitioner, HR & Human Capital Expert, and Educator based in Phagwara, India.
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
                  className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#F8F5EE] text-[#183B2A] border border-[#E5E0D8]"
                >
                  {chip}
                </span>
              ))}
            </div>

            {/* Credibility Stats */}
            <div className="grid grid-cols-2 gap-6 p-6 bg-[#F8F5EE] rounded-2xl border border-[#E5E0D8] mb-8">
              <StatCard number="15+" label="Years Experience" />
              <StatCard number="1000+" label="People Targeted by 2027" />
            </div>

            {/* CTA */}
            <div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors duration-200 group"
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
          </div>
        </div>
      </Container>
    </section>
  );
}
