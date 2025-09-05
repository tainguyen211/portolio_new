import React, { useState, useRef, useCallback } from 'react';
import { Github, ExternalLink, Star, Users, Target, TrendingUp } from 'lucide-react';
import SkillTag from './SkillTag';
import type { ProjectItem, Translations } from '../../types';

interface ProjectCard3DProps {
  project: ProjectItem;
  translations: Translations;
  language: string;
  index: number;
}

const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ 
  project, 
  translations, 
  language, 
  index 
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || isMobile) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const rotateX = ((e.clientY - centerY) / rect.height) * -6; // Max 6 degrees
    const rotateY = ((e.clientX - centerX) / rect.width) * 6;
    
    setTilt({ x: rotateX, y: rotateY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const cardStyle = isMobile ? {} : {
    transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div
      ref={cardRef}
      className="relative w-full h-full fade-in-section group"
      style={{ 
        animationDelay: `${index * 0.2}s`,
        transformStyle: isMobile ? 'flat' : 'preserve-3d'
      }}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? handleMouseLeave : undefined}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden ring-0 hover:ring-4 hover:ring-blue-500/20 transition-all duration-300 relative group/card h-full flex flex-col"
           style={cardStyle}>
        {/* Project image with overlay effects */}
        <div className="h-48 md:h-56 relative overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating title */}
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover/card:scale-105 transition-transform duration-300">
              {project.title}
            </h3>
            <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full group-hover/card:w-20 transition-all duration-500"></div>
          </div>

          {/* Star decoration */}
          <div className="absolute top-4 right-4">
            <Star className="text-yellow-400 animate-pulse-slow" size={20} />
          </div>
        </div>
        
        <div className="p-4 md:p-6 flex-1 flex flex-col">
          <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed text-sm md:text-base">
            {project.description[language as keyof typeof project.description]}
          </p>
          
          {/* Key Features - Mobile only */}
          <div className="mb-4 md:mb-6 flex-1">
            <h4 className="font-bold text-base md:text-lg mb-3">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {translations.projects.keyFeatures}
              </span>
            </h4>
            <ul className="space-y-2">
              {project.features[language as keyof typeof project.features].slice(0, 3).map((feature: string, featureIndex: number) => (
                <li 
                  key={featureIndex} 
                  className="flex items-start text-xs md:text-sm text-gray-600 dark:text-gray-300 animate-fadeInUp group/feature"
                  style={{ animationDelay: `${featureIndex * 0.1}s` }}
                >
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-1.5 md:mt-2 mr-2 md:mr-3 flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-300"></div>
                  <span className="group-hover/feature:text-gray-800 dark:group-hover/feature:text-gray-100 transition-colors duration-300 leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-4 md:mb-6">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 4).map((tech: string, techIndex: number) => (
                <SkillTag
                  key={techIndex}
                  skill={tech}
                  index={techIndex}
                  variant="secondary"
                  size="sm"
                />
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-xs font-semibold">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex space-x-3 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:from-gray-800 hover:to-gray-900 hover:text-white btn-enhanced group/btn flex-1 justify-center text-sm"
            >
              <Github size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
              <span className="font-medium">{translations.projects.buttons.code}</span>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-3 md:px-4 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 btn-enhanced group/btn flex-1 justify-center shadow-lg text-sm"
              >
                <ExternalLink size={16} className="group-hover/btn:rotate-12 transition-transform duration-300" />
                <span className="font-medium">{translations.projects.buttons.demo}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard3D;