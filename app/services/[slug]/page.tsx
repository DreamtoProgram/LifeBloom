import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, services } from '@/lib/data/services';
import { Button, ArrowIcon } from '@/components/ui/Button';
import { Badge, Container } from '@/components/ui';

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | LifeBloom`,
    description: service.shortDescription,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="pt-28 bg-[#F8F5EE]">
      {/* Breadcrumb */}
      <div className="border-b border-[#E5E0D8] bg-white">
        <Container className="py-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-sm text-[#6D716A]" role="list">
              <li><Link href="/" className="hover:text-[#183B2A] transition-colors">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/services" className="hover:text-[#183B2A] transition-colors">Services</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[#183B2A] font-medium" aria-current="page">{service.title}</li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero */}
      <section className="py-20 bg-[#183B2A]">
        <Container>
          <div className="max-w-2xl">
            <Badge variant="gold" className="mb-6">Coaching Program</Badge>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-[1.1] mb-6">
              {service.title}
            </h1>
            <p className="font-sans text-base md:text-lg text-white/70 leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            <Button href="/contact" variant="outline" size="lg" icon={<ArrowIcon />}>
              Start Your Journey
            </Button>
          </div>
        </Container>
      </section>

      {/* Main content */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl text-[#20251F] mb-4">About This Program</h2>
                <p className="font-sans text-base text-[#6D716A] leading-relaxed">{service.fullDescription}</p>
              </div>

              {/* Highlights */}
              <div>
                <h2 className="font-serif text-2xl text-[#20251F] mb-6">What This Helps With</h2>
                <ul className="space-y-3">
                  {service.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#DDE8D9] flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="#183B2A" strokeWidth="3" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="font-sans text-sm text-[#20251F]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Who is it for */}
              <div>
                <h2 className="font-serif text-2xl text-[#20251F] mb-6">Who This Is For</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.whoIsItFor.map((item) => (
                    <div key={item} className="bg-white rounded-xl p-4 border border-[#E5E0D8] font-sans text-sm text-[#6D716A]">
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div>
                <h2 className="font-serif text-2xl text-[#20251F] mb-6">What You Can Expect</h2>
                <div className="space-y-4">
                  {service.whatToExpect.map((item, idx) => (
                    <div key={item} className="flex gap-4 items-start">
                      <div className="w-8 h-8 rounded-full bg-[#183B2A] text-white font-sans text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </div>
                      <p className="font-sans text-sm text-[#6D716A] leading-relaxed pt-1.5">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQs */}
              {service.faqs.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl text-[#20251F] mb-6">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {service.faqs.map((faq) => (
                      <div key={faq.question} className="bg-white rounded-xl p-6 border border-[#E5E0D8]">
                        <h3 className="font-sans text-sm font-semibold text-[#20251F] mb-2">{faq.question}</h3>
                        <p className="font-sans text-sm text-[#6D716A] leading-relaxed">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Disclaimer */}
              <p className="font-sans text-xs text-[#6D716A]/70 italic border-t border-[#E5E0D8] pt-6">
                Life coaching is not a substitute for medical, psychological, psychiatric, legal, financial or other professional advice or treatment. If you are experiencing a mental health condition or crisis, please consult a qualified healthcare professional.
              </p>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-[#183B2A] rounded-3xl p-8 text-white">
                  <h3 className="font-serif text-2xl mb-3">Ready to Begin?</h3>
                  <p className="font-sans text-sm text-white/70 leading-relaxed mb-6">
                    Start a conversation with Dr. Shivani to learn how this program can support your journey.
                  </p>
                  <Button href="/contact" variant="gold" size="md" fullWidth>
                    Book a Discovery Call
                  </Button>
                  <Link
                    href="/services"
                    className="block text-center font-sans text-sm text-white/60 hover:text-white mt-4 transition-colors"
                  >
                    View All Services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
