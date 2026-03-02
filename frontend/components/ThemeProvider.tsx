'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
  mounted: false,
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('embedprep-theme') as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      // Default to dark
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.style.setProperty('--background', '#0a0a0f');
      root.style.setProperty('--background-secondary', '#12121a');
      root.style.setProperty('--foreground', '#f0f0f5');
      root.style.setProperty('--foreground-secondary', '#a0a0b0');
      root.style.setProperty('--foreground-muted', '#6b7280');
      root.style.setProperty('--card', '#161622');
      root.style.setProperty('--card-border', '#2a2a3a');
    } else {
      root.classList.remove('dark');
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--background-secondary', '#f8fafc');
      root.style.setProperty('--foreground', '#1e293b');
      root.style.setProperty('--foreground-secondary', '#64748b');
      root.style.setProperty('--foreground-muted', '#94a3b8');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--card-border', '#e2e8f0');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('embedprep-theme', newTheme);
    applyTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}
