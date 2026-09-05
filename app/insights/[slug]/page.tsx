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
    title: `${insight.title} | Shivi Insights`,
    description: insight.excerpt,
  };
}

export default async function InsightDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  return (
    <div className="pt-[80px] pb-24 bg-white">
      {/* Breadcrumb Header */}
      <div className="border-b border-[#EDE7EE] bg-[#FCF8FB]">
        <Container className="py-4">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-sm text-[#6E6872]" role="list">
              <li><Link href="/" className="hover:text-[#9B70C7] transition-colors">Home</Link></li>
              <li aria-hidden="true">›</li>
              <li><Link href="/insights" className="hover:text-[#9B70C7] transition-colors">Insights</Link></li>
              <li aria-hidden="true">›</li>
              <li className="text-[#9B70C7] font-medium truncate max-w-xs" aria-current="page">{insight.title}</li>
            </ol>
          </nav>
        </Container>
      </div>

      <Container className="pt-12">
        <div className="max-w-3xl mx-auto">
          {/* Article header */}
          <header className="mb-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {insight.topics.map((t) => (
                <Badge key={t} variant="lavender">{t}</Badge>
              ))}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-[#25222A] leading-[1.15] mb-6">
              {insight.title}
            </h1>
            <div className="flex items-center gap-4 text-sm text-[#6E6872] font-sans border-y border-[#EDE7EE] py-3">
              <span className="font-medium text-[#25222A]">Dr. Shivani Koccher Dhand</span>
              <span aria-hidden="true" className="text-[#C9A5E8]">·</span>
              <span>{new Date(insight.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span aria-hidden="true" className="text-[#C9A5E8]">·</span>
              <span>{insight.readingTime} min read</span>
            </div>
          </header>

          {/* Featured quote block - lavender gradient */}
          <div
            className="rounded-3xl p-8 md:p-10 mb-10 text-white relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, #9B70C7 0%, #C9A5E8 100%)' }}
          >
            <p className="font-serif text-xl md:text-2xl text-white leading-relaxed italic relative z-10">
              &ldquo;{insight.excerpt}&rdquo;
            </p>
          </div>

          {/* Article content placeholder */}
          <div className="prose prose-lg max-w-none font-sans text-[#6E6872] leading-relaxed">
            <p className="text-sm italic text-[#6E6872]/80 border border-dashed border-[#EDE7EE] bg-[#FCF8FB] rounded-2xl p-6 text-center">
              [Full article content to be provided by client or CMS integration]
            </p>
          </div>

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-[#EDE7EE]">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors group"
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="group-hover:-translate-x-1 transition-transform" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Insights
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
