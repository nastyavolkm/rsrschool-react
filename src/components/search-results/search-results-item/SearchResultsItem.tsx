import React from 'react';
import './SearchResultsItem.css';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model.ts';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

const SearchResultsItem: React.FC<SearchResultsItemProps> = ({ item }) => {
  return (
    <div className="search-item">
      <h3 className="search-item-name">{item.name}</h3>
      <p className="search-item-forks">Forks: {item.forks}</p>
    </div>
  );
};

export default SearchResultsItem;
