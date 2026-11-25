// ============================================================
// Shivi — Schema.org JSON-LD Structured Data Utilities
// Generates valid, Google-compliant schema for search engines
// ============================================================

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shivi.sbs';

export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Root Organization & Local/Professional Service Schema
 * Connects Shivi entity with Dr. Shivani Koccher Dhand
 */
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: 'Shivi',
        description: 'Empower. Transform. Grow. Life coaching, NLP, mindfulness, and personal transformation with Dr. Shivani Koccher Dhand.',
        publisher: {
          '@id': `${SITE_URL}/#organization`,
        },
        inLanguage: 'en-IN',
      },
      {
        '@type': ['ProfessionalService', 'Organization'],
        '@id': `${SITE_URL}/#organization`,
        name: 'Shivi',
        url: SITE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/icon.png`,
          caption: 'Shivi Logo',
        },
        image: `${SITE_URL}/founder.jpg`,
        email: 'lifebloom.support@gmail.com',
        telephone: '+91 63771 35420',
        description:
          'Shivi offers personalized life coaching, career coaching, NLP transformation, mindfulness, emotional intelligence, and leadership workshops founded by Dr. Shivani Koccher Dhand.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Phagwara',
          addressRegion: 'Punjab',
          addressCountry: 'IN',
        },
        founder: {
          '@id': `${SITE_URL}/#founder`,
        },
        employee: [
          {
            '@id': `${SITE_URL}/#founder`,
          },
          {
            '@id': `${SITE_URL}/#mentor-priyanka`,
          },
        ],
        areaServed: [
          {
            '@type': 'Country',
            name: 'India',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Worldwide (Online)',
          },
        ],
        knowsAbout: [
          'Life Coaching',
          'Neuro-Linguistic Programming (NLP)',
          'Mindfulness & Stress Management',
          'Emotional Intelligence (EQ)',
          'Career & Professional Coaching',
          'Executive Leadership Development',
          'Human Capital & Organizational Wellbeing',
          'Human Resource Management',
          'SHRM Certified HR Strategies',
        ],
        priceRange: '₹₹',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#founder`,
        name: 'Dr. Shivani Koccher Dhand',
        jobTitle: 'Founder, Lead Life Coach, NLP Practitioner & Human Capital Expert',
        worksFor: {
          '@id': `${SITE_URL}/#organization`,
        },
        image: `${SITE_URL}/founder.jpg`,
        url: `${SITE_URL}/mentors/dr-shivani-koccher-dhand`,
        email: 'lifebloom.support@gmail.com',
        telephone: '+91 63771 35420',
        description:
          'Dr. Shivani Koccher Dhand is a Life Coach, certified NLP Practitioner, HR & Human Capital Expert, and Educator with over 15 years of experience helping individuals and organizations unlock human potential.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Phagwara',
          addressRegion: 'Punjab',
          addressCountry: 'IN',
        },
        knowsAbout: [
          'Life Coaching',
          'Neuro-Linguistic Programming',
          'Emotional Intelligence',
          'Mindfulness',
          'Human Capital Development',
        ],
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#mentor-priyanka`,
        name: 'Dr. Priyanka Chhibber',
        jobTitle: 'Professor, COD Human Resource Management | SHRM Certified',
        worksFor: [
          {
            '@type': 'CollegeOrUniversity',
            name: 'Lovely Professional University',
            alternateName: 'LPU',
            url: 'https://www.lpu.in',
          },
          {
            '@id': `${SITE_URL}/#organization`,
          },
        ],
        image: `${SITE_URL}/priyanka-chhibber.jpg`,
        url: `${SITE_URL}/mentors/dr-priyanka-chhibber`,
        description:
          'Professor and Coordinator of Human Resource Management at Lovely Professional University (LPU). SHRM-certified mentor specializing in strategic HR, organizational behavior, talent development, and leadership.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Ludhiana',
          addressRegion: 'Punjab',
          addressCountry: 'IN',
        },
        knowsAbout: [
          'Human Resource Management',
          'SHRM Certified HR Strategies',
          'Organizational Behavior & Culture',
          'Talent & Team Development',
          'Strategic People Leadership',
        ],
      },
    ],
  };
}

/**
 * Detailed Mentor Profile Schema for Google Person & ProfilePage Rich Results
 */
export function getMentorProfileSchema(mentor: {
  slug: string;
  name: string;
  title: string;
  affiliation?: string;
  location?: string;
  image: string;
  shortBio: string;
  expertise: string[];
  credentials: string[];
}) {
  const isPriyanka = mentor.slug === 'dr-priyanka-chhibber';

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      '@id': `${SITE_URL}/mentors/${mentor.slug}#person`,
      name: mentor.name,
      jobTitle: mentor.title,
      description: mentor.shortBio,
      image: `${SITE_URL}${mentor.image}`,
      url: `${SITE_URL}/mentors/${mentor.slug}`,
      knowsAbout: mentor.expertise,
      hasCredential: mentor.credentials,
      address: {
        '@type': 'PostalAddress',
        addressLocality: mentor.location ? mentor.location.split(',')[0].trim() : 'Punjab',
        addressRegion: 'Punjab',
        addressCountry: 'IN',
      },
      worksFor: isPriyanka
        ? [
            {
              '@type': 'CollegeOrUniversity',
              name: 'Lovely Professional University',
              alternateName: 'LPU',
              url: 'https://www.lpu.in',
            },
            {
              '@type': 'Organization',
              name: 'Shivi',
              url: SITE_URL,
            },
          ]
        : {
            '@type': 'Organization',
            name: 'Shivi',
            url: SITE_URL,
          },
    },
  };
}

/**
 * ItemList Schema for the Mentor Directory on /contact
 */
export function getMentorsListSchema(mentorsList: { name: string; slug: string; title: string; image: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Expert Mentors at Shivi',
    description: 'Explore experienced mentors and book 1-on-1 personalized guidance appointments.',
    numberOfItems: mentorsList.length,
    itemListElement: mentorsList.map((m, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Person',
        name: m.name,
        jobTitle: m.title,
        url: `${SITE_URL}/mentors/${m.slug}`,
        image: `${SITE_URL}${m.image}`,
      },
    })),
  };
}

/**
 * BreadcrumbList Schema for hierarchical navigation
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item.startsWith('http') ? item.item : `${SITE_URL}${item.item}`,
    })),
  };
}

/**
 * Service Schema for individual coaching programs
 */
export function getServiceSchema(service: {
  title: string;
  shortDescription: string;
  slug: string;
  category?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.shortDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Shivi',
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India & Worldwide Online',
    },
  };
}

/**
 * FAQPage Schema for services that have frequently asked questions
 */
export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Article / BlogPosting Schema for insights
 */
export function getArticleSchema(insight: {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  readingTime?: number;
  topics?: string[];
  coverImage?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: insight.title,
    description: insight.excerpt,
    url: `${SITE_URL}/insights/${insight.slug}`,
    datePublished: insight.publishedAt,
    dateModified: insight.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Dr. Shivani Koccher Dhand',
      jobTitle: 'Life Coach & NLP Practitioner',
      url: `${SITE_URL}/about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shivi',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon.png`,
      },
    },
    image: insight.coverImage ? `${SITE_URL}${insight.coverImage}` : `${SITE_URL}/founder.jpg`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/insights/${insight.slug}`,
    },
    keywords: insight.topics?.join(', '),
  };
}
