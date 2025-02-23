import React, { useContext } from 'react';
import './SearchResultsItem.css';
import { Link, useLocation } from 'react-router-dom';
import { useParams } from 'react-router';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { useCheckedItemState } from './hooks/useCheckedItemState';
import { ThemeContext } from '../../../context/ThemeContext';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

export const SearchResultsItem: React.FC<SearchResultsItemProps> = ({
  item,
}) => {
  const { theme } = useContext(ThemeContext);
  const location = useLocation();
  const { id } = useParams();
  const checkboxId = `checkbox-${item.id}`;

  const [isChecked, handleCheckboxChange] = useCheckedItemState(item);
  return (
    <Link
      data-testid="search-results-item"
      className="search-item-card"
      to={`${item.id.toString() === id ? `/${location.search}` : `details/${item.id}${location.search}`}`}
    >
      <div
        className={`search-item-card search-item ${theme} ${Number(id) === item.id ? 'active' : ''}`}
      >
        <h3 className="search-item-card search-item-name">{item.name}</h3>
        <p className="search-item-card">Forks: {item.forks}</p>
        <div className="search-item-checkbox">
          <input
            onChange={handleCheckboxChange}
            onClick={(event) => event?.stopPropagation()}
            type="checkbox"
            id={checkboxId}
            data-testid={checkboxId}
            hidden
            className="search-item-input-checkbox"
            checked={isChecked}
          />
          <label
            onClick={(event) => event?.stopPropagation()}
            htmlFor={checkboxId}
            className="search-item-label"
          ></label>
        </div>
      </div>
    </Link>
  );
};
