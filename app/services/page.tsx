import type { Metadata } from 'next';
import Link from 'next/link';
import { services } from '@/lib/data/services';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Coaching & Development Services',
  description:
    'Explore LifeBloom\'s range of coaching and development services including life coaching, career coaching, NLP transformation, mindfulness, emotional intelligence and corporate workshops.',
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
    <div className="pt-28 pb-24 bg-[#F8F5EE]">
      <Container>
        {/* Header */}
        <div className="max-w-2xl mb-16">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Services</p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#20251F] leading-[1.1] mb-6">
            Coaching & Development<br />
            <span className="text-[#183B2A]">Programs</span>
          </h1>
          <p className="font-sans text-base text-[#6D716A] leading-relaxed">
            LifeBloom offers a thoughtfully curated range of coaching and development programs designed to support growth at every stage of life and career.
          </p>
        </div>

        {/* Services grid */}
        <div className="space-y-16">
          {categories.map((cat) => {
            const catServices = services.filter((s) => s.category === cat.id);
            if (catServices.length === 0) return null;
            return (
              <div key={cat.id}>
                <h2 className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-6 border-b border-[#E5E0D8] pb-4">
                  {cat.label}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {catServices.map((service) => (
                    <article key={service.slug} className="group bg-white rounded-2xl p-7 border border-[#E5E0D8] hover:border-[#183B2A]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <h3 className="font-serif text-xl text-[#20251F] mb-3 group-hover:text-[#183B2A] transition-colors">
                        {service.title}
                      </h3>
                      <p className="font-sans text-sm text-[#6D716A] leading-relaxed mb-6 line-clamp-3">
                        {service.shortDescription}
                      </p>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors"
                        aria-label={`Learn more about ${service.title}`}
                      >
                        Learn More
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </Link>
                    </article>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
