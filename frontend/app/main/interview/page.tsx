'use client';

import { useEffect, useState, useCallback } from 'react';
import FilterBar from '@/components/FilterBar';
import QuestionCard from '@/components/QuestionCard';
import Pagination from '@/components/Pagination';
import { QuestionCardSkeleton } from '@/components/LoadingSpinner';
import { questionApi } from '@/lib/api';
import type { Question, FilterState, Pagination as PaginationType } from '@/types';

export default function InterviewPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'Interview Questions',
  });

  const fetchQuestions = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const response = await questionApi.getAll({
        ...filters,
        page,
        limit: 20,
      });

      if (response.success) {
        setQuestions(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchQuestions(1);
  }, [fetchQuestions]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters({ ...newFilters, category: 'Interview Questions' });
  };

  const handlePageChange = (page: number) => {
    fetchQuestions(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const experienceLevels = [
    { label: 'Fresher', icon: '🎓', desc: '0-1 years experience', color: 'green' },
    { label: '1-3 Years', icon: '💼', desc: 'Junior level', color: 'blue' },
    { label: '3-5 Years', icon: '⭐', desc: 'Mid level', color: 'purple' },
    { label: '5+ Years', icon: '🏆', desc: 'Senior level', color: 'orange' },
    { label: 'Automotive', icon: '🚗', desc: 'Auto industry', color: 'red' },
    { label: 'Product Companies', icon: '🏢', desc: 'Top tech firms', color: 'cyan' },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string }> = {
      green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
      red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">🎯</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Interview Preparation</h1>
        </div>
        <p className="text-foreground-secondary max-w-3xl">
          Targeted interview questions organized by experience level. From campus placements 
          to senior roles at top product companies and automotive giants.
        </p>
      </div>

      {/* Experience Level Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {experienceLevels.map((level) => {
          const colors = getColorClasses(level.color);
          return (
            <button
              key={level.label}
              onClick={() => handleFilterChange({ ...filters, experienceLevel: level.label })}
              className={`p-4 rounded-xl border text-center transition-all hover:border-primary/50 ${
                filters.experienceLevel === level.label
                  ? `${colors.bg} ${colors.border}`
                  : 'bg-card border-card-border'
              }`}
            >
              <span className="text-2xl mb-2 block">{level.icon}</span>
              <h3 className={`font-semibold text-sm ${colors.text}`}>{level.label}</h3>
              <p className="text-xs text-foreground-muted mt-1">{level.desc}</p>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={pagination?.totalItems}
        />
      </div>

      {/* Questions Grid */}
      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(6)].map((_, i) => (
            <QuestionCardSkeleton key={i} />
          ))}
        </div>
      ) : questions.length > 0 ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <div className="mt-8">
              <Pagination pagination={pagination} onPageChange={handlePageChange} />
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
          <p className="text-foreground-secondary max-w-md mx-auto">
            Try adjusting your filters to find what you&apos;re looking for.
          </p>
        </div>
      )}
    </div>
  );
}
