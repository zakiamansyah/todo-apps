import React, { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', fullWidth = false, ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            htmlFor={props.id}
          >
            {label}
          </label>
        )}
        <input
          className={`
            px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
            rounded-md shadow-sm w-full ${error ? 'border-error-500' : ''}
            ${className}
          `}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-error-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;