import { render, screen } from '@testing-library/react';
import { SearchResults } from './SearchResults';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { ThemeProvider } from '../../context/ThemeProvider';
import { server } from '../../../tests/server';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('SearchResults Component', () => {
  it('should display the spinner when loading', () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    store.dispatch({ type: 'search/setSearchTerm', payload: 'angular' });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults>
            <div></div>
          </SearchResults>
        </ThemeProvider>
      </Provider>
    );
    expect(
      screen.getByRole('heading', { name: 'Loading...' })
    ).toBeInTheDocument();
  });

  it('should display an error message when there is an error', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'search/setSearchTerm', payload: 'react' });
    store.dispatch({ type: 'search/setPage', payload: 2 });

    server.use(
      http.get('https://api.github.com/search/repositories', ({ request }) => {
        const url = new URL(request.url);
        url.searchParams.set('q', 'react');
        url.searchParams.set('page', '2');

        return new HttpResponse(null, {
          status: 404,
          statusText: 'not found',
        });
      })
    );
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults>
            <div></div>
          </SearchResults>
        </ThemeProvider>
      </Provider>
    );
    expect(
      await screen.findByText('Error: Something went wrong')
    ).toBeInTheDocument();
  });

  it('should display no results message when results array is empty', async () => {
    const mockRouter = {
      query: { page: '5' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'search/setSearchTerm', payload: 'bla' });
    store.dispatch({ type: 'search/setPage', payload: 5 });

    server.use(
      http.get(
        'https://api.github.com/search/repositories?q=bla&page=5',
        ({ request }) => {
          const url = new URL(request.url);
          url.searchParams.set('q', 'bla');
          url.searchParams.set('page', '5');
          return HttpResponse.json({ items: [] });
        }
      )
    );
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults>
            <div></div>
          </SearchResults>
        </ThemeProvider>
      </Provider>
    );
    expect(await screen.findByText(/we found nothing/i)).toBeInTheDocument();
  });

  it('should correctly render the list of results', async () => {
    const mockRouter = {
      query: { page: '1' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'search/setSearchTerm', payload: 'angular' });
    store.dispatch({ type: 'search/setPage', payload: '1' });
    render(
      <Provider store={store}>
        <SearchResults>
          <div></div>
        </SearchResults>
      </Provider>
    );

    const items = await screen.findAllByRole('heading', { level: 3 });
    expect(items.length).toBe(2);
  });

  it('should display custom search hint when there is default searchTerm', async () => {
    const mockRouter = {
      query: { page: '2' },
      push: jest.fn(),
      pathname: '/',
      isReady: true,
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    store.dispatch({ type: 'search/setSearchTerm', payload: 'react' });
    render(
      <Provider store={store}>
        <ThemeProvider>
          <SearchResults>
            <div></div>
          </SearchResults>
        </ThemeProvider>
      </Provider>
    );
    expect(
      await screen.findByText(
        /here you can see all possible react.js related repositories/i
      )
    ).toBeInTheDocument();
  });
});
