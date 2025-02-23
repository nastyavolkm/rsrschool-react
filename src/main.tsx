import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeProvider';
import { store } from './store/store';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter
        future={{
          v7_relativeSplatPath: true,
        }}
        basename="/rsrschool-react/"
      >
        <ErrorBoundary>
          <Provider store={store}>
            <ThemeProvider>
              <App />
            </ThemeProvider>
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
