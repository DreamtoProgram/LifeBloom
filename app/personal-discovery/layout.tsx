import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Personal Discovery Assessment | Self-Reflection Tool | Shivi',
  description:
    'Take the Shivi 20-question Personal Discovery Assessment. Gain actionable self-reflection insights across clarity, emotional balance, growth orientation, and resilience with Dr. Shivani Koccher Dhand.',
  alternates: {
    canonical: 'https://shivi.in/personal-discovery',
  },
  openGraph: {
    title: 'Personal Discovery Assessment | Shivi',
    description:
      'Reflect on your personal and professional journey with the Shivi 20-Question Personal Discovery Assessment.',
    url: 'https://shivi.in/personal-discovery',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Discovery Assessment | Shivi',
    description: 'Explore your growth, emotional balance, and clarity with our guided self-reflection assessment.',
  },
};

export default function PersonalDiscoveryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
