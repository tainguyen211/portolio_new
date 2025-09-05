import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { Language } from '../types';

interface SEOHeadProps {
  language: Language;
  personalData: any;
  translations: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({ language, personalData, translations }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  // Person Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": personalData.name,
    "jobTitle": translations.title,
    "description": translations.subtitle,
    "url": personalData.portfolio,
    "email": personalData.email,
    "telephone": personalData.phone,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": personalData.location[language],
      "addressCountry": language === 'en' ? 'Vietnam' : 'Việt Nam'
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": personalData.education.university
    },
    "knowsAbout": personalData.skills.languages.concat(personalData.skills.frameworks, personalData.skills.tools),
    "sameAs": [
      personalData.github,
      personalData.portfolio
    ],
    "image": `${baseUrl}/profile-image.jpg`,
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    }
  };

  // Website Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": `${personalData.name} - Portfolio`,
    "description": translations.subtitle,
    "url": baseUrl,
    "author": {
      "@type": "Person",
      "name": personalData.name
    },
    "inLanguage": language === 'en' ? 'en-US' : 'vi-VN',
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${baseUrl}/#search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // Professional Service Schema
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `${personalData.name} - Backend Development Services`,
    "description": "Professional backend development and software engineering services",
    "provider": {
      "@type": "Person",
      "name": personalData.name,
      "email": personalData.email,
      "telephone": personalData.phone
    },
    "areaServed": {
      "@type": "Country",
      "name": "Vietnam"
    },
    "serviceType": "Software Development",
    "url": personalData.portfolio
  };

  const title = `${personalData.name} | ${translations.title}`;
  const description = `${translations.subtitle} - Portfolio website showcasing backend development projects and experience.`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="backend developer, software engineer, nodejs, react, typescript, vietnam developer, portfolio" />
      <meta name="author" content={personalData.name} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content={language === 'en' ? 'English' : 'Vietnamese'} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:site_name" content={`${personalData.name} Portfolio`} />
      <meta property="og:image" content={`${baseUrl}/og-image.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : 'vi_VN'} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}/og-image.jpg`} />
      <meta name="twitter:creator" content="@taitai2107" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={personalData.name} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Alternate Language Links */}
      <link rel="alternate" hrefLang="en" href={`${baseUrl}?lang=en`} />
      <link rel="alternate" hrefLang="vi" href={`${baseUrl}?lang=vi`} />
      <link rel="alternate" hrefLang="x-default" href={baseUrl} />
      
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(personSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;