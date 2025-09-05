// Performance optimization utilities
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

export const preloadImages = async (urls: string[]): Promise<void> => {
  try {
    await Promise.all(urls.map(preloadImage));
  } catch (error) {
    console.warn('Some images failed to preload:', error);
  }
};

export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

export const getOptimizedImageUrl = (url: string, width: number, height: number): string => {
  if (url.includes('unsplash.com')) {
    return `${url}&w=${width}&h=${height}&fit=crop&auto=format&q=80`;
  }
  return url;
};

// Mobile performance optimizations
export const isMobile = (): boolean => {
  return typeof window !== 'undefined' && window.innerWidth < 768;
};

export const reducedMotion = (): boolean => {
  return typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isLowPowerMode = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const connection = (navigator as any).connection;
  const saveData = connection?.saveData || false;
  const reducedMotionPref = reducedMotion();
  
  return saveData || reducedMotionPref;
};

export const supportsBattery = (): boolean => {
  return typeof navigator !== 'undefined' && 'getBattery' in navigator;
};

export const checkBatteryLevel = async (): Promise<{ level: number; charging: boolean } | null> => {
  if (!supportsBattery()) return null;
  
  try {
    const battery = await (navigator as any).getBattery();
    return {
      level: battery.level,
      charging: battery.charging
    };
  } catch {
    return null;
  }
};

export const optimizeForMobile = () => {
  if (typeof window === 'undefined') return;
  
  // Disable hover effects on mobile
  if (isMobile()) {
    document.documentElement.classList.add('mobile-device');
  }
  
  // Reduce animations if user prefers
  if (reducedMotion()) {
    document.documentElement.classList.add('reduce-motion');
  }
  
  // Check for low power mode
  if (isLowPowerMode()) {
    document.documentElement.classList.add('low-power-mode');
  }
};

// Lazy loading utility
export const lazyLoad = (target: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  observer.observe(target);
  return () => observer.disconnect();
};