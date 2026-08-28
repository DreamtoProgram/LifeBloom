'use client';

import Link from 'next/link';
import { insights } from '@/lib/data/insights';
import { Badge, Container, AnimatedSection, FadeInStagger } from '@/components/ui';

// ============================================================
// InsightsPreview — Editorial thought leadership section with animations
// Design: White background, lavender/blush editorial cards
// ============================================================

export function InsightsPreview() {
  const featured = insights.find((i) => i.featured);
  const others = insights.filter((i) => !i.featured).slice(0, 2);

  return (
    <section
      className="py-24 bg-white"
      aria-labelledby="insights-heading"
    >
      <Container>
        {/* Section header */}
        <AnimatedSection direction="up" delay={50}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-4">
                Featured Thought Leadership
              </p>
              <h2
                id="insights-heading"
                className="font-serif text-3xl md:text-4xl font-normal text-[#25222A] leading-[1.15]"
              >
                Ideas That Inspire Growth
              </h2>
            </div>
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors duration-200 shrink-0 group"
            >
              Explore Insights
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured article — large */}
          {featured && (
            <AnimatedSection direction="up" delay={150} className="lg:col-span-2">
              <article className="group card-elevate rounded-3xl p-2 cursor-pointer">
                <Link href={`/insights/${featured.slug}`} className="block">
                  <div
                    className="rounded-2xl overflow-hidden relative aspect-[16/9] md:aspect-[2/1] mb-5 shadow-sm group-hover:shadow-md transition-shadow duration-300"
                    style={{ background: 'linear-gradient(135deg, #9B70C7 0%, #C9A5E8 60%, #E99AB8 100%)' }}
                  >
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-15">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 20% 50%, #FFFFFF 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FBE8F0 0%, transparent 40%)`,
                      }} />
                    </div>
                    <div className="absolute inset-0 flex items-end p-8">
                      <div className="max-w-lg">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featured.topics.slice(0, 3).map((topic) => (
                            <Badge key={topic} variant="soft">{topic}</Badge>
                          ))}
                        </div>
                        <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-white leading-[1.2] group-hover:text-white/90 transition-colors duration-200">
                          {featured.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-4 line-clamp-2">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs text-[#6E6872]">
                      {new Date(featured.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="text-[#EDE7EE]" aria-hidden="true">·</span>
                    <span className="font-sans text-xs text-[#6E6872]">{featured.readingTime} min read</span>
                    <span className="ml-auto font-sans text-sm font-semibold text-[#9B70C7] group-hover:text-[#865CB5] transition-colors duration-200 flex items-center gap-1">
                      Read Article
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            </AnimatedSection>
          )}

          {/* Other articles with stagger */}
          <FadeInStagger staggerDelay={120} direction="up" className="flex flex-col gap-6">
            {others.map((insight) => (
              <article
                key={insight.slug}
                className="group flex-1 bg-white rounded-2xl p-6 border border-[#EDE7EE] card-elevate cursor-pointer"
              >
                <Link href={`/insights/${insight.slug}`} className="block h-full flex flex-col">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {insight.topics.slice(0, 2).map((topic) => (
                      <Badge key={topic} variant="lavender">{topic}</Badge>
                    ))}
                  </div>
                  <h3 className="font-serif text-lg text-[#25222A] leading-snug mb-3 group-hover:text-[#9B70C7] transition-colors duration-200 flex-1">
                    {insight.title}
                  </h3>
                  <p className="font-sans text-sm text-[#6E6872] leading-relaxed line-clamp-2 mb-4">
                    {insight.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs text-[#6E6872]">{insight.readingTime} min read</span>
                    <span className="font-sans text-sm font-semibold text-[#9B70C7] group-hover:text-[#865CB5] transition-colors flex items-center gap-1">
                      Read
                      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </FadeInStagger>
        </div>
      </Container>
    </section>
  );
}
