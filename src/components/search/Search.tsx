import React from 'react';
import { useSearchTerm } from '../../hooks/useSearchTerm';

export const Search = () => {
  const [theme, term, handleInputChange, handleSearch] = useSearchTerm();
  return (
    <div className={theme === 'light' ? 'search' : 'search dark'}>
      <input
        className="search-input"
        value={term}
        onInput={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};
