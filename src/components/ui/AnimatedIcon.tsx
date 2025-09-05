import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
  animation?: 'pulse' | 'bounce' | 'spin' | 'float' | 'rotate';
  delay?: string;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ 
  icon: Icon, 
  size = 24, 
  className = '',
  animation = 'pulse',
  delay = '0s'
}) => {
  const animationClasses = {
    pulse: 'animate-pulse-slow',
    bounce: 'animate-bounce',
    spin: 'animate-spin',
    float: 'animate-float',
    rotate: 'hover:rotate-12 transition-transform duration-300'
  };

  return (
    <Icon 
      size={size} 
      className={`${animationClasses[animation]} ${className}`}
      style={{ animationDelay: delay }}
    />
  );
};

export default AnimatedIcon;