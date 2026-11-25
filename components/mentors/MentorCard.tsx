'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Mentor } from '@/lib/data/mentors';

interface MentorCardProps {
  mentor: Mentor;
}

export function MentorCard({ mentor }: MentorCardProps) {
  return (
    <article className="group bg-white rounded-3xl border border-[#EDE7EE] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl hover:shadow-[rgba(155,112,199,0.14)] hover:border-[#C9A5E8]/70 transition-all duration-300 hover:-translate-y-1">
      {/* Prominent Portrait Image Container — Matching High-Quality Editorial Style */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#FCF8FB]">
        <Image
          src={mentor.image}
          alt={`${mentor.name} — ${mentor.title}`}
          fill
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 450px"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Soft bottom vignette gradient for contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Experience Pill Badge */}
        <div className="absolute top-3.5 left-3.5 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-sans font-semibold bg-white/95 backdrop-blur-md text-[#25222A] border border-[#EDE7EE] shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9B70C7]" aria-hidden="true" />
            {mentor.experience}
          </span>
        </div>

        {/* Role Pill Badge */}
        {mentor.isFounder ? (
          <div className="absolute top-3.5 right-3.5 z-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#9B70C7] text-white shadow-sm">
              Founder &amp; Lead Coach
            </span>
          </div>
        ) : (
          mentor.affiliation && (
            <div className="absolute top-3.5 right-3.5 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-semibold bg-white/95 backdrop-blur-md text-[#7F55A8] border border-[#EDE7EE] shadow-sm">
                {mentor.affiliation.includes('LPU') ? 'LPU Faculty & COD' : mentor.affiliation}
              </span>
            </div>
          )
        )}

        {/* Floating Mentorship Focus Card at Bottom of Photo — Exactly Matching User Reference */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 sm:p-4 shadow-lg border border-white/70">
          <p className="font-serif italic text-xs text-[#9B70C7] mb-0.5">
            Mentorship Focus
          </p>
          <p className="font-sans font-semibold text-xs sm:text-sm text-[#25222A] leading-snug">
            {mentor.mentorshipFocus || mentor.expertise[0]}
          </p>
        </div>
      </div>

      {/* Card Content & Action Area */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Mentor Name */}
          <h2 className="font-serif text-xl sm:text-2xl font-semibold text-[#25222A] leading-snug group-hover:text-[#9B70C7] transition-colors mb-1">
            {mentor.name}
          </h2>

          {/* Professional Title */}
          <p className="font-sans text-xs sm:text-[13px] font-medium text-[#9B70C7] mb-2 leading-tight">
            {mentor.title}
          </p>

          {/* Location / Affiliation metadata */}
          {mentor.location && (
            <p className="font-sans text-[11px] sm:text-xs text-[#6E6872] mb-3 flex items-center gap-1.5">
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="shrink-0 text-[#9B70C7]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <span>{mentor.location}</span>
            </p>
          )}

          {/* Short Bio (Compact 2-line clamp) */}
          <p className="font-sans text-xs sm:text-sm text-[#6E6872] leading-relaxed mb-4 line-clamp-2">
            {mentor.shortBio}
          </p>

          {/* Specialization Tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {mentor.expertise.slice(0, 3).map((item) => (
              <span
                key={item}
                className="font-sans text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#EEE7FA]/80 text-[#7F55A8] border border-[#C9A5E8]/30"
              >
                {item}
              </span>
            ))}
            {mentor.expertise.length > 3 && (
              <span className="font-sans text-[10px] font-medium px-2 py-0.5 rounded-full bg-[#FBE8F0] text-[#C4637A]">
                +{mentor.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#EDE7EE] flex items-center gap-2.5">
          <Link
            href={`/mentors/${mentor.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-xl bg-[#9B70C7] hover:bg-[#865CB5] active:scale-[0.99] text-white font-sans text-xs sm:text-sm font-semibold text-center shadow-xs hover:shadow-md hover:shadow-[#9B70C7]/20 transition-all duration-200 flex items-center justify-center gap-1.5 group/btn"
            aria-label={`Book appointment with ${mentor.name} (opens in a new tab)`}
          >
            <span>Book Appointment</span>
            <svg
              width="14"
              height="14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
              className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>

          <Link
            href={`/mentors/${mentor.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3.5 rounded-xl border border-[#EDE7EE] hover:border-[#C9A5E8] hover:bg-[#FCF8FB] text-[#25222A] hover:text-[#9B70C7] font-sans text-xs font-medium text-center transition-colors shrink-0"
            aria-label={`View ${mentor.name}'s details in a new tab`}
          >
            View Profile
          </Link>
        </div>
      </div>
    </article>
  );
}
