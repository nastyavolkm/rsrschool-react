import React from 'react';
import './SearchResultsItem.css';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model.ts';
import { Link, useLocation } from 'react-router-dom';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({ item }) => {
  const location = useLocation();
  return (
    <Link
      className="search-item-card"
      to={`details/${item.id}${location.search}`}
    >
      <div className="search-item-card search-item">
        <h3 className="search-item-card search-item-name">{item.name}</h3>
        <p className="search-item-card search-item-forks">
          Forks: {item.forks}
        </p>
      </div>
    </Link>
  );
};

export default SearchResultsItem;
