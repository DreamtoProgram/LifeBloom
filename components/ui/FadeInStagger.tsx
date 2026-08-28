'use client';

import React, { useEffect, useRef, useState, Children, cloneElement, isValidElement } from 'react';

// ============================================================
// FadeInStagger — Coordinates staggered scroll reveal for child cards/elements
// ============================================================

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number; // Milliseconds between each child item (default 120ms)
  initialDelay?: number; // Base delay before stagger begins (default 0ms)
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'fade';
  threshold?: number;
  as?: keyof React.JSX.IntrinsicElements;
}

export function FadeInStagger({
  children,
  className = '',
  staggerDelay = 120,
  initialDelay = 0,
  duration = 750,
  direction = 'up',
  threshold = 0.1,
  as: Tag = 'div',
}: FadeInStaggerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(24px)';
      case 'down':
        return 'translateY(-24px)';
      case 'left':
        return 'translateX(24px)';
      case 'right':
        return 'translateX(-24px)';
      case 'scale':
        return 'scale(0.95) translateY(12px)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const Component = Tag as React.ElementType;

  return (
    <Component ref={ref} className={className}>
      {Children.map(children, (child, index) => {
        if (!isValidElement(child)) return child;

        const delay = initialDelay + index * staggerDelay;

        // Clone element with animated wrapper styles
        const existingStyle = (child.props as { style?: React.CSSProperties }).style || {};

        return cloneElement(child, {
          style: {
            ...existingStyle,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'none' : getInitialTransform(),
            transitionProperty: 'opacity, transform',
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: `${delay}ms`,
            willChange: isVisible ? 'auto' : 'opacity, transform',
          },
        } as React.HTMLAttributes<HTMLElement>);
      })}
    </Component>
  );
}
