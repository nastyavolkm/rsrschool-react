import React from 'react';
import './index.css';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from './components/error-boundary/ErrorBoundary.tsx';
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter basename="/rsrschool-react/">
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error('Failed to find the root element');
}
