import React, { useCallback, useContext, useEffect, useState } from 'react';
import './Pagination.css';
import { ITEMS_PER_PAGE, MAX_PAGES_VISIBLE } from '../../constants/constants';
import { ThemeContext } from '../../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectTotalCount,
  setPage,
} from '../../store/features/search/search-slice';
import { useRouter } from 'next/router';

export const Pagination: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const pageFromParams = router.query.page;
  const [currentPage, setCurrentPage] = useState(pageFromParams || '1');
  const [pageWindowStart, setPageWindowStart] = useState(0);
  const totalItems = useSelector(selectTotalCount);

  const updateRouter = useCallback(
    (newPage: string) => {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page: newPage },
      });
    },
    [router]
  );
  useEffect(() => {
    if (!pageFromParams) {
      updateRouter('1');
    }
    setCurrentPage(pageFromParams || '1');
  }, [pageFromParams, updateRouter]);

  const pageNumbers = Array.from(
    { length: Math.ceil(totalItems / ITEMS_PER_PAGE) },
    (_, i) => (i + 1).toString()
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
    dispatch(setPage(pageNumber.toString()));
    updateRouter(pageNumber.toString());

    if (pageNumber > pageWindowStart + MAX_PAGES_VISIBLE - 1) {
      setPageWindowStart(pageNumber - MAX_PAGES_VISIBLE + 1);
    } else if (pageNumber < pageWindowStart + 1) {
      setPageWindowStart(Math.max(0, pageNumber - 1));
    }
  };

  const nextWindow = () => {
    const maxStartIndex = pageNumbers.length - MAX_PAGES_VISIBLE;
    if (pageWindowStart + MAX_PAGES_VISIBLE < pageNumbers.length) {
      setPageWindowStart(
        Math.min(pageWindowStart + MAX_PAGES_VISIBLE, maxStartIndex)
      );
    }
  };

  const prevWindow = () => {
    if (pageWindowStart > 0) {
      setPageWindowStart(Math.max(0, pageWindowStart - MAX_PAGES_VISIBLE));
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {MAX_PAGES_VISIBLE < pageNumbers.length && (
          <li className="page-item">
            <button
              onClick={prevWindow}
              disabled={pageWindowStart === 0}
              className={`page-link ${theme}`}
            >
              Prev
            </button>
          </li>
        )}
        {pageNumbers
          .slice(pageWindowStart, pageWindowStart + MAX_PAGES_VISIBLE)
          .map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => handlePageChange(Number(number))}
                className={`page-link ${theme} ${number === currentPage ? 'active' : ''}`}
              >
                {number}
              </button>
            </li>
          ))}
        {MAX_PAGES_VISIBLE < pageNumbers.length && (
          <li className="page-item">
            <button
              disabled={
                pageWindowStart + MAX_PAGES_VISIBLE >= pageNumbers.length
              }
              onClick={nextWindow}
              className={`page-link ${theme}`}
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
