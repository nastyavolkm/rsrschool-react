import { useEffect, useRef } from 'react';
import { useGetGitHubRepoBySearchTermQuery } from '../api/services/GitHubSearchService';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchItems,
  setTotalCount,
} from '../store/features/search/search-slice';
import { selectIsLoading } from '../store/features/loading/loading-slice';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model';
import { useRouter } from 'next/router';

export const useSearchData: () => [
  items: GithubRepoItemDto[],
  error: unknown,
  isLoading: boolean,
] = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoading = useSelector(selectIsLoading);
  const page = (router.query.page as string) || '1';
  const isInitialRender = useRef(true);

  const { data, error } = useGetGitHubRepoBySearchTermQuery(
    {
      searchTerm: (router.query.q as string) || 'react',
      page,
    },
    { skip: router.isFallback }
  );

  const items = data?.items as GithubRepoItemDto[];

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    dispatch(setSearchItems(items));
    dispatch(setTotalCount(data?.total_count || 0));
  }, [isLoading, items, data?.total_count, dispatch]);

  return [items, error, isLoading];
};
