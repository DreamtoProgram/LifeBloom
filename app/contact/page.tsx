import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { Container, AnimatedSection, LavenderDivider } from '@/components/ui';
import { mentors } from '@/lib/data/mentors';
import { MentorCard } from '@/components/mentors/MentorCard';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shivi.sbs';

export const metadata: Metadata = {
  title: 'Meet Our Expert Mentors & Book an Appointment',
  description:
    'Connect with experienced mentors and life coaches at Shivi. Explore mentor profiles, book dedicated appointments, or send an inquiry to Dr. Shivani Koccher Dhand.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Meet Our Expert Mentors & Book an Appointment | Shivi',
    description:
      'Connect with experienced mentors who understand your journey. Explore mentor profiles, schedule 1-on-1 consultations, or reach out to Shivi.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [
      {
        url: '/founder.jpg',
        width: 1200,
        height: 630,
        alt: 'Meet Our Mentors at Shivi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Meet Our Expert Mentors & Book an Appointment | Shivi',
    description: 'Explore mentor profiles and book an appointment with Dr. Shivani and our coaching mentors at Shivi.',
    images: ['/founder.jpg'],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Mentors & Contact', item: '/contact' },
  ]);

  const contactPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Mentors & Contact at Shivi',
    url: `${SITE_URL}/contact`,
    description: 'Explore expert mentors and connect with Dr. Shivani Koccher Dhand for coaching and appointment booking.',
    mainEntity: {
      '@type': 'ProfessionalService',
      name: 'Shivi',
      url: SITE_URL,
      email: 'lifebloom.support@gmail.com',
      telephone: '+91 63771 35420',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Phagwara',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
    },
  };

  const faqs = [
    {
      question: 'How do I book an appointment with a mentor?',
      answer: 'Browse our mentor profiles above and click "Book Appointment" on your preferred mentor. A dedicated profile will open in a new tab where you can select your preferred date, time window, and share what you would like to explore.',
    },
    {
      question: 'Are mentorship and coaching sessions conducted online or in person?',
      answer: 'We provide virtual 1-on-1 sessions globally via secure video link, as well as in-person consultations in Phagwara, Punjab with Dr. Shivani Koccher Dhand.',
    },
    {
      question: 'What is the "Please Answer Our Few Questions" feature in the message form?',
      answer: 'When you submit the "Send Us a Message" form, you are seamlessly guided to our 20-question Personal Discovery Assessment. It generates a personalized reflection report to help clarify your coaching goals.',
    },
    {
      question: 'Is my personal information and consultation confidential?',
      answer: 'Yes, completely. All booking inquiries, personal assessment answers, and mentoring conversations are maintained under strict professional confidentiality.',
    },
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="pt-[80px] bg-white">
      {/* Schema.org JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============================================================ */}
      {/* SECTION 1 — Hero / Introduction: Meet Our Expert Mentors */}
      {/* ============================================================ */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FCF8FB 0%, #F5EDF9 100%)' }}
      >
        {/* Soft background glow shapes */}
        <div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #FBE8F0 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-40 pointer-events-none"
          style={{ background: 'radial-gradient(circle, #EEE7FA 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <AnimatedSection direction="down" delay={50}>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-r from-transparent to-[#C9A5E8]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
                Expert Guidance &amp; Transformation
              </p>
              <div className="h-[1px] w-8 sm:w-12 bg-gradient-to-l from-transparent to-[#C9A5E8]" aria-hidden="true" />
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-[#25222A] leading-[1.15] mb-5">
              Meet Our <span className="text-[#9B70C7] italic">Expert Mentors</span>
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#6E6872] leading-relaxed max-w-2xl mx-auto mb-8">
              Connect with experienced mentors who understand your journey, guide your growth, and help you achieve your goals. Explore profiles below and reserve your dedicated session.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-[#6E6872]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#EDE7EE] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B70C7]" aria-hidden="true" />
                1-on-1 Personalized Mentoring
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#EDE7EE] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E99AB8]" aria-hidden="true" />
                Virtual &amp; In-Person Formats
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 border border-[#EDE7EE] shadow-2xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9B70C7]" aria-hidden="true" />
                Confidential &amp; Evidence-Informed
              </span>
            </div>
          </AnimatedSection>
        </Container>
      </section>

      {/* ============================================================ */}
      {/* SECTION 2 — Mentor Profiles Grid */}
      {/* ============================================================ */}
      <section id="mentors" className="py-16 sm:py-20 bg-white scroll-mt-24">
        <Container>
          <AnimatedSection direction="up" delay={100} className="mb-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-[#25222A] leading-tight mb-2">
                  Select Your Mentor &amp; Book an Appointment
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#6E6872]">
                  Click on any mentor to review their full credentials and book your preferred date and time slot in a new tab.
                </p>
              </div>
              <span className="text-xs font-sans font-medium text-[#9B70C7] bg-[#EEE7FA] px-3.5 py-1.5 rounded-full self-start sm:self-auto border border-[#C9A5E8]/40">
                {mentors.length} Mentorship Tracks Available
              </span>
            </div>
          </AnimatedSection>

          {/* Mentors Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-10">
            {mentors.map((mentor, index) => (
              <AnimatedSection key={mentor.id} direction="up" delay={100 + index * 80}>
                <MentorCard mentor={mentor} />
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Divider Accent */}
      <div className="bg-[#FCF8FB] border-t border-b border-[#EDE7EE] py-6">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="font-serif text-lg font-semibold text-[#25222A]">
                Have a general question or corporate workshop inquiry?
              </p>
              <p className="font-sans text-xs sm:text-sm text-[#6E6872]">
                You can also message us directly using the form below or take our Self-Discovery Assessment.
              </p>
            </div>
            <a
              href="#send-message"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white hover:bg-[#EEE7FA] border border-[#EDE7EE] hover:border-[#C9A5E8] text-[#9B70C7] font-sans text-xs font-semibold transition-all shrink-0 shadow-2xs"
            >
              <span>Jump to Direct Message Form</span>
              <span>↓</span>
            </a>
          </div>
        </Container>
      </div>

      {/* ============================================================ */}
      {/* SECTION 3, 4, 5 — Send Us a Message, Process & Contact Info */}
      {/* ============================================================ */}
      <section id="send-message" className="py-20 sm:py-24 bg-white scroll-mt-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* LEFT — Contact Details & What Happens Next */}
            <AnimatedSection direction="up" delay={50} className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
                    Direct Inquiry
                  </p>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#25222A] leading-[1.15] mb-4">
                  Let's Start a <span className="text-[#9B70C7] italic">Conversation</span>
                </h2>
                <p className="font-sans text-base text-[#6E6872] leading-relaxed mb-8">
                  Whether you are seeking 1-on-1 coaching, team workshops, or have questions before scheduling an appointment, our team is here to support you.
                </p>
              </div>

              {/* Section 5: Preserved Contact Details */}
              <div className="space-y-5 bg-[#FCF8FB] rounded-3xl p-6 sm:p-7 border border-[#EDE7EE]">
                <h3 className="font-serif text-lg font-semibold text-[#25222A] mb-2">
                  Official Contact Channels
                </h3>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#EEE7FA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:lifebloom.support@gmail.com" className="font-sans text-sm sm:text-base text-[#25222A] hover:text-[#9B70C7] transition-colors break-all">
                      lifebloom.support@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#FBE8F0] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#E99AB8" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Phone / WhatsApp</p>
                    <a href="tel:+916377135420" className="font-sans text-sm sm:text-base text-[#25222A] hover:text-[#9B70C7] transition-colors">
                      +91 63771 35420
                    </a>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-[#EEE7FA] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9A5E8" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Location</p>
                    <p className="font-sans text-sm sm:text-base text-[#25222A]">Phagwara, Punjab, India</p>
                  </div>
                </div>
              </div>

              {/* Section 4: Preserved 4-Step "What Happens Next" */}
              <div className="bg-[#FCF8FB] rounded-3xl p-6 sm:p-7 border border-[#EDE7EE] shadow-2xs">
                <h3 className="font-sans text-sm font-semibold text-[#9B70C7] uppercase tracking-wider mb-4">
                  What Happens Next
                </h3>
                <div className="space-y-3.5">
                  {[
                    'We review your message and get back to you within 1–2 business days.',
                    'We schedule a free discovery call to understand your goals.',
                    'We recommend the right coaching program for you.',
                    'Your journey begins.',
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-3.5 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#9B70C7] text-white font-sans text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                        {idx + 1}
                      </div>
                      <p className="font-sans text-sm text-[#6E6872] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* RIGHT — Section 3: Preserved Contact Form */}
            <AnimatedSection direction="scale" delay={150}>
              <ContactForm />
            </AnimatedSection>

          </div>

          {/* Frequently Asked Questions Section (#faqs) */}
          <div id="faqs" className="mt-24 pt-16 border-t border-[#EDE7EE] scroll-mt-24">
            <AnimatedSection direction="up" delay={50} className="max-w-2xl mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">Questions &amp; Clarity</p>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#25222A] leading-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="font-sans text-base text-[#6E6872] leading-relaxed">
                Common questions about booking an appointment, choosing the right mentor, and taking the initial discovery assessment.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, idx) => (
                <AnimatedSection
                  key={idx}
                  direction="up"
                  delay={50 + idx * 50}
                  className="bg-[#FCF8FB] rounded-2xl p-6 sm:p-8 border border-[#EDE7EE] hover:border-[#C9A5E8]/60 transition-colors"
                >
                  <h3 className="font-serif text-lg font-semibold text-[#25222A] mb-3 leading-snug">
                    {faq.question}
                  </h3>
                  <p className="font-sans text-sm text-[#6E6872] leading-relaxed">
                    {faq.answer}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
