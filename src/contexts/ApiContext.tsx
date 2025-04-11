import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ApiContextType {
  apiBaseUrl: string;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiBaseUrl, setApiBaseUrl] = useState<string>('');

  useEffect(() => {
    // Set API_BASE_URL based on the MODE value
    const baseUrl = import.meta.env.MODE === 'development' 
      ? 'http://localhost:5000'
      : 'https://madms-bounceback-backend.onrender.com';
    
    setApiBaseUrl(baseUrl);
    console.log('API Base URL set to:', baseUrl);
  }, []);

  return (
    <ApiContext.Provider value={{ apiBaseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};
