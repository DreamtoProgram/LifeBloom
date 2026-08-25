import type { Metadata } from 'next';
import Link from 'next/link';
import { insights } from '@/lib/data/insights';
import { Badge, Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Insights & Thought Leadership | LifeBloom',
  description:
    'Explore articles, perspectives and thought leadership from Dr. Shivani Koccher Dhand on life coaching, emotional intelligence, leadership, mindfulness and human potential.',
};

export default function InsightsPage() {
  return (
    <div className="pt-28 pb-24 bg-[#F8F5EE]">
      <Container>
        <div className="max-w-2xl mb-16">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Insights</p>
          <h1 className="font-serif text-4xl md:text-5xl font-normal text-[#20251F] leading-[1.1] mb-6">
            Ideas That Inspire Growth
          </h1>
          <p className="font-sans text-base text-[#6D716A] leading-relaxed">
            Thought leadership, perspectives and practical ideas on life coaching, human development, emotional intelligence and the future of work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {insights.map((insight) => (
            <article
              key={insight.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-[#E5E0D8] hover:border-[#183B2A]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover */}
              <div className="h-48 bg-[#183B2A] relative overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: `radial-gradient(circle at 30% 70%, #DDE8D9 0%, transparent 60%), radial-gradient(circle at 80% 20%, #C9A35B 0%, transparent 50%)`,
                }} />
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5">
                  {insight.topics.slice(0, 2).map((t) => (
                    <Badge key={t} variant="lavender" className="text-[10px]">{t}</Badge>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h2 className="font-serif text-lg text-[#20251F] leading-snug mb-3 group-hover:text-[#183B2A] transition-colors">
                  {insight.title}
                </h2>
                <p className="font-sans text-sm text-[#6D716A] leading-relaxed line-clamp-3 mb-4">
                  {insight.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-[#6D716A]">{insight.readingTime} min read</span>
                  <Link
                    href={`/insights/${insight.slug}`}
                    className="font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors flex items-center gap-1"
                    aria-label={`Read: ${insight.title}`}
                  >
                    Read Article
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </div>
  );
}
