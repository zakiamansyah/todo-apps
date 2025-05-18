import apiClient from './api';
import { LoginRequest, LoginResponse, ApiError } from '../types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>('/users/login', credentials);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || 'Login failed',
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async register(userData: any): Promise<any> {
    try {
      const response = await apiClient.post('/users/register', userData);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || 'Registration failed',
        status: error.response?.status
      };
      throw apiError;
    }
  }
};