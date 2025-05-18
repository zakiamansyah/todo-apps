import api from './api';
import { Todo, CreateTodoPayload, UpdateTodoPayload } from '../types';

export const todoService = {
  async getAllTodos(): Promise<Todo[]> {
    const response = await api.get<Todo[]>('/todos');
    return response.data;
  },
  
  async getTodoById(id: number): Promise<Todo> {
    const response = await api.get<Todo>(`/todos/${id}`);
    return response.data;
  },
  
  async createTodo(todoData: CreateTodoPayload): Promise<Todo> {
    const response = await api.post<Todo>('/todos', todoData);
    return response.data;
  },
  
  async updateTodo(id: number, todoData: UpdateTodoPayload): Promise<Todo> {
    const response = await api.put<Todo>(`/todos/${id}`, {
      ...todoData,
      completed: todoData.completed ?? 0,
    });
    return response.data;
  },
  
  async deleteTodo(id: number): Promise<void> {
    await api.delete(`/todos/${id}`);
  },
  
  async toggleTodoCompletion(todo: Todo): Promise<Todo> {
    return this.updateTodo(todo.id, {
      title: todo.title,
      description: todo.description,
      completed: todo.completed ? 0 : 1,
    });
  },
};