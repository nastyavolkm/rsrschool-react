import React from 'react';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model.ts';
import './SearchResultsItem.css';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

class SearchResultsItem extends React.Component<SearchResultsItemProps, void> {
  render() {
    const { item } = this.props;
    return (
      <div className="search-item">
        <h3>{item.name}</h3>
        <p className="search-item-description">{item.description}</p>
        <p className="search-item-forks">Forks: {item.forks}</p>
      </div>
    );
  }
}

export default SearchResultsItem;
