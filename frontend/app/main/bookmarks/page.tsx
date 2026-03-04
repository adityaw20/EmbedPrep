'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Eye, 
  StickyNote, 
  Trash2, 
  Search,
  ChevronRight,
  Filter,
  Trophy,
  Flame,
  TrendingUp,
  X
} from 'lucide-react';
import { questions } from '@/lib/data';
import { useUserProgress } from '@/lib/hooks';
import { cn, formatDuration } from '@/lib/utils';
import QuestionCard from '@/components/QuestionCard';

export default function BookmarksPage() {
  const { 
    progress, 
    getProgressStats, 
    getQuizStats, 
    getStudyStreak,
    toggleBookmark, 
    deleteNote,
    clearProgress 
  } = useUserProgress();
  
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'history' | 'notes' | 'stats'>('stats');
  const [searchQuery, setSearchQuery] = useState('');
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const stats = getProgressStats();
  const quizStats = getQuizStats();
  const streak = getStudyStreak();

  // Get bookmarked questions
  const bookmarkedQuestions = useMemo(() => {
    return questions.filter(q => progress.bookmarkedQuestions.includes(q._id));
  }, [progress.bookmarkedQuestions]);

  // Get viewed questions
  const viewedQuestions = useMemo(() => {
    return questions.filter(q => progress.viewedQuestions.includes(q._id));
  }, [progress.viewedQuestions]);

  // Get questions with notes
  const questionsWithNotes = useMemo(() => {
    return Object.entries(progress.questionNotes).map(([id, note]) => ({
      question: questions.find(q => q._id === id),
      note,
      id
    })).filter(item => item.question);
  }, [progress.questionNotes]);

  // Filter by search
  const filteredBookmarks = bookmarkedQuestions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = viewedQuestions.filter(q => 
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearAll = () => {
    clearProgress();
    setShowClearConfirm(false);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-1" style={{ color: 'var(--foreground)' }}>
              Your Progress
            </h1>
            <p style={{ color: 'var(--foreground-secondary)' }}>
              Track your learning journey and manage your bookmarks
            </p>
          </div>
          <button
            onClick={() => setShowClearConfirm(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all border border-red-500/30 text-red-400 hover:bg-red-500/10"
            style={{ backgroundColor: 'rgba(239, 68, 68, 0.05)' }}>
            <Trash2 className="w-4 h-4" />
            Clear All Data
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <StatCard 
            icon={<Eye className="w-5 h-5" />}
            label="Viewed"
            value={stats.viewedCount}
            color="blue"
          />
          <StatCard 
            icon={<Bookmark className="w-5 h-5" />}
            label="Bookmarked"
            value={stats.bookmarkedCount}
            color="yellow"
          />
          <StatCard 
            icon={<StickyNote className="w-5 h-5" />}
            label="Notes"
            value={stats.notesCount}
            color="green"
          />
          <StatCard 
            icon={<Flame className="w-5 h-5" />}
            label="Day Streak"
            value={stats.streak}
            color="orange"
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b pb-4" style={{ borderColor: 'var(--card-border)' }}>
          {[
            { id: 'stats', label: 'Statistics', icon: TrendingUp },
            { id: 'bookmarks', label: `Bookmarks (${stats.bookmarkedCount})`, icon: Bookmark },
            { id: 'history', label: `History (${stats.viewedCount})`, icon: Eye },
            { id: 'notes', label: `Notes (${stats.notesCount})`, icon: StickyNote },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-[var(--foreground-secondary)] hover:bg-[var(--background-secondary)]'
              )}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'stats' && (
          <div className="space-y-6">
            {/* Quiz Stats */}
            {quizStats && (
              <div className="p-6 rounded-2xl border"
                style={{ 
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--card-border)'
                }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                    <Trophy className="w-5 h-5" style={{ color: '#10b981' }} />
                  </div>
                  <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                    Quiz Statistics
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{quizStats.totalQuizzes}</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Total Quizzes</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{quizStats.avgScore}%</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Average Score</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{quizStats.bestScore}%</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Best Score</p>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>{formatDuration(quizStats.totalTime)}</p>
                    <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Total Time</p>
                  </div>
                </div>
              </div>
            )}

            {/* Study Streak */}
            <div className="p-6 rounded-2xl border"
              style={{ 
                backgroundColor: 'var(--card)',
                borderColor: 'var(--card-border)'
              }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg" style={{ backgroundColor: 'rgba(249, 115, 22, 0.1)' }}>
                  <Flame className="w-5 h-5" style={{ color: '#f97316' }} />
                </div>
                <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                  Study Streak
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                  <p className="text-3xl font-bold" style={{ color: '#f97316' }}>{streak.currentStreak}</p>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Current Streak</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                  <p className="text-3xl font-bold" style={{ color: '#f97316' }}>{streak.longestStreak}</p>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Longest Streak</p>
                </div>
                <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                  <p className="text-3xl font-bold" style={{ color: '#f97316' }}>{streak.totalStudyDays}</p>
                  <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>Total Study Days</p>
                </div>
              </div>
              {streak.lastStudyDate && (
                <p className="mt-4 text-sm" style={{ color: 'var(--foreground-muted)' }}>
                  Last studied: {new Date(streak.lastStudyDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--foreground-muted)' }} />
              <input
                type="text"
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:border-blue-500 transition-all"
                style={{ 
                  borderColor: 'var(--card-border)',
                  color: 'var(--foreground)'
                }}
              />
            </div>

            {/* Bookmarks Grid */}
            {filteredBookmarks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookmarks.map(question => (
                  <div key={question._id} className="relative group">
                    <QuestionCard question={question} />
                    <button
                      onClick={() => toggleBookmark(question._id)}
                      className="absolute top-3 right-3 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all bg-red-500/10 text-red-400"
                      title="Remove bookmark">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<Bookmark className="w-12 h-12" />}
                title="No Bookmarks Yet"
                description={searchQuery ? "No bookmarks match your search." : "Bookmark questions to save them for later review."}
              />
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--foreground-muted)' }} />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:border-blue-500 transition-all"
                style={{ 
                  borderColor: 'var(--card-border)',
                  color: 'var(--foreground)'
                }}
              />
            </div>

            {/* History Grid */}
            {filteredHistory.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHistory.slice().reverse().map(question => (
                  <QuestionCard key={question._id} question={question} />
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={<Eye className="w-12 h-12" />}
                title="No Viewed Questions"
                description="Questions you view will appear here."
              />
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-4">
            {questionsWithNotes.length > 0 ? (
              questionsWithNotes.map(({ question, note, id }) => (
                <div 
                  key={id}
                  className="p-6 rounded-2xl border"
                  style={{ 
                    backgroundColor: 'var(--card)',
                    borderColor: 'var(--card-border)'
                  }}>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--primary)' }}>
                        {question?.category}
                      </span>
                      <h3 className="font-medium mt-1" style={{ color: 'var(--foreground)' }}>
                        {question?.question}
                      </h3>
                    </div>
                    <button
                      onClick={() => deleteNote(id)}
                      className="p-2 rounded-lg transition-all hover:bg-red-500/10 text-red-400"
                      title="Delete note">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                    <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>{note}</p>
                  </div>
                  <Link
                    href={`/question/${id}`}
                    className="inline-flex items-center gap-1 mt-4 text-sm transition-all hover:gap-2"
                    style={{ color: 'var(--primary)' }}>
                    View Question <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              ))
            ) : (
              <EmptyState 
                icon={<StickyNote className="w-12 h-12" />}
                title="No Notes Yet"
                description="Add notes to questions to remember key insights."
              />
            )}
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--foreground)' }}>
              Clear All Progress?
            </h3>
            <p className="mb-6" style={{ color: 'var(--foreground-secondary)' }}>
              This will permanently delete all your bookmarks, notes, quiz results, and study streak. 
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--background-secondary)',
                  color: 'var(--foreground)'
                }}>
                Cancel
              </button>
              <button
                onClick={handleClearAll}
                className="flex-1 px-4 py-2 rounded-lg font-medium transition-all bg-red-500 text-white"
                style={{ backgroundColor: '#ef4444' }}>
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: number;
  color: 'blue' | 'yellow' | 'green' | 'orange';
}) {
  const colors = {
    blue: { bg: 'rgba(59, 130, 246, 0.1)', text: '#3b82f6' },
    yellow: { bg: 'rgba(234, 179, 8, 0.1)', text: '#eab308' },
    green: { bg: 'rgba(16, 185, 129, 0.1)', text: '#10b981' },
    orange: { bg: 'rgba(249, 115, 22, 0.1)', text: '#f97316' },
  };

  return (
    <div className="p-4 rounded-2xl border"
      style={{ 
        backgroundColor: 'var(--card)',
        borderColor: 'var(--card-border)'
      }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg" style={{ backgroundColor: colors[color].bg }}>
          <span style={{ color: colors[color].text }}>{icon}</span>
        </div>
      </div>
      <p className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>{value}</p>
      <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{label}</p>
    </div>
  );
}

function EmptyState({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-4"
        style={{ backgroundColor: 'var(--background-secondary)' }}>
        <span style={{ color: 'var(--foreground-muted)' }}>{icon}</span>
      </div>
      <h3 className="text-lg font-medium mb-1" style={{ color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p style={{ color: 'var(--foreground-muted)' }}>{description}</p>
    </div>
  );
}
