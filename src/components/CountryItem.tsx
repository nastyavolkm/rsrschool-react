import { CountryModel } from '../models/country-model.tsx';
import './CountryItem.css';
import { useCountryItem } from './hooks/useCountryItem.tsx';

type CountryItemProps = {
  country: CountryModel;
};

export const CountryItem = ({ country }: CountryItemProps) => {
  const { isVisited, addToLocalStorage } = useCountryItem(country);
  return (
    <div
      onClick={addToLocalStorage}
      className={`country-item ${isVisited ? 'visited' : ''}`}
    >
      <h3>{country.name.common}</h3>
      <img
        className="country-item-img"
        src={country.flags.png}
        alt={country.flags.alt}
      />
      <p>Population: {country.population}</p>
      <p>Region: {country.region}</p>
    </div>
  );
};
