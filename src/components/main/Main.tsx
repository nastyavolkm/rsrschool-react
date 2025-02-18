import React, { useContext } from 'react';
import './Main.css';
import { Search } from '../search/Search';
import { SearchResults } from '../search-results/SearchResults';
import { useClickSearchItem } from '../../hooks/useClickSearchItem';
import { useSearchData } from '../../hooks/useSearchData';
import { Pagination } from '../pagination/Pagination';
import { ErrorButton } from '../error-button/ErrorButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { CheckedItemsData } from '../checked-items-data/CheckedItemsData';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';

export const Main: React.FC = () => {
  const { theme } = useContext(ThemeContext);
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

  const checkedItems = useSelector(
    (state: RootState) => state.checkedItems.items
  );

  return (
    <div className={`main-wrapper ${theme}`}>
      <header className="header">
        <Search
          isLoading={isLoading}
          onSearch={handleSearchTermChange}
          initialSearchTerm={searchTerm}
        />
        <ThemeSwitcher />
      </header>
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
        {checkedItems?.length > 0 && <CheckedItemsData />}
      </footer>
    </div>
  );
};
