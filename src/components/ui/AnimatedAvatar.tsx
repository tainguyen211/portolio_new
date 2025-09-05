import React from 'react';
import { User } from 'lucide-react';
import { useWorkStatus } from '../../hooks/useWorkStatus';

interface AnimatedAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showStatus?: boolean;
}

const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({ 
  size = 'lg', 
  className = '',
  showStatus = false // Tắt status ring
}) => {
  const { getStatusEmoji, getStatusColor, shouldPulse } = useWorkStatus();

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  };

  const iconSizes = {
    sm: 20,
    md: 32,
    lg: 48,
    xl: 64
  };

  const statusSizes = {
    sm: 'w-3 h-3 text-xs',
    md: 'w-4 h-4 text-sm',
    lg: 'w-6 h-6 text-base',
    xl: 'w-8 h-8 text-lg'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Main avatar container */}
      <div className="relative w-full h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-600 to-pink-600 p-1 animate-scaleIn group">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center relative overflow-hidden group-hover:bg-gradient-to-r group-hover:from-blue-50 group-hover:to-purple-50 dark:group-hover:from-blue-900/20 dark:group-hover:to-purple-900/20 transition-all duration-500">
          <User 
            size={iconSizes[size]} 
            className="text-blue-600 group-hover:scale-110 transition-transform duration-300 animate-idle-wobble" 
          />
          
          {/* Subtle glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        </div>
      </div>

      {/* Status ring */}
      {/* Status ring removed */}

      {/* Status indicator with emoji */}
      {/* Status indicator removed */}

      {/* Floating sparkles */}
      <div className="absolute -top-1 -right-1 animate-float">
        <div className="w-2 h-2 bg-yellow-400 rounded-full opacity-80" />
      </div>
      <div className="absolute -bottom-1 -left-1 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-1.5 h-1.5 bg-pink-400 rounded-full opacity-60" />
      </div>
    </div>
  );
};

export default AnimatedAvatar;