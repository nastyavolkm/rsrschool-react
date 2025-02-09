import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function useSearchTerm(): [string, Dispatch<SetStateAction<string>>] {
  const SEARCH_TERM = 'searchTerm';
  const [term, setTerm] = useState(() => {
    return localStorage.getItem(SEARCH_TERM) || '';
  });

  useEffect(() => {
    localStorage.setItem(SEARCH_TERM, term);
  }, [term]);

  return [term, setTerm];
}

export default useSearchTerm;
