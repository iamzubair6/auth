import { QueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL, onProduction } from './apiUrl';
import {
  getAccessToken,
  getRefreshToken,
  removeTokens,
  setAccessToken,
  setRefreshToken,
} from './localStorage';

// Create Axios instances
const axiosApi = axios.create({ baseURL });
export const axiosRaw = axios.create({ baseURL });

// Request interceptor to add authorization header conditionally
axiosApi.interceptors.request.use(
  (config) => {
    if (!config.skipAuth) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Token refresh logic
let isRefreshing = false;
let subscribers = [];

const subscribeTokenRefresh = (callback) => {
  subscribers.push(callback);
};

const onRefreshed = (token) => {
  subscribers.forEach((callback) => callback(token));
  subscribers = [];
};

const refreshToken = async () => {
  isRefreshing = true;
  try {
    const { data } = await axiosRaw.post('/authentication/v1/token/refresh/', {
      refresh: getRefreshToken(),
    });
    setAccessToken(data.access);
    setRefreshToken(data.refresh);  // Update the refresh token
    onRefreshed(data.access);
    return data.access;
  } catch (error) {
    console.error("Token refresh failed:", error);
    removeTokens(); // Clear tokens if refresh fails
    throw error;
  } finally {
    isRefreshing = false;
  }
};


export const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axiosApi(`${queryKey[0]}`);
  return data;
};

// Response interceptor to handle token expiration
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401 && !originalRequest._retry) {
      if (!isRefreshing) {
        originalRequest._retry = true;
        try {
          const newToken = await refreshToken();
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axiosApi(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      } else {
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosApi(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

/// Function to verify the access token via an API call
const verifyAccessToken = async () => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error("No access token available");

    // Verify the access token using POST method
    await axiosRaw.post('/authentication/v1/token/verify/', {
      token: accessToken,
    });
    return true;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Access token is invalid or expired
      return false;
    }
    // Other errors
    throw error;
  }
};

// Function to initialize the app and handle auto-login
const initializeApp = async () => {
  try {
    const isAccessTokenValid = await verifyAccessToken();
    if (!isAccessTokenValid) {
      // Attempt to refresh the access token
      const newAccessToken = await refreshToken();
      if (newAccessToken) {
        // Token refreshed, proceed with login
        proceedWithLogin();
      } else {
        // Refresh token failed, redirect to login
        redirectToLogin();
      }
    } else {
      // Access token is valid, proceed with login
      proceedWithLogin();
    }
  } catch (error) {
    // Handle verification or refresh failure
    console.error(error);
    redirectToLogin();
  }
};

// Function to handle post-login logic
const proceedWithLogin = () => {
  // Your logic to update the app state and redirect to dashboard
  console.log("User logged in automatically");
  // Redirect to the dashboard only if not already there
  if (window.location.pathname !== '/') {
    window.location.href = '/'; // Adjust the path as needed
  }
};

// Function to redirect to the login page
const redirectToLogin = () => {
  console.log("Redirecting to login");
  // Redirect to the login page only if not already there
  if (window.location.pathname !== '/auth') {
    window.location.href = '/auth'; // Adjust the path as needed
  }
};
// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: onProduction,
      refetchOnMount: onProduction,
      refetchOnReconnect: onProduction,
      queryFn: defaultQueryFn,
    },
  },
});

export default axiosApi;
export { initializeApp };

