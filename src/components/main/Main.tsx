import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model.ts';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model.ts';
import Search from '../search/Search.tsx';
import SearchResults from '../search-results/SearchResults.tsx';
import ErrorButton from '../error-button/ErrorButton.tsx';
import Pagination from '../pagination/Pagination.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router';
import useSearchTerm from '../../hooks/useSearchTerm.tsx';

const ITEMS_PER_PAGE = 12;

const Main: React.FC = () => {
  const childRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [searchResults, setSearchResults] = useState<GithubRepoItemDto[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParams.get('page')) || 1
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.github.com/search/repositories?q=${searchTerm || 'react'}&page=${currentPage}&per_page=${ITEMS_PER_PAGE}`
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.className.includes('search-item-card') &&
        childRef?.current &&
        childRef.current.contains(event.target)
      ) {
        navigate(`/${location.search}`);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, location.search]);

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`?page=${pageNumber}`, { replace: true });
  };

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    updateCurrentPage(1);
  };

  return (
    <div className="main">
      <div className="main-wrapper" ref={childRef}>
        <Search
          isLoading={isLoading}
          onSearch={handleSearchTermChange}
          initialSearchTerm={searchTerm}
        />
        <SearchResults
          isCustomSearch={!searchTerm}
          results={searchResults || []}
          isLoading={isLoading}
          error={error || ''}
        />
        {searchResults?.length > 0 && (
          <Pagination
            totalItems={totalCount}
            paginate={updateCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            currentPageNumber={currentPage}
          />
        )}
        {!isLoading && <ErrorButton />}
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
