'use client';

import { useState } from 'react';
import { submitInquiry } from '@/lib/api/inquiries';

// ============================================================
// ContactForm — Redesigned "Send Us a Message" Card
// Matches Shivi aesthetic and reference design
// ============================================================

const interestOptions = [
  { value: '', label: 'What are you interested in?' },
  { value: 'life-coaching', label: 'Life Coaching' },
  { value: 'career-coaching', label: 'Career Coaching' },
  { value: 'student-coaching', label: 'Student Coaching' },
  { value: 'corporate-workshop', label: 'Corporate Workshop' },
  { value: 'leadership-development', label: 'Leadership Development' },
  { value: 'mindfulness-stress', label: 'Mindfulness & Stress Management' },
  { value: 'nlp', label: 'NLP' },
  { value: 'other', label: 'Other' },
];

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  interest: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  interest?: string;
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
  return errors;
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [state, setState] = useState<FormState>('idle');

  const GOOGLE_FORM_URL = 'https://forms.gle/S7A2VWbE5J7Bvamv5';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      await submitInquiry({
        ...formData,
        message: `Inquiry for ${formData.interest || 'Coaching'}. Contact request from website form.`,
      });
    } catch {
      // Continue even if local logger encounters network warning
    }

    // Open the questionnaire form in a new tab
    if (typeof window !== 'undefined') {
      window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
    }
    setState('success');
  };

  if (state === 'success') {
    return (
      <div className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] text-center py-14">
        <div className="w-16 h-16 rounded-full bg-[#FBE8F0] flex items-center justify-center mx-auto mb-6 border border-[#EDE7EE]">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#9B70C7" strokeWidth="2.2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-serif text-2xl text-[#25222A] mb-3">Thank You, {formData.name || 'Friend'}!</h3>
        <p className="font-sans text-base text-[#6E6872] max-w-md mx-auto leading-relaxed mb-6">
          Your details have been submitted. If the questionnaire didn&apos;t open automatically in a new tab, please click the button below to answer our few quick questions.
        </p>
        <div className="mb-6">
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#9B70C7] text-white font-sans text-sm font-semibold hover:bg-[#865CB5] transition-all shadow-md shadow-[#9B70C7]/25 hover:shadow-lg hover:-translate-y-0.5"
          >
            <span>Open Discovery Questionnaire</span>
            <span>→</span>
          </a>
        </div>
        <button
          onClick={() => {
            setState('idle');
            setFormData({ name: '', email: '', phone: '', interest: '' });
          }}
          className="font-sans text-xs font-semibold text-[#9B70C7] hover:text-[#865CB5] underline transition-colors"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[24px] sm:rounded-[32px] p-6 sm:p-10 md:p-12 border border-[#EDE7EE] shadow-xl shadow-[rgba(74,52,80,0.06)] transition-all">
      {/* Header with Envelope + Botanical Icon Badge */}
      <div className="flex items-center gap-3.5 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FBE8F0] flex items-center justify-center shrink-0 relative shadow-xs">
          {/* Envelope with botanical floral sprigs */}
          <svg width="26" height="26" className="sm:w-[30px] sm:h-[30px]" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            {/* Pink botanical leaves sprouting from envelope */}
            <path
              d="M19 8C20.5 6 22 5.5 24 6C23.5 8 22.5 9.5 20.5 10M20.5 10C22.5 10.5 24.5 11.5 25 13.5C23 14 21 13 20 11.5M19.5 10.5L23 7.5"
              stroke="#E99AB8"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Deep purple envelope */}
            <rect
              x="6"
              y="11"
              width="18"
              height="13"
              rx="2.5"
              stroke="#4A1E5C"
              strokeWidth="1.8"
              fill="#FFFFFF"
            />
            <path
              d="M6.5 12L15 18L23.5 12"
              stroke="#4A1E5C"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#25222A] font-normal tracking-tight leading-none">
            Send Us a Message
          </h2>
          <div className="w-10 sm:w-12 h-[2px] bg-[#E99AB8] rounded-full mt-2" aria-hidden="true" />
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-label="Send Us a Message Form">
        {/* 4 Form Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 sm:gap-y-5 mb-6 sm:mb-7">
          {/* 1. Full Name */}
          <div>
            <label htmlFor="contact-name" className="block font-sans text-sm font-semibold text-[#25222A] mb-1.5 sm:mb-2">
              Full Name <span className="text-[#E99AB8]" aria-label="required">*</span>
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
              className={`w-full bg-white border rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 font-sans text-base sm:text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.name ? 'border-red-400 bg-red-50/50' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.name && (
              <p id="name-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.name}</p>
            )}
          </div>

          {/* 2. Email Address */}
          <div>
            <label htmlFor="contact-email" className="block font-sans text-sm font-semibold text-[#25222A] mb-1.5 sm:mb-2">
              Email Address <span className="text-[#E99AB8]" aria-label="required">*</span>
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
              className={`w-full bg-white border rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 font-sans text-base sm:text-sm text-[#25222A] placeholder:text-[#6E6872]/50
                focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all
                ${errors.email ? 'border-red-400 bg-red-50/50' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}`}
            />
            {errors.email && (
              <p id="email-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.email}</p>
            )}
          </div>

          {/* 3. Phone Number (optional) */}
          <div>
            <label htmlFor="contact-phone" className="block font-sans text-sm font-semibold text-[#25222A] mb-1.5 sm:mb-2">
              Phone Number <span className="text-[#6E6872]/60 font-normal text-xs">(optional)</span>
            </label>
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full bg-white border border-[#EDE7EE] hover:border-[#C9A5E8] rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 font-sans text-base sm:text-sm text-[#25222A] placeholder:text-[#6E6872]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all"
            />
          </div>

          {/* 4. Area of Interest */}
          <div>
            <label htmlFor="contact-interest" className="block font-sans text-sm font-semibold text-[#25222A] mb-1.5 sm:mb-2">
              Area of Interest <span className="text-[#E99AB8]" aria-label="required">*</span>
            </label>
            <div className="relative">
              <select
                id="contact-interest"
                name="interest"
                required
                aria-required="true"
                aria-describedby={errors.interest ? 'interest-error' : undefined}
                aria-invalid={!!errors.interest}
                value={formData.interest}
                onChange={handleChange}
                className={`w-full bg-white border rounded-2xl px-4 sm:px-5 py-3 sm:py-3.5 font-sans text-base sm:text-sm text-[#25222A] appearance-none pr-10
                  focus:outline-none focus:ring-2 focus:ring-[#C9A5E8]/40 focus:border-[#9B70C7] transition-all cursor-pointer
                  ${errors.interest ? 'border-red-400 bg-red-50/50' : 'border-[#EDE7EE] hover:border-[#C9A5E8]'}
                  ${!formData.interest ? 'text-[#6E6872]/60' : ''}`}
              >
                {interestOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6E6872]" aria-hidden="true">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {errors.interest && (
              <p id="interest-error" className="mt-1.5 font-sans text-xs text-red-600" role="alert">{errors.interest}</p>
            )}
          </div>
        </div>

        {/* Decorative Divider with Center Botanical Leaf Sprig */}
        <div className="flex items-center justify-center gap-3 my-6 sm:my-8" aria-hidden="true">
          <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#F7DCE8] to-[#E99AB8]/40" />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E99AB8" strokeWidth="1.8" className="shrink-0">
            <path
              d="M12 21C12 16 14 13 18 11M12 17C9 15 8 12 8 8C11 8 13 9 15 12M12 13C13.5 10.5 16 9.5 19 9C19 12 17.5 14.5 15 15.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#F7DCE8] to-[#E99AB8]/40" />
        </div>

        {/* Error notification if submission failed */}
        {state === 'error' && (
          <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-2xl" role="alert">
            <p className="font-sans text-sm text-red-700">
              Something went wrong. Please check your information or try again.
            </p>
          </div>
        )}

        {/* Large Elegant CTA Button */}
        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full py-3.5 sm:py-4.5 px-4 sm:px-6 rounded-2xl bg-[#FCF8FB] hover:bg-[#F6EEFA] active:scale-[0.99] border border-[#9B70C7]/40 hover:border-[#9B70C7] text-[#6E3587] hover:text-[#521C6B] font-sans font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 sm:gap-3 shadow-xs hover:shadow-md hover:shadow-[#9B70C7]/15 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group"
          aria-busy={state === 'loading'}
        >
          {state === 'loading' ? (
            <>
              <svg className="animate-spin h-5 w-5 text-[#9B70C7]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Processing...</span>
            </>
          ) : (
            <>
              {/* Message / Chat Bubble Icon */}
              <svg
                width="18"
                height="18"
                className="sm:w-5 sm:h-5 shrink-0 text-[#6E3587] group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>

              <span className="leading-none text-xs sm:text-base truncate">Please Answer Our Few Questions</span>

              {/* Right Arrow */}
              <span className="text-base sm:text-lg font-normal leading-none group-hover:translate-x-1 transition-transform" aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
