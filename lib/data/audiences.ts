import type { AudienceCard } from '@/types';

// ============================================================
// LifeBloom — Audience Data
// Source: Client brief. Replace with GET /api/audiences when backend is ready.
// ============================================================

export const audiences: AudienceCard[] = [
  {
    id: 'students',
    title: 'Students & Young Adults',
    description: 'Building confidence, clarity and direction as you navigate education, career choices and early life decisions.',
    image: '/audience-students.jpg',
    icon: 'graduation-cap',
  },
  {
    id: 'professionals',
    title: 'Working Professionals',
    description: 'Enhancing performance, navigating workplace challenges and creating a fulfilling professional life.',
    image: '/audience-professionals.jpg',
    icon: 'briefcase',
  },
  {
    id: 'transitions',
    title: 'People in Life Transitions',
    description: 'Support through significant life changes — career shifts, relationships, relocations or new beginnings.',
    image: '/audience-transitions.jpg',
    icon: 'compass',
  },
  {
    id: 'leaders',
    title: 'Aspiring Leaders & Managers',
    description: 'Developing the mindset, emotional intelligence and communication skills of effective, purposeful leaders.',
    image: '/audience-leaders.jpg',
    icon: 'star',
  },
  {
    id: 'women',
    title: 'Women Seeking Growth',
    description: 'Empowering women to step into their potential, build confidence and create their own definitions of success.',
    image: '/audience-women.jpg',
    icon: 'flower',
  },
  {
    id: 'organizations',
    title: 'Organizations & Institutions',
    description: 'Partnering with businesses and educational institutions to develop people, teams and cultures.',
    image: '/audience-organizations.jpg',
    icon: 'building',
  },
];
