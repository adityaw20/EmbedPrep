'use client';

import { useEffect, useState, useCallback } from 'react';
import FilterBar from '@/components/FilterBar';
import QuestionCard from '@/components/QuestionCard';
import Pagination from '@/components/Pagination';
import { QuestionCardSkeleton } from '@/components/LoadingSpinner';
import { questionApi } from '@/lib/api';
import type { Question, FilterState, Pagination as PaginationType } from '@/types';

export default function CPPMCQPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'C++ Programming',
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
    setFilters({ ...newFilters, category: 'C++ Programming' });
  };

  const handlePageChange = (page: number) => {
    fetchQuestions(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">⚡</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">C++ Programming MCQ</h1>
        </div>
        <p className="text-foreground-secondary max-w-3xl">
          Comprehensive C++ interview questions covering OOP, STL, templates, smart pointers, 
          and modern C++ features. Perfect for embedded C++ roles.
        </p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <h3 className="font-semibold text-purple-400 mb-1">OOP Concepts</h3>
          <p className="text-sm text-foreground-secondary">Classes, inheritance, polymorphism</p>
        </div>
        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <h3 className="font-semibold text-pink-400 mb-1">STL</h3>
          <p className="text-sm text-foreground-secondary">Containers, iterators, algorithms</p>
        </div>
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
          <h3 className="font-semibold text-indigo-400 mb-1">Modern C++</h3>
          <p className="text-sm text-foreground-secondary">C++11/14/17/20 features</p>
        </div>
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
