import { services, getServiceBySlug as getMockServiceBySlug } from '@/lib/data/services';
import type { Service } from '@/types';

// ============================================================
// LifeBloom — Services API Client
// When FastAPI backend is active, switch USE_MOCK to false
// or set NEXT_PUBLIC_API_URL environment variable.
// ============================================================

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
const USE_MOCK = !process.env.NEXT_PUBLIC_API_URL;

export async function fetchServices(): Promise<Service[]> {
  if (USE_MOCK) {
    return services;
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error('Failed to fetch services');
    return await res.json();
  } catch (error) {
    console.error('API Error (fetchServices):', error);
    return services; // Fallback to mock data
  }
}

export async function fetchServiceBySlug(slug: string): Promise<Service | undefined> {
  if (USE_MOCK) {
    return getMockServiceBySlug(slug);
  }

  try {
    const res = await fetch(`${API_BASE_URL}/services/${slug}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`Failed to fetch service ${slug}`);
    return await res.json();
  } catch (error) {
    console.error(`API Error (fetchServiceBySlug ${slug}):`, error);
    return getMockServiceBySlug(slug);
  }
}
