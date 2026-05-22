import type { Metadata } from 'next';
import { Bebas_Neue, DM_Sans, DM_Serif_Display } from 'next/font/google';
import { Nav } from '@/components/nav/Nav';
import { Footer } from '@/components/footer/Footer';
import '@/styles/globals.css';

const fd = DM_Sans({
  subsets: ['latin'],
  variable: '--font-fd',
  display: 'swap',
});

const fs = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-fs',
  display: 'swap',
});

const fb = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-fb',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'AutoInfo4U — Honest car-buying advice',
    template: '%s · AutoInfo4U',
  },
  description:
    'Independent car-buying podcast, 7-step Car Finder, and a directory of vetted dealers. Built for shoppers, not dealerships.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fd.variable} ${fs.variable} ${fb.variable}`}>
      <body className="min-h-screen bg-cream text-black antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
