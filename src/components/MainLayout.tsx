import './MainLayout.css';
import { useGetCountries } from './hooks/useGetCountries.tsx';
import { CountriesList } from './CountriesList.tsx';

export const MainLayout = () => {
  const { countries, isLoading, error } = useGetCountries();
  return (
    <div>
      <h1>Countries</h1>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!isLoading && countries && <CountriesList countries={countries} />}
    </div>
  );
};
