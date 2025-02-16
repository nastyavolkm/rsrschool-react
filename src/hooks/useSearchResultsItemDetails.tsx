import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model';

export const useSearchResultsItemDetails = (): [
  GithubRepoItemDto | null,
  string | null,
  boolean,
] => {
  const { id } = useParams();
  const [item, setItem] = useState<GithubRepoItemDto | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const abortController = new AbortController();
    (async () => {
      try {
        if (id) {
          const response = await fetch(
            `https://api.github.com/repositories/${id}`
          );
          const data = await response.json();
          if (data.message) {
            setError(data.message);
          } else {
            setItem(data);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    })();
    return () => abortController.abort();
  }, [id]);

  return [item, error, isLoading];
};
