'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn, getCategoryIcon, getCategoryGradient } from '@/lib/utils';

interface CategoryCardProps {
  name: string;
  count: number;
  subcategories?: string[];
  description?: string;
  href?: string;
}

export default function CategoryCard({
  name,
  count,
  subcategories = [],
  description,
  href,
}: CategoryCardProps) {
  const cardHref = href || `/?category=${encodeURIComponent(name)}`;

  return (
    <Link href={cardHref}>
      <div
        className={cn(
          'group relative p-6 rounded-xl border border-card-border bg-card',
          'hover:border-primary/50 transition-all duration-300 overflow-hidden'
        )}
      >
        {/* Background Gradient */}
        <div
          className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500',
            getCategoryGradient(name)
          )}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon & Count */}
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-xl bg-background-secondary border border-card-border group-hover:border-primary/30 transition-colors">
              <span className="text-3xl">{getCategoryIcon(name)}</span>
            </div>
            <span className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
              {count.toLocaleString()} Qs
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Description */}
          {description && (
            <p className="text-sm text-foreground-secondary mb-4 line-clamp-2">
              {description}
            </p>
          )}

          {/* Subcategories */}
          {subcategories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {subcategories.slice(0, 3).map((sub) => (
                <span
                  key={sub}
                  className="px-2 py-1 text-xs bg-background-secondary text-foreground-secondary rounded-md"
                >
                  {sub}
                </span>
              ))}
              {subcategories.length > 3 && (
                <span className="px-2 py-1 text-xs bg-background-secondary text-foreground-secondary rounded-md">
                  +{subcategories.length - 3}
                </span>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-sm text-primary font-medium">
            <span>Explore Questions</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}
