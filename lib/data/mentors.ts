export interface Mentor {
  id: string;
  slug: string;
  name: string;
  title: string;
  affiliation?: string;
  location?: string;
  experience: string;
  image: string;
  shortBio: string;
  fullBio: string[];
  expertise: string[];
  credentials: string[];
  philosophy: string;
  whoCanBenefit: string[];
  sessionFormats: string[];
  isFounder?: boolean;
}

export const mentors: Mentor[] = [
  {
    id: 'dr-shivani-koccher-dhand',
    slug: 'dr-shivani-koccher-dhand',
    name: 'Dr. Shivani Koccher Dhand',
    title: 'Founder, Lead Life Coach & Master NLP Practitioner',
    location: 'Phagwara, Punjab, India',
    experience: '15+ Years Experience',
    image: '/coach-portrait.jpg',
    isFounder: true,
    shortBio:
      'Founder and Lead Coach at Shivi specializing in deep personal transformation, certified Neuro-Linguistic Programming (NLP), emotional intelligence, and human capital growth.',
    fullBio: [
      'Dr. Shivani Koccher Dhand is the founder of Shivi and a dedicated Life Coach, certified NLP Practitioner, HR & Human Capital Expert, and Educator based in Phagwara, Punjab.',
      'With over 15 years of rich experience across education, human capital development, and personal coaching, Dr. Shivani brings a deeply human, practical, and evidence-informed approach to individual and organizational growth.',
      'She founded Shivi with a clear mission: to help individuals and teams unlock their highest human potential, overcome limiting beliefs, and create lives and workplace cultures of greater clarity, confidence, and purpose.',
    ],
    expertise: [
      'Life Coaching & Transformation',
      'Neuro-Linguistic Programming (NLP)',
      'Emotional Intelligence Development',
      'Human Capital & Leadership Growth',
      'Mindset & Resilience Coaching',
    ],
    credentials: [
      'Founder & Lead Life Coach at Shivi',
      'Certified Master NLP Practitioner',
      'HR & Human Capital Expert | 15+ Years Experience',
      'Educator & Keynote Speaker on Human Potential',
      'Phagwara, Punjab, India',
    ],
    philosophy:
      'Lasting transformation begins from within. By combining compassionate inquiry, deep self-awareness, and proven NLP methodologies, we replace limiting patterns with purposeful, courageous action.',
    whoCanBenefit: [
      'Individuals seeking clarity, confidence, and direction during major life transitions',
      'Working professionals aspiring to break through career plateaus and self-doubt',
      'Leaders looking to elevate their emotional intelligence and interpersonal impact',
      'Anyone ready to discover purpose and design an authentic, fulfilling life',
    ],
    sessionFormats: [
      '1-on-1 Virtual Coaching (Global Online via Video)',
      'In-Person Consultations (Phagwara, Punjab)',
      'Comprehensive Discovery & Transformation Programs',
    ],
  },
  {
    id: 'dr-priyanka-chhibber',
    slug: 'dr-priyanka-chhibber',
    name: 'Dr. Priyanka Chhibber',
    title: 'Professor, COD Human Resource Management | SHRM Certified',
    affiliation: 'Lovely Professional University (LPU)',
    location: 'Ludhiana, Punjab, India',
    experience: '15+ Years Experience',
    image: '/priyanka-chhibber.jpg',
    isFounder: false,
    shortBio:
      'Professor and Coordinator of Human Resource Management at Lovely Professional University (LPU). SHRM-certified mentor specializing in strategic HR, organizational behavior, and leadership.',
    fullBio: [
      'Dr. Priyanka Chhibber is a distinguished Professor and Coordinator (COD) of Human Resource Management at Lovely Professional University (LPU), Punjab.',
      'A certified professional from the Society for Human Resource Management (SHRM), she brings deep academic rigor and extensive expertise in talent management, organizational behavior, and strategic HR leadership.',
      'Dr. Chhibber mentors working professionals, managers, and aspiring leaders in developing strong managerial presence, mastering team dynamics, and successfully navigating high-impact workplace challenges.',
    ],
    expertise: [
      'Human Resource Management',
      'SHRM Certified HR Strategies',
      'Organizational Behavior & Culture',
      'Talent & Team Development',
      'Strategic People Leadership',
    ],
    credentials: [
      'Professor, Human Resource Management (LPU)',
      'COD (Curriculum & Department) HRM at LPU',
      'SHRM Certified Professional',
      '15+ Years in Academic & Professional HR Mentorship',
      'Ludhiana, Punjab, India',
    ],
    philosophy:
      'People are the cornerstone of every meaningful enterprise. Grounded in empathetic leadership and strategic HR frameworks, true mentorship empowers professionals to align their strengths with organizational and personal excellence.',
    whoCanBenefit: [
      'Professionals looking to accelerate their careers in management and HR leadership',
      'Managers and executives navigating team dynamics and organizational transitions',
      'Students and graduates building careers in Human Resources and people management',
      'Leaders aiming to foster high-performance, empathetic workplace cultures',
    ],
    sessionFormats: [
      '1-on-1 Strategic HR & Leadership Mentorship (Online Video)',
      'Career Development & Executive Advisory Consultation',
      'Academic & Organizational Guidance Sessions',
    ],
  },
];

export function getAllMentors(): Mentor[] {
  return mentors;
}

export function getMentorBySlug(slug: string): Mentor | undefined {
  return mentors.find((m) => m.slug === slug);
}
