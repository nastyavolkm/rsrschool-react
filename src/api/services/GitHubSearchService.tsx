import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { ITEMS_PER_PAGE } from '../../constants/constants';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../../store/store';
import { Action, PayloadAction } from '@reduxjs/toolkit';

type GetGitHubRepoBySearchTermParams = {
  searchTerm: string;
  page: string;
};

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === HYDRATE;
}

export const gitHubSearchApi = createApi({
  reducerPath: 'gitHubSearchApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, string, 'gitHubSearchApi'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },

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
