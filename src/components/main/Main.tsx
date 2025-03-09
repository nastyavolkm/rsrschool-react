'use client';
import React, { ReactNode, useContext } from 'react';
import { Search } from '../search/Search';
import { ErrorButton } from '../error-button/ErrorButton';
import { useSelector } from 'react-redux';
import { CheckedItemsData } from '../checked-items-data/CheckedItemsData';
import { ThemeSwitcher } from '../theme-switcher/ThemeSwitcher';
import { selectCheckedItems } from '../../store/features/checked-items/checked-items-slice';
import { ThemeContext } from '../../context/ThemeContext';

type MainProps = {
  results: ReactNode;
  children?: ReactNode;
};
export const Main: React.FC<MainProps> = ({ results, children }: MainProps) => {
  const { theme } = useContext(ThemeContext);

  const checkedItems = useSelector(selectCheckedItems);

  return (
    <div className={`main-wrapper ${theme}`}>
      <header className="header">
        <Search />
        <ThemeSwitcher />
      </header>
      <div className="main-data-wrapper">
        <div className="main-results-wrapper">{results}</div>
        {children}
      </div>
      <footer className="footer">
        {<ErrorButton />}
        {checkedItems?.length > 0 && <CheckedItemsData />}
      </footer>
    </div>
  );
};
