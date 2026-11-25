'use client';

import { useState } from 'react';
import { createBooking, type BookingResponse } from '@/lib/api/bookings';

interface MentorBookingFormProps {
  mentorName: string;
  mentorSlug: string;
}

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  timeSlot: string;
  notes: string;
}

interface BookingFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  timeSlot?: string;
  notes?: string;
}

const TIME_SLOTS = [
  { value: '', label: 'Select your preferred time window' },
  { value: 'Morning (09:00 AM – 12:00 PM IST)', label: 'Morning (09:00 AM – 12:00 PM IST)' },
  { value: 'Afternoon (01:00 PM – 04:00 PM IST)', label: 'Afternoon (01:00 PM – 04:00 PM IST)' },
  { value: 'Evening (05:00 PM – 08:00 PM IST)', label: 'Evening (05:00 PM – 08:00 PM IST)' },
];

export function MentorBookingForm({ mentorName, mentorSlug }: MentorBookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    timeSlot: '',
    notes: '',
  });

  const [errors, setErrors] = useState<BookingFormErrors>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [confirmedBookingId, setConfirmedBookingId] = useState<string>('');

  // Today + 1 day formatted as YYYY-MM-DD for min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: BookingFormErrors = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a contact phone number.';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please provide a valid phone number (at least 8 digits).';
    }
    if (!formData.preferredDate) errs.preferredDate = 'Please select a preferred date.';
    if (!formData.timeSlot) errs.timeSlot = 'Please select a preferred time slot.';
    if (!formData.notes.trim()) {
      errs.notes = 'Please share a brief note on what you would like guidance on.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('loading');
    setResponseMessage('');

    try {
      const res: BookingResponse = await createBooking({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        mentorSlug,
        mentorName,
        preferredDate: formData.preferredDate,
        timeSlot: formData.timeSlot,
        notes: formData.notes.trim(),
        serviceSlug: `mentor-${mentorSlug}`,
      });

      if (res.success) {
        setStatus('success');
        setConfirmedBookingId(res.bookingId || `shivi_${Date.now().toString().slice(-6)}`);
        setResponseMessage(
          res.message || 'Your appointment request has been successfully recorded.'
        );
      } else {
        setStatus('error');
        setResponseMessage(res.message || 'Unable to schedule appointment. Please try again.');
      }
    } catch (err: unknown) {
      setStatus('error');
      const msg = err instanceof Error ? err.message : 'A network error occurred. Please try again.';
      setResponseMessage(msg);
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#C9A5E8]/60 shadow-xl shadow-[rgba(155,112,199,0.1)] text-center animate-fade-in-up">
        {/* Success check badge */}
        <div className="w-16 h-16 rounded-full bg-[#EEE7FA] text-[#7F55A8] flex items-center justify-center mx-auto mb-6 border border-[#C9A5E8]/40 shadow-xs">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-semibold mb-3">
          Appointment Request Received!
        </h3>
        <p className="font-sans text-sm sm:text-base text-[#6E6872] max-w-lg mx-auto leading-relaxed mb-6">
          Thank you, <strong className="text-[#25222A] font-semibold">{formData.name}</strong>. Your consultation request with <strong className="text-[#9B70C7] font-semibold">{mentorName}</strong> has been received.
        </p>

        {/* Confirmation Details Summary */}
        <div className="max-w-md mx-auto bg-[#FCF8FB] border border-[#EDE7EE] rounded-2xl p-5 mb-8 text-left space-y-2.5 font-sans text-sm">
          <div className="flex justify-between border-b border-[#EDE7EE] pb-2">
            <span className="text-[#6E6872]">Reference ID:</span>
            <span className="font-mono font-semibold text-[#25222A]">{confirmedBookingId}</span>
          </div>
          <div className="flex justify-between border-b border-[#EDE7EE] pb-2">
            <span className="text-[#6E6872]">Requested Date:</span>
            <span className="font-medium text-[#25222A]">{formData.preferredDate}</span>
          </div>
          <div className="flex justify-between border-b border-[#EDE7EE] pb-2">
            <span className="text-[#6E6872]">Time Window:</span>
            <span className="font-medium text-[#25222A]">{formData.timeSlot}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[#6E6872]">Confirmation Email:</span>
            <span className="font-medium text-[#25222A] truncate max-w-[200px]">{formData.email}</span>
          </div>
        </div>

        <p className="font-sans text-xs sm:text-sm text-[#6E6872] max-w-md mx-auto leading-relaxed mb-6">
          Our coordination team will review your discussion goals and contact you within 1–2 business days with video meeting links and session preparation notes.
        </p>

        <button
          type="button"
          onClick={() => {
            setStatus('idle');
            setFormData({
              name: '',
              email: '',
              phone: '',
              preferredDate: '',
              timeSlot: '',
              notes: '',
            });
          }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FCF8FB] hover:bg-[#F2EAF8] border border-[#C9A5E8]/60 text-[#7F55A8] font-sans text-xs sm:text-sm font-semibold transition-colors"
        >
          Book Another Session
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[28px] sm:rounded-[36px] p-6 sm:p-10 md:p-12 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] relative overflow-hidden">
      {/* Top Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#9B70C7]" aria-hidden="true" />
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#9B70C7]">
            Direct Appointment Scheduling
          </p>
        </div>
        <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#25222A] mb-2 leading-snug">
          Schedule with {mentorName}
        </h3>
        <p className="font-sans text-sm text-[#6E6872] leading-relaxed">
          Please provide your contact details, preferred consultation window, and a short note on what you would like to explore.
        </p>
      </div>

      {status === 'error' && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 font-sans text-sm" role="alert">
          {responseMessage || 'We were unable to submit your appointment request. Please check the fields and try again.'}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate aria-label={`Appointment booking form for ${mentorName}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5 mb-6">
          {/* 1. Full Name */}
          <div className="sm:col-span-1">
            <label htmlFor="booking-name" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              Your Full Name <span className="text-[#E99AB8]">*</span>
            </label>
            <input
              id="booking-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Ananya Sharma"
              className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.name ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.name && <p className="mt-1 font-sans text-xs text-red-600">{errors.name}</p>}
          </div>

          {/* 2. Email Address */}
          <div className="sm:col-span-1">
            <label htmlFor="booking-email" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              Email Address <span className="text-[#E99AB8]">*</span>
            </label>
            <input
              id="booking-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. ananya@example.com"
              className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.email ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.email && <p className="mt-1 font-sans text-xs text-red-600">{errors.email}</p>}
          </div>

          {/* 3. Phone Number */}
          <div className="sm:col-span-1">
            <label htmlFor="booking-phone" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              Phone / WhatsApp Number <span className="text-[#E99AB8]">*</span>
            </label>
            <input
              id="booking-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.phone ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.phone && <p className="mt-1 font-sans text-xs text-red-600">{errors.phone}</p>}
          </div>

          {/* 4. Preferred Date */}
          <div className="sm:col-span-1">
            <label htmlFor="booking-date" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              Preferred Date <span className="text-[#E99AB8]">*</span>
            </label>
            <input
              id="booking-date"
              name="preferredDate"
              type="date"
              min={minDateStr}
              required
              value={formData.preferredDate}
              onChange={handleChange}
              className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A]
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.preferredDate ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.preferredDate && <p className="mt-1 font-sans text-xs text-red-600">{errors.preferredDate}</p>}
          </div>

          {/* 5. Preferred Time Slot */}
          <div className="sm:col-span-2">
            <label htmlFor="booking-timeslot" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              Preferred Time Window <span className="text-[#E99AB8]">*</span>
            </label>
            <div className="relative">
              <select
                id="booking-timeslot"
                name="timeSlot"
                required
                value={formData.timeSlot}
                onChange={handleChange}
                className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A] appearance-none pr-10
                  focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all cursor-pointer
                  ${errors.timeSlot ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}
                  ${!formData.timeSlot ? 'text-[#6E6872]/60' : ''}`}
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot.value} value={slot.value} disabled={slot.value === ''}>
                    {slot.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6872]" aria-hidden="true">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.timeSlot && <p className="mt-1 font-sans text-xs text-red-600">{errors.timeSlot}</p>}
          </div>

          {/* 6. Discussion Goals / Notes */}
          <div className="sm:col-span-2">
            <label htmlFor="booking-notes" className="block font-sans text-xs font-semibold text-[#25222A] uppercase tracking-wider mb-2">
              What goals or challenges would you like guidance on? <span className="text-[#E99AB8]">*</span>
            </label>
            <textarea
              id="booking-notes"
              name="notes"
              rows={4}
              required
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tell us about your current situation, career stage, personal transitions, or questions you would like to address during the mentorship session..."
              className={`w-full bg-white border rounded-2xl px-4 py-3.5 font-sans text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all resize-none
                ${errors.notes ? 'border-red-400 bg-red-50/40' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.notes && <p className="mt-1 font-sans text-xs text-red-600">{errors.notes}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 px-6 rounded-2xl bg-[#9B70C7] hover:bg-[#865CB5] active:scale-[0.99] text-white font-sans font-semibold text-base flex items-center justify-center gap-3 shadow-md shadow-[#9B70C7]/20 hover:shadow-lg hover:shadow-[#9B70C7]/30 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          aria-busy={status === 'loading'}
        >
          {status === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Submitting Appointment Request...</span>
            </>
          ) : (
            <>
              <span>Confirm Appointment with {mentorName}</span>
              <span className="text-lg leading-none transition-transform group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>

        <p className="font-sans text-xs text-center text-[#6E6872] mt-4">
          All consultations and inquiries are treated with strict confidentiality. No payment details required.
        </p>
      </form>
    </div>
  );
}
