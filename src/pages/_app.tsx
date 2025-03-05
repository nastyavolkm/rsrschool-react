import '../index.css';
import { wrapper } from '../store/wrapper';
import { AppProps } from 'next/app';
import { NextRouter } from 'next/router';
import { Provider, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { SEARCH_TERM } from '../constants/constants';
import { setSearchTerm } from '../store/features/search/search-slice';
import Head from 'next/head';
import { Main } from '../components/main/Main';
import { ErrorBoundary } from '../components/error-boundary/ErrorBoundary';
import { ThemeProvider } from '../context/ThemeProvider';

type AppWrapperProps = AppProps & {
  router?: NextRouter;
};

const AppWrapper = ({ Component, pageProps }: AppWrapperProps) => {
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

export default function MyApp({
  Component,
  pageProps,
}: AppProps & { router?: NextRouter }) {
  const { store, props, router } = wrapper.useWrappedStore(pageProps);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <AppWrapper Component={Component} pageProps={props} router={router} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
