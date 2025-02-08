export interface GithubRepoItemDto {
  id: string;
  name: string;
  description: string;
  forks: number;
  owner: { login: string };
  svn_url: string;
  visibility: 'private' | 'public';
}
