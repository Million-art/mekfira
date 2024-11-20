import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,  // Important for sending cookies
});

// Add a response interceptor to handle token expiration and refresh
api.interceptors.response.use( 
);

export default api;
