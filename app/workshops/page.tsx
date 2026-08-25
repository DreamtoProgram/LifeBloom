import type { Metadata } from 'next';
import { Button, ArrowIcon } from '@/components/ui/Button';
import { Container } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Workshops & Corporate Programs | LifeBloom',
  description:
    'LifeBloom delivers workshops and corporate development programs covering leadership, emotional intelligence, mindfulness, stress management and employee development for organizations and educational institutions.',
};

const workshops = [
  {
    title: 'Leadership & Management Development',
    description: 'Developing the mindset, communication and people skills of effective leaders and managers in modern organizations.',
    format: 'in-person' as const,
    duration: 'Half-day / Full-day',
    topics: ['Leadership', 'Communication', 'Emotional Intelligence', 'Team Dynamics'],
  },
  {
    title: 'Emotional Intelligence in the Workplace',
    description: 'A practical workshop helping teams develop self-awareness, empathy, emotional regulation and interpersonal effectiveness.',
    format: 'hybrid' as const,
    duration: 'Half-day',
    topics: ['Emotional Intelligence', 'Self-Awareness', 'Communication'],
  },
  {
    title: 'Mindfulness & Stress Management at Work',
    description: 'Equipping employees with practical mindfulness techniques and stress management strategies for sustainable wellbeing.',
    format: 'hybrid' as const,
    duration: 'Half-day',
    topics: ['Mindfulness', 'Stress Management', 'Wellbeing'],
  },
  {
    title: 'Employee Wellbeing & Engagement',
    description: 'A program designed to support employee wellbeing, resilience and engagement for a healthier, more productive workplace culture.',
    format: 'in-person' as const,
    duration: 'Customizable',
    topics: ['Wellbeing', 'Resilience', 'Engagement', 'Culture'],
  },
];

const formatLabel: Record<string, string> = {
  'in-person': 'In-Person',
  'online': 'Online',
  'hybrid': 'In-Person or Online',
};

const topicColors = [
  'bg-[#EEE7FA] text-[#7F55A8]',
  'bg-[#FBE8F0] text-[#C4637A]',
];

export default function WorkshopsPage() {
  return (
    <div className="pt-[80px] bg-white">
      {/* Hero */}
      <section className="pb-20 pt-16">
        <Container>
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-10 bg-gradient-to-r from-[#C9A5E8] to-[#E99AB8]" aria-hidden="true" />
              <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#9B70C7] uppercase">
                Workshops & Programs
              </p>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#25222A] leading-[1.1] mb-6">
              Corporate Workshops &<br />
              <span className="text-[#9B70C7] italic">Development Programs</span>
            </h1>
            <p className="font-sans text-base text-[#6E6872] leading-relaxed mb-8">
              LifeBloom partners with organizations and educational institutions to design and deliver impactful workshops and development programs.
            </p>
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
              Enquire About Workshops
            </Button>
          </div>
        </Container>
      </section>

      {/* Workshops grid */}
      <section className="py-20 bg-[#FCF8FB]">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <article
                key={workshop.title}
                className="group bg-white rounded-3xl p-8 border border-[#EDE7EE] hover:border-[#C9A5E8]/50 hover:shadow-lg hover:shadow-[rgba(74,52,80,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-sans text-xs font-semibold text-[#9B70C7] bg-[#EEE7FA] px-3 py-1 rounded-full">
                    {formatLabel[workshop.format]}
                  </span>
                  <span className="font-sans text-xs text-[#6E6872]">{workshop.duration}</span>
                </div>
                <h2 className="font-serif text-xl text-[#25222A] mb-3 group-hover:text-[#9B70C7] transition-colors">
                  {workshop.title}
                </h2>
                <p className="font-sans text-sm text-[#6E6872] leading-relaxed mb-6">
                  {workshop.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {workshop.topics.map((t, idx) => (
                    <span key={t} className={`font-sans text-xs px-3 py-1 rounded-full ${topicColors[idx % 2]}`}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA — blush/lavender gradient replaces dark green */}
      <section
        className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FBE8F0 0%, #EEE7FA 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 80% 50%, #FFFFFF 0%, transparent 60%)' }}
          aria-hidden="true"
        />
        <Container className="text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-4xl text-[#25222A] mb-6">
            Let's Design the Right Program for Your Organization
          </h2>
          <p className="font-sans text-base text-[#6E6872] mb-8 max-w-lg mx-auto">
            All LifeBloom workshops can be customized to suit your organization's goals, culture and team size.
          </p>
          <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
            Get in Touch
          </Button>
        </Container>
      </section>
    </div>
  );
}
