import React, { useState } from 'react';
import { Edit, Trash2, Check, X, Save } from 'lucide-react';
import { Todo } from '../../types';
import Button from '../ui/Button';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (todo: Todo) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdate: (id: number, title: string, description: string) => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleComplete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onToggleComplete(todo);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (isLoading || editTitle.trim() === '') return;
    
    setIsLoading(true);
    try {
      await onUpdate(todo.id, editTitle, editDescription);
      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setIsEditing(false);
  };

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg shadow-sm 
      border border-gray-200 dark:border-gray-700
      mb-3 p-4 animate-fade-in transition-all
      ${todo.completed ? 'opacity-70' : ''}
    `}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Title"
          />
          <textarea
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Description"
            rows={2}
          />
          <div className="flex justify-end space-x-2 mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isLoading}
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleUpdate}
              isLoading={isLoading}
            >
              <Save size={16} className="mr-1" />
              Save
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <button
                onClick={handleToggleComplete}
                disabled={isLoading}
                className={`
                  mt-1 flex-shrink-0 h-5 w-5 rounded border
                  ${todo.completed
                    ? 'bg-primary-500 border-primary-600 text-white flex items-center justify-center'
                    : 'border-gray-300 dark:border-gray-600'
                  }
                `}
                aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {todo.completed ? <Check size={14} /> : null}
              </button>
              <div>
                <h3 className={`text-lg font-medium ${
                  todo.completed
                    ? 'text-gray-500 dark:text-gray-400 line-through'
                    : 'text-gray-900 dark:text-white'
                }`}>
                  {todo.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  todo.completed
                    ? 'text-gray-400 dark:text-gray-500 line-through'
                    : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {todo.description}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                aria-label="Edit todo"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={handleDelete}
                disabled={isLoading}
                className="text-error-500 hover:text-error-700 dark:text-error-400 dark:hover:text-error-300"
                aria-label="Delete todo"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;