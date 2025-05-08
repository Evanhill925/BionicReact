import React from 'react';
import './ErrorMessage.css'; // Make sure to import the CSS file

/**
 * ErrorMessage Component - Displays error messages with optional retry functionality
 * 
 * @param {Object|string} error - Error object or error message string
 * @param {Function} onRetry - Optional callback function for retry button
 * @param {string} className - Additional CSS classes
 * @param {boolean} showDetails - Whether to show technical error details
 * @returns {JSX.Element|null} - Returns the error message component or null if no error
 */
const ErrorMessage = ({ 
  error, 
  className = '', 
  showDetails = false 
}) => {
  // If no error, don't render anything
  if (!error) return null;

  // Get appropriate error message based on error type
  const getErrorMessage = () => {
    if (typeof error === 'string') return error;
    
    // Handle different error types
    // ERR_UNHANDLE_REJECTION is the error for 2 min timeout for midjourney
    if (error.code === 'ERR_UNHANDLED_REJECTION' || error.code === 'TIMEOUT_ERROR') {
      return 'The request timed out. Your prompt may contain content that cannot be processed.';
    }
    
    if (error.status === 400) {
      return 'Please check your input and try again.';
    }
    
    if (error.status === 429) {
      return 'Too many requests. Please wait a moment before trying again.';
    }

    if (error.status === 403) {
      return 'Access denied. Your prompt may contain restricted content.';
    }
    
    if (error.status >= 500) {
      return 'Server error. The image generation service may be experiencing issues.';
    }
     
     //midjourney error for no tokens
     if(error.message === 'no_tokens' ){
      return 'This image generator is currently not available. Please choose an different drop down selection'
    }

    //midjourney and gpt-image error for inappropriate content
    if(error.message === 'blocked_request'){
      return 'Your request was rejected as a result of our safety system. Your request may contain content that is not allowed by our safety system.'
    }

    //message created by if statement in homepage component
    if (error.message ===  'Please enter a prompt or upload an image.') {
      return 'Please enter a prompt or upload an image.';
    }

    // fallback message if JSON is not properly sent from backend
    if (error.message === 'Unexpected end of JSON input') {
      return 'There was an issue processing the server response. Please try again later.';
    }

    //generic error message if no code exists
    return 'An unknown error occurred. Please try again later.';

  };
 
  return (
    <div className={`error-container ${className}`}>
      <div className="error-icon">⚠️</div>
      <div className="error-content">
        <h4>Something went wrong</h4>
        <p>{getErrorMessage()}</p>
        
        {showDetails && error.details && (
          <details>
            <summary>Technical details</summary>
            <pre>{JSON.stringify(error.details, null, 2)}</pre>
          </details>
        )}
        
      </div>
    </div>
  );
};

export default ErrorMessage;