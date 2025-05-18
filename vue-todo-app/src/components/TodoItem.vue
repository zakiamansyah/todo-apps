<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { Todo } from '../types';
import { useTodosStore } from '../stores/todos';

const props = defineProps<{
  todo: Todo;
}>();

const todosStore = useTodosStore();

const isEditing = ref(false);
const editTitle = ref(props.todo.title);
const editDescription = ref(props.todo.description);
const loading = ref(false);

const localTodo = ref<Todo>({ ...props.todo });

watch(
  () => todosStore.todoById(localTodo.value.id),
  (updatedTodo) => {
    if (updatedTodo) {
      localTodo.value = { ...updatedTodo };
    }
  },
  { immediate: true }
);

const statusClasses = computed(() => {
  return localTodo.value.completed === 1
    ? 'bg-success-500 text-white'
    : 'bg-warning-500 text-white';
});

const statusText = computed(() => {
  return localTodo.value.completed === 1 ? 'Completed' : 'Pending';
});

async function toggleStatus() {
  loading.value = true;
  try {
    await todosStore.toggleTodoStatus(localTodo.value.id);
  } finally {
    loading.value = false;
  }
}

async function deleteTodo() {
  if (!confirm('Are you sure you want to delete this todo?')) return;

  loading.value = true;
  try {
    await todosStore.deleteTodo(localTodo.value.id);
  } finally {
    loading.value = false;
  }
}

function startEdit() {
  editTitle.value = localTodo.value.title;
  editDescription.value = localTodo.value.description;
  isEditing.value = true;
}

async function saveEdit() {
  if (!editTitle.value.trim()) return;

  loading.value = true;
  try {
    await todosStore.updateTodo(localTodo.value.id, {
      title: editTitle.value,
      description: editDescription.value
    });
    isEditing.value = false;
  } finally {
    loading.value = false;
  }
}

function cancelEdit() {
  isEditing.value = false;
}
</script>

<template>
  <div
    class="todo-item card p-4 mb-4 relative overflow-hidden transition-all duration-300"
    :class="{ 'opacity-70': loading }"
  >
    <div
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10 z-10"
    >
      <svg
        class="animate-spin h-5 w-5 text-primary-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>

    <div v-if="!isEditing" class="flex flex-col md:flex-row md:items-center">
      <div class="flex-1">
        <div class="flex items-center mb-2">
          <span :class="statusClasses" class="text-xs font-medium px-2 py-1 rounded-full mr-2">
            {{ statusText }}
          </span>
          <h3 class="text-lg font-medium line-clamp-1">{{ localTodo.title }}</h3>
        </div>
        <p class="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">{{ localTodo.description }}</p>
      </div>
      <div class="flex space-x-2 md:ml-4">
        <button @click="toggleStatus" class="btn btn-secondary text-sm" :disabled="loading">
          {{ localTodo.completed === 1 ? 'Mark Incomplete' : 'Mark Complete' }}
        </button>
        <button @click="startEdit" class="btn btn-primary text-sm" :disabled="loading">
          Edit
        </button>
        <button @click="deleteTodo" class="btn btn-danger text-sm" :disabled="loading">
          Delete
        </button>
      </div>
    </div>

    <div v-else class="edit-form">
      <div class="mb-3">
        <label for="editTitle" class="form-label">Title</label>
        <input
          id="editTitle"
          v-model="editTitle"
          type="text"
          class="form-input"
          placeholder="Todo title"
        />
      </div>
      <div class="mb-4">
        <label for="editDescription" class="form-label">Description</label>
        <textarea
          id="editDescription"
          v-model="editDescription"
          class="form-input"
          rows="3"
          placeholder="Todo description"
        ></textarea>
      </div>
      <div class="flex justify-end space-x-2">
        <button @click="cancelEdit" class="btn btn-secondary" :disabled="loading">Cancel</button>
        <button @click="saveEdit" class="btn btn-primary" :disabled="loading">Save</button>
      </div>
    </div>
  </div>
</template>
