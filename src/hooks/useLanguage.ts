import { useState, useEffect, useCallback } from 'react';
import { storage, STORAGE_KEYS } from '../utils/storage';
import type { Language } from '../types';

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = storage.get(STORAGE_KEYS.LANGUAGE) as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'vi')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    const newLanguage: Language = language === 'en' ? 'vi' : 'en';
    setLanguage(newLanguage);
    storage.set(STORAGE_KEYS.LANGUAGE, newLanguage);
  }, [language]);

  return { language, toggleLanguage };
};