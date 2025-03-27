// src/components/LoadingSpinner.jsx
import React from 'react';
import PropTypes from 'prop-types';

export default function LoadingSpinner({ message = 'Loading...' }) {
  const spinnerStyle = {
    width: '40px',
    height: '40px',
    border: '4px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '50%',
    borderTopColor: '#3498db',
    animation: 'spin 1s ease-in-out infinite'
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    padding: '2rem'
  };

  return (
    <div style={containerStyle} data-testid="loading-spinner">
      <div style={spinnerStyle}></div>
      <p>{message}</p>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

LoadingSpinner.propTypes = {
  message: PropTypes.string
};