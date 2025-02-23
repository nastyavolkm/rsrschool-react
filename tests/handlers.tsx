import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.github.com/search/repositories', ({ request }) => {
    const url = new URL(request.url);
    url.searchParams.set('q', 'angular');
    url.searchParams.set('page', '1');
    return HttpResponse.json({
      items: [
        { id: 1, name: 'repo1', forks: 10 },
        { id: 2, name: 'repo2', forks: 5 },
      ],
      total_count: 2,
    });
  }),
  http.get('https://api.github.com/repositories/123', () => {
    return HttpResponse.json({
      id: 123,
      name: 'Test Repo',
      description: 'Test Description',
      forks: 10,
      visibility: 'public',
      owner: { login: 'testuser' },
      svn_url: 'https://example.com/testrepo',
    });
  }),
];
