import React, { useEffect, useState } from 'react';
import './Pagination.css';
import { useLocation, useNavigate } from 'react-router-dom';

type PaginationProps = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  paginate,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const pageFromParams = new URLSearchParams(location.search).get('page');
  const [currentPage, setCurrentPage] = useState(pageFromParams || '1');
  const [pageWindowStart, setPageWindowStart] = useState(0);

  useEffect(() => {
    if (!pageFromParams) {
      navigate(`?page=1`);
    }
    setCurrentPage(pageFromParams || '1');
  }, [currentPage, pageFromParams, navigate]);

  const pageNumbers = Array.from(
    { length: Math.ceil(totalItems / itemsPerPage) },
    (_, i) => (i + 1).toString()
  );
  const maxPagesVisible = 5;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber.toString());
    paginate(pageNumber);
    navigate(`?page=${pageNumber}`);

    if (pageNumber > pageWindowStart + maxPagesVisible - 1) {
      setPageWindowStart(pageNumber - maxPagesVisible + 1);
    } else if (pageNumber < pageWindowStart + 1) {
      setPageWindowStart(Math.max(0, pageNumber - 1));
    }
  };

  const nextWindow = () => {
    const maxStartIndex = pageNumbers.length - maxPagesVisible;
    if (pageWindowStart + maxPagesVisible < pageNumbers.length) {
      setPageWindowStart(
        Math.min(pageWindowStart + maxPagesVisible, maxStartIndex)
      );
    }
  };

  const prevWindow = () => {
    if (pageWindowStart > 0) {
      setPageWindowStart(Math.max(0, pageWindowStart - maxPagesVisible));
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
                onClick={() => handlePageChange(Number(number))}
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
