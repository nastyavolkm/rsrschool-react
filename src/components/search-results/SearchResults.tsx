import React from 'react';
import './SearchResults.css';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { Outlet } from 'react-router';
import { Spinner } from '../spinner/Spinner';
import { SearchResultsItem } from './search-results-item/SearchResultsItem';

interface SearchResultsProps {
  results: GithubRepoItemDto[];
  isLoading: boolean;
  error: string;
  isCustomSearch: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  error,
  isCustomSearch,
}) => {
  return (
    <div className="search-results-wrapper">
      <div className="search-results">
        {isCustomSearch && (
          <div className="search-results-hint">
            <h3>Here you can see all possible react.js related repositories</h3>
            <span>
              To see other type into a search field and click &quot;Search&quot;
              button
            </span>
          </div>
        )}
        <div className="search-results-items">
          {isLoading && <Spinner />}
          {error && <p style={{ color: '#ff6464' }}>Error: {error}</p>}
          {results?.length > 0 ? (
            results.map((result, index) => (
              <SearchResultsItem key={index} item={result} />
            ))
          ) : (
            <div className="search-results-no-results">
              <p>Oops! Seems like we found nothing.</p>
              <span>Try to change your request.</span>
            </div>
          )}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
