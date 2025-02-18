import React, { useContext } from 'react';
import './SearchResultsItemDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../spinner/Spinner';
import { useSearchResultsItemDetails } from '../../../hooks/useSearchResultsItemDetails';
import { ThemeContext } from '../../../context/ThemeContext';

export const SearchResultsItemDetails: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [item, error, isLoading] = useSearchResultsItemDetails();

  return (
    <div className={`search-item-details ${theme}`}>
      {!isLoading && (
        <button
          onClick={() => navigate(`/${location.search}`)}
          className="search-item-details-close"
        >
          Close
        </button>
      )}
      {isLoading && <Spinner />}
      {error && <p style={{ color: '#ff6464' }}>Error: {error}</p>}
      {!error && !isLoading && !item && <p>Item not found</p>}
      {!error && !isLoading && item && (
        <div className="search-item-details-card">
          <h3 className="search-item-details-name search-item-card">
            {item.name}
          </h3>
          <h3 className="search-item-details-description search-item-card">
            {item.description}
          </h3>
          <p className="search-item-details-data search-item-card">
            Owner: {item.owner?.login}
          </p>
          <p className="search-item-details-forks search-item-card">
            Forks: {item.forks}
          </p>
          <p className="search-item-details-visibility search-item-card">
            Visibility: {item.visibility}
          </p>
          <a
            className="search-item-details-link search-item-card"
            href={item.svn_url}
            target="_blanc"
          >
            Link to repo
          </a>
        </div>
      )}
    </div>
  );
};
