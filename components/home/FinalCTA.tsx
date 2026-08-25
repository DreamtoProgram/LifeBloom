'use client';

import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container } from '@/components/ui';

// ============================================================
// FinalCTA — Closing call-to-action section
// Design: White → soft blush → lavender gradient
// ============================================================

export function FinalCTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="final-cta-heading"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #FBE8F0 50%, #EEE7FA 100%)',
      }}
    >
      {/* Decorative botanical blobs */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-50 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(40%, -40%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }}
        aria-hidden="true"
      />

      {/* Lavender top accent line */}
      <div
        className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#C9A5E8]/60 to-transparent"
        aria-hidden="true"
      />

      {/* Subtle botanical petal — top right */}
      <div
        className="absolute top-8 right-12 w-20 h-32 opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #E99AB8 0%, transparent 70%)',
          borderRadius: '50% 20% 50% 20%',
          transform: 'rotate(-15deg)',
        }}
        aria-hidden="true"
      />
      {/* Subtle botanical petal — bottom left */}
      <div
        className="absolute bottom-8 left-12 w-16 h-28 opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #C9A5E8 0%, transparent 70%)',
          borderRadius: '20% 50% 20% 50%',
          transform: 'rotate(20deg)',
        }}
        aria-hidden="true"
      />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-gradient-to-r from-transparent to-[#C9A5E8]" aria-hidden="true" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
              Begin Your Journey
            </p>
            <div className="h-[1px] w-10 bg-gradient-to-l from-transparent to-[#C9A5E8]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2
            id="final-cta-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#25222A] leading-[1.1] mb-6"
          >
            Ready to Discover
            <br />
            <span className="text-[#9B70C7] italic">Your Next Possibility?</span>
          </h2>

          {/* Supporting text */}
          <p className="font-sans text-base md:text-lg text-[#6E6872] leading-relaxed mb-10 max-w-lg mx-auto">
            Take the first step towards greater clarity, confidence, purpose and fulfilment. Your journey begins with a single conversation.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
          </div>

          {/* Trust note */}
          <p className="mt-8 font-sans text-xs text-[#6E6872]/70">
            Personalized. Confidential. Professional.
          </p>
        </div>
      </Container>
    </section>
  );
}
