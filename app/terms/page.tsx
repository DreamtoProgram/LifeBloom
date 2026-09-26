import type { Metadata } from 'next';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description:
    'Read the terms and conditions governing coaching services, website use, workshops, and bookings with Shivi and Dr. Shivani Koccher Dhand.',
  alternates: {
    canonical: 'https://shivi.sbs/terms',
  },
  openGraph: {
    title: 'Terms & Conditions | Shivi',
    description: 'Terms and conditions for coaching sessions, workshops, and website services at Shivi.',
    url: 'https://shivi.sbs/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div className="py-16 bg-[#FCF8FB] border-b border-[#EDE7EE]">
        <Container className="max-w-3xl">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
            Agreement &amp; Terms
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-tight mb-4">
            Terms &amp; Conditions
          </h1>
          <p className="font-sans text-sm text-[#6E6872]">
            Effective Date: January 1, 2026 | Last Updated: September 2026
          </p>
        </Container>
      </div>

      <Container className="pt-12 max-w-3xl">
        <div className="prose prose-purple max-w-none font-sans text-base text-[#4A4452] space-y-8 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing the Shivi website (<a href="https://shivi.sbs" className="text-[#9B70C7]">shivi.sbs</a>), scheduling a discovery call, or enrolling in any coaching, workshop, or assessment program with Dr. Shivani Koccher Dhand, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">2. Nature of Services</h2>
            <p>
              Shivi provides personal life coaching, career coaching, Neuro-Linguistic Programming (NLP) coaching, mindfulness practices, emotional intelligence development, and corporate workshops.
            </p>
            <p className="mt-2">
              Coaching is a partnership between coach and client designed to facilitate the creation and development of personal, professional, or business goals. Coaching requires the active participation, responsibility, and commitment of the client.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">3. Scheduling &amp; Cancellations</h2>
            <p>
              Coaching sessions and discovery consultations are scheduled by mutual agreement. To respect both client and coach schedules:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Rescheduling or cancellation requests should be communicated at least 24 hours in advance whenever possible.</li>
              <li>Punctuality is expected for all virtual and in-person sessions to ensure the full allotted time is utilized.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">4. Intellectual Property</h2>
            <p>
              All materials, assessments, text, graphics, logos, workshop slides, and original frameworks appearing on this website and in coaching programs are the intellectual property of Shivi and Dr. Shivani Koccher Dhand. Unauthorized reproduction, distribution, or commercial exploitation is prohibited without written consent.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">5. Disclaimer of Guarantees</h2>
            <p>
              While Dr. Shivani Koccher Dhand brings over 15 years of professional expertise, educational guidance, and structured tools, personal and professional outcomes depend on individual dedication, effort, and external life circumstances. No specific outcome or earnings guarantee is made or implied.
            </p>
          </section>

          <section className="pt-6 border-t border-[#EDE7EE]">
            <h2 className="font-serif text-xl font-semibold text-[#25222A] mb-2">6. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the applicable laws of India, with jurisdiction in Punjab, India.
            </p>
          </section>

          <section className="pt-6 border-t border-[#EDE7EE]">
            <h2 className="font-serif text-xl font-semibold text-[#25222A] mb-2">7. Contact Information</h2>
            <p>
              For legal inquiries or questions concerning these Terms, please reach out via our <a href="/contact" className="text-[#9B70C7] hover:underline font-medium">Contact Form</a>, email <a href="mailto:lifebloom.support@gmail.com" className="text-[#9B70C7] hover:underline font-medium">lifebloom.support@gmail.com</a>, or call <a href="tel:+916377135420" className="text-[#9B70C7] hover:underline font-medium">+91 63771 35420</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
