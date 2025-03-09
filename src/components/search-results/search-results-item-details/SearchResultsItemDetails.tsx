import React from 'react';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { fetchGitHubRepoDetails } from '../../../api/services/GitHubSearchService';

type SearchResultsItemDetailsProps = {
  id: string;
};
export const SearchResultsItemDetails = async ({
  id,
}: SearchResultsItemDetailsProps) => {
  let item: GithubRepoItemDto | { message: string } | null = null;
  let error: Error | null = null;
  try {
    item = await fetchGitHubRepoDetails(id);
    if ((item as unknown as { message: string })?.message) {
      error = new Error((item as unknown as { message: string }).message);
      item = null;
    }
  } catch (err) {
    if (err instanceof Error) {
      error = err;
    } else {
      error = new Error('Failed to fetch data');
    }
  }

  return (
    <div className={`search-item-details`}>
      {error && (
        <p style={{ color: '#ff6464' }}>
          {`Error: ${error.message || 'Something went wrong'}`}
        </p>
      )}
      {!error && !item && <p>Item not found</p>}
      {item && (
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
            target="_blank"
            rel="noreferrer"
          >
            Link to repo
          </a>
        </div>
      )}
    </div>
  );
};
