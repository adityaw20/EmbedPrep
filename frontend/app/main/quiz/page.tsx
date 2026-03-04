'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Settings, 
  Clock, 
  Shuffle, 
  Target,
  ChevronRight,
  Trophy,
  History,
  Brain,
  ArrowRight
} from 'lucide-react';
import { questions } from '@/lib/data';
import { useUserProgress } from '@/lib/hooks';
import { cn, getRandomQuestions, formatDuration } from '@/lib/utils';
import Link from 'next/link';

interface QuizConfig {
  category: string;
  questionCount: number;
  timeLimit: number; // in minutes, 0 = no limit
  shuffleQuestions: boolean;
}

const categories = [
  { value: 'all', label: 'All Categories', count: questions.length },
  { value: 'C Programming', label: 'C Programming', count: questions.filter(q => q.category === 'C Programming').length },
  { value: 'C++ Programming', label: 'C++ Programming', count: questions.filter(q => q.category === 'C++ Programming').length },
  { value: 'Communication Protocols', label: 'Communication Protocols', count: questions.filter(q => q.category === 'Communication Protocols').length },
  { value: 'Embedded Systems', label: 'Embedded Systems', count: questions.filter(q => q.category === 'Embedded Systems').length },
  { value: 'RTOS', label: 'RTOS', count: questions.filter(q => q.category === 'RTOS').length },
  { value: 'Microcontrollers', label: 'Microcontrollers', count: questions.filter(q => q.category === 'Microcontrollers').length },
  { value: 'Interview Questions', label: 'Interview Questions', count: questions.filter(q => q.category === 'Interview Questions').length },
];

const questionCounts = [10, 20, 30, 50];
const timeLimits = [
  { value: 0, label: 'No Time Limit' },
  { value: 5, label: '5 minutes' },
  { value: 10, label: '10 minutes' },
  { value: 15, label: '15 minutes' },
  { value: 20, label: '20 minutes' },
  { value: 30, label: '30 minutes' },
];

