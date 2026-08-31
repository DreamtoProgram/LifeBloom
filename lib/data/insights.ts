import type { Insight } from '@/types';

// ============================================================
// Shivi — Insights Mock Data
// Source: Client brief. Replace with GET /api/insights when backend is ready.
// ============================================================

export const insights: Insight[] = [
  {
    slug: 'human-resources-to-human-potential',
    title: 'From Human Resources to Human Potential: Reimagining HR for a World of Well-being',
    excerpt: 'In a rapidly changing world of work, the most forward-thinking organizations are shifting their focus from managing human resources to unlocking human potential. This is a fundamental reimagining of what HR can be.',
    content: '', // Full content to be provided by client or CMS
    topics: ['Future HR', 'Employee Well-being', 'Emotional Intelligence', 'Mindfulness', 'Leadership', 'Human Potential', 'Future of Work'],
    publishedAt: '2026-01-01',
    readingTime: 7,
    featured: true,
    coverImage: '/hero-bg.jpg',
  },
  {
    slug: 'building-confidence-from-within',
    title: 'Building Confidence From Within: Practical Steps for Everyday Growth',
    excerpt: 'Confidence is not something you are born with or without — it is something you build through consistent action, self-awareness, and the courage to show up even when uncertainty is present.',
    content: '',
    topics: ['Confidence', 'Personal Growth', 'Mindset', 'Self-Awareness'],
    publishedAt: '2026-01-15',
    readingTime: 5,
    featured: false,
  },
  {
    slug: 'emotional-intelligence-in-leadership',
    title: 'Why Emotional Intelligence Is the Most Underrated Leadership Skill',
    excerpt: 'Technical expertise gets you to the table. Emotional intelligence keeps you there and determines how far you go. Here\'s why EQ matters more than ever in modern leadership.',
    content: '',
    topics: ['Emotional Intelligence', 'Leadership', 'Professional Development'],
    publishedAt: '2026-02-01',
    readingTime: 6,
    featured: false,
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getFeaturedInsight(): Insight | undefined {
  return insights.find((i) => i.featured);
}
