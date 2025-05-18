import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Todo } from '../types';
import { todoService } from '../services/todoService';

export type FilterType = 'all' | 'active' | 'completed';

export const useTodos = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  const handleError = (error: any, message: string) => {
    console.error(`Error: ${message}`, error);
    toast.error(message);
    if (error.response?.status === 401) {
      navigate('/login');
    }
  };

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      handleError(error, 'Failed to fetch todos');
    } finally {
      setIsLoading(false);
    }
  };

  const filterTodos = () => {
    switch (filter) {
      case 'active':
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;
      default:
        setFilteredTodos(todos);
    }
  };

  const addTodo = async (title: string, description: string) => {
    setIsSubmitting(true);
    try {
      const newTodo = await todoService.createTodo({ title, description });
      setTodos(prevTodos => [...prevTodos, newTodo]);
      toast.success('Todo added successfully');
    } catch (error) {
      handleError(error, 'Failed to add todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTodoComplete = async (todo: Todo) => {
    const optimisticTodo = { ...todo, completed: todo.completed ? 0 : 1 };
    setTodos(prevTodos =>
      prevTodos.map(t => t.id === todo.id ? optimisticTodo : t)
    );

    try {
      const updatedTodo = await todoService.toggleTodoCompletion(todo);
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t)
      );
      toast.success(
        updatedTodo.completed ? 'Todo marked as completed' : 'Todo marked as incomplete'
      );
    } catch (error) {
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === todo.id ? todo : t)
      );
      handleError(error, 'Failed to update todo status');
    }
  };

  const updateTodo = async (id: number, title: string, description: string) => {
    const todoToUpdate = todos.find(t => t.id === id);
    if (!todoToUpdate) return;

    const optimisticTodo = { ...todoToUpdate, title, description };
    setTodos(prevTodos =>
      prevTodos.map(t => t.id === id ? optimisticTodo : t)
    );

    try {
      const updatedTodo = await todoService.updateTodo(id, { title, description });
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === updatedTodo.id ? updatedTodo : t)
      );
      toast.success('Todo updated successfully');
    } catch (error) {
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === id ? todoToUpdate : t)
      );
      handleError(error, 'Failed to update todo');
    }
  };

  const deleteTodo = async (id: number) => {
    const todoToDelete = todos.find(t => t.id === id);
    if (!todoToDelete) return;

    setTodos(prevTodos => prevTodos.filter(t => t.id !== id));

    try {
      await todoService.deleteTodo(id);
      toast.success('Todo deleted successfully');
    } catch (error) {
      setTodos(prevTodos => [...prevTodos, todoToDelete]);
      handleError(error, 'Failed to delete todo');
    }
  };

  useEffect(() => {
    filterTodos();
  }, [filter, todos]);

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    active: todos.length - todos.filter(todo => todo.completed).length,
  };

  return {
    todos: filteredTodos,
    isLoading,
    isSubmitting,
    filter,
    stats,
    setFilter,
    fetchTodos,
    addTodo,
    toggleTodoComplete,
    updateTodo,
    deleteTodo,
  };
};