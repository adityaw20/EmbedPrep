'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  count: number;
  subcategories: string[];
  description: string;
}

const categoryIcons: Record<string, string> = {
  'C Programming': '💻',
  'C++ Programming': '⚡',
  'Communication Protocols': '📡',
  'Embedded Systems': '🔧',
  'RTOS': '⏱️',
  'Microcontrollers': '🔌',
  'IoT': '🌐',
  'PCB & Hardware Design': '📐',
  'Interview Questions': '🎯',
};

const categoryColors: Record<string, string> = {
  'C Programming': '#3b82f6',
  'C++ Programming': '#06b6d4',
  'Communication Protocols': '#8b5cf6',
  'Embedded Systems': '#10b981',
  'RTOS': '#f59e0b',
  'Microcontrollers': '#ef4444',
  'IoT': '#06b6d4',
  'PCB & Hardware Design': '#84cc16',
  'Interview Questions': '#f97316',
};

export default function CategoryCard({ name, count, subcategories, description }: CategoryCardProps) {
  const icon = categoryIcons[name] || '📚';
  const color = categoryColors[name] || '#3b82f6';
  
  return (
    <Link 
      href={`/main/questions?category=${encodeURIComponent(name)}`}
      className="group block p-6 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
      style={{ 
        backgroundColor: 'var(--card)',
        border: '1px solid var(--card-border)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color;
        e.currentTarget.style.boxShadow = `0 20px 40px -15px ${color}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div 
          className="text-4xl"
          style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }}
        >
          {icon}
        </div>
        <span 
          className="px-3 py-1 rounded-full text-sm font-medium"
          style={{ 
            backgroundColor: `${color}20`,
            color: color
          }}
        >
          {count} Qs
        </span>
      </div>

      {/* Content */}
      <h3 
        className="text-xl font-bold mb-2 transition-colors"
        style={{ color: 'var(--foreground)' }}
      >
        {name}
      </h3>
      
      <p 
        className="text-sm mb-4 line-clamp-2"
        style={{ color: 'var(--foreground-secondary)' }}
      >
        {description}
      </p>

      {/* Subcategories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {subcategories.map((sub) => (
          <span 
            key={sub}
            className="px-2 py-1 rounded-md text-xs"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground-secondary)'
            }}
          >
            {sub}
          </span>
        ))}
        {count > subcategories.length && (
          <span 
            className="px-2 py-1 rounded-md text-xs"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground-muted)'
            }}
          >
            +{count - subcategories.length}
          </span>
        )}
      </div>

      {/* CTA */}
      <div 
        className="flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
        style={{ color }}
      >
        Explore Questions
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
