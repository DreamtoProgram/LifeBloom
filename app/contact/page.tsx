import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Contact | Start Your Journey with LifeBloom',
  description:
    'Get in touch with LifeBloom to start your coaching journey. Whether you are looking for life coaching, career guidance, corporate workshops or NLP — we are here to help.',
};

export default function ContactPage() {
  return (
    <div className="pt-[80px] bg-white">
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">Contact</p>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#25222A] leading-[1.1] mb-6">
                Let's Start a<br />
                <span className="text-[#9B70C7] italic">Conversation</span>
              </h1>
              <p className="font-sans text-base text-[#6E6872] leading-relaxed mb-10">
                Tell us a little about what you're looking for, and we'll help you find the right next step.
              </p>

              {/* Contact details */}
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EEE7FA] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Email</p>
                    <a href="mailto:[CLIENT EMAIL]" className="font-sans text-base text-[#25222A] hover:text-[#9B70C7] transition-colors">
                      [CLIENT EMAIL]
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FBE8F0] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#E99AB8" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Phone</p>
                    <a href="tel:[CLIENT PHONE]" className="font-sans text-base text-[#25222A] hover:text-[#9B70C7] transition-colors">
                      [CLIENT PHONE]
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#EEE7FA] flex items-center justify-center shrink-0">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#C9A5E8" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-sans text-xs font-semibold text-[#6E6872] uppercase tracking-wider mb-1">Location</p>
                    <p className="font-sans text-base text-[#25222A]">Phagwara, Punjab, India</p>
                  </div>
                </div>
              </div>

              {/* What happens next */}
              <div className="bg-[#FCF8FB] rounded-2xl p-6 border border-[#EDE7EE]">
                <h2 className="font-sans text-sm font-semibold text-[#9B70C7] mb-4">What Happens Next</h2>
                <div className="space-y-3">
                  {[
                    'We review your message and get back to you within 1–2 business days.',
                    'We schedule a free discovery call to understand your goals.',
                    'We recommend the right coaching program for you.',
                    'Your journey begins.',
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-3 items-start">
                      <div className="w-6 h-6 rounded-full bg-[#9B70C7] text-white font-sans text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="font-sans text-sm text-[#6E6872] leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white rounded-3xl p-8 md:p-10 border border-[#EDE7EE] shadow-sm shadow-[rgba(74,52,80,0.05)]">
              <h2 className="font-serif text-2xl text-[#25222A] mb-2">Send Us a Message</h2>
              <p className="font-sans text-sm text-[#6E6872] mb-8">
                All enquiries are confidential and non-committal.
              </p>
              <ContactForm />
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
