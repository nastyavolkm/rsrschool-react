import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchResultsItemDetails from './SearchResultsItemDetails';
import { Route, Routes } from 'react-router';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('SearchResultsItemDetails Component', () => {
  it('displays the detailed card data after fetching', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 123,
            name: 'Test Repo',
            description: 'Test Description',
            forks: 10,
            visibility: 'public',
            owner: { login: 'testuser' },
            svn_url: 'https://example.com/testrepo',
          }),
      })
    ) as jest.Mock;
    render(
      <MemoryRouter
        future={{
          v7_relativeSplatPath: true,
        }}
        initialEntries={['/details/123']}
      >
        <Routes>
          <Route path="details">
            <Route index element={<SearchResultsItemDetails />} />
            <Route path=":id" element={<SearchResultsItemDetails />} />
          </Route>
        </Routes>
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

  it('shows a loading spinner while fetching data', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: 123,
            name: 'Test Repo',
            description: 'Test Description',
            forks: 10,
            visibility: 'public',
            owner: { login: 'testuser' },
            svn_url: 'https://example.com/testrepo',
          }),
      })
    ) as jest.Mock;
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Routes>
          <Route
            path="/details/:id"
            element={<SearchResultsItemDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
  });

  it('navigates away when clicking the close button', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/details/123?page=3']}>
        <Routes>
          <Route
            path="/details/:id"
            element={<SearchResultsItemDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Test Repo')).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: 'Close' });
    await user.click(closeButton);

    expect(mockedUsedNavigate).toHaveBeenCalledWith('/?page=3');
  });

  it('show error if returns error message', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            message: 'Not Found',
            status: 404,
          }),
      })
    ) as jest.Mock;
    render(
      <MemoryRouter initialEntries={['/details/123?page=3']}>
        <Routes>
          <Route
            path="/details/:id"
            element={<SearchResultsItemDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByText('Error: Not Found')).toBeInTheDocument();
  });

  it('show error if error occurs', async () => {
    global.fetch = jest.fn(() =>
      Promise.reject(new Error('An unknown error occurred'))
    ) as jest.Mock;
    render(
      <MemoryRouter initialEntries={['/details/123?page=3']}>
        <Routes>
          <Route
            path="/details/:id"
            element={<SearchResultsItemDetails />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText('Error: An unknown error occurred')
    ).toBeInTheDocument();
  });
});
