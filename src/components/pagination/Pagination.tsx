import React, { useEffect, useState } from 'react';
import './Pagination.css';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPageNumber: number;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPageNumber,
}) => {
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [pageWindowStart, setPageWindowStart] = useState(0);

  useEffect(() => {
    setCurrentPage(currentPageNumber);
  }, [currentPageNumber]);

  const pageNumbers = Array.from(
    { length: Math.ceil(totalItems / itemsPerPage) },
    (_, i) => i + 1
  );
  const maxPagesVisible = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    paginate(pageNumber);

    if (pageNumber >= pageWindowStart + maxPagesVisible) {
      setPageWindowStart(
        pageWindowStart + (pageNumber - (pageWindowStart + maxPagesVisible - 1))
      );
    } else if (pageNumber <= pageWindowStart) {
      setPageWindowStart(pageWindowStart - (pageWindowStart - pageNumber + 1));
    }
  };

  const nextWindow = () => {
    if (pageWindowStart + maxPagesVisible < pageNumbers.length) {
      setPageWindowStart(pageWindowStart + maxPagesVisible);
    }
  };

  const prevWindow = () => {
    if (pageWindowStart > 0) {
      setPageWindowStart(pageWindowStart - maxPagesVisible);
    }
  };

  return (
    <nav>
      <ul className="pagination">
        {maxPagesVisible < pageNumbers.length && (
          <li className="page-item">
            <button
              onClick={() => prevWindow()}
              disabled={pageWindowStart === 0}
              className="page-link"
            >
              Prev
            </button>
          </li>
        )}
        {pageNumbers
          .slice(pageWindowStart, pageWindowStart + maxPagesVisible)
          .map((number) => (
            <li key={number} className="page-item">
              <button
                onClick={() => handlePageChange(number)}
                className={
                  number === currentPage ? 'page-link active' : 'page-link'
                }
              >
                {number}
              </button>
            </li>
          ))}
        {maxPagesVisible < pageNumbers.length && (
          <li className="page-item">
            <button
              disabled={pageWindowStart + maxPagesVisible >= pageNumbers.length}
              onClick={() => nextWindow()}
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

export default Pagination;
