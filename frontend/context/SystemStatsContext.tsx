"use client";

// frontend/context/SystemStatsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the structure of the system stats data
interface SystemStats {
  cpu_load: number;
  num_cores: number;
  logical_cores: number;
  cpu_per_core_usage: number[];
  temperature: string;
  fan_speed: string;
  total_memory: number;
  used_memory: number;
  download_speed_kb: number;
  upload_speed_kb: number;
}

// Create a Context for system stats
const SystemStatsContext = createContext<SystemStats | null>(null);

export const useSystemStats = () => {
  return useContext(SystemStatsContext);
};

// Define the props type for the SystemStatsProvider component
interface SystemStatsProviderProps {
  children: ReactNode; // ReactNode is the type for any valid child
}

export const SystemStatsProvider: React.FC<SystemStatsProviderProps> = ({ children }) => {
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);

  // Function to fetch system stats from the backend
  const fetchSystemStats = async () => {
    try {
      const response = await fetch('http://100.100.10.10:8000/api/system-stats');
      const data = await response.json();
      console.log(data);
      setSystemStats(data);
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  // Fetch system stats every 2 seconds
  useEffect(() => {
    fetchSystemStats(); // Initial fetch
    const interval = setInterval(fetchSystemStats, 2000); // Fetch every 2 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <SystemStatsContext.Provider value={systemStats}>
      {children}
    </SystemStatsContext.Provider>
  );
};
