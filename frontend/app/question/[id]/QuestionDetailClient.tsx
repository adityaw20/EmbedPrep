'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Eye, Tag, ChevronRight, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { questionApi } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import { cn, getDifficultyColor, getCategoryIcon } from '@/lib/utils';
import type { Question } from '@/types';

interface QuestionDetailClientProps {
  id: string;
}

export default function QuestionDetailClient({ id }: QuestionDetailClientProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [relatedQuestions, setRelatedQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const fetchQuestion = async () => {
      setLoading(true);
      setHasSubmitted(false);
      setSelectedOption(null);
      setShowAnswer(false);
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

  const handleOptionClick = (optionId: string) => {
    if (hasSubmitted) return;
    setSelectedOption(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setHasSubmitted(true);
    setShowAnswer(true);
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setSelectedOption(null);
    setShowAnswer(false);
  };

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
        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--card)', border: '1px solid var(--card-border)' }}>
          <span className="text-4xl">❓</span>
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>Question Not Found</h1>
        <p className="mb-6" style={{ color: 'var(--foreground-secondary)' }}>
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
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: 'var(--foreground-muted)' }}>
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4" />
        <Link href={`/main/questions?category=${encodeURIComponent(question.category)}`} 
          className="hover:text-blue-500 transition-colors">
          {question.category}
        </Link>
        <ChevronRight className="w-4 h-4" />
        <span style={{ color: 'var(--foreground)' }}>Question</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="text-3xl">{getCategoryIcon(question.category)}</span>
          <div>
            <span className="text-sm font-medium" style={{ color: 'var(--primary)' }}>{question.category}</span>
            <span className="mx-2" style={{ color: 'var(--foreground-muted)' }}>•</span>
            <span className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>{question.subcategory}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className={cn('px-3 py-1 text-sm font-medium rounded-full border', getDifficultyColor(question.difficulty))}>
            {question.difficulty}
          </span>
          <span className="px-3 py-1 text-sm font-medium rounded-full border"
            style={{ backgroundColor: 'var(--background-secondary)', color: 'var(--foreground-secondary)', borderColor: 'var(--card-border)' }}>
            {question.experienceLevel}
          </span>
          <span className="flex items-center gap-1 text-sm" style={{ color: 'var(--foreground-muted)' }}>
            <Eye className="w-4 h-4" />
            {question.viewCount.toLocaleString()} views
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-relaxed" style={{ color: 'var(--foreground)' }}>
          {question.question}
        </h1>
      </div>

      {/* Code Snippet */}
      {question.codeSnippet && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
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
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--foreground-muted)' }}>
            Select your answer
          </h3>
          <div className="space-y-3">
            {question.options.map((option) => {
              const isSelected = selectedOption === option.id;
              const isCorrectOption = option.id === question.correctAnswer;
              const showResult = hasSubmitted;

              // Determine styles based on state
              let containerClass = '';
              let badgeClass = '';
              
              if (showResult) {
                if (isCorrectOption) {
                  // Correct answer - always show green
                  containerClass = 'bg-green-500/10 border-green-500';
                  badgeClass = 'bg-green-500 text-white';
                } else if (isSelected && !isCorrectOption) {
                  // Wrong selection - show red
                  containerClass = 'bg-red-500/10 border-red-500';
                  badgeClass = 'bg-red-500 text-white';
                } else {
                  // Other options
                  containerClass = 'opacity-50';
                  badgeClass = 'bg-gray-500 text-white';
                }
              } else {
                // Not submitted yet
                if (isSelected) {
                  containerClass = 'bg-blue-500/10 border-blue-500';
                  badgeClass = 'bg-blue-500 text-white';
                } else {
                  containerClass = 'hover:border-blue-500/50';
                  badgeClass = 'bg-gray-600 text-white';
                }
              }

              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  disabled={hasSubmitted}
                  className={cn(
                    'w-full p-4 rounded-xl border-2 text-left transition-all duration-200',
                    'flex items-center gap-4',
                    containerClass
                  )}
                  style={{ 
                    backgroundColor: isSelected ? undefined : 'var(--card)',
                    borderColor: isSelected ? undefined : 'var(--card-border)'
                  }}
                >
                  <span
                    className={cn(
                      'flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm transition-colors',
                      badgeClass
                    )}
                  >
                    {option.id.toUpperCase()}
                  </span>
                  <span className="flex-1 pt-1" style={{ color: 'var(--foreground)' }}>{option.text}</span>
                  
                  {/* Show correct/wrong icons */}
                  {showResult && isCorrectOption && (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  )}
                  {showResult && isSelected && !isCorrectOption && (
                    <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback Message */}
          {hasSubmitted && (
            <div className={cn(
              'mt-6 p-4 rounded-xl border-2',
              isCorrect ? 'bg-green-500/10 border-green-500' : 'bg-red-500/10 border-red-500'
            )}>
              <div className="flex items-center gap-3">
                {isCorrect ? (
                  <CheckCircle className="w-8 h-8 text-green-500" />
                ) : (
                  <XCircle className="w-8 h-8 text-red-500" />
                )}
                <div>
                  <p className={cn('font-bold text-lg', isCorrect ? 'text-green-400' : 'text-red-400')}>
                    {isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect Answer'}
                  </p>
                  {!isCorrect && (
                    <p className="text-sm mt-1" style={{ color: 'var(--foreground-secondary)' }}>
                      The correct answer is: <span className="font-bold text-green-400">{question.correctAnswer.toUpperCase()}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {!hasSubmitted ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={cn(
                  'px-8 py-3 rounded-xl font-semibold transition-all',
                  selectedOption 
                    ? 'bg-blue-500 text-white hover:bg-blue-600 hover:scale-105' 
                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                )}
              >
                Check Answer
              </button>
            ) : (
              <>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl font-semibold transition-all bg-gray-600 text-white hover:bg-gray-700"
                >
                  Try Again
                </button>
                <button
                  onClick={() => setShowAnswer(!showAnswer)}
                  className="px-6 py-3 rounded-xl font-semibold transition-all border"
                  style={{ 
                    backgroundColor: 'var(--card)', 
                    color: 'var(--foreground)',
                    borderColor: 'var(--card-border)'
                  }}
                >
                  {showAnswer ? 'Hide Explanation' : 'Show Explanation'}
                </button>
              </>
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
              'px-6 py-3 rounded-xl font-semibold transition-all mb-6',
              showAnswer
                ? 'bg-gray-600 text-white'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            )}
          >
            {showAnswer ? 'Hide Answer' : 'Show Answer'}
          </button>

          {showAnswer && (
            <div className="p-6 rounded-xl border" 
              style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
              <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-green-400">
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
        <div className="mb-8 p-6 rounded-xl border animate-fade-in"
          style={{ backgroundColor: 'var(--card)', borderColor: 'var(--card-border)' }}>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
            Explanation
          </h3>
          <div className="prose prose-invert max-w-none" style={{ color: 'var(--foreground-secondary)' }}>
            <ReactMarkdown>{question.explanation}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Tags */}
      {question.tags && question.tags.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider flex items-center gap-2" 
            style={{ color: 'var(--foreground-muted)' }}>
            <Tag className="w-4 h-4" />
            Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {question.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm rounded-lg border"
                style={{ 
                  backgroundColor: 'var(--background-secondary)', 
                  color: 'var(--foreground-secondary)',
                  borderColor: 'var(--card-border)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Related Questions */}
      {relatedQuestions.length > 0 && (
        <div className="mt-12 pt-8" style={{ borderTop: '1px solid var(--card-border)' }}>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--foreground)' }}>
            <BookOpen className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            Related Questions
          </h3>
          <div className="space-y-3">
            {relatedQuestions.map((q) => (
              <Link
                key={q._id}
                href={`/question/${q._id}`}
                className="block p-4 rounded-xl border transition-all group"
                style={{ 
                  backgroundColor: 'var(--card)', 
                  borderColor: 'var(--card-border)'
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className={cn(
                      'text-xs font-medium px-2 py-0.5 rounded-full',
                      getDifficultyColor(q.difficulty)
                    )}>
                      {q.difficulty}
                    </span>
                    <h4 className="mt-2 group-hover:text-blue-400 transition-colors line-clamp-2" 
                      style={{ color: 'var(--foreground)' }}>
                      {q.question}
                    </h4>
                  </div>
                  <ChevronRight className="w-5 h-5 flex-shrink-0 group-hover:text-blue-400 transition-colors" 
                    style={{ color: 'var(--foreground-muted)' }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
