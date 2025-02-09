import React, { useState, useEffect } from 'react';
import './Search.css';

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  initialSearchTerm?: string;
  isLoading: boolean;
};

const Search: React.FC<SearchProps> = ({
  onSearch,
  initialSearchTerm = '',
  isLoading,
}) => {
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
    <div className="search">
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

export default Search;
