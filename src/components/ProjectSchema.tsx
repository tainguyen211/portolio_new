import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { ProjectItem, Language } from '../types';

interface ProjectSchemaProps {
  projects: ProjectItem[];
  language: Language;
  personalData: any;
}

const ProjectSchema: React.FC<ProjectSchemaProps> = ({ projects, language, personalData }) => {
  const projectSchemas = projects.map((project, index) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "description": project.description[language],
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "author": {
      "@type": "Person",
      "name": personalData.name,
      "email": personalData.email,
      "url": personalData.portfolio
    },
    "programmingLanguage": project.techStack,
    "codeRepository": project.github,
    "url": project.demo || project.github,
    "screenshot": project.image,
    "dateCreated": "2024",
    "license": "MIT",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  }));

  // Portfolio Collection Schema
  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": `${personalData.name} - Software Development Portfolio`,
    "description": "Collection of backend development and software engineering projects",
    "author": {
      "@type": "Person",
      "name": personalData.name
    },
    "hasPart": projects.map(project => ({
      "@type": "SoftwareApplication",
      "name": project.title,
      "url": project.demo || project.github
    }))
  };

  return (
    <Helmet>
      {/* Individual Project Schemas */}
      {projectSchemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
      
      {/* Portfolio Collection Schema */}
      <script type="application/ld+json">
        {JSON.stringify(portfolioSchema)}
      </script>
    </Helmet>
  );
};

export default ProjectSchema;