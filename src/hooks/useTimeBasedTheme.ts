import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Theme } from '../types';

export const useTimeBasedTheme = () => {
  const [theme, setTheme] = useState<Theme>('light');
  const [isAutoMode, setIsAutoMode] = useState(false);

  const getTimeBasedTheme = useCallback((): Theme => {
    const hour = new Date().getHours();
    // 6 AM to 6 PM = light, 6 PM to 6 AM = dark
    return (hour >= 6 && hour < 18) ? 'light' : 'dark';
  }, []);

  const applyTheme = useCallback((newTheme: Theme) => {
    document.documentElement.classList.remove('dark');
    if (newTheme !== 'light') {
      document.documentElement.classList.add(newTheme);
    }
  }, []);

  useEffect(() => {
    const savedTheme = storage.get(STORAGE_KEYS.THEME) as Theme;
    const savedAutoMode = storage.get(STORAGE_KEYS.AUTO_THEME) === 'true';
    
    setIsAutoMode(savedAutoMode);
    
    if (savedAutoMode) {
      const timeBasedTheme = getTimeBasedTheme();
      setTheme(timeBasedTheme);
      applyTheme(timeBasedTheme);
    } else if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const defaultTheme: Theme = prefersDark ? 'dark' : 'light';
      setTheme(defaultTheme);
      applyTheme(defaultTheme);
    }
  }, [getTimeBasedTheme, applyTheme]);

  useEffect(() => {
    if (!isAutoMode) return;

    const updateTheme = () => {
      const timeBasedTheme = getTimeBasedTheme();
      if (timeBasedTheme !== theme) {
        setTheme(timeBasedTheme);
        applyTheme(timeBasedTheme);
      }
    };

    // Check every minute
    const interval = setInterval(updateTheme, 60000);
    return () => clearInterval(interval);
  }, [isAutoMode, theme, getTimeBasedTheme, applyTheme]);

  const toggleTheme = useCallback(() => {
    if (isAutoMode) {
      setIsAutoMode(false);
      storage.set(STORAGE_KEYS.AUTO_THEME, 'false');
    }
    
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    storage.set(STORAGE_KEYS.THEME, newTheme);
  }, [theme, isAutoMode, applyTheme]);

  const toggleAutoMode = useCallback(() => {
    const newAutoMode = !isAutoMode;
    setIsAutoMode(newAutoMode);
    storage.set(STORAGE_KEYS.AUTO_THEME, newAutoMode.toString());
    
    if (newAutoMode) {
      const timeBasedTheme = getTimeBasedTheme();
      setTheme(timeBasedTheme);
      applyTheme(timeBasedTheme);
    }
  }, [isAutoMode, getTimeBasedTheme, applyTheme]);

  const isDarkMode = theme !== 'light';

  return { 
    theme, 
    isDarkMode, 
    isAutoMode, 
    toggleTheme, 
    toggleAutoMode,
    changeTheme: (newTheme: Theme) => {
      setIsAutoMode(false);
      storage.set(STORAGE_KEYS.AUTO_THEME, 'false');
      setTheme(newTheme);
      applyTheme(newTheme);
      storage.set(STORAGE_KEYS.THEME, newTheme);
    }
  };
};