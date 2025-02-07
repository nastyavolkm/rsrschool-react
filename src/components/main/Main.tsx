import React, { useState, useEffect } from 'react';
import './Main.css';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model.ts';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model.ts';
import Search from '../search/Search.tsx';
import SearchResults from '../search-results/SearchResults.tsx';
import ErrorButton from '../error-button/ErrorButton.tsx';

const Main: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') || ''
  );
  const [searchResults, setSearchResults] = useState<GithubRepoItemDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    searchItems(searchTerm);
  }, [searchTerm]);

  const searchItems = async (searchTerm: string) => {
    setIsLoading(true);
    setError(null);
    setSearchTerm(searchTerm);

    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${searchTerm || 'react'}&page=0&per_page=10`
      );
      const data: GithubRepoResponseDto = await response.json();
      setSearchResults(data.items);
      setIsLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="main-wrapper">
      <Search
        isLoading={isLoading}
        onSearch={setSearchTerm}
        initialSearchTerm={searchTerm}
      />
      <SearchResults
        isCustomSearch={!searchTerm}
        results={searchResults || []}
        isLoading={isLoading}
        error={error || ''}
      />
      {!isLoading && <ErrorButton />}
    </div>
  );
};

export default Main;
