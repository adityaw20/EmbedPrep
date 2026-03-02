'use client';

import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  categories: [
    { label: 'C Programming', href: '/main/c-mcq' },
    { label: 'C++ Programming', href: '/main/cpp-mcq' },
    { label: 'Protocols', href: '/main/protocols' },
    { label: 'Interview Prep', href: '/main/interview' },
  ],
  resources: [
    { label: 'About Us', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Contribute', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#12121a', borderTop: '1px solid #2a2a3a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 rounded-lg border"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a' }}>
                <Cpu className="w-6 h-6" style={{ color: '#3b82f6' }} />
              </div>
              <span className="text-xl font-bold" style={{ color: '#f0f0f5' }}>EmbedPrep</span>
            </Link>
            <p className="mt-4 text-sm max-w-xs" style={{ color: '#a0a0b0' }}>
              Master Embedded Systems, Firmware, and IoT with 100+ curated interview questions. 
              Your ultimate preparation platform.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border transition-all hover:border-blue-500"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a', color: '#a0a0b0' }}
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border transition-all hover:border-blue-500"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a', color: '#a0a0b0' }}
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border transition-all hover:border-blue-500"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a', color: '#a0a0b0' }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@embedprep.com"
                className="p-2 rounded-lg border transition-all hover:border-blue-500"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a', color: '#a0a0b0' }}
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: '#f0f0f5' }}>
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-blue-500"
                    style={{ color: '#a0a0b0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: '#f0f0f5' }}>
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-blue-500"
                    style={{ color: '#a0a0b0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4"
              style={{ color: '#f0f0f5' }}>
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-blue-500"
                    style={{ color: '#a0a0b0' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t" style={{ borderColor: '#2a2a3a' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm" style={{ color: '#6b7280' }}>
              © {new Date().getFullYear()} EmbedPrep. All rights reserved.
            </p>
            <p className="text-sm" style={{ color: '#6b7280' }}>
              Made with ❤️ for Embedded Engineers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
