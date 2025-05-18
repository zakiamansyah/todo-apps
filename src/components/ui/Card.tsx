import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`
        bg-white dark:bg-gray-800 rounded-lg shadow-soft
        border border-gray-200 dark:border-gray-700
        p-4 md:p-6 animate-fade-in
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;