import React, { useContext, useEffect } from 'react';
import { Spinner } from '../../spinner/Spinner';
import { ThemeContext } from '../../../context/ThemeContext';
import { useGetGitHubRepoDetailsByIdQuery } from '../../../api/services/GitHubSearchService';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { setDetailedItem } from '../../../store/features/search/search-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { selectIsLoading } from '../../../store/features/loading/loading-slice';

type SearchResultsItemDetailsProps = {
  id: string;
};
export const SearchResultsItemDetails: React.FC<
  SearchResultsItemDetailsProps
> = ({ id }: SearchResultsItemDetailsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { theme } = useContext(ThemeContext);
  const isLoading = useSelector(selectIsLoading);

  const { data, error } = useGetGitHubRepoDetailsByIdQuery(id, {
    skip: !id || router.isFallback,
  });
  const item = { ...data } as GithubRepoItemDto | { message: string };

  useEffect(() => {
    dispatch(setDetailedItem(data as GithubRepoItemDto | { message: string }));
  }, [data, dispatch]);

  const changeRoute = () => {
    router.push({
      pathname: '/',
      query: { page: router.query.page, q: router.query.q },
    });
  };
  return (
    <div className={`search-item-details ${theme}`}>
      {!isLoading && (
        <button
          onClick={() => changeRoute()}
          className="search-item-details-close"
        >
          Close
        </button>
      )}
      {isLoading && <Spinner />}
      {(error || (item as { message: string })?.message) && (
        <p style={{ color: '#ff6464' }}>
          {`Error: ${error instanceof Error ? error.message : (item as { message: string })?.message || 'Something went wrong'}`}
        </p>
      )}
      {!error && !isLoading && !item && <p>Item not found</p>}
      {!error && !isLoading && item && (
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
