'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Upload, 
  Database, 
  LogOut,
  Shield
} from 'lucide-react';
import { authApi } from '@/lib/api';
import { cn } from '@/lib/utils';

const adminNav = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/add-question', label: 'Add Question', icon: PlusCircle },
  { href: '/admin/upload', label: 'Bulk Upload', icon: Upload },
  { href: '/admin/manage-questions', label: 'Manage Questions', icon: Database },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login');
        }
        setLoading(false);
        return;
      }

      try {
        const response = await authApi.verify();
        if (response.success) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('adminToken');
          router.push('/admin/login');
        }
      } catch (error) {
        localStorage.removeItem('adminToken');
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    router.push('/admin/login');
  };

  // Login page doesn't need the admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-card-border flex-shrink-0 hidden md:flex flex-col">
        <div className="p-6 border-b border-card-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Admin Panel</h2>
              <p className="text-xs text-foreground-muted">EmbedPrep</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground-secondary hover:text-foreground hover:bg-card-hover'
                )}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-card-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-16 left-0 right-0 z-40 bg-card border-b border-card-border p-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Admin Panel
          </h2>
          <button
            onClick={handleLogout}
            className="text-red-400 text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 mt-16 md:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
