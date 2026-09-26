import type { Metadata } from 'next';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy',
  description:
    'Learn about the cancellation, rescheduling, and refund terms for coaching programs, workshops, and consultations at Shivi.',
  alternates: {
    canonical: 'https://www.shivi.sbs/refund-policy',
  },
  openGraph: {
    title: 'Refund & Cancellation Policy | Shivi',
    description: 'Clear information regarding booking cancellations, rescheduling, and refunds at Shivi.',
    url: 'https://www.shivi.sbs/refund-policy',
  },
};

export default function RefundPolicyPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div className="py-16 bg-[#FCF8FB] border-b border-[#EDE7EE]">
        <Container className="max-w-3xl">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
            Policies &amp; Fair Dealing
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-tight mb-4">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="font-sans text-sm text-[#6E6872]">
            Effective Date: January 1, 2026 | Last Updated: September 2026
          </p>
        </Container>
      </div>

      <Container className="pt-12 max-w-3xl">
        <div className="prose prose-purple max-w-none font-sans text-base text-[#4A4452] space-y-8 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">1. One-on-One Coaching Programs</h2>
            <p>
              We strive to deliver transformative, high-value coaching experiences. Because coaching slots are reserved exclusively for each client and require tailored preparation:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Discovery Sessions:</strong> Initial exploratory consultations are offered by mutual scheduling. If you need to reschedule, please notify us at least 24 hours in advance.</li>
              <li><strong>Coaching Packages:</strong> If you enroll in a multi-session coaching program and wish to discontinue after the first session, any unused session fees may be refunded on a pro-rata basis upon written notice within 7 days of the first session.</li>
              <li><strong>Completed Sessions:</strong> Sessions that have already been conducted are non-refundable as the professional time and facilitation have been rendered.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">2. Corporate Workshops &amp; Organizational Programs</h2>
            <p>
              Corporate programs, institution workshops, and group trainings involve customized curriculum design, scheduling, and logistics:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Cancellations requested 14 days or more before the scheduled workshop date are eligible for a full refund minus any non-recoverable material preparation expenses.</li>
              <li>Rescheduling is accommodated without penalty when requested at least 7 days prior to the agreed workshop date.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">3. How to Request Assistance</h2>
            <p>
              To request a cancellation, rescheduling, or refund inquiry, please reach out directly through our <a href="/contact" className="text-[#9B70C7] hover:underline font-medium">Contact Form</a>, email our support team at <a href="mailto:lifebloom.support@gmail.com" className="text-[#9B70C7] hover:underline font-medium">lifebloom.support@gmail.com</a>, or call us at <a href="tel:+916377135420" className="text-[#9B70C7] hover:underline font-medium">+91 63771 35420</a>. We review all requests promptly, respectfully, and fairly.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
