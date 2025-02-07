import React from 'react';
import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
