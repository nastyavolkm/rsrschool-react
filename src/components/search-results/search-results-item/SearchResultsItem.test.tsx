import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { Routes } from 'react-router';
import userEvent from '@testing-library/user-event';
import { SearchResultsItem } from './SearchResultsItem';
import { SearchResultsItemDetails } from '../search-results-item-details/SearchResultsItemDetails';
import { store } from '../../../store/store';
import { Provider } from 'react-redux';

const mockItem = {
  id: 123,
  name: 'Sample Repo',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

describe('SearchResultsItem Component', () => {
  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchResultsItem item={mockItem} />
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText('Sample Repo')).toBeInTheDocument();
    expect(screen.getByText('Forks: 150')).toBeInTheDocument();
  });

  it('navigates to detailed card component on card click', async () => {
    const user = userEvent.setup();
    const DetailDisplay: React.FC = () => <div>Displaying details</div>;
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<SearchResultsItem item={mockItem} />} />
            <Route path="/details/:id" element={<DetailDisplay />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByTestId('search-results-item');
    await user.click(link);

    expect(link).toHaveAttribute('href', `/details/${mockItem.id}`);
  });

  it('navigates by click to the main url if detailed card component for this card open', async () => {
    const user = userEvent.setup();
    const DetailDisplay: React.FC = () => <div>Displaying details</div>;
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/details"
              element={<SearchResultsItem item={mockItem} />}
            >
              <Route path="/details/:id" element={<DetailDisplay />} />
            </Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByTestId('search-results-item');
    await user.click(link);

    expect(link).toHaveAttribute('href', `/`);
  });

  it('triggers api call on card click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<SearchResultsItem item={mockItem} />} />
            <Route path="/details/:id" element={<SearchResultsItemDetails />} />
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const link = await screen.findByTestId('search-results-item');
    await user.click(link);
    expect(await screen.findByText('Test Repo')).toBeInTheDocument();
  });

  it('card should have active style if id of details is same', async () => {
    render(
      <MemoryRouter initialEntries={['/details/123']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/details/:id"
              element={<SearchResultsItem item={mockItem} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const link = await screen.findByTestId('search-results-item');
    expect(link.firstChild).toHaveClass('active');
  });
});
