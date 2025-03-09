import { render, screen, waitFor } from '@testing-library/react';
import { Main } from './Main';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

const MockSearchResults = ({
  searchTerm,
  currentPage,
}: {
  searchTerm: string;
  currentPage: string;
}) => {
  return (
    <div>
      <div>Search Results</div>
      {currentPage}
      {searchTerm}
    </div>
  );
};

describe('Main Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.dispatch({ type: 'checkedItems/clearItems' });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
    });
  });

  it('renders without crashing', async () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main
            results={
              <Suspense fallback={<div>Loading...</div>}>
                <MockSearchResults searchTerm="angular" currentPage="2" />
              </Suspense>
            }
          />
        </ThemeProvider>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Search Results')).toBeInTheDocument();
      expect(screen.getByRole('checkbox')).toBeInTheDocument();
    });
  });

  it('displays checkedItemsComponent', async () => {
    store.dispatch({
      type: 'checkedItems/addItems',
      payload: { id: 1 },
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Main
            results={
              <Suspense fallback={<div>Loading...</div>}>
                <MockSearchResults searchTerm="angular" currentPage="2" />
              </Suspense>
            }
          />
        </ThemeProvider>
      </Provider>
    );

    expect(await screen.findByText('1 item is selected')).toBeInTheDocument();
  });
});
