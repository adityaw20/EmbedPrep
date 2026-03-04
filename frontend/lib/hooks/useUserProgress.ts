'use client';

import { useLocalStorage } from './useLocalStorage';

interface UserProgress {
  viewedQuestions: string[];
  bookmarkedQuestions: string[];
  questionNotes: Record<string, string>;
  quizResults: QuizResult[];
  studyStreak: StudyStreak;
}

interface QuizResult {
  id: string;
  date: string;
  score: number;
  total: number;
  category: string;
  timeSpent: number; // in seconds
}

interface StudyStreak {
  lastStudyDate: string;
  currentStreak: number;
  longestStreak: number;
  totalStudyDays: number;
}

const defaultProgress: UserProgress = {
  viewedQuestions: [],
  bookmarkedQuestions: [],
  questionNotes: {},
  quizResults: [],
  studyStreak: {
    lastStudyDate: '',
    currentStreak: 0,
    longestStreak: 0,
    totalStudyDays: 0,
  },
};

export function useUserProgress() {
  const [progress, setProgress] = useLocalStorage<UserProgress>('embedprep-progress', defaultProgress);

  // Mark question as viewed
  const markViewed = (questionId: string) => {
    setProgress(prev => {
      if (prev.viewedQuestions.includes(questionId)) return prev;
      
      // Update study streak
      const today = new Date().toDateString();
      const lastDate = prev.studyStreak.lastStudyDate;
      let streak = { ...prev.studyStreak };
      
      if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
          streak.currentStreak += 1;
          streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
        } else if (lastDate !== today) {
          streak.currentStreak = 1;
        }
        streak.lastStudyDate = today;
        streak.totalStudyDays += 1;
      }
      
      return {
        ...prev,
        viewedQuestions: [...prev.viewedQuestions, questionId],
        studyStreak: streak,
      };
    });
  };

  // Toggle bookmark
  const toggleBookmark = (questionId: string) => {
    setProgress(prev => {
      const isBookmarked = prev.bookmarkedQuestions.includes(questionId);
      return {
        ...prev,
        bookmarkedQuestions: isBookmarked
          ? prev.bookmarkedQuestions.filter(id => id !== questionId)
          : [...prev.bookmarkedQuestions, questionId],
      };
    });
  };

  const isBookmarked = (questionId: string): boolean => {
    return progress.bookmarkedQuestions.includes(questionId);
  };

  const isViewed = (questionId: string): boolean => {
    return progress.viewedQuestions.includes(questionId);
  };

  // Notes
  const addNote = (questionId: string, note: string) => {
    setProgress(prev => ({
      ...prev,
      questionNotes: {
        ...prev.questionNotes,
        [questionId]: note,
      },
    }));
  };

  const getNote = (questionId: string): string => {
    return progress.questionNotes[questionId] || '';
  };

  const deleteNote = (questionId: string) => {
    setProgress(prev => {
      const newNotes = { ...prev.questionNotes };
      delete newNotes[questionId];
      return {
        ...prev,
        questionNotes: newNotes,
      };
    });
  };

  // Quiz results
  const addQuizResult = (result: Omit<QuizResult, 'id' | 'date'>) => {
    const newResult: QuizResult = {
      ...result,
      id: `quiz-${Date.now()}`,
      date: new Date().toISOString(),
    };
    setProgress(prev => ({
      ...prev,
      quizResults: [...prev.quizResults.slice(-19), newResult], // Keep last 20
    }));
  };

  const getQuizStats = () => {
    const results = progress.quizResults;
    if (results.length === 0) return null;
    
    const totalQuizzes = results.length;
    const avgScore = results.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / totalQuizzes;
    const bestScore = Math.max(...results.map(r => (r.score / r.total) * 100));
    const totalTime = results.reduce((sum, r) => sum + r.timeSpent, 0);
    
    return {
      totalQuizzes,
      avgScore: Math.round(avgScore),
      bestScore: Math.round(bestScore),
      totalTime,
    };
  };

  // Get study streak
  const getStudyStreak = () => progress.studyStreak;

  // Get progress stats
  const getProgressStats = () => {
    return {
      viewedCount: progress.viewedQuestions.length,
      bookmarkedCount: progress.bookmarkedQuestions.length,
      notesCount: Object.keys(progress.questionNotes).length,
      streak: progress.studyStreak.currentStreak,
    };
  };

  // Clear all progress
  const clearProgress = () => {
    setProgress(defaultProgress);
  };

  return {
    progress,
    markViewed,
    toggleBookmark,
    isBookmarked,
    isViewed,
    addNote,
    getNote,
    deleteNote,
    addQuizResult,
    getQuizStats,
    getStudyStreak,
    getProgressStats,
    clearProgress,
  };
}
