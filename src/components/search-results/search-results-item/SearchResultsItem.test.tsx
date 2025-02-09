import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchResultsItem from './SearchResultsItem';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';
import { Routes } from 'react-router';
import SearchResultsItemDetails from '../search-results-item-details/SearchResultsItemDetails';
import userEvent from '@testing-library/user-event';

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

const mockItem = {
  id: 1,
  name: 'Sample Repo',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

describe('SearchResultsItem Component', () => {
  it('renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <SearchResultsItem item={mockItem} />
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
        <Routes>
          <Route path="/" element={<SearchResultsItem item={mockItem} />} />
          <Route path="/details/:id" element={<DetailDisplay />} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByTestId('search-results-item');
    await user.click(link);

    expect(link).toHaveAttribute('href', `/details/${mockItem.id}`);
  });

  it('navigates by click to the main url if detailed card component for this card open', async () => {
    const user = userEvent.setup();
    const DetailDisplay: React.FC = () => <div>Displaying details</div>;
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route
            path="/details"
            element={<SearchResultsItem item={mockItem} />}
          >
            <Route path="/details/:id" element={<DetailDisplay />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByTestId('search-results-item');
    await user.click(link);

    expect(link).toHaveAttribute('href', `/`);
  });

  it('triggers api call on card click', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<SearchResultsItem item={mockItem} />} />
          <Route path="/details/:id" element={<SearchResultsItemDetails />} />
        </Routes>
      </MemoryRouter>
    );

    const link = screen.getByTestId('search-results-item');
    await user.click(link);
    expect(fetch).toHaveBeenCalledWith('https://api.github.com/repositories/1');
    expect(await screen.findByText('Test Repo')).toBeInTheDocument();
  });

  it('card should have active style if id of details is same', () => {
    render(
      <MemoryRouter initialEntries={['/details/1']}>
        <Routes>
          <Route
            path="/details/:id"
            element={<SearchResultsItem item={mockItem} />}
          />
        </Routes>
      </MemoryRouter>
    );
    const link = screen.getByTestId('search-results-item');
    expect(link.firstChild).toHaveClass('active');
  });
});
