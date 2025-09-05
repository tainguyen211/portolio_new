import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Theme } from '../types';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const savedTheme = storage.get(STORAGE_KEYS.THEME) as Theme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const defaultTheme: Theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setTheme(defaultTheme);
    applyTheme(defaultTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove('dark');
    
    // Apply new theme
    if (newTheme !== 'light') {
      document.documentElement.classList.add(newTheme);
    }
  };

  const changeTheme = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    applyTheme(newTheme);
    storage.set(STORAGE_KEYS.THEME, newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    changeTheme(newTheme);
  }, [theme, changeTheme]);

  const isDarkMode = theme !== 'light';

  return { theme, isDarkMode, toggleTheme };
};