import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model';
import { GithubRepoResponseDto } from '../models/github-repo-response-dto.model';
import { useSearchTerm } from './useSearchTerm';
import { ITEMS_PER_PAGE } from '../constants/constants';

export const useSearchData = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [searchResults, setSearchResults] = useState<GithubRepoItemDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(
    new URLSearchParams(location.search).get('page') || '1'
  );
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm || 'react'}&page=${currentPage || 1}&per_page=${ITEMS_PER_PAGE}`
        );
        const data: GithubRepoResponseDto = await response.json();
        setSearchResults(data.items);
        setTotalCount(data.total_count);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setIsLoading(false);
      }
    })();
    return () => abortController.abort();
  }, [searchTerm, currentPage]);

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage('1');
    navigate(`?page=1`);
  };

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
  };

  return {
    searchResults,
    totalCount,
    error,
    isLoading,
    searchTerm,
    handleSearchTermChange,
    updateCurrentPage,
  };
};
