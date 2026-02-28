'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  className,
  fullScreen = false,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-8 h-8 border-2',
    lg: 'w-12 h-12 border-3',
  };

  const spinner = (
    <div
      className={cn(
        'rounded-full border-primary/30 border-t-primary animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}

export function QuestionCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-card-border bg-card animate-pulse">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-background-secondary" />
          <div className="space-y-2">
            <div className="w-20 h-3 rounded bg-background-secondary" />
            <div className="w-32 h-2 rounded bg-background-secondary" />
          </div>
        </div>
        <div className="w-16 h-6 rounded-full bg-background-secondary" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="w-full h-4 rounded bg-background-secondary" />
        <div className="w-3/4 h-4 rounded bg-background-secondary" />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-8 rounded-lg bg-background-secondary" />
        ))}
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-card-border">
        <div className="flex items-center gap-4">
          <div className="w-16 h-3 rounded bg-background-secondary" />
          <div className="w-20 h-4 rounded-full bg-background-secondary" />
        </div>
        <div className="w-16 h-4 rounded bg-background-secondary" />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="p-6 rounded-xl border border-card-border bg-card animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-background-secondary" />
        <div className="w-16 h-6 rounded-full bg-background-secondary" />
      </div>
      <div className="w-32 h-5 rounded bg-background-secondary mb-2" />
      <div className="w-full h-8 rounded bg-background-secondary mb-4" />
      <div className="flex gap-2 mb-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="w-16 h-5 rounded-md bg-background-secondary" />
        ))}
      </div>
      <div className="w-28 h-4 rounded bg-background-secondary" />
    </div>
  );
}
