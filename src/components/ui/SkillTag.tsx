import React from 'react';
import { SKILL_VARIANTS } from '../../constants';

interface SkillTagProps {
  skill: string;
  index: number;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md';
}

const SkillTag: React.FC<SkillTagProps> = ({ 
  skill, 
  index, 
  variant = 'primary',
  size = 'md'
}) => {
  const sizes = {
    sm: 'px-3 py-1 text-xs',
    md: 'px-4 py-2 text-sm'
  };

  const variantClass = SKILL_VARIANTS[variant.toUpperCase() as keyof typeof SKILL_VARIANTS];

  return (
    <span
      className={`${sizes[size]} bg-gradient-to-r ${variantClass} rounded-xl font-semibold skill-tag animate-fadeInUp`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {skill}
    </span>
  );
};

export default SkillTag;