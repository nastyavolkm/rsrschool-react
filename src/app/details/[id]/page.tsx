import { Main } from '../../../components/main/Main';
import React, { Suspense } from 'react';
import Loading from '../../loading';
import { SearchResults } from '../../../components/search-results/SearchResults';
import { SearchResultsItemDetails } from '../../../components/search-results/search-results-item-details/SearchResultsItemDetails';
import { DetailsCloseButton } from '../../../components/search-results/details-close-button/details-close-button';

export default async function DetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const { id } = await params;
  const currentPage = (await searchParams)?.page || '1';
  const searchTerm = (await searchParams)?.q || 'react';
  return (
    <Main
      results={
        <SearchResults
          currentPage={currentPage}
          searchTerm={searchTerm}
        ></SearchResults>
      }
    >
      <Suspense key={id + searchTerm + currentPage} fallback={<Loading />}>
        <div>
          <DetailsCloseButton />
          <SearchResultsItemDetails id={id} />
        </div>
      </Suspense>
    </Main>
  );
}
