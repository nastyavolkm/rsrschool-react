import { useEffect, useState } from 'react';
import { CountryModel } from '../../models/country-model.tsx';

export const useToolsResults = (
  countries: CountryModel[]
): {
  filteredCountries: CountryModel[];
  filterCountries: (region: string) => void;
  searchCountries: (searchValue: string) => void;
  sortCountries: (type: 'name' | 'population', order: 'asc' | 'desc') => void;
  resetFilters: () => void;
} => {
  const [filteredCountries, setFilteredCountries] = useState(countries);
  const [filteredAfterFilter, setFilteredAfterFilter] = useState(countries);

  useEffect(() => {
    setFilteredCountries(countries);
    setFilteredAfterFilter(countries);
  }, [countries]);

  const filterCountries = (region: string) => {
    const filteredCountries = filteredAfterFilter.filter(
      (country) => country.region === region
    );
    setFilteredCountries(filteredCountries);
    setFilteredAfterFilter(filteredCountries);
  };

  const searchCountries = (searchValue: string) => {
    const countries = filteredAfterFilter.filter((country) =>
      country.name.common.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCountries(countries);
  };

  const sortCountries = (
    type: 'name' | 'population',
    order: 'asc' | 'desc'
  ) => {
    const countries = [...filteredCountries].sort((a, b) => {
      if (type === 'name') {
        return (
          a.name.common.localeCompare(b.name.common) *
          (order === 'asc' ? 1 : -1)
        );
      } else {
        return order === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
    });
    setFilteredCountries(countries);
    setFilteredAfterFilter(countries);
  };

  const resetFilters = () => {
    setFilteredCountries(countries);
  };

  return {
    filteredCountries,
    filterCountries,
    searchCountries,
    sortCountries,
    resetFilters,
  };
};
