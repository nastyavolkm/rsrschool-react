import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { SEARCH_TERM } from '../constants/constants';

export const useSearchTerm: () => [
  string,
  Dispatch<SetStateAction<string>>,
] = () => {
  const [term, setTerm] = useState(() => {
    return localStorage.getItem(SEARCH_TERM) || '';
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM, term);
  }, [term]);

  return [term, setTerm];
};
