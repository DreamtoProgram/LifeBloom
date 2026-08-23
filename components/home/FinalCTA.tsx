'use client';

import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container } from '@/components/ui';

// ============================================================
// FinalCTA — Strong emotional call-to-action section
// ============================================================

export function FinalCTA() {
  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="final-cta-heading"
      style={{
        background: 'linear-gradient(135deg, #F8F5EE 0%, #DDE8D9 60%, #F8F5EE 100%)',
      }}
    >
      {/* Botanical decorative elements */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full opacity-50 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #DDE8D9 0%, transparent 70%)', transform: 'translate(40%, -40%)' }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-40 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #C9A35B20 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }}
        aria-hidden="true"
      />

      {/* Gold top line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#C9A35B]/50 to-transparent" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-[1px] w-10 bg-[#C9A35B]" aria-hidden="true" />
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase">
              Begin Your Journey
            </p>
            <div className="h-[1px] w-10 bg-[#C9A35B]" aria-hidden="true" />
          </div>

          {/* Heading */}
          <h2
            id="final-cta-heading"
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#20251F] leading-[1.1] mb-6"
          >
            Ready to Discover
            <br />
            <span className="text-[#183B2A] italic">Your Next Possibility?</span>
          </h2>

          {/* Supporting text */}
          <p className="font-sans text-base md:text-lg text-[#6D716A] leading-relaxed mb-10 max-w-lg mx-auto">
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
          <p className="mt-8 font-sans text-xs text-[#6D716A]/70">
            Personalized. Confidential. Professional.
          </p>
        </div>
      </Container>
    </section>
  );
}
