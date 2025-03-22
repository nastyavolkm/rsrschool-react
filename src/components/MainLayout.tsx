import './MainLayout.css';
import { useGetCountries } from './hooks/useGetCountries.tsx';
import { CountriesList } from './CountriesList.tsx';
import { Tools } from './Tools.tsx';
import { useToolsResults } from './hooks/useToolsResults.tsx';

export const MainLayout = () => {
  const { countries, isLoading, error, regions } = useGetCountries();
  const {
    filteredCountries,
    searchCountries,
    filterCountries,
    sortCountries,
    resetFilters,
  } = useToolsResults(countries);

  return (
    <div className="main-layout">
      <h2>Countries</h2>
      {!isLoading && !error && countries?.length > 0 && (
        <Tools
          regions={regions}
          handleFilterByRegion={filterCountries}
          handleSearch={searchCountries}
          handleSort={sortCountries}
          resetFilters={resetFilters}
        />
      )}
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && countries && (
        <CountriesList countries={filteredCountries} />
      )}
    </div>
  );
};
