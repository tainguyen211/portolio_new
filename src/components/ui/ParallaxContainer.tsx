import React, { useRef, useEffect } from 'react';
import { useParallax } from '../../hooks/useParallax';

interface ParallaxContainerProps {
  children: React.ReactNode;
  intensity?: number;
  className?: string;
  disabled?: boolean;
}

const ParallaxContainer: React.FC<ParallaxContainerProps> = ({ 
  children, 
  intensity = 0.1, 
  className = '',
  disabled = false 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const offset = useParallax(intensity, !disabled && !isMobile);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || disabled || isMobile) return;

    // Set will-change for performance
    container.style.willChange = 'transform';

    return () => {
      if (container) {
        container.style.willChange = 'auto';
      }
    };
  }, [disabled, isMobile]);

  const transform = disabled || isMobile
    ? 'none' 
    : `translate3d(${offset.x}px, ${offset.y}px, 0)`;

  return (
    <div
      ref={containerRef}
      className={`transition-transform duration-100 ease-out ${className}`}
      style={{ transform }}
    >
      {children}
    </div>
  );
};

export default ParallaxContainer;