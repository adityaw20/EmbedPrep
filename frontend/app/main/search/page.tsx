'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import FilterBar from '@/components/FilterBar';
import QuestionCard from '@/components/QuestionCard';
import Pagination from '@/components/Pagination';
import { QuestionCardSkeleton } from '@/components/LoadingSpinner';
import { questionApi } from '@/lib/api';
import type { Question, FilterState, Pagination as PaginationType } from '@/types';

export default function SearchPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});

  const fetchQuestions = useCallback(async (page = 1) => {
    // Only search if there's a search term or other filters
    if (!filters.search && !filters.category && !filters.difficulty && !filters.experienceLevel && !filters.type) {
      setQuestions([]);
      setPagination(null);
      return;
    }

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
    setFilters(newFilters);
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
          <Search className="w-8 h-8 text-primary" />
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Search Questions</h1>
        </div>
        <p className="text-foreground-secondary max-w-3xl">
          Search across all 5000+ questions using keywords, categories, or difficulty levels.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8">
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          totalResults={pagination?.totalItems}
        />
      </div>

      {/* Initial State / No Search */}
      {!loading && questions.length === 0 && !filters.search && (
        <div className="text-center py-20">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
            <Search className="w-10 h-10 text-foreground-muted" />
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Start Searching</h3>
          <p className="text-foreground-secondary max-w-md mx-auto">
            Enter a keyword or select filters above to search through our question bank.
            Try searching for &quot;pointer&quot;, &quot;UART&quot;, or &quot;RTOS&quot;.
          </p>
        </div>
      )}

      {/* Search Results */}
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
        filters.search && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No questions found</h3>
            <p className="text-foreground-secondary max-w-md mx-auto">
              Try adjusting your search query or filters to find what you&apos;re looking for.
            </p>
          </div>
        )
      )}
    </div>
  );
}
