import translationsData from '../data/translations.json';
import personalData from '../data/personal.json';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import type { Translations, PersonalData, ExperienceItem, ProjectItem, Language } from '../types';

// Simple data getters
export const getTranslations = (language: Language): Translations => {
  return translationsData[language];
};

export const getPersonalData = (): PersonalData => {
  return personalData;
};

export const getExperienceData = (): ExperienceItem[] => {
  return experienceData;
};

export const getProjectsData = (): ProjectItem[] => {
  return projectsData;
};

// Optimized memoized data loaders
let cachedTranslations: { [key in Language]?: Translations } = {};
let cachedPersonalData: PersonalData | null = null;
let cachedExperienceData: ExperienceItem[] | null = null;
let cachedProjectsData: ProjectItem[] | null = null;

export const getCachedTranslations = (language: Language): Translations => {
  if (!cachedTranslations[language]) {
    cachedTranslations[language] = getTranslations(language);
  }
  return cachedTranslations[language]!;
};

export const getCachedPersonalData = (): PersonalData => {
  if (!cachedPersonalData) {
    cachedPersonalData = getPersonalData();
  }
  return cachedPersonalData;
};

export const getCachedExperienceData = (): ExperienceItem[] => {
  if (!cachedExperienceData) {
    cachedExperienceData = getExperienceData();
  }
  return cachedExperienceData;
};

export const getCachedProjectsData = (): ProjectItem[] => {
  if (!cachedProjectsData) {
    cachedProjectsData = getProjectsData();
  }
  return cachedProjectsData;
};
// Clear cache function for development
export const clearCache = () => {
  cachedTranslations = {};
  cachedPersonalData = null;
  cachedExperienceData = null;
  cachedProjectsData = null;
};