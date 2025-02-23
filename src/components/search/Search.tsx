import React from 'react';
import './Search.css';
import { useSearchTerm } from '../../hooks/useSearchTerm';

export const Search: React.FC = () => {
  const [theme, term, isLoading, handleInputChange, handleSearch] =
    useSearchTerm();

  return (
    <div className={theme === 'light' ? 'search' : 'search dark'}>
      <input
        disabled={isLoading}
        className="search-input"
        value={term}
        onInput={handleInputChange}
      />
      <button
        disabled={isLoading}
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};
