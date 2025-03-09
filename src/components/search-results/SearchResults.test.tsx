import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { useSearchParams } from 'next/navigation';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(),
  useParams: jest.fn(),
}));

const mockData = {
  items: [
    { id: 1, name: 'repo1', forks: 10 },
    { id: 2, name: 'repo2', forks: 5 },
  ],
  total_count: 2,
};

describe('SearchResults Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display an error message when there is an error', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ message: 'error' }),
      })
    ) as jest.Mock;

    const component = await SearchResults({
      searchTerm: 'view',
      currentPage: '2',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Error: error')).toBeInTheDocument();
  });

  it('should display no results message when results array is empty', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ items: [], total_count: 0 }),
      })
    ) as jest.Mock;

    const component = await SearchResults({
      searchTerm: 'view',
      currentPage: '2',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText('Oops! Seems like we found nothing.')
    ).toBeInTheDocument();
  });

  it('should correctly render the list of results', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const component = await SearchResults({
      searchTerm: 'view',
      currentPage: '2',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    const items = await screen.findAllByRole('heading', { level: 3 });
    expect(items).toHaveLength(2);
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('repo2')).toBeInTheDocument();
  });

  it('should display custom search hint when there is no searchTerm', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'page' ? '2' : key === 'q' ? '' : null),
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      })
    ) as jest.Mock;

    const component = await SearchResults({
      searchTerm: '',
      currentPage: '2',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText(
        /Here you can see all possible react.js related repositories/i
      )
    ).toBeInTheDocument();
  });
});
