import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ChatbotWidget } from '@/components/ui/ChatbotWidget';
import { getOrganizationSchema } from '@/lib/seo/schema';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.shivi.sbs';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['Arial', 'Helvetica', 'sans-serif'],
  weight: ['400', '500', '600', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#FFFFFF',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Shivi | Life Coaching & Personal Transformation | Dr. Shivani Koccher Dhand',
    template: '%s | Shivi',
  },
  description:
    'Shivi offers personalized life coaching, career guidance, NLP, mindfulness, emotional intelligence, and leadership workshops. Discover clarity, confidence, and purpose with Dr. Shivani Koccher Dhand in Phagwara, Punjab and online globally.',
  keywords: [
    'life coaching',
    'personal development',
    'career coaching',
    'NLP coaching',
    'mindfulness',
    'emotional intelligence',
    'leadership development',
    'Dr Shivani Koccher Dhand',
    'life coach Punjab',
    'life coach India',
    'executive coaching',
    'Shivi coaching',
  ],
  authors: [{ name: 'Dr. Shivani Koccher Dhand' }],
  creator: 'Dr. Shivani Koccher Dhand',
  publisher: 'Shivi',
  alternates: {
    canonical: './',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'Shivi',
    title: 'Shivi | Life Coaching & Personal Transformation | Dr. Shivani Koccher Dhand',
    description:
      'Empowering individuals and organizations through personalized life coaching, career guidance, NLP, and mindfulness programs.',
    images: [
      {
        url: '/founder.jpg',
        width: 1200,
        height: 630,
        alt: 'Dr. Shivani Koccher Dhand — Founder & Lead Coach at Shivi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivi | Life Coaching & Personal Transformation',
    description: 'Empower. Transform. Grow. Life coaching, NLP, and personal development with Dr. Shivani Koccher Dhand.',
    images: ['/founder.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon-48.png', sizes: '48x48', type: 'image/png' },
      { url: '/icon-96.png', sizes: '96x96', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = getOrganizationSchema();

  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} font-sans bg-white text-[#25222A] antialiased`}>
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
