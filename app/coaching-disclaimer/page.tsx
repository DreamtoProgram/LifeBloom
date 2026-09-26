import type { Metadata } from 'next';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Coaching Disclaimer',
  description:
    'Important coaching and wellbeing disclaimer from Shivi. Life coaching and NLP practices are forward-focused developmental frameworks, not medical or psychiatric healthcare.',
  alternates: {
    canonical: 'https://www.shivi.sbs/coaching-disclaimer',
  },
  openGraph: {
    title: 'Coaching Disclaimer | Shivi',
    description: 'Understand the scope, purpose, and professional boundaries of coaching services with Shivi.',
    url: 'https://www.shivi.sbs/coaching-disclaimer',
  },
};

export default function CoachingDisclaimerPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div className="py-16 bg-[#FCF8FB] border-b border-[#EDE7EE]">
        <Container className="max-w-3xl">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
            Professional Ethics &amp; Scope
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-tight mb-4">
            Coaching Disclaimer
          </h1>
          <p className="font-sans text-sm text-[#6E6872]">
            Transparency, Professional Standards &amp; Client Wellbeing
          </p>
        </Container>
      </div>

      <Container className="pt-12 max-w-3xl">
        <div className="prose prose-purple max-w-none font-sans text-base text-[#4A4452] space-y-8 leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#EEE7FA]/60 border border-[#C9A5E8]/40">
            <h2 className="font-serif text-xl font-semibold text-[#25222A] mb-2">Essential Notice</h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#25222A]">
              Life coaching, NLP (Neuro-Linguistic Programming), emotional intelligence training, and personal discovery assessments offered by Shivi and Dr. Shivani Koccher Dhand are designed exclusively for personal development, goal-setting, self-reflection, and career growth. They do <strong>not</strong> constitute medical, psychiatric, psychological, or clinical mental health treatment.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">1. Scope of Practice</h2>
            <p>
              Dr. Shivani Koccher Dhand operates as a professional Life Coach, certified NLP Practitioner, HR &amp; Human Capital Expert, and Educator. Coaching focuses on future goals, present actions, mindset shifts, and accountability. It is fundamentally distinct from psychotherapy or psychiatric counseling, which addresses clinical mental health disorders and psychological healing.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">2. Not a Substitute for Medical Care</h2>
            <p>
              If you are currently experiencing clinical depression, severe anxiety, trauma, substance dependency, or any medical illness, we strongly advise you to seek the care of a licensed physician, clinical psychologist, or qualified healthcare professional. Coaching may complement healthcare in appropriate situations, but can never replace it.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">3. Personal Discovery Assessment Notice</h2>
            <p>
              The 20-question Personal Discovery Assessment available on this website is an interactive self-reflection exercise intended solely to prompt thoughtful self-inquiry and provide conversation points for coaching dialogues. It does not provide any clinical diagnosis, psychological profiling, or psychometric score.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">4. Client Autonomy &amp; Decision-Making</h2>
            <p>
              As a coaching client, you maintain 100% autonomy and responsibility for all personal, financial, career, relationship, and lifestyle decisions made during or following your coaching journey. Shivi and Dr. Shivani Koccher Dhand are not liable for any outcomes arising from personal decisions made by clients.
            </p>
          </section>

          <section className="pt-6 border-t border-[#EDE7EE]">
            <p className="text-sm text-[#6E6872]">
              Have questions about whether coaching is the right fit for your situation? We encourage you to reach out via our <a href="/contact" className="text-[#9B70C7] hover:underline font-medium">Contact Form</a>, email <a href="mailto:lifebloom.support@gmail.com" className="text-[#9B70C7] hover:underline font-medium">lifebloom.support@gmail.com</a>, or call <a href="tel:+916377135420" className="text-[#9B70C7] hover:underline font-medium">+91 63771 35420</a> for an exploratory conversation.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
