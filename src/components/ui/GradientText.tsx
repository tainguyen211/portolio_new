import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  gradient?: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
}

const GradientText: React.FC<GradientTextProps> = ({ 
  children, 
  gradient = 'from-blue-600 via-purple-600 to-pink-600',
  className = '',
  as: Component = 'span'
}) => {
  return (
    <Component className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}>
      {children}
    </Component>
  );
};

export default GradientText;