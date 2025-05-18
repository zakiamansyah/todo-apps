import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  className?: string;
}

const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
  };

  const colorClasses = {
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    accent: 'border-accent-500',
    white: 'border-white',
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`
          animate-spin rounded-full
          border-solid border-t-transparent
          ${sizeClasses[size]}
          ${colorClasses[color as keyof typeof colorClasses] || 'border-primary-500'}
        `}
      />
    </div>
  );
};

export default Loader;