import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle } from 'lucide-react';

const FloatingActionButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col space-y-4">
      {/* Contact FAB */}
      <div className="relative">
        <button
          onClick={scrollToContact}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="group p-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-2xl hover:shadow-green-500/25 btn-enhanced animate-fadeInUp"
          style={{ animationDelay: '0.1s' }}
        >
          <MessageCircle size={24} className="group-hover:scale-110 transition-transform duration-300" />
        </button>
        
        {showTooltip && (
          <div className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap animate-fadeInUp">
            Contact Me
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        )}
      </div>

      {/* Scroll to top FAB */}
      <button
        onClick={scrollToTop}
        className="group p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-2xl hover:shadow-blue-500/25 btn-enhanced animate-fadeInUp"
        style={{ animationDelay: '0.2s' }}
      >
        <ArrowUp size={24} className="group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </div>
  );
};

export default FloatingActionButton;