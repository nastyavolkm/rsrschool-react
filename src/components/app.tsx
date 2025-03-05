import { AppProps } from 'next/app';
import { NextRouter } from 'next/router';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SEARCH_TERM } from '../constants/constants';
import { setSearchTerm } from '../store/features/search/search-slice';
import Head from 'next/head';
import { Main } from './main/Main';
import { ErrorBoundary } from './error-boundary/ErrorBoundary';
import { store } from '../store/store';
import { ThemeProvider } from '../context/ThemeProvider';

type AppWrapperProps = AppProps & {
  router?: NextRouter;
};

export const AppWrapper = ({ Component, pageProps }: AppWrapperProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSearchTerm = localStorage.getItem(SEARCH_TERM) || 'react';
      dispatch(setSearchTerm(storedSearchTerm));
    }
  }, [dispatch]);

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Main>
        <Component {...pageProps} />
      </Main>
    </>
  );
};

export function MyApp({
  Component,
  pageProps,
  router,
}: AppProps & { router?: NextRouter }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <AppWrapper
            Component={Component}
            pageProps={pageProps}
            router={router}
          />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
