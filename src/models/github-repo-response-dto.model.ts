import { GithubRepoItemDto } from './github-repo-item-dto.model.ts';

export interface GithubRepoResponseDto {
  items: GithubRepoItemDto[];
  total_count: number;
}
