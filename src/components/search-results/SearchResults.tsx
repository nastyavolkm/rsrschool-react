import React from 'react';
import './SearchResults.css';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import SearchResultsItem from './search-results-item/SearchResultsItem';
import Spinner from '../spinner/Spinner';
import { Outlet } from 'react-router';

interface SearchResultsProps {
  results: GithubRepoItemDto[];
  isLoading: boolean;
  error: string;
  isCustomSearch: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  isLoading,
  error,
  isCustomSearch,
}) => {
  const renderResults = () => {
    if (isLoading) return <Spinner />;
    if (error) return <p style={{ color: '#ff6464' }}>Error: {error}</p>;

    if (results?.length > 0) {
      return results.map((result, index) => (
        <SearchResultsItem key={index} item={result} />
      ));
    }
    return (
      <div className="search-results-no-results">
        <p>Oops! Seems like we found nothing.</p>
        <span>Try to change your request.</span>
      </div>
    );
  };

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
        <div className="search-results-items">{renderResults()}</div>
      </div>
      <Outlet />
    </div>
  );
};

export default SearchResults;
