'use client';

import { useState, useEffect } from 'react';
import { testimonials } from '@/lib/data/testimonials';
import { Container, FadeInStagger } from '@/components/ui';

// ============================================================
// Testimonials + Impact Stats section with smooth animations
// Design: Blush/lavender background, lavender testimonial card
// ============================================================

// Only verified, publicly stated figures
const impactStats = [
  { number: '15+', label: 'Years of Experience' },
  { number: '1000+', label: 'People Targeted by 2027' },
  { number: 'Holistic', label: 'Approach to Coaching' },
  { number: 'Proven', label: 'NLP-Based Method' },
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const active = testimonials[activeIdx];

  // Auto-rotate testimonials every 6.5s if not hovered
  useEffect(() => {
    if (isPaused || testimonials.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % testimonials.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);
  return (
    <section
      className="py-24 bg-[#FCF8FB]"
      aria-labelledby="testimonials-heading"
      id="testimonials"
    >
      <Container>
        <FadeInStagger
          staggerDelay={140}
          direction="up"
          className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-stretch"
        >

          {/* LEFT — Testimonial card */}
          <div className="lg:col-span-1">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              className="h-full rounded-3xl p-8 md:p-10 relative overflow-hidden flex flex-col justify-between shadow-lg shadow-[rgba(155,112,199,0.2)] hover:shadow-xl hover:shadow-[rgba(155,112,199,0.3)] transition-shadow duration-300 min-h-[380px]"
              style={{ background: 'linear-gradient(135deg, #9B70C7 0%, #B88BDC 50%, #C9A5E8 100%)' }}
            >
              {/* Large quote mark */}
              <div className="absolute top-6 right-8 font-serif text-[120px] leading-none text-white/10 select-none pointer-events-none" aria-hidden="true">
                &ldquo;
              </div>

              <div>
                <div className="flex items-center gap-1 mb-6" aria-label="5 star rating" role="img">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" fill="#FBE8F0" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                  <span className="ml-2 font-sans text-xs text-white/80 font-medium tracking-wider uppercase">Verified Feedback</span>
                </div>

                {/* Quote with smooth key change transition */}
                <blockquote
                  key={activeIdx}
                  className="font-serif text-base sm:text-lg text-white leading-relaxed mb-6 relative z-10 animate-fade-in-up"
                >
                  &ldquo;{active.quote}&rdquo;
                </blockquote>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-[1px] bg-white/40" aria-hidden="true" />
                  <p className="font-sans text-sm text-white font-semibold tracking-wide">{active.clientLabel}</p>
                </div>
                {active.context && (
                  <p className="font-sans text-xs text-white/80 pl-11">{active.context}</p>
                )}

                {/* Dot navigation */}
                {testimonials.length > 1 && (
                  <div className="flex items-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
                    {testimonials.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        role="tab"
                        aria-selected={idx === activeIdx}
                        aria-label={`View testimonial ${idx + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === activeIdx ? 'w-7 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CENTER — Impact stats */}
          <div className="lg:col-span-1">
            <div className="h-full bg-white rounded-3xl p-8 md:p-10 flex flex-col border border-[#EDE7EE] shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-8">
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
                  Making an Impact
                </p>
                <h2 id="testimonials-heading" className="font-serif text-2xl text-[#25222A]">
                  Creating Real, Meaningful Change
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 flex-1">
                {impactStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-col items-center text-center p-4 rounded-2xl bg-[#FCF8FB] border border-[#EDE7EE] hover:border-[#C9A5E8]/60 hover:bg-[#FAF2F8] hover:-translate-y-0.5 transition-all duration-300 cursor-default group"
                  >
                    <div className="font-serif text-2xl md:text-3xl text-[#9B70C7] mb-2 group-hover:scale-105 transition-transform duration-200">{stat.number}</div>
                    <div className="font-sans text-xs text-[#6E6872] leading-snug">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — CTA panel */}
          <div className="lg:col-span-1">
            <div
              className="h-full rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-[#EDE7EE]"
              style={{ background: 'linear-gradient(135deg, #FBE8F0 0%, #EEE7FA 100%)' }}
            >
              {/* Decorative blob with gentle float */}
              <div
                className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-50 animate-float-slow pointer-events-none"
                style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)' }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="1.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                </div>

                <h3 className="font-serif text-2xl md:text-3xl text-[#25222A] leading-[1.2] mb-4">
                  Ready to Start Your Transformation?
                </h3>

                <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-8">
                  Take the first step towards a happier, more fulfilled and purposeful life.
                </p>
              </div>

              <div className="relative z-10">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-full bg-[#9B70C7] text-white font-sans text-sm font-semibold hover:bg-[#865CB5] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#9B70C7]/25 active:scale-[0.98] transition-all duration-300 cursor-pointer"
                  aria-label="Book a free discovery call with Shivi"
                >
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  Book a Free Discovery Call →
                </a>
              </div>
            </div>
          </div>

        </FadeInStagger>
      </Container>
    </section>
  );
}
