import React from 'react';
import './Spinner.css';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <h4>Loading...</h4>
    </div>
  );
};

export default Spinner;
