// src/components/ErrorDisplay.jsx
import React from 'react';
import { ErrorTypes } from '../utils/errorHandling';

/**
 * Error message display component with appropriate styling based on error type
 */
export const ErrorMessage = ({ error, onDismiss, className = '' }) => {
  if (!error) return null;
  
  const errorTypes = {
    [ErrorTypes.NETWORK]: {
      title: 'Connection Error',
      bgColor: 'bg-orange-700',
      icon: '📶'
    },
    [ErrorTypes.API]: {
      title: 'Server Error',
      bgColor: 'bg-red-800',
      icon: '🖥️'
    },
    [ErrorTypes.AUTHENTICATION]: {
      title: 'Authentication Error',
      bgColor: 'bg-amber-700',
      icon: '🔒'
    },
    [ErrorTypes.VALIDATION]: {
      title: 'Input Error',
      bgColor: 'bg-amber-600',
      icon: '⚠️'
    },
    [ErrorTypes.UNKNOWN]: {
      title: 'Unexpected Error',
      bgColor: 'bg-gray-700',
      icon: '❓'
    }
  };
  
  // Get error type info or default to unknown
  const errorType = error.raw?.type || ErrorTypes.UNKNOWN;
  const { title, bgColor, icon } = errorTypes[errorType] || errorTypes[ErrorTypes.UNKNOWN];
  
  return (
    <div className={`rounded-md p-4 ${bgColor} text-white shadow-md ${className}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 text-2xl mr-3">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-1">{title}</h3>
          <p className="text-white text-opacity-90">{error.message}</p>
          
          {/* Show technical details in development */}
          {process.env.NODE_ENV === 'development' && error.raw?.details && (
            <details className="mt-2 bg-black bg-opacity-30 p-2 rounded">
              <summary className="cursor-pointer text-sm">Technical Details</summary>
              <pre className="text-xs mt-2 overflow-auto max-h-40 whitespace-pre-wrap">
                {JSON.stringify(error.raw.details, null, 2)}
              </pre>
            </details>
          )}
        </div>
        
        {onDismiss && (
          <button 
            onClick={onDismiss}
            className="flex-shrink-0 text-white text-opacity-80 hover:text-opacity-100 ml-2"
            aria-label="Dismiss error message"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Loading spinner component
 */
export const LoadingSpinner = ({ size = 'md', message = 'Loading...', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`animate-spin rounded-full border-t-2 border-b-2 border-white ${sizeClasses[size]}`}></div>
      {message && <p className="mt-2 text-white text-opacity-90">{message}</p>}
    </div>
  );
};

/**
 * Error boundary component to catch rendering errors
 */
export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    // Could send to error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-red-900 text-white rounded-md shadow-lg">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">We encountered an error while rendering this component.</p>
          
          {process.env.NODE_ENV === 'development' && (
            <pre className="bg-black bg-opacity-30 p-3 rounded text-sm overflow-auto">
              {this.state.error?.toString()}
            </pre>
          )}
          
          <button
            className="mt-4 px-4 py-2 bg-white text-red-900 font-semibold rounded hover:bg-gray-100"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}