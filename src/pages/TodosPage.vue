<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useTodosStore } from '../stores/todos';
import TodoItem from '../components/TodoItem.vue';
import AddTodoForm from '../components/AddTodoForm.vue';

const todosStore = useTodosStore();

const loading = ref(true);
const filterStatus = ref('all');

onMounted(async () => {
  loading.value = true;
  try {
    await todosStore.fetchTodos();
  } finally {
    loading.value = false;
  }
});

const filteredTodos = computed(() => {
  switch (filterStatus.value) {
    case 'completed':
      return todosStore.completedTodos;
    case 'incomplete':
      return todosStore.incompleteTodos;
    default:
      return todosStore.items;
  }
});
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">My Todos</h1>
    
    <AddTodoForm />
    
    <div class="flex mb-6 flex-wrap gap-2">
      <button
        @click="filterStatus = 'all'"
        class="btn px-3 py-1"
        :class="filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'"
      >
        All ({{ todosStore.items.length }})
      </button>
      <button
        @click="filterStatus = 'completed'"
        class="btn px-3 py-1"
        :class="filterStatus === 'completed' ? 'btn-primary' : 'btn-secondary'"
      >
        Completed ({{ todosStore.completedTodos.length }})
      </button>
      <button
        @click="filterStatus = 'incomplete'"
        class="btn px-3 py-1"
        :class="filterStatus === 'incomplete' ? 'btn-primary' : 'btn-secondary'"
      >
        Incomplete ({{ todosStore.incompleteTodos.length }})
      </button>
    </div>
    
    <div v-if="loading" class="py-12 flex justify-center">
      <div class="flex flex-col items-center">
        <svg class="animate-spin h-8 w-8 text-primary-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p class="text-gray-600 dark:text-gray-300">Loading todos...</p>
      </div>
    </div>
    
    <div v-else-if="filteredTodos.length === 0" class="py-12 text-center">
      <div class="mx-auto max-w-lg">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white">No todos found</h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400">
          {{ filterStatus === 'all' ? 'Get started by creating your first todo!' : `No ${filterStatus} todos found.` }}
        </p>
        <div v-if="filterStatus !== 'all'" class="mt-6">
          <button @click="filterStatus = 'all'" class="btn btn-primary">
            View all todos
          </button>
        </div>
      </div>
    </div>
    
    <div v-else class="space-y-4">
      <transition-group name="fade" tag="div" class="space-y-4">
        <TodoItem
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
        />
      </transition-group>
    </div>
  </div>
</template>