import React, { useEffect, useRef } from 'react';
import { Zap, Star } from 'lucide-react';
import { observeElements } from '../utils/animations';
import SectionHeader from './ui/SectionHeader';
import ProjectCard3D from './ui/ProjectCard3D';
import type { Translations, ProjectItem } from '../types';

interface ProjectsSectionProps {
  translations: Translations;
  projectsData: ProjectItem[];
  language: string;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ 
  translations, 
  projectsData, 
  language 
}) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    return observeElements(sectionRef.current);
  }, []);

  return (
    <section id="projects" className="py-20 px-4 relative overflow-hidden" ref={sectionRef}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-600/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <SectionHeader
          title={translations.projects.title}
          subtitle={translations.projects.subtitle}
          leftIcon={Zap}
          rightIcon={Star}
          leftIconColor="text-yellow-500"
          rightIconColor="text-cyan-500"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projectsData.map((project, index) => (
            <div key={index} className="h-full">
              <ProjectCard3D
                project={project}
                translations={translations}
                language={language}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;