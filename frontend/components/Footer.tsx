'use client';

import Link from 'next/link';
import { Cpu, Github, Twitter, Linkedin, Mail } from 'lucide-react';

const footerLinks = {
  categories: [
    { label: 'C Programming', href: '/c-mcq' },
    { label: 'C++ Programming', href: '/cpp-mcq' },
    { label: 'Protocols', href: '/protocols' },
    { label: 'Interview Prep', href: '/interview' },
  ],
  resources: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Contribute', href: '/contribute' },
    { label: 'Blog', href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-card rounded-lg border border-card-border">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">EmbedPrep</span>
            </Link>
            <p className="mt-4 text-foreground-secondary text-sm max-w-xs">
              Master Embedded Systems, Firmware, and IoT with 5000+ curated interview questions. 
              Your ultimate preparation platform.
            </p>
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-card-border text-foreground-secondary hover:text-foreground hover:border-primary/50 transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-card-border text-foreground-secondary hover:text-foreground hover:border-primary/50 transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-card border border-card-border text-foreground-secondary hover:text-foreground hover:border-primary/50 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@embedprep.com"
                className="p-2 rounded-lg bg-card border border-card-border text-foreground-secondary hover:text-foreground hover:border-primary/50 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-card-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-foreground-muted">
              © {new Date().getFullYear()} EmbedPrep. All rights reserved.
            </p>
            <p className="text-sm text-foreground-muted">
              Made with ❤️ for Embedded Engineers
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
