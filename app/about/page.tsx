import type { Metadata } from 'next';
import Image from 'next/image';
import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container, GoldDivider, StatCard } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About Dr. Shivani Koccher Dhand | Life Coach & NLP Practitioner',
  description:
    'Meet Dr. Shivani Koccher Dhand — Life Coach, NLP Practitioner, HR & Human Capital Expert and Educator with 15+ years of experience helping individuals and organizations unlock their human potential.',
};

export default function AboutPage() {
  return (
    <div className="pt-28 bg-[#F8F5EE]">
      {/* Hero */}
      <section className="pb-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[4/5] relative shadow-2xl shadow-[#183B2A]/10">
                <Image
                  src="/founder.jpg"
                  alt="Dr. Shivani Koccher Dhand — Life Coach and Founder of LifeBloom"
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 90vw, 50vw"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full border border-[#C9A35B]/30" aria-hidden="true" />
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border border-[#DDE8D9]" aria-hidden="true" />
            </div>

            {/* Right — Content */}
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">
                Meet Your Coach
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#20251F] leading-[1.1] mb-6">
                Helping People Unlock<br />
                <span className="text-[#183B2A] italic">Their Human Potential</span>
              </h1>
              <GoldDivider className="mb-6" />
              <div className="space-y-4 text-[#6D716A] font-sans text-base leading-relaxed mb-8">
                <p>
                  Dr. Shivani Koccher Dhand is the founder of LifeBloom and a dedicated Life Coach, NLP Practitioner, HR & Human Capital Expert, and Educator based in Phagwara, India.
                </p>
                <p>
                  With over 15 years of experience across education, human capital development and personal coaching, Dr. Shivani brings a deeply human, practical and evidence-informed approach to her work.
                </p>
                <p>
                  She founded LifeBloom with a clear mission: to help individuals and organizations unlock their potential, overcome challenges, and create lives and cultures of greater clarity, confidence and purpose.
                </p>
              </div>

              {/* Credentials list */}
              <div className="space-y-2 mb-8">
                {[
                  'Life Coach',
                  'NLP Practitioner',
                  'HR & Human Capital Expert',
                  'Educator | 15+ Years Experience',
                  'Personal & Professional Development Specialist',
                ].map((cred) => (
                  <div key={cred} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#DDE8D9] flex items-center justify-center shrink-0">
                      <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#183B2A" strokeWidth="3" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <span className="font-sans text-sm text-[#20251F] font-medium">{cred}</span>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="flex gap-8 mb-8 p-6 bg-white rounded-2xl border border-[#E5E0D8]">
                <StatCard number="15+" label="Years Experience" />
                <div className="w-[1px] bg-[#E5E0D8]" aria-hidden="true" />
                <StatCard number="1000+" label="People Targeted by 2027" />
              </div>

              <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
                Start a Conversation
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Coaching Philosophy */}
      <section className="py-24 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Coaching Philosophy</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#20251F] leading-[1.2] mb-8">
              A Human-Centered Approach to Growth
            </h2>
            <div className="space-y-4 text-[#6D716A] font-sans text-base leading-relaxed text-left">
              <p>
                Dr. Shivani believes that every person has the innate capacity to grow, change and create a more meaningful life. Her coaching philosophy is grounded in the belief that lasting transformation begins with deep self-awareness, honest reflection and purposeful action.
              </p>
              <p>
                She integrates principles from NLP, emotional intelligence development, mindfulness and human capital theory to create a holistic, personalized approach for each client.
              </p>
              <p>
                LifeBloom's coaching is a collaborative, forward-focused process — not a prescription, but a partnership. Dr. Shivani works alongside her clients to help them clarify what truly matters, identify what stands in the way, and take consistent, courageous steps towards the life they want to create.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Why LifeBloom */}
      <section className="py-24 bg-[#183B2A]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Why LifeBloom</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white leading-[1.2]">
                What Makes LifeBloom Different
              </h2>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Personalized', description: 'Every coaching relationship is tailored to you — your story, your goals, your pace.' },
                { title: 'Holistic', description: 'We look at the whole person — professional goals, personal wellbeing, values and purpose.' },
                { title: 'Evidence-Informed', description: 'Grounded in NLP, emotional intelligence research and positive psychology principles.' },
                { title: 'Human-Centered', description: 'Warm, non-judgmental, confidential and deeply focused on your growth.' },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="font-serif text-lg text-white mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-white/65 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#F8F5EE] text-center">
        <Container>
          <h2 className="font-serif text-3xl md:text-4xl text-[#20251F] mb-6">
            Ready to Begin Your Journey?
          </h2>
          <p className="font-sans text-base text-[#6D716A] mb-8 max-w-lg mx-auto">
            Take the first step. Start a conversation with Dr. Shivani today.
          </p>
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
            Start Your Journey
          </Button>
        </Container>
      </section>
    </div>
  );
}
