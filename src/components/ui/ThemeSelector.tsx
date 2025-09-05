import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { THEME_OPTIONS } from '../../constants/themes';
import type { Theme } from '../../types';

interface ThemeSelectorProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:text-white btn-enhanced group"
        title="Change theme"
      >
        <Palette size={20} className="group-hover:rotate-12" />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 z-50 animate-fadeInUp">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                Choose Theme
              </h3>
              <div className="space-y-2">
                {THEME_OPTIONS.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      currentTheme === theme.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full border-2 border-gray-300"
                        style={{ backgroundColor: theme.colors.accent }}
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {theme.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {theme.description}
                        </p>
                      </div>
                    </div>
                    {currentTheme === theme.id && (
                      <Check size={16} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeSelector;