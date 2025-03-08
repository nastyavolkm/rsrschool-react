import React from 'react';
import { Spinner } from '../spinner/Spinner';
import { SearchResultsItem } from './search-results-item/SearchResultsItem';
import { useSearchData } from '../../hooks/useSearchData';
import { useRouter } from 'next/router';
import { SearchResultsItemDetails } from './search-results-item-details/SearchResultsItemDetails';

export const SearchResults = ({ id }: { id: string | null }) => {
  const router = useRouter();
  const [items, error, isLoading] = useSearchData();

  return (
    <div className="search-results-wrapper">
      <div className="search-results">
        {!router.query.q && !isLoading && !error && items?.length > 0 && (
          <div className="search-results-hint">
            <h3>
              Here you can see all possible react.js related repositories.
            </h3>
            <span>
              To see other type into a search field and click &quot;Search&quot;
              button
            </span>
          </div>
        )}
        {isLoading && <Spinner />}
        <div className="search-results-items">
          {(error as Error) && (
            <p style={{ color: '#ff6464' }}>
              {`Error: ${error instanceof Error ? error.message : 'Something went wrong'}`}
            </p>
          )}
          {!error &&
            !isLoading &&
            (items?.length > 0
              ? items.map((result, index) => (
                  <SearchResultsItem key={index} item={result} />
                ))
              : items?.length === 0 && (
                  <div className="search-results-no-results">
                    <p>Oops! Seems like we found nothing.</p>
                    <span>Try to change your request.</span>
                  </div>
                ))}
        </div>
      </div>
      {id && <SearchResultsItemDetails id={id} />}
    </div>
  );
};
