import React, { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
  const router = useRouter();
  const { theme } = useContext(ThemeContext);

  const isLoading: boolean = useSelector(selectIsLoading);
  const [term, setTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  useEffect(() => {
    setTerm((router.query.q as string) || '');
  }, [router.query.q]);

  const handleSearch = () => {
    const trimmedTerm = term.trim();
    localStorage.setItem(SEARCH_TERM, trimmedTerm);
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: '1', q: trimmedTerm || 'react' },
    });
  };

  return [theme, term, isLoading, handleInputChange, handleSearch];
};
