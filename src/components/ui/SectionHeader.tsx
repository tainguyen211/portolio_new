import React from 'react';
import type { LucideIcon } from 'lucide-react';
import AnimatedIcon from './AnimatedIcon';
import GradientText from './GradientText';

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  leftIcon: LucideIcon;
  rightIcon: LucideIcon;
  leftIconColor?: string;
  rightIconColor?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  leftIcon,
  rightIcon,
  leftIconColor = 'text-blue-500',
  rightIconColor = 'text-purple-500'
}) => {
  return (
    <div className="text-center mb-16 fade-in-section">
      <div className="inline-flex items-center space-x-2 mb-4">
        <AnimatedIcon 
          icon={leftIcon} 
          size={32} 
          className={leftIconColor}
          animation="pulse"
        />
        <h2 className="text-4xl md:text-5xl font-bold">
          <GradientText>{title}</GradientText>
        </h2>
        <AnimatedIcon 
          icon={rightIcon} 
          size={32} 
          className={rightIconColor}
          animation="pulse"
          delay="0.5s"
        />
      </div>
      <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default SectionHeader;