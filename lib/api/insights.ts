import { insights, getInsightBySlug as getMockInsightBySlug } from '@/lib/data/insights';
import type { Insight } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

export async function fetchInsights(): Promise<Insight[]> {
  if (USE_MOCK) {
    return insights;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/insights`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error('Failed to fetch insights');
    return await res.json();
  } catch (error) {
    console.error('API Error (fetchInsights):', error);
    return insights;
  }
}

export async function fetchInsightBySlug(slug: string): Promise<Insight | undefined> {
  if (USE_MOCK) {
    return getMockInsightBySlug(slug);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/insights/${slug}`, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`Failed to fetch insight ${slug}`);
    return await res.json();
  } catch (error) {
    console.error(`API Error (fetchInsightBySlug ${slug}):`, error);
    return getMockInsightBySlug(slug);
  }
}
