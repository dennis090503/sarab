import axios from 'axios';

const API = axios.create({
  // Include /api in the baseURL
  baseURL: import.meta.env.VITE_API_URL 
    ? `${import.meta.env.VITE_API_URL}` 
    : 'http://localhost:5000',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add request interceptor to include auth token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;