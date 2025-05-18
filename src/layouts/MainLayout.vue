<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader />
    
    <main class="flex-1">
      <div class="page-container">
        <router-view />
      </div>
    </main>
    
    <footer class="bg-white py-4 dark:bg-gray-800 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <p class="text-center text-sm text-gray-500 dark:text-gray-400">
          &copy; {{ new Date().getFullYear() }} Todo App
        </p>
      </div>
    </footer>
  </div>
</template>