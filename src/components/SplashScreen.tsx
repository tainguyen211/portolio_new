import React, { useEffect, useState, useCallback } from 'react';
import { User, Sparkles, Code, Zap, CheckCircle } from 'lucide-react';
import { easeOutCubic } from '../utils/animations';
import { ANIMATION_DURATIONS } from '../constants';
import type { LoadingStep } from '../types';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const loadingSteps: LoadingStep[] = [
    { text: 'Initializing portfolio...', icon: Sparkles },
    { text: 'Loading components...', icon: Code },
    { text: 'Setting up interface...', icon: User },
    { text: 'Optimizing performance...', icon: Zap },
    { text: 'Ready to showcase!', icon: CheckCircle }
  ];

  const animateProgress = useCallback(() => {
    let animationId: number;
    let startTime: number;
    const duration = parseInt(ANIMATION_DURATIONS.SPLASH);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progressPercent = Math.min((elapsed / duration) * 100, 100);
      
      const easedProgress = easeOutCubic(progressPercent / 100) * 100;
      setProgress(easedProgress);
      
      const stepIndex = Math.min(
        Math.floor((easedProgress / 100) * loadingSteps.length),
        loadingSteps.length - 1
      );
      setCurrentStep(stepIndex);

      if (progressPercent < 100) {
        animationId = requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 400);
        }, 300);
      }
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [onComplete, loadingSteps.length]);

  useEffect(() => {
    const cleanup = animateProgress();
    return cleanup;
  }, [animateProgress]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-[9999] opacity-0 transition-opacity duration-400 pointer-events-none" />
    );
  }

  const CurrentIcon = loadingSteps[currentStep]?.icon || Sparkles;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 z-[9999] flex items-center justify-center">
      {/* Optimized background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
            style={{
              left: `${(i * 7) % 100}%`,
              top: `${(i * 11) % 100}%`,
              animationDelay: `${(i * 0.3) % 3}s`,
              animationDuration: `${3 + (i % 3)}s`
            }}
          />
        ))}
      </div>

      <div className="text-center relative z-10 max-w-md mx-auto px-6">
        {/* Main logo */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm p-1 animate-scaleIn">
            <div className="w-full h-full rounded-full bg-white/90 flex items-center justify-center relative overflow-hidden">
              <CurrentIcon 
                size={32} 
                className="text-blue-600 transition-all duration-500 ease-in-out" 
              />
            </div>
          </div>
          
          <div className="absolute -top-2 -right-2 animate-float">
            <Sparkles className="text-yellow-300" size={16} />
          </div>
          <div className="absolute -bottom-2 -left-2 animate-float" style={{ animationDelay: '1s' }}>
            <Sparkles className="text-pink-300" size={12} />
          </div>
        </div>

        {/* Brand */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fadeInUp">
          Tài Nguyễn
        </h1>
        <p className="text-white/80 text-lg mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
          Portfolio
        </p>

        {/* Loading step */}
        <div className="mb-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
          <p className="text-white/90 text-sm font-medium mb-2 transition-all duration-300 min-h-[20px]">
            {loadingSteps[currentStep]?.text || 'Loading...'}
          </p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-full max-w-xs mx-auto animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
          <div className="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-white via-yellow-300 to-white rounded-full transition-all duration-100 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse rounded-full" />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <span className="text-white/60 text-xs font-medium">
              {Math.round(progress)}%
            </span>
            <span className="text-white/60 text-xs">
              {currentStep + 1}/{loadingSteps.length}
            </span>
          </div>
        </div>

        {/* Animated dots */}
        <div className="flex items-center justify-center space-x-1 mt-6 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '1s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;