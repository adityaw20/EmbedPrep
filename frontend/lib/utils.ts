import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Hard':
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
}

export function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    'C Programming': '💻',
    'C++ Programming': '⚡',
    'Communication Protocols': '📡',
    'Embedded Systems': '🔧',
    'RTOS': '⏱️',
    'Microcontrollers': '🤖',
    'IoT': '🌐',
    'PCB & Hardware Design': '🔌',
    'Interview Questions': '🎯',
  };
  return icons[category] || '📚';
}

export function getCategoryGradient(category: string): string {
  const gradients: Record<string, string> = {
    'C Programming': 'from-blue-500/20 to-cyan-500/20',
    'C++ Programming': 'from-purple-500/20 to-pink-500/20',
    'Communication Protocols': 'from-green-500/20 to-emerald-500/20',
    'Embedded Systems': 'from-orange-500/20 to-amber-500/20',
    'RTOS': 'from-red-500/20 to-rose-500/20',
    'Microcontrollers': 'from-indigo-500/20 to-violet-500/20',
    'IoT': 'from-cyan-500/20 to-blue-500/20',
    'PCB & Hardware Design': 'from-yellow-500/20 to-orange-500/20',
    'Interview Questions': 'from-pink-500/20 to-rose-500/20',
  };
  return gradients[category] || 'from-gray-500/20 to-gray-600/20';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

export function unslugify(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

export function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export function getRandomQuestions<T>(array: T[], count: number): T[] {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

export function copyToClipboard(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => resolve(true)).catch(() => resolve(false));
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        resolve(true);
      } catch {
        resolve(false);
      }
      document.body.removeChild(textArea);
    }
  });
}

export function generateQuizId(): string {
  return `quiz-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function calculatePercentage(score: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function getGrade(percentage: number): { grade: string; color: string } {
  if (percentage >= 90) return { grade: 'A+', color: 'text-green-400' };
  if (percentage >= 80) return { grade: 'A', color: 'text-green-400' };
  if (percentage >= 70) return { grade: 'B', color: 'text-blue-400' };
  if (percentage >= 60) return { grade: 'C', color: 'text-yellow-400' };
  if (percentage >= 50) return { grade: 'D', color: 'text-orange-400' };
  return { grade: 'F', color: 'text-red-400' };
}
