import type { Service } from '@/types';

// ============================================================
// Shivi — Services Mock Data
// Source: Client brief. Replace with GET /api/services when backend is ready.
// ============================================================

export const services: Service[] = [
  {
    slug: 'life-coaching',
    title: 'Life Coaching',
    shortDescription: 'Personalized one-to-one coaching to help you gain clarity, build confidence, overcome limiting beliefs, set meaningful goals, and create actionable life plans.',
    fullDescription: 'Life coaching at Shivi is a deeply personal, collaborative process. Through structured conversations, reflective exercises, and goal-oriented frameworks, we help you uncover what truly matters to you and take consistent steps towards a more fulfilling life.',
    icon: 'leaf',
    category: 'personal-growth',
    highlights: [
      'Gain clarity on your values and priorities',
      'Overcome limiting beliefs and self-doubt',
      'Set and achieve meaningful personal goals',
      'Build lasting confidence and self-awareness',
      'Create actionable life plans with accountability',
    ],
    whoIsItFor: [
      'Individuals feeling stuck or directionless',
      'People seeking greater clarity and purpose',
      'Those wanting to make a significant life change',
      'Anyone looking to build confidence and self-belief',
    ],
    whatToExpect: [
      'A confidential, non-judgmental space',
      'Personalized session plans tailored to your goals',
      'Practical tools and reflection exercises',
      'Regular progress check-ins and accountability',
    ],
    faqs: [
      {
        question: 'How is life coaching different from therapy?',
        answer: 'Life coaching is a forward-focused process centered on goal-setting, personal development, and action. It is not a substitute for medical, psychological, or psychiatric treatment. If you are experiencing a mental health condition, we recommend consulting a qualified healthcare professional.',
      },
      {
        question: 'How many sessions will I need?',
        answer: "Every person's journey is unique. The number of sessions depends on your goals and circumstances. We typically begin with an initial discovery session to understand your needs and recommend a suitable program.",
      },
    ],
    order: 1,
  },
  {
    slug: 'career-professional-coaching',
    title: 'Career & Professional Coaching',
    shortDescription: 'Support with career planning, transitions, workplace effectiveness, employability and professional growth.',
    fullDescription: "Whether you are navigating a career transition, seeking a promotion, or looking to enhance your professional effectiveness, Shivi's career coaching provides practical guidance, honest reflection, and a structured roadmap for growth.",
    icon: 'briefcase',
    category: 'career',
    highlights: [
      'Career planning and transition support',
      'Workplace effectiveness and performance',
      'Employability and professional confidence',
      'Leadership presence and communication',
    ],
    whoIsItFor: [
      'Working professionals seeking career growth',
      'Individuals navigating career transitions',
      'Graduates entering the professional world',
      'Managers developing leadership capabilities',
    ],
    whatToExpect: [
      'Career vision and goal clarity sessions',
      'Strengths and gap analysis',
      'Action planning and skill development',
      'Interview, communication and confidence coaching',
    ],
    faqs: [],
    order: 2,
  },
  {
    slug: 'mindfulness-stress-management',
    title: 'Mindfulness & Stress Management',
    shortDescription: 'Support for self-awareness, stress management, emotional balance and healthier habits.',
    fullDescription: "In a fast-paced world, learning to pause, breathe, and respond rather than react is a powerful life skill. Shivi's mindfulness programs help you develop greater self-awareness, manage stress effectively, and build sustainable wellbeing habits.",
    icon: 'heart',
    category: 'well-being',
    highlights: [
      'Practical mindfulness techniques for daily life',
      'Stress identification and management strategies',
      'Emotional balance and regulation skills',
      'Habit formation for sustainable wellbeing',
    ],
    whoIsItFor: [
      'Individuals experiencing high stress or burnout',
      'Professionals seeking work-life balance',
      'Anyone wanting to develop greater self-awareness',
      'People looking to build healthier daily habits',
    ],
    whatToExpect: [
      'Introduction to evidence-based mindfulness practices',
      'Personalized stress management strategies',
      'Techniques for emotional regulation',
      'Ongoing support and practice guidance',
    ],
    faqs: [],
    order: 3,
  },
  {
    slug: 'emotional-intelligence',
    title: 'Emotional Intelligence Development',
    shortDescription: 'Develop self-awareness, empathy, emotional regulation, interpersonal relationships and communication.',
    fullDescription: "Emotional intelligence is one of the most powerful predictors of personal and professional success. Shivi's EI development programs help you understand your emotions, empathize with others, and navigate relationships with greater skill and authenticity.",
    icon: 'sparkles',
    category: 'well-being',
    highlights: [
      'Self-awareness and emotional recognition',
      'Empathy and perspective-taking skills',
      'Emotional regulation and impulse management',
      'Interpersonal skills and communication',
    ],
    whoIsItFor: [
      'Leaders and managers seeking people skills',
      'Individuals navigating challenging relationships',
      'Professionals in high-communication roles',
      'Anyone wanting deeper self-understanding',
    ],
    whatToExpect: [
      'EI assessment and reflection exercises',
      'Targeted skill development in each EI domain',
      'Real-world application and practice',
      'Ongoing coaching and feedback',
    ],
    faqs: [],
    order: 4,
  },
  {
    slug: 'corporate-workshops',
    title: 'Corporate Workshops & Leadership',
    shortDescription: 'Programs for organizations covering leadership, communication, emotional intelligence, mindfulness, stress management and employee development.',
    fullDescription: 'Shivi works with organizations and educational institutions to design and deliver impactful workshops and development programs that help teams perform at their best, communicate effectively, and lead with purpose.',
    icon: 'users',
    category: 'organizations',
    highlights: [
      'Leadership and management development',
      'Team communication and collaboration',
      'Emotional intelligence in the workplace',
      'Mindfulness and stress management workshops',
      'Employee wellbeing and engagement programs',
    ],
    whoIsItFor: [
      'Corporate organizations and businesses',
      'Educational institutions',
      'Leadership teams and management groups',
      'HR and People & Culture departments',
    ],
    whatToExpect: [
      'Customized program design for your organization',
      'Engaging, interactive facilitation',
      'Practical tools teams can apply immediately',
      'Pre and post-workshop support',
    ],
    faqs: [],
    order: 5,
  },
  {
    slug: 'nlp-transformation',
    title: 'NLP',
    shortDescription: 'Mindset development, communication, behavioral change and confidence building using NLP principles.',
    fullDescription: 'Neuro-Linguistic Programming (NLP) offers powerful tools for understanding and shifting the patterns of thought, language, and behavior that shape our lives. Shivi integrates NLP techniques into personal transformation coaching to help you create meaningful and lasting change.',
    icon: 'brain',
    category: 'transformation',
    highlights: [
      'Understanding and shifting limiting beliefs',
      'Communication patterns and language',
      'Behavioral change and habit formation',
      'Confidence and mindset development',
    ],
    whoIsItFor: [
      'Individuals seeking deep personal change',
      'Those struggling with limiting beliefs or patterns',
      'People wanting to enhance communication skills',
      'Anyone curious about the power of mindset',
    ],
    whatToExpect: [
      'Introduction to NLP concepts and principles',
      'Personalized NLP techniques and exercises',
      'Exploration of thought and behavioral patterns',
      'Practical application for real-life change',
    ],
    faqs: [],
    order: 6,
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
