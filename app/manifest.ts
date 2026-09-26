import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shivi — Empower. Transform. Grow.',
    short_name: 'Shivi',
    description: 'Personalized life coaching, NLP, mindfulness, and leadership development with Dr. Shivani Koccher Dhand.',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFFFFF',
    theme_color: '#FFFFFF',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
