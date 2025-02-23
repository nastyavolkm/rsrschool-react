import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { SearchResults } from './SearchResults';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { ThemeProvider } from '../../context/ThemeProvider';
import { server } from '../../../tests/server';

describe('SearchResults Component', () => {
  it('should display the spinner when loading', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<SearchResults />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(
      screen.getByRole('heading', { name: 'Loading...' })
    ).toBeInTheDocument();
  });

  it('should display an error message when there is an error', async () => {
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
      <MemoryRouter initialEntries={['/?page=2']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<SearchResults />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(
      await screen.findByText('Error: Something went wrong')
    ).toBeInTheDocument();
  });

  it('should display no results message when results array is empty', async () => {
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
      <MemoryRouter initialEntries={['/?page=5']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<SearchResults />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(await screen.findByText(/we found nothing/i)).toBeInTheDocument();
  });

  it('should correctly render the list of results', async () => {
    store.dispatch({ type: 'search/setSearchTerm', payload: 'angular' });
    store.dispatch({ type: 'search/setPage', payload: '1' });
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResults />
        </Provider>
      </MemoryRouter>
    );

    const items = await screen.findAllByRole('heading', { level: 3 });
    expect(items.length).toBe(2);
  });

  it('should display custom search hint when there is no searchTerm', async () => {
    store.dispatch({ type: 'search/setSearchTerm', payload: '' });
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<SearchResults />}></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
    expect(
      await screen.findByText(
        /here you can see all possible react.js related repositories/i
      )
    ).toBeInTheDocument();
  });
});
