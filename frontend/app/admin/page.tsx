import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function AdminDisabledPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card border border-card-border flex items-center justify-center">
          <Lock className="w-10 h-10 text-foreground-muted" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Admin Panel Disabled</h1>
        <p className="text-foreground-secondary mb-6">
          The admin panel is not available in static mode. This is a lightweight, 
          frontend-only version of EmbedPrep designed for easy deployment on Netlify.
        </p>
        <p className="text-foreground-muted text-sm mb-6">
          To add or modify questions, you need to edit the source code and redeploy.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
