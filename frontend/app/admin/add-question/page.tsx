'use client';

import { useState } from 'react';
import { PlusCircle, X, Trash2 } from 'lucide-react';
import { questionApi } from '@/lib/api';
import { CATEGORIES, DIFFICULTIES, EXPERIENCE_LEVELS, QUESTION_TYPES } from '@/types';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Option {
  id: string;
  text: string;
}

export default function AddQuestionPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subcategory: '',
    type: 'MCQ',
    difficulty: '',
    experienceLevel: '',
    question: '',
    codeSnippet: '',
    options: [{ id: 'a', text: '' }, { id: 'b', text: '' }] as Option[],
    correctAnswer: '',
    explanation: '',
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (id: string, text: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options.map((opt) => (opt.id === id ? { ...opt, text } : opt)),
    }));
  };

  const addOption = () => {
    if (formData.options.length >= 6) {
      toast.error('Maximum 6 options allowed');
      return;
    }
    const nextId = String.fromCharCode(97 + formData.options.length); // a, b, c, d, e, f
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { id: nextId, text: '' }],
    }));
  };

  const removeOption = (id: string) => {
    if (formData.options.length <= 2) {
      toast.error('Minimum 2 options required');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt.id !== id),
    }));
  };

  const addTag = () => {
    if (!tagInput.trim()) return;
    if (formData.tags.includes(tagInput.trim())) {
      toast.error('Tag already exists');
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tags: [...prev.tags, tagInput.trim()],
    }));
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.category || !formData.difficulty || !formData.experienceLevel || !formData.question || !formData.correctAnswer || !formData.explanation) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.type === 'MCQ' && formData.options.some((opt) => !opt.text)) {
      toast.error('Please fill in all option texts');
      return;
    }

    setLoading(true);
    try {
      const dataToSubmit = {
        ...formData,
        subcategory: formData.subcategory || formData.category,
      };

      const response = await questionApi.create(dataToSubmit);
      
      if (response.success) {
        toast.success('Question added successfully!');
        // Reset form
        setFormData({
          category: '',
          subcategory: '',
          type: 'MCQ',
          difficulty: '',
          experienceLevel: '',
          question: '',
          codeSnippet: '',
          options: [{ id: 'a', text: '' }, { id: 'b', text: '' }],
          correctAnswer: '',
          explanation: '',
          tags: [],
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add question');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Add Question</h1>
        <p className="text-foreground-secondary">
          Add a new question to the database. Fill in all required fields.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="p-6 rounded-xl bg-card border border-card-border space-y-6">
          {/* Category & Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Category <span className="text-red-400">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Subcategory
              </label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                placeholder="e.g., Pointers, UART, etc."
                className="input"
              />
            </div>
          </div>

          {/* Type, Difficulty, Experience */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Type <span className="text-red-400">*</span>
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="input"
                required
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Difficulty <span className="text-red-400">*</span>
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Difficulty</option>
                {DIFFICULTIES.map((diff) => (
                  <option key={diff} value={diff}>{diff}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Experience Level <span className="text-red-400">*</span>
              </label>
              <select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Level</option>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Question <span className="text-red-400">*</span>
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              rows={4}
              placeholder="Enter your question here..."
              className="input resize-none"
              required
            />
          </div>

          {/* Code Snippet */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Code Snippet (Optional)
            </label>
            <textarea
              name="codeSnippet"
              value={formData.codeSnippet}
              onChange={handleChange}
              rows={4}
              placeholder="Enter code snippet if applicable..."
              className="input font-mono resize-none"
            />
          </div>

          {/* Options for MCQ */}
          {formData.type === 'MCQ' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Options <span className="text-red-400">*</span>
              </label>
              <div className="space-y-3">
                {formData.options.map((option, index) => (
                  <div key={option.id} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-background-secondary flex items-center justify-center font-medium text-sm text-foreground-secondary">
                      {option.id.toUpperCase()}
                    </span>
                    <input
                      type="text"
                      value={option.text}
                      onChange={(e) => handleOptionChange(option.id, e.target.value)}
                      placeholder={`Option ${option.id.toUpperCase()}`}
                      className="input flex-1"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => removeOption(option.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addOption}
                className="mt-3 text-sm text-primary hover:text-primary-hover flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Option
              </button>
            </div>
          )}

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Correct Answer <span className="text-red-400">*</span>
            </label>
            {formData.type === 'MCQ' ? (
              <select
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="">Select Correct Answer</option>
                {formData.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.id.toUpperCase()}: {opt.text || `Option ${opt.id.toUpperCase()}`}
                  </option>
                ))}
              </select>
            ) : (
              <textarea
                name="correctAnswer"
                value={formData.correctAnswer}
                onChange={handleChange}
                rows={4}
                placeholder="Enter the correct answer..."
                className="input resize-none"
                required
              />
            )}
          </div>

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Explanation <span className="text-red-400">*</span>
            </label>
            <textarea
              name="explanation"
              value={formData.explanation}
              onChange={handleChange}
              rows={4}
              placeholder="Explain the answer in detail..."
              className="input resize-none"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                placeholder="Add a tag and press Enter"
                className="input flex-1"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-background-secondary border border-card-border rounded-lg text-foreground-secondary hover:text-foreground transition-colors"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'px-8 py-3 bg-primary text-white font-medium rounded-lg',
              'hover:bg-primary-hover transition-all',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'flex items-center gap-2'
            )}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5" />
                Add Question
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-6 py-3 text-foreground-secondary hover:text-foreground transition-colors"
          >
            Reset Form
          </button>
        </div>
      </form>
    </div>
  );
}
