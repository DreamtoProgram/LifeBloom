import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/ui/ChatbotWidget';

export const metadata: Metadata = {
  title: {
    default: 'LifeBloom | Life Coaching & Personal Development',
    template: '%s | LifeBloom',
  },
  description:
    'LifeBloom offers premium life coaching, career guidance, NLP, mindfulness and corporate development programs. Discover clarity, confidence, and purpose with Dr. Shivani Koccher Dhand.',
  keywords: [
    'life coaching', 'personal development', 'career coaching', 'NLP coaching',
    'mindfulness', 'emotional intelligence', 'leadership development', 'Dr Shivani',
    'LifeBloom', 'Phagwara', 'India', 'life coach India',
  ],
  authors: [{ name: 'Dr. Shivani Koccher Dhand' }],
  creator: 'LifeBloom',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://lifebloom.in',
    siteName: 'LifeBloom',
    title: 'LifeBloom | Life Coaching & Personal Development',
    description:
      'Empowering individuals and organizations through personalized life coaching, career guidance, NLP, and mindfulness programs.',
    images: [
      {
        url: '/founder.jpg',
        width: 1200,
        height: 630,
        alt: 'LifeBloom — Empower. Transform. Grow.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LifeBloom | Life Coaching & Personal Development',
    description: 'Discover clarity, build confidence, find purpose. Life coaching with Dr. Shivani Koccher Dhand.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-white text-[#25222A] antialiased">
        <Navbar />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ChatbotWidget />
      </body>
    </html>
  );
}
