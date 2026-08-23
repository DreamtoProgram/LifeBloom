import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getInsightBySlug, insights } from '@/lib/data/insights';
import { Badge, Container } from '@/components/ui';
import Link from 'next/link';

export async function generateStaticParams() {
  return insights.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) return { title: 'Article Not Found' };
  return {
    title: `${insight.title} | LifeBloom Insights`,
    description: insight.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <div className="pt-28 pb-24 bg-[#F8F5EE]">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 font-sans text-sm text-[#6D716A]" role="list">
              <li><Link href="/" className="hover:text-[#183B2A] transition-colors">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/insights" className="hover:text-[#183B2A] transition-colors">Insights</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[#183B2A] font-medium truncate max-w-xs" aria-current="page">{insight.title}</li>
            </ol>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {insight.topics.map((t) => (
                <Badge key={t} variant="sage">{t}</Badge>
              ))}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#20251F] leading-[1.15] mb-6">
              {insight.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#6D716A] font-sans">
              <span>Dr. Shivani Koccher Dhand</span>
              <span aria-hidden="true">·</span>
              <span>{new Date(insight.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span aria-hidden="true">·</span>
              <span>{insight.readingTime} min read</span>
            </div>
          </header>

          {/* Featured block */}
          <div className="bg-[#183B2A] rounded-3xl p-8 md:p-12 mb-10">
            <p className="font-serif text-xl md:text-2xl text-white/90 leading-relaxed italic">
              "{insight.excerpt}"
            </p>
          </div>

          {/* Article content placeholder */}
          <div className="prose prose-lg max-w-none font-sans text-[#6D716A] leading-relaxed">
            <p className="text-sm italic text-[#6D716A]/70 border border-dashed border-[#E5E0D8] rounded-xl p-4 text-center">
              [Full article content to be provided by client or CMS integration]
            </p>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[#E5E0D8]">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#183B2A] hover:text-[#C9A35B] transition-colors"
            >
              ← Back to Insights
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
