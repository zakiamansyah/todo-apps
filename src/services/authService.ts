import api from './api';
import { LoginCredentials, LoginResponse, User } from '../types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await api.post<LoginResponse>('/users/login', credentials);

    if (response.data.success) {
      const user: User = {
        userId: response.data.userId,
        username: response.data.username,
        token: response.data.token,
      };

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    } else {
      throw new Error(response.data.message || 'Login failed');
    }
  },

  
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr) as User;
    } catch (error) {
      return null;
    }
  },
  
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  },
};