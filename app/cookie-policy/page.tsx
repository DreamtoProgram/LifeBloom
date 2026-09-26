import type { Metadata } from 'next';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description:
    'Information on how Shivi uses cookies and browser storage to maintain website security, preferences, and performance.',
  alternates: {
    canonical: 'https://www.shivi.sbs/cookie-policy',
  },
  openGraph: {
    title: 'Cookie Policy | Shivi',
    description: 'Learn about cookies and local storage used across the Shivi coaching platform.',
    url: 'https://www.shivi.sbs/cookie-policy',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="pt-[80px] pb-24 bg-white">
      <div className="py-16 bg-[#FCF8FB] border-b border-[#EDE7EE]">
        <Container className="max-w-3xl">
          <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase mb-3">
            Digital Privacy
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-tight mb-4">
            Cookie Policy
          </h1>
          <p className="font-sans text-sm text-[#6E6872]">
            Effective Date: January 1, 2026 | Last Updated: September 2026
          </p>
        </Container>
      </div>

      <Container className="pt-12 max-w-3xl">
        <div className="prose prose-purple max-w-none font-sans text-base text-[#4A4452] space-y-8 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small data files placed on your device by websites you visit. They are widely used to make websites work properly, provide a secure browsing experience, and remember user preferences.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">2. How Shivi Uses Cookies &amp; Local Storage</h2>
            <p>We believe in privacy-conscious web design. We use minimal digital storage exclusively for essential and functional purposes:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li><strong>Essential Functional Cookies:</strong> Necessary for core website navigation, contact form security, and layout responsiveness.</li>
              <li><strong>Session Storage (Assessment Progress):</strong> When you complete the Personal Discovery Assessment, your step-by-step progress is temporarily kept in your browser&apos;s local session storage so you don&apos;t lose your responses if you refresh. This data remains on your local device.</li>
              <li><strong>Anonymous Performance Analytics:</strong> We may use aggregated, anonymized metrics to evaluate page loading speed and ensure our website is fast and reliable for all visitors.</li>
            </ul>
            <p className="mt-2 font-medium">We do not use invasive third-party cross-site advertising trackers or sell browsing data.</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-[#25222A] mb-3">3. Managing Your Cookies</h2>
            <p>
              Most modern web browsers allow you to control and delete cookies through browser settings. You can choose to block or delete cookies at any time. Note that blocking all cookies may affect minor interactive features such as retaining assessment state across page reloads.
            </p>
          </section>

          <section className="pt-6 border-t border-[#EDE7EE]">
            <p className="text-sm text-[#6E6872]">
              For any questions regarding our use of cookies or digital privacy, please feel free to reach out via our <a href="/contact" className="text-[#9B70C7] hover:underline font-medium">Contact Page</a> or write to us at <a href="mailto:lifebloom.support@gmail.com" className="text-[#9B70C7] hover:underline font-medium">lifebloom.support@gmail.com</a>.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
