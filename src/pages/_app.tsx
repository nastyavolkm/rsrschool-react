import '../index.css';
import { wrapper } from '../store/wrapper';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Head from 'next/head';
import { Main } from '../components/main/Main';
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
          </Head>
          <Main>
            <Component {...pageProps} />
          </Main>
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
