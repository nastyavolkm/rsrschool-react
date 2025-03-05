import { render, screen } from '@testing-library/react';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { SearchResultsItem } from './SearchResultsItem';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { useRouter } from 'next/router';

const mockItem = {
  id: 123,
  name: 'Test Repo',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchResultsItem Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the relevant card data', () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    expect(screen.getByText('Test Repo')).toBeInTheDocument();
    expect(screen.getByText('Forks: 150')).toBeInTheDocument();
  });

  it('sets href to main url when card is active', async () => {
    const mockRouter = {
      query: { page: '2', id: '123' },
      push: jest.fn(),
      pathname: '/details/123',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    const link = await screen.getByTestId('search-results-item');
    expect(link).toHaveAttribute('href', '/?page=2');
  });

  it('sets href to detailed card component when not active', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );

    const link = await screen.getByTestId('search-results-item');
    expect(link).toHaveAttribute('href', `/details/123?page=2`);
  });

  it('card should have active style if id of details is same', async () => {
    const mockRouter = {
      query: { page: '2', id: '123' },
      push: jest.fn(),
      pathname: '/details/123',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(
      <Provider store={store}>
        <SearchResultsItem item={mockItem} />
      </Provider>
    );
    const link = await screen.findByRole('link');
    expect(link.firstChild).toHaveClass('active');
  });
});
