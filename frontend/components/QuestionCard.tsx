'use client';

import Link from 'next/link';
import { Eye, ArrowRight } from 'lucide-react';
import type { Question } from '@/types';
import { cn, getDifficultyColor, getCategoryIcon } from '@/lib/utils';

interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
}

export default function QuestionCard({ question, showAnswer = false }: QuestionCardProps) {
  return (
    <Link href={`/question/${question._id}`}>
      <div className={cn(
        'group relative p-6 rounded-xl border border-card-border bg-card',
        'hover:border-primary/50 hover:bg-card-hover transition-all duration-300',
        'animate-slide-up'
      )}>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{getCategoryIcon(question.category)}</span>
            <div>
              <span className="text-xs font-medium text-primary uppercase tracking-wider">
                {question.category}
              </span>
              <p className="text-xs text-foreground-muted mt-0.5">
                {question.subcategory}
              </p>
            </div>
          </div>
          <span className={cn(
            'px-3 py-1 text-xs font-medium rounded-full border',
            getDifficultyColor(question.difficulty)
          )}>
            {question.difficulty}
          </span>
        </div>

        {/* Question */}
        <h3 className="text-foreground font-medium line-clamp-2 mb-3 group-hover:text-primary transition-colors">
          {question.question}
        </h3>

        {/* Code Snippet Preview */}
        {question.codeSnippet && (
          <div className="mb-4 p-3 bg-background rounded-lg border border-card-border/50">
            <pre className="text-xs font-mono text-foreground-secondary line-clamp-3 overflow-hidden">
              {question.codeSnippet}
            </pre>
          </div>
        )}

        {/* Options Preview for MCQ */}
        {question.type === 'MCQ' && question.options && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {question.options.slice(0, 4).map((option) => (
              <div
                key={option.id}
                className={cn(
                  'px-3 py-2 text-xs rounded-lg border transition-all',
                  showAnswer && option.id === question.correctAnswer
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : 'bg-background-secondary border-card-border text-foreground-secondary'
                )}
              >
                <span className="font-medium mr-2">{option.id}.</span>
                <span className="truncate">{option.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-card-border">
          <div className="flex items-center gap-4 text-xs text-foreground-muted">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {question.viewCount.toLocaleString()}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-background-secondary">
              {question.experienceLevel}
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
            View <ArrowRight className="w-4 h-4" />
          </span>
        </div>

        {/* Hover Glow Effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary/5 to-accent-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </Link>
  );
}
