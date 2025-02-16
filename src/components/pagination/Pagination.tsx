import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ITEMS_PER_PAGE, MAX_PAGES_VISIBLE } from '../../constants/constants';

type PaginationProps = {
  totalItems: number;
  paginate: (pageNumber: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  paginate,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageFromParams = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageFromParams || '1');
  const [pageWindowStart, setPageWindowStart] = useState(0);

  useEffect(() => {
    if (!pageFromParams) {
      navigate(`?page=1`);
    }
    setCurrentPage(pageFromParams || '1');
  }, [currentPage, pageFromParams, navigate]);

  const pageNumbers = Array.from(
    { length: Math.ceil(totalItems / ITEMS_PER_PAGE) },
    (_, i) => (i + 1).toString()
  );

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
    paginate(pageNumber);
    navigate(`?page=${pageNumber}`);

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
              className="page-link"
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
                className={
                  number === currentPage ? 'page-link active' : 'page-link'
                }
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
              className="page-link"
            >
              Next
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
