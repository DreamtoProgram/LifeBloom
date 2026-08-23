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
    <div className="pt-28 bg-[#F8F5EE]">
      {/* Hero */}
      <section className="pb-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Who We Help</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#20251F] leading-[1.1] mb-6">
              Guidance for<br />
              <span className="text-[#183B2A] italic">Every Journey</span>
            </h1>
            <p className="font-sans text-base text-[#6D716A] leading-relaxed">
              Whether you are navigating a career change, seeking more from life, building your leadership, or developing your organization — LifeBloom is here to support you.
            </p>
          </div>
        </Container>
      </section>

      {/* Audience grid */}
      <AudienceGrid />

      {/* CTA */}
      <section className="py-20 bg-white">
        <Container className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-[#20251F] mb-6">
            Find the Right Coaching for You
          </h2>
          <p className="font-sans text-base text-[#6D716A] mb-8 max-w-lg mx-auto">
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
