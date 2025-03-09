import { Main } from '../components/main/Main';
import Loading from './loading';
import React, { Suspense } from 'react';
import { SearchResults } from '../components/search-results/SearchResults';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; q?: string }>;
}) {
  const currentPage = (await searchParams)?.page || '1';
  const searchTerm = (await searchParams)?.q || 'react';

  return (
    <Main
      results={
        <Suspense key={currentPage + searchTerm} fallback={<Loading />}>
          <SearchResults
            searchTerm={(await searchParams)?.q as string}
            currentPage={currentPage}
          ></SearchResults>
        </Suspense>
      }
    ></Main>
  );
}
