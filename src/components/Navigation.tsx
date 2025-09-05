import React from 'react';
import { 
  Menu, 
  X, 
  User, 
  Briefcase, 
  Folder, 
  Mail, 
  Sun, 
  Moon, 
  Languages,
  Clock
} from 'lucide-react';
import AuroraBackground from './ui/AuroraBackground';
import type { Theme } from '../types';

interface NavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeSection: string;
  isScrolled: boolean;
  theme: Theme;
  isAutoMode?: boolean;
  language: string;
  translations: any;
  scrollToSection: (sectionId: string) => void;
  toggleTheme: () => void;
  toggleAutoMode?: () => void;
  toggleLanguage: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  isScrolled,
  theme,
  isAutoMode = false,
  language,
  translations,
  scrollToSection,
  toggleTheme,
  toggleAutoMode,
  toggleLanguage
}) => {
  const navItems = [
    { id: 'home', label: translations.nav.home, icon: User },
    { id: 'about', label: translations.nav.about, icon: User },
    { id: 'experience', label: translations.nav.experience, icon: Briefcase },
    { id: 'projects', label: translations.nav.projects, icon: Folder },
    { id: 'contact', label: translations.nav.contact, icon: Mail }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'nav-enhanced shadow-xl' : 'bg-transparent'
      }`}>
        {/* Aurora background only when menu is closed */}
        {!isMenuOpen && (
          <AuroraBackground 
            intensity="light" 
            disabled={isScrolled}
            className="absolute inset-0"
          />
        )}
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-float">
                Tài Nguyễn
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              {navItems.map(({ id, label, icon: Icon }, index) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl btn-enhanced whitespace-nowrap relative overflow-hidden group ${
                    activeSection === id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={16} className="relative z-10" />
                  <span className="text-sm xl:text-base relative z-10">{label}</span>
                  {activeSection !== id && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Theme and Language toggles */}
            <div className="hidden lg:flex items-center space-x-3 ml-6">
              {/* Auto theme toggle */}
              {toggleAutoMode && (
                <button
                  onClick={toggleAutoMode}
                  className={`p-3 rounded-xl btn-enhanced group relative ${
                    isAutoMode 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 hover:text-white'
                  }`}
                  title={isAutoMode ? 'Disable auto theme' : 'Enable auto theme (follows time)'}
                >
                  <Clock size={20} className={isAutoMode ? 'animate-pulse' : 'group-hover:rotate-12'} />
                </button>
              )}
              
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl btn-enhanced group ${
                  isAutoMode 
                    ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-orange-500 hover:text-white'
                }`}
                title={theme !== 'light' ? 'Switch to light mode' : 'Switch to dark mode'}
                disabled={isAutoMode}
              >
                {theme !== 'light' ? (
                  <Sun size={20} className={isAutoMode ? '' : 'group-hover:animate-spin'} />
                ) : (
                  <Moon size={20} className={isAutoMode ? '' : 'group-hover:rotate-12'} />
                )}
              </button>
              
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 hover:text-white btn-enhanced group"
                title="Switch language"
              >
                <Languages size={20} className="group-hover:rotate-12" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white btn-enhanced relative z-50"
            >
              <div className="relative w-6 h-6">
                <Menu 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  size={24} 
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl border-l border-gray-200/50 dark:border-gray-700/50 z-50 transform transition-transform duration-300 ease-out lg:hidden ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          {/* Mobile Theme and Language toggles */}
          <div className="flex flex-col space-y-4 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4">
              {/* Mobile Auto theme toggle */}
              {toggleAutoMode && (
                <button
                  onClick={toggleAutoMode}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl shadow-lg btn-enhanced group ${
                    isAutoMode 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
                  }`}
                >
                  <Clock size={20} className={isAutoMode ? 'animate-pulse' : 'group-hover:rotate-12'} />
                  <span className="text-sm font-medium">
                    {isAutoMode ? 'Auto' : 'Manual'}
                  </span>
                </button>
              )}
              
              <button
                onClick={toggleTheme}
                className={`flex items-center space-x-3 px-6 py-3 rounded-xl shadow-lg btn-enhanced group ${
                  isAutoMode 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                }`}
                disabled={isAutoMode}
              >
                {theme !== 'light' ? (
                  <Sun size={20} className={isAutoMode ? '' : 'group-hover:animate-spin'} />
                ) : (
                  <Moon size={20} className={isAutoMode ? '' : 'group-hover:rotate-12'} />
                )}
                <span className="text-sm font-medium">
                  {theme !== 'light' ? 'Light' : 'Dark'}
                </span>
              </button>
              
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-3 px-6 py-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg btn-enhanced group"
              >
                <Languages size={20} className="group-hover:rotate-12" />
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Vi' : 'En'}
                </span>
              </button>
            </div>
          </div>
          
          {/* Mobile Navigation Items */}
          <div className="space-y-3">
            {navItems.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`flex items-center space-x-4 w-full px-6 py-4 text-left rounded-xl btn-enhanced group relative overflow-hidden ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon size={24} className="relative z-10" />
                <span className="text-lg font-medium relative z-10">{label}</span>
                {activeSection !== id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;