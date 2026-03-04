'use client';

import { useState } from 'react';
import { Printer, Download, X, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Question } from '@/types';

interface PrintButtonProps {
  questions: Question[];
  title?: string;
}

export default function PrintButton({ questions, title = 'EmbedPrep Questions' }: PrintButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [includeAnswers, setIncludeAnswers] = useState(true);
  const [includeExplanations, setIncludeExplanations] = useState(true);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const questionsHTML = questions.map((q, idx) => `
      <div class="question">
        <div class="question-header">
          <span class="question-number">${idx + 1}</span>
          <span class="badge category">${q.category}</span>
          <span class="badge difficulty ${q.difficulty.toLowerCase()}">${q.difficulty}</span>
        </div>
        <h3>${q.question}</h3>
        ${q.codeSnippet ? `<pre class="code"><code>${q.codeSnippet}</code></pre>` : ''}
        ${q.type === 'MCQ' && q.options ? `
          <div class="options">
            ${q.options.map(opt => `
              <div class="option ${includeAnswers && opt.id === q.correctAnswer ? 'correct' : ''}">
                <span class="option-id">${opt.id.toUpperCase()}</span>
                <span>${opt.text}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        ${includeAnswers ? `
          <div class="answer-section">
            <p><strong>Answer:</strong> ${q.type === 'MCQ' ? q.correctAnswer.toUpperCase() : q.correctAnswer}</p>
            ${includeExplanations && q.explanation ? `
              <p><strong>Explanation:</strong> ${q.explanation}</p>
            ` : ''}
          </div>
        ` : ''}
        <div class="tags">${q.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>
    `).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>${title}</title>
        <style>
          * { box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
          }
          .header { text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 2px solid #3b82f6; }
          .header h1 { margin: 0; color: #1a1a2e; }
          .header p { color: #666; margin: 10px 0 0; }
          .question { 
            margin-bottom: 30px; 
            padding: 20px; 
            border: 1px solid #e5e7eb; 
            border-radius: 8px;
            page-break-inside: avoid;
          }
          .question-header { display: flex; gap: 10px; align-items: center; margin-bottom: 10px; }
          .question-number { 
            width: 28px; height: 28px; 
            background: #3b82f6; color: white;
            border-radius: 50%; 
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; font-size: 14px;
          }
          .badge { 
            padding: 2px 8px; 
            border-radius: 4px; 
            font-size: 12px; 
            font-weight: 500;
          }
          .badge.category { background: #e0e7ff; color: #3730a3; }
          .badge.easy { background: #d1fae5; color: #065f46; }
          .badge.medium { background: #fef3c7; color: #92400e; }
          .badge.hard { background: #fee2e2; color: #991b1b; }
          h3 { margin: 10px 0; color: #1a1a2e; }
          pre.code { 
            background: #f3f4f6; 
            padding: 12px; 
            border-radius: 6px; 
            overflow-x: auto;
            font-family: 'Consolas', 'Monaco', monospace;
            font-size: 13px;
          }
          .options { margin: 15px 0; }
          .option { 
            display: flex; 
            gap: 10px; 
            padding: 8px 12px; 
            margin: 5px 0;
            border-radius: 4px;
          }
          .option.correct { background: #d1fae5; }
          .option-id { 
            width: 24px; height: 24px; 
            background: #e5e7eb; 
            border-radius: 4px;
            display: flex; align-items: center; justify-content: center;
            font-weight: bold; font-size: 12px;
          }
          .option.correct .option-id { background: #10b981; color: white; }
          .answer-section { 
            margin-top: 15px; 
            padding: 12px; 
            background: #f0fdf4; 
            border-radius: 6px;
            border-left: 3px solid #10b981;
          }
          .tags { margin-top: 15px; display: flex; gap: 5px; flex-wrap: wrap; }
          .tag { 
            padding: 2px 8px; 
            background: #f3f4f6; 
            border-radius: 4px; 
            font-size: 11px;
            color: #6b7280;
          }
          @media print {
            body { padding: 0; }
            .question { break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${title}</h1>
          <p>Generated by EmbedPrep • ${questions.length} questions</p>
        </div>
        ${questionsHTML}
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    setShowModal(false);
  };

  const handleExportJSON = () => {
    const data = {
      title,
      exportedAt: new Date().toISOString(),
      questions: questions.map(q => ({
        category: q.category,
        subcategory: q.subcategory,
        type: q.type,
        difficulty: q.difficulty,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        tags: q.tags,
      })),
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `embedprep-${title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all border"
        style={{ 
          backgroundColor: 'var(--card)',
          borderColor: 'var(--card-border)',
          color: 'var(--foreground)'
        }}>
        <Printer className="w-4 h-4" />
        Print / Export
      </button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-2xl border"
            style={{ 
              backgroundColor: 'var(--card)',
              borderColor: 'var(--card-border)'
            }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
                Print / Export Questions
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-lg transition-all hover:bg-[var(--background-secondary)]"
                style={{ color: 'var(--foreground-muted)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl" style={{ backgroundColor: 'var(--background-secondary)' }}>
                <p className="text-sm" style={{ color: 'var(--foreground-secondary)' }}>
                  <FileText className="w-4 h-4 inline mr-1" />
                  {questions.length} questions will be included
                </p>
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeAnswers}
                  onChange={(e) => setIncludeAnswers(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-600"
                />
                <span style={{ color: 'var(--foreground)' }}>Include answers</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeExplanations}
                  onChange={(e) => setIncludeExplanations(e.target.checked)}
                  disabled={!includeAnswers}
                  className="w-4 h-4 rounded border-gray-600"
                />
                <span style={{ color: includeAnswers ? 'var(--foreground)' : 'var(--foreground-muted)' }}>
                  Include explanations
                </span>
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all"
                style={{ 
                  backgroundColor: 'var(--primary)',
                  color: 'white'
                }}>
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button
                onClick={handleExportJSON}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium border transition-all"
                style={{ 
                  borderColor: 'var(--card-border)',
                  color: 'var(--foreground)'
                }}>
                <Download className="w-4 h-4" />
                Export JSON
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
