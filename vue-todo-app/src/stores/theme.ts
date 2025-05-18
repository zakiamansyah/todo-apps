import { defineStore } from 'pinia';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    if (defaultTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
    
    return {
      mode: defaultTheme
    };
  },
  
  actions: {
    toggleTheme() {
      this.mode = this.mode === 'light' ? 'dark' : 'light';
      
      if (this.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', this.mode);
    },
    
    setTheme(theme: ThemeMode) {
      this.mode = theme;
      
      if (this.mode === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      localStorage.setItem('theme', this.mode);
    }
  }
});