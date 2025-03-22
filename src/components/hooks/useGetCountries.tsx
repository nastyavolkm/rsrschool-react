import { useEffect, useState } from 'react';
import { getCountries } from '../../api/getCountries.tsx';
import { CountryModel } from '../../models/country-model.tsx';

export const useGetCountries = (): {
  countries: CountryModel[];
  isLoading: boolean;
  error: string | null;
  regions: string[];
} => {
  const [countries, setCountries] = useState<CountryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>('');
  const [regions, setRegions] = useState<string[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    (async () => {
      setIsLoading(true);
      setError(null);

      try {
        setIsLoading(true);
        const response = await getCountries();
        const regions = Array.from(
          new Set(response.map((country) => country.region))
        );
        setRegions(regions);
        setCountries(response);
        setIsLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setIsLoading(false);
      }
    })();
    return () => abortController.abort();
  }, []);

  return { countries, isLoading, error, regions };
};
