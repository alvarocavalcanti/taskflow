import React from 'react'
import { cn } from '../../utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ 
  label, 
  error, 
  helperText, 
  className, 
  id, 
  ...props 
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-1 transition-colors duration-200',
          error 
            ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-500' 
            : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-danger-600">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  )
}