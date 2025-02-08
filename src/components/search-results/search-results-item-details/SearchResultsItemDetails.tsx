import React, { useEffect, useState } from 'react';
import './SearchResultsItemDetails.css';
import { useParams } from 'react-router';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model.ts';
import Spinner from '../../spinner/Spinner.tsx';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResultsItemDetails: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const [item, setItem] = useState<GithubRepoItemDto>(null);
  const [error, setError] = useState<string>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const abortController = new AbortController();
    (async () => {
      try {
        if (id) {
          const response = await fetch(
            ` https://api.github.com/repositories/${id}`
          );
          const data = await response.json();
          setItem(data);
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    })();
    return abortController.abort();
  }, [id]);

  const renderResults = () => {
    if (isLoading) return <Spinner />;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!item) return <p>Item not found</p>;
    return (
      <div className="search-item-details-card">
        <h3 className="search-item-details-name">{item.name}</h3>
        <h3 className="search-item-details-description">{item.description}</h3>
        <p className="search-item-details-data">Owner: {item.owner?.login}</p>
        <p className="search-item-details-forks">Forks: {item.forks}</p>
        <p className="search-item-details-visibility">
          Visibility: {item.visibility}
        </p>
        <a
          className="search-item-details-link"
          href={item.svn_url}
          target="_blanc"
        >
          Link to repo
        </a>
      </div>
    );
  };

  return (
    <div className="search-item-details">
      {!isLoading && (
        <button
          onClick={() => navigate(`/${location.search}`)}
          className="search-item-details-close"
        >
          Close
        </button>
      )}
      {renderResults()}
    </div>
  );
};

export default SearchResultsItemDetails;
