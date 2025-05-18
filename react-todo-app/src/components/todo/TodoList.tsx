import React from 'react';
import { Todo } from '../../types';
import TodoItem from './TodoItem';
import Loader from '../ui/Loader';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  onToggleComplete: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string, description: string) => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  isLoading,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader size="lg" />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 dark:text-gray-400">No todos yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem
          key={`todo-${todo.id}`}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default TodoList;