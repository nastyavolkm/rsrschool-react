import './App.css';
import React from 'react';
import Main from './components/main/Main.tsx';
import { Route, Routes } from 'react-router';
import SearchResultsItemDetails from './components/search-results/search-results-item-details/SearchResultsItemDetails.tsx';
import NotFound from './components/not-found/NotFound.tsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route path="details/:id" element={<SearchResultsItemDetails />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
