import { render, screen } from '@testing-library/react';
import { SearchResultsItemDetails } from './SearchResultsItemDetails';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../context/ThemeProvider';
import { useParams } from 'next/navigation';

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

describe('SearchResultsItemDetails Component', () => {
  it('displays the detailed card data after fetching', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '123',
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 123,
            name: 'Test Repo',
            description: 'Test Description',
            forks: 10,
            visibility: 'public',
            owner: {
              login: 'testuser',
            },
            svn_url: 'https://example.com/testrepo',
          }),
      })
    ) as jest.Mock;

    const component = await SearchResultsItemDetails({
      id: '123',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('Test Repo')).toBeInTheDocument();
    expect(await screen.findByText('Test Description')).toBeInTheDocument();
    expect(await screen.findByText('Forks: 10')).toBeInTheDocument();
    expect(await screen.findByText('Visibility: public')).toBeInTheDocument();
    expect(await screen.findByText('Owner: testuser')).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: 'Link to repo' })
    ).toHaveAttribute('href', 'https://example.com/testrepo');
  });

  it('show error if returns error message', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '123',
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: 'error',
          }),
      })
    ) as jest.Mock;

    const component = await SearchResultsItemDetails({
      id: '123',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );
    expect(await screen.findByText('Error: error')).toBeInTheDocument();
  });

  it('show error if error occurs', async () => {
    (useParams as jest.Mock).mockReturnValue({
      id: '123',
    });

    global.fetch = jest.fn(() => Promise.reject('error')) as jest.Mock;

    const component = await SearchResultsItemDetails({
      id: '123',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>{component}</ThemeProvider>
      </Provider>
    );

    expect(
      await screen.findByText('Error: Failed to fetch data')
    ).toBeInTheDocument();
  });
});
