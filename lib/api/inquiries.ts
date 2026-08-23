import type { Inquiry } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface InquiryResponse {
  success: boolean;
  message: string;
  inquiryId?: string;
}

export async function submitInquiry(data: Inquiry): Promise<InquiryResponse> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    // Simulated backend submission
    console.log('[MOCK API] Inquiry submitted:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Inquiry received successfully.',
      inquiryId: `inq_${Date.now()}`,
    };
  }

  const res = await fetch(`${API_BASE_URL}/inquiries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit inquiry');
  }

  return await res.json();
}
