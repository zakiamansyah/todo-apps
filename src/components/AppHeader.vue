<script setup lang="ts">
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import ThemeSwitcher from './ThemeSwitcher.vue';

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="bg-white shadow-sm dark:bg-gray-800 dark:shadow-xl transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <h1 class="text-xl font-bold text-primary-600 dark:text-primary-400">TodoApp</h1>
      </div>
      
      <div class="flex items-center space-x-4">
        <ThemeSwitcher />
        
        <template v-if="authStore.isAuthenticated">
          <span class="text-sm text-gray-600 dark:text-gray-300 hidden sm:inline-block">
            {{ authStore.user?.username }}
          </span>
          
          <button
            @click="logout"
            class="text-sm btn btn-secondary"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </header>
</template>