import { defineStore } from 'pinia';
import { Todo, TodoCreateRequest, TodoUpdateRequest } from '../types';
import { todoService } from '../services/todos';

interface TodosState {
  items: Todo[];
  loading: boolean;
  error: string | null;
  currentTodo: Todo | null;
}

export const useTodosStore = defineStore('todos', {
  state: (): TodosState => ({
    items: [],
    loading: false,
    error: null,
    currentTodo: null
  }),

  getters: {
    completedTodos: (state) => state.items.filter(todo => todo.completed === 1),
    incompleteTodos: (state) => state.items.filter(todo => todo.completed === 0),
    todoById: (state) => (id: number) => state.items.find(todo => todo.id === id)
  },

  actions: {
    async fetchTodos() {
      this.loading = true;
      this.error = null;

      try {
        const todos = await todoService.getTodos();
        this.items = todos;
      } catch (error: any) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchTodo(id: number) {
      this.loading = true;
      this.error = null;

      try {
        const todo = await todoService.getTodo(id);
        this.currentTodo = todo;
        return todo;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createTodo(todoData: TodoCreateRequest) {
      this.loading = true;
      this.error = null;

      try {
        const newTodo = await todoService.createTodo(todoData);
        this.items.push(newTodo);
        return newTodo;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateTodo(id: number, todoData: TodoUpdateRequest) {
      this.loading = true;
      this.error = null;

      try {
        const updatedTodo = await todoService.updateTodo(id, todoData);

        const index = this.items.findIndex(todo => todo.id === id);
        if (index !== -1) {
          this.items.splice(index, 1, updatedTodo);
        }

        if (this.currentTodo?.id === id) {
          this.currentTodo = updatedTodo;
        }

        return updatedTodo;
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteTodo(id: number) {
      this.loading = true;
      this.error = null;

      try {
        await todoService.deleteTodo(id);
        this.items = this.items.filter(todo => todo.id !== id);

        if (this.currentTodo?.id === id) {
          this.currentTodo = null;
        }
      } catch (error: any) {
        this.error = error.message;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async toggleTodoStatus(id: number) {
      const todo = this.items.find(todo => todo.id === id);
      if (!todo) return;

      const newStatus = todo.completed === 1 ? 0 : 1;

      try {
        const updatedTodo = await todoService.toggleTodoStatus(id, newStatus);

        const index = this.items.findIndex(t => t.id === id);
        if (index !== -1) {
          this.items.splice(index, 1, updatedTodo);
        }

        if (this.currentTodo?.id === id) {
          this.currentTodo = updatedTodo;
        }
      } catch (error: any) {
        this.error = error.message;
      }
    }
  }
});
