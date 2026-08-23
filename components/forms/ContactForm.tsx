'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/api/inquiries';

// ============================================================
// ContactForm — Ready for POST /api/inquiries integration
// ============================================================

const interestOptions = [
  { value: '', label: 'What are you interested in?' },
  { value: 'life-coaching', label: 'Life Coaching' },
  { value: 'career-coaching', label: 'Career Coaching' },
  { value: 'student-coaching', label: 'Student Coaching' },
  { value: 'corporate-workshop', label: 'Corporate Workshop' },
  { value: 'leadership-development', label: 'Leadership Development' },
  { value: 'mindfulness-stress', label: 'Mindfulness & Stress Management' },
  { value: 'nlp-transformation', label: 'NLP-Based Transformation' },
  { value: 'other', label: 'Other' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Please enter your name.';
  if (!data.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!data.interest) errors.interest = 'Please select an area of interest.';
  if (!data.message.trim()) errors.message = 'Please share a little about what you\'re looking for.';
  else if (data.message.trim().length < 20) errors.message = 'Please provide a bit more detail (at least 20 characters).';
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', interest: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setState('loading');
    try {
      await submitInquiry(formData);
      setState('success');
    } catch {
      setState('error');
    }
  };

  if (state === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-[#DDE8D9] flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#183B2A" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-[#20251F] mb-3">Thank You!</h2>
        <p className="font-sans text-base text-[#6D716A]">
          Your message has been received. We will be in touch with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact LifeBloom"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="block font-sans text-sm font-medium text-[#20251F] mb-2">
            Full Name <span className="text-[#DFA77D]" aria-label="required">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            className={`w-full bg-white border rounded-xl px-4 py-3 font-sans text-sm text-[#20251F] placeholder:text-[#6D716A]/50
              focus:outline-none focus:ring-2 focus:ring-[#183B2A]/30 focus:border-[#183B2A] transition-all
              ${errors.name ? 'border-red-400 bg-red-50' : 'border-[#E5E0D8] hover:border-[#6D716A]/40'}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="block font-sans text-sm font-medium text-[#20251F] mb-2">
            Email Address <span className="text-[#DFA77D]" aria-label="required">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className={`w-full bg-white border rounded-xl px-4 py-3 font-sans text-sm text-[#20251F] placeholder:text-[#6D716A]/50
              focus:outline-none focus:ring-2 focus:ring-[#183B2A]/30 focus:border-[#183B2A] transition-all
              ${errors.email ? 'border-red-400 bg-red-50' : 'border-[#E5E0D8] hover:border-[#6D716A]/40'}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* Phone */}
        <div>
          <label htmlFor="contact-phone" className="block font-sans text-sm font-medium text-[#20251F] mb-2">
            Phone Number <span className="text-[#6D716A]/50 font-normal">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 XXXXX XXXXX"
            className="w-full bg-white border border-[#E5E0D8] hover:border-[#6D716A]/40 rounded-xl px-4 py-3 font-sans text-sm text-[#20251F] placeholder:text-[#6D716A]/50 focus:outline-none focus:ring-2 focus:ring-[#183B2A]/30 focus:border-[#183B2A] transition-all"
          />
        </div>

        {/* Interest */}
        <div>
          <label htmlFor="contact-interest" className="block font-sans text-sm font-medium text-[#20251F] mb-2">
            Area of Interest <span className="text-[#DFA77D]" aria-label="required">*</span>
          </label>
          <select
            id="contact-interest"
            name="interest"
            required
            aria-required="true"
            aria-describedby={errors.interest ? 'interest-error' : undefined}
            aria-invalid={!!errors.interest}
            value={formData.interest}
            onChange={handleChange}
            className={`w-full bg-white border rounded-xl px-4 py-3 font-sans text-sm text-[#20251F]
              focus:outline-none focus:ring-2 focus:ring-[#183B2A]/30 focus:border-[#183B2A] transition-all cursor-pointer
              ${errors.interest ? 'border-red-400 bg-red-50' : 'border-[#E5E0D8] hover:border-[#6D716A]/40'}
              ${!formData.interest ? 'text-[#6D716A]/50' : ''}`}
          >
            {interestOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                {opt.label}
              </option>
            ))}
          </select>
          {errors.interest && (
            <p id="interest-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.interest}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div className="mb-7">
        <label htmlFor="contact-message" className="block font-sans text-sm font-medium text-[#20251F] mb-2">
          Your Message <span className="text-[#DFA77D]" aria-label="required">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us a little about what you're looking for..."
          rows={5}
          className={`w-full bg-white border rounded-xl px-4 py-3 font-sans text-sm text-[#20251F] placeholder:text-[#6D716A]/50
            focus:outline-none focus:ring-2 focus:ring-[#183B2A]/30 focus:border-[#183B2A] transition-all resize-none
            ${errors.message ? 'border-red-400 bg-red-50' : 'border-[#E5E0D8] hover:border-[#6D716A]/40'}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.message}</p>
        )}
      </div>

      {/* Error state */}
      {state === 'error' && (
        <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl" role="alert">
          <p className="font-sans text-sm text-red-700">
            Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#183B2A] text-white font-sans text-sm font-semibold
          hover:bg-[#315A3C] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#183B2A]/20
          disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none
          transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#183B2A]"
        aria-busy={state === 'loading'}
      >
        {state === 'loading' ? (
          <>
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
