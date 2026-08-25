import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { TrustStrip } from '@/components/home/TrustStrip';
import { ServicesPreview } from '@/components/home/ServicesPreview';
import { CoachingApproach } from '@/components/home/CoachingApproach';
import { FounderSection } from '@/components/home/FounderSection';
import { AudienceGrid } from '@/components/home/AudienceGrid';
import { Testimonials } from '@/components/home/Testimonials';
import { InsightsPreview } from '@/components/home/InsightsPreview';
import { FinalCTA } from '@/components/home/FinalCTA';

export const metadata: Metadata = {
  title: 'LifeBloom | Life Coaching & Personal Development',
  description:
    'LifeBloom offers personalized life coaching, career guidance, NLP, mindfulness and corporate development programs. Discover clarity, confidence and purpose with Dr. Shivani Koccher Dhand — Life Coach & NLP Practitioner based in Phagwara, India.',
  openGraph: {
    title: 'LifeBloom | Life Coaching & Personal Development',
    description:
      'Empower. Transform. Grow. Personalized coaching and development programs for individuals and organizations by Dr. Shivani Koccher Dhand.',
    url: 'https://lifebloom.in',
    type: 'website',
  },
  alternates: {
    canonical: 'https://lifebloom.in',
  },
};

export default function HomePage() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <Hero />

      {/* SECTION 2 — Trust / Credibility Strip */}
      <TrustStrip />

      {/* SECTION 3 — Services Preview */}
      <ServicesPreview />

      {/* SECTION 4 — Coaching Approach */}
      <CoachingApproach />

      {/* SECTION 5 — Founder & Coach */}
      <FounderSection />

      {/* SECTION 6 — Who We Help */}
      <AudienceGrid />

      {/* SECTION 7 — Testimonials + Impact */}
      <Testimonials />

      {/* SECTION 8 — Insights / Thought Leadership */}
      <InsightsPreview />

      {/* SECTION 9 — Final CTA */}
      <FinalCTA />
    </>
  );
}
