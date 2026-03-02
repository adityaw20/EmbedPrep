'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Cpu,
  Code,
  Wifi,
  Layers,
  Clock,
  MemoryStick,
  Globe,
  CircuitBoard,
  Target,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Users,
} from 'lucide-react';
import { statsApi, categoryApi } from '@/lib/api';
import CategoryCard from '@/components/CategoryCard';
import StatCard from '@/components/StatCard';
import LoadingSpinner, { CategoryCardSkeleton } from '@/components/LoadingSpinner';
import type { Stats, Category } from '@/types';

const features = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: '5000+ Questions',
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
        <div className="absolute inset-0 bg-hero-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.15)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15)_0%,transparent_50%)]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Now with 5000+ curated questions
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Master </span>
            <span className="bg-gradient-to-r from-primary via-accent-cyan to-primary bg-clip-text text-transparent">
              Embedded Systems
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
            The ultimate interview preparation platform for Firmware, IoT, and Embedded Engineers. 
            Practice with 5000+ questions covering C, C++, Protocols, RTOS, and more.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up animation-delay-200">
            <Link href="/c-mcq" className="btn-primary flex items-center gap-2 text-lg">
              Start Practicing
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/interview" className="btn-secondary flex items-center gap-2 text-lg">
              Interview Prep
            </Link>
          </div>

          {/* Stats */}
          {!loading && stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-slide-up animation-delay-300">
              <div className="p-4 rounded-xl bg-card/50 border border-card-border backdrop-blur">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {stats.totalQuestions.toLocaleString()}+
                </p>
                <p className="text-sm text-foreground-secondary">Questions</p>
              </div>
              <div className="p-4 rounded-xl bg-card/50 border border-card-border backdrop-blur">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">
                  {categories.length}
                </p>
                <p className="text-sm text-foreground-secondary">Categories</p>
              </div>
              <div className="p-4 rounded-xl bg-card/50 border border-card-border backdrop-blur">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-foreground-secondary">Topics</p>
              </div>
              <div className="p-4 rounded-xl bg-card/50 border border-card-border backdrop-blur">
                <p className="text-2xl sm:text-3xl font-bold text-foreground">100%</p>
                <p className="text-sm text-foreground-secondary">Free</p>
              </div>
            </div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-foreground-muted flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-foreground-muted" />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose EmbedPrep?
            </h2>
            <p className="text-foreground-secondary max-w-2xl mx-auto">
              Designed by embedded engineers, for embedded engineers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-all duration-300 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-primary/10 text-primary w-fit mb-4 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-foreground-secondary">
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
          <div className="relative p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-primary/10 via-accent-purple/10 to-accent-cyan/10 border border-primary/30 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-cyan/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Ace Your Interview?
              </h2>
              <p className="text-foreground-secondary mb-8 max-w-xl mx-auto">
                Join thousands of engineers who have cracked their dream roles in embedded systems 
                and IoT using EmbedPrep.
              </p>
              <Link
                href="/interview"
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
