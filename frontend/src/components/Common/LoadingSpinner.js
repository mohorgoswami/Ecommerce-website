import React from 'react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...' }) => {
  const spinnerSize = size === 'small' ? 'spinner-border-sm' : '';
  
  return (
    <div className="loading-spinner">
      <div className="text-center">
        <div className={`spinner-border text-primary ${spinnerSize}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        {message && <p className="mt-2 text-muted">{message}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;