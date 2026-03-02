import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://embedprep.netlify.app'),
  title: 'EmbedPrep - Master Embedded Systems & IoT',
  description:
    'Comprehensive interview preparation platform for Embedded Systems, Firmware, and IoT Engineers. 100+ curated questions on C, C++, Protocols, RTOS, Microcontrollers, and more.',
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
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        style={{ backgroundColor: '#0a0a0f', color: '#f0f0f5' }}
      >
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
