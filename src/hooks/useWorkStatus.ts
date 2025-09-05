import { useState, useEffect } from 'react';

export interface WorkStatus {
  openToWork: boolean;
  currentActivity: 'available' | 'listening' | 'coding' | 'sleeping';
  lastSeen: Date;
}

export const useWorkStatus = () => {
  const [status, setStatus] = useState<WorkStatus>({
    openToWork: true,
    currentActivity: 'available',
    lastSeen: new Date()
  });

  useEffect(() => {
    // Simulate dynamic status based on time
    const updateStatus = () => {
      const hour = new Date().getHours();
      const minute = new Date().getMinutes();
      
      let activity: WorkStatus['currentActivity'] = 'available';
      
      // Simulate different activities based on time
      if (hour >= 22 || hour <= 6) {
        activity = 'sleeping';
      } else if (hour >= 9 && hour <= 17 && minute % 30 < 15) {
        activity = 'coding';
      } else if (minute % 20 < 5) {
        activity = 'listening';
      }
      
      setStatus(prev => ({
        ...prev,
        currentActivity: activity,
        lastSeen: new Date()
      }));
    };

    updateStatus();
    const interval = setInterval(updateStatus, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const getStatusEmoji = () => {
    switch (status.currentActivity) {
      case 'listening': return '🎧';
      case 'coding': return '💻';
      case 'sleeping': return '😴';
      default: return '🟢';
    }
  };

  const getStatusColor = () => {
    if (!status.openToWork) return 'bg-gray-400';
    
    switch (status.currentActivity) {
      case 'available': return 'bg-green-500';
      case 'listening': return 'bg-yellow-500';
      case 'coding': return 'bg-blue-500';
      case 'sleeping': return 'bg-gray-500';
      default: return 'bg-green-500';
    }
  };

  const shouldPulse = () => {
    return status.openToWork && status.currentActivity === 'available';
  };

  return {
    status,
    getStatusEmoji,
    getStatusColor,
    shouldPulse,
    setOpenToWork: (open: boolean) => setStatus(prev => ({ ...prev, openToWork: open }))
  };
};