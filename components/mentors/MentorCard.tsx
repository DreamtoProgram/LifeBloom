'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Mentor } from '@/lib/data/mentors';

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <article className="group bg-white rounded-[28px] border border-[#EDE7EE] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-[rgba(155,112,199,0.12)] transition-all duration-300 hover:-translate-y-1">
      {/* Top Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-[#FCF8FB]">
        <Image
          src={mentor.image}
          alt={`${mentor.name} — ${mentor.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Soft gradient overlay at bottom of photo */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
          aria-hidden="true"
        />

        {/* Experience Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-white/95 backdrop-blur-md text-[#6E3587] border border-[#EDE7EE] shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B70C7]" aria-hidden="true" />
            {mentor.experience}
          </span>
        </div>

        {/* Founder Tag if applicable */}
        {mentor.isFounder && (
          <div className="absolute top-4 right-4 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#9B70C7] text-white shadow-xs">
              Lead Coach &amp; Founder
            </span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Mentor Name & Designation */}
          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#25222A] leading-snug group-hover:text-[#9B70C7] transition-colors mb-1.5">
            {mentor.name}
          </h3>
          <p className="font-sans text-xs sm:text-sm font-medium text-[#9B70C7] mb-3.5 leading-normal">
            {mentor.title}
          </p>

          {/* Short Intro */}
          <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-5 line-clamp-3">
            {mentor.shortBio}
          </p>

          {/* Key Specializations / Tags */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
            {mentor.expertise.slice(0, 3).map((item) => (
              <span
                key={item}
                className="font-sans text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-full bg-[#EEE7FA]/80 text-[#7F55A8] border border-[#C9A5E8]/30"
              >
                {item}
              </span>
            ))}
            {mentor.expertise.length > 3 && (
              <span className="font-sans text-[11px] sm:text-xs font-medium px-2 py-1 rounded-full bg-[#FBE8F0] text-[#C4637A]">
                +{mentor.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#EDE7EE] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href={`/mentors/${mentor.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-5 rounded-2xl bg-[#9B70C7] hover:bg-[#865CB5] active:scale-[0.99] text-white font-sans text-sm font-semibold text-center shadow-md shadow-[#9B70C7]/20 hover:shadow-lg hover:shadow-[#9B70C7]/30 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
            aria-label={`Book appointment with ${mentor.name} (opens in a new tab)`}
          >
            <span>Book Appointment</span>
            <svg
              width="15"
              height="15"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href={`/mentors/${mentor.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-4 rounded-2xl border border-[#EDE7EE] hover:border-[#C9A5E8] hover:bg-[#FCF8FB] text-[#25222A] hover:text-[#9B70C7] font-sans text-xs font-semibold text-center transition-colors"
            aria-label={`View ${mentor.name}'s full profile in a new tab`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
