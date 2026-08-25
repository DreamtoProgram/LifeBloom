import type { Metadata } from 'next';
import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container } from '@/components/ui';
import { AudienceGrid } from '@/components/home/AudienceGrid';

export const metadata: Metadata = {
  title: 'Who We Help | LifeBloom Coaching',
  description:
    'LifeBloom works with students, working professionals, people in life transitions, aspiring leaders, women seeking growth, and organizations. Discover the guidance we offer for your journey.',
};

export default function WhoWeHelpPage() {
  return (
    <div className="pt-[80px] bg-white">
      {/* Hero */}
      <section
        className="pb-20 pt-16 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FBE8F0 50%, #EEE7FA 100%)' }}
      >
        <div
          className="absolute right-0 bottom-0 w-72 h-72 rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(20%, 20%)' }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">Who We Help</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#25222A] leading-[1.1] mb-6">
              Guidance for<br />
              <span className="text-[#9B70C7] italic">Every Journey</span>
            </h1>
            <p className="font-sans text-base text-[#6E6872] leading-relaxed">
              Whether you are navigating a career change, seeking more from life, building your leadership, or developing your organization — LifeBloom is here to support you.
            </p>
          </div>
        </Container>
      </section>

      {/* Audience grid (already uses new theme) */}
      <AudienceGrid />

      {/* CTA */}
      <section className="py-20 bg-white">
        <Container className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#25222A] mb-6">
            Find the Right Coaching for You
          </h2>
          <p className="font-sans text-base text-[#6E6872] mb-8 max-w-lg mx-auto">
            Not sure where to start? Begin with a conversation and we'll help you find the right next step.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
              Start Your Journey
            </Button>
            <Button href="/services" variant="secondary" size="lg">
              View All Services
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
