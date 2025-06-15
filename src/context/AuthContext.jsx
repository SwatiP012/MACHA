import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Making sure we get the API URL from environment variables
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Set up axios interceptors for authentication
  useEffect(() => {
    // Request interceptor to add token to all requests
    const requestInterceptor = axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => {
        // Handle token expiration
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          // Only logout if the error is related to auth, not on initial load
          if (currentUser) {
            logout();
            setAuthError('Your session has expired. Please login again.');
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when the component unmounts
    return () => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    };
  }, [currentUser]);

  // Check auth status on initial load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Try to check server health first
        try {
          await axios.get(`${API_BASE_URL}/api/health`, { timeout: 2000 });
        } catch (healthError) {
          console.warn('Server health check failed, may affect authentication', healthError);
        }

        // Verify token with backend
        const response = await axios.get(`${API_BASE_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          timeout: 5000 // Add a timeout to prevent hanging
        });

        if (response.data && response.data.user) {
          setCurrentUser({
            ...response.data.user,
            role: response.data.user.role || 'user'
          });
          console.log('User authenticated successfully:', response.data.user);
        } else {
          console.warn('Invalid auth response:', response.data);
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);

        if (error.code === 'ERR_NETWORK' || error.code === 'ECONNABORTED') {
          console.error('Server is not responding. Either it\'s down or there\'s a network issue.');
          setAuthError('Server connection error. Please try again later.');
        } else if (error.response) {
          console.error('Error response:', error.response.data, 'Status:', error.response.status);
        } else if (error.request) {
          console.error('No response received. Request:', error.request);
        }

        // Clear token for security
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [API_BASE_URL]);

  const login = (userData) => {
    // Make sure to include the role in user data
    const user = {
      ...userData,
      role: userData.role || 'user' // Default to user role if not specified
    };
    setCurrentUser(user);
    setAuthError(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const updateUserProfile = (updatedData) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updatedData
    }));
  };

  const value = {
    currentUser,
    loading,
    authError,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
