import React, { ReactNode, useContext } from 'react';
import './Main.css';
import { Search } from '../search/Search';
import { SearchResults } from '../search-results/SearchResults';
import { useClickSearchItem } from '../../hooks/useClickSearchItem';
import { Pagination } from '../pagination/Pagination';
import { ErrorButton } from '../error-button/ErrorButton';
import { useSelector } from 'react-redux';
import { CheckedItemsData } from '../checked-items-data/CheckedItemsData';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';
import { selectSearchItems } from '../../store/features/search/search-slice';
import { selectCheckedItems } from '../../store/features/checked-items/checked-items-slice';
import { selectIsLoading } from '../../store/features/loading/loading-slice';
import { useRouterEventChange } from '../../hooks/useRouterEventChange';

type MainProps = {
  children: ReactNode;
};
export const Main: React.FC<MainProps> = ({ children }: MainProps) => {
  const { theme } = useContext(ThemeContext);
  const childRef = useClickSearchItem(null);
  useRouterEventChange();

  const checkedItems = useSelector(selectCheckedItems);

  const searchItems = useSelector(selectSearchItems);

  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={`main-wrapper ${theme}`}>
      <header className="header">
        <Search />
        <ThemeSwitcher />
      </header>
      <div className="main-results-wrapper" ref={childRef}>
        <SearchResults>{children}</SearchResults>
      </div>
      <footer className="footer">
        {searchItems?.length > 0 && <Pagination />}
        {!isLoading && <ErrorButton />}
        {checkedItems?.length > 0 && <CheckedItemsData />}
      </footer>
    </div>
  );
};
