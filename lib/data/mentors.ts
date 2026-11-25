export interface Mentor {
  id: string;
  slug: string;
  name: string;
  title: string;
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
    experience: '15+ Years Experience',
    image: '/coach-portrait.jpg',
    isFounder: true,
    shortBio:
      'Lead Coach at Shivi specializing in deep personal transformation, certified Neuro-Linguistic Programming (NLP), and emotional intelligence development.',
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
      'HR & Human Capital Expert | 15+ Years',
      'Educator & Keynote Speaker on Human Potential',
      'Personal & Professional Development Specialist',
    ],
    philosophy:
      'Lasting transformation begins from within. By combining compassionate inquiry, self-awareness, and proven NLP methodologies, we replace limiting patterns with purposeful, courageous action.',
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
    id: 'leadership-executive-mentor',
    slug: 'leadership-executive-mentor',
    name: 'Executive & Career Mentorship Track',
    title: 'Senior Career Strategy & Leadership Mentor',
    experience: '12+ Years Experience',
    image: '/audience-leaders.jpg',
    shortBio:
      'Specialized mentorship helping emerging managers, senior executives, and professionals navigate corporate transitions and build authentic leadership presence.',
    fullBio: [
      'Our Executive & Career Mentorship Track provides strategic advisory and individualized coaching for professionals navigating high-stakes workplace environments.',
      'Designed to bridge the gap between technical expertise and human leadership, this mentorship guides you through organizational complexity, strategic communication, and executive presence.',
      'Whether you are stepping into a higher management role or redefining your professional path, you receive structured, confidential, and actionable guidance.',
    ],
    expertise: [
      'Executive Presence & Influence',
      'Strategic Career Transitions',
      'Workplace Conflict & Team Dynamics',
      'Confidence in High-Stakes Communication',
      'Performance & Boundary Management',
    ],
    credentials: [
      'Corporate Leadership Advisory Experience',
      'Organizational Behavior & Team Dynamics Background',
      '12+ Years Coaching Mid & Senior-Level Professionals',
      'Specialized Frameworks in Career Acceleration',
    ],
    philosophy:
      'Leadership is an internal posture before it is an external title. True executive growth comes from mastering emotional composure, strategic focus, and authentic interpersonal connection.',
    whoCanBenefit: [
      'Mid-level managers preparing for director or executive leadership responsibilities',
      'Corporate professionals facing workplace burnout, friction, or stagnant career trajectories',
      'Entrepreneurs and founders needing high-level strategic sounding boards',
      'Professionals aiming to communicate with confidence and gravitas',
    ],
    sessionFormats: [
      'Executive Discovery Intensive (60–90 min)',
      'Ongoing Bi-Weekly Leadership Advisory',
      'Corporate Workshop & Team Development Consultations',
    ],
  },
  {
    id: 'mindfulness-wellbeing-mentor',
    slug: 'mindfulness-wellbeing-mentor',
    name: 'Mindfulness & Wellbeing Mentorship Track',
    title: 'Holistic Stress Resilience & Life Balance Mentor',
    experience: '10+ Years Experience',
    image: '/audience-professionals.jpg',
    shortBio:
      'Specializing in mindfulness integration, nervous system regulation, stress management, and restoring mental clarity for sustained personal well-being.',
    fullBio: [
      'Our Mindfulness & Wellbeing Mentorship Track empowers individuals to step out of chronic stress, anxiety, and overwhelm into grounded calm and mental clarity.',
      'Drawing upon proven mindfulness traditions, cognitive reframing, and stress resilience science, sessions offer practical, repeatable tools for everyday balance.',
      'Clients learn to cultivate deep presence, calm active minds, and build sustainable routines that protect mental and physical health in demanding worlds.',
    ],
    expertise: [
      'Mindfulness & Daily Presence',
      'Chronic Stress Reduction & Resilience',
      'Emotional Self-Regulation',
      'Work-Life Harmony & Energy Management',
      'Burnout Recovery & Prevention',
    ],
    credentials: [
      'Mindfulness & Stress Management Specialist',
      '10+ Years Dedicated Holistic Coaching Experience',
      'Integrative Well-Being & Nervous System Reset Facilitator',
      'Experienced in Individual & Group Mindfulness Programs',
    ],
    philosophy:
      'Peace is not the absence of external pressure; it is the presence of an unshakable inner foundation. When we quiet mental noise, clarity and vitality naturally return.',
    whoCanBenefit: [
      'High-performing individuals experiencing fatigue, tension, or chronic overwhelm',
      'Professionals seeking practical, daily mindfulness habits that actually fit busy schedules',
      'Anyone navigating emotional turmoil, grief, or personal crossroads',
      'Individuals longing for genuine peace of mind and intentional living',
    ],
    sessionFormats: [
      'Virtual One-on-One Mindfulness Sessions',
      'Personalized Stress-Resilience Mapping Consultations',
      'Holistic Wellness Series (4 to 8 Weeks)',
    ],
  },
  {
    id: 'youth-student-mentor',
    slug: 'youth-student-mentor',
    name: 'Student & Youth Mentorship Track',
    title: 'Academic Clarity & Student Growth Mentor',
    experience: '8+ Years Experience',
    image: '/audience-students.jpg',
    shortBio:
      'Guiding students, graduates, and young adults to build inner confidence, clarify career pathways, overcome exam anxiety, and master healthy habits.',
    fullBio: [
      'Our Student & Youth Mentorship Track focuses on empowering young adults during their most formative and high-pressure developmental years.',
      'From handling academic expectations and competitive pressures to choosing fulfilling career directions, this mentorship provides an empathetic, non-judgmental space.',
      'Students learn essential life skills that traditional classrooms rarely teach: self-belief, emotional resilience, time mastery, and purposeful goal-setting.',
    ],
    expertise: [
      'Student Motivation & Goal Clarity',
      'Exam & Academic Stress Relief',
      'Overcoming Self-Doubt & Peer Comparison',
      'Early Career Exploration & Decisions',
      'Time Management & Focus Habits',
    ],
    credentials: [
      'Youth & Student Development Specialist',
      '8+ Years Guiding Young Adults & University Students',
      'Holistic Academic & Career Transition Facilitator',
      'Parent-Student Alignment Advisor',
    ],
    philosophy:
      'Every young person carries immense untapped potential. With the right encouragement, structure, and clarity, students discover confidence that shapes the rest of their lives.',
    whoCanBenefit: [
      'High school and university students feeling overwhelmed by decisions and exams',
      'Recent graduates stepping into their first professional roles',
      'Young adults battling imposter syndrome, comparison, or lack of direction',
      'Parents seeking supportive, positive mentorship for their sons or daughters',
    ],
    sessionFormats: [
      'Student One-on-One Mentorship Call (Online)',
      'Career & Goal Clarity Discovery Consultation',
      'Structured Multi-Week Student Growth Program',
    ],
  },
];

export function getAllMentors(): Mentor[] {
  return mentors;
}

export function getMentorBySlug(slug: string): Mentor | undefined {
  return mentors.find((m) => m.slug === slug);
}
