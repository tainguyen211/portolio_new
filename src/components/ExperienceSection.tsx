import React, { useEffect, useRef } from 'react';
import { Briefcase, Calendar, MapPin, Star } from 'lucide-react';

interface ExperienceSectionProps {
  translations: any;
  experienceData: any[];
  language: string;
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ 
  translations, 
  experienceData, 
  language 
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-section');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" className="py-20 px-4 bg-white dark:bg-gray-800 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/5 to-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-pink-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-20 fade-in-section">
          <div className="inline-flex items-center space-x-3 mb-6">
            <Star className="text-yellow-500 animate-pulse-slow" size={32} />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {translations.experience.title}
              </span>
            </h2>
            <Star className="text-pink-500 animate-pulse-slow" size={32} />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {translations.experience.subtitle}
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block timeline-line"></div>
          
          <div className="space-y-16">
            {experienceData.map((exp, index) => (
              <div
                key={index}
                className={`relative flex items-center fade-in-section ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full border-4 border-white dark:border-gray-800 z-20 items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse-slow"></div>
                </div>
                
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-xl card-hover relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full ${index % 2 === 0 ? '-translate-y-16 translate-x-16' : '-translate-y-16 -translate-x-16'} group-hover:scale-150 transition-transform duration-700`}></div>
                    
                    <div className="flex items-start mb-6 relative z-10">
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mr-4 group-hover:rotate-12 transition-transform duration-300">
                        <Briefcase size={32} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {exp.position[language]}
                          </span>
                        </h3>
                        <p className="text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-6 relative z-10">
                      <div className="flex items-center text-gray-500 dark:text-gray-400">
                        <Calendar size={18} className="mr-3 text-blue-600" />
                        <span className="font-medium">{exp.period[language]}</span>
                      </div>
                      
                      {exp.location && (
                        <div className="flex items-center text-gray-500 dark:text-gray-400">
                          <MapPin size={18} className="mr-3 text-purple-600" />
                          <span className="text-sm">{exp.location[language]}</span>
                        </div>
                      )}
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed relative z-10">
                      {exp.description[language]}
                    </p>
                    
                    <div className="space-y-3 mb-6 relative z-10">
                      <h4 className="font-bold text-lg bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-4">
                        Key Achievements:
                      </h4>
                      {exp.achievements[language].map((achievement: string, achIndex: number) => (
                        <div 
                          key={achIndex} 
                          className="flex items-start group/item animate-fadeInUp"
                          style={{ animationDelay: `${achIndex * 0.1}s` }}
                        >
                          <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mr-4 flex-shrink-0 group-hover/item:scale-125 transition-transform duration-300"></div>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover/item:text-gray-800 dark:group-hover/item:text-gray-100 transition-colors duration-300">
                            {achievement}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-3 relative z-10">
                      {exp.techStack.map((tech: string, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-300 rounded-xl text-sm font-semibold skill-tag animate-scaleIn"
                          style={{ animationDelay: `${techIndex * 0.1}s` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;