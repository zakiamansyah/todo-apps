import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

let onUnauthorizedLogout: (() => void) | null = null;

export function setUnauthorizedLogoutHandler(handler: () => void) {
  onUnauthorizedLogout = handler;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://squirrel-fitting-wasp.ngrok-free.app/test-todo-api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token');

    if (token && config.headers) {
      config.headers.Authorization = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && onUnauthorizedLogout) {
      onUnauthorizedLogout();
    }

    return Promise.reject(error);
  }
);

export default apiClient;
