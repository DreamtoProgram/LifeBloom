export interface BookingPayload {
  name: string;
  email: string;
  phone?: string;
  serviceSlug: string;
  preferredDate?: string;
  notes?: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export async function createBooking(data: BookingPayload): Promise<BookingResponse> {
  if (!process.env.NEXT_PUBLIC_API_URL) {
    console.log('[MOCK API] Booking created:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      success: true,
      message: 'Discovery call booking requested successfully.',
      bookingId: `bk_${Date.now()}`,
    };
  }

  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit booking');
  }

  return await res.json();
}
