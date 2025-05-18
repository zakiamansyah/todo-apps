import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ui/ThemeToggle';
import Button from '../ui/Button';

const Header: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <CheckSquare className="h-8 w-8 text-primary-600 dark:text-primary-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              TodoApp
            </span>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated && (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {user?.username}
                </span>
                <ThemeToggle />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut size={18} className="mr-1" />
                  Logout
                </Button>
              </>
            )}
            {!isAuthenticated && (
              <ThemeToggle />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;