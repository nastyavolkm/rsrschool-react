import { Metadata } from 'next';
import '../index.css';
import '../components/checked-items-data/CheckedItemsData.css';
import '../components/main/Main.css';
import '../components/search/Search.css';
import '../components/search-results/SearchResults.css';
import '../components/search-results/search-results-item/SearchResultsItem.css';
import '../components/search-results/search-results-item-details/SearchResultsItemDetails.css';
import '../components/pagination/Pagination.css';
import '../components/error-button/ErrorButton.css';
import '../components/theme-switcher/ThemeSwitcher.css';
import '../components/spinner/Spinner.css';
import '../components/not-found/NotFound.css';
import '../components/error-boundary/ErrorBoundary.css';
import { ReactNode } from 'react';
import Providers from '../components/providers/Providers';

export const metadata: Metadata = {
  title: 'GitHub Repositories',
  description: 'A search app built with Next.js and Redux',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
