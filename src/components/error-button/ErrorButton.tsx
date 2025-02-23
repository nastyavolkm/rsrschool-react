import React, { useState } from 'react';
import './ErrorButton.css';

export const ErrorButton: React.FC = () => {
  const [hasError, setHasError] = useState(false);

  const triggerError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Manually triggered error!');
  }

  return (
    <button className="error-button" onClick={triggerError}>
      Click me to throw an error
    </button>
  );
};
