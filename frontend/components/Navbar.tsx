'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Cpu, Search, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/main/c-mcq', label: 'C MCQ' },
  { href: '/main/cpp-mcq', label: 'C++ MCQ' },
  { href: '/main/protocols', label: 'Protocols' },
  { href: '/main/interview', label: 'Interview' },
  { href: '/main/quiz', label: 'Quiz' },
  { href: '/main/flashcards', label: 'Flashcards' },
  { href: '/main/roadmaps', label: 'Roadmaps' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render theme toggle until mounted to avoid hydration mismatch
  const ThemeIcon = mounted && theme === 'dark' ? Sun : Moon;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-colors duration-300"
      style={{ 
        backgroundColor: 'rgba(10, 10, 15, 0.8)',
        borderColor: 'var(--card-border, #2a2a3a)'
      }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg blur-md group-hover:opacity-75 transition-all" 
                style={{ backgroundColor: 'rgba(59, 130, 246, 0.3)' }} />
              <div className="relative p-2 rounded-lg border"
                style={{ backgroundColor: '#161622', borderColor: '#2a2a3a' }}>
                <Cpu className="w-6 h-6" style={{ color: '#3b82f6' }} />
              </div>
            </div>
            <span className="text-xl font-bold gradient-text">
              EmbedPrep
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-[#161622]"
                style={{ color: '#a0a0b0' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-all duration-200 hover:bg-[#161622]"
                style={{ color: '#a0a0b0' }}
                aria-label="Toggle theme"
              >
                <ThemeIcon className="w-5 h-5" />
              </button>
            )}
            
            <Link
              href="/main/search"
              className="p-2 rounded-lg transition-all duration-200 hover:bg-[#161622]"
              style={{ color: '#a0a0b0' }}
            >
              <Search className="w-5 h-5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-all"
            style={{ color: '#a0a0b0' }}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in"
            style={{ borderColor: '#2a2a3a' }}>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg transition-all hover:bg-[#161622]"
                  style={{ color: '#a0a0b0' }}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t flex items-center gap-4 px-4"
                style={{ borderColor: '#2a2a3a' }}>
                <Link
                  href="/main/search"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-3 transition-all"
                  style={{ color: '#a0a0b0' }}
                >
                  <Search className="w-5 h-5" />
                  Search
                </Link>
                {mounted && (
                  <button
                    onClick={() => {
                      toggleTheme();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 py-3 transition-all"
                    style={{ color: '#a0a0b0' }}
                  >
                    <ThemeIcon className="w-5 h-5" />
                    {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
