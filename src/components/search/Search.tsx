import React, { useState, useEffect, useContext } from 'react';
import './Search.css';
import { ThemeContext } from '../../context/ThemeContext';

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
  isLoading: boolean;
};

export const Search: React.FC<SearchProps> = ({
  onSearch,
  initialSearchTerm = '',
  isLoading,
}) => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  useEffect(() => {
    setSearchTerm(initialSearchTerm);
  }, [initialSearchTerm]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
  };

  return (
    <div className={theme === 'light' ? 'search' : 'search dark'}>
      <input
        disabled={isLoading}
        className="search-input"
        value={searchTerm}
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
