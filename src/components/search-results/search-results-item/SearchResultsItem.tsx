import React from 'react';
import './SearchResultsItem.css';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({ item }) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <Link
      data-testid="search-results-item"
      className="search-item-card"
      to={`${item.id.toString() === id ? `/${location.search}` : `details/${item.id}${location.search}`}`}
    >
      <div
        className={
          Number(id) === item.id
            ? 'search-item-card search-item active'
            : 'search-item-card search-item'
        }
      >
        <h3 className="search-item-card search-item-name">{item.name}</h3>
        <p className="search-item-card search-item-forks">
          Forks: {item.forks}
        </p>
      </div>
    </Link>
  );
};

export default SearchResultsItem;
