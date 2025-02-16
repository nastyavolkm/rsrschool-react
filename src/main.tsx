import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from './components/error-boundary/ErrorBoundary';

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
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