export default function QuizPage() {
  const router = useRouter();
  const { getQuizStats } = useUserProgress();
  const [config, setConfig] = useState<QuizConfig>({
    category: 'all',
    questionCount: 20,
    timeLimit: 0,
    shuffleQuestions: true,
  });
  const [showStart, setShowStart] = useState(true);

  const quizStats = getQuizStats();

  const handleStartQuiz = () => {
    // Store config in session storage
    sessionStorage.setItem('quiz-config', JSON.stringify(config));
    router.push('/main/quiz/play');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
            <Brain className="w-8 h-8" style={{ color: 'var(--primary)' }} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            Test Your Knowledge
          </h1>
          <p className="max-w-xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
            Take a timed quiz to assess your embedded systems knowledge. 
            Questions are randomly selected based on your preferences.
          </p>
        </div>

        {/* Quiz Stats */}
        {quizStats && (
          <div className="mb-10 p-6 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h2 className="font-semibold" style={{ color: 'var(--foreground)' }}>
                Your Quiz History
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard label="Quizzes Taken" value={quizStats.totalQuizzes} />
              <StatCard label="Average Score" value={`${quizStats.avgScore}%`} />
              <StatCard label="Best Score" value={`${quizStats.bestScore}%`} />
              <StatCard label="Total Time" value={formatDuration(quizStats.totalTime)} />
            </div>
          </div>
        )}

        {/* Quiz Configuration */}
        <div className="p-6 sm:p-8 rounded-2xl border"
          style={{ 
            backgroundColor: 'var(--card)',
            borderColor: 'var(--card-border)'
          }}>
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-5 h-5" style={{ color: 'var(--primary)' }} />
            <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
              Quiz Settings
            </h2>
          </div>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground-secondary)' }}>
                Select Category
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    onClick={() => setConfig(prev => ({ ...prev, category: cat.value }))}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left',
                      config.category === cat.value
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[var(--card-border)] hover:border-[var(--primary)]'
                    )}
                    style={{ backgroundColor: config.category === cat.value ? 'rgba(59, 130, 246, 0.1)' : 'var(--background-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--foreground)' }}>
                      {cat.label}
                    </span>
                    <span className="text-sm px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground-muted)'
                      }}>
                      {cat.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground-secondary)' }}>
                Number of Questions
              </label>
              <div className="flex flex-wrap gap-3">
                {questionCounts.map((count) => (
                  <button
                    key={count}
                    onClick={() => setConfig(prev => ({ ...prev, questionCount: count }))}
                    className={cn(
                      'px-4 py-2 rounded-lg border transition-all duration-200',
                      config.questionCount === count
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[var(--card-border)] hover:border-[var(--primary)]'
                    )}
                    style={{ 
                      color: config.questionCount === count ? 'var(--primary)' : 'var(--foreground-secondary)',
                      backgroundColor: config.questionCount === count ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}>
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>

            {/* Time Limit */}
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground-secondary)' }}>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time Limit
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {timeLimits.map((limit) => (
                  <button
                    key={limit.value}
                    onClick={() => setConfig(prev => ({ ...prev, timeLimit: limit.value }))}
                    className={cn(
                      'px-4 py-2 rounded-lg border transition-all duration-200',
                      config.timeLimit === limit.value
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-[var(--card-border)] hover:border-[var(--primary)]'
                    )}
                    style={{ 
                      color: config.timeLimit === limit.value ? 'var(--primary)' : 'var(--foreground-secondary)',
                      backgroundColor: config.timeLimit === limit.value ? 'rgba(59, 130, 246, 0.1)' : 'transparent'
                    }}>
                    {limit.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shuffle Toggle */}
            <div className="flex items-center justify-between p-4 rounded-xl border"
              style={{ 
                backgroundColor: 'var(--background-secondary)',
                borderColor: 'var(--card-border)'
              }}>
              <div className="flex items-center gap-3">
                <Shuffle className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <div>
                  <p className="font-medium" style={{ color: 'var(--foreground)' }}>
                    Shuffle Questions
                  </p>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                    Randomize the order of questions
                  </p>
                </div>
              </div>
              <button
                onClick={() => setConfig(prev => ({ ...prev, shuffleQuestions: !prev.shuffleQuestions }))}
                className={cn(
                  'w-12 h-6 rounded-full transition-all duration-200 relative',
                  config.shuffleQuestions ? 'bg-blue-500' : 'bg-gray-600'
                )}>
                <span className={cn(
                  'absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200',
                  config.shuffleQuestions ? 'left-7' : 'left-1'
                )} />
              </button>
            </div>
          </div>

          {/* Start Button */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--card-border)' }}>
            <button
              onClick={handleStartQuiz}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02]"
              style={{ 
                backgroundColor: 'var(--primary)',
                color: 'white'
              }}>
              <Play className="w-5 h-5" />
              Start Quiz
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/main/flashcards"
            className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-[var(--primary)]"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <Target className="w-6 h-6" style={{ color: '#8b5cf6' }} />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>
                Flashcard Mode
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                Study with flashcards
              </p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto" style={{ color: 'var(--foreground-muted)' }} />
          </Link>

          <Link
            href="/main/bookmarks"
            className="flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:border-[var(--primary)]"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
              <History className="w-6 h-6" style={{ color: '#10b981' }} />
            </div>
            <div>
              <h3 className="font-medium" style={{ color: 'var(--foreground)' }}>
                Your Progress
              </h3>
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
                View bookmarks & notes
              </p>
            </div>
            <ChevronRight className="w-5 h-5 ml-auto" style={{ color: 'var(--foreground-muted)' }} />
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center p-3 rounded-lg" style={{ backgroundColor: 'var(--background-secondary)' }}>
      <p className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
        {value}
      </p>
      <p className="text-xs mt-1" style={{ color: 'var(--foreground-muted)' }}>
        {label}
      </p>
    </div>
  );
}
