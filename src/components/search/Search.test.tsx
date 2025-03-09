import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from './Search';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { usePathname, useSearchParams } from 'next/navigation';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    push: mockPush,
    replace: jest.fn(),
    prefetch: jest.fn(),
  })),
  usePathname: jest.fn(),
}));

describe('Search Component', () => {
  it('clicking the search button set searchTerm to props', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) => (key === 'page' ? '2' : key === 'q' ? '' : null),
      toString: () => 'page=2&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');
    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>
    );

    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', { name: 'Search' });
    await user.type(input, 'react');
    await user.click(button);

    expect(mockPush).toHaveBeenCalledWith('/?page=1&q=react');
  });

  it('takes an input value from router', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
      toString: () => 'page=2&q=angular',
    });

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Search />
        </ThemeProvider>
      </Provider>
    );
    const input = await screen.findByRole('textbox');
    expect(input).toHaveValue('angular');
  });
});
