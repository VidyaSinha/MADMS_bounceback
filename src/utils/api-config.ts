// This file is kept for backward compatibility
// The API_BASE_URL is now managed through the ApiContext
// and should be accessed using the useApi hook

// Default values - these will be overridden by the context
export const API_BASE_URL = import.meta.env.MODE === 'development'
  ? 'http://localhost:5000'
  : 'https://madms-bounceback-backend.onrender.com';

export const axiosConfig = {
  baseURL: API_BASE_URL,
  withCredentials: true
};

// For new components, use the ApiContext instead:
// import { useApi } from '@/contexts/ApiContext';
// const { apiBaseUrl } = useApi();