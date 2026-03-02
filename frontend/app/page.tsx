'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Code,
  Wifi,
  Clock,
  MemoryStick,
  Globe,
  CircuitBoard,
  Target,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Award,
} from 'lucide-react';
import { statsApi, categoryApi } from '@/lib/api';
import CategoryCard from '@/components/CategoryCard';
import StatCard from '@/components/StatCard';
import LoadingSpinner, { CategoryCardSkeleton } from '@/components/LoadingSpinner';
import type { Stats, Category } from '@/types';

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: '100+ Questions',
    description: 'Comprehensive question bank covering all embedded domains',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Interview Focused',
    description: 'Curated for real interview scenarios at top companies',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Skill Progression',
    description: 'From fresher to senior level with structured learning',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Community Driven',
    description: 'Contributions from industry professionals',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Fast & Lightweight',
    description: 'No backend needed, loads instantly',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Always Available',
    description: 'Works offline, no internet required after load',
  },
];

const categoryIcons: Record<string, React.ReactNode> = {
  'C Programming': <Code className="w-6 h-6" />,
  'C++ Programming': <Code className="w-6 h-6" />,
  'Communication Protocols': <Wifi className="w-6 h-6" />,
  'Embedded Systems': <Cpu className="w-6 h-6" />,
  'RTOS': <Clock className="w-6 h-6" />,
  'Microcontrollers': <MemoryStick className="w-6 h-6" />,
  'IoT': <Globe className="w-6 h-6" />,
  'PCB & Hardware Design': <CircuitBoard className="w-6 h-6" />,
  'Interview Questions': <Target className="w-6 h-6" />,
};

export default function HomePage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, categoriesRes] = await Promise.all([
          statsApi.getStats(),
          categoryApi.getAll(),
        ]);

        if (statsRes.success) {
          setStats(statsRes.data);
        }
        if (categoriesRes.success) {
          setCategories(categoriesRes.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse 80% 50% at 20% 40%, rgba(59, 130, 246, 0.15), transparent)'
        }} />
        <div className="absolute inset-0" style={{ 
          background: 'radial-gradient(ellipse 60% 40% at 80% 60%, rgba(6, 182, 212, 0.1), transparent)'
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 animate-fade-in"
            style={{ 
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: 'var(--primary)'
            }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: 'var(--primary)' }} />
              <span className="relative inline-flex rounded-full h-2 w-2"
                style={{ backgroundColor: 'var(--primary)' }} />
            </span>
            <span className="text-sm font-medium">
              {stats?.totalQuestions || 100}+ curated questions
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span style={{ color: 'var(--foreground)' }}>Master </span>
            <span className="gradient-text">
              Embedded Systems
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ color: 'var(--foreground-secondary)' }}>
            The ultimate interview preparation platform for Firmware, IoT, and Embedded Engineers. 
            Practice with {stats?.totalQuestions || 100}+ questions covering C, C++, Protocols, RTOS, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
            <Link href="/main/c-mcq" className="btn-primary flex items-center gap-2 text-lg">
              Start Practicing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/main/interview" className="btn-secondary flex items-center gap-2 text-lg">
              Interview Prep
            </Link>
          </div>

          {/* Stats */}
          {!loading && stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up"
              style={{ animationDelay: '300ms' }}>
              <div className="p-4 rounded-xl backdrop-blur transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(22, 22, 34, 0.5)', border: '1px solid var(--card-border)' }}>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                  {stats.totalQuestions}+
                </p>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>Questions</p>
              </div>
              <div className="p-4 rounded-xl backdrop-blur transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(22, 22, 34, 0.5)', border: '1px solid var(--card-border)' }}>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
                  {categories.length}
                </p>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>Categories</p>
              </div>
              <div className="p-4 rounded-xl backdrop-blur transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(22, 22, 34, 0.5)', border: '1px solid var(--card-border)' }}>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>50+</p>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>Topics</p>
              </div>
              <div className="p-4 rounded-xl backdrop-blur transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: 'rgba(22, 22, 34, 0.5)', border: '1px solid var(--card-border)' }}>
                <p className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--foreground)' }}>100%</p>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>Free</p>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-2"
            style={{ borderColor: 'var(--foreground-muted)' }}>
            <div className="w-1.5 h-3 rounded-full" style={{ backgroundColor: 'var(--foreground-muted)' }} />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Explore by Category
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
              Dive deep into specific domains. Each category contains carefully curated questions 
              from basics to advanced topics.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category, index) => {
                const stat = stats?.byCategory.find((s) => s._id === category.name);
                return (
                  <div
                    key={category.name}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="animate-slide-up"
                  >
                    <CategoryCard
                      name={category.name}
                      count={stat?.count || 0}
                      subcategories={category.subcategories.slice(0, 4)}
                      description={`Master ${category.name} with comprehensive interview questions`}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: 'var(--background-secondary)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
              Why Choose EmbedPrep?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
              Designed by embedded engineers, for embedded engineers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl transition-all duration-300 hover:scale-105 group"
                style={{ 
                  backgroundColor: 'var(--card)',
                  border: '1px solid var(--card-border)'
                }}
              >
                <div className="p-3 rounded-lg w-fit mb-4 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)' }}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
                  {feature.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.1))',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }} />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
              style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }} />

            <div className="relative z-10 text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Award className="w-8 h-8" style={{ color: 'var(--primary)' }} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
                Ready to Ace Your Interview?
              </h2>
              <p className="mb-8 max-w-xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
                Join thousands of engineers who have cracked their dream roles in embedded systems 
                and IoT using EmbedPrep.
              </p>
              <Link
                href="/main/interview"
                className="btn-primary inline-flex items-center gap-2 text-lg"
              >
                Start Your Preparation
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
