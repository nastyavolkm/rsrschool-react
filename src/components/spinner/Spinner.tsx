'use client';
import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

export const Spinner: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`spinner-container ${theme}`}>
      <div className="spinner"></div>
      <h4>Loading...</h4>
    </div>
  );
};
