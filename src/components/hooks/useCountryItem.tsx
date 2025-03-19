import { CountryModel } from '../../models/country-model.tsx';
import { useEffect, useState } from 'react';

export const useCountryItem = (
  country: CountryModel
): {
  isVisited: boolean;
  addToLocalStorage: () => void;
} => {
  const [isVisited, setIsVisited] = useState(false);
  const countryName = country.name.common;
  useEffect(() => {
    const countries = JSON.parse(localStorage.getItem('countries') || '[]');
    const countryExists = countries.some((c: string) => c === countryName);
    if (countryExists) {
      setIsVisited(true);
    }
  }, [countryName]);
  const addToLocalStorage = () => {
    const countries = JSON.parse(localStorage.getItem('countries') || '[]');
    const countryExists = countries.some(
      (c: string) => c === country.name.common
    );
    if (!countryExists) {
      localStorage.setItem(
        'countries',
        JSON.stringify([...countries, country.name.common])
      );
      setIsVisited(true);
    }
  };

  return { isVisited, addToLocalStorage };
};
