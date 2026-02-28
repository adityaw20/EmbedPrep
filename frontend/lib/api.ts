import axios from 'axios';
import type { QuestionsResponse, Question, Category, Stats, FilterState } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Question APIs
export const questionApi = {
  getAll: async (filters: FilterState & { page?: number; limit?: number } = {}): Promise<QuestionsResponse> => {
    const params = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const response = await api.get(`/questions?${params.toString()}`);
    return response.data;
  },

  getById: async (id: string): Promise<{ success: boolean; data: Question }> => {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  },

  getRelated: async (id: string): Promise<{ success: boolean; data: Question[] }> => {
    const response = await api.get(`/questions/${id}/related`);
    return response.data;
  },

  create: async (data: Partial<Question>): Promise<{ success: boolean; data: Question }> => {
    const response = await api.post('/questions', data);
    return response.data;
  },

  createBulk: async (questions: Partial<Question>[]): Promise<{ success: boolean; count: number }> => {
    const response = await api.post('/questions/bulk', { questions });
    return response.data;
  },

  update: async (id: string, data: Partial<Question>): Promise<{ success: boolean; data: Question }> => {
    const response = await api.put(`/questions/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/questions/${id}`);
    return response.data;
  },

  permanentDelete: async (id: string): Promise<{ success: boolean }> => {
    const response = await api.delete(`/questions/${id}/permanent`);
    return response.data;
  },
};

// Category APIs
export const categoryApi = {
  getAll: async (): Promise<{ success: boolean; data: Category[] }> => {
    const response = await api.get('/categories');
    return response.data;
  },
};

// Stats APIs
export const statsApi = {
  getStats: async (): Promise<{ success: boolean; data: Stats }> => {
    const response = await api.get('/stats');
    return response.data;
  },
};

// Auth APIs
export const authApi = {
  login: async (username: string, password: string): Promise<{ success: boolean; token: string; user: { username: string; role: string } }> => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },

  verify: async (): Promise<{ success: boolean; user: { username: string; role: string } }> => {
    const response = await api.get('/auth/verify');
    return response.data;
  },
};

// Upload APIs
export const uploadApi = {
  uploadCSV: async (file: File): Promise<{ success: boolean; count: number; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  uploadJSON: async (file: File): Promise<{ success: boolean; count: number; message: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/upload/json', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  downloadCSVTemplate: async (): Promise<Blob> => {
    const response = await api.get('/upload/template/csv', {
      responseType: 'blob',
    });
    return response.data;
  },

  downloadJSONTemplate: async (): Promise<Blob> => {
    const response = await api.get('/upload/template/json', {
      responseType: 'blob',
    });
    return response.data;
  },
};

export default api;
