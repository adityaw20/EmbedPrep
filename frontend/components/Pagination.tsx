'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Pagination as PaginationType } from '@/types';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: PaginationProps) {
  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage}
        className={cn(
          'p-2 rounded-lg border transition-all',
          'bg-background-secondary border-card-border',
          'text-foreground-secondary',
          hasPrevPage
            ? 'hover:border-primary/50 hover:text-foreground cursor-pointer'
            : 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getPageNumbers().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="px-3 py-2 text-foreground-muted">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={cn(
                  'min-w-[40px] px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  page === currentPage
                    ? 'bg-primary text-white'
                    : 'bg-background-secondary border border-card-border text-foreground-secondary hover:border-primary/50 hover:text-foreground'
                )}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className={cn(
          'p-2 rounded-lg border transition-all',
          'bg-background-secondary border-card-border',
          'text-foreground-secondary',
          hasNextPage
            ? 'hover:border-primary/50 hover:text-foreground cursor-pointer'
            : 'opacity-50 cursor-not-allowed'
        )}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
