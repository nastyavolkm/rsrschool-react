import { CountryModel } from '../models/country-model.tsx';
import { CountryItem } from './CountryItem.tsx';
import './CountriesList.css';
import React from 'react';

type CountriesListProps = {
  countries: CountryModel[];
};
export const CountriesList = React.memo(({ countries }: CountriesListProps) => {
  return (
    <div>
      {countries?.length < 1 && <p>No countries found</p>}
      {countries?.length > 0 && (
        <ul className="countries-list">
          {countries.map((country) => (
            <CountryItem key={country.name.common} country={country} />
          ))}
        </ul>
      )}
    </div>
  );
});

CountriesList.displayName = 'CountriesList';
