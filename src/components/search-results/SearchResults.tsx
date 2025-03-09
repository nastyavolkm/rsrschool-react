import React from 'react';
import { SearchResultsItem } from './search-results-item/SearchResultsItem';
import { fetchGitHubRepos } from '../../api/services/GitHubSearchService';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model';
import { Pagination } from '../pagination/Pagination';

export const SearchResults = async ({
  currentPage,
  searchTerm,
}: {
  currentPage: string;
  searchTerm: string;
}) => {
  let data: GithubRepoResponseDto | { message: string } | null = null;
  let error: Error | null = null;
  try {
    data = await fetchGitHubRepos(searchTerm || 'react', currentPage);
    if ((data as unknown as { message: string })?.message) {
      error = new Error((data as unknown as { message: string }).message);
      data = null;
    }
  } catch (err) {
    error =
      err instanceof Error ? err : new Error('Failed to fetch search results');
  }
  return (
    <div>
      <div className="search-results-wrapper">
        <div className="search-results">
          {!searchTerm && data?.items?.length && data?.items?.length > 0 && (
            <div className="search-results-hint">
              <h3>
                Here you can see all possible react.js related repositories.
              </h3>
              <span>
                To see other type into a search field and click
                &quot;Search&quot; button
              </span>
            </div>
          )}
          <div className="search-results-items">
            {(error as Error) && (
              <p style={{ color: '#ff6464' }}>
                {`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`}
              </p>
            )}
            {data?.items?.length && data?.items?.length > 0
              ? data?.items.map((result, index) => (
                  <SearchResultsItem key={index} item={result} />
                ))
              : data?.items?.length === 0 && (
                  <div className="search-results-no-results">
                    <p>Oops! Seems like we found nothing.</p>
                    <span>Try to change your request.</span>
                  </div>
                )}
          </div>
        </div>
      </div>
      {data?.total_count && data?.total_count > 0 && (
        <Pagination totalItems={data.total_count} />
      )}
    </div>
  );
};
