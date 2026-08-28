'use client';

import React, { useEffect, useRef, useState } from 'react';

// ============================================================
// AnimatedSection — Scroll-reveal animation wrapper
// Smooth hardware-accelerated Apple/Linear-style transition
// Respects prefers-reduced-motion
// ============================================================

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale' | 'none';
  as?: keyof React.JSX.IntrinsicElements;
  threshold?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 750,
  direction = 'up',
  as: Tag = 'div',
  threshold = 0.12,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold]);

  // Initial hidden transform styles
  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(28px)';
      case 'down':
        return 'translateY(-28px)';
      case 'left':
        return 'translateX(28px)';
      case 'right':
        return 'translateX(-28px)';
      case 'scale':
        return 'scale(0.94) translateY(14px)';
      case 'fade':
      case 'none':
      default:
        return 'none';
    }
  };

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : getInitialTransform(),
        transitionProperty: 'opacity, transform',
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </Component>
  );
}
