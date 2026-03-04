'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  FlipHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  RotateCcw,
  BookOpen,
  Eye,
  EyeOff,
  Settings,
  CheckCircle,
  XCircle,
  Trophy
} from 'lucide-react';
import { questions } from '@/lib/data';
import { useUserProgress } from '@/lib/hooks';
import { cn, getRandomQuestions, shuffleArray } from '@/lib/utils';
import Link from 'next/link';
import type { Question } from '@/types';

interface FlashcardConfig {
  category: string;
  shuffle: boolean;
  showAnswerFirst: boolean;
  autoFlip: boolean;
}

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'C Programming', label: 'C Programming' },
  { value: 'C++ Programming', label: 'C++ Programming' },
  { value: 'Communication Protocols', label: 'Communication Protocols' },
  { value: 'Embedded Systems', label: 'Embedded Systems' },
  { value: 'RTOS', label: 'RTOS' },
  { value: 'Microcontrollers', label: 'Microcontrollers' },
  { value: 'Interview Questions', label: 'Interview Questions' },
];

export default function FlashcardsPage() {
  const router = useRouter();
  const { markViewed } = useUserProgress();
  const [config, setConfig] = useState<FlashcardConfig>({
    category: 'all',
    shuffle: true,
    showAnswerFirst: false,
    autoFlip: false,
  });
  const [flashcards, setFlashcards] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState<Set<string>>(new Set());
  const [unknownCards, setUnknownCards] = useState<Set<string>>(new Set());
  const [showSetup, setShowSetup] = useState(true);
  const [studyComplete, setStudyComplete] = useState(false);

  const initializeFlashcards = useCallback(() => {
    let filtered = config.category === 'all' 
      ? [...questions]
      : questions.filter(q => q.category === config.category);

    // Filter to descriptive questions only for better flashcard experience
    filtered = filtered.filter(q => q.type === 'DESCRIPTIVE');

    if (config.shuffle) {
      filtered = shuffleArray(filtered);
    }

    // Limit to 30 questions for manageable study session
    setFlashcards(filtered.slice(0, 30));
    setCurrentIndex(0);
    setIsFlipped(config.showAnswerFirst);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setStudyComplete(false);
    setShowSetup(false);
  }, [config]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      markViewed(flashcards[currentIndex]._id);
    }
  };

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(config.showAnswerFirst);
    } else {
      setStudyComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(config.showAnswerFirst);
    }
  };

  const markKnown = () => {
    setKnownCards(prev => new Set([...prev, flashcards[currentIndex]._id]));
    handleNext();
  };

  const markUnknown = () => {
    setUnknownCards(prev => new Set([...prev, flashcards[currentIndex]._id]));
    handleNext();
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setIsFlipped(config.showAnswerFirst);
    setKnownCards(new Set());
    setUnknownCards(new Set());
    setStudyComplete(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showSetup || studyComplete) return;
      
      switch (e.key) {
        case ' ':
          e.preventDefault();
          handleFlip();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrev();
          break;
        case 'k':
        case 'K':
          markKnown();
          break;
        case 'u':
        case 'U':
          markUnknown();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSetup, studyComplete, currentIndex, flashcards, isFlipped]);

  if (showSetup) {
    return (
      <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
              style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
              <FlipHorizontal className="w-8 h-8" style={{ color: '#8b5cf6' }} />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
              Flashcard Study Mode
            </h1>
            <p className="max-w-xl mx-auto" style={{ color: 'var(--foreground-secondary)' }}>
              Study with interactive flashcards. Flip to reveal answers, mark cards as known or unknown,
              and track your progress.
            </p>
          </div>

          {/* Configuration */}
          <div className="p-6 sm:p-8 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h2 className="text-xl font-semibold" style={{ color: 'var(--foreground)' }}>
                Study Settings
              </h2>
            </div>

            <div className="space-y-6">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-3" style={{ color: 'var(--foreground-secondary)' }}>
                  Select Category
                </label>
                <select
                  value={config.category}
                  onChange={(e) => setConfig(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none focus:border-blue-500 transition-all"
                  style={{ 
                    borderColor: 'var(--card-border)',
                    color: 'var(--foreground)'
                  }}>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value} style={{ backgroundColor: 'var(--card)' }}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                <ToggleRow
                  icon={<Shuffle className="w-5 h-5" />}
                  label="Shuffle Cards"
                  description="Randomize the order of flashcards"
                  checked={config.shuffle}
                  onChange={(checked) => setConfig(prev => ({ ...prev, shuffle: checked }))}
                />
                <ToggleRow
                  icon={config.showAnswerFirst ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                  label="Show Answer First"
                  description="Start with the answer side visible"
                  checked={config.showAnswerFirst}
                  onChange={(checked) => setConfig(prev => ({ ...prev, showAnswerFirst: checked }))}
                />
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={initializeFlashcards}
              className="w-full mt-8 flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-[1.02]"
              style={{ 
                backgroundColor: '#8b5cf6',
                color: 'white'
              }}>
              <BookOpen className="w-5 h-5" />
              Start Studying
            </button>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 rounded-xl border"
            style={{ 
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              borderColor: 'rgba(139, 92, 246, 0.2)'
            }}>
            <h3 className="font-medium mb-2" style={{ color: '#8b5cf6' }}>
              Keyboard Shortcuts
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm" style={{ color: 'var(--foreground-secondary)' }}>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--background-secondary)' }}>Space</kbd>
                <span>Flip card</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--background-secondary)' }}>← →</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--background-secondary)' }}>K</kbd>
                <span>Mark known</span>
              </div>
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 rounded" style={{ backgroundColor: 'var(--background-secondary)' }}>U</kbd>
                <span>Mark unknown</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (studyComplete) {
    const totalCards = flashcards.length;
    const knownCount = knownCards.size;
    const unknownCount = unknownCards.size;
    const skippedCount = totalCards - knownCount - unknownCount;
    const masteryRate = Math.round((knownCount / totalCards) * 100);

    return (
      <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
            style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
            <Trophy className="w-10 h-10" style={{ color: '#8b5cf6' }} />
          </div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--foreground)' }}>
            Study Session Complete!
          </h1>
          <p className="mb-8" style={{ color: 'var(--foreground-secondary)' }}>
            Great job! Here is your progress summary.
          </p>

          <div className="p-8 rounded-2xl border mb-8"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            {/* Mastery Rate */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2" style={{ color: '#8b5cf6' }}>
                {masteryRate}%
              </div>
              <p style={{ color: 'var(--foreground-secondary)' }}>Mastery Rate</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                <CheckCircle className="w-6 h-6 mx-auto mb-2" style={{ color: '#10b981' }} />
                <p className="text-2xl font-bold" style={{ color: '#10b981' }}>{knownCount}</p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Known</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}>
                <XCircle className="w-6 h-6 mx-auto mb-2" style={{ color: '#ef4444' }} />
                <p className="text-2xl font-bold" style={{ color: '#ef4444' }}>{unknownCount}</p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Unknown</p>
              </div>
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                <BookOpen className="w-6 h-6 mx-auto mb-2" style={{ color: 'var(--foreground-muted)' }} />
                <p className="text-2xl font-bold" style={{ color: 'var(--foreground-muted)' }}>{skippedCount}</p>
                <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>Skipped</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={restartSession}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
              style={{ 
                backgroundColor: '#8b5cf6',
                color: 'white'
              }}>
              <RotateCcw className="w-5 h-5" />
              Study Again
            </button>
            <button
              onClick={() => setShowSetup(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium border transition-all"
              style={{ 
                borderColor: 'var(--card-border)',
                color: 'var(--foreground)'
              }}>
              <Settings className="w-5 h-5" />
              Change Settings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className="min-h-[calc(100vh-4rem)] py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium" style={{ color: 'var(--foreground-secondary)' }}>
            Card {currentIndex + 1} of {flashcards.length}
          </span>
          <button
            onClick={() => setShowSetup(true)}
            className="text-sm transition-all hover:opacity-70"
            style={{ color: 'var(--primary)' }}>
            Exit
          </button>
        </div>

        {/* Progress Bar */}
        <div className="h-2 rounded-full mb-8 overflow-hidden" style={{ backgroundColor: 'var(--background-secondary)' }}>
          <div 
            className="h-full rounded-full transition-all duration-300"
            style={{ 
              width: `${progress}%`,
              backgroundColor: '#8b5cf6'
            }} />
        </div>

        {/* Flashcard */}
        <div 
          onClick={handleFlip}
          className="relative aspect-[4/3] cursor-pointer group"
          style={{ perspective: '1000px' }}>
          <div 
            className="absolute inset-0 transition-all duration-500"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
            {/* Front - Question */}
            <div 
              className="absolute inset-0 p-6 sm:p-8 rounded-2xl border backface-hidden"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--card-border)',
                backfaceVisibility: 'hidden'
              }}>
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#8b5cf6' }}>
                    {currentCard.category}
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      color: 'var(--foreground-muted)'
                    }}>
                    Question
                  </span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <h2 className="text-xl sm:text-2xl font-semibold text-center" style={{ color: 'var(--foreground)' }}>
                    {currentCard.question}
                  </h2>
                </div>
                {currentCard.codeSnippet && (
                  <div className="mt-4 p-3 rounded-lg text-sm font-mono overflow-x-auto"
                    style={{ 
                      backgroundColor: 'var(--background-secondary)',
                      color: 'var(--foreground-secondary)'
                    }}>
                    {currentCard.codeSnippet}
                  </div>
                )}
                <p className="text-center text-sm mt-4" style={{ color: 'var(--foreground-muted)' }}>
                  Click to flip or press Space
                </p>
              </div>
            </div>

            {/* Back - Answer */}
            <div 
              className="absolute inset-0 p-6 sm:p-8 rounded-2xl border"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--card-border)',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)'
              }}>
              <div className="h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium uppercase tracking-wider" style={{ color: '#10b981' }}>
                    Answer
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full"
                    style={{ 
                      backgroundColor: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981'
                    }}>
                    {currentCard.difficulty}
                  </span>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <p className="text-lg leading-relaxed" style={{ color: 'var(--foreground)' }}>
                    {currentCard.correctAnswer}
                  </p>
                  {currentCard.explanation && (
                    <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--card-border)' }}>
                      <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>
                        <span className="font-medium" style={{ color: 'var(--foreground)' }}>Explanation: </span>
                        {currentCard.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground)'
            }}>
            <ChevronLeft className="w-5 h-5" />
            Prev
          </button>

          <button
            onClick={handleFlip}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
            style={{ 
              backgroundColor: '#8b5cf6',
              color: 'white'
            }}>
            <FlipHorizontal className="w-5 h-5" />
            Flip
          </button>

          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
            style={{ 
              backgroundColor: 'var(--background-secondary)',
              color: 'var(--foreground)'
            }}>
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mark Known/Unknown */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <button
            onClick={markUnknown}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all border"
            style={{ 
              borderColor: 'rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              backgroundColor: 'rgba(239, 68, 68, 0.05)'
            }}>
            <XCircle className="w-5 h-5" />
            Don&apos;t Know (U)
          </button>
          <button
            onClick={markKnown}
            className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
            style={{ 
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              color: '#10b981'
            }}>
            <CheckCircle className="w-5 h-5" />
            Got It (K)
          </button>
        </div>
      </div>
    </div>
  );
}

function ToggleRow({ 
  icon, 
  label, 
  description, 
  checked, 
  onChange 
}: { 
  icon: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border"
      style={{ 
        backgroundColor: 'var(--background-secondary)',
        borderColor: 'var(--card-border)'
      }}>
      <div className="flex items-center gap-3">
        <span style={{ color: 'var(--primary)' }}>{icon}</span>
        <div>
          <p className="font-medium" style={{ color: 'var(--foreground)' }}>{label}</p>
          <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{description}</p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          'w-12 h-6 rounded-full transition-all duration-200 relative',
          checked ? 'bg-blue-500' : 'bg-gray-600'
        )}>
        <span className={cn(
          'absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-200',
          checked ? 'left-7' : 'left-1'
        )} />
      </button>
    </div>
  );
}
