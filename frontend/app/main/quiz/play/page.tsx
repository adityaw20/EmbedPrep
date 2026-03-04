'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag,
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Home,
  AlertCircle,
  Timer
} from 'lucide-react';
import { questions } from '@/lib/data';
import { useUserProgress } from '@/lib/hooks';
import { 
  cn, 
  getRandomQuestions, 
  shuffleArray, 
  formatTime,
  calculatePercentage,
  getGrade
} from '@/lib/utils';
import Link from 'next/link';
import type { Question } from '@/types';

interface QuizConfig {
  category: string;
  questionCount: number;
  timeLimit: number;
  shuffleQuestions: boolean;
}

interface QuizQuestion extends Question {
  shuffledOptions?: { id: string; text: string }[];
}

export default function QuizPlayPage() {
  const router = useRouter();
  const { addQuizResult } = useUserProgress();
  const [config, setConfig] = useState<QuizConfig | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showConfirmFinish, setShowConfirmFinish] = useState(false);

  // Load config and initialize quiz
  useEffect(() => {
    const storedConfig = sessionStorage.getItem('quiz-config');
    if (!storedConfig) {
      router.push('/main/quiz');
      return;
    }

    const parsedConfig: QuizConfig = JSON.parse(storedConfig);
    setConfig(parsedConfig);

    // Filter and select questions
    let availableQuestions = parsedConfig.category === 'all' 
      ? [...questions]
      : questions.filter(q => q.category === parsedConfig.category);

    // Get random questions
    let selected = getRandomQuestions(availableQuestions, parsedConfig.questionCount);

    // Shuffle options for MCQ questions if enabled
    if (parsedConfig.shuffleQuestions) {
      selected = shuffleArray(selected);
    }

    // Shuffle options for each MCQ
    selected = selected.map(q => {
      if (q.type === 'MCQ' && q.options) {
        return {
          ...q,
          shuffledOptions: shuffleArray(q.options)
        };
      }
      return q;
    });

    setQuizQuestions(selected);

    // Initialize timer
    if (parsedConfig.timeLimit > 0) {
      setTimeRemaining(parsedConfig.timeLimit * 60);
    }
  }, [router]);

  // Timer countdown
  useEffect(() => {
    if (!config || config.timeLimit === 0 || isFinished) return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config, isFinished]);

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (isFinished) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const finishQuiz = useCallback(() => {
    if (isFinished) return;
    
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q._id] === q.correctAnswer) {
        score++;
      }
    });

    // Save result
    addQuizResult({
      score,
      total: quizQuestions.length,
      category: config?.category || 'all',
      timeSpent: config?.timeLimit ? (config.timeLimit * 60) - timeRemaining : 0,
    });

    setIsFinished(true);
    setShowConfirmFinish(false);
  }, [isFinished, quizQuestions, selectedAnswers, config, timeRemaining, addQuizResult]);

  const calculateScore = () => {
    let score = 0;
    quizQuestions.forEach(q => {
      if (selectedAnswers[q._id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  if (!config || quizQuestions.length === 0) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p style={{ color: 'var(--foreground-secondary)' }}>Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    const score = calculateScore();
    const percentage = calculatePercentage(score, quizQuestions.length);
    const { grade, color } = getGrade(percentage);

    return (
      <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Results Card */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
              style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
              <Trophy className="w-10 h-10" style={{ color: 'var(--primary)' }} />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
              Quiz Completed!
            </h1>
            <p style={{ color: 'var(--foreground-secondary)' }}>
              Here is how you performed
            </p>
          </div>

          <div className="p-8 rounded-2xl border mb-6"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                {percentage}%
              </div>
              <div className={cn('text-2xl font-bold', color)}>
                Grade {grade}
              </div>
              <p className="mt-2" style={{ color: 'var(--foreground-secondary)' }}>
                You got {score} out of {quizQuestions.length} questions correct
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{score}</p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Correct</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--error)' }}>{quizQuestions.length - score}</p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Incorrect</p>
              </div>
              <div className="text-center p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                <p className="text-2xl font-bold" style={{ color: 'var(--accent-cyan)' }}>
                  {formatTime(config.timeLimit * 60 - timeRemaining)}
                </p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Time Taken</p>
              </div>
            </div>

            {/* Question Review */}
            <div className="space-y-3">
              <h3 className="font-semibold mb-4" style={{ color: 'var(--foreground)' }}>
                Question Review
              </h3>
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {quizQuestions.map((q, idx) => {
                  const isCorrect = selectedAnswers[q._id] === q.correctAnswer;
                  return (
                    <button
                      key={q._id}
                      onClick={() => setCurrentIndex(idx)}
                      className={cn(
                        'w-10 h-10 rounded-lg font-medium transition-all',
                        isCorrect 
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      )}>
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ 
                backgroundColor: 'var(--primary)',
                color: 'white'
              }}>
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              href="/main/quiz"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all"
              style={{ 
                borderColor: 'var(--card-border)',
                color: 'var(--foreground)'
              }}>
              <Home className="w-5 h-5" />
              Back to Quiz Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = quizQuestions[currentIndex];
  const progress = ((currentIndex + 1) / quizQuestions.length) * 100;
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium" style={{ color: 'var(--foreground-secondary)' }}>
              Question {currentIndex + 1} of {quizQuestions.length}
            </span>
            {config.timeLimit > 0 && (
              <div className={cn(
                'flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium',
                timeRemaining < 60 ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/10 text-blue-400'
              )}>
                <Timer className="w-4 h-4" />
                {formatTime(timeRemaining)}
              </div>
            )}
          </div>
          <button
            onClick={() => setShowConfirmFinish(true)}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
            style={{ 
              backgroundColor: 'var(--success)',
              color: 'white'
            }}>
            Finish ({answeredCount}/{quizQuestions.length})
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: 'var(--background-secondary)' }}>
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              backgroundColor: 'var(--primary)'
            }} />
        </div>

        {/* Question Card */}
        <div className="p-6 sm:p-8 rounded-2xl border mb-6"
          style={{ 
            backgroundColor: 'var(--card)',
            borderColor: 'var(--card-border)'
          }}>
          {/* Question Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                {currentQuestion.category}
              </span>
              <h2 className="text-xl font-semibold mt-1" style={{ color: 'var(--foreground)' }}>
                {currentQuestion.question}
              </h2>
            </div>
            <button
              onClick={() => toggleFlag(currentQuestion._id)}
              className={cn(
                'p-2 rounded-lg transition-all',
                flaggedQuestions.has(currentQuestion._id)
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'hover:bg-[var(--background-secondary)]'
              )}
              style={{ color: flaggedQuestions.has(currentQuestion._id) ? undefined : 'var(--foreground-muted)' }}>
              <Flag className="w-5 h-5" />
            </button>
          </div>

          {/* Code Snippet */}
          {currentQuestion.codeSnippet && (
            <div className="mb-6 p-4 rounded-xl overflow-x-auto"
              style={{ 
                backgroundColor: 'var(--background-secondary)',
                border: '1px solid var(--card-border)'
              }}>
              <pre className="text-sm font-mono" style={{ color: 'var(--foreground-secondary)' }}>
                {currentQuestion.codeSnippet}
              </pre>
            </div>
          )}

          {/* Options */}
          <div className="space-y-3">
            {(currentQuestion.shuffledOptions || currentQuestion.options || []).map((option) => {
              const isSelected = selectedAnswers[currentQuestion._id] === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectAnswer(currentQuestion._id, option.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200',
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[var(--card-border)] hover:border-[var(--primary)] hover:bg-[var(--background-secondary)]'
                  )}>
                  <span className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm transition-all',
                    isSelected
                      ? 'bg-blue-500 text-white'
                      : 'bg-[var(--background-secondary)]'
                  )}
                  style={{ color: isSelected ? undefined : 'var(--foreground-secondary)' }}>
                    {option.id.toUpperCase()}
                  </span>
                  <span className="flex-1" style={{ color: 'var(--foreground)' }}>
                    {option.text}
                  </span>
                  {isSelected && (
                    <CheckCircle className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground)'
            }}>
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          {/* Question Navigator */}
          <div className="hidden sm:flex items-center gap-1">
            {quizQuestions.map((q, idx) => (
              <button
                key={q._id}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  'w-8 h-8 rounded-lg text-xs font-medium transition-all',
                  idx === currentIndex
                    ? 'bg-blue-500 text-white'
                    : selectedAnswers[q._id]
                    ? 'bg-green-500/20 text-green-400'
                    : flaggedQuestions.has(q._id)
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-[var(--background-secondary)]'
                )}
                style={{ 
                  color: idx === currentIndex || selectedAnswers[q._id] || flaggedQuestions.has(q._id) 
                    ? undefined 
                    : 'var(--foreground-muted)' 
                }}>
                {idx + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => setCurrentIndex(prev => Math.min(quizQuestions.length - 1, prev + 1))}
            disabled={currentIndex === quizQuestions.length - 1}
            className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground)'
            }}>
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Confirm Finish Modal */}
      {showConfirmFinish && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" style={{ color: 'var(--warning, #f59e0b)' }} />
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Finish Quiz?
              </h3>
            </div>
            <p className="mb-6" style={{ color: 'var(--foreground-secondary)' }}>
              You have answered {answeredCount} out of {quizQuestions.length} questions. 
              {answeredCount < quizQuestions.length && (
                <span className="block mt-2 text-yellow-400">
                  ⚠️ {quizQuestions.length - answeredCount} questions are unanswered.
                </span>
              )}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmFinish(false)}
                className="flex-1 px-4 py-2 rounded-lg font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)'
                }}>
                Continue Quiz
              </button>
              <button
                onClick={finishQuiz}
                className="flex-1 px-4 py-2 rounded-lg font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'white'
                }}>
                Finish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
