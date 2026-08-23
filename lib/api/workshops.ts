import type { Workshop } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

const mockWorkshops: Workshop[] = [
  {
    slug: 'leadership-management-development',
    title: 'Leadership & Management Development',
    description: 'Developing the mindset, communication and people skills of effective leaders and managers in modern organizations.',
    duration: 'Half-day / Full-day',
    format: 'in-person',
    targetAudience: 'Leaders, Managers & Corporate Teams',
    topics: ['Leadership', 'Communication', 'Emotional Intelligence', 'Team Dynamics'],
    featured: true,
  },
  {
    slug: 'emotional-intelligence-workplace',
    title: 'Emotional Intelligence in the Workplace',
    description: 'A practical workshop helping teams develop self-awareness, empathy, emotional regulation and interpersonal effectiveness.',
    duration: 'Half-day',
    format: 'hybrid',
    targetAudience: 'Corporate Teams & HR Professionals',
    topics: ['Emotional Intelligence', 'Self-Awareness', 'Communication'],
    featured: true,
  },
];

export async function fetchWorkshops(): Promise<Workshop[]> {
  if (USE_MOCK) {
    return mockWorkshops;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/workshops`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch workshops');
    return await res.json();
  } catch (error) {
    console.error('API Error (fetchWorkshops):', error);
    return mockWorkshops;
  }
}
