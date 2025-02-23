import './App.css';
import { Route, Routes } from 'react-router';
import { Main } from './components/main/Main';
import { NotFound } from './components/not-found/NotFound';
import { SearchResultsItemDetails } from './components/search-results/search-results-item-details/SearchResultsItemDetails';

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
