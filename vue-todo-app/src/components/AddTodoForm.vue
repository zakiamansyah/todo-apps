<script setup lang="ts">
import { ref } from 'vue';
import { useTodosStore } from '../stores/todos';
import { useToast } from 'vue-toastification';

const todosStore = useTodosStore();
const toast = useToast();

const title = ref('');
const description = ref('');
const loading = ref(false);
const errors = ref({
  title: '',
  description: ''
});

function validateForm() {
  let isValid = true;
  errors.value = {
    title: '',
    description: ''
  };
  
  if (!title.value.trim()) {
    errors.value.title = 'Title is required';
    isValid = false;
  }
  
  return isValid;
}

async function handleSubmit() {
  if (!validateForm()) return;
  
  loading.value = true;
  try {
    await todosStore.createTodo({
      title: title.value,
      description: description.value
    });
    
    title.value = '';
    description.value = '';
    
    toast.success('Todo added successfully!');
  } catch (error: any) {
    toast.error(error.message || 'Failed to add todo');
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="add-todo-form card p-4 mb-6">
    <h2 class="text-xl font-bold mb-4">Add New Todo</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label for="title" class="form-label">Title</label>
        <input
          id="title"
          v-model="title"
          type="text"
          class="form-input"
          :class="{'border-error-500': errors.title}"
          placeholder="Enter todo title"
        />
        <p v-if="errors.title" class="form-error">{{ errors.title }}</p>
      </div>
      
      <div class="mb-4">
        <label for="description" class="form-label">Description</label>
        <textarea
          id="description"
          v-model="description"
          class="form-input"
          :class="{'border-error-500': errors.description}"
          rows="3"
          placeholder="Enter todo description"
        ></textarea>
        <p v-if="errors.description" class="form-error">{{ errors.description }}</p>
      </div>
      
      <div class="flex justify-end">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          <svg v-if="loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Add Todo
        </button>
      </div>
    </form>
  </div>
</template>