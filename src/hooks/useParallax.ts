import { useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/performance';

interface ParallaxOffset {
  x: number;
  y: number;
}

export const useParallax = (intensity: number = 0.1, enabled: boolean = true) => {
  const [offset, setOffset] = useState<ParallaxOffset>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enabled) return;
    
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    const x = ((clientX - innerWidth / 2) / innerWidth) * intensity * 100;
    const y = ((clientY - innerHeight / 2) / innerHeight) * intensity * 100;
    
    setOffset({ x, y });
  }, [intensity, enabled]);

  const handleDeviceOrientation = useCallback((e: DeviceOrientationEvent) => {
    if (!enabled || !e.gamma || !e.beta) return;
    
    // Convert device orientation to parallax offset
    const x = (e.gamma / 90) * intensity * 50; // gamma: left/right tilt
    const y = (e.beta / 90) * intensity * 50;  // beta: front/back tilt
    
    setOffset({ 
      x: Math.max(-intensity * 50, Math.min(intensity * 50, x)),
      y: Math.max(-intensity * 50, Math.min(intensity * 50, y))
    });
  }, [intensity, enabled]);

  useEffect(() => {
    if (!enabled) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const throttledMouseMove = throttle(handleMouseMove, 16);
    const throttledOrientation = throttle(handleDeviceOrientation, 16);

    // Check if device supports orientation
    const supportsOrientation = 'DeviceOrientationEvent' in window;
    
    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    
    if (supportsOrientation) {
      window.addEventListener('deviceorientation', throttledOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (supportsOrientation) {
        window.removeEventListener('deviceorientation', throttledOrientation);
      }
    };
  }, [enabled, handleMouseMove, handleDeviceOrientation]);

  return offset;
};