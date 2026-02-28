'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  PlusCircle, 
  Upload, 
  Database, 
  TrendingUp, 
  Users,
  FileQuestion,
  ArrowRight
} from 'lucide-react';
import { statsApi, categoryApi } from '@/lib/api';
import StatCard from '@/components/StatCard';
import LoadingSpinner from '@/components/LoadingSpinner';
import type { Stats, Category } from '@/types';

const quickActions = [
  {
    title: 'Add Question',
    description: 'Add a single question manually',
    icon: PlusCircle,
    href: '/admin/add-question',
    color: 'blue',
  },
  {
    title: 'Bulk Upload',
    description: 'Upload questions via CSV or JSON',
    icon: Upload,
    href: '/admin/upload',
    color: 'green',
  },
  {
    title: 'Manage Questions',
    description: 'Edit, delete, or view all questions',
    icon: Database,
    href: '/admin/manage-questions',
    color: 'purple',
  },
];

export default function AdminDashboardPage() {
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-foreground-secondary">
          Welcome back! Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            label="Total Questions"
            value={stats.totalQuestions.toLocaleString()}
            subtext="Across all categories"
            icon={<FileQuestion className="w-6 h-6" />}
          />
          <StatCard
            label="Categories"
            value={categories.length}
            subtext={`${stats.byCategory.length} active`}
            icon={<Database className="w-6 h-6" />}
          />
          <StatCard
            label="Difficulty Levels"
            value={stats.byDifficulty.length}
            subtext="Easy, Medium, Hard"
            icon={<TrendingUp className="w-6 h-6" />}
          />
          <StatCard
            label="Experience Levels"
            value={stats.byExperience.length}
            subtext="From Fresher to Senior"
            icon={<Users className="w-6 h-6" />}
          />
        </div>
      )}

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const colorClasses: Record<string, string> = {
              blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
              green: 'bg-green-500/10 text-green-400 border-green-500/20',
              purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
            };
            
            return (
              <Link
                key={action.title}
                href={action.href}
                className="group p-6 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-all"
              >
                <div className={`p-3 rounded-lg w-fit mb-4 ${colorClasses[action.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-foreground-secondary mb-4">
                  {action.description}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary">
                  Get started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Category Distribution */}
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-6 rounded-xl bg-card border border-card-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Questions by Category
            </h3>
            <div className="space-y-4">
              {stats.byCategory.map((category) => (
                <div key={category._id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{category._id}</span>
                    <span className="text-sm text-foreground-muted">
                      {category.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{
                        width: `${(category.count / stats.totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-xl bg-card border border-card-border">
            <h3 className="text-lg font-semibold text-foreground mb-6">
              Questions by Difficulty
            </h3>
            <div className="space-y-4">
              {stats.byDifficulty.map((difficulty) => (
                <div key={difficulty._id}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-foreground">{difficulty._id}</span>
                    <span className="text-sm text-foreground-muted">
                      {difficulty.count.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-2 bg-background-secondary rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        difficulty._id === 'Easy'
                          ? 'bg-green-500'
                          : difficulty._id === 'Medium'
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                      }`}
                      style={{
                        width: `${(difficulty.count / stats.totalQuestions) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
