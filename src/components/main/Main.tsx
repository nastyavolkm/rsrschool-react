import React from 'react';
import './Main.css';
import { Search } from '../search/Search';
import { SearchResults } from '../search-results/SearchResults';
import { useClickSearchItem } from '../../hooks/useClickSearchItem';
import { useSearchData } from '../../hooks/useSearchData';
import { Pagination } from '../pagination/Pagination';
import { ErrorButton } from '../error-button/ErrorButton';

export const Main: React.FC = () => {
  const childRef = useClickSearchItem(null);
  const {
    searchResults,
    totalCount,
    error,
    isLoading,
    searchTerm,
    handleSearchTermChange,
    updateCurrentPage,
  } = useSearchData();

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
          <Pagination paginate={updateCurrentPage} totalItems={totalCount} />
        )}
        {!isLoading && <ErrorButton />}
      </footer>
    </div>
  );
};
