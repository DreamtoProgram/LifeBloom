import React from 'react';

// ============================================================
// SectionHeading — Reusable section header with eyebrow label
// ============================================================

interface SectionHeadingProps {
  eyebrow?: string;
  heading: string;
  subheading?: string;
  align?: 'left' | 'center' | 'right';
  theme?: 'light' | 'dark';
  className?: string;
  highlightWord?: string; // Word to highlight in gold/green
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

  const eyebrowColor = theme === 'dark' ? 'text-[#C9A35B]' : 'text-[#C9A35B]';
  const headingColor = theme === 'dark' ? 'text-white' : 'text-[#20251F]';
  const subheadingColor = theme === 'dark' ? 'text-white/70' : 'text-[#6D716A]';

  // Process heading to highlight a specific word
  const renderHeading = () => {
    if (!highlightWord) return heading;
    const parts = heading.split(highlightWord);
    return (
      <>
        {parts[0]}
        <span className="text-[#183B2A] italic">{highlightWord}</span>
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
      <h2 className={`font-serif ${headingColor} text-3xl md:text-4xl lg:text-5xl font-normal leading-[1.15] mb-4`}>
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
  variant?: 'sage' | 'gold' | 'forest' | 'ivory';
  className?: string;
}

export function Badge({ children, variant = 'sage', className = '' }: BadgeProps) {
  const variantStyles = {
    sage: 'bg-[#DDE8D9] text-[#183B2A]',
    gold: 'bg-[#C9A35B]/10 text-[#C9A35B] border border-[#C9A35B]/30',
    forest: 'bg-[#183B2A] text-white',
    ivory: 'bg-[#F8F5EE] text-[#6D716A] border border-[#E5E0D8]',
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
// GoldDivider — Decorative gold line
// ============================================================

export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 bg-[#C9A35B]" />
      <div className="h-1 w-1 rounded-full bg-[#C9A35B]" />
    </div>
  );
}

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
      <div className={`font-serif text-4xl md:text-5xl font-normal mb-2 ${theme === 'dark' ? 'text-[#C9A35B]' : 'text-[#183B2A]'}`}>
        {number}
      </div>
      <div className={`font-sans text-sm ${theme === 'dark' ? 'text-white/70' : 'text-[#6D716A]'} leading-tight`}>
        {label}
      </div>
    </div>
  );
}
