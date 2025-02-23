import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router';
import { SearchResultsItemDetails } from './SearchResultsItemDetails';
import { server } from '../../../../tests/server';
import { http, HttpResponse } from 'msw';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../../context/ThemeProvider';
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SearchResultsItemDetails Component', () => {
  it('displays the detailed card data after fetching', async () => {
    render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
        }}
        initialEntries={['/details/123']}
      >
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route path="details">
                <Route index element={<SearchResultsItemDetails />} />
                <Route path=":id" element={<SearchResultsItemDetails />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
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

  it('navigates away when clicking the close button', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/details/123?page=3']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route
                path="/details/:id"
                element={<SearchResultsItemDetails />}
              ></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Test Repo')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/?page=3');
  });

  it('show error if returns error message', async () => {
    server.use(
      http.get('https://api.github.com/repositories/345', () => {
        return HttpResponse.json({
          status: 404,
          message: 'not found',
        });
      })
    );
    render(
      <MemoryRouter initialEntries={['/details/345?page=3']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route
                path="/details/:id"
                element={<SearchResultsItemDetails />}
              ></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(await screen.findByText('Error: not found')).toBeInTheDocument();
  });

  it('show error if error occurs', async () => {
    server.use(
      http.get('https://api.github.com/repositories/346', () => {
        return new HttpResponse(null, {
          status: 404,
          statusText: 'not found',
        });
      })
    );
    render(
      <MemoryRouter initialEntries={['/details/346?page=3']}>
        <Provider store={store}>
          <ThemeProvider>
            <Routes>
              <Route
                path="/details/:id"
                element={<SearchResultsItemDetails />}
              ></Route>
            </Routes>
          </ThemeProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Error: Something went wrong')
    ).toBeInTheDocument();
  });
});
