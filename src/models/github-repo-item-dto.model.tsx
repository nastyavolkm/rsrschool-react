export interface GithubRepoItemDto {
  id: number;
  name: string;
  description: string;
  forks: number;
  owner: { login: string };
  svn_url: string;
  visibility: 'private' | 'public';
}
