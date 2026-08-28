'use client';

import { FadeInStagger } from '@/components/ui';

// ============================================================
// TrustStrip — Horizontal credibility bar below hero
// Design: White + lavender/pink icon palette with staggered motion
// ============================================================

const trustItems = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'bg-[#EEE7FA]',
    stat: '15+',
    label: 'Years Experience',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#E99AB8" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
    ),
    iconBg: 'bg-[#FBE8F0]',
    stat: 'Holistic',
    label: 'Approach',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    iconBg: 'bg-[#EEE7FA]',
    stat: 'Personalised',
    label: 'Coaching',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#C9A5E8" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    iconBg: 'bg-[#F7DCE8]',
    stat: 'Proven',
    label: 'Transformation',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#E99AB8" strokeWidth="1.5" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    iconBg: 'bg-[#FBE8F0]',
    stat: 'Trusted by Individuals',
    label: '& Organizations',
  },
];

export function TrustStrip() {
  return (
    <section
      className="bg-white border-y border-[#EDE7EE] py-8"
      aria-label="LifeBloom credibility highlights"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInStagger
          staggerDelay={80}
          direction="up"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start"
        >
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className={`group flex flex-col items-center text-center gap-3 cursor-default ${
                idx === 4 ? 'col-span-2 sm:col-span-1' : ''
              }`}
            >
              <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-full ${item.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-[rgba(155,112,199,0.15)] transition-all duration-300`}>
                {item.icon}
              </div>
              <div>
                <div className="font-serif text-base sm:text-lg text-[#25222A] leading-tight group-hover:text-[#9B70C7] transition-colors duration-200">{item.stat}</div>
                <div className="font-sans text-xs text-[#6E6872] leading-snug mt-0.5 max-w-[140px] mx-auto">{item.label}</div>
              </div>
            </div>
          ))}
        </FadeInStagger>
      </div>
    </section>
  );
}
