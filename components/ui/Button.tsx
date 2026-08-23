'use client';

import React from 'react';
import Link from 'next/link';

// ============================================================
// Button — Reusable CTA component
// ============================================================

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  external?: boolean;
  'aria-label'?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  icon,
  iconPosition = 'right',
  fullWidth = false,
  external = false,
  'aria-label': ariaLabel,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2 font-sans font-semibold
    transition-all duration-300 ease-out cursor-pointer
    focus-visible:outline-2 focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm rounded-full',
    md: 'px-6 py-3 text-sm rounded-full',
    lg: 'px-8 py-4 text-base rounded-full',
  };

  const variantStyles = {
    primary: `
      bg-[#183B2A] text-white border-2 border-[#183B2A]
      hover:bg-[#315A3C] hover:border-[#315A3C]
      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#183B2A]/20
      focus-visible:outline-[#183B2A]
    `,
    secondary: `
      bg-transparent text-[#183B2A] border-2 border-[#183B2A]
      hover:bg-[#183B2A] hover:text-white
      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#183B2A]/20
      focus-visible:outline-[#183B2A]
    `,
    outline: `
      bg-transparent text-white border-2 border-white/70
      hover:bg-white hover:text-[#183B2A] hover:border-white
      hover:-translate-y-0.5
      focus-visible:outline-white
    `,
    ghost: `
      bg-transparent text-[#183B2A] border-2 border-transparent
      hover:bg-[#DDE8D9] hover:border-[#DDE8D9]
      focus-visible:outline-[#183B2A]
    `,
    gold: `
      bg-[#C9A35B] text-white border-2 border-[#C9A35B]
      hover:bg-[#b8924a] hover:border-[#b8924a]
      hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#C9A35B]/30
      focus-visible:outline-[#C9A35B]
    `,
  };

  const classes = `
    ${baseStyles}
    ${sizeStyles[size]}
    ${variantStyles[variant]}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const content = (
    <>
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {icon && iconPosition === 'left' && !loading && (
        <span className="shrink-0" aria-hidden="true">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === 'right' && !loading && (
        <span className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    const linkProps = external
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <Link
        href={href}
        className={`group ${classes}`}
        aria-label={ariaLabel}
        {...linkProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`group ${classes}`}
      aria-label={ariaLabel}
    >
      {content}
    </button>
  );
}

// Arrow icon for "Learn More" buttons
export function ArrowIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// Play icon for video buttons
export function PlayIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
