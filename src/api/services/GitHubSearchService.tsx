import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { ITEMS_PER_PAGE } from '../../constants/constants';

type GetGitHubRepoBySearchTermParams = {
  searchTerm: string;
  page: string;
};

export const gitHubSearchApi = createApi({
  reducerPath: 'gitHubSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getGitHubRepoBySearchTerm: builder.query<
      GithubRepoResponseDto,
      GetGitHubRepoBySearchTermParams
    >({
      query: ({ searchTerm, page = '1' }) =>
        `search/repositories?q=${encodeURIComponent(searchTerm || 'react')}&page=${page}&per_page=${ITEMS_PER_PAGE}`,
    }),
    getGitHubRepoDetailsById: builder.query<
      GithubRepoItemDto | { message: string },
      string
    >({
      query: (id) => `repositories/${id}`,
    }),
  }),
});
export const {
  useGetGitHubRepoBySearchTermQuery,
  useGetGitHubRepoDetailsByIdQuery,
} = gitHubSearchApi;
