import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { CheckSquare } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from '../components/ui/ThemeToggle';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Login successful!');
      navigate('/todos');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setValue('email', 'adx-01@mail.com');
    setValue('password', '1234567890');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center">
            <CheckSquare className="h-10 w-10 text-primary-600 dark:text-primary-500" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            Todo App
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Sign in to manage your tasks
          </p>
        </div>

        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            fullWidth
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            fullWidth
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            className="mt-6"
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={fillDemoCredentials}
            className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Use Demo Credentials
          </button>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
