import type { QuestionsResponse, Question, Category, Stats, FilterState } from '@/types';
import { 
  questions, 
  categories, 
  stats, 
  getFilteredQuestions, 
  getQuestionById, 
  getRelatedQuestions 
} from './data';

// Local data API - no backend needed!
export const questionApi = {
  getAll: async (filters: FilterState & { page?: number; limit?: number } = {}): Promise<QuestionsResponse> => {
    // Simulate network delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const result = getFilteredQuestions({
      category: filters.category,
      subcategory: filters.subcategory,
      difficulty: filters.difficulty,
      experienceLevel: filters.experienceLevel,
      type: filters.type,
      search: filters.search,
      tags: filters.tags,
      page: filters.page || 1,
      limit: filters.limit || 20
    });

    return {
      success: true,
      data: result.data,
      pagination: result.pagination
    };
  },

  getById: async (id: string): Promise<{ success: boolean; data: Question }> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const question = getQuestionById(id);
    if (!question) {
      throw new Error('Question not found');
    }
    
    return {
      success: true,
      data: question
    };
  },

  getRelated: async (id: string): Promise<{ success: boolean; data: Question[] }> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const related = getRelatedQuestions(id);
    return {
      success: true,
      data: related
    };
  },

  // Admin functions - disabled for static site
  create: async (): Promise<{ success: boolean; data: Question }> => {
    throw new Error('Admin functions not available in static mode');
  },

  createBulk: async (): Promise<{ success: boolean; count: number }> => {
    throw new Error('Admin functions not available in static mode');
  },

  update: async (): Promise<{ success: boolean; data: Question }> => {
    throw new Error('Admin functions not available in static mode');
  },

  delete: async (): Promise<{ success: boolean }> => {
    throw new Error('Admin functions not available in static mode');
  },

  permanentDelete: async (): Promise<{ success: boolean }> => {
    throw new Error('Admin functions not available in static mode');
  },
};

// Category APIs
export const categoryApi = {
  getAll: async (): Promise<{ success: boolean; data: Category[] }> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return {
      success: true,
      data: categories
    };
  },
};

// Stats APIs
export const statsApi = {
  getStats: async (): Promise<{ success: boolean; data: Stats }> => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return {
      success: true,
      data: stats
    };
  },
};

// Auth APIs - disabled for static site
export const authApi = {
  login: async (): Promise<{ success: boolean; token: string; user: { username: string; role: string } }> => {
    throw new Error('Authentication not available in static mode');
  },

  verify: async (): Promise<{ success: boolean; user: { username: string; role: string } }> => {
    throw new Error('Authentication not available in static mode');
  },
};

// Upload APIs - disabled for static site
export const uploadApi = {
  uploadCSV: async (): Promise<{ success: boolean; count: number; message: string }> => {
    throw new Error('Upload not available in static mode');
  },

  uploadJSON: async (): Promise<{ success: boolean; count: number; message: string }> => {
    throw new Error('Upload not available in static mode');
  },

  downloadCSVTemplate: async (): Promise<Blob> => {
    throw new Error('Download not available in static mode');
  },

  downloadJSONTemplate: async (): Promise<Blob> => {
    throw new Error('Download not available in static mode');
  },
};

export default {
  questionApi,
  categoryApi,
  statsApi,
  authApi,
  uploadApi
};
