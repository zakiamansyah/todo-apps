<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

function goToHomePage() {
  if (authStore.isAuthenticated) {
    router.push('/todos');
  } else {
    router.push('/login');
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex flex-col items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-primary-600 dark:text-primary-400">404</h1>
      <h2 class="text-3xl font-semibold text-gray-800 dark:text-white mt-4">Page Not Found</h2>
      <p class="text-gray-600 dark:text-gray-300 mt-2">The page you are looking for does not exist.</p>
      <button @click="goToHomePage" class="btn btn-primary mt-6">Go back home</button>
    </div>
  </div>
</template>