'use client';

import { useState, useRef } from 'react';
import { Upload, FileJson, FileSpreadsheet, Download, Check, AlertCircle } from 'lucide-react';
import { uploadApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ success: number; errors: string[] } | null>(null);
  const csvInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File, type: 'csv' | 'json') => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(null);

    try {
      const response = type === 'csv' 
        ? await uploadApi.uploadCSV(file)
        : await uploadApi.uploadJSON(file);

      if (response.success) {
        toast.success(`Successfully uploaded ${response.count} questions!`);
        setUploadProgress({
          success: response.count,
          errors: response.errors || [],
        });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Upload failed');
      setUploadProgress({
        success: 0,
        errors: [error.response?.data?.message || 'Unknown error'],
      });
    } finally {
      setUploading(false);
      // Reset file inputs
      if (csvInputRef.current) csvInputRef.current.value = '';
      if (jsonInputRef.current) jsonInputRef.current.value = '';
    }
  };

  const downloadTemplate = async (type: 'csv' | 'json') => {
    try {
      const blob = type === 'csv' 
        ? await uploadApi.downloadCSVTemplate()
        : await uploadApi.downloadJSONTemplate();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `embedprep_template.${type}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success(`Template downloaded: embedprep_template.${type}`);
    } catch (error) {
      toast.error('Failed to download template');
    }
  };

  const UploadCard = ({
    title,
    description,
    icon: Icon,
    accept,
    inputRef,
    onUpload,
    templateType,
  }: {
    title: string;
    description: string;
    icon: React.ElementType;
    accept: string;
    inputRef: React.RefObject<HTMLInputElement>;
    onUpload: (file: File) => void;
    templateType: 'csv' | 'json';
  }) => (
    <div className="p-6 rounded-xl bg-card border border-card-border">
      <div className="flex items-start justify-between mb-6">
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <button
          onClick={() => downloadTemplate(templateType)}
          className="text-sm text-primary hover:text-primary-hover flex items-center gap-1"
        >
          <Download className="w-4 h-4" />
          Template
        </button>
      </div>
      
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground-secondary mb-6">{description}</p>

      <div
        onClick={() => inputRef.current?.click()}
        className={cn(
          'border-2 border-dashed border-card-border rounded-xl p-8 text-center cursor-pointer',
          'hover:border-primary/50 hover:bg-primary/5 transition-all',
          uploading && 'opacity-50 cursor-not-allowed'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onUpload(file);
          }}
          disabled={uploading}
          className="hidden"
        />
        <Upload className="w-8 h-8 text-foreground-muted mx-auto mb-3" />
        <p className="text-sm text-foreground-secondary">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-foreground-muted mt-1">
          {accept.toUpperCase()} files only (max 10MB)
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Bulk Upload</h1>
        <p className="text-foreground-secondary">
          Upload multiple questions at once using CSV or JSON files.
        </p>
      </div>

      {/* Upload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <UploadCard
          title="CSV Upload"
          description="Upload questions from a CSV file. Best for spreadsheet editors."
          icon={FileSpreadsheet}
          accept=".csv"
          inputRef={csvInputRef}
          onUpload={(file) => handleFileUpload(file, 'csv')}
          templateType="csv"
        />
        <UploadCard
          title="JSON Upload"
          description="Upload questions from a JSON file. Best for programmatic generation."
          icon={FileJson}
          accept=".json"
          inputRef={jsonInputRef}
          onUpload={(file) => handleFileUpload(file, 'json')}
          templateType="json"
        />
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="p-6 rounded-xl bg-primary/5 border border-primary/20 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-foreground">Uploading questions...</p>
          </div>
        </div>
      )}

      {/* Upload Results */}
      {uploadProgress && (
        <div className={cn(
          'p-6 rounded-xl border mb-8',
          uploadProgress.errors.length === 0
            ? 'bg-green-500/5 border-green-500/20'
            : 'bg-yellow-500/5 border-yellow-500/20'
        )}>
          <div className="flex items-center gap-3 mb-4">
            {uploadProgress.errors.length === 0 ? (
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Check className="w-5 h-5 text-green-400" />
              </div>
            ) : (
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
              </div>
            )}
            <div>
              <h3 className={cn(
                'font-semibold',
                uploadProgress.errors.length === 0 ? 'text-green-400' : 'text-yellow-400'
              )}>
                Upload {uploadProgress.errors.length === 0 ? 'Successful' : 'Completed with Warnings'}
              </h3>
              <p className="text-sm text-foreground-secondary">
                {uploadProgress.success} questions uploaded successfully
              </p>
            </div>
          </div>

          {uploadProgress.errors.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-foreground mb-2">Warnings/Errors:</p>
              <div className="max-h-40 overflow-y-auto bg-background-secondary rounded-lg p-3">
                {uploadProgress.errors.map((error, index) => (
                  <p key={index} className="text-sm text-yellow-400/80 mb-1 last:mb-0">
                    • {error}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      <div className="p-6 rounded-xl bg-card border border-card-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">File Format Instructions</h3>
        
        <div className="space-y-4 text-sm text-foreground-secondary">
          <div>
            <h4 className="font-medium text-foreground mb-2">CSV Format:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>First row must contain column headers</li>
              <li>Required columns: category, subcategory, type, difficulty, experienceLevel, question, correctAnswer, explanation</li>
              <li>For MCQ: options column should contain JSON array</li>
              <li>Tags column: comma-separated values</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-foreground mb-2">JSON Format:</h4>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Root element should be an object with &quot;questions&quot; array</li>
              <li>Each question object follows the same schema as CSV</li>
              <li>Options for MCQ should be an array of {'{id, text}'} objects</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400">
              <strong>Tip:</strong> Download the template files above to see the exact format required.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
