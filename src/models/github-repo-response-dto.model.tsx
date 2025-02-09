import { GithubRepoItemDto } from './github-repo-item-dto.model';

export interface GithubRepoResponseDto {
  items: GithubRepoItemDto[];
  total_count: number;
}
