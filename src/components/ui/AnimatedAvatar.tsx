import React, { useState } from 'react';

interface AnimatedAvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  src,
  alt,
  size = 'md',
  className = ''
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-32 h-32'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img
        src={src}
        alt={alt}
        className={`
          w-full h-full rounded-full object-cover
          transition-all duration-500 ease-out
          ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          hover:scale-110 hover:shadow-lg
        `}
        onLoad={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 opacity-0 hover:opacity-20 transition-opacity duration-300" />
    </div>
  );
};