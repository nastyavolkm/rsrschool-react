import React from 'react';
import './SearchResults.css';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model.ts';
import Spinner from '../spinner/Spinner.tsx';
import SearchResultsItem from './search-results-item/SearchResultsItem.tsx';

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
  if (isLoading) return <Spinner />;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  const renderResults = () => {
    if (results?.length > 0) {
      return results.map((result, index) => (
        <div key={index}>
          <SearchResultsItem item={result} />
        </div>
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
    <div className="search-results">
      {isCustomSearch && (
        <div className="search-results-hint">
          <h3>Here you can see all possible react.js related repositories</h3>
          <span>
            If you want to see some specific please type into a search field and
            click &quot;Search&quot; button
          </span>
        </div>
      )}
      <div className="search-results-items">{renderResults()}</div>
    </div>
  );
};

export default SearchResults;
