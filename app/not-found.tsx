import Link from 'next/link';
import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container, LavenderDivider } from '@/components/ui';

export default function NotFound() {
  return (
    <div className="pt-[100px] pb-24 min-h-[70vh] flex items-center bg-white">
      <title>404: Page Not Found | Shivi</title>
      <meta name="robots" content="noindex, nofollow" />
      <Container className="text-center max-w-2xl mx-auto py-12">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEE7FA] border border-[#C9A5E8]/40 text-[#9B70C7] text-xs font-semibold uppercase tracking-wider mb-6">
          <span>Error 404</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#25222A] leading-tight mb-4">
          Page Not Found
        </h1>

        <LavenderDivider className="my-6" />

        <p className="font-sans text-base sm:text-lg text-[#6E6872] leading-relaxed mb-8 max-w-lg mx-auto">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find your way back.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Button href="/" variant="primary" size="lg" icon={<ArrowIcon />}>
            Return to Homepage
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Explore Coaching Services
          </Button>
        </div>

        {/* Helpful links */}
        <div className="pt-8 border-t border-[#EDE7EE]">
          <p className="font-sans text-xs uppercase tracking-widest text-[#9B70C7] font-semibold mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 font-sans text-sm text-[#4A4452]">
            <Link href="/about" className="hover:text-[#9B70C7] transition-colors">
              About Dr. Shivani
            </Link>
            <span className="text-[#C9A5E8]" aria-hidden="true">·</span>
            <Link href="/who-we-help" className="hover:text-[#9B70C7] transition-colors">
              Who We Help
            </Link>
            <span className="text-[#C9A5E8]" aria-hidden="true">·</span>
            <Link href="/insights" className="hover:text-[#9B70C7] transition-colors">
              Insights &amp; Articles
            </Link>
            <span className="text-[#C9A5E8]" aria-hidden="true">·</span>
            <Link href="/contact" className="hover:text-[#9B70C7] transition-colors">
              Contact &amp; Bookings
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
