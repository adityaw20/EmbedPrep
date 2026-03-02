import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://embedprep.netlify.app'),
  title: 'EmbedPrep - Master Embedded Systems & IoT',
  description:
    'Comprehensive interview preparation platform for Embedded Systems, Firmware, and IoT Engineers. 5000+ curated questions on C, C++, Protocols, RTOS, Microcontrollers, and more.',
  keywords: [
    'embedded systems',
    'firmware',
    'IoT',
    'interview questions',
    'C programming',
    'C++',
    'RTOS',
    'STM32',
    'ESP32',
    'communication protocols',
    'embedded interview',
  ],
  authors: [{ name: 'EmbedPrep Team' }],
  openGraph: {
    title: 'EmbedPrep - Master Embedded Systems & IoT',
    description:
      'Comprehensive interview preparation platform for Embedded Engineers',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-background text-foreground antialiased`}
      >
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />

      </body>
    </html>
  );
}
