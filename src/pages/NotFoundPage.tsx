import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-6xl font-extrabold text-primary-600 dark:text-primary-500">404</h1>
      <p className="mt-4 text-xl text-gray-700 dark:text-gray-300">Page not found</p>
      <p className="mt-2 text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist or has been moved.</p>
      
      <Button 
        variant="primary"
        className="mt-8"
        onClick={() => navigate('/')}
      >
        <ArrowLeft size={18} className="mr-1" />
        Go back home
      </Button>
    </div>
  );
};

export default NotFoundPage;