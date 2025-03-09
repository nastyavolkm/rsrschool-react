import { GithubRepoResponseDto } from '../../models/github-repo-response-dto.model';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { ITEMS_PER_PAGE } from '../../constants/constants';

const GITHUB_API_URL = 'https://api.github.com/';

export async function fetchGitHubRepos(
  searchTerm: string,
  page: string
): Promise<GithubRepoResponseDto> {
  const url = `${GITHUB_API_URL}search/repositories?q=${searchTerm || 'react'}&page=${page || 1}&per_page=${ITEMS_PER_PAGE}`;
  const response = await fetch(url);

  const data = await response.json();

  return data as GithubRepoResponseDto;
}

export async function fetchGitHubRepoDetails(
  id: string
): Promise<GithubRepoItemDto> {
  const url = `${GITHUB_API_URL}repositories/${id}`;

  const response = await fetch(url);
  const data = await response.json();
  return data as GithubRepoItemDto;
}
