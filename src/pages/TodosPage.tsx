import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ListFilter, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import TodoList from '../components/todo/TodoList';
import AddTodoForm from '../components/todo/AddTodoForm';
import Button from '../components/ui/Button';
import { Todo } from '../types';
import { todoService } from '../services/todoService';
import { useAuth } from '../contexts/AuthContext';

type FilterType = 'all' | 'active' | 'completed';

const TodosPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchTodos();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    filterTodos();
  }, [filter, todos]);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const fetchedTodos = await todoService.getAllTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      toast.error('Failed to fetch todos');
      if (error.response?.status === 401) {
        navigate('/login');
      }
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

  const handleAddTodo = async (title: string, description: string) => {
    setIsSubmitting(true);
    try {
      const newTodo = await todoService.createTodo({ title, description });
      setTodos(prevTodos => [...prevTodos, newTodo]);
      toast.success('Todo added successfully');
    } catch (error) {
      console.error('Error adding todo:', error);
      toast.error('Failed to add todo');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleComplete = async (todo: Todo) => {
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
      console.error('Error toggling todo completion:', error);
      // Revert optimistic update
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === todo.id ? todo : t)
      );
      toast.error('Failed to update todo status');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleUpdateTodo = async (id: number, title: string, description: string) => {
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
      console.error('Error updating todo:', error);
      // Revert optimistic update
      setTodos(prevTodos =>
        prevTodos.map(t => t.id === id ? todoToUpdate : t)
      );
      toast.error('Failed to update todo');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const handleDeleteTodo = async (id: number) => {
    const todoToDelete = todos.find(t => t.id === id);
    if (!todoToDelete) return;

    // Optimistic delete
    setTodos(prevTodos => prevTodos.filter(t => t.id !== id));

    try {
      await todoService.deleteTodo(id);
      toast.success('Todo deleted successfully');
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Revert optimistic delete
      setTodos(prevTodos => [...prevTodos, todoToDelete]);
      toast.error('Failed to delete todo');
      if (error.response?.status === 401) {
        navigate('/login');
      }
    }
  };

  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <CheckCircle className="mr-2 h-6 w-6 text-primary-600 dark:text-primary-500" />
            My Todos
          </h1>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All ({totalTodos})
            </Button>
            <Button
              size="sm"
              variant={filter === 'active' ? 'primary' : 'outline'}
              onClick={() => setFilter('active')}
            >
              Active ({activeTodos})
            </Button>
            <Button
              size="sm"
              variant={filter === 'completed' ? 'primary' : 'outline'}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTodos})
            </Button>
          </div>
        </div>

        <AddTodoForm onAdd={handleAddTodo} isLoading={isSubmitting} />

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-4">
          <div className="flex items-center mb-4 text-sm text-gray-600 dark:text-gray-400">
            <ListFilter className="h-4 w-4 mr-1" />
            <span>
              Showing: <span className="font-medium">{filteredTodos.length}</span> {filter} todos
            </span>
          </div>

          <TodoList
            todos={filteredTodos}
            isLoading={isLoading}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TodosPage;