import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { usePathname, useSearchParams } from 'next/navigation';
import { ThemeProvider } from '../../context/ThemeProvider';

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

describe('Pagination Component', () => {
  it('changes url by click on a page', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
      toString: () => 'page=2&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <Pagination totalItems={200} />
      </Provider>
    );

    expect(
      await screen.findByRole('button', { name: 'Prev' })
    ).toBeInTheDocument();

    const thirdPageButton = screen.getByRole('button', { name: '3' });
    await user.click(thirdPageButton);

    expect(mockPush).toHaveBeenCalledWith('/?page=3&q=angular');
  });

  it('renders page numbers and sets active class for current page', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '2' : key === 'q' ? 'angular' : null,
      toString: () => 'page=2&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={50} />
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '3' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '5' })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: '2' })).toHaveClass('active');
    expect(screen.getByRole('button', { name: '1' })).not.toHaveClass('active');
  });

  it('navigates to next window when clicking Next', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '1' : key === 'q' ? 'angular' : null,
      toString: () => 'page=1&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={100} />
        </ThemeProvider>
      </Provider>
    );

    const nextButton = screen.getByRole('button', { name: 'Next' });
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '6' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '1' })
      ).not.toBeInTheDocument();
    });
  });

  it('navigates to previous window when clicking Prev', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '6' : key === 'q' ? 'angular' : null,
      toString: () => 'page=6&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    const user = userEvent.setup();
    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={100} /> {/* 10 pages */}
        </ThemeProvider>
      </Provider>
    );

    expect(screen.getByRole('button', { name: '2' })).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: 'Prev' });
    await user.click(prevButton);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '6' })
      ).not.toBeInTheDocument();
    });
  });

  it('hides Prev and Next when total pages are less than MAX_PAGES_VISIBLE', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '1' : key === 'q' ? 'angular' : null,
      toString: () => 'page=1&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={40} />
        </ThemeProvider>
      </Provider>
    );

    expect(
      screen.queryByRole('button', { name: 'Prev' })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Next' })
    ).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: '1' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '4' })).toBeInTheDocument();
  });

  it('applies theme class to buttons', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (key: string) =>
        key === 'page' ? '1' : key === 'q' ? 'angular' : null,
      toString: () => 'page=1&q=angular',
    });
    (usePathname as jest.Mock).mockReturnValue('/');

    render(
      <Provider store={store}>
        <ThemeProvider>
          <Pagination totalItems={100} /> {/* 10 pages */}
        </ThemeProvider>
      </Provider>
    );

    const pageButton = screen.getByRole('button', { name: '1' });
    const prevButton = screen.getByRole('button', { name: 'Prev' });
    const nextButton = screen.getByRole('button', { name: 'Next' });

    expect(pageButton).toHaveClass('light');
    expect(prevButton).toHaveClass('light');
    expect(nextButton).toHaveClass('light');
  });
});
