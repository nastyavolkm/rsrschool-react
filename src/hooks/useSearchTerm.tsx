import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setPage,
  setSearchTerm,
} from '../store/features/search/search-slice';
import { ThemeContext } from '../context/ThemeContext';
import { selectIsLoading } from '../store/features/loading/loading-slice';
import { SEARCH_TERM } from '../constants/constants';
import { useRouter } from 'next/router';

export const useSearchTerm: () => [
  'light' | 'dark',
  string,
  boolean,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
] = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const isLoading: boolean = useSelector(selectIsLoading);
  const searchTermFromStore: string = useSelector(selectSearchTerm);
  const [term, setTerm] = useState(searchTermFromStore);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  useEffect(() => {
    setTerm(searchTermFromStore);
  }, [searchTermFromStore]);

  const handleSearch = () => {
    const trimmedTerm = term.trim();
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: '1' },
    });
    localStorage.setItem(SEARCH_TERM, trimmedTerm);
    dispatch(setSearchTerm(trimmedTerm || 'react'));
    dispatch(setPage('1'));
  };

  return [theme, term, isLoading, handleInputChange, handleSearch];
};
