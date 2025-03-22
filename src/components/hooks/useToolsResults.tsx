import { useState, useMemo, useCallback } from 'react';
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
  const [filters, setFilters] = useState<{
    region: string;
    searchValue: string;
    sortType: 'name' | 'population' | null;
    sortOrder: 'asc' | 'desc' | null;
  }>({
    region: '',
    searchValue: '',
    sortType: null,
    sortOrder: null,
  });

  const filteredCountries = useMemo(() => {
    let filtered = countries;

    if (filters.region) {
      filtered = filtered.filter(
        (country) => country.region === filters.region
      );
    }

    if (filters.searchValue) {
      const searchValueLowerCase = filters.searchValue.toLowerCase();
      filtered = filtered.filter((country) =>
        country.name.common.toLowerCase().includes(searchValueLowerCase)
      );
    }

    if (filters.sortType && filters.sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (filters.sortType === 'name') {
          return (
            a.name.common.localeCompare(b.name.common) *
            (filters.sortOrder === 'asc' ? 1 : -1)
          );
        } else {
          return filters.sortOrder === 'asc'
            ? a.population - b.population
            : b.population - a.population;
        }
      });
    }

    return filtered;
  }, [countries, filters]);

  const filterCountries = useCallback((region: string) => {
    setFilters((f) => ({ ...f, region }));
  }, []);

  const searchCountries = useCallback((searchValue: string) => {
    setFilters((f) => ({ ...f, searchValue }));
  }, []);

  const sortCountries = useCallback(
    (type: 'name' | 'population', order: 'asc' | 'desc') => {
      setFilters((f) => ({ ...f, sortType: type, sortOrder: order }));
    },
    []
  );

  const resetFilters = useCallback(() => {
    setFilters({
      region: '',
      searchValue: '',
      sortType: null,
      sortOrder: null,
    });
  }, []);

  return {
    filteredCountries,
    filterCountries,
    searchCountries,
    sortCountries,
    resetFilters,
  };
};
