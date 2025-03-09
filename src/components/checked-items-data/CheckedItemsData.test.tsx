import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Main } from '../main/Main';
import { ThemeProvider } from '../../context/ThemeProvider';
import { SearchResultsItem } from '../search-results/search-results-item/SearchResultsItem';
import { GithubRepoItemDto } from '../../models/github-repo-item-dto.model';
import { useSearchParams } from 'next/navigation';
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockItem = {
  id: 123,
  name: 'Test Repo',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

const mockItem1 = {
  id: 124,
  name: 'Test Repo 2',
  forks: 150,
  svn_url: 'https://example.com',
} as GithubRepoItemDto;

const MockSearchResults = () => {
  return (
    <div>
      <div>Search Results</div>
      <SearchResultsItem item={mockItem}></SearchResultsItem>
      <SearchResultsItem item={mockItem1}></SearchResultsItem>
    </div>
  );
};

describe('CheckedItemsData Component', () => {
  it('shows number of selected items', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main results={<MockSearchResults />}></Main>
        </ThemeProvider>
      </Provider>
    );
    expect(await screen.findByText('Test Repo')).toBeInTheDocument();
    await user.click(screen.getByTestId('checkbox-123'));

    expect(screen.getByText('1 item is selected')).toBeInTheDocument();
  });
});
