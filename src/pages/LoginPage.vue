<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();
const toast = useToast();

const email = ref('');
const password = ref('');
const loading = ref(false);
const errors = ref({
  email: '',
  password: ''
});

onMounted(() => {
  email.value = 'adx-01@mail.com';
  password.value = '1234567890';
});

function validateForm() {
  let isValid = true;
  errors.value = {
    email: '',
    password: ''
  };
  
  if (!email.value.trim()) {
    errors.value.email = 'Email is required';
    isValid = false;
  }
  
  if (!password.value) {
    errors.value.password = 'Password is required';
    isValid = false;
  }
  
  return isValid;
}

async function handleSubmit() {
  if (!validateForm()) return;
  
  loading.value = true;
  try {
    await authStore.login(email.value, password.value);
    router.push('/todos');
    toast.success('Login successful!');
  } catch (error: any) {
    toast.error(error.message || 'Login failed. Please check your credentials.');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="card w-full max-w-md p-6 md:p-8">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Login to Todo App</h1>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Enter your credentials to access your todos</p>
      </div>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="form-label">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="form-input"
            :class="{'border-error-500': errors.email}"
            placeholder="you@example.com"
          />
          <p v-if="errors.email" class="form-error">{{ errors.email }}</p>
        </div>
        
        <div>
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="form-input"
            :class="{'border-error-500': errors.password}"
            placeholder="••••••••"
          />
          <p v-if="errors.password" class="form-error">{{ errors.password }}</p>
        </div>
        
        <div>
          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="loading"
          >
            <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>