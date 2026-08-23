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

export default function WorkshopsPage() {
  return (
    <div className="pt-28 bg-[#F8F5EE]">
      {/* Hero */}
      <section className="pb-20">
        <Container>
          <div className="max-w-2xl">
            <p className="font-sans text-xs font-semibold tracking-[0.2em] text-[#C9A35B] uppercase mb-4">Workshops & Programs</p>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal text-[#20251F] leading-[1.1] mb-6">
              Corporate Workshops &<br />
              <span className="text-[#183B2A] italic">Development Programs</span>
            </h1>
            <p className="font-sans text-base text-[#6D716A] leading-relaxed mb-8">
              LifeBloom partners with organizations and educational institutions to design and deliver impactful workshops and development programs.
            </p>
            <Button href="/contact" variant="primary" size="lg" icon={<ArrowIcon />}>
              Enquire About Workshops
            </Button>
          </div>
        </Container>
      </section>

      {/* Workshops grid */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <article key={workshop.title} className="group bg-[#F8F5EE] rounded-3xl p-8 border border-[#E5E0D8] hover:border-[#183B2A]/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-sans text-xs font-semibold text-[#C9A35B] bg-[#C9A35B]/10 px-3 py-1 rounded-full">
                    {formatLabel[workshop.format]}
                  </span>
                  <span className="font-sans text-xs text-[#6D716A]">{workshop.duration}</span>
                </div>
                <h2 className="font-serif text-xl text-[#20251F] mb-3 group-hover:text-[#183B2A] transition-colors">
                  {workshop.title}
                </h2>
                <p className="font-sans text-sm text-[#6D716A] leading-relaxed mb-6">
                  {workshop.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {workshop.topics.map((t) => (
                    <span key={t} className="font-sans text-xs bg-[#DDE8D9] text-[#183B2A] px-3 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#183B2A]">
        <Container className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
            Let's Design the Right Program for Your Organization
          </h2>
          <p className="font-sans text-base text-white/70 mb-8 max-w-lg mx-auto">
            All LifeBloom workshops can be customized to suit your organization's goals, culture and team size.
          </p>
          <Button href="/contact" variant="outline" size="lg" icon={<ArrowIcon />}>
            Get in Touch
          </Button>
        </Container>
      </section>
    </div>
  );
}
