'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Eye, Tag, ChevronRight, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { questionApi } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { cn, getDifficultyColor, getCategoryIcon } from '@/lib/utils';
import type { Question } from '@/types';

export default function QuestionDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [question, setQuestion] = useState<Question | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      try {
        const [questionRes, relatedRes] = await Promise.all([
          questionApi.getById(id),
          questionApi.getRelated(id),
        ]);

        if (questionRes.success) {
          setQuestion(questionRes.data);
        }
        if (relatedRes.success) {
          setRelatedQuestions(relatedRes.data);
        }
      } catch (error) {
        console.error('Error fetching question:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchQuestion();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
          <span className="text-4xl">❓</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Question Not Found</h1>
        <p className="text-foreground-secondary mb-6">
          The question you&apos;re looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Go Home
        </Link>
      </div>
    );
  }

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-foreground-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/main/questions?category=${encodeURIComponent(question.category)}`} className="hover:text-primary transition-colors">
          {question.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-foreground">Question</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-3xl">{getCategoryIcon(question.category)}</span>
          <div>
            <span className="text-sm text-primary font-medium">{question.category}</span>
            <span className="text-foreground-muted mx-2">•</span>
            <span className="text-sm text-foreground-secondary">{question.subcategory}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={cn('px-3 py-1 text-sm font-medium rounded-full border', getDifficultyColor(question.difficulty))}>
            {question.difficulty}
          </span>
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-background-secondary text-foreground-secondary border border-card-border">
            {question.experienceLevel}
          </span>
          <span className="flex items-center gap-1 text-sm text-foreground-muted">
            <Eye className="w-4 h-4" />
            {question.viewCount.toLocaleString()} views
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-relaxed">
          {question.question}
        </h1>
      </div>

      {/* Code Snippet */}
      {question.codeSnippet && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground-muted mb-3 uppercase tracking-wider">
            Code
          </h3>
          <pre className="code-block">
            <code>{question.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Options for MCQ */}
      {question.type === 'MCQ' && question.options && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground-muted mb-3 uppercase tracking-wider">
            Options
          </h3>
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrectOption = option.id === question.correctAnswer;
              const showResult = showAnswer && (isSelected || isCorrectOption);

              return (
                <button
                  key={option.id}
                  onClick={() => !showAnswer && setSelectedOption(option.id)}
                  disabled={showAnswer}
                  className={cn(
                    'w-full p-4 rounded-xl border text-left transition-all',
                    'flex items-start gap-4',
                    showResult && isCorrectOption
                      ? 'bg-green-500/10 border-green-500/50'
                      : showResult && isSelected && !isCorrectOption
                      ? 'bg-red-500/10 border-red-500/50'
                      : isSelected
                      ? 'bg-primary/10 border-primary/50'
                      : 'bg-card border-card-border hover:border-primary/30'
                  )}
                >
                  <span
                    className={cn(
                      'flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm',
                      showResult && isCorrectOption
                        ? 'bg-green-500/20 text-green-400'
                        : showResult && isSelected && !isCorrectOption
                        ? 'bg-red-500/20 text-red-400'
                        : isSelected
                        ? 'bg-primary/20 text-primary'
                        : 'bg-background-secondary text-foreground-secondary'
                    )}
                  >
                    {option.id.toUpperCase()}
                  </span>
                  <span className="text-foreground pt-1">{option.text}</span>
                  {showResult && isCorrectOption && (
                    <span className="ml-auto text-green-400 text-sm font-medium">Correct</span>
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <span className="ml-auto text-red-400 text-sm font-medium">Wrong</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Show Answer Toggle */}
          <div className="mt-6 flex items-center gap-4">
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all',
                showAnswer
                  ? 'bg-foreground-secondary/10 text-foreground-secondary'
                  : 'bg-primary text-white hover:bg-primary-hover'
              )}
            >
              {showAnswer ? 'Hide Answer' : 'Show Answer'}
            </button>
            {showAnswer && selectedOption && (
              <span className={cn('font-medium', isCorrect ? 'text-green-400' : 'text-red-400')}>
                {isCorrect ? 'Correct!' : 'Try again!'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Descriptive Answer */}
      {question.type === 'DESCRIPTIVE' && (
        <div className="mb-8">
          <button
            onClick={() => setShowAnswer(!showAnswer)}
            className={cn(
              'px-6 py-3 rounded-lg font-medium transition-all mb-6',
              showAnswer
                ? 'bg-foreground-secondary/10 text-foreground-secondary'
                : 'bg-primary text-white hover:bg-primary-hover'
            )}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showAnswer && (
            <div className="p-6 rounded-xl bg-green-500/5 border border-green-500/20 animate-fade-in">
              <h3 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wider">
                Answer
              </h3>
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{question.correctAnswer}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {showAnswer && (
        <div className="mb-8 p-6 rounded-xl bg-card border border-card-border animate-fade-in">
          <h3 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">
            Explanation
          </h3>
          <div className="prose prose-invert max-w-none text-foreground-secondary">
            <ReactMarkdown>{question.explanation}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-foreground-muted mb-3 uppercase tracking-wider flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm bg-background-secondary text-foreground-secondary rounded-lg border border-card-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Questions */}
      {relatedQuestions.length > 0 && (
        <div className="mt-12 pt-8 border-t border-card-border">
          <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Related Questions
          </h3>
          <div className="space-y-3">
            {relatedQuestions.map((q) => (
              <Link
                key={q._id}
                href={`/question/${q._id}`}
                className="block p-4 rounded-xl bg-card border border-card-border hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      getDifficultyColor(q.difficulty)
                    )}>
                      {q.difficulty}
                    </span>
                    <h4 className="text-foreground mt-2 group-hover:text-primary transition-colors line-clamp-2">
                      {q.question}
                    </h4>
                  </div>
                  <ChevronRight className="w-5 h-5 text-foreground-muted flex-shrink-0 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
