import React, { useContext } from 'react';
import './SearchResultsItem.css';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { useCheckedItemState } from './hooks/useCheckedItemState';
import { ThemeContext } from '../../../context/ThemeContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SearchResultsItemProps = {
  item: GithubRepoItemDto;
};

export const SearchResultsItem = ({ item }: SearchResultsItemProps) => {
  const { theme } = useContext(ThemeContext);
  const router = useRouter();
  const currentPage = router.query.page || '1';
  const id = router.query.id;
  const searchTerm = router.query.q;
  const checkboxId = `checkbox-${item.id}`;

  const getHref = () => {
    if (item.id.toString() === id) {
      return `/?page=${currentPage}${searchTerm ? `&q=${searchTerm}` : ''}`;
    }
    return `/details/${item.id}?page=${currentPage}${searchTerm ? `&q=${searchTerm}` : ''}`;
  };

  const [isChecked, handleCheckboxChange] = useCheckedItemState(item);
  return (
    <Link
      data-testid="search-results-item"
      className="search-item-card"
      href={getHref()}
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
