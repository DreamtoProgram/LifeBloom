'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';

// ============================================================
// Navbar — Sticky, translucent → white on scroll
// Design: White + Lavender/Purple palette
// ============================================================

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Life Coaching', href: '/services/life-coaching' },
      { label: 'Career Coaching', href: '/services/career-professional-coaching' },
      { label: 'Mindfulness', href: '/services/mindfulness-stress-management' },
      { label: 'Emotional Intelligence', href: '/services/emotional-intelligence' },
      { label: 'Corporate Workshops', href: '/services/corporate-workshops' },
      { label: 'NLP', href: '/services/nlp-transformation' },
    ],
  },
  { label: 'Who We Help', href: '/who-we-help' },
  { label: 'Insights', href: '/insights' },
  { label: 'Workshops', href: '/workshops' },
  { label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const isHomePage = pathname === '/';

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navbarBg = scrolled || !isHomePage
    ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-[#EDE7EE]'
    : 'bg-white/80 backdrop-blur-sm';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarBg}`}
        role="banner"
      >
        <nav
          className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[72px] md:h-[80px]"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0"
            aria-label="LifeBloom — Home"
          >
            <LogoMark />
            <div>
              <div className="font-serif text-xl font-semibold leading-none tracking-tight text-[#25222A]">LifeBloom</div>
              <div className="text-[10px] font-sans text-[#6E6872] tracking-[0.12em] uppercase leading-none mt-0.5">
                Empower. Transform. Grow.
              </div>
            </div>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              if (link.children) {
                return (
                  <li key={link.href} className="relative group">
                    <button
                      className={`flex items-center gap-1 px-3 py-2 text-sm font-sans font-medium rounded-lg transition-colors duration-200
                        ${isActive ? 'text-[#9B70C7] font-semibold' : 'text-[#6E6872]'}
                        hover:text-[#9B70C7] hover:bg-[#EEE7FA]/60`}
                      aria-haspopup="true"
                      aria-expanded={servicesOpen}
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {link.label}
                      <ChevronDownIcon className="w-3.5 h-3.5" />
                    </button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <div className="bg-white rounded-2xl shadow-xl border border-[#EDE7EE] p-2 min-w-[220px]">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block px-4 py-2.5 text-sm font-sans text-[#25222A] rounded-xl hover:bg-[#EEE7FA] hover:text-[#9B70C7] transition-colors duration-150"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              }
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block px-3 py-2 text-sm font-sans font-medium rounded-lg transition-colors duration-200
                      ${isActive
                        ? 'text-[#9B70C7] font-semibold'
                        : 'text-[#6E6872] hover:text-[#9B70C7] hover:bg-[#EEE7FA]/60'
                      }`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button
              href="/contact"
              variant="primary"
              size="md"
              icon={<ArrowRightIcon />}
            >
              Start Your Journey
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 rounded-lg text-[#9B70C7] hover:bg-[#EEE7FA] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE7EE]">
            <div className="flex items-center gap-2">
              <LogoMark size="sm" />
              <span className="font-serif text-lg font-semibold text-[#25222A]">LifeBloom</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-lg text-[#9B70C7] hover:bg-[#EEE7FA]"
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Mobile nav links */}
          <nav className="px-4 py-6" aria-label="Mobile navigation">
            <ul className="space-y-1" role="list">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl font-sans text-base font-medium transition-colors
                        ${isActive
                          ? 'bg-[#9B70C7] text-white'
                          : 'text-[#25222A] hover:bg-[#EEE7FA] hover:text-[#9B70C7]'
                        }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile CTA */}
          <div className="px-4 pb-8">
            <Button href="/contact" variant="primary" size="lg" fullWidth>
              Start Your Journey
            </Button>
          </div>

          {/* Mobile contact info */}
          <div className="border-t border-[#EDE7EE] px-6 py-4">
            <p className="text-xs text-[#6E6872] font-sans mb-3">Get in touch</p>
            <a
              href="mailto:[CLIENT EMAIL]"
              className="block text-sm text-[#25222A] font-sans mb-1 hover:text-[#9B70C7] transition-colors"
            >
              [CLIENT EMAIL]
            </a>
            <a
              href="tel:[CLIENT PHONE]"
              className="block text-sm text-[#25222A] font-sans hover:text-[#9B70C7] transition-colors"
            >
              [CLIENT PHONE]
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// ============================================================
// Inline SVGs
// ============================================================

function LogoMark({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const s = size === 'sm' ? 28 : 36;
  return (
    <svg width={s} height={s} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="19" stroke="#C9A5E8" strokeWidth="1.5" />
      <path d="M20 32c0 0-10-8-10-16a10 10 0 0 1 20 0c0 8-10 16-10 16z" fill="#9B70C7" opacity="0.15" />
      <path d="M20 10 C14 16, 12 22, 20 30 C28 22, 26 16, 20 10z" fill="#9B70C7" />
      <path d="M13 17 Q20 12, 27 17" stroke="#E99AB8" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
