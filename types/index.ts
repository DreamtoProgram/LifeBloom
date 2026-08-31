// ============================================================
// Shivi — Type Definitions
// These types mirror the expected FastAPI response shapes.
// When the backend is integrated, replace static mock data
// with API responses using these same types.
// ============================================================

export interface Service {
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // SVG path or icon name
  category: 'personal-growth' | 'career' | 'well-being' | 'transformation' | 'organizations';
  highlights: string[];
  whoIsItFor: string[];
  whatToExpect: string[];
  faqs: FAQ[];
  order: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown
  topics: string[];
  publishedAt: string; // ISO date
  readingTime: number; // minutes
  featured: boolean;
  coverImage?: string;
}

export interface Workshop {
  slug: string;
  title: string;
  description: string;
  duration: string;
  format: 'online' | 'in-person' | 'hybrid';
  targetAudience: string;
  topics: string[];
  featured: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientLabel: string; // e.g. "— Client" — DO NOT use real names without consent
  context?: string; // e.g. "Life Coaching Program"
  isPlaceholder: boolean; // Must be true until real testimonials provided
}

export interface AudienceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: string;
}

export interface Inquiry {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  message: string;
}
