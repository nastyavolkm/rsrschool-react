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
import { wrapper } from '../store/wrapper';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeProvider';

export default function MyApp({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Head>
            <link rel="icon" href="/favicon.png" />
            <title>GitHub repositories</title>
          </Head>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
