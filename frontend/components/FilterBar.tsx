'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CATEGORIES, DIFFICULTIES, EXPERIENCE_LEVELS, QUESTION_TYPES } from '@/types';
import type { FilterState } from '@/types';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  totalResults?: number;
}

export default function FilterBar({ filters, onFilterChange, totalResults }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ ...filters, search: searchInput || undefined });
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleFilterChange = (key: keyof FilterState, value: string | undefined) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setSearchInput('');
    onFilterChange({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const FilterSelect = ({
    label,
    value,
    options,
    onChange,
    placeholder,
  }: {
    label: string;
    value?: string;
    options: readonly string[];
    onChange: (value: string) => void;
    placeholder: string;
  }) => (
    <div className="relative">
      <label className="block text-xs font-medium text-foreground-muted mb-1.5">{label}</label>
      <div className="relative">
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full appearance-none px-4 py-2.5 pr-10 text-sm rounded-lg',
            'bg-background-secondary border border-card-border',
            'text-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50',
            'transition-all cursor-pointer'
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground-muted pointer-events-none" />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Search and Mobile Filter Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search questions..."
            className={cn(
              'w-full pl-12 pr-4 py-3 rounded-lg',
              'bg-background-secondary border border-card-border',
              'text-foreground placeholder-foreground-muted',
              'focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50',
              'transition-all'
            )}
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className={cn(
            'lg:hidden px-4 py-3 rounded-lg border flex items-center gap-2',
            'bg-background-secondary border-card-border text-foreground-secondary',
            'hover:border-primary/50 transition-all',
            activeFiltersCount > 0 && 'border-primary text-primary'
          )}
        >
          <Filter className="w-5 h-5" />
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-primary text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div
        className={cn(
          'grid gap-4 lg:grid-cols-5',
          showMobileFilters ? 'block' : 'hidden lg:grid'
        )}
      >
        <FilterSelect
          label="Category"
          value={filters.category}
          options={CATEGORIES}
          onChange={(value) => handleFilterChange('category', value)}
          placeholder="All Categories"
        />
        <FilterSelect
          label="Difficulty"
          value={filters.difficulty}
          options={DIFFICULTIES}
          onChange={(value) => handleFilterChange('difficulty', value)}
          placeholder="All Levels"
        />
        <FilterSelect
          label="Experience"
          value={filters.experienceLevel}
          options={EXPERIENCE_LEVELS}
          onChange={(value) => handleFilterChange('experienceLevel', value)}
          placeholder="All Experience"
        />
        <FilterSelect
          label="Type"
          value={filters.type}
          options={QUESTION_TYPES}
          onChange={(value) => handleFilterChange('type', value)}
          placeholder="All Types"
        />
        <div className="flex items-end">
          <button
            onClick={clearFilters}
            disabled={activeFiltersCount === 0}
            className={cn(
              'w-full px-4 py-2.5 rounded-lg text-sm font-medium',
              'border border-card-border text-foreground-secondary',
              'hover:border-primary/50 hover:text-foreground',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'transition-all flex items-center justify-center gap-2'
            )}
          >
            <X className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Results count */}
      {typeof totalResults === 'number' && (
        <div className="flex items-center justify-between text-sm text-foreground-muted">
          <span>
            Showing <span className="text-foreground font-medium">{totalResults.toLocaleString()}</span> questions
          </span>
          {activeFiltersCount > 0 && (
            <span className="text-primary">{activeFiltersCount} filter(s) active</span>
          )}
        </div>
      )}
    </div>
  );
}
