'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  phrases?: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  holdDelay?: number;
  pauseBeforeNext?: number;
  className?: string;
}

const DEFAULT_PHRASES = [
  'Discover clarity.',
  'Build confidence.',
  'Find purpose.',
  'Create a life of fulfilment.',
];

export function Typewriter({
  phrases = DEFAULT_PHRASES,
  typeSpeed = 50,
  deleteSpeed = 28,
  holdDelay = 2200,
  pauseBeforeNext = 450,
  className = '',
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [reduceMotion, setReduceMotion] = useState(false);

  const phraseIndexRef = useRef(0);
  const charIndexRef = useRef(phrases[0].length);
  const isDeletingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) {
      setReduceMotion(true);
      return;
    }

    // Wait initial delay so hero entrance animation finishes before typing cycle
    timeoutRef.current = setTimeout(() => {
      isDeletingRef.current = true;
      tick();
    }, 1800);

    function tick() {
      const currentPhrase = phrases[phraseIndexRef.current];

      if (isDeletingRef.current) {
        // Backspacing
        if (charIndexRef.current > 0) {
          charIndexRef.current -= 1;
          setDisplayText(currentPhrase.substring(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, deleteSpeed);
        } else {
          // Finished deleting current phrase -> advance to next phrase
          isDeletingRef.current = false;
          phraseIndexRef.current = (phraseIndexRef.current + 1) % phrases.length;
          timeoutRef.current = setTimeout(tick, pauseBeforeNext);
        }
      } else {
        // Typing forward
        if (charIndexRef.current < currentPhrase.length) {
          charIndexRef.current += 1;
          setDisplayText(currentPhrase.substring(0, charIndexRef.current));
          timeoutRef.current = setTimeout(tick, typeSpeed);
        } else {
          // Finished typing phrase -> hold with proper time delay for comfortable reading
          isDeletingRef.current = true;
          const currentHold = currentPhrase.length > 20 ? holdDelay + 600 : holdDelay;
          timeoutRef.current = setTimeout(tick, currentHold);
        }
      }
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [phrases, typeSpeed, deleteSpeed, holdDelay, pauseBeforeNext]);

  // Fallback for users preferring reduced motion
  if (reduceMotion) {
    return (
      <div className={className}>
        <p className="font-sans text-base sm:text-lg text-[#6E6872] leading-relaxed">
          Discover clarity. Build confidence. Find purpose.{' '}
          <br className="hidden sm:block" />
          Create a life of fulfilment.
        </p>
      </div>
    );
  }

  return (
    <div className={`min-h-[48px] sm:min-h-[56px] flex items-center ${className}`}>
      {/* Screen reader & SEO accessible complete copy */}
      <span className="sr-only">
        Discover clarity. Build confidence. Find purpose. Create a life of fulfilment.
      </span>

      {/* Visual dynamic typing effect */}
      <p
        className="font-sans text-base sm:text-lg md:text-xl text-[#25222A] font-medium leading-relaxed tracking-normal"
        aria-hidden="true"
      >
        <span>{displayText}</span>
        <span
          className="inline-block w-[2.5px] h-[1.15em] ml-1.5 bg-[#9B70C7] align-middle rounded-full animate-cursor-blink"
          style={{ verticalAlign: '-0.15em' }}
        />
      </p>
    </div>
  );
}
