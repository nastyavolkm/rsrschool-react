import React, { useState, useEffect, useRef } from 'react';
import './Main.css';
import Search from '../search/Search';
import SearchResults from '../search-results/SearchResults';
import ErrorButton from '../error-button/ErrorButton';
import Pagination from '../pagination/Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import useSearchTerm from '../../hooks/useSearchTerm';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model';

const ITEMS_PER_PAGE = 12;

const Main: React.FC = () => {
  const childRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;
      if (
        !eventTarget.className.includes('search-item-card') &&
        childRef?.current?.contains(eventTarget)
      ) {
        navigate(`/${location.search}`);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, location.search]);

  const handleSearchTermChange = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    setCurrentPage('1');
    navigate(`?page=1`);
  };

  const updateCurrentPage = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
  };

  return (
    <div className="main-wrapper">
      <Search
        isLoading={isLoading}
        onSearch={handleSearchTermChange}
        initialSearchTerm={searchTerm}
      />
      <div className="main-results-wrapper" ref={childRef}>
        <SearchResults
          isCustomSearch={!searchTerm}
          results={searchResults || []}
          isLoading={isLoading}
          error={error || ''}
        />
      </div>
      <footer className="footer">
        {searchResults?.length > 0 && (
          <Pagination
            paginate={updateCurrentPage}
            totalItems={totalCount}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        )}
        {!isLoading && <ErrorButton />}
      </footer>
    </div>
  );
};

export default Main;
