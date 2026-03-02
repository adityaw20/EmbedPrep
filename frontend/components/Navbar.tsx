'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Cpu, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/c-mcq', label: 'C MCQ' },
  { href: '/cpp-mcq', label: 'C++ MCQ' },
  { href: '/protocols', label: 'Protocols' },
  { href: '/interview', label: 'Interview' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-lg blur-md group-hover:bg-primary/50 transition-all" />
              <div className="relative p-2 bg-card rounded-lg border border-card-border">
                <Cpu className="w-6 h-6 text-primary" />
              </div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
              EmbedPrep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  'text-foreground-secondary hover:text-foreground hover:bg-card'
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-card transition-all"
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-card transition-all"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-card-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-card transition-all"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-card-border">
                <Link
                  href="/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-foreground-secondary hover:text-foreground hover:bg-card transition-all"
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
