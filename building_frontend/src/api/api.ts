import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For React Router v6+
import { toast } from 'react-toastify'; // For toast notifications

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,  // Important for sending cookies
});

// Add a response interceptor to handle token expiration and refresh
api.interceptors.response.use(
  (response) => response, // If the response is successful, just return it
  async (error) => {
    const originalRequest = error.config; // Get the original request that failed

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loop if retry fails

      try {
        // Call the accessTokenGenerator endpoint to refresh the token
        const refreshResponse = await axios.post('http://localhost:3001/api/admin/refresh', {}, { withCredentials: true });

        // If the refresh was successful, update the Authorization header and retry the request
        const newAccessToken = refreshResponse.data.accesstoken;
        axios.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, log the user out or handle the failure accordingly
        console.error('Refresh token failed', refreshError);

        // Show a session expired message
        toast.error('Session expired. Please log in again.');

        // Use navigate to redirect to the login page
        const navigate = useNavigate();
        navigate('/login'); // Adjust the login route if needed

        return Promise.reject(refreshError);
      }
    }

    // Return the error if it's not a 401 or can't refresh
    return Promise.reject(error);
  }
);

export default api;
