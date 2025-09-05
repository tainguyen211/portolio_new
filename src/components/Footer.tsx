import React from 'react';
import { Github, Mail, Globe, Heart } from 'lucide-react';

interface FooterProps {
  translations: any;
  personalData: any;
}

const Footer: React.FC<FooterProps> = ({ translations, personalData }) => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white py-16 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center">
          <div className="text-3xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-float">
              {translations.name}
            </span>
          </div>
          
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto leading-relaxed">
            {translations.footer.description}
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            {[
              { href: personalData.github, icon: Github, color: 'hover:bg-gray-700' },
              { href: `mailto:${personalData.email}`, icon: Mail, color: 'hover:bg-red-600' },
              { href: personalData.portfolio, icon: Globe, color: 'hover:bg-blue-600' }
            ].map(({ href, icon: Icon, color }, index) => (
              <a
                key={index}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group p-4 rounded-2xl bg-gray-800/50 backdrop-blur-sm ${color} btn-enhanced shadow-lg animate-scaleIn`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Icon size={28} className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              </a>
            ))}
          </div>
          
          <div className="border-t border-gray-700/50 pt-8">
            <p className="text-gray-400 flex items-center justify-center space-x-2">
              <span>© 2025 {translations.name}. {translations.footer.rights}</span>
              <Heart size={16} className="text-red-500 animate-pulse-slow" />
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;