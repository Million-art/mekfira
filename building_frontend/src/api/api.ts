// src/api/api.tsx
import axios from 'axios';
import { BaseUrl } from '../constant/baseUrl'; // Adjust the path if needed

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: BaseUrl, // Now this will resolve to the proxy
  headers: {
    'Content-Type': 'application/json',
  },
});

// Export the Axios instance to be used in other files
export default api;
