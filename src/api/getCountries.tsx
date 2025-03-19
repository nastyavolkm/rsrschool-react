import { CountryModel } from '../models/country-model.tsx';

export const getCountries = async (): Promise<CountryModel[]> => {
  const response = await fetch('https://restcountries.com/v3.1/all');
  return await response.json();
};
