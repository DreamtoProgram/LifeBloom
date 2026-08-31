import type { Metadata } from 'next';
import Link from 'next/link';
import { insights } from '@/lib/data/insights';
import { Badge, Container, AnimatedSection, FadeInStagger } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights & Thought Leadership | Shivi',
  description:
    'Explore articles, perspectives and thought leadership from Dr. Shivani Koccher Dhand on life coaching, emotional intelligence, leadership, mindfulness and human potential.',
};

export default function InsightsPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FBE8F0 50%, #EEE7FA 100%)' }}
      >
        {/* Decorative blob with gentle float */}
        <div
          className="absolute right-0 bottom-0 w-80 h-80 rounded-full opacity-40 pointer-events-none animate-float-slow"
          style={{ background: 'radial-gradient(circle, #FFFFFF 0%, transparent 70%)', transform: 'translate(30%, 30%)' }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <AnimatedSection direction="up" delay={50} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">Insights</p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#25222A] leading-[1.1] mb-6">
              Ideas That Inspire Growth
            </h1>
            <p className="font-sans text-base text-[#6E6872] leading-relaxed">
              Thought leadership, perspectives and practical ideas on life coaching, human development, emotional intelligence and the future of work.
            </p>
          </AnimatedSection>
        </Container>
      </div>

      <Container className="pt-16">
        <FadeInStagger staggerDelay={110} direction="up" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-[#EDE7EE] card-elevate cursor-pointer flex flex-col justify-between"
            >
              {/* Cover — lavender/pink gradient */}
              <div>
                <div
                  className="h-48 relative overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #C9A5E8 0%, #9B70C7 50%, #E99AB8 100%)' }}
                >
                  <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: `radial-gradient(circle at 30% 70%, #FFFFFF 0%, transparent 60%), radial-gradient(circle at 80% 20%, #FBE8F0 0%, transparent 50%)`,
                  }} />
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                    {insight.topics.slice(0, 2).map((t) => (
                      <Badge key={t} variant="soft" className="text-[10px]">{t}</Badge>
                    ))}
                  </div>
                </div>

                <div className="p-6">
                  <h2 className="font-serif text-lg text-[#25222A] leading-snug mb-3 group-hover:text-[#9B70C7] transition-colors">
                    {insight.title}
                  </h2>
                  <p className="font-sans text-sm text-[#6E6872] leading-relaxed line-clamp-3 mb-4">
                    {insight.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-0 flex items-center justify-between">
                <span className="font-sans text-xs text-[#6E6872]">{insight.readingTime} min read</span>
                <Link
                  href={`/insights/${insight.slug}`}
                  className="font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors flex items-center gap-1 group/link"
                  aria-label={`Read: ${insight.title}`}
                >
                  Read Article
                  <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover/link:translate-x-1 transition-transform" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
