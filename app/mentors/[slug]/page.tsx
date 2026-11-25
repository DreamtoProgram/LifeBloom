import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mentors, getMentorBySlug } from '@/lib/data/mentors';
import { Container, AnimatedSection, LavenderDivider } from '@/components/ui';
import { MentorBookingForm } from '@/components/mentors/MentorBookingForm';
import { getBreadcrumbSchema, getMentorProfileSchema } from '@/lib/seo/schema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shivi.sbs';

export async function generateStaticParams() {
  return mentors.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);
  if (!mentor) return { title: 'Mentor Profile Not Found | Shivi' };

  const pageUrl = `${SITE_URL}/mentors/${mentor.slug}`;
  const title = `${mentor.name} — ${mentor.title}`;
  const description = `${mentor.shortBio} Book a dedicated 1-on-1 mentorship appointment with ${mentor.name} at Shivi.`;

  const isPriyanka = mentor.slug === 'dr-priyanka-chhibber';
  const keywords = isPriyanka
    ? [
        'Dr Priyanka Chhibber',
        'Priyanka Chhibber',
        'Dr Priyanka Chhibber LPU',
        'Lovely Professional University HRM',
        'COD Human Resource Management LPU',
        'SHRM certified HR mentor',
        'HR leadership mentorship India',
        'Organizational Behavior expert Ludhiana',
        'Book appointment Dr Priyanka Chhibber',
        'Shivi mentor',
      ]
    : [
        'Dr Shivani Koccher Dhand',
        'Shivani Koccher Dhand',
        'Dr Shivani Life Coach',
        'Master NLP Practitioner Punjab',
        'Life Coach Phagwara',
        'Human Capital Expert India',
        'Emotional Intelligence Coach',
        'Book appointment Dr Shivani',
        'Shivi founder',
      ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: mentor.name }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: 'profile',
      images: [
        {
          url: mentor.image,
          width: 1200,
          height: 630,
          alt: `${mentor.name} — ${mentor.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [mentor.image],
    },
  };
}

export default async function MentorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const mentor = getMentorBySlug(slug);
  if (!mentor) notFound();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Home', item: '/' },
    { name: 'Mentors', item: '/contact#mentors' },
    { name: mentor.name, item: `/mentors/${mentor.slug}` },
  ]);

  const profileSchema = getMentorProfileSchema(mentor);

  return (
    <div className="pt-[80px] bg-white">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profileSchema) }}
      />

      {/* Breadcrumbs Navigation */}
      <div className="border-b border-[#EDE7EE] bg-white">
        <Container className="py-3.5">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 font-sans text-xs sm:text-sm text-[#6E6872]" role="list">
              <li>
                <Link href="/" className="hover:text-[#9B70C7] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#C9A5E8]">›</li>
              <li>
                <Link href="/contact" className="hover:text-[#9B70C7] transition-colors">
                  Mentors &amp; Contact
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#C9A5E8]">›</li>
              <li className="text-[#9B70C7] font-medium truncate max-w-[220px] sm:max-w-none" aria-current="page">
                {mentor.name}
              </li>
            </ol>
          </nav>
        </Container>
      </div>

      {/* Hero / Profile Header Section */}
      <section
        className="py-16 sm:py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FCF8FB 0%, #F5EDF9 100%)' }}
      >
        {/* Decorative backdrop blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-40 pointer-events-none -translate-y-1/3 translate-x-1/3"
          style={{ background: 'radial-gradient(circle, #E99AB8 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-50 pointer-events-none translate-y-1/3 -translate-x-1/4"
          style={{ background: 'radial-gradient(circle, #C9A5E8 0%, transparent 70%)' }}
          aria-hidden="true"
        />

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Professional Photograph */}
            <div className="lg:col-span-5 flex justify-center">
              <AnimatedSection direction="scale" delay={50} className="relative w-full max-w-[360px] sm:max-w-[420px]">
                {/* Decorative background aura badge */}
                <div
                  className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-[#EEE7FA] border-2 border-[#C9A5E8]/60 pointer-events-none animate-pulse-soft z-0"
                  aria-hidden="true"
                />

                {/* Main Portrait Card */}
                <div className="relative z-10 rounded-3xl overflow-hidden aspect-[4/5] shadow-xl shadow-[rgba(74,52,80,0.12)] border border-[#EDE7EE] bg-white">
                  <Image
                    src={mentor.image}
                    alt={`${mentor.name} — ${mentor.title}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                    aria-hidden="true"
                  />

                  {/* Floating pill badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-[#EDE7EE] shadow-lg">
                      <p className="font-serif text-xs italic text-[#9B70C7] mb-0.5">Mentorship Focus</p>
                      <p className="font-sans text-xs sm:text-sm text-[#25222A] font-semibold leading-snug">
                        {mentor.mentorshipFocus || `${mentor.expertise[0]} & ${mentor.expertise[1]}`}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right: Mentor Identity & Overview */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="up" delay={100}>
                {/* Eyebrow + Experience */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#EEE7FA] text-[#7F55A8] border border-[#C9A5E8]/50">
                    {mentor.experience}
                  </span>
                  {mentor.isFounder && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-semibold bg-[#FBE8F0] text-[#C4637A] border border-[#E99AB8]/40">
                      Founder &amp; Lead Coach
                    </span>
                  )}
                </div>

                {/* Full Name & Designation */}
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25222A] leading-[1.15] mb-3">
                  {mentor.name}
                </h1>
                <p className="font-sans text-base sm:text-lg font-medium text-[#9B70C7] mb-2">
                  {mentor.title}
                </p>

                {(mentor.affiliation || mentor.location) && (
                  <p className="font-sans text-sm text-[#6E6872] mb-6 flex flex-wrap items-center gap-3">
                    {mentor.affiliation && (
                      <span className="font-medium text-[#25222A]">
                        {mentor.affiliation}
                      </span>
                    )}
                    {mentor.affiliation && mentor.location && (
                      <span className="text-[#C9A5E8]" aria-hidden="true">•</span>
                    )}
                    {mentor.location && (
                      <span className="flex items-center gap-1 text-[#6E6872]">
                        <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        {mentor.location}
                      </span>
                    )}
                  </p>
                )}

                <LavenderDivider className="mb-6" />

                {/* Short Bio */}
                <p className="font-sans text-base sm:text-lg text-[#6E6872] leading-relaxed mb-8">
                  {mentor.shortBio}
                </p>

                {/* Action Jump to Booking Section */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                  <a
                    href="#book-appointment"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#9B70C7] text-white font-sans text-sm font-semibold hover:bg-[#865CB5] transition-all shadow-md shadow-[#9B70C7]/20 hover:shadow-lg hover:shadow-[#9B70C7]/30 hover:-translate-y-0.5 cursor-pointer text-center"
                  >
                    <span>Book an Appointment</span>
                    <span>↓</span>
                  </a>
                  <a
                    href="#credentials"
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white hover:bg-[#FCF8FB] border border-[#EDE7EE] hover:border-[#C9A5E8] text-[#25222A] hover:text-[#9B70C7] font-sans text-sm font-semibold transition-all text-center"
                  >
                    <span>View Experience &amp; Philosophy</span>
                  </a>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </Container>
      </section>

      {/* Profile Biography & Philosophy Section */}
      <section id="credentials" className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 7 Columns: Biography, Approach & Target Audience */}
            <div className="lg:col-span-7 space-y-12">
              {/* Detailed Biography */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-[1px] w-8 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
                  <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
                    Professional Background
                  </p>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#25222A] mb-5">
                  About {mentor.name}
                </h2>
                <div className="space-y-4 font-sans text-base text-[#6E6872] leading-relaxed">
                  {mentor.fullBio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Mentoring Philosophy */}
              <div className="bg-[#FCF8FB] rounded-3xl p-7 sm:p-9 border border-[#EDE7EE]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#EEE7FA] flex items-center justify-center text-[#9B70C7]">
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.516 0c.85.493 1.508 1.333 1.508 2.316V18" />
                    </svg>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#25222A]">
                    Mentoring Philosophy &amp; Approach
                  </h3>
                </div>
                <p className="font-sans text-base text-[#25222A] italic leading-relaxed mb-4">
                  &ldquo;{mentor.philosophy}&rdquo;
                </p>
                <p className="font-sans text-sm text-[#6E6872] leading-relaxed">
                  Every interaction is grounded in high confidentiality, mutual respect, empathetic listening, and structured action steps tailored to your specific journey.
                </p>
              </div>

              {/* Who Can Benefit */}
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#25222A] mb-5">
                  Who Can Benefit From This Mentorship
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {mentor.whoCanBenefit.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-white border border-[#EDE7EE] flex items-start gap-3 hover:border-[#C9A5E8] transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-[#EEE7FA] text-[#9B70C7] flex items-center justify-center shrink-0 mt-0.5">
                        <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <span className="font-sans text-xs sm:text-sm text-[#25222A] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Expertise, Credentials, Available Formats */}
            <div className="lg:col-span-5 space-y-8">
              {/* Areas of Expertise */}
              <div className="bg-white rounded-3xl p-7 border border-[#EDE7EE] shadow-xs">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#25222A] mb-4">
                  Specializations &amp; Focus Areas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="font-sans text-xs font-medium px-3.5 py-1.5 rounded-full bg-[#EEE7FA] text-[#7F55A8] border border-[#C9A5E8]/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Verified Credentials */}
              <div className="bg-white rounded-3xl p-7 border border-[#EDE7EE] shadow-xs">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#25222A] mb-4">
                  Credentials &amp; Highlights
                </h3>
                <ul className="space-y-3 font-sans text-sm text-[#6E6872]">
                  {mentor.credentials.map((cred, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#9B70C7] font-bold text-base leading-none">•</span>
                      <span>{cred}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Session Formats */}
              <div className="bg-[#FCF8FB] rounded-3xl p-7 border border-[#EDE7EE]">
                <h3 className="font-serif text-lg sm:text-xl font-semibold text-[#25222A] mb-3">
                  Consultation Formats
                </h3>
                <div className="space-y-2.5">
                  {mentor.sessionFormats.map((format, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 font-sans text-xs sm:text-sm text-[#25222A]">
                      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{format}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Appointment Booking Section (#book-appointment) */}
      <section
        id="book-appointment"
        className="py-20 sm:py-24 scroll-mt-24"
        style={{ background: 'linear-gradient(135deg, #FBE8F0 0%, #EEE7FA 100%)' }}
      >
        <Container>
          <div className="max-w-3xl mx-auto">
            <MentorBookingForm mentorName={mentor.name} mentorSlug={mentor.slug} />
          </div>
        </Container>
      </section>

      {/* Footer Navigation Back to Mentors & Home */}
      <section className="py-12 bg-white border-t border-[#EDE7EE]">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-[#9B70C7] hover:text-[#865CB5] transition-colors"
            >
              <span>← Return to All Mentors &amp; Contact</span>
            </Link>
            <p className="font-sans text-xs text-[#6E6872]">
              Shivi Life Coaching &bull; Phagwara, Punjab, India &bull; lifebloom.support@gmail.com
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
