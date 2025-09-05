import React, { useState, useEffect } from 'react';

interface PowerAwareContainerProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
}

const PowerAwareContainer: React.FC<PowerAwareContainerProps> = ({ 
  children, 
  fallback,
  className = '' 
}) => {
  const [isLowPower, setIsLowPower] = useState(false);

  useEffect(() => {
    // Check for data saver mode
    const connection = (navigator as any).connection;
    const saveData = connection?.saveData || false;
    
    // Check for reduced motion preference
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Check for low battery (if supported)
    const battery = (navigator as any).getBattery?.();
    
    if (battery) {
      battery.then((batteryInfo: any) => {
        const lowBattery = batteryInfo.level < 0.2 && !batteryInfo.charging;
        setIsLowPower(saveData || reducedMotion || lowBattery);
      });
    } else {
      setIsLowPower(saveData || reducedMotion);
    }
  }, []);

  if (isLowPower && fallback) {
    return <div className={className}>{fallback}</div>;
  }

  return <div className={className}>{children}</div>;
};

export default PowerAwareContainer;