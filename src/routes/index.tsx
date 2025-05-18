import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import TodosPage from '../pages/TodosPage';
import NotFoundPage from '../pages/NotFoundPage';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import Loader from '../components/ui/Loader';

const AppRoutes: React.FC = () => {
  const { loading } = useAuth();

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to="/todos" replace />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: '/todos',
          element: <TodosPage />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  return <RouterProvider router={router} />;
};

export default AppRoutes;