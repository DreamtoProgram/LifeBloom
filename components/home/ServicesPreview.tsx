'use client';

import Link from 'next/link';
import { services } from '@/lib/data/services';
import { Container } from '@/components/ui';

// ============================================================
// ServicesPreview — 6 service cards on homepage
// ============================================================

const serviceIcons: Record<string, React.ReactNode> = {
  leaf: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 22V12M12 12C12 7 7 4 3 5c1 5 5 8 9 7zM12 12c0-5 5-8 9-7-1 5-5 8-9 7z" />
    </svg>
  ),
  briefcase: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
  heart: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  users: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    </svg>
  ),
  brain: (
    <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
};

const cardTints = [
  'bg-[#DDE8D9]/30',
  'bg-[#F8F5EE]',
  'bg-[#DDE8D9]/20',
  'bg-[#F8F5EE]',
  'bg-[#DDE8D9]/30',
  'bg-[#F8F5EE]',
];

const iconBgColors = [
  'bg-[#DDE8D9]',
  'bg-[#DDE8D9]/70',
  'bg-[#DFA77D]/15',
  'bg-[#C9A35B]/10',
  'bg-[#DDE8D9]',
  'bg-[#DDE8D9]/70',
];

export function ServicesPreview() {
  const previewServices = services.slice(0, 6);

  return (
    <section
      className="py-24 bg-[#F8F5EE]"
      aria-labelledby="services-heading"
    >
      <Container>
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-xl">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">
              What We Offer
            </p>
            <h2
              id="services-heading"
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-normal text-[#20251F] leading-[1.15] mb-4"
            >
              Coaching & Development
              <br />
              <span className="text-[#183B2A]">Programs for Every Stage of Life</span>
            </h2>
            <p className="font-sans text-base text-[#6D716A] leading-relaxed">
              LifeBloom offers a range of coaching and development programs designed to help you grow in every area of life.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors duration-200 shrink-0 group"
            aria-label="View all services"
          >
            View All Services
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              className="transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Service cards grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {previewServices.map((service, idx) => (
            <article
              key={service.slug}
              className={`group relative rounded-2xl p-7 border border-[#E5E0D8] ${cardTints[idx]}
                hover:border-[#183B2A]/20 hover:shadow-lg hover:shadow-[#183B2A]/5
                hover:-translate-y-1 transition-all duration-300 cursor-pointer`}
              role="listitem"
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-full ${iconBgColors[idx]} flex items-center justify-center text-[#183B2A] mb-5`}>
                {serviceIcons[service.icon] || serviceIcons.leaf}
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-[#20251F] mb-3 leading-snug group-hover:text-[#183B2A] transition-colors duration-200">
                {service.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-sm text-[#6D716A] leading-relaxed mb-6 line-clamp-3">
                {service.shortDescription}
              </p>

              {/* Learn more link */}
              <Link
                href={`/services/${service.slug}`}
                className="inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors duration-200 group/link"
                aria-label={`Learn more about ${service.title}`}
              >
                Learn More
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              {/* Subtle top accent bar on hover */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-[#C9A35B] rounded-b-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
