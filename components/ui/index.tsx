import React from 'react';

// ============================================================
// SectionHeading — Reusable section header with eyebrow label
// Design: White/blush/lavender theme
// ============================================================

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  highlightWord?: string;
}

export function SectionHeading({
  eyebrow,
  heading,
  subheading,
  align = 'left',
  theme = 'light',
  className = '',
  highlightWord,
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  const eyebrowColor = theme === 'dark' ? 'text-[#C9A5E8]' : 'text-[#9B70C7]';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-[#25222A]';
  const subheadingColor = theme === 'dark' ? 'text-white/70' : 'text-[#6E6872]';

  const renderHeading = () => {
    if (!highlightWord) return heading;
    const parts = heading.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#9B70C7] italic">{highlightWord}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div className={`${alignClass} ${className}`}>
      {eyebrow && (
        <p className={`${eyebrowColor} text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-4`}>
          {eyebrow}
        </p>
      )}
      <h2 className={`font-serif ${headingColor} text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.15] mb-4`}>
        {renderHeading()}
      </h2>
      {subheading && (
        <p className={`${subheadingColor} font-sans text-base md:text-lg leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subheading}
        </p>
      )}
    </div>
  );
}

// ============================================================
// Container — Consistent max-width wrapper
// ============================================================

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
  const Component = Tag as React.ElementType;
  return (
    <Component className={`w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Component>
  );
}

// ============================================================
// Badge — Topic/tag chip
// ============================================================

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lavender' | 'pink' | 'purple' | 'soft' | 'sage';
  className?: string;
}

export function Badge({ children, variant = 'lavender', className = '' }: BadgeProps) {
  const variantStyles = {
    lavender: 'bg-[#EEE7FA] text-[#7F55A8] border border-[#C9A5E8]/50',
    pink:     'bg-[#FBE8F0] text-[#C4637A] border border-[#E99AB8]/40',
    purple:   'bg-[#9B70C7] text-white',
    soft:     'bg-[#FCF8FB] text-[#6E6872] border border-[#EDE7EE]',
    // kept for backwards compat
    sage:     'bg-[#EEE7FA] text-[#7F55A8] border border-[#C9A5E8]/50',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// ============================================================
// LavenderDivider — Decorative lavender accent line
// ============================================================

export function LavenderDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" />
      <div className="h-1.5 w-1.5 rounded-full bg-[#C9A5E8]" />
    </div>
  );
}

// Keep GoldDivider name as alias for backward compat
export const GoldDivider = LavenderDivider;

// ============================================================
// StatCard — For impact numbers
// ============================================================

interface StatCardProps {
  number: string;
  label: string;
  theme?: 'light' | 'dark';
}

export function StatCard({ number, label, theme = 'light' }: StatCardProps) {
  return (
    <div className="text-center">
      <div className={`font-serif text-4xl md:text-5xl font-normal mb-2 ${theme === 'dark' ? 'text-[#C9A5E8]' : 'text-[#9B70C7]'}`}>
        {number}
      </div>
      <div className={`font-sans text-sm ${theme === 'dark' ? 'text-white/70' : 'text-[#6E6872]'} leading-tight`}>
        {label}
      </div>
    </div>
  );
}

export { AnimatedSection } from './AnimatedSection';
export { FadeInStagger } from './FadeInStagger';
export { Button, ArrowIcon } from './Button';
