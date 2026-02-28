export interface Question {
  _id: string;
  category: string;
  subcategory: string;
  type: 'MCQ' | 'DESCRIPTIVE';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  experienceLevel: 'Fresher' | '1-3 Years' | '3-5 Years' | '5+ Years' | 'Automotive' | 'Product Companies';
  question: string;
  codeSnippet?: string;
  options?: Option[];
  correctAnswer: string;
  explanation: string;
  tags: string[];
  source?: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  id: string;
  text: string;
}

export interface Category {
  name: string;
  subcategories: string[];
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface QuestionsResponse {
  success: boolean;
  data: Question[];
  pagination: Pagination;
}

export interface Stats {
  totalQuestions: number;
  byCategory: { _id: string; count: number }[];
  byDifficulty: { _id: string; count: number }[];
  byExperience: { _id: string; count: number }[];
}

export interface FilterState {
  category?: string;
  subcategory?: string;
  difficulty?: string;
  experienceLevel?: string;
  type?: string;
  search?: string;
  tags?: string[];
}

export interface AdminUser {
  username: string;
  role: string;
}

export const CATEGORIES = [
  'C Programming',
  'C++ Programming',
  'Communication Protocols',
  'Embedded Systems',
  'RTOS',
  'Microcontrollers',
  'IoT',
  'PCB & Hardware Design',
  'Interview Questions',
] as const;

export const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;

export const EXPERIENCE_LEVELS = [
  'Fresher',
  '1-3 Years',
  '3-5 Years',
  '5+ Years',
  'Automotive',
  'Product Companies',
] as const;

export const QUESTION_TYPES = ['MCQ', 'DESCRIPTIVE'] as const;
