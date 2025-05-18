import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface AddTodoFormProps {
  onAdd: (title: string, description: string) => Promise<void>;
  isLoading: boolean;
}

interface FormData {
  title: string;
  description: string;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd, isLoading }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    await onAdd(data.title, data.description);
    reset();
  };

  return (
    <Card className="mb-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Todo</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Task title"
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
              ${errors.title ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'}`}
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-error-500">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Task description"
            rows={3}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
              ${errors.description ? 'border-error-500' : 'border-gray-300 dark:border-gray-600'}`}
            {...register('description')}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isLoading}>
            <Plus size={18} className="mr-1" />
            Add Todo
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AddTodoForm;