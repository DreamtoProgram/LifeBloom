import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { Container, AnimatedSection, FadeInStagger } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Coaching & Development Services | LifeBloom',
  description:
    "Explore LifeBloom's range of coaching and development services including life coaching, career coaching, NLP, mindfulness, emotional intelligence and corporate workshops.",
};

const categories = [
  { id: 'personal-growth', label: 'Personal Growth' },
  { id: 'career', label: 'Career' },
  { id: 'well-being', label: 'Well-being' },
  { id: 'transformation', label: 'Transformation' },
  { id: 'organizations', label: 'Organizations' },
] as const;

export default function ServicesPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      {/* Page hero header */}
      <div
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FBE8F0 50%, #EEE7FA 100%)' }}
      >
        <div
          className="absolute right-0 top-0 w-80 h-80 rounded-full opacity-40 pointer-events-none animate-float-slow"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <AnimatedSection direction="up" delay={50} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">Services</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#25222A] leading-[1.1] mb-6">
              Coaching & Development<br />
              <span className="text-[#9B70C7] italic">Programs</span>
            </h1>
            <p className="font-sans text-base text-[#6E6872] leading-relaxed">
              LifeBloom offers a thoughtfully curated range of coaching and development programs designed to support growth at every stage of life and career.
            </p>
          </AnimatedSection>
        </Container>
      </div>

      {/* Services grid */}
      <Container className="pt-16">
        <div className="space-y-16">
          {categories.map((cat) => {
            const catServices = services.filter((s) => s.category === cat.id);
            if (catServices.length === 0) return null;
            return (
              <div key={cat.id}>
                <AnimatedSection direction="up" delay={50}>
                  <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-6 border-b border-[#EDE7EE] pb-4">
                    {cat.label}
                  </h2>
                </AnimatedSection>

                <FadeInStagger staggerDelay={110} direction="up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catServices.map((service) => (
                    <article
                      key={service.slug}
                      className="group bg-white rounded-2xl p-7 border border-[#EDE7EE] card-elevate cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <h3 className="font-serif text-xl text-[#25222A] mb-3 group-hover:text-[#9B70C7] transition-colors">
                          {service.title}
                        </h3>
                        <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-6 line-clamp-3">
                          {service.shortDescription}
                        </p>
                      </div>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors group/link"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </article>
                  ))}
                </FadeInStagger>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
