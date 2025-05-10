import axios from 'axios';

// Centralized API configuration
const API_CONFIG = {
  baseURL: process.env.REACT_APP_API_BASE_URL || 'https://devjahangir.com/solaiman/api',
  endpoints: {
    tasks: '/tasks',
  }
};

const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a method to get full URLs
axiosInstance.getUrl = (endpointKey, id = '') => {
  const endpoint = API_CONFIG.endpoints[endpointKey];
  if (!endpoint) throw new Error(`Unknown endpoint: ${endpointKey}`);
  
  return id ? `${endpoint}/${id}` : endpoint;
};

export default axiosInstance;