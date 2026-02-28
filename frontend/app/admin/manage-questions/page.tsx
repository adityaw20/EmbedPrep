'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Search, Edit2, Trash2, Eye, AlertTriangle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { questionApi } from '@/lib/api';
import { cn, getDifficultyColor } from '@/lib/utils';
import type { Question, Pagination as PaginationType, FilterState } from '@/types';
import toast from 'react-hot-toast';

export default function ManageQuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const fetchQuestions = useCallback(async (page = 1, search = '') => {
    setLoading(true);
    try {
      const filters: FilterState = search ? { search } : {};
      const response = await questionApi.getAll({ ...filters, page, limit: 20 });
      
      if (response.success) {
        setQuestions(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      toast.error('Failed to load questions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleSearch = () => {
    fetchQuestions(1, searchQuery);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await questionApi.delete(id);
      if (response.success) {
        toast.success('Question deleted successfully');
        setQuestions(questions.filter((q) => q._id !== id));
        setDeleteConfirm(null);
      }
    } catch (error) {
      toast.error('Failed to delete question');
    }
  };

  const handlePageChange = (page: number) => {
    fetchQuestions(page, searchQuery);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Manage Questions</h1>
        <p className="text-foreground-secondary">
          View, edit, or delete questions from the database.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search questions..."
            className="w-full pl-12 pr-4 py-3 rounded-lg bg-background-secondary border border-card-border text-foreground placeholder-foreground-muted focus:outline-none focus:border-primary/50"
          />
        </div>
        <button
          onClick={handleSearch}
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors"
        >
          Search
        </button>
      </div>

      {/* Questions Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
        </div>
      ) : questions.length > 0 ? (
        <>
          <div className="overflow-x-auto rounded-xl border border-card-border">
            <table className="w-full">
              <thead>
                <tr className="bg-card border-b border-card-border">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-foreground">Question</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Difficulty</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Type</th>
                  <th className="text-left py-4 px-4 text-sm font-semibold text-foreground">Views</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question) => (
                  <tr
                    key={question._id}
                    className="border-b border-card-border last:border-b-0 hover:bg-card-hover/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <p className="text-foreground font-medium line-clamp-2 max-w-md">
                        {question.question}
                      </p>
                      <p className="text-xs text-foreground-muted mt-1">
                        {question.subcategory}
                      </p>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground-secondary">
                      {question.category}
                    </td>
                    <td className="py-4 px-4">
                      <span className={cn('px-2 py-1 text-xs rounded-full', getDifficultyColor(question.difficulty))}>
                        {question.difficulty}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground-secondary">
                      {question.type}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground-secondary">
                      {question.viewCount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/question/${question._id}`}
                          target="_blank"
                          className="p-2 text-foreground-secondary hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setEditingQuestion(question)}
                          className="p-2 text-foreground-secondary hover:text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(question._id)}
                          className="p-2 text-foreground-secondary hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="p-2 rounded-lg border border-card-border bg-background-secondary text-foreground-secondary disabled:opacity-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-foreground-secondary">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={!pagination.hasNextPage}
                className="p-2 rounded-lg border border-card-border bg-background-secondary text-foreground-secondary disabled:opacity-50"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card border border-card-border flex items-center justify-center">
            <Search className="w-8 h-8 text-foreground-muted" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No questions found</h3>
          <p className="text-foreground-secondary">Try adjusting your search query.</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-card-border rounded-xl p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Confirm Delete</h3>
            </div>
            <p className="text-foreground-secondary mb-6">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-foreground-secondary hover:text-foreground transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - Simplified version */}
      {editingQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-card-border rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Edit Question</h3>
              <button
                onClick={() => setEditingQuestion(null)}
                className="p-2 text-foreground-secondary hover:text-foreground rounded-lg hover:bg-background-secondary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-foreground-secondary mb-4">
              Full editing functionality coming soon. For now, please delete and re-add the question.
            </p>
            <div className="p-4 bg-background-secondary rounded-lg mb-4">
              <p className="text-sm text-foreground-muted mb-2">Question ID:</p>
              <p className="text-sm font-mono text-foreground">{editingQuestion._id}</p>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingQuestion(null)}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
