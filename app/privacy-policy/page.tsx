import type { Metadata } from 'next';
import { Container, LavenderDivider } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Privacy Policy | Shivi',
  description:
    'Read Shivi’s Privacy Policy. Learn how we handle, respect, and safeguard your personal information and coaching confidentiality.',
  alternates: {
    canonical: 'https://shivi.sbs/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy | Shivi',
    description: 'Learn how Shivi collects, protects, and handles personal data and coaching communications.',
    url: 'https://shivi.sbs/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div className="py-16 bg-[#FCF8FB] border-b border-[#EDE7EE]">
        <Container className="max-w-3xl">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
            Legal &amp; Transparency
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-tight mb-4">
            Privacy Policy
          </h1>
          <p className="font-sans text-sm text-[#6E6872]">
            Effective Date: January 1, 2026 | Last Updated: September 2026
          </p>
        </Container>
      </div>

      <Container className="pt-12 max-w-3xl">
        <div className="prose prose-purple max-w-none font-sans text-base text-[#4A4452] space-y-8 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">1. Our Commitment to Your Privacy</h2>
            <p>
              At Shivi (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;), founded by Dr. Shivani Koccher Dhand, we recognize that personal and professional growth requires deep trust. We are strictly committed to safeguarding the privacy and confidentiality of our clients, website visitors, and community members.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">2. Information We Collect</h2>
            <p>We only collect personal information that is necessary to deliver our services, communicate with you, and process your requests:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and location when you submit an inquiry or schedule a discovery session.</li>
              <li><strong>Self-Assessment Responses:</strong> Answers submitted voluntarily during self-reflection tools (such as the Personal Discovery Assessment) to generate personalized insights.</li>
              <li><strong>Session Communications:</strong> Notes and correspondence shared during coaching or consultation programs, treated with the highest standard of professional confidentiality.</li>
              <li><strong>Technical Data:</strong> Non-personally identifiable technical information such as browser type, operating system, and anonymized site analytics to ensure website security and performance.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">3. How We Use Your Information</h2>
            <p>Your information is used solely to:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Respond to your direct inquiries and consultation bookings.</li>
              <li>Provide personalized life coaching, NLP transformation, mindfulness, and corporate workshop programs.</li>
              <li>Generate personal reflection summaries requested by you.</li>
              <li>Maintain website integrity, security, and administrative compliance.</li>
            </ul>
            <p className="mt-2 font-medium">We do not sell, rent, trade, or share your personal information with third parties for commercial advertising purposes.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">4. Confidentiality of Coaching Sessions</h2>
            <p>
              All personal disclosures, conversations, goals, and reflections shared between a client and Dr. Shivani Koccher Dhand are held in strict professional confidence, in adherence to established coaching ethics, except where disclosure is required by law.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">5. Data Security &amp; Storage</h2>
            <p>
              We implement industry-standard administrative, technical, and physical security measures to protect your personal data against unauthorized access, alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of your personal data at any time. To exercise these rights or ask any questions regarding our privacy practices, please contact us via our official contact page.
            </p>
          </section>

          <section className="pt-6 border-t border-[#EDE7EE]">
            <h2 className="font-serif text-xl font-semibold text-[#25222A] mb-2">7. Contact Information</h2>
            <p>
              For privacy-related inquiries, please reach out through our <a href="/contact" className="text-[#9B70C7] hover:underline font-medium">Contact Page</a>, email us directly at <a href="mailto:lifebloom.support@gmail.com" className="text-[#9B70C7] hover:underline font-medium">lifebloom.support@gmail.com</a>, or call <a href="tel:+916377135420" className="text-[#9B70C7] hover:underline font-medium">+91 63771 35420</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
