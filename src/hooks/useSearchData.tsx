import { useEffect } from 'react';
import { useGetGitHubRepoBySearchTermQuery } from '../api/services/GitHubSearchService';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCurrentPage,
  selectSearchTerm,
  setSearchItems,
  setTotalCount,
} from '../store/features/search/search-slice';
import { setLoading } from '../store/features/loading/loading-slice';
import { GithubRepoItemDto } from '../models/github-repo-item-dto.model';

export const useSearchData: () => [
  items: GithubRepoItemDto[],
  error: unknown,
  isLoading: boolean,
  searchTerm: string,
] = () => {
  const dispatch = useDispatch();
  const searchTerm: string = useSelector(selectSearchTerm);

  const currentPage: string = useSelector(selectCurrentPage);

  const { data, error, isFetching } = useGetGitHubRepoBySearchTermQuery({
    searchTerm,
    page: currentPage,
  });

  const items = data?.items as GithubRepoItemDto[];
  const isLoading = isFetching;

  useEffect(() => {
    dispatch(setLoading(isLoading));
    dispatch(setSearchItems(items));
    dispatch(setTotalCount(data?.total_count || 0));
  }, [isLoading, isFetching, items, data?.total_count, dispatch]);

  return [items, error, isLoading, searchTerm];
};
