import apiClient from './api';
import { Todo, TodoCreateRequest, TodoUpdateRequest, ApiError } from '../types';

export const todoService = {
  async getTodos(): Promise<Todo[]> {
    try {
      const response = await apiClient.get<Todo[]>('/todos');
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || 'Failed to fetch todos',
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async getTodo(id: number): Promise<Todo> {
    try {
      const response = await apiClient.get<Todo>(`/todos/${id}`);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || `Failed to fetch todo with ID ${id}`,
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async createTodo(todo: TodoCreateRequest): Promise<Todo> {
    try {
      const response = await apiClient.post<Todo>('/todos', todo);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || 'Failed to create todo',
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async updateTodo(id: number, todo: TodoUpdateRequest): Promise<Todo> {
    try {
      const response = await apiClient.put<Todo>(`/todos/${id}`, todo);
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || `Failed to update todo with ID ${id}`,
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async deleteTodo(id: number): Promise<void> {
    try {
      await apiClient.delete(`/todos/${id}`);
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || `Failed to delete todo with ID ${id}`,
        status: error.response?.status
      };
      throw apiError;
    }
  },
  
  async toggleTodoStatus(id: number, completed: number): Promise<Todo> {
    try {
      const response = await apiClient.put<Todo>(`/todos/${id}`, { completed });
      return response.data;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || `Failed to update todo status`,
        status: error.response?.status
      };
      throw apiError;
    }
  }
};