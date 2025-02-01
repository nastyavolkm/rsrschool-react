import React from 'react';
import './SearchResults.css';
import SearchResultsItem from './SearchResultsItem.tsx';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model.ts';
import Spinner from './Spinner.tsx';

interface SearchResultsProps {
  results: GithubRepoItemDto[];
  isLoading: boolean;
  error: string;
  isCustomSearch: boolean;
}

class SearchResults extends React.Component<SearchResultsProps, {}> {
  render() {
    const { isLoading, error, results, isCustomSearch } = this.props;
    if (isLoading) return <Spinner />;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    return (
      <div className="search-results">
        {isCustomSearch && (
          <div className="search-results-hint">
            <h3>Here you can see all possible react.js related repositories</h3>
            <span>
              If you want to see some specific please type into a search field
              and click &quot;Search&quot; button
            </span>
          </div>
        )}
        <div className="search-results-items">
          {!results?.length && (
            <div className="search-results-no-results">
              <p>Oops! Seems like we found nothing.</p>
              <span>Try to change you request.</span>
            </div>
          )}
          {results.map((result, index) => (
            <div key={index}>
              <SearchResultsItem item={result} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchResults;
