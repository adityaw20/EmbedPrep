'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import { authApi } from '@/lib/api';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast.error('Please enter both username and password');
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(username, password);
      
      if (response.success) {
        localStorage.setItem('adminToken', response.token);
        toast.success('Login successful!');
        router.push('/admin');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold text-foreground">EmbedPrep</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground mb-2">Admin Login</h1>
          <p className="text-foreground-secondary">
            Sign in to manage questions and content
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-8 rounded-2xl bg-card border border-card-border">
            {/* Username */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className={cn(
                    'w-full pl-12 pr-4 py-3 rounded-lg',
                    'bg-background-secondary border border-card-border',
                    'text-foreground placeholder-foreground-muted',
                    'focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50',
                    'transition-all'
                  )}
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={cn(
                    'w-full pl-12 pr-12 py-3 rounded-lg',
                    'bg-background-secondary border border-card-border',
                    'text-foreground placeholder-foreground-muted',
                    'focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50',
                    'transition-all'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'w-full py-3 px-4 rounded-lg font-medium transition-all',
                'bg-primary text-white hover:bg-primary-hover',
                'focus:outline-none focus:ring-2 focus:ring-primary/50',
                'disabled:opacity-50 disabled:cursor-not-allowed',
                'flex items-center justify-center gap-2'
              )}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </div>

          {/* Back Link */}
          <p className="text-center text-sm text-foreground-muted">
            <Link href="/" className="text-primary hover:underline">
              ← Back to website
            </Link>
          </p>
        </form>

        {/* Security Note */}
        <div className="mt-8 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-sm text-yellow-400 text-center">
            ⚠️ This area is restricted to authorized administrators only.
          </p>
        </div>
      </div>
    </div>
  );
}
