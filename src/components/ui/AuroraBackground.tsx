import React from 'react';

interface AuroraBackgroundProps {
  className?: string;
  intensity?: 'light' | 'medium' | 'strong';
  disabled?: boolean;
}

const AuroraBackground: React.FC<AuroraBackgroundProps> = ({ 
  className = '',
  intensity = 'medium',
  disabled = false 
}) => {
  if (disabled) return null;

  const intensityClasses = {
    light: 'opacity-20',
    medium: 'opacity-30',
    strong: 'opacity-40'
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Aurora gradients */}
      <div className={`absolute inset-0 ${intensityClasses[intensity]}`}>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-400/30 via-purple-500/20 to-pink-500/30 animate-aurora-1" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-cyan-400/20 via-blue-500/30 to-purple-500/20 animate-aurora-2" />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-bl from-pink-400/20 via-purple-500/20 to-blue-500/30 animate-aurora-3" />
      </div>
      
      {/* Noise overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px'
        }}
      />
    </div>
  );
};

export default AuroraBackground;