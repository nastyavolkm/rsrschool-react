import React, { useContext } from 'react';
import { Search } from '../search/Search';
import { SearchResults } from '../search-results/SearchResults';
import { ErrorButton } from '../error-button/ErrorButton';
import { useSelector } from 'react-redux';
import { CheckedItemsData } from '../checked-items-data/CheckedItemsData';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { ThemeContext } from '../../context/ThemeContext';
import { selectCheckedItems } from '../../store/features/checked-items/checked-items-slice';
import { selectIsLoading } from '../../store/features/loading/loading-slice';
import { useRouterEventChange } from '../../hooks/useRouterEventChange';

type MainProps = {
  id: string | null;
};
export const Main: React.FC<MainProps> = ({ id }: MainProps) => {
  const { theme } = useContext(ThemeContext);
  useRouterEventChange();

  const checkedItems = useSelector(selectCheckedItems);

  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={`main-wrapper ${theme}`}>
      <header className="header">
        <Search />
        <ThemeSwitcher />
      </header>
      <div className="main-results-wrapper">
        <SearchResults id={id}></SearchResults>
      </div>
      <footer className="footer">
        {!isLoading && <ErrorButton />}
        {checkedItems?.length > 0 && <CheckedItemsData />}
      </footer>
    </div>
  );
};
