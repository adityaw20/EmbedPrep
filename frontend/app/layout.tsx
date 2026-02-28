import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
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
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#161622',
              color: '#f0f0f5',
              border: '1px solid #2a2a3a',
            },
          }}
        />
      </body>
    </html>
  );
}
