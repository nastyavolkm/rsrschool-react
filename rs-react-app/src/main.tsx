import React from 'react';
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import ErrorBoundary from "./components/ErrorBoundary.tsx";

ReactDOM.render(
    <React.StrictMode>
        <ErrorBoundary>
            <App/>
        </ErrorBoundary>
    </React.StrictMode>,
    document.getElementById('root')
);
