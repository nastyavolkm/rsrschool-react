import { render, screen } from '@testing-library/react';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { SearchResultsItem } from './SearchResultsItem';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

const mockItem = {
  id: 123,
  name: 'Test Repo',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

describe('SearchResultsItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the relevant card data', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    expect(screen.getByText('Test Repo')).toBeInTheDocument();
    expect(screen.getByText('Forks: 150')).toBeInTheDocument();
  });

  it('sets href to main url when card is active', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    const link = await screen.getByTestId('search-results-item');
    expect(link).toHaveAttribute('href', '/details/123?page=2&q=angular');
  });

  it('sets href to detailed card component when not active', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    const link = await screen.getByTestId('search-results-item');
    expect(link).toHaveAttribute('href', `/details/123?page=2&q=angular`);
  });

  it('card should have active style if id of details is same', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });
    (useParams as jest.Mock).mockReturnValue({
      id: '123',
    });

    (usePathname as jest.Mock).mockReturnValue('/details/123?page=2&q=angular');

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );
    const link = await screen.findByRole('link');
    expect(link.firstChild).toHaveClass('active');
  });
});
