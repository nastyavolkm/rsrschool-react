import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setPage,
  setSearchTerm,
} from '../store/features/search/search-slice';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import { selectIsLoading } from '../store/features/loading/loading-slice';
import { SEARCH_TERM } from '../constants/constants';

export const useSearchTerm: () => [
  'light' | 'dark',
  string,
  boolean,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
] = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const isLoading: boolean = useSelector(selectIsLoading);
  const [term, setTerm] = useState(useSelector(selectSearchTerm) as string);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = term.trim();
    navigate(`?page=1`);
    localStorage.setItem(SEARCH_TERM, trimmedTerm);
    dispatch(setSearchTerm(trimmedTerm));
    dispatch(setPage('1'));
  };

  return [theme, term, isLoading, handleInputChange, handleSearch];
};
