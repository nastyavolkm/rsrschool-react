'use client';

import { Provider } from 'react-redux';
import { type ReactNode } from 'react';
import { store } from '../../store/store';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import { ThemeProvider } from '../../context/ThemeProvider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default Providers;
