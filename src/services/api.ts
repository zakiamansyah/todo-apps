import axios from 'axios';

const api = axios.create({
  baseURL: 'https://squirrel-fitting-wasp.ngrok-free.app/test-todo-api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    console.log('Token:', token);

    if (token) {
      config.headers.Authorization = token.startsWith('Bearer')
        ? token
        : `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default api;
