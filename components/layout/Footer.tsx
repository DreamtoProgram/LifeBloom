'use client';

import Link from 'next/link';
import { Container } from '@/components/ui';

// ============================================================
// Footer — Light elegant footer (replaces dark green)
// Design: Very pale blush-white with lavender accents
// ============================================================

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Who We Help', href: '/who-we-help' },
  { label: 'Insights', href: '/insights' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Contact', href: '/contact' },
];

const serviceLinks = [
  { label: 'Life Coaching', href: '/services/life-coaching' },
  { label: 'Career Coaching', href: '/services/career-professional-coaching' },
  { label: 'Mindfulness & Stress', href: '/services/mindfulness-stress-management' },
  { label: 'Emotional Intelligence', href: '/services/emotional-intelligence' },
  { label: 'NLP Transformation', href: '/services/nlp-transformation' },
  { label: 'Corporate Workshops', href: '/services/corporate-workshops' },
  { label: 'All Services', href: '/services' },
];

const resourceLinks = [
  { label: 'Insights', href: '/insights' },
  { label: 'Events & Webinars', href: '/workshops' },
  { label: 'FAQs', href: '/contact#faqs' },
  { label: 'Testimonials', href: '/#testimonials' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms' },
  { label: 'Coaching Disclaimer', href: '/coaching-disclaimer' },
  { label: 'Refund Policy', href: '/refund-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
];

export function Footer() {
  return (
    <footer className="bg-[#FCF8FB] border-t border-[#EDE7EE]" role="contentinfo">
      <Container className="pt-16 pb-8">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 mb-4" aria-label="LifeBloom — Home">
              <FooterLogoMark />
              <div>
                <div className="font-serif text-xl font-semibold leading-none text-[#25222A]">LifeBloom</div>
                <div className="text-[10px] font-sans text-[#6E6872] tracking-[0.12em] uppercase mt-0.5">
                  Empower. Transform. Grow.
                </div>
              </div>
            </Link>
            <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-6 max-w-xs">
              LifeBloom is a life coaching and personal development platform dedicated to helping individuals and organizations unlock their potential and create meaningful change.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a
                href="[INSTAGRAM URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#EDE7EE] flex items-center justify-center text-[#6E6872] hover:text-[#9B70C7] hover:border-[#C9A5E8] transition-all duration-200"
                aria-label="LifeBloom on Instagram"
              >
                <InstagramIcon />
              </a>
              <a
                href="[LINKEDIN URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#EDE7EE] flex items-center justify-center text-[#6E6872] hover:text-[#9B70C7] hover:border-[#C9A5E8] transition-all duration-200"
                aria-label="LifeBloom on LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href="[FACEBOOK URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#EDE7EE] flex items-center justify-center text-[#6E6872] hover:text-[#9B70C7] hover:border-[#C9A5E8] transition-all duration-200"
                aria-label="LifeBloom on Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="[YOUTUBE URL]"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-[#EDE7EE] flex items-center justify-center text-[#6E6872] hover:text-[#9B70C7] hover:border-[#C9A5E8] transition-all duration-200"
                aria-label="LifeBloom on YouTube"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#9B70C7] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#6E6872] hover:text-[#25222A] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#9B70C7] mb-5">
              Our Services
            </h3>
            <ul className="space-y-2.5" role="list">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#6E6872] hover:text-[#25222A] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources + Newsletter */}
          <div>
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#9B70C7] mb-5">
              Resources
            </h3>
            <ul className="space-y-2.5 mb-8" role="list">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-[#6E6872] hover:text-[#25222A] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Newsletter */}
            <h3 className="font-sans text-xs font-semibold tracking-[0.15em] uppercase text-[#9B70C7] mb-3">
              Stay Connected
            </h3>
            <p className="text-sm text-[#6E6872] mb-3 font-sans">
              Subscribe for insights, tips and updates.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex gap-2"
              aria-label="Newsletter subscription"
            >
              <label htmlFor="footer-email" className="sr-only">
                Your email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Your email"
                required
                className="flex-1 min-w-0 bg-white border border-[#EDE7EE] rounded-full px-4 py-2 text-sm text-[#25222A] placeholder:text-[#6E6872]/60 font-sans focus:outline-none focus:border-[#C9A5E8] transition-colors duration-200"
              />
              <button
                type="submit"
                className="shrink-0 w-9 h-9 rounded-full bg-[#9B70C7] flex items-center justify-center text-white hover:bg-[#865CB5] transition-colors duration-200"
                aria-label="Subscribe to newsletter"
              >
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>

        {/* Lavender divider */}
        <div className="h-[1px] bg-[#EDE7EE] mb-6" aria-hidden="true" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-[#6E6872]">
            © {new Date().getFullYear()} LifeBloom. All Rights Reserved.
          </p>
          <nav aria-label="Legal navigation">
            <ul className="flex flex-wrap items-center gap-x-4 gap-y-1 justify-center sm:justify-end" role="list">
              {legalLinks.map((link, idx) => (
                <li key={link.href} className="flex items-center gap-4">
                  {idx > 0 && (
                    <span className="text-[#C9A5E8]/60" aria-hidden="true">|</span>
                  )}
                  <Link
                    href={link.href}
                    className="font-sans text-xs text-[#6E6872] hover:text-[#9B70C7] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Container>
    </footer>
  );
}

// ============================================================
// Inline SVGs
// ============================================================

function FooterLogoMark() {
  return (
    <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#C9A5E8" strokeWidth="1.5" />
      <path d="M20 10 C14 16, 12 22, 20 30 C28 22, 26 16, 20 10z" fill="#9B70C7" opacity="0.9" />
      <path d="M13 17 Q20 12, 27 17" stroke="#E99AB8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
    </svg>
  );
}
