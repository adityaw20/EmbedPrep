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
