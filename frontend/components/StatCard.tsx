'use client';

import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export default function StatCard({
  label,
  value,
  subtext,
  icon,
  trend = 'neutral',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'p-6 rounded-xl border border-card-border bg-card',
        'hover:border-primary/30 transition-all duration-300',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-foreground-muted mb-1">{label}</p>
          <p className="text-3xl font-bold text-foreground">{value}</p>
          {subtext && (
            <p
              className={cn(
                'text-sm mt-2',
                trend === 'up' && 'text-green-400',
                trend === 'down' && 'text-red-400',
                trend === 'neutral' && 'text-foreground-secondary'
              )}
            >
              {subtext}
            </p>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
