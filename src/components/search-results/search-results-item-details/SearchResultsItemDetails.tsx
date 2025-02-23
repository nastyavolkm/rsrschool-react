import React, { useContext, useEffect } from 'react';
import './SearchResultsItemDetails.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Spinner } from '../../spinner/Spinner';
import { ThemeContext } from '../../../context/ThemeContext';
import { useGetGitHubRepoDetailsByIdQuery } from '../../../api/services/GitHubSearchService';
import { useParams } from 'react-router';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { setDetailedItem } from '../../../store/features/search/search-slice';
import { useDispatch } from 'react-redux';

export const SearchResultsItemDetails: React.FC = () => {
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { data, error, isFetching } = useGetGitHubRepoDetailsByIdQuery(
    id || ''
  );
  const item = { ...data } as GithubRepoItemDto | { message: string };

  useEffect(() => {
    dispatch(setDetailedItem(data as GithubRepoItemDto | { message: string }));
  }, [data, dispatch]);

  return (
    <div className={`search-item-details ${theme}`}>
      {!isFetching && (
        <button
          onClick={() => navigate(`/${location.search}`)}
          className="search-item-details-close"
        >
          Close
        </button>
      )}
      {isFetching && <Spinner />}
      {(error || (item as { message: string })?.message) && (
        <p style={{ color: '#ff6464' }}>
          {`Error: ${error instanceof Error ? error.message : (item as { message: string })?.message || 'Something went wrong'}`}
        </p>
      )}
      {!error && !isFetching && !item && <p>Item not found</p>}
      {!error && !isFetching && item && (
        <div className="search-item-details-card">
          <h3 className="search-item-details-name search-item-card">
            {(item as GithubRepoItemDto).name}
          </h3>
          <h3 className="search-item-details-description search-item-card">
            {(item as GithubRepoItemDto).description}
          </h3>
          <p className="search-item-details-data search-item-card">
            Owner: {(item as GithubRepoItemDto).owner?.login}
          </p>
          <p className="search-item-details-forks search-item-card">
            Forks: {(item as GithubRepoItemDto).forks}
          </p>
          <p className="search-item-details-visibility search-item-card">
            Visibility: {(item as GithubRepoItemDto).visibility}
          </p>
          <a
            className="search-item-details-link search-item-card"
            href={(item as GithubRepoItemDto).svn_url}
            target="_blanc"
          >
            Link to repo
          </a>
        </div>
      )}
    </div>
  );
};
