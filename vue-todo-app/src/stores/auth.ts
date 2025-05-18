import { defineStore } from 'pinia';
import { User } from '../types';
import { authService } from '../services/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedToken,
      token: storedToken,
    };
  },

  actions: {
    async login(email: string, password: string) {
      const response = await authService.login({
        user_name: email,
        user_password: password,
      });

      const user: User = {
        userId: response.userId,
        username: response.username,
        token: response.token,
      };

      this.user = user;
      this.isAuthenticated = true;
      this.token = response.token;

      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', response.token);

      return response;
    },

    logout() {
      this.user = null;
      this.isAuthenticated = false;
      this.token = null;

      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});
